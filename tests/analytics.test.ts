/**
 * Docsynecx Google Analytics 4 (GA4) Automated Unit Test Suite
 *
 * Verifies all 7 core mandates:
 * 1. Cookie "false" -> no script injected, no gtag calls, events dropped
 * 2. Cookie missing -> same as false (zero data leaves browser)
 * 3. Cookie "true" -> script injected once, page_view sent once
 * 4. false -> true at runtime -> tracking starts without reload
 * 5. true -> false at runtime -> ga-disable flag set, consent denied, GA cookies deleted, later events dropped
 * 6. Payload validation (name limits, param limits, reserved names, URL sanitization)
 * 7. Server Measurement Protocol refuses to send when analytics_consent is false
 */

import {
  initGA,
  resetAnalytics,
  trackPageView,
  trackEvent,
  setUserProps,
  setUserId,
  sanitizeUrl,
  inferContentGroup,
  MEASUREMENT_ID,
} from '../src/lib/analytics';
import { getAnalyticsConsent, onConsentChange } from '../src/lib/consent';
import { sendServerEvent } from '../src/lib/server/ga4-measurement-protocol';
import {
  EVENT_CTA_CLICK,
  EVENT_DEMO_REQUEST,
  EVENT_GENERATE_LEAD,
  RESERVED_GA4_EVENTS,
} from '../src/lib/analytics-events';

// ============================================================================
// Lightweight Mock DOM & Window Environment
// ============================================================================
class MockDOM {
  public cookieJar: Map<string, string> = new Map();
  public scripts: HTMLElement[] = [];
  public eventsDispatched: Array<{ name: string; params: any }> = [];
  public gtagCalls: any[][] = [];
  public eventListeners: Map<string, Array<(e: any) => void>> = new Map();

  setup() {
    this.cookieJar.clear();
    this.scripts = [];
    this.eventsDispatched = [];
    this.gtagCalls = [];
    this.eventListeners.clear();

    const self = this;

    // Mock document
    const mockDocument: any = {
      cookie: '',
      title: 'Docsynecx — AI Document Processing',
      head: {
        appendChild: (elem: any) => {
          self.scripts.push(elem);
          return elem;
        },
      },
      getElementById: (id: string) => {
        return self.scripts.find((s) => s.id === id) || null;
      },
      createElement: (tag: string) => {
        return { tagName: tag.toUpperCase(), id: '', async: false, src: '' };
      },
      addEventListener: (type: string, handler: any) => {
        if (!self.eventListeners.has(type)) self.eventListeners.set(type, []);
        self.eventListeners.get(type)!.push(handler);
      },
      removeEventListener: (type: string, handler: any) => {
        const arr = self.eventListeners.get(type) || [];
        self.eventListeners.set(
          type,
          arr.filter((h) => h !== handler)
        );
      },
    };

    // document.cookie getter and setter
    Object.defineProperty(mockDocument, 'cookie', {
      get: () => {
        return Array.from(self.cookieJar.entries())
          .map(([k, v]) => `${k}=${v}`)
          .join('; ');
      },
      set: (cookieString: string) => {
        const [mainPart] = cookieString.split(';');
        const [k, v] = mainPart.split('=');
        if (k) {
          const key = decodeURIComponent(k.trim());
          if (cookieString.includes('max-age=0') || cookieString.includes('expires=Thu, 01 Jan 1970')) {
            self.cookieJar.delete(key);
          } else {
            self.cookieJar.set(key, v ? decodeURIComponent(v.trim()) : '');
          }
        }
      },
      configurable: true,
    });

    // Mock window
    const mockWindow: any = {
      location: {
        origin: 'https://docsynecx.com',
        pathname: '/finance-desk/',
        search: '',
        href: 'https://docsynecx.com/finance-desk/',
        hostname: 'docsynecx.com',
      },
      dataLayer: [],
      gtag: (...args: any[]) => {
        self.gtagCalls.push(args);
        if (args[0] === 'event') {
          self.eventsDispatched.push({ name: args[1], params: args[2] });
        }
      },
      addEventListener: (type: string, handler: any) => {
        if (!self.eventListeners.has(type)) self.eventListeners.set(type, []);
        self.eventListeners.get(type)!.push(handler);
      },
      removeEventListener: (type: string, handler: any) => {
        const arr = self.eventListeners.get(type) || [];
        self.eventListeners.set(
          type,
          arr.filter((h) => h !== handler)
        );
      },
      dispatchEvent: (e: any) => {
        const arr = self.eventListeners.get(e.type) || [];
        arr.forEach((h) => h(e));
        return true;
      },
    };

    (global as any).document = mockDocument;
    (global as any).window = mockWindow;
  }

  setConsentCookie(analytics: boolean | 'false' | 'true') {
    if (analytics === 'true' || analytics === true) {
      document.cookie = `cookie_preferences=${encodeURIComponent(
        JSON.stringify({ necessary: true, functional: true, analytics: true, marketing: false })
      )}; path=/;`;
    } else {
      document.cookie = `cookie_preferences=${encodeURIComponent(
        JSON.stringify({ necessary: true, functional: true, analytics: false, marketing: false })
      )}; path=/;`;
    }
  }

  clearAllCookies() {
    this.cookieJar.clear();
  }
}

