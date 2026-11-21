# Docsynecx GA4 Tracking Plan & Privacy Governance

This document outlines the complete Google Analytics 4 (GA4) implementation for **Docsynecx** (marketing website & SaaS application).

---

## 1. Governance & Consent Architecture

### Mandate
> **Consent = true is the only state in which any data leaves the browser.**

1. **When consent is FALSE or MISSING**:
   - `gtag.js` and GTM scripts are **never injected** into the DOM.
   - Zero network requests are made to `googletagmanager.com`, `google-analytics.com`, or `*.analytics.google.com`.
   - `window.dataLayer` is not initialized or populated with event queues.
   - No tracking cookies (`_ga`, `_gid`, `_gat`, `_ga_*`) are set.
   - Calls to `trackEvent()`, `trackPageView()`, and `setUserProps()` drop silently without buffering.

2. **When consent becomes TRUE** (initial grant or updated via cookie banner):
   - `gtag.js` is loaded asynchronously, exactly once.
   - Google Consent Mode v2 default is declared first (`analytics_storage: 'denied'`, `ad_storage: 'denied'`, `ad_user_data: 'denied'`, `ad_personalization: 'denied'`).
   - `analytics_storage` is updated to `'granted'`. Ad storage remains strictly `'denied'` (Docsynecx does not run ad tracking).
   - The current route's `page_view` is sent immediately.
   - Declarative click listeners (`[data-track]`) are attached.

3. **When consent becomes FALSE** (user withdraws consent in preferences):
   - `window['ga-disable-G-XXXXXXXXXX'] = true` is set immediately.
   - Google Consent Mode v2 is updated to `'denied'` for all storage types.
   - All GA cookies (`_ga`, `_ga_<stream-id>`, `_gid`, `_gat*`) are purged across root and parent domains.
   - Declarative click listeners are removed.
   - All future tracking drops immediately.

4. **Server-Side Measurement Protocol**:
   - Backend completion events (`invoice_processed`, `processing_failed`, `export_completed`) are **ONLY** sent when the client transmits `analytics_consent === true`.
   - If `analytics_consent` is missing or false, the backend drops the event immediately and logs the dropped dispatch in debug mode.

---

## 2. Event Tracking Plan Matrix

| Event Name | Type | Owner | Trigger Location in Code | Parameters Collected | Consent Required | Key Event |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: |
| `page_view` | Recommended | Client | `GoogleAnalytics.tsx` (Route change effect) | `page_location`, `page_path`, `page_title`, `content_group`, `app_env` | **Yes** | No |
| `cta_click` | Custom (Marketing) | Client | `analytics.ts` (`[data-track="cta_click"]`) | `cta_name`, `cta_location`, `page_path`, `content_group`, `app_env` | **Yes** | No |
| `navigation_click`| Custom (Marketing) | Client | `LandingNavigation.tsx` / `ShipsyFooter.tsx` | `nav_item`, `nav_location`, `content_group`, `app_env` | **Yes** | No |
| `pricing_view` | Custom (Marketing) | Client | `PricingPage.tsx` (Mount effect) | `plan_viewed`, `content_group`, `app_env` | **Yes** | No |
| `demo_request` | Custom (Marketing) | Client | `BookADemoPage.tsx` (`handleSubmit` attempt) | `source`, `content_group`, `app_env` | **Yes** | **Yes** |
| `generate_lead` | Recommended | Client | `BookADemoPage.tsx` (2xx success callback) | `lead_source`, `form_name`, `value`, `currency`, `content_group`, `app_env` | **Yes** | **Yes** |
| `contact_submit`| Custom (Marketing) | Client | Contact form 2xx response | `form_name`, `content_group`, `app_env` | **Yes** | No |
| `newsletter_signup`| Custom (Marketing) | Client | Newsletter subscription form | `signup_location`, `content_group`, `app_env` | **Yes** | No |
| `faq_expand` | Custom (Marketing) | Client | `SharedFaqAccordion.tsx` (On open, once/item) | `faq_question`, `content_group`, `app_env` | **Yes** | No |
| `video_play` | Custom (Marketing) | Client | Landing video playback start | `video_name`, `video_location`, `content_group`, `app_env` | **Yes** | No |
| `sign_up` | Recommended | Client | Auth flow (Registration success) | `method`, `content_group`, `app_env` | **Yes** | **Yes** |
| `login` | Recommended | Client | Auth flow (Sign in success) | `method`, `content_group`, `app_env` | **Yes** | No |
| `file_upload` | Custom (Product) | Client | Upload Dropzone / File Dialog | `file_type`, `file_size_kb`, `file_count`, `content_group`, `app_env` | **Yes** | No |
| `invoice_processed`| Custom (Product) | Server | Background worker / API completion | `processing_time_ms`, `document_type`, `page_count`, `app_env` | **Yes** | **Yes** |
| `processing_failed`| Custom (Product) | Server | Document parser failure handler | `error_type`, `document_type`, `app_env` | **Yes** | No |
| `export_completed` | Custom (Product) | Server / Client | Table / Batch export completion | `export_format`, `content_group`, `app_env` | **Yes** | No |
| `integration_connect`| Custom (Product) | Client | ERP Integration sync modal | `integration_name`, `content_group`, `app_env` | **Yes** | No |
| `feature_used` | Custom (Product) | Client | Tool interaction / Filter apply | `feature_name`, `content_group`, `app_env` | **Yes** | No |
| `exception` | Custom (System) | Client | Global error boundary / 404 handler | `description`, `fatal`, `content_group`, `app_env` | **Yes** | No |

