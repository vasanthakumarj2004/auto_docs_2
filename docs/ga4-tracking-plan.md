# Docsynecx GA4 Tracking Plan
_Last updated: 2026-11-21 | Framework: Next.js App Router | Language: TypeScript_

> [!IMPORTANT]
> **consent = true is the only state in which any data leaves the browser.**
> Every event in this plan has "Consent Required: Yes". When `getAnalyticsConsent()` returns false, all client-side helpers are no-ops and the backend refuses to send via Measurement Protocol.

---

## 1. Environment Variables

| Variable | Scope | Purpose |
|---|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Client + Server | GA4 Stream Measurement ID per environment (never hardcoded) |
| `NEXT_PUBLIC_APP_ENV` | Client + Server | `development` \| `staging` \| `production` |
| `NEXT_PUBLIC_GA_DEBUG_MODE` | Client | `true` enables console logs and GA4 DebugView (`debug_mode: true`) |
| `GA_API_SECRET` | Server only | Measurement Protocol API secret — NEVER expose to browser |

Use separate Measurement IDs in `.env.local` (dev), `.env.staging`, `.env.production`.

---

## 2. Automatic Dimensions (attached to every event)

| Dimension | Source | Notes |
|---|---|---|
| `app_env` | `NEXT_PUBLIC_APP_ENV` | Injected by `trackEvent()` automatically (`development` \| `staging` \| `production`) |
| `content_group` | URL pathname inference | Inferred from pathname: `marketing` \| `app` \| `docs` \| `auth` |
| `page_location` | Sanitized `window.location.href` | Sensitive query parameters stripped (email, token, session, etc.) |
| `page_path` | Sanitized pathname + safe query params | Preserves `utm_*` and `gclid` |

---

## 3. Event Tracking Plan

### Marketing Website Events

| Event Name | Owner | Trigger Location in Code | Parameters | Key Event? | Consent Required |
|---|---|---|---|---|---|
| `page_view` | Client | `GoogleAnalytics` / `useAnalyticsPageView` on route change | `page_location`, `page_path`, `page_title`, `content_group`, `app_env` | No | Yes |
| `cta_click` | Client | Delegated click listener (`data-track="cta_click"`) / `trackCtaClick()` | `cta_name`, `cta_location`, `page_path` | No | Yes |
| `pricing_view` | Client | `/pricing` page component mount (`trackPricingView()`) | `plan_viewed` (optional) | No | Yes |
| `demo_request` | Client | Demo form submit attempt (`trackDemoRequest()`) | `source` | **Yes** | Yes |
| `generate_lead` | Client | Demo/Contact form confirmed 2xx response (`trackGenerateLead()`) | `lead_source`, `form_name`, `value` (opt), `currency` (opt) | **Yes** | Yes |
| `contact_submit` | Client | Contact form confirmed 2xx response (`trackContactSubmit()`) | `form_name` | No | Yes |
| `newsletter_signup` | Client | Newsletter opt-in confirmed (`trackNewsletterSignup()`) | `signup_location` (`footer` \| `popup`) | No | Yes |
| `faq_expand` | Client | Accordion expand handler (`trackFaqExpand()`) | `faq_question` (max 100 chars) | No | Yes |
| `video_play` | Client | Video element play start (`trackVideoPlay()`) | `video_name`, `video_location` | No | Yes |
| `navigation_click` | Client | Header/Footer navigation click (`trackNavigationClick()`) | `nav_item`, `nav_location` (`header` \| `footer`) | No | Yes |

### Product SaaS Events

| Event Name | Owner | Trigger Location in Code | Parameters | Key Event? | Consent Required |
|---|---|---|---|---|---|
| `sign_up` | Client | Auth flow successful registration (`trackSignUp()`) | `method` (e.g. `google`, `email_password`) | **Yes** | Yes |
| `login` | Client | Auth flow successful sign-in (`trackLogin()`) | `method` | No | Yes |
| `file_upload` | Client | Upload dropzone/picker file acceptance (`trackFileUpload()`) | `file_type`, `file_size_kb`, `file_count` | No | Yes |
| `invoice_processed` | **Server** | Backend processing worker completion (`sendServerEvent()`) | `processing_time_ms`, `document_type`, `page_count` | **Yes** | Yes |
| `processing_failed` | **Server** | Backend error handler callback (`sendServerEvent()`) | `error_type`, `document_type` | No | Yes |
| `export_completed` | **Server** | Backend export generator callback (`sendServerEvent()`) | `export_format` (`csv` \| `xlsx` \| `json` \| `pdf`) | No | Yes |
| `integration_connect` | Client | Third-party connection success modal (`trackIntegrationConnect()`) | `integration_name` (e.g. `TallyPrime`, `CargoWise`) | No | Yes |
| `feature_used` | Client | Specific UI feature interaction (`trackFeatureUsed()`) | `feature_name` | No | Yes |
| `exception` | Client | Global error boundary / 404 handler (`trackException()`) | `description` (max 100 chars), `fatal` (boolean) | No | Yes |

---

## 4. Event Ownership Table (Client vs Server — Never Both)

