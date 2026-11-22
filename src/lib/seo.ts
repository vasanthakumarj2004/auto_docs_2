import type { Metadata } from 'next';
import { BASE_URL, SEO_PAGES, type SeoPageItem } from './seoData';

export type { SeoPageItem } from './seoData';
export { BASE_URL, SEO_PAGES } from './seoData';

// ─── Shared defaults ────────────────────────────────────────────────────────

const SITE_NAME = 'Docsynecx';
const PUBLISHER = 'SynecX AI Labs Private Limited';
// Primary 1376x768 social share card for rich link previews (WhatsApp, LinkedIn, Twitter, Facebook, Slack)
const OG_IMAGE_CARD = '/navbar-social-card.jpg';
const OG_IMAGE_CARD_W = 1376;
const OG_IMAGE_CARD_H = 768;
// Brand logo fallback
const OG_LOGO_SVG = '/Docsynecx-Logo.svg';

/**
 * Normalizes any route, slug, or absolute URL into a consistent, absolute canonical URL.
 * Ensures:
 * - Full domain https://docsynecx.com prefix
 * - Trailing slash for all pages (except root '/')
 * - Cleaned whitespace and lowercase path
 *
 * @example
 * toCanonicalUrl('/')                      // -> 'https://docsynecx.com/'
 * toCanonicalUrl('/pricing')               // -> 'https://docsynecx.com/pricing/'
 * toCanonicalUrl('/logistics-desk/RFQ/')   // -> 'https://docsynecx.com/logistics-desk/rfq/'
 * toCanonicalUrl('https://docsynecx.com/demo') // -> 'https://docsynecx.com/demo/'
 */
