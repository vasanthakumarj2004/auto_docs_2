/**
 * Google Analytics 4 Consent Mode v2 Integration
 * Controls activation, consent state, and cookie cleanup for analytics.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Initializes dataLayer and stub gtag function if not already present
 */
function ensureGtag(): (...args: unknown[]) => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function (...args: unknown[]) {
      window.dataLayer?.push(args);
    };
  }
  return window.gtag;
}

/**
 * Updates Google Analytics Consent Mode v2 based on user preference
 */
export function updateAnalyticsConsent(granted: boolean): void {
  if (typeof window === 'undefined') return;

  const gtag = ensureGtag();

  // Send consent update command (Google Consent Mode v2)
  gtag('consent', 'update', {
    analytics_storage: granted ? 'granted' : 'denied',
  });

  if (granted) {
    gtag('event', 'cookie_consent_update', {
      event_category: 'consent',
      analytics_enabled: true,
    });
  } else {
    // When analytics consent is denied or revoked, purge analytics cookies
    removeAnalyticsCookies();
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
  if (typeof document === 'undefined') return;

  const cookieNames = document.cookie
    .split(';')
    .map((c) => c.trim().split('=')[0]);

  cookieNames.forEach((name) => {
    if (
      name === '_ga' ||
      name.startsWith('_ga_') ||
      name === '_gid' ||
      name === '_gat' ||
      name.startsWith('_gat_') ||
      name.startsWith('_gac_')
    ) {
      // Overwrite cookie across common subdomains and root path
      document.cookie = `${encodeURIComponent(name)}=; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      const domainParts = window.location.hostname.split('.');
      while (domainParts.length > 1) {
        const domain = domainParts.join('.');
        document.cookie = `${encodeURIComponent(name)}=; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain};`;
        domainParts.shift();
      }
    }
  });
}
