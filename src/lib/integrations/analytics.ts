/**
 * Google Analytics 4 Consent Mode v2 Integration Bridge
 * Delegates directly to the central analytics module in src/lib/analytics.ts
 */

import { initGA, resetAnalytics, removeGA4Cookies } from '../analytics';

/**
 * Updates Google Analytics Consent Mode v2 based on user preference:
 * Activates GA4 if granted; sets ga-disable, denies storage, and purges cookies if false.
 */
export function updateAnalyticsConsent(granted: boolean): void {
  if (typeof window === 'undefined') return;

  if (granted) {
    initGA();
  } else {
    resetAnalytics();
  }

  window.dispatchEvent(
    new CustomEvent('docsynecx:analytics-consent', {
      detail: { granted },
    })
  );
}

/**
 * Purges Google Analytics cookies (_ga, _gid, _gat, _gac_*)
 */
export function removeAnalyticsCookies(): void {
  removeGA4Cookies();
}