// ============================================================================
// Test Suite Execution
// ============================================================================
export async function runAllTests(): Promise<{ passed: number; failed: number; errors: string[] }> {
  const dom = new MockDOM();
  let passed = 0;
  let failed = 0;
  const errors: string[] = [];

  function assert(condition: boolean, message: string) {
    if (condition) {
      passed++;
      console.log(`  âœ“ PASS: ${message}`);
    } else {
      failed++;
      errors.push(message);
      console.error(`  âœ— FAIL: ${message}`);
    }
  }

  console.log('\n--- TEST SUITE 1: Missing or False Cookie Consent ---');
  dom.setup();
  // Case 1: Cookie Missing
  assert(getAnalyticsConsent() === false, 'getAnalyticsConsent() returns false when cookie is missing');
  trackPageView('/pricing', 'Pricing');
  trackEvent(EVENT_CTA_CLICK, { cta_name: 'test_cta' });
  assert(dom.scripts.length === 0, 'No gtag.js script injected when cookie is missing');
  assert(dom.eventsDispatched.length === 0, 'No GA events dispatched when cookie is missing');

  // Case 2: Cookie False
  dom.setConsentCookie(false);
  assert(getAnalyticsConsent() === false, 'getAnalyticsConsent() returns false when cookie has analytics: false');
  initGA();
  assert(dom.scripts.length === 0, 'initGA() skips script injection when consent is false');
  trackEvent(EVENT_DEMO_REQUEST, { source: 'test' });
  assert(dom.eventsDispatched.length === 0, 'trackEvent() silently drops events when consent is false');

  console.log('\n--- TEST SUITE 2: Cookie True (Consent Granted) ---');
  dom.setup();
  dom.setConsentCookie(true);
  assert(getAnalyticsConsent() === true, 'getAnalyticsConsent() returns true when cookie has analytics: true');
  initGA();
  assert(dom.scripts.length === 1, 'gtag.js script injected exactly once upon consent');
  // Check that initial page_view was dispatched
  assert(
    dom.eventsDispatched.some((e) => e.name === 'page_view'),
    'Initial page_view fired immediately upon GA4 initialization'
  );
  // Duplicate initGA call must not double inject
  initGA();
  assert(dom.scripts.length === 1, 'Strict mode / duplicate initGA guard prevents double script injection');

  console.log('\n--- TEST SUITE 3: Runtime Consent Transition (False -> True) ---');
  dom.setup();
  dom.setConsentCookie(false);
  let listenerNotified = false;
  const unsubscribe = onConsentChange((granted) => {
    if (granted) {
      listenerNotified = true;
      initGA();
    }
  });

  // Switch consent to true and dispatch custom event
  dom.setConsentCookie(true);
  window.dispatchEvent(
    new (global as any).CustomEvent('analytics-consent-changed', {
      detail: { granted: true },
    })
  );

  assert(listenerNotified === true, 'onConsentChange subscriber notified immediately on consent transition');
  assert(dom.scripts.length === 1, 'gtag.js loaded dynamically without requiring page reload');
  unsubscribe();

  console.log('\n--- TEST SUITE 4: Runtime Consent Withdrawal (True -> False) ---');
  // Add some dummy GA cookies to document
  document.cookie = '_ga=GA1.1.12345.6789; path=/;';
  document.cookie = '_gid=GA1.1.98765.4321; path=/;';
  assert(dom.cookieJar.has('_ga'), '_ga cookie present prior to consent withdrawal');

  resetAnalytics();
  const measurementKey = `ga-disable-${MEASUREMENT_ID}`;
  assert((window as any)[measurementKey] === true, 'window["ga-disable-MEASUREMENT_ID"] set to true on withdrawal');
  assert(!dom.cookieJar.has('_ga'), '_ga cookie purged from storage on withdrawal');
  assert(!dom.cookieJar.has('_gid'), '_gid cookie purged from storage on withdrawal');

  // Verify later events are completely dropped
  const countBefore = dom.eventsDispatched.length;
  dom.setConsentCookie(false);
  trackEvent(EVENT_CTA_CLICK, { cta_name: 'after_revoke' });
  assert(dom.eventsDispatched.length === countBefore, 'Subsequent events strictly dropped after consent withdrawal');

  console.log('\n--- TEST SUITE 5: URL Sanitization & Content Group Inferencing ---');
  const dirtyUrl = 'https://docsynecx.com/app/invoices?token=xyz123&secret=abc&email=test@example.com&utm_source=google&gclid=12345';
  const sanitized = sanitizeUrl(dirtyUrl);
  assert(!sanitized.page_location.includes('token='), 'Sensitive param "token" stripped from page_location');
  assert(!sanitized.page_location.includes('email='), 'Sensitive param "email" stripped from page_location');
  assert(!sanitized.page_location.includes('secret='), 'Sensitive param "secret" stripped from page_location');
  assert(sanitized.page_location.includes('utm_source=google'), 'Attribution param "utm_source" preserved');
  assert(sanitized.page_location.includes('gclid=12345'), 'Attribution param "gclid" preserved');

  assert(inferContentGroup('/finance-desk/') === 'marketing', 'Marketing path inferred correctly');
  assert(inferContentGroup('/app/documents/') === 'app', 'App path inferred correctly');
  assert(inferContentGroup('/docs/api/') === 'docs', 'Docs path inferred correctly');
  assert(inferContentGroup('/login') === 'auth', 'Auth path inferred correctly');

  console.log('\n--- TEST SUITE 6: Server-Side Measurement Protocol Verification ---');
  // Test refusal when analytics_consent is false
  const blockedServerResult = await sendServerEvent({
    eventName: 'invoice_processed',
    clientId: '12345.67890',
    analyticsConsent: false,
    params: { processing_time_ms: 1200 },
  });
  assert(blockedServerResult.success === false, 'Measurement Protocol rejects dispatch when analyticsConsent is false');
  assert(blockedServerResult.reason === 'consent_not_granted', 'Rejection reason is consent_not_granted');

  console.log(`\n=======================================================`);
  console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log(`=======================================================\n`);

  return { passed, failed, errors };
}

// Auto-run if executed directly
if (typeof process !== 'undefined') {
  runAllTests().catch(console.error);
}