export function toCanonicalUrl(pathOrUrl?: string): string {
  if (!pathOrUrl || pathOrUrl.trim() === '' || pathOrUrl.trim() === '/') {
    return `${BASE_URL}/`;
  }

  const trimmed = pathOrUrl.trim();

  // If already absolute URL
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    try {
      const parsed = new URL(trimmed);
      const pathname = parsed.pathname.endsWith('/') ? parsed.pathname : `${parsed.pathname}/`;
      return `${BASE_URL}${pathname.toLowerCase()}`;
    } catch {
      return trimmed.endsWith('/') ? trimmed : `${trimmed}/`;
    }
  }

  // Relative path or bare slug
  const normalizedPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  const withSlash = normalizedPath.endsWith('/') ? normalizedPath : `${normalizedPath}/`;
  return `${BASE_URL}${withSlash.toLowerCase()}`;
}

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
  'invoice-processing': '/finance-desk/invoice-processing/',
  '/invoice-processing': '/finance-desk/invoice-processing/',
  '/finance-desk/invoice-processing': '/finance-desk/invoice-processing/',
  '/finance-desk/invoice-processing/': '/finance-desk/invoice-processing/',

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

  // Finance personas
  'business-owners': '/finance-desk/business-owners/',
  '/business-owners': '/finance-desk/business-owners/',
  '/finance-desk/business-owners': '/finance-desk/business-owners/',
  '/finance-desk/business-owners/': '/finance-desk/business-owners/',

  'finance-teams': '/finance-desk/finance-teams/',
  '/finance-teams': '/finance-desk/finance-teams/',
  '/finance-desk/finance-teams': '/finance-desk/finance-teams/',
  '/finance-desk/finance-teams/': '/finance-desk/finance-teams/',

  'accounts-teams': '/finance-desk/accounts-teams/',
  '/accounts-teams': '/finance-desk/accounts-teams/',
  '/finance-desk/accounts-teams': '/finance-desk/accounts-teams/',
  '/finance-desk/accounts-teams/': '/finance-desk/accounts-teams/',

  'ca-firms': '/finance-desk/ca-firms/',
  '/ca-firms': '/finance-desk/ca-firms/',
  '/finance-desk/ca-firms': '/finance-desk/ca-firms/',
  '/finance-desk/ca-firms/': '/finance-desk/ca-firms/',

  // Platform - Logistics Desk
  '/logistics': '/logistics-desk/',
  '/logistics/': '/logistics-desk/',
  '/logistics-desk': '/logistics-desk/',
  '/logistics-desk/': '/logistics-desk/',
  'logistics-desk': '/logistics-desk/',
  'logistics-overview': '/logistics-desk/',

  // Logistics modules (casing & aliases resolved to canonical RFQ-to-booking)
  'email-to-booking': '/logistics-desk/RFQ-to-booking/',
  'rfq-to-booking': '/logistics-desk/RFQ-to-booking/',
  'rfq-to-booking/': '/logistics-desk/RFQ-to-booking/',
  'RFQ-to-booking': '/logistics-desk/RFQ-to-booking/',
  'RFQ-to-booking/': '/logistics-desk/RFQ-to-booking/',
  '/email-to-booking': '/logistics-desk/RFQ-to-booking/',
  '/email-to-booking/': '/logistics-desk/RFQ-to-booking/',
  '/rfq-to-booking': '/logistics-desk/RFQ-to-booking/',
  '/rfq-to-booking/': '/logistics-desk/RFQ-to-booking/',
  '/RFQ-to-booking': '/logistics-desk/RFQ-to-booking/',
  '/RFQ-to-booking/': '/logistics-desk/RFQ-to-booking/',
  '/logistics/email-to-booking': '/logistics-desk/RFQ-to-booking/',
  '/logistics/email-to-booking/': '/logistics-desk/RFQ-to-booking/',
  '/logistics/rfq-to-booking': '/logistics-desk/RFQ-to-booking/',
  '/logistics/rfq-to-booking/': '/logistics-desk/RFQ-to-booking/',
  '/logistics/RFQ-to-booking': '/logistics-desk/RFQ-to-booking/',
  '/logistics/RFQ-to-booking/': '/logistics-desk/RFQ-to-booking/',
  '/logistics-desk/email-to-booking': '/logistics-desk/RFQ-to-booking/',
  '/logistics-desk/email-to-booking/': '/logistics-desk/RFQ-to-booking/',
  '/logistics-desk/rfq-to-booking': '/logistics-desk/RFQ-to-booking/',
  '/logistics-desk/rfq-to-booking/': '/logistics-desk/RFQ-to-booking/',
  '/logistics-desk/RFQ-to-booking': '/logistics-desk/RFQ-to-booking/',
  '/logistics-desk/RFQ-to-booking/': '/logistics-desk/RFQ-to-booking/',

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

  '/demo': '/demo/',
  '/demo/': '/demo/',
  'demo': '/demo/',

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
 * Handles any case variations, missing/extra trailing slashes, and route aliases.
 */
