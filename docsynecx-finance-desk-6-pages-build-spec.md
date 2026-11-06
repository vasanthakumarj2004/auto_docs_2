# Docsynecx Finance Desk: 6-Page Build Specification

**Purpose:** Build six pages for the Finance Desk section, using the website's **existing theme, fonts, spacing, buttons, cards, chips and components**. This document defines only **page structure, section order, layout and copy**. Do not introduce new styling. Reuse whatever the current Invoice Automation / Finance Desk pages already use.

**Source labels used below**
- **(video)**: copy and layout taken directly from your screen recordings.
- **(suggested)**: that part was not visible in the recordings, so the copy is drafted in the same tone. Replace it if you have final copy.

---

## 0. Site-wide changes (apply to all 6 pages)

### 0.1 The six pages

| # | Page | Suggested file | Nav label |
|---|------|----------------|-----------|
| 1 | Finance Desk overview (hub) | `finance-desk.html` | Finance Desk |
| 2 | Invoice Automation | `invoice-automation.html` | 01 Invoice Automation |
| 3 | Banking & Reconciliation | `bank-statement-reconciliation.html` | 02 Banking & Reconciliation |
| 4 | Payment Reminders | `payment-reminders.html` | 03 Payment Reminders |
| 5 | Accounts Payable (upcoming) | `accounts-payable.html` | 04 Accounts Payable + "Upcoming" badge |
| 6 | Docsynecx Intelligence (combined) | `docsynecx-intelligence.html` | 05 Docsynecx Intelligence |

Use clean production paths (for example `/finance-desk/invoice-automation`) when deploying. The local `127.0.0.1:5500/...` links must not ship.

### 0.2 Navigation

