import type { Metadata } from 'next';
import { BASE_URL, SEO_PAGES, type SeoPageItem } from './seoData';

export type { SeoPageItem } from './seoData';
export { BASE_URL, SEO_PAGES } from './seoData';

// ─── Shared defaults ────────────────────────────────────────────────────────

const SITE_NAME   = 'Docsynecx';
const PUBLISHER   = 'SynecX AI Labs Private Limited';
const OG_IMAGE    = '/Docsynecx-Logo.svg';
const OG_IMAGE_W  = 1200;
const OG_IMAGE_H  = 630;

/**
 * Normalization map for various slugs, route paths, and shorthand identifiers
 * pointing to their canonical SEO data entry.
 */
const ALIAS_MAP: Record<string, string> = {
  // Core
  '/': '/',
  '': '/',
  'home': '/',
  'homepage': '/',

  // Platform - Finance Desk
  '/finance': '/finance-desk/',
  '/finance/': '/finance-desk/',
  '/finance-desk': '/finance-desk/',
  '/finance-desk/': '/finance-desk/',
  'finance': '/finance-desk/',
  'finance-desk': '/finance-desk/',
  'finance-overview': '/finance-desk/',

  // Finance modules
  'invoice-automation': '/finance-desk/invoice-automation/',
  '/invoice-automation': '/finance-desk/invoice-automation/',
  '/finance-desk/invoice-automation': '/finance-desk/invoice-automation/',
  '/finance-desk/invoice-automation/': '/finance-desk/invoice-automation/',

  'banking-reconciliation': '/finance-desk/banking-reconciliation/',
  '/banking-reconciliation': '/finance-desk/banking-reconciliation/',
  '/finance-desk/banking-reconciliation': '/finance-desk/banking-reconciliation/',
  '/finance-desk/banking-reconciliation/': '/finance-desk/banking-reconciliation/',

  'payment-reminders': '/finance-desk/payment-reminders/',
  '/payment-reminders': '/finance-desk/payment-reminders/',
  '/finance-desk/payment-reminders': '/finance-desk/payment-reminders/',
  '/finance-desk/payment-reminders/': '/finance-desk/payment-reminders/',

  'docsynecx-intelligence': '/finance-desk/docsynecx-intelligence/',
  '/docsynecx-intelligence': '/finance-desk/docsynecx-intelligence/',
  '/finance-desk/docsynecx-intelligence': '/finance-desk/docsynecx-intelligence/',
  '/finance-desk/docsynecx-intelligence/': '/finance-desk/docsynecx-intelligence/',

  'accounts-payable': '/finance-desk/accounts-payable/',
  '/accounts-payable': '/finance-desk/accounts-payable/',
  '/finance-desk/accounts-payable': '/finance-desk/accounts-payable/',
  '/finance-desk/accounts-payable/': '/finance-desk/accounts-payable/',

  // Platform - Logistics Desk
  '/logistics': '/logistics-desk/',
  '/logistics/': '/logistics-desk/',
  '/logistics-desk': '/logistics-desk/',
  '/logistics-desk/': '/logistics-desk/',
  'logistics-desk': '/logistics-desk/',
  'logistics-overview': '/logistics-desk/',

  // Logistics modules
  'email-to-booking': '/logistics-desk/email-to-booking/',
  'rfq-to-booking': '/logistics-desk/email-to-booking/',
  '/email-to-booking': '/logistics-desk/email-to-booking/',
  '/logistics/email-to-booking': '/logistics-desk/email-to-booking/',
  '/logistics-desk/email-to-booking': '/logistics-desk/email-to-booking/',
  '/logistics-desk/email-to-booking/': '/logistics-desk/email-to-booking/',

  'shipment-operations': '/logistics-desk/shipment-operations/',
  '/shipment-operations': '/logistics-desk/shipment-operations/',
  '/logistics/shipment-operations': '/logistics-desk/shipment-operations/',
  '/logistics-desk/shipment-operations': '/logistics-desk/shipment-operations/',
  '/logistics-desk/shipment-operations/': '/logistics-desk/shipment-operations/',

  'shipment-tracking': '/logistics-desk/shipment-tracking/',
  '/shipment-tracking': '/logistics-desk/shipment-tracking/',
  '/logistics/shipment-tracking': '/logistics-desk/shipment-tracking/',
  '/logistics-desk/shipment-tracking': '/logistics-desk/shipment-tracking/',
  '/logistics-desk/shipment-tracking/': '/logistics-desk/shipment-tracking/',

  'freight-intelligence': '/logistics-desk/freight-intelligence/',
  '/freight-intelligence': '/logistics-desk/freight-intelligence/',
  '/logistics/freight-intelligence': '/logistics-desk/freight-intelligence/',
  '/logistics-desk/freight-intelligence': '/logistics-desk/freight-intelligence/',
  '/logistics-desk/freight-intelligence/': '/logistics-desk/freight-intelligence/',

  'integrations': '/logistics-desk/integrations/',
  '/integrations': '/logistics-desk/integrations/',
  '/logistics/integrations': '/logistics-desk/integrations/',
  '/logistics-desk/integrations': '/logistics-desk/integrations/',
  '/logistics-desk/integrations/': '/logistics-desk/integrations/',

  // Industry Solutions
  '/solutions': '/solutions/',
  '/solutions/': '/solutions/',
  'solutions': '/solutions/',

  // Industry solutions slugs
  'automotive': '/solutions/automotive-ev/',
  'automotive-ev': '/solutions/automotive-ev/',
  '/solutions/automotive': '/solutions/automotive-ev/',
  '/solutions/automotive/': '/solutions/automotive-ev/',
  '/solutions/automotive-ev': '/solutions/automotive-ev/',
  '/solutions/automotive-ev/': '/solutions/automotive-ev/',

  'manufacturing': '/solutions/industrial-manufacturing/',
  'industrial-manufacturing': '/solutions/industrial-manufacturing/',
  '/solutions/manufacturing': '/solutions/industrial-manufacturing/',
  '/solutions/manufacturing/': '/solutions/industrial-manufacturing/',
  '/solutions/industrial-manufacturing': '/solutions/industrial-manufacturing/',
  '/solutions/industrial-manufacturing/': '/solutions/industrial-manufacturing/',

  'textile': '/solutions/textile-garments/',
  'textile-garments': '/solutions/textile-garments/',
  '/solutions/textile': '/solutions/textile-garments/',
  '/solutions/textile/': '/solutions/textile-garments/',
  '/solutions/textile-garments': '/solutions/textile-garments/',
  '/solutions/textile-garments/': '/solutions/textile-garments/',

  'retail': '/solutions/retail-distribution/',
  'retail-distribution': '/solutions/retail-distribution/',
  '/solutions/retail': '/solutions/retail-distribution/',
  '/solutions/retail/': '/solutions/retail-distribution/',
  '/solutions/retail-distribution': '/solutions/retail-distribution/',
  '/solutions/retail-distribution/': '/solutions/retail-distribution/',

  'logistics-solution': '/solutions/freight-logistics/',
  'freight-logistics': '/solutions/freight-logistics/',
  '/solutions/logistics': '/solutions/freight-logistics/',
  '/solutions/logistics/': '/solutions/freight-logistics/',
  '/solutions/freight-logistics': '/solutions/freight-logistics/',
  '/solutions/freight-logistics/': '/solutions/freight-logistics/',

  // Commercial & Company
  '/pricing': '/pricing/',
  '/pricing/': '/pricing/',
  'pricing': '/pricing/',

  '/about': '/about/',
  '/about/': '/about/',
  'about': '/about/',

  '/contact': '/contact/',
  '/contact/': '/contact/',
  'contact': '/contact/',

  '/events/iics-2026': '/events/iics-2026/',
  '/events/iics-2026/': '/events/iics-2026/',
  'iics-2026': '/events/iics-2026/',

  '/privacy-policy': '/privacy-policy/',
  '/privacy-policy/': '/privacy-policy/',
  'privacy-policy': '/privacy-policy/',

  '/terms-of-service': '/terms-of-service/',
  '/terms-of-service/': '/terms-of-service/',
  'terms-of-service': '/terms-of-service/',

  // Blogs
  '/blogs': '/blogs/',
  '/blogs/': '/blogs/',
  'blogs': '/blogs/',
  '/blog': '/blogs/',
  '/blog/': '/blogs/',
  'blog': '/blogs/',

  'ai-logistics-document-verification-impact-2026': '/blogs/ai-logistics-document-verification-impact-2026/',
  '/blogs/ai-logistics-document-verification-impact-2026': '/blogs/ai-logistics-document-verification-impact-2026/',
  '/blogs/ai-logistics-document-verification-impact-2026/': '/blogs/ai-logistics-document-verification-impact-2026/',

  'manual-vs-ai-document-processing-cost-time-accuracy-comparison': '/blogs/manual-vs-ai-document-processing-cost-time-accuracy-comparison/',
  '/blogs/manual-vs-ai-document-processing-cost-time-accuracy-comparison': '/blogs/manual-vs-ai-document-processing-cost-time-accuracy-comparison/',
  '/blogs/manual-vs-ai-document-processing-cost-time-accuracy-comparison/': '/blogs/manual-vs-ai-document-processing-cost-time-accuracy-comparison/',

  'why-manual-invoice-entry-fails-at-scale': '/blogs/why-manual-invoice-entry-fails-at-scale/',
  '/blogs/why-manual-invoice-entry-fails-at-scale': '/blogs/why-manual-invoice-entry-fails-at-scale/',
  '/blogs/why-manual-invoice-entry-fails-at-scale/': '/blogs/why-manual-invoice-entry-fails-at-scale/',
};

