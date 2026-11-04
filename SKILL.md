---
name: seo-crawlable-development
description: Build and review web applications (Next.js App Router preferred, React/TypeScript) so that search engine crawlers, social preview bots, and AI crawlers can discover, render, and index them correctly. Use this skill whenever the user is developing, scaffolding, refactoring, or auditing a project and mentions SEO, crawling, crawlability, indexing, Googlebot, sitemap, robots.txt, metadata, canonical URLs, structured data, JSON-LD, Core Web Vitals, SSR/SSG/ISR, rendering strategy, or "making my app rank", even if they do not say "SEO" explicitly. Also use it when creating any new public page, route, layout, or marketing site, or when a React app needs to become crawlable.
---

# SEO-Crawlable Development

Rules, patterns, and checklists for building projects that crawlers can find, render, and index. Default stack: **Next.js (App Router) + TypeScript**. Where a rule is framework-agnostic, it is marked as such.

## How to use this skill

1. Classify every route as **public** (must rank) or **private** (must not be indexed) before writing code.
2. Apply the **Core Rules** to every public page.
3. Use the **Implementation Patterns** as starting code, adapted to the project.
4. Run the **Per-Page Checklist** whenever a public page is added or changed.
5. Run the **Pre-Launch Checklist** before every production release.
6. When reviewing existing code, report findings grouped as **Blocking** (prevents indexing), **High** (hurts ranking or rendering), and **Polish**.

When the user's stack is not Next.js, keep the principles (server-rendered HTML, unique metadata, real links, sitemap, canonical URLs) and translate the implementation. Do not force a framework migration unless the user asks, but state clearly when a client-only React app (Vite, CRA) cannot meet the requirement without SSR, prerendering, or a framework change.

---

## 1. Core principles

1. **Content must be in the initial HTML.** If it is not in "View Page Source", assume some crawlers never see it. Googlebot can run JavaScript, but rendering is queued and less reliable, and many other bots (social previews, AI crawlers, smaller search engines) do not run JS at all.
2. **Every public page has a unique, crawlable URL** that returns the right HTTP status.
3. **Every public page is reachable by real links** (`<a href>`) from other pages and listed in the sitemap.
4. **One canonical URL per piece of content.** Duplicates are consolidated with canonical tags or redirects.
5. **Do not block what you want indexed, and do not expose what you do not.** Staging settings leaking into production is the most common catastrophic SEO bug.
6. **Fast and stable pages rank and convert better.** Core Web Vitals (LCP, INP, CLS) are designed in, not retrofitted.
7. **Structured, semantic markup helps crawlers understand pages.** Use correct HTML elements and JSON-LD.

---

## 2. Plan before coding

### 2.1 Route inventory

Create a table before building. Example:

| Route | Public? | Indexed? | Rendering | Sitemap | Notes |
|---|---|---|---|---|---|
| `/` | Yes | Yes | SSG | Yes | Primary landing page |
| `/pricing` | Yes | Yes | SSG | Yes | |
| `/blog/[slug]` | Yes | Yes | SSG + ISR | Yes | Article schema |
| `/products/[id]` | Yes | Yes | ISR | Yes | Product schema |
| `/login`, `/signup` | Yes | No | SSR/CSR | No | `noindex` |
| `/dashboard/**` | No | No | CSR | No | Auth-gated |
| `/api/**` | No | No | n/a | No | Disallowed in robots |

### 2.2 Keyword and intent mapping

- One primary topic (and a few secondary terms) per public page. Do not target the same query with two pages (keyword cannibalization).
- Match page type to search intent: informational (blog/guide), commercial (comparison, features), transactional (pricing, product), navigational (brand, docs).
- Write the title, H1, and meta description around that topic, naturally. No keyword stuffing.

### 2.3 URL design (hard to change later)

- Lowercase, hyphen-separated, descriptive: `/blog/how-to-set-up-redis`, not `/blog?id=123` or `/Blog/HowToSetUpRedis`.
- Shallow hierarchy (ideally 3 levels or fewer). Stable slugs. No dates in URLs unless content is truly date-bound.
- Choose trailing-slash policy once (`trailingSlash` in `next.config`) and enforce it with redirects.
- No hash-based routing (`/#/pricing`) for public content. Crawlers ignore fragments.
- If URLs ever change, plan a 301 redirect map in advance.

