/**
 * Docsynecx Google Analytics 4 (GA4) Central Module
 *
 * Privacy & Compliance Mandate:
 * consent = true is the only state in which any data leaves the browser.
 * When consent is false, missing, or revoked:
 * - No script is injected
 * - No network requests to googletagmanager.com or google-analytics.com occur
 * - No window.dataLayer event queueing occurs
 * - No tracking cookies (_ga, _gid, etc.) are set
 * - trackEvent and trackPageView silently drop calls without buffering
 */

import { getAnalyticsConsent } from './consent';
import {
  RESERVED_GA4_EVENTS,
  ALLOWED_RECOMMENDED_EVENTS,
  CONTENT_GROUP_MARKETING,
  CONTENT_GROUP_APP,
  CONTENT_GROUP_DOCS,
  CONTENT_GROUP_AUTH,
  ContentGroup,
  USER_PROP_PLAN_TYPE,
  USER_PROP_ACCOUNT_ROLE,
  USER_PROP_SITE_SECTION,
} from './analytics-events';

// Measurement ID from environment variable (with fallback to provided property ID)
export const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-5WXXVPGWG6';

// Fallback environment identifier (dev, staging, production)
export function getAppEnv(): string {
  return process.env.NEXT_PUBLIC_APP_ENV || process.env.NODE_ENV || 'production';
}

// Global window extension for gtag & dataLayer
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

// Internal state trackers
let isScriptInjected = false;
let isInitialized = false;
let declarativeClickListener: ((e: MouseEvent) => void) | null = null;
let lastClickTimestamp = 0;

/**
 * Checks whether debug mode is active.
 * Enabled via NEXT_PUBLIC_GA_DEBUG_MODE='true', ?ga_debug=true in URL, or non-production environment.
 */
export function isDebugMode(): boolean {
  if (typeof window === 'undefined') return false;
  if (process.env.NEXT_PUBLIC_GA_DEBUG_MODE === 'true') return true;
  if (window.location && window.location.search.includes('ga_debug=true')) return true;
  return process.env.NODE_ENV !== 'production';
}

/**
 * Strips sensitive PII and authentication tokens from URLs while preserving UTM attribution & gclid.
 */
export function sanitizeUrl(rawUrl: string): { page_location: string; page_path: string } {
  try {
    const url = new URL(rawUrl, typeof window !== 'undefined' ? window.location.origin : 'https://docsynecx.com');
    const sanitizedParams = new URLSearchParams();

    // Query parameters strictly blocked from leaving the browser
    const blockedParams = new Set([
      'email',
      'token',
      'key',
      'code',
      'reset',
      'invite',
      'session',
      'otp',
      'password',
      'pwd',
      'secret',
      'access_token',
      'refresh_token',
      'auth_token',
      'user_id',
      'name',
      'phone',
    ]);

    url.searchParams.forEach((val, key) => {
      const lower = key.toLowerCase();
      if (!blockedParams.has(lower) && !lower.includes('token') && !lower.includes('secret')) {
        sanitizedParams.set(key, val);
      }
    });

    const queryString = sanitizedParams.toString();
    const page_path = url.pathname + (queryString ? `?${queryString}` : '');
    const page_location = `${url.origin}${page_path}`;

    return { page_location, page_path };
  } catch {
    return {
      page_location: typeof window !== 'undefined' ? window.location.origin : 'https://docsynecx.com',
      page_path: '/',
    };
  }
}

/**
 * Infers content_group (marketing | app | docs | auth) based on URL pathname.
 */
export function inferContentGroup(pathname: string): ContentGroup {
  if (pathname.startsWith('/app') || pathname.startsWith('/dashboard')) {
    return CONTENT_GROUP_APP;
  }
  if (pathname.startsWith('/docs') || pathname.startsWith('/help') || pathname.startsWith('/api-reference')) {
    return CONTENT_GROUP_DOCS;
  }
  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/signup') ||
    pathname.startsWith('/auth') ||
    pathname.startsWith('/reset-password')
  ) {
    return CONTENT_GROUP_AUTH;
  }
  return CONTENT_GROUP_MARKETING;
}

/**
 * Runtime debug validator that verifies GA4 constraints.
 */