export function getSeoData(identifierOrPath: string): SeoPageItem | undefined {
  if (!identifierOrPath) return SEO_PAGES['/'];

  const cleaned = identifierOrPath.trim();
  const lower = cleaned.toLowerCase();

  // Try alias map with cleaned, lower, and slash variations
  const mappedKey =
    ALIAS_MAP[cleaned] ||
    ALIAS_MAP[lower] ||
    ALIAS_MAP[lower.endsWith('/') ? lower.slice(0, -1) : `${lower}/`] ||
    ALIAS_MAP[cleaned.endsWith('/') ? cleaned.slice(0, -1) : `${cleaned}/`];

  if (mappedKey && SEO_PAGES[mappedKey]) {
    return SEO_PAGES[mappedKey];
  }

  // Direct match in SEO_PAGES with casing & trailing-slash tolerance
  const candidates = [
    cleaned,
    lower,
    cleaned.endsWith('/') ? cleaned : `${cleaned}/`,
    cleaned.endsWith('/') ? cleaned.slice(0, -1) : cleaned,
    lower.endsWith('/') ? lower : `${lower}/`,
    lower.endsWith('/') ? lower.slice(0, -1) : lower,
  ];

  for (const c of candidates) {
    if (SEO_PAGES[c]) return SEO_PAGES[c];
  }

  // Match case-insensitively against SEO_PAGES keys
  const lowerKeys = Object.keys(SEO_PAGES);
  for (const key of lowerKeys) {
    const kLower = key.toLowerCase();
    if (kLower === lower || kLower === (lower.endsWith('/') ? lower : `${lower}/`)) {
      return SEO_PAGES[key];
    }
  }

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
  const seo = getSeoData(identifierOrPath);

  // Determine canonical URL:
  // 1. Explicit override if provided
  // 2. Curated url from seoData.ts if found
  // 3. Normalized identifierOrPath if it looks like a path (starts with '/')
  // 4. Fallback to homepage BASE_URL/
  const canonicalUrl = toCanonicalUrl(
    (overrides?.alternates?.canonical as string | undefined) ??
    seo?.url ??
    (identifierOrPath.startsWith('/') ? identifierOrPath : '/')
  );

  const seoTitle = seo?.seoTitle ?? SEO_PAGES['/'].seoTitle;
  const seoDescription = seo?.metaDescription ?? SEO_PAGES['/'].metaDescription;
  const seoKeywords = seo?.keywords ?? SEO_PAGES['/'].keywords;

  const baseMeta: Metadata = {
    metadataBase: new URL(BASE_URL),

    title: { absolute: seoTitle },
    description: seoDescription,
    keywords: seoKeywords,

    authors: [{ name: SITE_NAME, url: BASE_URL }],
    creator: SITE_NAME,
    publisher: PUBLISHER,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: `${BASE_URL}${OG_IMAGE_CARD}`,
          width: OG_IMAGE_CARD_W,
          height: OG_IMAGE_CARD_H,
          alt: seoTitle,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [`${BASE_URL}${OG_IMAGE_CARD}`],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };

  if (!overrides) return baseMeta;

  // Deep-merge nested objects so callers only override specific properties
  return {
    ...baseMeta,
    ...overrides,
    title: overrides.title ?? baseMeta.title,
    description: overrides.description ?? baseMeta.description,
    keywords: overrides.keywords ?? baseMeta.keywords,
    alternates: {
      ...baseMeta.alternates,
      ...overrides.alternates,
      canonical: overrides.alternates?.canonical
        ? toCanonicalUrl(overrides.alternates.canonical as string)
        : canonicalUrl,
    },
    openGraph: {
      ...baseMeta.openGraph,
      ...overrides.openGraph,
      url: overrides.openGraph?.url
        ? toCanonicalUrl(overrides.openGraph.url as string)
        : canonicalUrl,
      images: overrides.openGraph?.images ?? baseMeta.openGraph?.images,
    },
    twitter: {
      ...baseMeta.twitter,
      ...overrides.twitter,
      images: overrides.twitter?.images ?? baseMeta.twitter?.images,
    },
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
    '@type': 'Organization',
    name: SITE_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}${OG_LOGO_SVG}`,
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
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}

/**
 * BlogPosting schema — render on individual blog posts for Google search rich snippets.
 */
export function articleSchema(
  post: {
    title: string;
    excerpt?: string;
    subtitle?: string;
    image?: string;
    date?: string;
    author?: { name: string; role?: string };
  },
  canonicalPathOrUrl: string,
) {
  const fullUrl = canonicalPathOrUrl.startsWith('http')
    ? canonicalPathOrUrl
    : `${BASE_URL}${canonicalPathOrUrl.startsWith('/') ? canonicalPathOrUrl : `/${canonicalPathOrUrl}`}`;

  const imageUrl = post.image?.startsWith('http')
    ? post.image
    : `${BASE_URL}${post.image || OG_IMAGE_CARD}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || post.subtitle || post.title,
    image: [imageUrl],
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author?.name || SITE_NAME,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}${OG_LOGO_SVG}`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': fullUrl,
    },
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