---

## 3. Project structure (Next.js App Router)

```
app/
  layout.tsx                 # root layout, metadataBase, default metadata, fonts
  not-found.tsx              # custom 404 (must return 404 status)
  sitemap.ts                 # dynamic sitemap
  robots.ts                  # robots rules
  (marketing)/               # public, indexable pages
    page.tsx                 # home
    pricing/page.tsx
    blog/
      page.tsx
      [slug]/page.tsx
  (app)/                     # private, authenticated area
    layout.tsx               # sets robots: noindex
    dashboard/page.tsx
  (auth)/
    login/page.tsx           # noindex
lib/
  seo.ts                     # site config + metadata helpers
  jsonld.ts                  # JSON-LD builders
components/
  JsonLd.tsx
  Breadcrumbs.tsx
```

Environment variable (never hard-code the domain):

```
NEXT_PUBLIC_SITE_URL=https://www.example.com
```

Use the **production** value only in production. Staging must use a staging URL and `noindex` (see section 9).

---

## 4. Rendering strategy

| Content type | Use | Why |
|---|---|---|
| Static marketing pages, docs | **SSG** (default) | Fastest, fully crawlable |
| Blog, catalog, listings that change occasionally | **SSG + ISR** (`revalidate`) | Fresh without per-request cost |
| Pages that depend on per-request data (search results, personalized) | **SSR** | Only when necessary |
| Dashboards, settings, anything behind login | **Client-side** | Not indexed anyway |

Rules:

- Fetch primary content on the server (server components, `fetch` in the page, or `generateStaticParams`). **Never fetch the main content in `useEffect`.**
- Keep pages as **server components**. Add `"use client"` only to small interactive leaf components (forms, menus, carousels). A `"use client"` at the top of a page pushes its content toward client rendering and hurts crawlability.
- Do not hide primary content behind tabs, accordions, or modals that only render after a click via JS. Render the content in HTML and use CSS or `<details>` for toggling.
- Avoid lazy-loading above-the-fold content or main text. Lazy-load only below-the-fold media and heavy widgets.
- Use `generateStaticParams` for dynamic routes so pages are prebuilt, and call `notFound()` for unknown params.

```tsx
// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";

export const revalidate = 3600; // ISR: regenerate at most hourly

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound(); // real 404 status, not a soft 404
  return <article>{/* server-rendered content */}</article>;
}
```

---

## 5. Metadata

### 5.1 Root layout defaults

```tsx
// app/layout.tsx
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Brand | Primary value proposition", template: "%s | Brand" },
  description: "Clear 140-160 character summary of what the site offers.",
  applicationName: "Brand",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Brand",
    locale: "en_US",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};
```

### 5.2 Per-page metadata

```tsx
// app/blog/[slug]/page.tsx
import type { Metadata } from "next";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Not found", robots: { index: false } };

  return {
    title: post.title,                         // template appends brand
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      images: [{ url: post.ogImage }],
    },
  };
}
```

### 5.3 Metadata rules

- **Title:** unique per page, about 50-60 characters, primary topic first, brand last.
- **Meta description:** unique per page, about 140-160 characters, written for humans, includes a reason to click. Not a ranking factor itself, but affects click-through.
- **Canonical:** self-referencing absolute (or `metadataBase`-resolved) URL on every indexable page. For filtered, sorted, or tracking-parameter variants, canonical points to the clean URL.
- **Open Graph / Twitter:** title, description, image (1200x630) on every shareable page.
- **Never** ship default or placeholder metadata ("Create Next App") or the same title on multiple pages.
- Generate dynamic OG images with `opengraph-image.tsx` where useful.

---

## 6. Sitemap and robots

### 6.1 sitemap.ts

```ts
// app/sitemap.ts
import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  const staticRoutes: MetadataRoute.Sitemap = ["", "/pricing", "/features", "/blog"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${siteUrl}/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt),
  }));

  return [...staticRoutes, ...postRoutes];
}
```

Rules:

- Include only **canonical, indexable, 200-status** URLs. No redirects, 404s, `noindex` pages, or parameter duplicates.
- Use real `lastModified` dates (the actual content update time), not "now" for everything. Google learns to ignore dishonest dates.
- A single sitemap file holds up to 50,000 URLs or 50 MB uncompressed. For larger sites use `generateSitemaps()` to split, and reference all of them.
- Submit the sitemap in Google Search Console and Bing Webmaster Tools, and reference it in `robots.txt`.