function validateEvent(name: string, params: Record<string, unknown>): boolean {
  if (!isDebugMode()) return true;

  // 1. Reserved event names check
  if (RESERVED_GA4_EVENTS.has(name) && !ALLOWED_RECOMMENDED_EVENTS.has(name)) {
    console.warn(
      `[GA4 Validator Error] Event "${name}" is a reserved GA4 event name and cannot be used for custom events.`
    );
    return false;
  }

  // 2. Name length check (max 40 chars)
  if (name.length > 40) {
    console.warn(`[GA4 Validator Error] Event name "${name}" exceeds 40 characters (${name.length} chars).`);
    return false;
  }

  // 3. Snake_case naming check
  if (!/^[a-z][a-z0-9_]*$/.test(name)) {
    console.warn(
      `[GA4 Validator Warning] Event name "${name}" violates snake_case convention (letters, numbers, underscores starting with lowercase letter).`
    );
  }

  // 4. Max 25 params per event
  const paramKeys = Object.keys(params);
  if (paramKeys.length > 25) {
    console.warn(
      `[GA4 Validator Warning] Event "${name}" has ${paramKeys.length} parameters, exceeding the GA4 limit of 25 parameters.`
    );
  }

  // 5. Param value length check (max 100 chars)
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === 'string' && value.length > 100) {
      console.warn(
        `[GA4 Validator Warning] Parameter "${key}" in event "${name}" exceeds 100 characters (${value.length} chars). It will be truncated in production.`
      );
    }
  }

  return true;
}

/**
 * Sanitizes and truncates parameters to GA4 limits.
 */
function sanitizeParams(params: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  const entries = Object.entries(params).slice(0, 25);

  for (const [key, value] of entries) {
    if (typeof value === 'string') {
      result[key] = value.slice(0, 100);
    } else {
      result[key] = value;
    }
  }

  return result;
}

/**
 * Purges Google Analytics cookies (_ga, _gid, _gat, _gac_*) across domains and subdomains.
 */
export function removeGA4Cookies(): void {
  if (typeof document === 'undefined') return;

  const cookieNames = document.cookie.split(';').map((c) => c.trim().split('=')[0]);

  cookieNames.forEach((name) => {
    if (
      name === '_ga' ||
      name.startsWith('_ga_') ||
      name === '_gid' ||
      name === '_gat' ||
      name.startsWith('_gat_') ||
      name.startsWith('_gac_')
    ) {
      document.cookie = `${encodeURIComponent(name)}=; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `${encodeURIComponent(name)}=; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost;`;
      const domainParts = window.location.hostname.split('.');
      while (domainParts.length > 1) {
        const domain = domainParts.join('.');
        document.cookie = `${encodeURIComponent(name)}=; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain};`;
        document.cookie = `${encodeURIComponent(name)}=; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;
        domainParts.shift();
      }
    }
  });
}

/**
 * Delegated click listener for declarative tracking:
 * e.g., <button data-track="cta_click" data-track-name="hero_demo" data-track-location="hero">
 */
function initDeclarativeTracking(): void {
  if (typeof document === 'undefined' || declarativeClickListener) return;

  declarativeClickListener = (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    const trackElem = target.closest('[data-track]') as HTMLElement | null;
    if (!trackElem) return;

    // Prevent double-firing (e.g. from nested click bubbles within 250ms)
    const now = Date.now();
    if (now - lastClickTimestamp < 250) {
      return;
    }
    lastClickTimestamp = now;

    const eventName = trackElem.getAttribute('data-track') || 'cta_click';
    const ctaName = trackElem.getAttribute('data-track-name') || trackElem.textContent?.trim().slice(0, 50) || 'unnamed_cta';
    const ctaLocation = trackElem.getAttribute('data-track-location') || 'unknown';
    const navItem = trackElem.getAttribute('data-track-item') || ctaName;
    const navLocation = trackElem.getAttribute('data-track-nav-location') || ctaLocation;

    if (eventName === 'navigation_click') {
      trackEvent('navigation_click', {
        nav_item: navItem,
        nav_location: navLocation,
      });
    } else {
      trackEvent(eventName, {
        cta_name: ctaName,
        cta_location: ctaLocation,
        page_path: typeof window !== 'undefined' ? window.location.pathname : '/',
      });
    }
  };

  document.addEventListener('click', declarativeClickListener, true);
}

/**
 * Removes the declarative click tracking listener.
 */
function removeDeclarativeTracking(): void {
  if (typeof document === 'undefined' || !declarativeClickListener) return;
  document.removeEventListener('click', declarativeClickListener, true);
  declarativeClickListener = null;
}

/**
 * Initializes Google Analytics 4:
 * Injects gtag.js asynchronously, configures consent mode v2 defaults, sets linker,
 * and sends the first page_view for the active page.
 */