| Event | Single Owner | Rationale |
|---|---|---|
| `page_view` | **Client** | UI route navigation occurs in browser |
| `cta_click` | **Client** | DOM click interaction |
| `pricing_view` | **Client** | DOM route view |
| `demo_request` | **Client** | Form submission attempt before network latency |
| `generate_lead` | **Client** | Confirmed client feedback post-submission |
| `contact_submit` | **Client** | Form completion confirmation |
| `newsletter_signup` | **Client** | User opt-in interaction |
| `faq_expand` | **Client** | UI accordion interaction |
| `video_play` | **Client** | HTML5 video element event |
| `navigation_click` | **Client** | Link click interaction |
| `sign_up` | **Client** | Frontend auth redirection lifecycle |
| `login` | **Client** | Frontend auth session creation |
| `file_upload` | **Client** | Client-side file selection & staging |
| `invoice_processed` | **Server** | Document OCR/AI completes asynchronously on backend worker |
| `processing_failed` | **Server** | Backend extraction failure / validation error |
| `export_completed` | **Server** | Asynchronous CSV/Excel file rendering on server |
| `integration_connect` | **Client** | Frontend OAuth return callback |
| `feature_used` | **Client** | UI feature action |
| `exception` | **Client** | Browser unhandled exception / 404 page render |

---

## 5. Custom Dimensions to Register in GA4

Register these in **GA4 Admin → Custom definitions → Custom dimensions**:

### Event-scoped Custom Dimensions

| Parameter Name | Dimension Name | Description | Example Values |
|---|---|---|---|
| `cta_name` | CTA Name | Label or identifier of clicked CTA | `hero_finance_desk`, `book_demo` |
| `cta_location` | CTA Location | Page section containing the CTA | `hero`, `closing_cta`, `navbar` |
| `plan_viewed` | Plan Viewed | Pricing tier viewed by user | `starter`, `professional`, `enterprise` |
| `source` | Source | Lead / request intake trigger | `homepage_hero`, `footer_link` |
| `lead_source` | Lead Source | Verified acquisition channel | `demo_form`, `contact_modal` |
| `form_name` | Form Name | Specific form identifier | `demo_request`, `enterprise_contact` |
| `signup_location` | Signup Location | Placement of signup form | `footer`, `popup`, `banner` |
| `faq_question` | FAQ Question | Text of expanded FAQ item (truncated ≤100) | `Can Docsynecx connect directly with Tally?` |
| `video_name` | Video Name | Title or identifier of video | `platform_overview_v2` |
| `video_location` | Video Location | Placement of video | `hero_preview`, `case_study_card` |
| `nav_item` | Navigation Item | Text or label of clicked nav element | `Finance Desk`, `Pricing`, `API Docs` |
| `nav_location` | Navigation Location | Navigation zone | `header`, `footer` |
| `method` | Auth Method | Authentication provider used | `email_password`, `google`, `saml_sso` |
| `file_type` | File Type | MIME type or document extension | `application/pdf`, `image/png` |
| `document_type` | Document Type | AI classification of document | `tax_invoice`, `bill_of_lading`, `po` |
| `error_type` | Error Type | High-level failure categorization | `ocr_unreadable`, `missing_tax_id` |
| `export_format` | Export Format | Target format for exported data | `csv`, `xlsx`, `json`, `pdf` |
| `integration_name` | Integration Name | Connected external service | `TallyPrime`, `ZohoBooks`, `CargoWise` |
| `feature_name` | Feature Name | Specific product feature touched | `line_item_split`, `bulk_validation` |
| `app_env` | Application Environment | Deployment environment | `development`, `staging`, `production` |
| `content_group` | Content Group | Architecture classification | `marketing`, `app`, `docs`, `auth` |

### User-scoped Custom Dimensions

Register under **GA4 Admin → Custom definitions → Custom dimensions (Scope: User)**:

| Parameter Name | Dimension Name | Description | Example Values |
|---|---|---|---|
| `plan_type` | User Plan Type | SaaS subscription tier | `free_trial`, `professional`, `enterprise` |
| `account_role` | Account Role | Role of authenticated user | `billing_admin`, `approver`, `viewer` |
| `site_section` | Preferred Section | Primary product module used | `finance_desk`, `logistics_desk` |

---

## 6. Custom Metrics to Register in GA4

Register these in **GA4 Admin → Custom definitions → Custom metrics**:

| Parameter Name | Metric Name | Scope | Unit | Description |
|---|---|---|---|---|
| `processing_time_ms` | Processing Time | Event | Milliseconds | Time taken by AI pipeline to extract document |
| `file_size_kb` | File Size (KB) | Event | Standard (Number) | Size of uploaded file in Kilobytes |
| `file_count` | File Count | Event | Standard (Number) | Number of files submitted in batch |
| `page_count` | Page Count | Event | Standard (Number) | Total pages processed across document |

---

## 7. Key Events (Conversions)

Mark these events as **Key Events** in **GA4 Admin → Events → Mark as key event**:

1. `generate_lead` — High-intent business lead generation (confirmed 2xx from forms).
2. `demo_request` — Request for a customized enterprise demonstration.
3. `sign_up` — New account registration in Docsynecx platform.
4. `invoice_processed` — Core SaaS product activation metric (document successfully posted).

---

## 8. Cross-Domain Configuration

The marketing website runs on `docsynecx.com` while the product application runs on `app.docsynecx.com`.
The central module `src/lib/analytics.ts` configures Google linker domains inside `initGA()`:

```typescript
window.gtag('config', MEASUREMENT_ID, {
  send_page_view: false,
  linker: {
    domains: ['docsynecx.com', 'app.docsynecx.com'],
  },
});
```

This passes the `_ga` client identifier through query string parameters across top-level cross-domain links, maintaining unbroken visitor sessions without duplicate visitor counts.

---

## 9. Content-Security-Policy (CSP) Directives

When deploying CSP headers (in `next.config.mjs`, middleware, or reverse proxy), include the following origins:

```http
script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
connect-src 'self' https://www.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com;
img-src 'self' data: https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com;
```

---

## 10. Privacy & PII Protection Rules

1. **consent = true is the only state in which any data leaves the browser.**
2. **Never send PII:** Email addresses, full names, phone numbers, invoice contents, supplier names, tax IDs, and document file names are strictly banned from all GA4 parameters.
3. **URL Parameter Scrubbing:** `sanitizeUrl()` strips sensitive keys: `email`, `token`, `key`, `code`, `reset`, `invite`, `session`, `otp`, `password`, `pwd`, `secret`, `access_token`, `refresh_token`, `auth_token`, `user_id`.
4. **Preserved Parameters:** Marketing parameters (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `gclid`) are preserved.
5. **Opaque User ID:** `setUserId(id)` only accepts opaque internal system UUIDs. If an email address is passed, `setUserId` detects the `@` symbol and drops it with a console warning.
6. **Ad Storage Permanently Denied:** Docsynecx does not run third-party advertising retargeting. `ad_storage`, `ad_user_data`, and `ad_personalization` remain strictly `"denied"` at all times.

---

## 11. Server-Side Measurement Protocol Workflow

For backend events (`invoice_processed`, `processing_failed`, `export_completed`):

1. **Client Captures Session State:**
   ```typescript
   import { getGAClientId, getGASessionId, getAnalyticsConsent } from '@/src/lib/analytics';

   const clientId = await getGAClientId();
   const sessionId = await getGASessionId();
   const consent = getAnalyticsConsent();
   ```
2. **Client Passes State to API:**
   ```json
   {
     "documentId": "doc_98234",
     "analytics_consent": true,
     "client_id": "194820381.168923984",
     "session_id": "168923984"
   }
   ```
3. **Backend Evaluates Consent & Dispatches:**
   ```typescript
   import { sendServerEvent } from '@/src/lib/server/ga4-measurement-protocol';

   await sendServerEvent({
     eventName: 'invoice_processed',
     clientId: req.body.client_id,
     sessionId: req.body.session_id,
     analyticsConsent: req.body.analytics_consent === true,
     params: {
       processing_time_ms: 1840,
       document_type: 'tax_invoice',
       page_count: 2,
     },
   });
   ```
   If `analytics_consent !== true`, the backend **drops the event immediately** without contacting Google.

---

## 12. Verification & Testing Checklist

### A. Browser Network Tab Verification (Zero Leaks When Denied)
1. Open Incognito window, open Chrome DevTools → **Network** tab.
2. In the filter box, enter: `google-analytics.com|googletagmanager.com`.
3. Load `http://localhost:3000`.
4. **Verify:** Exact count of network requests to Google is **0**.
5. Check Application → Cookies: Verify **no `_ga*` or `_gid` cookies exist**.
6. In the cookie banner, click **Reject All**.
7. **Verify:** Still **0** requests to Google.
8. Click **Preferences** → toggle Analytics to ON → click **Save**.
9. **Verify:** Request to `googletagmanager.com/gtag/js?id=G-...` appears.
10. **Verify:** Request to `google-analytics.com/g/collect` with `en=page_view` appears.
11. Click **Reject All** in cookie settings.
12. **Verify:** Cookies `_ga`, `_gid` are deleted immediately. `window['ga-disable-G-...']` is set to `true`.
13. Perform clicks and navigation → **Verify:** No further network requests to Google.

### B. GA4 DebugView Verification
1. Ensure `.env.local` has `NEXT_PUBLIC_GA_DEBUG_MODE=true`.
2. Open GA4 property → **Admin** → **DebugView**.
3. Accept analytics consent on Docsynecx.
4. Verify `page_view` shows in real-time timeline with:
   - `content_group`: `marketing`
   - `app_env`: `development`
5. Click a CTA button with `data-track="cta_click"`:
   - Verify `cta_click` appears with `cta_name` and `cta_location`.
6. Navigate to `/pricing/`:
   - Verify `page_view` appears once with `page_path=/pricing/`.
   - Verify `pricing_view` appears.
7. Submit a demo form:
   - Verify `demo_request` appears on submit attempt.
   - Verify `generate_lead` appears on 200 OK server response.