### 6.2 robots.ts

```ts
// app/robots.ts
import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;
// Set APP_ENV=production only on the real production deployment (not staging/preview)
const isProd = process.env.APP_ENV === "production";

export default function robots(): MetadataRoute.Robots {
  if (!isProd) {
    return { rules: { userAgent: "*", disallow: "/" } }; // block staging/preview entirely
  }
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/settings/", "/admin/", "/_next/data/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
```

Rules:

- **Do not block** `/_next/static/` (JS, CSS) or image paths. Googlebot needs them to render the page.
- `robots.txt` controls **crawling**, not **indexing**. A disallowed URL can still be indexed if other sites link to it, and a disallowed page's `noindex` tag is never seen. To keep a page out of the index, allow crawling and use `noindex`. For auth-gated pages that crawlers cannot reach anyway, disallow plus authentication is fine.
- Decide deliberately about AI crawlers (for example GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot). Allowing them can increase visibility in AI answers; blocking them is a content-licensing choice. Make it an explicit rule per user-agent, not an accident.
- Any production environment must be verified to **not** serve `Disallow: /`.

---

## 7. Links and navigation

- Use `<Link href="/pricing">` (renders `<a href>`) for all internal navigation. Crawlers follow `href`, not `onClick` or `router.push`.
- Every important page is reachable within **3 clicks** from the home page. Orphan pages (no internal links) are crawled rarely or never.
- Use **descriptive anchor text** ("compare pricing plans"), not "click here" or "read more".
- Breadcrumbs on deep pages, with `BreadcrumbList` structured data.
- Footer or hub pages link to key sections. Related-content links on articles and products.
- External links: add `rel="nofollow"` or `rel="sponsored"`/`rel="ugc"` where appropriate (paid, affiliate, user-generated).
- Do not use `javascript:` links, buttons styled as links for navigation, or fragments (`#`) for routing.
- **Pagination:** use crawlable links (`/blog?page=2` or `/blog/page/2`), each page self-canonical, with a unique title. Do not use "infinite scroll" alone. Provide paginated URLs as a fallback.
- **Faceted navigation / filters:** do not let filter combinations create unlimited crawlable URLs. Canonicalize to the base listing or keep filters client-side, and disallow or `noindex` low-value combinations.

---

## 8. Semantic HTML and content structure

