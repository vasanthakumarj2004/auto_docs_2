/**
 * Docsynecx Marketing Analytics Helpers
 * Type-safe wrappers for every marketing website event defined in the GA4 spec.
 *
 * Privacy Guarantees:
 * - All calls delegate to trackEvent() in src/lib/analytics.ts, which strictly
 *   verifies cookie consent before any data leaves the browser.
 *
 * consent = true is the only state in which any data leaves the browser.
 */

import { trackEvent } from './analytics';
import {
  EVENT_CTA_CLICK,
  EVENT_PRICING_VIEW,
  EVENT_DEMO_REQUEST,
  EVENT_GENERATE_LEAD,
  EVENT_CONTACT_SUBMIT,
  EVENT_NEWSLETTER_SIGNUP,
  EVENT_FAQ_EXPAND,
  EVENT_VIDEO_PLAY,
  EVENT_NAVIGATION_CLICK,
  PARAM_CTA_NAME,
  PARAM_CTA_LOCATION,
  PARAM_PAGE_PATH,
  PARAM_PLAN_VIEWED,
  PARAM_SOURCE,
  PARAM_LEAD_SOURCE,
  PARAM_FORM_NAME,
  PARAM_VALUE,
  PARAM_CURRENCY,
  PARAM_SIGNUP_LOCATION,
  PARAM_FAQ_QUESTION,
  PARAM_VIDEO_NAME,
  PARAM_VIDEO_LOCATION,
  PARAM_NAV_ITEM,
  PARAM_NAV_LOCATION,
} from './analytics-events';

// ============================================================================
// Per-page-view deduplication sets (reset on SPA navigation)
// ============================================================================
let firedFaqQuestions: Set<string> = new Set();
let firedVideoPlays: Set<string> = new Set();

/**
 * Call this on every SPA route change to reset per-page-view
 * deduplication guards for faq_expand and video_play.
 * Called automatically by useAnalyticsPageView hook.
 */
export function resetPerPageTrackingState(): void {
  firedFaqQuestions = new Set();
  firedVideoPlays = new Set();
}

// ============================================================================
// Marketing Events
// ============================================================================

/**
 * cta_click – fired by the declarative click tracker automatically via
 * data-track / data-track-name / data-track-location attributes.
 * Also callable imperatively for programmatic CTAs.
 *
 * Usage (declarative, preferred):
 *   <button data-track="cta_click" data-track-name="hero_book_demo" data-track-location="hero">
 *
 * Usage (imperative):
 *   trackCtaClick('hero_book_demo', 'hero')
 */
export function trackCtaClick(ctaName: string, ctaLocation: string): void {
  trackEvent(EVENT_CTA_CLICK, {
    [PARAM_CTA_NAME]: ctaName.slice(0, 100),
    [PARAM_CTA_LOCATION]: ctaLocation.slice(0, 100),
    [PARAM_PAGE_PATH]: typeof window !== 'undefined' ? window.location.pathname : '/',
  });
}

/**
 * pricing_view – fire once when /pricing is opened.
 * Pass plan_viewed only when a specific plan card becomes visible.
 *
 * Usage:
 *   trackPricingView()           // page opened, no specific plan
 *   trackPricingView('pro')      // user scrolled to / hovered the Pro plan
 */
export function trackPricingView(planViewed?: string): void {
  trackEvent(EVENT_PRICING_VIEW, {
    ...(planViewed ? { [PARAM_PLAN_VIEWED]: planViewed.slice(0, 100) } : {}),
  });
}

/**
 * demo_request – fire on demo form submit attempt (whether or not it succeeds).
 * For confirmed 2xx responses, also fire generate_lead separately.
 *
 * Usage:
 *   trackDemoRequest('homepage_hero')
 */
export function trackDemoRequest(source: string): void {
  trackEvent(EVENT_DEMO_REQUEST, {
    [PARAM_SOURCE]: source.slice(0, 100),
  });
}

/**
 * generate_lead – fire ONLY after a confirmed 2xx server response.
 * This is a GA4 key event (conversion). Never fire on attempted submit.
 *
 * Usage:
 *   trackGenerateLead({ leadSource: 'demo_form', formName: 'hero_demo' })
 *   trackGenerateLead({ leadSource: 'contact', formName: 'contact_page', value: 500, currency: 'INR' })
 */
export function trackGenerateLead(params: {
  leadSource: string;
  formName: string;
  value?: number;
  currency?: string;
}): void {
  trackEvent(EVENT_GENERATE_LEAD, {
    [PARAM_LEAD_SOURCE]: params.leadSource.slice(0, 100),
    [PARAM_FORM_NAME]: params.formName.slice(0, 100),
    ...(typeof params.value === 'number' ? { [PARAM_VALUE]: params.value } : {}),
    ...(params.currency ? { [PARAM_CURRENCY]: params.currency.slice(0, 10) } : {}),
  });
}

/**
 * contact_submit – fire on successful contact form submission (after 2xx response).
 *
 * Usage:
 *   trackContactSubmit('contact_page')
 */
export function trackContactSubmit(formName: string): void {
  trackEvent(EVENT_CONTACT_SUBMIT, {
    [PARAM_FORM_NAME]: formName.slice(0, 100),
  });
}

/**
 * newsletter_signup – fire on successful newsletter opt-in.
 *
 * Usage:
 *   trackNewsletterSignup('footer')
 *   trackNewsletterSignup('popup')
 */
export function trackNewsletterSignup(signupLocation: 'footer' | 'popup' | string): void {
  trackEvent(EVENT_NEWSLETTER_SIGNUP, {
    [PARAM_SIGNUP_LOCATION]: signupLocation.slice(0, 100),
  });
}

/**
 * faq_expand – fire ONLY on open (not close). Deduplicated per question per page view.
 * faqQuestion is truncated to 100 chars automatically.
 *
 * Usage: Call from FAQ accordion onToggle when isOpen becomes true.
 *   if (isOpen) trackFaqExpand(question)
 */
export function trackFaqExpand(faqQuestion: string): void {
  const key = faqQuestion.slice(0, 100);
  if (firedFaqQuestions.has(key)) return; // fire only once per question per page view
  firedFaqQuestions.add(key);

  trackEvent(EVENT_FAQ_EXPAND, {
    [PARAM_FAQ_QUESTION]: key,
  });
}

/**
 * video_play – fire on play start ONLY. NOT on resume or seek.
 * Deduplicated per video per page view.
 *
 * Usage: Attach to video element's onPlay event and check wasPlaying ref:
 *   if (!wasPlaying.current) { trackVideoPlay(name, location); wasPlaying.current = true; }
 */
export function trackVideoPlay(videoName: string, videoLocation: string): void {
  const key = `${videoName}::${videoLocation}`;
  if (firedVideoPlays.has(key)) return; // fire only once per video per page view
  firedVideoPlays.add(key);

  trackEvent(EVENT_VIDEO_PLAY, {
    [PARAM_VIDEO_NAME]: videoName.slice(0, 100),
    [PARAM_VIDEO_LOCATION]: videoLocation.slice(0, 100),
  });
}

/**
 * navigation_click – fire on nav link clicks in header or footer.
 *
 * Usage:
 *   trackNavigationClick('Pricing', 'header')
 *   trackNavigationClick('Privacy Policy', 'footer')
 */
export function trackNavigationClick(
  navItem: string,
  navLocation: 'header' | 'footer' | string
): void {
  trackEvent(EVENT_NAVIGATION_CLICK, {
    [PARAM_NAV_ITEM]: navItem.slice(0, 100),
    [PARAM_NAV_LOCATION]: navLocation.slice(0, 100),
  });
}