---

## 3. Custom Definitions to Register in GA4

Navigate to **GA4 Admin** $\rightarrow$ **Data display** $\rightarrow$ **Custom definitions**.

### A. Event-Scoped Custom Dimensions (Scope: Event)
Create a Custom Dimension for each of the following parameter names:

| Dimension Name | Scope | Event Parameter | Description |
| :--- | :--- | :--- | :--- |
| `CTA Name` | Event | `cta_name` | Identifier of clicked CTA button (e.g. `hero_finance_desk`) |
| `CTA Location` | Event | `cta_location` | Section of page where CTA resides (e.g. `hero`, `nav`, `closing_cta`) |
| `Plan Viewed` | Event | `plan_viewed` | Selected pricing desk/tier (e.g. `finance`, `logistics`) |
| `Source` | Event | `source` | Source trigger of a lead or demo request |
| `Lead Source` | Event | `lead_source` | Specific origin of confirmed conversion lead |
| `Form Name` | Event | `form_name` | Name of completed form (e.g. `book_a_demo`) |
| `Signup Location` | Event | `signup_location` | Location of newsletter/waitlist capture (`footer`, `popup`) |
| `FAQ Question` | Event | `faq_question` | Truncated question text expanded by user ($\le 100$ chars) |
| `Video Name` | Event | `video_name` | Title or ID of video started |
| `Video Location` | Event | `video_location` | Location of video element on page |
| `Nav Item` | Event | `nav_item` | Clicked menu header item or dropdown link |
| `Nav Location` | Event | `nav_location` | Origin of navigation link (`header`, `footer`, `drawer`) |
| `Auth Method` | Event | `method` | Sign up / login provider (`email`, `google`, `saml`) |
| `File Type` | Event | `file_type` | Document MIME or extension (`pdf`, `xlsx`, `png`, `scan`) |
| `Document Type` | Event | `document_type` | Business document taxonomy (`invoice`, `bill_of_lading`, `statement`) |
| `Error Type` | Event | `error_type` | Taxonomy of processing error (`parse_failure`, `validation_error`) |
| `Export Format` | Event | `export_format` | Download format (`csv`, `xlsx`, `json`, `pdf`) |
| `Integration Name` | Event | `integration_name` | Connected accounting/ERP software (`tally_prime`, `zoho_books`, `cargowise`) |
| `Feature Name` | Event | `feature_name` | Product tool or feature used |
| `Application Environment` | Event | `app_env` | Deployment stage (`development`, `staging`, `production`) |
| `Content Group` | Event | `content_group` | Top-level site section (`marketing`, `app`, `docs`, `auth`) |