- Exactly **one `<h1>`** per page, matching the page's topic. Then `<h2>`/`<h3>` in logical order. Do not skip levels for styling.
- Use landmarks: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`.
- Use `<ul>/<ol>` for lists, `<table>` for tabular data, `<time datetime>` for dates, `<figure>/<figcaption>` for media with captions.
- Set `<html lang="en">` (correct language code) in the root layout.
- Meaningful content in text, not baked into images. Every informative image has descriptive `alt`. Decorative images use `alt=""`.
- Write substantive, original, helpful content. Thin or duplicated pages should be merged, improved, or `noindex`ed.
- Put the key information early in the page. Use clear question-style headings where users actually ask questions, and answer directly beneath them.

---

## 9. Structured data (JSON-LD)

Reusable component (escapes `<` to prevent script injection):

```tsx
// components/JsonLd.tsx
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
```

Usage by page type:

| Page type | Schema |
|---|---|
| Home / about | `Organization` (name, url, logo, sameAs), `WebSite` |
| Blog post | `Article` / `BlogPosting` (headline, datePublished, dateModified, author, image) |
| Product | `Product` + `Offer` (price, priceCurrency, availability), `AggregateRating` only if real |
| FAQ content | `FAQPage` (only for visible on-page Q&A; eligibility for rich results is limited) |
| Deep pages | `BreadcrumbList` |
| Local business | `LocalBusiness` |
| Software | `SoftwareApplication` |

Rules:

- Markup must **match visible content**. Never mark up content that users cannot see, or fabricate ratings and reviews.
- Validate with Google's **Rich Results Test** and the **Schema Markup Validator** before release.
- Render JSON-LD on the server (in the page component), not injected after hydration.

---

## 10. Private areas, staging, and indexing control

- Auth-gated routes (`/dashboard`, `/settings`, `/admin`): require authentication, and set `robots: { index: false, follow: false }` in their layout metadata.
- Utility pages that are publicly reachable but should not rank (login, signup, thank-you, internal search results, cart, checkout): `noindex`, keep out of the sitemap.
- Per-page `noindex` via metadata:

```ts
export const metadata = { robots: { index: false, follow: false } };
```

- Or via header for non-HTML files (PDFs): `X-Robots-Tag: noindex`.
- **Staging and preview deployments:** protect with authentication (best), plus `noindex` and `Disallow: /`. Verify those settings are **not** carried into production builds.
- Never put important public content behind a login, cookie wall, geo-block, or full-screen modal.
- Do not use `noindex` and `canonical` together to point at another URL. They send conflicting signals.

---

## 11. HTTP status codes, redirects, and errors

| Situation | Correct response |
|---|---|
| Page exists | `200` |
| Permanent move / renamed URL / host or protocol normalization | `301` or `308` (permanent) |
| Temporary move | `302` or `307` |
| Page removed permanently | `404` or `410` |
| Unknown route | Custom `not-found.tsx` with **404 status** (avoid "soft 404": a 200 page saying "not found") |
| Temporary outage or maintenance | `503` with `Retry-After` header |

Rules:

- Define redirects in `next.config.js` (`redirects()`) or use `permanentRedirect()` in server code.
- Avoid **redirect chains** (A to B to C). Redirect straight to the final URL. Keep internal links pointing at final URLs, not redirecting ones.
- Redirect non-canonical variants to the canonical: `http` to `https`, `www` vs non-`www`, trailing slash policy, uppercase to lowercase.
- Redirect removed pages to the closest relevant page (not blindly to the home page), or return `404`/`410` if there is no equivalent.
- Do not return `200` for error states, and do not hide server errors behind a friendly page that still returns `200`.

---

## 12. Performance and Core Web Vitals

Targets (at the 75th percentile of real users): **LCP under 2.5 s, INP under 200 ms, CLS under 0.1.**

- **Images:** use `next/image` with explicit `width`/`height` (prevents layout shift), modern formats, and `sizes`. Add `priority` only to the single LCP image. Lazy-load the rest.
- **Fonts:** use `next/font` (self-hosted, no layout shift), limit weights, and use `display: swap`.
- **JavaScript:** keep client bundles small. Prefer server components, code-split heavy widgets with `next/dynamic`, and avoid large client-side libraries for simple tasks.
- **Third-party scripts:** load with `next/script` using `afterInteractive` or `lazyOnload`. Audit and remove unused tags. Analytics and chat widgets are common INP and LCP offenders.
- **CLS:** reserve space for ads, embeds, banners, and images. Do not inject content above existing content after load.
- **Caching and delivery:** serve through a CDN, set long-lived cache headers on static assets, enable compression (Brotli/gzip), and use HTTP/2 or HTTP/3.
- **Server response:** keep TTFB low. Use static generation and ISR so the server does not render each request.
- Test on a **production build** (`next build && next start`) and on mid-range mobile conditions. Dev mode is not representative.

---

## 13. Middleware, rate limiting, consent banners, and analytics (crawler safety)

These layers often break crawling by accident.

- **Rate limiting and WAF/bot protection** (for example Upstash, Cloudflare, Vercel Firewall): do not apply user-facing limits or CAPTCHAs to verified search crawlers. Verify Googlebot and Bingbot by **reverse DNS lookup plus forward confirmation** (or published IP ranges), never by user-agent string alone, since it is trivially spoofed. Return `429` or `503` with `Retry-After` for genuine overload so crawlers back off, rather than blocking them for long periods.
- **Middleware / proxy (`middleware.ts`, called `proxy.ts` in newer Next.js versions):** do not redirect crawlers based on `Accept-Language`, geo, or cookies. Serve the same content and canonical URL to users and bots. Make sure the matcher excludes `robots.txt`, `sitemap.xml`, `/_next/static`, and public assets.
- **Cookie-consent banners and modals:** render them as overlays that do not remove or replace the page content in the HTML. Consent gating should control **analytics and marketing scripts**, never the page content itself. Avoid full-screen interstitials that block the main content on first load (also bad for CLS and UX).
- **Analytics (GA, etc.):** load only after consent where required, via `next/script`. Verify the page content and metadata render identically with and without consent.
- **Auth redirects:** public pages must not redirect anonymous users or bots to login.
- **Cloaking is prohibited:** never show crawlers different content than users.

---

## 14. Internationalization (only if multi-language or multi-region)

- Use separate URLs per language or region (`/en/`, `/fr/`, or subdomains/ccTLDs). Do not rely on cookies or `Accept-Language` alone.
- Add `hreflang` annotations (via `alternates.languages` in metadata), including a self-reference and an `x-default`. Annotations must be reciprocal.
- Each language version has its own self-canonical URL, translated metadata, and translated content (not machine-dumped duplicates).
- Include alternate-language URLs in the sitemap if desired.

---

## 15. Implementation workflow (phase by phase)

**Phase 1: Foundation**
- Create the route inventory (section 2.1) and URL map.
- Scaffold Next.js + TypeScript, with `(marketing)`, `(app)`, and `(auth)` route groups.
- Set `NEXT_PUBLIC_SITE_URL`, root metadata with `metadataBase`, `lang` attribute, fonts.
- Add `robots.ts`, `sitemap.ts`, `not-found.tsx`.

**Phase 2: Pages**
- Build each public page as a server component with proper rendering mode.
- Add `generateMetadata`, one H1, semantic structure, real links, alt text.
- Add JSON-LD where applicable and breadcrumbs on deep pages.
- Add `noindex` to private/utility pages.

**Phase 3: Hardening**
- Redirect map, canonical rules, trailing-slash policy, pagination and filters policy.
- Crawler-safe middleware/rate limiting/consent behavior (section 13).
- Performance budget and Lighthouse pass on a production build.

**Phase 4: Verification**
- Run the Pre-Launch Checklist (section 17) and crawl the site.

**Phase 5: Launch and monitor**
- Verify in Search Console and Bing Webmaster Tools, submit sitemaps.
- Inspect key URLs. Track coverage/indexing, Core Web Vitals, and crawl stats weekly for the first month, then monthly.
- Re-run the Per-Page Checklist for every new public page.

---

## 16. Per-page checklist (run for every new or changed public page)

- [ ] Route is public and listed in the route inventory with the right indexing decision
- [ ] Main content is server-rendered and visible in View Page Source
- [ ] Unique `<title>` (about 50-60 chars) and meta description (about 140-160 chars)
- [ ] Self-referencing canonical URL
- [ ] Open Graph and Twitter tags with a valid image
- [ ] Exactly one `<h1>`; logical heading order; semantic landmarks
- [ ] Internal links use `<Link>`/`<a href>` with descriptive anchor text
- [ ] The page is linked from at least one other crawlable page and appears in the sitemap
- [ ] Images use `next/image`, have dimensions and meaningful `alt`
- [ ] JSON-LD present, valid, and matches visible content (where applicable)
- [ ] Correct status codes (200 / 404 / redirect) including for invalid params
- [ ] No accidental `noindex`, `Disallow`, or login/cookie wall hiding content
- [ ] LCP element identified and optimized; no layout shift

---

## 17. Pre-launch checklist

**Indexing controls**
- [ ] Production `robots.txt` does **not** contain `Disallow: /`
- [ ] No leftover `noindex` on public pages (check metadata, headers, and `<meta name="robots">`)
- [ ] Staging/preview environments are protected and `noindex`
- [ ] `sitemap.xml` loads, lists only canonical 200 URLs, and is referenced in `robots.txt`

**Rendering**
- [ ] `curl -s https://site/page | grep "<h1"` shows the real H1 (content is in raw HTML)
- [ ] URL Inspection (live test) in Search Console shows the rendered page with all content and no blocked resources
- [ ] Tested with JavaScript disabled for core content and links

