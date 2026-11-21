/**
 * Unified Cookie Consent & Governance Bridge
 * Maintains backward compatibility while delegating to the production-ready CCMS.
 */

import {
  COOKIE_NAME,
  FUNCTIONAL_STORAGE_KEYS,
  STORAGE_KEY_SESSION_LOCATION,
  STORAGE_KEY_SECURE_SESSION,
} from './consent/consent-config';
import {
  getSavedConsentCookie,
  getCookie,
  deleteCookie,
  saveFunctionalStorage as storageSaveFunctional,
  purgeFunctionalLocalStorage as storagePurgeFunctional,
  purgeMarketingData as storagePurgeMarketing,
} from './consent/consent-storage';
import { updateAnalyticsConsent } from './integrations/analytics';
import { updateMarketingConsent } from './integrations/marketing';

export const COOKIE_PREFERENCES_KEY = COOKIE_NAME;
export const COOKIE_SECURE_KEY = STORAGE_KEY_SECURE_SESSION;
export const SESSION_STORAGE_KEY = STORAGE_KEY_SESSION_LOCATION;
export const COOKIE_EXPIRY_DAYS = 365;

export const THEME_STORAGE_KEYS = FUNCTIONAL_STORAGE_KEYS;

export interface ConsentPreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
}

export { getCookie, deleteCookie };

/**
 * Retrieve current saved consent preferences from cookie
 */
export function getSavedConsentPreferences(): ConsentPreferences | null {
  const prefs = getSavedConsentCookie();
  if (!prefs) return null;
  return {
    necessary: true,
    functional: prefs.functional,
    analytics: prefs.analytics,
    marketing: prefs.marketing,
    updatedAt: prefs.consentUpdatedAt,
  };
}

/**
 * Check if Functional consent is granted
 */
export function isFunctionalAllowed(): boolean {
  const prefs = getSavedConsentCookie();
  return prefs ? prefs.functional : false;
}

/**
 * Check if Marketing / Personalization consent is granted
 */
export function isMarketingAllowed(): boolean {
  const prefs = getSavedConsentCookie();
  return prefs ? prefs.marketing : false;
}

/**
 * Check if Analytics consent is granted.
 * consent = true is the only state in which any data leaves the browser.
 */
export function getAnalyticsConsent(): boolean {
  if (typeof document === 'undefined') return false;

  // 1. Check direct cookie (cookie_consent_analytics)
  const direct = getCookie('cookie_consent_analytics');
  if (direct !== null) {
    return direct === 'true';
  }

  // 2. Check validated preferences from cookie storage
  const prefs = getSavedConsentCookie();
  if (prefs) {
    return prefs.analytics === true;
  }

  // 3. Fallback raw check for structured preferences cookie (cookie_preferences)
  try {
    const raw = getCookie(COOKIE_PREFERENCES_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return Boolean(parsed && typeof parsed === 'object' && parsed.analytics === true);
  } catch {
    return false;
  }
}

/**
 * Subscribes to analytics consent changes across events and browser tabs without reload.
 * Listens for CustomEvent 'analytics-consent-changed', 'docsynecx:consent-changed',
 * and window 'focus' / 'visibilitychange' to detect cross-tab changes.
 */
export function onConsentChange(callback: (granted: boolean) => void): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  let lastKnownState = getAnalyticsConsent();

  const notifyIfChanged = (nextState: boolean) => {
    if (nextState !== lastKnownState) {
      lastKnownState = nextState;
      callback(nextState);
    }
  };

  const handleCustomEvent = (e: Event) => {
    const customEvent = e as CustomEvent<{ granted?: boolean } | null>;
    if (customEvent.detail && typeof customEvent.detail.granted === 'boolean') {
      notifyIfChanged(customEvent.detail.granted);
    } else {
      notifyIfChanged(getAnalyticsConsent());
    }
  };

  const handleTabCheck = () => {
    const current = getAnalyticsConsent();
    notifyIfChanged(current);
  };

  window.addEventListener('analytics-consent-changed', handleCustomEvent);
  window.addEventListener('docsynecx:consent-changed', handleTabCheck);
  window.addEventListener('focus', handleTabCheck);
  window.addEventListener('visibilitychange', handleTabCheck);

  return () => {
    window.removeEventListener('analytics-consent-changed', handleCustomEvent);
    window.removeEventListener('docsynecx:consent-changed', handleTabCheck);
    window.removeEventListener('focus', handleTabCheck);
    window.removeEventListener('visibilitychange', handleTabCheck);
  };
}

/**
 * Legacy alias for getAnalyticsConsent
 */
export function isAnalyticsAllowed(): boolean {
  return getAnalyticsConsent();
}

/**
 * Save item to localStorage ONLY if Functional consent is granted
 */
export function saveFunctionalStorage(key: string, value: string): void {
  storageSaveFunctional(key, value);
}

/**
 * Purge all theme and custom color preferences from localStorage
 */
export function purgeFunctionalLocalStorage(): void {
  storagePurgeFunctional();
}

/**
 * Purge non-confidential geo details from sessionStorage and confidential details from Cookie
 */
export function purgeMarketingData(): void {
  storagePurgeMarketing();
}

/**
 * Dispatch Google Analytics consent updates
 */
export function updateGoogleAnalyticsConsent(granted: boolean, marketingGranted = false): void {
  updateAnalyticsConsent(granted);
  updateMarketingConsent(marketingGranted);
}

export {
  obfuscateSessionData,
  deobfuscateSessionData,
  setSecureSessionItem,
  getSecureSessionItem,
  removeSecureSessionItem,
} from './storage/secure-session-storage';