/**
 * Resolves a given path, route slug, or identifier to its matching SeoPageItem.
 */
export function getSeoData(identifierOrPath: string): SeoPageItem | undefined {
  if (!identifierOrPath) return SEO_PAGES['/'];

  // Check alias map
  const cleaned = identifierOrPath.trim();
  const lower = cleaned.toLowerCase();

  const mappedKey = ALIAS_MAP[cleaned] || ALIAS_MAP[lower];
  if (mappedKey && SEO_PAGES[mappedKey]) {
    return SEO_PAGES[mappedKey];
  }

  // Direct match in SEO_PAGES
  if (SEO_PAGES[cleaned]) return SEO_PAGES[cleaned];

  // Try normalized trailing slash
  const withTrailing = cleaned.endsWith('/') ? cleaned : `${cleaned}/`;
  if (SEO_PAGES[withTrailing]) return SEO_PAGES[withTrailing];

  const withoutTrailing = cleaned.endsWith('/') ? cleaned.slice(0, -1) : cleaned;
  if (SEO_PAGES[withoutTrailing]) return SEO_PAGES[withoutTrailing];

  return undefined;
}

// ─── Metadata builder ───────────────────────────────────────────────────────

/**
 * Builds a fully-populated Next.js `Metadata` object for any page.
 *
 * Usage — static export:
 *   export const metadata = constructMetadata('/pricing/');
 *
 * Usage — dynamic generateMetadata:
 *   export async function generateMetadata({ params }) {
 *     return constructMetadata(`/blogs/${params.slug}/`, {
 *       openGraph: { images: [{ url: post.image, width: 1200, height: 630 }] },
 *     });
 *   }
 *
 * The second argument deep-merges into the base, so you only override what
 * differs from the SEO data sheet (title, OG image, canonical, etc.).
 */