**Technical**
- [ ] HTTPS everywhere; `http` and `www`/non-`www` redirect to one canonical host
- [ ] No redirect chains or loops; no broken internal links
- [ ] Custom 404 returns a true 404 status
- [ ] Trailing-slash and case policy enforced
- [ ] Favicon, `manifest`, and OG images exist and load

**Content and markup**
- [ ] No duplicate titles or descriptions (crawl to confirm)
- [ ] Structured data passes Rich Results Test
- [ ] `lang` attribute set; hreflang correct (if multilingual)

**Performance**
- [ ] Production-build Lighthouse: Performance, Accessibility, SEO, and Best Practices all green on key templates
- [ ] LCP, INP, CLS within targets in lab tests (field data will follow after launch)

**Tooling**
- [ ] Google Search Console and Bing Webmaster Tools verified, sitemap submitted
- [ ] Analytics installed and consent-gated correctly
- [ ] Full crawl (Screaming Frog free tier up to 500 URLs, or similar) reviewed

---

## 18. Testing and debugging commands

```bash
# 1. Is the content in the raw HTML?
curl -s https://www.example.com/page | grep -i "<h1"

# 2. Check status code, redirects, and headers (X-Robots-Tag, canonical Link header)
curl -sIL https://www.example.com/old-page

# 3. See the page as a crawler user-agent would request it
curl -s -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" https://www.example.com/page | head -50

# 4. Check robots.txt and sitemap
curl -s https://www.example.com/robots.txt
curl -s https://www.example.com/sitemap.xml | head -30

# 5. Production build locally
npm run build && npm run start
```