### B. User-Scoped Custom Dimensions (Scope: User)
Create User-Scoped Dimensions:

| Dimension Name | Scope | User Property | Description |
| :--- | :--- | :--- | :--- |
| `Plan Type` | User | `plan_type` | Subscription tier (`trial`, `starter`, `growth`, `enterprise`) |
| `Account Role` | User | `account_role` | User role within organization (`admin`, `accountant`, `auditor`, `viewer`) |
| `Site Section` | User | `site_section` | Primary operational domain (`finance_desk`, `logistics_desk`) |

### C. Custom Metrics (Numeric)
Navigate to **Custom definitions** $\rightarrow$ **Custom metrics**:

| Metric Name | Scope | Event Parameter | Unit of Measurement | Description |
| :--- | :--- | :--- | :--- | :--- |
| `Processing Time` | Event | `processing_time_ms` | Milliseconds | Document parsing and extraction latency |
| `File Size KB` | Event | `file_size_kb` | Standard (Number) | Uploaded document size in Kilobytes |
| `File Count` | Event | `file_count` | Standard (Number) | Number of files in batch operation |
| `Page Count` | Event | `page_count` | Standard (Number) | Number of pages extracted in invoice document |

---

## 4. Key Events (Conversions)
Mark the following events as **Key Events** under **GA4 Admin** $\rightarrow$ **Events** $\rightarrow$ **Mark as key event**:
1. `generate_lead`
2. `demo_request`
3. `sign_up`
4. `invoice_processed`

---

## 5. Testing & Verification Checklist

### A. Strict Consent Verification in Browser Network Tab
1. Open Chrome DevTools (`F12`), switch to the **Network** tab, and filter by `google-analytics` or `googletagmanager`.
2. Clear all cookies and storage, then refresh the page.
3. Verify that the cookie banner appears.
4. **DO NOT click Accept**. Click around the site, navigate routes, click buttons:
   - **CONFIRM**: Zero requests appear in the Network tab to `googletagmanager.com` or `google-analytics.com`.
   - **CONFIRM**: In the **Application** $\rightarrow$ **Cookies** tab, no `_ga` or `_gid` cookies exist.
5. In the banner, click **Reject All**:
   - **CONFIRM**: Still zero network calls to Google Analytics.
6. Open Cookie Preferences, toggle **Analytics** to `ON`, and click **Save**:
   - **CONFIRM**: `gtag.js` script immediately downloads.
   - **CONFIRM**: A single `page_view` event POST request goes to `google-analytics.com/g/collect`.
7. Re-open Cookie Preferences, toggle **Analytics** to `OFF`, and click **Save**:
   - **CONFIRM**: `window['ga-disable-G-5WXXVPGWG6']` is set to `true`.
   - **CONFIRM**: `_ga` and `_gid` cookies are deleted from storage.
   - **CONFIRM**: Clicking any further buttons results in **zero** network calls.

### B. GA4 DebugView & Realtime Verification
1. Ensure `NEXT_PUBLIC_GA_DEBUG_MODE=true` in `.env` (or add `?ga_debug=true` to the URL).
2. Open **GA4** $\rightarrow$ **Admin** $\rightarrow$ **DebugView**.
3. Grant analytics consent in the browser.
4. Navigate through `/pricing`, `/demo`, `/finance-desk/`:
   - Inspect incoming events in the timeline.
   - Click a `page_view` event and verify parameters: `page_location`, `page_title`, `content_group`, `app_env`.
   - Click an FAQ accordion: verify `faq_expand` event arrives with `faq_question`.
   - Click a CTA button: verify `cta_click` arrives with `cta_name` and `cta_location`.
   - Fill and submit the demo form: verify `demo_request` fires on submit, and `generate_lead` fires on success with NO PII.

---

## 6. Content Security Policy (CSP) Directives

If Content-Security-Policy headers are enforced on the server or reverse proxy, ensure the following hostnames are permitted:

```http
script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.googletagmanager.com;
connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com;
img-src 'self' data: blob: https://www.google-analytics.com https://*.google-analytics.com https://*.googletagmanager.com;
```
