/**
 * Marketing, Advertising & Remarketing Integrations
 * Controls Google Ads, Meta Pixel, attribution tracking, and identifier cleanup.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Initializes dataLayer and stub gtag function
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
 * Updates marketing and ad storage consent flags
 */
export function updateMarketingConsent(granted: boolean): void {
  if (typeof window === 'undefined') return;

  const gtag = ensureGtag();

  // Update Google Consent Mode for advertising signals
  gtag('consent', 'update', {
    ad_storage: granted ? 'granted' : 'denied',
    ad_user_data: granted ? 'granted' : 'denied',
    ad_personalization: granted ? 'granted' : 'denied',
  });

  if (granted) {
    gtag('event', 'cookie_consent_update', {
      event_category: 'consent',
      marketing_enabled: true,
    });
  } else {
    // When marketing consent is denied or revoked, purge advertising cookies
    removeMarketingCookies();
  }

  window.dispatchEvent(
    new CustomEvent('docsynecx:marketing-consent', {
      detail: { granted },
    })
  );
}

/**
 * Purges advertising, pixel, and attribution cookies (_gcl_au, _fbp, _fbc)
 */
export function removeMarketingCookies(): void {
  if (typeof document === 'undefined') return;

  const cookieNames = document.cookie
    .split(';')
    .map((c) => c.trim().split('=')[0]);

  cookieNames.forEach((name) => {
    if (
      name === '_gcl_au' ||
      name === '_gcl_aw' ||
      name === '_fbp' ||
      name === '_fbc' ||
      name.startsWith('_gcl_') ||
      name === 'docsynecx_session_secure'
    ) {
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