1. Clicking **"Finance Desk"** in the top nav opens the **Finance Desk overview page (#1)**. Hover or open still shows the dropdown.
2. **Dropdown contents (single list, order fixed):**
   1. Invoice Automation
   2. Banking & Reconciliation
   3. Payment Reminders
   4. Accounts Payable, with an **Upcoming** badge
   5. Docsynecx Intelligence
3. The old right column (Financial, Business, Working Capital, Operations, Management and AI Intelligence) is **removed from the dropdown**. Those six topics now live inside page #6.
4. Add an **active state** to the dropdown item for the page the visitor is currently on.
5. Optional: add an "Overview" link at the top of the dropdown pointing to #1.
6. Add a one-line description under **Docsynecx Intelligence** in the dropdown, for example "Financial, business and operational insights in one place". Keep it short.

### 0.3 Footer (all pages)

Finance Desk column, in this order:
- Overview
- Invoice Automation
- Banking & Reconciliation
- Payment Reminders
- Accounts Payable
- Docsynecx Intelligence

Shipment Desk and Company columns stay as they are. Remove the old "Financial Intelligence", "Business Intelligence" and "AI Insights" footer links.

### 0.4 Naming consistency

Use these exact names everywhere (nav, dropdown, footer, cards, breadcrumbs, CTAs):
**Invoice Automation · Banking & Reconciliation · Payment Reminders · Accounts Payable · Docsynecx Intelligence.**
Never use "AI Insights" as a page name. "AI Intelligence" is only a card inside page #6.

### 0.5 Shared page pattern

Every page uses these reusable blocks. Use the existing component for each:

| Block | Description |
|-------|-------------|
| Eyebrow | Small label with a short leading line, for example `DOCSYNECX / FINANCE DESK` |
| Hero | Eyebrow, two-part headline (second part accented), paragraph, primary + secondary button, small microline, and an illustrative product card on the right |
| Section header | Eyebrow + large heading on the left, short supporting paragraph on the right |
| Feature card | Small tag label, title, description |
| Numbered card | Number, title, one line of description |
| Process strip | Chips joined by arrows |
| Closing CTA card | Eyebrow, heading, paragraph, button on the right |
| Footer | As in 0.3 |

---

## PAGE 1: Finance Desk Overview (hub)

**URL:** `finance-desk.html`  **Reached by:** clicking "Finance Desk" in the nav. This page is the hub for the other five.

### Section order

#### 1. Hero (video)
- **Eyebrow:** `DOCSYNECX / FINANCE DESK`
- **H1:** "Automate finance." + accent line "Unlock intelligence."
- **Paragraph:** "Go beyond invoice automation. Bring intelligent document processing, financial intelligence, business intelligence and AI-powered insights into one connected finance workspace."
- **Buttons:** Primary "Book a Finance Desk Demo ↗"; secondary "Explore capabilities ↓" (scrolls to Section 3)
- **Microline:** "Invoice workflows · Financial visibility · Business insights"
- **Right visual (illustrative product card):**
  - Header: `FINANCE DESK` / `ILLUSTRATIVE PRODUCT VIEW`
  - Two tiles: "Document workflow → Invoice review" and "Business view → Financial insights"
  - Skeleton lines
  - Status chip: "Extract · Validate · Understand"

#### 2. One connected finance workspace (video)
- **Eyebrow:** `ONE CONNECTED FINANCE WORKSPACE`
- **H2:** "From documents to better decisions."
- **Paragraph:** "Finance teams need more than data entry. Docsynecx combines invoice automation with financial and business intelligence so teams can reduce repetitive work and make better use of business information."
- **Right card, 4 tiles (2×2):**
  - Capture: Read business documents
  - Validate: Keep review in the loop
  - Understand: Explore finance information
  - Act: Use reports and insights

#### 3. FIVE connected capabilities (video, changed from four to five)
- **Eyebrow:** `FIVE CONNECTED CAPABILITIES` (was "Four")
- **H2:** "Finance operations, made more intelligent."
- **Right paragraph:** "Explore the capabilities within Finance Desk. Each can address a distinct need while contributing to a connected finance environment."
- **Five cards.** Use the existing card layout: number/category label, title, one-line description, 4–5 checkmark bullets, "Explore … →" link.
- **Grid:** 3 + 2 (or 2 + 2 with card 05 spanning the full width). Pick the one that fits the existing grid best.

| # | Label | Title | Description | Bullets | Link |
|---|-------|-------|-------------|---------|------|
| 01 | Document automation | **Invoice Automation** | "Turn supplier invoices into structured, reviewable data for your accounting workflow." | AI-powered invoice data extraction · GST, HSN and line-item capture · Human-in-the-loop validation · Duplicate detection and batch processing · TallyPrime integration | Explore invoice automation → |
| 02 | Banking | **Banking & Reconciliation** | "Process bank statements, support bookkeeping and review reconciliation inside TallyPrime." | Bank statement intake · Transaction extraction and categorisation · Entries posted to TallyPrime · Matched and unmatched review · Reviewer controls | Explore banking & reconciliation → |
| 03 | Receivables | **Payment Reminders** | "Keep outstanding invoices visible and follow up with customers before and after due dates." | Track invoice due dates · Identify pending and overdue payments · Send or schedule reminders · Follow-up visibility · More consistent collections | Explore payment reminders → |
| 04 | Payables · **Upcoming** | **Accounts Payable** | "Planned workflows for supplier invoices, payment review and payables visibility." | Supplier invoice and payable information · Payment due-date management · Review and approval workflows · Payables reporting · Finance-system integration, subject to scope | Register interest → |
| 05 | Business performance | **Docsynecx Intelligence** | "Six connected views of financial and business performance in one place." | Financial Intelligence · Business Intelligence · Working Capital Intelligence · Operations Intelligence · Management and AI Intelligence | Explore Docsynecx Intelligence → |

> Cards 01–03 and 05 are **suggested copy** in the style of the existing cards. The old cards (Financial Intelligence, Business Intelligence, AI Insights) are removed from this section.
> Card 04 must show the **Upcoming** tag and link to the Register Interest flow.

#### 4. Finance workflow band (video)
- **Eyebrow:** `THE FINANCE WORKFLOW`
- **H2:** "Capture. Validate." + accent "Understand. Act."
- **Process strip of 4 chips (arrows between):** Documents → Validation → Accounting → Reporting
  *(Chip text was only partly visible. Keep the existing labels if the live page already has them.)*

#### 5. Who it is for (video)
- **Eyebrow:** `WHO IT IS FOR`
- **H2:** "Built around finance and business teams."
- **Right paragraph:** "Finance Desk can support teams that handle recurring supplier documents and need clearer views of business performance."
- **Five numbered cards:**
  - 01 Business Owners: Business and financial visibility
  - 02 Finance Teams: Invoice processing and reporting
  - 03 Accounts Teams: Validated accounting information
  - 04 CA Firms: Document-intensive workflows
  - 05 Management Teams: Performance review and insights

#### 6. Integrations & implementation (video)
- **Eyebrow:** `INTEGRATIONS & IMPLEMENTATION`
- **H2:** "Works with your finance ecosystem."
- **Paragraph:** "Connect approved invoice information with TallyPrime. Additional ERP, workflow and deployment requirements can be assessed during discovery."
- **Right card, 4 tiles:** TallyPrime (Accounting integration) · API-first (Integration approach) · Cloud (Deployment discussion) · On-premise (Deployment discussion)

#### 7. Get started (video)
- **Eyebrow:** `GET STARTED`
- **H2:** "Start with a focused finance use case."
- **Right paragraph:** "Discovery, workflow mapping, configuration, validation and rollout based on your systems and business needs."
- **Four numbered steps:**
  - 01 Discover: Understand document volumes, systems and reporting needs.
  - 02 Configure: Set up the selected workflows and integrations.
  - 03 Validate: Test with sample documents and review outputs.
  - 04 Go live: Roll out and expand based on agreed scope.

#### 8. Common questions
- **Eyebrow:** `COMMON QUESTIONS`
- **H2:** "Finance Desk FAQ"
- Keep the existing FAQ component and content. Update any answer that mentions "four capabilities" or lists Financial Intelligence, Business Intelligence or AI Insights separately.

#### 9. Closing CTA (suggested)
- **Eyebrow:** `DOCSYNECX FINANCE DESK`
- **Heading:** "Bring your finance workflows into one connected workspace."
- **Paragraph:** "Tell us about your documents, accounting system and reporting needs, and we'll help identify a practical starting point."
- **Button:** "Book a Finance Desk Demo ↗"

#### 10. Footer

---

## PAGE 2: Invoice Automation

**URL:** `invoice-automation.html`

#### 1. Hero (video)
- **Eyebrow:** `FINANCE DESK / INVOICE AUTOMATION`
- **H1:** "Turn supplier invoices" + accent "into structured data."
- **Paragraph:** "Automate invoice data capture, validation and accounting workflows with AI-powered document processing. Keep your team in control with human review before information moves into your accounting system."
- **Buttons:** "Book a Demo ↗" · "Explore capabilities ↓"
- **Microline:** "Finance Desk · Structured data · Review-led workflow"
- **Right visual:** product card labelled `PRODUCT EXPERIENCE` with an "Automation" / "Finance Desk" tile pair, skeleton lines and the chip "AI-powered · Human-guided · Connected"

#### 2. Pain points (dark band) (video)
- **Heading:** keep the existing heading (it ends "…team.")
- **Five numbered items**, each with the supporting line "Reduce friction and improve visibility across the workflow.":
  - 01 Manual retyping of supplier invoice details
  - 02 Different invoice layouts and formats
  - 03 Time spent checking GST, HSN and line items
  - 04 Repeated work across batches of invoices
  - 05 Errors and duplicates that require additional review

#### 3. What you can do, checklist (video)
- **Eyebrow:** `WHAT YOU CAN DO`
- **H2:** "Make the information work harder for you."
- **Right paragraph:** "Start with the needs that matter most to your team. Scope and available workflows can be confirmed during a product walkthrough."
- **Checklist card:**
  - AI-powered invoice data extraction
  - Supplier, invoice number and date capture
  - GST and HSN extraction
  - Line-item and tax detail capture
  - Credit note and debit note processing
  - Human-in-the-loop validation and confidence review
  - Duplicate detection and batch processing
  - TallyPrime integration

#### 4. Capability cards (3-column grid) (video)
Each card has a tag, a title and a description:

| Tag | Title | Description |
|-----|-------|-------------|
| Invoice intake *(suggested)* | Invoice intake | Bring in supplier invoices, including supported PDF and image formats. |
| Key fields *(suggested)* | Header and total capture | Capture supplier, invoice number, date, totals and other key invoice fields. |
| Tax details *(suggested)* | GST and HSN extraction | Identify GST and HSN information from supported invoice layouts for validation. |
| ITEM-LEVEL CAPTURE | Line-item and tax details | Extract item descriptions, quantities, rates, taxable values and tax breakdowns where present in the document. |
| DOCUMENT TYPES | Credit and debit notes | Process supported credit note and debit note documents as part of the supplier document workflow. |
| HUMAN REVIEW | Human-in-the-loop validation | Allow users to review extracted fields, correct exceptions and approve information before it is posted. |
| QUALITY CONTROL | Confidence review and exception handling | Use extraction confidence indicators to help teams prioritise fields that need closer checking. |
| DUPLICATE CHECKS | Duplicate detection | Identify potential duplicate invoices to help prevent repeated accounting entry. |
| BATCH WORKFLOW | Batch invoice processing | Process multiple supplier invoices through a structured workflow rather than entering them individually. |
| ACCOUNTING INTEGRATION | TallyPrime integration | Send approved supplier invoice information to the configured TallyPrime company, reducing manual re-entry. |

*(The first three cards were partly off-screen in the video. Use the existing live copy where it exists.)*

#### 5. How it works, 4 steps (video)
Four step cards with these descriptions (step titles suggested: Upload → Extract → Review → Post):
1. Upload or submit supplier invoice documents.
2. AI identifies invoice fields and line-item information.
3. Your team reviews extracted data and resolves exceptions.
4. Approved information moves through the configured accounting workflow.

#### 6. Who it is for (video)
- **Eyebrow:** `WHO IT IS FOR`
- **H2:** "Designed for teams that need better visibility."
- **Right paragraph:** "Finance Desk capabilities can support different business roles and information needs."
- **Five numbered cards**, each with "Designed around your business workflow.":
  01 Finance and accounts teams · 02 Businesses processing recurring supplier invoices · 03 Automotive and EV dealerships · 04 Manufacturing and distribution businesses · 05 TallyPrime users

#### 7. Closing CTA (video)
- **Eyebrow:** `DOCSYNECX FINANCE DESK`
- **Heading:** "Make invoice processing more consistent, reviewable and efficient."
- **Paragraph:** "Let's understand your current process and identify a practical starting point for your team."
- **Button:** "Book a Demo ↗"

#### 8. Footer

---

## PAGE 3: Banking & Reconciliation

**URL:** `bank-statement-reconciliation.html`

#### 1. Hero (suggested, not visible in the video)
- **Eyebrow:** `FINANCE DESK / BANKING & RECONCILIATION`
- **H1:** "Turn bank statements" + accent "into reconciled books."
- **Paragraph:** "Process bank statement data, support bookkeeping and review reconciliation in TallyPrime, with your accounting team in control."
- **Buttons:** "Talk to Docsynecx ↗" · "Explore capabilities ↓"
- **Microline:** "Finance Desk · Bookkeeping · Reconciliation review"
- **Right visual:** product card with the chip "Statement · Match · Review"

#### 2. Why it matters (video)
- **Eyebrow:** `WHY IT MATTERS`
- **H2:** "Spend less time organising statement data."
- **Paragraph:** "Bank reconciliation often involves reviewing statement entries, comparing them with accounting records and investigating unmatched transactions. Docsynecx is designed to help structure this work and make review easier."
- **Right card, "Support your reconciliation process"**, with checkmarks:
  - Bring statement data into a consistent structure
  - Review transactions against available accounting information
  - Identify entries that may need attention
  - Support a clearer reconciliation review process

#### 3. Capabilities (video)
- **Eyebrow:** `BANK STATEMENT & RECONCILIATION CAPABILITIES`
- **H2:** "From bank statement to TallyPrime bookkeeping and reconciliation."
- **Right paragraph:** "Docsynecx processes bank statement information, supports bookkeeping and reconciliation, and posts the resulting entries into TallyPrime. Exact formats and workflow steps depend on the implementation configuration."
- **Eight cards (3-column grid):**

| Tag | Title | Description |
|-----|-------|-------------|
| STATEMENT PROCESSING | Bank statement intake | Bring bank statement files into the Docsynecx workflow for processing. |
| DATA CAPTURE | Transaction extraction | Capture transaction dates, descriptions, debit and credit amounts, and balances from supported statement formats. |
| BOOKKEEPING | Transaction categorisation | Organise statement transactions into relevant bookkeeping categories for review and posting. |
| TALLYPRIME POSTING | Bookkeeping entries in TallyPrime | Create the corresponding bank and bookkeeping entries in TallyPrime through the configured workflow. |
| RECONCILIATION | Bank reconciliation | Reconcile statement transactions with accounting entries and review matched and unmatched items. |
| EXCEPTION REVIEW | Unmatched transaction review | Identify transactions that require attention and support investigation before finalising the reconciliation. |
| HUMAN REVIEW | Validation and controls | Keep the accounting team involved in reviewing extracted information, categorisation and reconciliation exceptions. |
| BUSINESS VALUE | Benefits for finance teams | Reduce repetitive bank entry work, improve bookkeeping consistency and make reconciliation review more structured. |

#### 4. Workflow overview (video)
- **Eyebrow:** `WORKFLOW OVERVIEW`
- **H2:** "From bank statement to reconciliation review."
- **Right paragraph:** "Final workflow and matching rules can be aligned with your bank formats, accounting software and operating process."
- **Process strip:** Provide bank statement → Structure transaction data → Compare & review → Resolve exceptions

#### 5. Part of a connected finance workspace (video, updated)
- **Eyebrow:** `CONNECTED FINANCE DESK`
- **H2:** "Part of a connected finance workspace."
- **Cards with "Explore capability →" links.** The old links were Financial Intelligence and Business Intelligence. Change them to link to **Invoice Automation**, **Payment Reminders** and **Docsynecx Intelligence**.

#### 6. Closing CTA (video)
- **Eyebrow:** `LET'S TALK`
- **Heading:** "Explore bank statement and reconciliation workflows."
- **Paragraph:** "Tell us about your bank formats, accounting system and reconciliation process. We'll discuss a suitable scope and implementation approach."
- **Button:** "Talk to Docsynecx ↗"

#### 7. Footer

---

## PAGE 4: Payment Reminders

**URL:** `payment-reminders.html`

#### 1. Hero (suggested, not visible in the video)
- **Eyebrow:** `FINANCE DESK / PAYMENT REMINDERS`
- **H1:** "Follow up on payments" + accent "with more structure."
- **Paragraph:** "Keep outstanding invoices visible and help your team follow up with customers before and after payment due dates."
- **Buttons:** "Talk to Docsynecx ↗" · "Explore capabilities ↓"
- **Microline:** "Finance Desk · Receivables visibility · Follow-up workflow"
- **Right visual:** product card with the chip "Due dates · Reminders · Follow-ups"

#### 2. Why it matters (video, partly visible)
- **Heading (ends as seen):** "…follow-ups easier to manage." (full line suggested: "Make payment follow-ups easier to manage.")
- **Paragraph:** "Keep outstanding invoices visible and help your team follow up with customers before and after payment due dates."
- **Right card with checkmarks:**
  - View customer invoices and payment due dates
  - Identify pending and overdue payments
  - Send or schedule reminders using supported channels
  - Maintain visibility into follow-up activity
  - Support a more consistent collections process

#### 3. A simple process (video)
- **Eyebrow:** `A SIMPLE PROCESS`
- **H2:** "From due date to customer follow-up."
- **Right paragraph:** "Reminder rules, communication channels and follow-up status can be configured according to the available product functionality and your business needs."
- **Process strip:** Track invoice due dates → Identify pending payments → Send reminders → Review follow-ups

#### 4. Part of a connected finance workspace (video, updated)
- Same pattern as Page 3, Section 5. Link cards to **Invoice Automation**, **Banking & Reconciliation** and **Docsynecx Intelligence**.

#### 5. Closing CTA (video)
- **Eyebrow:** `LET'S TALK`
- **Heading:** "Bring more structure to payment follow-ups."
- **Paragraph:** "Discuss your current receivables process, customer communication needs and payment reminder workflow with our team."
- **Button:** "Talk to Docsynecx ↗"

#### 6. Footer

---

## PAGE 5: Accounts Payable (Upcoming)

**URL:** `accounts-payable.html`  
Must clearly read as **under development**, with no claims of availability.

#### 1. Hero (video, partly visible)
- **Eyebrow:** `FINANCE DESK / ACCOUNTS PAYABLE` *(suggested)*
- **H1:** "Bring structure to supplier payables." *(suggested; keep the existing H1 if there is one)*
- **Paragraph:** ends "…greater structure and visibility to supplier invoice processing and payable workflows." (full draft: "Accounts Payable is being designed to bring greater structure and visibility to supplier invoice processing and payable workflows.")
- **Buttons:** Primary "Register Your Interest ↗"; secondary "Explore Finance Desk" (links to Page 1)
- **Microline:** "Under development · Not yet available for deployment"
- **Right visual:** product card with the green chip "Building the next finance workflow"

#### 2. What we're working towards (video)
- **Eyebrow:** `WHAT WE'RE WORKING TOWARDS`
- **H2:** "A more connected way to manage payables."
- **Paragraph:** "The planned direction is to support businesses in organising supplier-side financial workflows, from invoice information to payable review and visibility."
- **Right card, "Planned areas of focus"**, with checkmarks:
  - Supplier invoice and payable information management
  - Visibility into pending supplier payments
  - Structured review and approval workflows
  - Payables reporting and financial visibility
  - Integration with existing finance systems, subject to scope

#### 3. Planned capability cards (video)
Each card has a **PLANNED** tag unless stated otherwise:

| Tag | Title | Description |
|-----|-------|-------------|
| PLANNED | Supplier invoice management *(suggested)* | Organise supplier invoice and payable information in one place. |
| PLANNED | Payment due-date management | Help teams review upcoming supplier due dates and prioritise payment obligations. |
| PLANNED | Approval workflows | Configurable review and approval steps for supplier invoices and payable actions, subject to product design. |
| PLANNED | Payables reporting | Reports for supplier balances, due amounts, ageing and payable trends. |
| UNDER DEVELOPMENT | Roadmap preview | Accounts Payable is under development. Scope, release timing and supported integrations will be confirmed as the product roadmap is finalised. |

#### 4. Closing CTA (video)
- **Eyebrow:** `SHAPE THE ROADMAP`
- **Heading:** "Interested in Accounts Payable?"
- **Paragraph:** "Tell us about your supplier invoice volumes, approval process and accounting system. We welcome conversations with businesses interested in this upcoming capability."
- **Button:** "Register Interest ↗"

#### 5. Footer

---

## PAGE 6: Docsynecx Intelligence (combined page)

**URL:** `docsynecx-intelligence.html`  
This page replaces the six separate Intelligence pages. Build it **exactly as in your video**: same section order, same card layout and same copy.

#### 1. Hero (video)
- **Eyebrow:** `DOCSYNECX / FINANCE DESK / INTELLIGENCE`
- **H1:** "Understand business performance." + accent line "See the bigger picture."
- **Paragraph:** "Docsynecx Intelligence brings financial and business information into clearer view, helping teams review performance, understand key movements and ask better questions."
- **Buttons:** Primary "Explore Intelligence →" (scrolls to Section 2); secondary "Book a demo"
- **Microline:** "**Decision support, not a replacement** for accounting controls or management judgement." (the first part is emphasised)
- **Right visual (illustrative product card):**
  - Header: `DOCSYNECX INTELLIGENCE` / `BUSINESS PERFORMANCE`
  - Two tiles: "Financial → Overview" and "Business → Performance"
  - Skeleton lines
  - Chip: "Insights · Comparisons · AI-assisted"

#### 2. Six intelligence capabilities (video)
- **Eyebrow:** `UNDERSTAND BUSINESS PERFORMANCE`
- **H2:** "Six intelligence capabilities." + accent line "One connected view."
- **Right paragraph:** "Explore six focused views of business performance, operations and management. Data availability and reporting depth depend on connected source systems and configured workflows."

**Layout:** six **full-width stacked cards**, one per row. Each card has three zones:
- **Left:** large number (01–06)
- **Middle:** eyebrow label with leading line, title, description and an "Explore … →" link
- **Right:** a wrapping group of small pill chips

| # | Eyebrow label | Title | Description | Chips | Link |
|---|---------------|-------|-------------|-------|------|
| 01 | FINANCIAL PERFORMANCE | **Financial Intelligence** | Understand the financial health of your business through a clear view of performance, profitability and cash position. | Profit & Loss (P&L) · Balance Sheet · Profitability · Revenue · Expenses · Cash & Bank | Explore Financial Intelligence → |
| 02 | BUSINESS PERFORMANCE | **Business Intelligence** | Review the key commercial drivers of your business across sales, purchases, customers, suppliers and products. | Sales · Purchases · Customers · Suppliers · Products · Inventory | Explore Business Intelligence → |
| 03 | CASH FLOW & LIQUIDITY | **Working Capital Intelligence** | Understand how receivables, payables and overdue obligations influence liquidity and the cash cycle. | Receivables · Payables · Overdue Bills · Liquidity · Cash Cycle | *(link shown or hidden to match the other cards)* |
| 04 | INVENTORY & SUPPLIER OPERATIONS | **Operations Intelligence** | Identify operational patterns across stock movement, ageing, purchasing and supplier performance. | Inventory Movement · Stock Ageing · Purchase Patterns · Supplier Performance | *(same as above)* |
| 05 | AI-ASSISTED UNDERSTANDING | **AI Intelligence** | Ask questions about business performance, investigate underlying causes and receive actionable insights to support decisions. | Conversational AI · Root Cause Analysis · Business Insights · Recommendations | Explore AI Intelligence → |
| 06 | MANAGEMENT REPORTING | **Management Intelligence** | Bring key measures together with structured MIS, performance tracking and timely reporting for management reviews. | Automated MIS · KPIs · Comparisons · Scheduled Reports · Alerts | *(same as above)* |

**Link behaviour:** since this is now a single page, the "Explore … →" links must **not** go to separate pages. Pick one:
- (a) scroll to a detail anchor on this page, or
- (b) expand the card inline, or
- (c) point to **Book a demo**.

Default to (a) or (b), and keep the link treatment identical on every card.

#### 3. Closing CTA (video)
- **Eyebrow:** `MAKE YOUR DATA MORE USEFUL`
- **Heading:** "Bring business performance into focus."
- **Paragraph:** "Discuss your reporting needs, source data and the questions your team wants to answer."
- **Button:** "Book a Demo ↗"

#### 4. Disclaimer line (video)
Small text below the CTA card:
"Financial and business intelligence capabilities are scoped to available connected data. Current financial and business reporting pages describe analysis using TallyPrime data. Confirm data availability and configured scope during discovery."

#### 5. Footer (updated as per 0.3)

---

## Cross-linking map

| From | Links to |
|------|----------|
| Nav "Finance Desk" | Page 1 |
| Dropdown items 01–05 | Pages 2–6 |
| Page 1 Section 3, five cards | Pages 2, 3, 4, 5, 6 |
| Pages 3 and 4, "Connected finance workspace" cards | The other Finance Desk pages (never the retired Intelligence pages) |
| Page 5 secondary hero button | Page 1 |
| Footer Finance Desk column | Pages 1–6 |

## Implementation checklist

- [ ] Create the six pages using existing templates and components only
- [ ] Update the nav so "Finance Desk" links to Page 1
- [ ] Replace the dropdown with the single five-item list and the Upcoming badge, and add the active state
- [ ] Update the footer on every page
- [ ] Change "Four connected capabilities" to "Five connected capabilities" with the five cards, including Accounts Payable
- [ ] Redirect or remove the old Financial, Business and AI Insights pages, and point any old links at Page 6
- [ ] Update the FAQ and "Connected finance workspace" cards that reference retired pages
- [ ] Confirm the Accounts Payable page is labelled "Under development" everywhere
- [ ] Check responsive behaviour for the 3 + 2 card grid and the stacked Intelligence rows
- [ ] Replace local URLs with production paths and test every link
- [ ] Confirm all CTAs go to the correct demo, contact or register-interest destination

## Open decisions to confirm

1. **Dropdown layout:** single list of five (assumed) or two columns, with Docsynecx Intelligence alone in the right column?
2. **Card grid on Page 1:** 3 + 2 (assumed) or 2 + 2 with a full-width fifth card?
3. **Intelligence "Explore →" links:** in-page anchors, inline expansion or Book a demo?
4. **Hero copy for Pages 3 and 4, and the first cards on Pages 2 and 5:** these were not visible in the recordings. Send the existing text or approve the suggested copy.