export function initGA(): void {
  if (typeof window === 'undefined') return;

  // 1. Strict Consent Check: Consent = true is the only state in which any data leaves the browser
  if (!getAnalyticsConsent()) {
    if (isDebugMode()) {
      console.log(
        '[GA4] Cookie consent is currently DENIED. No network requests will be sent to Google until consent is accepted.'
      );
    }
    return;
  }

  // 2. Missing Measurement ID guard
  if (!MEASUREMENT_ID) {
    if (isDebugMode()) {
      console.warn('[GA4] NEXT_PUBLIC_GA_MEASUREMENT_ID is not configured. Analytics initialization skipped.');
    }
    return;
  }

  // Guard against duplicate initialization in the same session
  if (isInitialized) {
    return;
  }

  // Remove ga-disable flag if previously set
  delete window[`ga-disable-${MEASUREMENT_ID}`];
  window[`ga-disable-${MEASUREMENT_ID}`] = false;

  // 3. Initialize dataLayer and window.gtag canonical queue
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function () {
      window.dataLayer!.push(arguments);
    };
  }

  // Rule 7: Set consent default to denied BEFORE config as safety net
  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
  });

  // Rule 4 & 7: Immediately update analytics_storage to granted
  window.gtag('consent', 'update', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });

  // MANDATORY: Timestamp initialization required by Google Tag Manager / gtag.js runtime
  window.gtag('js', new Date());

  // Enhanced Measurement is assumed ON in GA4, but 'Page changes based on browser history events' is OFF.
  // SPA page navigation is explicitly dispatched in trackPageView.
  window.gtag('config', MEASUREMENT_ID, {
    send_page_view: false,
    cookie_domain: 'auto',
    linker: {
      domains: ['docsynecx.com', 'app.docsynecx.com'],
    },
  });

  // 4. Inject script asynchronously (guarded against duplicate DOM nodes)
  const existingScript = document.getElementById('ga4-gtag-script');
  if (!existingScript) {
    const script = document.createElement('script');
    script.id = 'ga4-gtag-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(MEASUREMENT_ID)}`;
    script.onload = () => {
      if (isDebugMode()) {
        console.log('[GA4] gtag.js successfully loaded from Google Tag Manager.');
      }
    };
    script.onerror = (e) => {
      console.warn(
        '[GA4 Error] Failed to load gtag.js. If you have an Ad Blocker (e.g. uBlock Origin, AdGuard, Brave Shields) enabled in your browser, it will block requests to googletagmanager.com and google-analytics.com. Please pause or disable the ad blocker on localhost to test.',
        e
      );
    };
    document.head.appendChild(script);
    isScriptInjected = true;
  }

  isInitialized = true;

  // 5. Attach declarative click tracker
  initDeclarativeTracking();

  // 6. Send the current page's page_view immediately upon consent
  trackPageView();

  if (isDebugMode()) {
    console.log(`[GA4] Initialized successfully with measurement ID: ${MEASUREMENT_ID}`);
  }
}

/**
 * Resets Google Analytics 4 when consent is revoked or user logs out:
 * Sets ga-disable flag, updates consent to denied, purges GA cookies,
 * and drops all declarative listeners.
 */
export function resetAnalytics(): void {
  if (typeof window === 'undefined') return;

  // 1. Immediately set ga-disable flag
  if (MEASUREMENT_ID) {
    window[`ga-disable-${MEASUREMENT_ID}`] = true;
  }

  // 2. Update consent to denied
  if (window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
  }

  // 3. Clear user identification
  if (window.gtag && MEASUREMENT_ID) {
    window.gtag('config', MEASUREMENT_ID, { user_id: null });
    window.gtag('set', 'user_properties', {
      [USER_PROP_PLAN_TYPE]: null,
      [USER_PROP_ACCOUNT_ROLE]: null,
      [USER_PROP_SITE_SECTION]: null,
    });
  }

  // 4. Delete GA cookies across domains
  removeGA4Cookies();

  // 5. Remove declarative click tracker
  removeDeclarativeTracking();

  isInitialized = false;

  if (isDebugMode()) {
    console.log('[GA4] Analytics reset: ga-disable enabled, cookies purged, tracking stopped.');
  }
}

/**
 * Tracks SPA page view:
 * Deduplicates, sanitizes URL parameters to protect privacy, and sends content_group & app_env.
 */
