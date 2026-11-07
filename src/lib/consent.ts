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
 * Check if Analytics consent is granted
 */
export function isAnalyticsAllowed(): boolean {
  const prefs = getSavedConsentCookie();
  return prefs ? prefs.analytics : false;
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