export function constructMetadata(
  identifierOrPath: string,
  overrides?: Partial<Metadata>,
): Metadata {
  const seo     = getSeoData(identifierOrPath) ?? SEO_PAGES['/'];
  const fullUrl = `${BASE_URL}${seo.url === '/' ? '' : seo.url}`;

  const baseMeta: Metadata = {
    metadataBase: new URL(BASE_URL),

    title:       { absolute: seo.seoTitle },
    description: seo.metaDescription,
    keywords:    seo.keywords,

    authors:   [{ name: SITE_NAME, url: BASE_URL }],
    creator:   SITE_NAME,
    publisher: PUBLISHER,

    alternates: { canonical: seo.url },

    openGraph: {
      title:       seo.seoTitle,
      description: seo.metaDescription,
      url:         fullUrl,
      siteName:    SITE_NAME,
      locale:      'en_US',
      type:        'website',
      images: [{
        url:    OG_IMAGE,
        width:  OG_IMAGE_W,
        height: OG_IMAGE_H,
        alt:    seo.seoTitle,
      }],
    },

    twitter: {
      card:        'summary_large_image',
      title:       seo.seoTitle,
      description: seo.metaDescription,
      images:      [OG_IMAGE],
    },

    robots: {
      index:  true,
      follow: true,
      googleBot: {
        index:                true,
        follow:               true,
        'max-video-preview':  -1,
        'max-image-preview':  'large',
        'max-snippet':        -1,
      },
    },
  };

  if (!overrides) return baseMeta;

  // Deep-merge nested objects so callers only specify what changes.
  return {
    ...baseMeta,
    ...overrides,
    title:       overrides.title       ?? baseMeta.title,
    description: overrides.description ?? baseMeta.description,
    keywords:    overrides.keywords    ?? baseMeta.keywords,
    alternates:  { ...baseMeta.alternates,  ...overrides.alternates  },
    openGraph:   { ...baseMeta.openGraph,   ...overrides.openGraph   },
    twitter:     { ...baseMeta.twitter,     ...overrides.twitter     },
  };
}

/** Alias — same as `constructMetadata`, kept for backwards-compatibility. */
export const getPageMetadata = constructMetadata;

// ─── Structured data (JSON-LD) helpers ──────────────────────────────────────

/**
 * Organization schema — render on the homepage `<script>` tag.
 *
 * @example
 * <script
 *   type="application/ld+json"
 *   dangerouslySetInnerHTML={{ __html: jsonLd(organizationSchema()) }}
 * />
 */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type':    'Organization',
    name:       SITE_NAME,
    url:        BASE_URL,
    logo:       `${BASE_URL}${OG_IMAGE}`,
  };
}

/**
 * FAQPage schema — pass an array of `{ question, answer }` pairs.
 *
 * @example
 * <script
 *   type="application/ld+json"
 *   dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(landingFaqs)) }}
 * />
 */
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type':    'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type':        'Question',
      name:           question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}

/**
 * Serialises a JSON-LD object for `dangerouslySetInnerHTML`.
 * Escapes `<` to prevent script injection.
 *
 * @example
 * dangerouslySetInnerHTML={{ __html: jsonLd(organizationSchema()) }}
 */
export function jsonLd(schema: object): string {
  return JSON.stringify(schema).replace(/</g, '\\u003c');
}
