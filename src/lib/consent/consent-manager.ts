import { ConsentCategories, ConsentPreferences, ConsentStatus } from '@/src/types/consent';
import {
  getSavedConsentCookie,
  saveConsentCookie,
  purgeFunctionalLocalStorage,
  purgeFunctionalSessionStorage,
  purgeMarketingData,
} from './consent-storage';
import { createConsentPreferences, getPresetPreferences } from './consent-validation';
import { updateAnalyticsConsent } from '../integrations/analytics';
import { updateMarketingConsent } from '../integrations/marketing';
import { fetchVisitorLocation } from '../integrations/ipapi';

/**
 * Applies and executes consent preferences:
 * 1. Validates and writes preference cookie with calculated expiry
 * 2. Enforces storage rules across localStorage and sessionStorage
 * 3. Enforces third-party script integrations (GA4, Google Ads, Meta Pixel)
 * 4. Activates optional location personalization if functional is granted
 * 5. Dispatches custom events for UI responsiveness
 */
export function applyConsent(preferences: ConsentPreferences): ConsentPreferences {
  // 1. Persist to first-party cookie
  saveConsentCookie(preferences);

  // 2. Enforce Functional rules
  if (!preferences.functional) {
    purgeFunctionalLocalStorage();
    purgeFunctionalSessionStorage();
  } else {
    // Proactively fetch and cache visitor location if functional is enabled
    if (typeof window !== 'undefined') {
      fetchVisitorLocation(true).catch(() => {});
    }
  }

  // 3. Enforce Analytics rules
  updateAnalyticsConsent(preferences.analytics);

  // 4. Enforce Marketing rules
  if (!preferences.marketing) {
    purgeMarketingData();
  }
  updateMarketingConsent(preferences.marketing);

  // 5. Broadcast change event
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('docsynecx:consent-changed', {
        detail: preferences,
      })
    );
  }

  return preferences;
}

/**
 * Accept All handler:
 * Sets all categories to true, calculates 365-day expiry, saves and applies.
 */
export function acceptAllConsent(): ConsentPreferences {
  const prefs = getPresetPreferences('accept_all');
  return applyConsent(prefs);
}

/**
 * Reject All handler:
 * Sets optional categories to false (essential remains true), calculates 4-day expiry, saves and purges.
 */
export function rejectAllConsent(): ConsentPreferences {
  const prefs = getPresetPreferences('reject_all');
  return applyConsent(prefs);
}

/**
 * Save custom categories selected by the user
 */
export function saveCustomConsent(
  categories: Omit<ConsentCategories, 'essential'>,
  status: ConsentStatus = 'custom'
): ConsentPreferences {
  const prefs = createConsentPreferences(categories, status);
  return applyConsent(prefs);
}

/**
 * Application initialization check:
 * Runs on hydration to check if valid consent cookie exists, applies active flags.
 */
export function initializeConsentState(): ConsentPreferences | null {
  const existing = getSavedConsentCookie();

  if (existing) {
    // Re-verify integrations match the saved cookie preferences
    updateAnalyticsConsent(existing.analytics);
    updateMarketingConsent(existing.marketing);

    if (!existing.functional) {
      purgeFunctionalLocalStorage();
      purgeFunctionalSessionStorage();
    } else {
      if (typeof window !== 'undefined') {
        fetchVisitorLocation(true).catch(() => {});
      }
    }
    return existing;
  }

  // If no consent exists yet:
  // Pre-emptively ensure analytics and marketing are kept denied until user consents
  updateAnalyticsConsent(false);
  updateMarketingConsent(false);
  return null;
}