Tools: Google Search Console (URL Inspection, Pages report, Core Web Vitals, Crawl Stats), Rich Results Test, PageSpeed Insights / Lighthouse, Screaming Frog (or Sitebulb) for full-site crawls, Bing Webmaster Tools, Chrome DevTools (disable JavaScript to see what is content vs enhancement).

---

## 19. Common mistakes (anti-patterns)

| Mistake | Fix |
|---|---|
| Whole page marked `"use client"` and data fetched in `useEffect` | Server component + server-side data fetching; client components only for interactivity |
| Navigation via `onClick`/`router.push` only | Use `<Link>`/`<a href>` |
| Same title/description on every page | `generateMetadata` per page with unique values |
| `Disallow: /` or `noindex` carried from staging to production | Environment-aware `robots.ts` + pre-launch check |
| Blocking `/_next/static` or images in robots.txt | Allow assets needed to render |
| Relying on robots.txt to deindex pages | Allow crawl + `noindex` (or remove/redirect/404) |
| Sitemap contains redirects, 404s, noindex pages | Generate from canonical indexable data only |
| Soft 404s (200 status on "not found" page) | `notFound()` and a real 404 status |
| Redirect chains and mixed trailing slashes | Single-hop 301s; fixed trailing-slash policy |
| Infinite scroll without paginated URLs | Crawlable paginated URLs |
| Unlimited filter/sort URL combinations indexable | Canonicalize or restrict parameters |
| Cookie banner or modal replaces page content | Overlay only; consent gates scripts, not content |
| Rate limiter or bot protection blocks Googlebot | Verify and allowlist real crawlers; use `429`/`503` + `Retry-After` for overload |
| Content only inside images, canvas, or iframes | Real HTML text with alt text |
| Hash routes for public pages | Real paths |
| Fake or invisible-content structured data | Mark up only visible, truthful content |
| Huge unoptimized hero image, no dimensions | `next/image`, `priority` on LCP only, explicit sizes |
| Testing only in dev mode | Test the production build |

---

## 20. Output expectations when applying this skill

When asked to **build**: deliver working code following sections 3 to 13, plus the route inventory and a short list of decisions made (rendering mode per route, canonical rules, indexing rules).

When asked to **review/audit**: report findings as **Blocking / High / Polish**, each with the file and line (or URL), why it matters for crawling, and a concrete fix with code.

When asked **"is this crawlable?"**: check, in order: (1) content in raw HTML, (2) status code and redirects, (3) robots.txt and meta/header directives, (4) canonical, (5) internal links and sitemap, (6) JS dependency of main content, (7) bot protection or consent interference.

Ask the user only what is necessary to proceed (for example: the production domain, which routes are public, languages/regions served). State assumptions explicitly and continue.

---

## 21. Quick reference

- **Public page** = server-rendered HTML + unique metadata + canonical + real links + in sitemap + correct status.
- **Private page** = authenticated + `noindex` + not in sitemap.
- **robots.txt** = crawling control. **noindex** = indexing control. Do not mix them up.
- **Never** fetch main content in `useEffect`, route with `onClick` alone, or ship staging directives to production.
- **Always** test the production build, view the raw HTML, and verify in Search Console.