export function trackPageView(path?: string, title?: string): void {
  if (typeof window === 'undefined') return;

  // Consent verification
  if (!getAnalyticsConsent() || !window.gtag || !MEASUREMENT_ID) {
    return;
  }

  const rawUrl = path ? (path.startsWith('http') ? path : `${window.location.origin}${path}`) : window.location.href;
  const { page_location, page_path } = sanitizeUrl(rawUrl);
  const page_title = title || document.title || 'Docsynecx';
  const content_group = inferContentGroup(page_path);
  const app_env = getAppEnv();

  const payload: Record<string, unknown> = {
    page_location,
    page_path,
    page_title,
    content_group,
    app_env,
  };

  if (isDebugMode()) {
    payload.debug_mode = true;
    console.log('[GA4 Debug] page_view:', payload);
  }

  window.gtag('event', 'page_view', payload);
}

/**
 * Tracks custom application and marketing events:
 * Performs strict validation in debug mode, sanitizes parameters, and appends app_env & content_group.
 */
export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;

  // Strict Consent Check: Drop event silently if not consented
  if (!getAnalyticsConsent() || !window.gtag || !MEASUREMENT_ID) {
    return;
  }

  const currentPath = window.location.pathname;
  const content_group = inferContentGroup(currentPath);
  const app_env = getAppEnv();

  // Merge automatic dimensions
  const mergedParams: Record<string, unknown> = {
    app_env,
    content_group,
    ...params,
  };

  // Debug mode validation
  validateEvent(name, mergedParams);

  if (isDebugMode()) {
    mergedParams.debug_mode = true;
    console.log(`[GA4 Debug] event "${name}":`, mergedParams);
  }

  const cleanParams = sanitizeParams(mergedParams);
  window.gtag('event', name, cleanParams);
}

/**
 * Sets privacy-safe user properties (plan_type, account_role, site_section).
 * NEVER sends PII (email, name, phone, etc.).
 */
export function setUserProps(props: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;

  if (!getAnalyticsConsent() || !window.gtag || !MEASUREMENT_ID) {
    return;
  }

  const safeProps: Record<string, unknown> = {};
  const allowedKeys = new Set<string>([
    USER_PROP_PLAN_TYPE,
    USER_PROP_ACCOUNT_ROLE,
    USER_PROP_SITE_SECTION,
  ]);

  for (const [key, value] of Object.entries(props)) {
    if (allowedKeys.has(key)) {
      safeProps[key] = typeof value === 'string' ? value.slice(0, 100) : value;
    } else if (isDebugMode()) {
      console.warn(`[GA4 Validator Warning] Dropped unapproved user property: "${key}".`);
    }
  }

  if (isDebugMode()) {
    console.log('[GA4 Debug] user_properties:', safeProps);
  }

  window.gtag('set', 'user_properties', safeProps);
}

/**
 * Sets privacy-safe opaque internal user ID.
 * NEVER pass email, phone, or PII.
 */
export function setUserId(userId: string | null): void {
  if (typeof window === 'undefined') return;

  if (!getAnalyticsConsent() || !window.gtag || !MEASUREMENT_ID) {
    return;
  }

  if (userId && (userId.includes('@') || userId.length > 100)) {
    if (isDebugMode()) {
      console.warn('[GA4 Privacy Warning] Attempted to set invalid or potentially identifiable user_id.');
    }
    return;
  }

  window.gtag('config', MEASUREMENT_ID, { user_id: userId });
}

/**
 * Captures GA4 client_id asynchronously for server-side Measurement Protocol correlation.
 * Protected with a 500ms timeout fallback to ensure caller promises never hang.
 */
export function getGAClientId(): Promise<string | null> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !getAnalyticsConsent() || !window.gtag || !MEASUREMENT_ID) {
      resolve(null);
      return;
    }

    const timer = setTimeout(() => resolve(null), 500);

    try {
      window.gtag('get', MEASUREMENT_ID, 'client_id', (clientId: string) => {
        clearTimeout(timer);
        resolve(clientId || null);
      });
    } catch {
      clearTimeout(timer);
      resolve(null);
    }
  });
}

/**
 * Captures GA4 session_id asynchronously for server-side Measurement Protocol correlation.
 * Protected with a 500ms timeout fallback to ensure caller promises never hang.
 */
export function getGASessionId(): Promise<string | null> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !getAnalyticsConsent() || !window.gtag || !MEASUREMENT_ID) {
      resolve(null);
      return;
    }

    const timer = setTimeout(() => resolve(null), 500);

    try {
      window.gtag('get', MEASUREMENT_ID, 'session_id', (sessionId: string) => {
        clearTimeout(timer);
        resolve(sessionId || null);
      });
    } catch {
      clearTimeout(timer);
      resolve(null);
    }
  });
}

/**
 * Returns whether GA4 has been initialized in the current browser session.
 */
export function isGAInitialized(): boolean {
  return isInitialized;
}
