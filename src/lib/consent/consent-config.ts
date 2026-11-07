import { CategoryMetadata, ConsentCategories } from '@/src/types/consent';

export const COOKIE_NAME = 'cookie_preferences';
export const CONSENT_VERSION = '1.0';

export const STORAGE_KEY_SESSION_LOCATION = 'docsynecx_visitor_location';
export const STORAGE_KEY_SECURE_SESSION = 'docsynecx_session_secure';

/**
 * List of localStorage keys governing user personalization and theme.
 * When functional consent is false or revoked, these keys must NEVER be persisted
 * and existing keys must be purged from localStorage immediately.
 */
export const FUNCTIONAL_STORAGE_KEYS = [
  'autodocs-theme',
  'autodocs-theme-opacity',
  'autodocs-brand-hex',
  'autodocs-bg-color',
  'autodocs-bg-id',
  'autodocs-custom-brand-list',
  'autodocs-custom-bg-list',
  'autodocs-dark-theme-v1',
  'autodocs-theme-enabled',
  'autodocs-theme-hue',
  'autodocs-theme-custom-alpha',
  'autodocs_hero_bg_paused',
  'autodocs-landing-layout',
  'autodocs-v2-appearance',
  'autodocs-navbar-theme',
  'autodocs-resource-card-style',
  'docsynecx_resource_card_style',
  'docsynecx-resource-card-style',
];

/**
 * Calculates consent cookie expiration in days according to the explicit specification:
 * 1. If only essential and functional are chosen -> Expiry: 2 days.
 * 2. If all are chosen -> Expiry: 365 days (1 year).
 * 3. When analytics is not chosen, but functional & marketing are chosen -> considered Accept All, Expiry: 365 days (1 year).
 * 4. Only if marketing and functional are not chosen (e.g. Reject All or only analytics) -> Expiry: 4 days.
 * 5. Any other selection where user did not accept all -> Expiry: 4 days.
 */
export function calculateConsentExpiryDays(categories: Omit<ConsentCategories, 'essential'>): number {
  const { functional, analytics, marketing } = categories;

  // Rule 2 & Rule 3: All chosen OR functional & marketing chosen without analytics -> 365 days
  if (functional && marketing) {
    return 365;
  }

  // Rule 1: Only essential and functional are chosen -> 2 days
  if (functional && !analytics && !marketing) {
    return 2;
  }

  // Rule 4 & Rule 5: Marketing and functional not chosen, or any other non-accept-all selection -> 4 days
  return 4;
}

export const CONSENT_CATEGORIES_METADATA: Record<keyof ConsentCategories, CategoryMetadata> = {
  essential: {
    id: 'essential',
    name: 'Essential (Strictly Necessary)',
    description:
      'Required for core platform functionality, security, fraud prevention, CSRF protection, and consent persistence. Cannot be disabled.',
    required: true,
    examples: ['Session identifiers', 'CSRF verification', 'Cookie consent state', 'Security tokens'],
  },
  functional: {
    id: 'functional',
    name: 'Functional (Personalization)',
    description:
      'Enables user personalization, such as theme and custom brand colors, preferred language, regional localization via IP lookup, and UI layout settings.',
    required: false,
    examples: ['Theme preferences', 'Custom brand color', 'City and regional content', 'Timezone'],
  },
  analytics: {
    id: 'analytics',
    name: 'Analytics (Usage & Performance)',
    description:
      'Helps us understand how visitors interact with the site, measure page performance, navigation paths, and optimize user experience without advertising tracking.',
    required: false,
    examples: ['Google Analytics 4', 'Page view counts', 'Scroll depth', 'Session duration'],
  },
  marketing: {
    id: 'marketing',
    name: 'Marketing & Attribution',
    description:
      'Allows conversion tracking, campaign attribution parameters, and relevant marketing messaging across partner channels.',
    required: false,
    examples: ['Google Ads conversion', 'Meta Pixel attribution', 'Campaign parameters', 'Audience metrics'],
  },
};
