# Docsynecx Landing Page: Build Spec

Source: hand-drawn low-fidelity wireframe + screen recording of the existing docsynecx.com site.
Goal: build the landing page **in the existing theme**. **Do not change the fonts**; reuse the site's current font stack, sizes and weights exactly as they are.

---

## 0. Global rules

- **Theme:** keep the existing docsynecx.com theme (colours, spacing, card style, button style). Do not introduce new colours or restyle components.
- **Fonts:** do NOT change. Inherit whatever the live site already uses (headings: tight bold grotesque; body: light geometric sans; eyebrows: small uppercase, letter-spaced). If building standalone, copy the font-family declarations from the live site's CSS (DevTools > Computed) rather than choosing new ones.

---

## 1. Navbar (sticky)

- Left: **docsynecx.** logo with the tagline "INTELLIGENT WORKFLOWS" beneath.
- Right nav: **Finance Desk ▾**, **Shipment Desk ▾**, **Solutions ▾**, **Customers**, **Resources ▾**.
- Far right: **Book a Demo ↗** (solid blue button).
- Background: `--bg` with a thin bottom border; stays visible on scroll.

## 2. Hero

Wireframe: left text lines + CTA ovals, right visual box.

- **Left**
  - Headline (large, bold) ending with "...repetitive work." (keep the current live headline copy).
  - Supporting paragraph.
  - Three CTAs in a row:
    1. **I run a finance desk →** (blue)
    2. **I run a shipment desk →** (green)
    3. **Book a demo** (outline)
  - Trust line under CTAs: **Built for businesses** (green, bold) that run on Tally, an ERP or CargoWise.
- **Right**
  - Product visual box (dashboard / document-extraction mock) on a diagonal-hatched panel, with a white card floating over it.

## 3. Stat strip ("Stat card")

Wireframe label: *Stat card*. Full-width white band directly under the hero.

- Eyebrow: **SELECTED CUSTOMER OUTCOMES** (small uppercase grey)
- Three inline stats, big green figure + bold dark label:
  - **2 hrs → 2 min** FT Logistics · email to CargoWise
  - **Days → hours** Rajadurai E-Vehicles · document workflow
  - **In daily use** Arishfirma · assets & purchase bills

## 4. The Platform

- Eyebrow: **ONE PLATFORM. TWO DESKS.**
- Headline: **Two focused workspaces. One connected platform.**
- Supporting text (right): *Start with the workflow that takes the most effort today. Expand as your teams are ready.*
- **Two cards, side by side** (wireframe's two boxes):

| | Finance Desk (blue tint) | Shipment Desk (green tint) |
|---|---|---|
| Tag | FINANCE AUTOMATION & INTELLIGENCE | FREIGHT & LOGISTICS OPERATIONS |
| Icon | document/ledger icon, blue chip | swap-arrows icon, green chip |
| Title | **Finance Desk** | **Shipment Desk** |
| Copy | Move beyond invoice entry. Automate supplier documents and bring Bank Statement & Reconcilation, business reporting and AI insights into one workspace. | Connect freight operations from customer enquiry and booking to shipment management, tracking and document automation. |
| Chips | Invoice Automation, Bank Statement & Reconcilation, Business Intelligence, AI Insights | RFQ to Booking, Shipment Management, Shipment Tracking, Document Automation |
| Link | **Explore Finance Desk →** (blue) | **Explore Shipment Desk →** (green) |

## 5. Why Docsynecx (dark section)

- Background: `--ink` (full-bleed navy).
- Eyebrow: **WHY DOCSYNECX**
- Headline: **Less manual effort.** (white) / **More operational clarity.** (blue)
- 4 columns, each with orange/blue number, white bold title, muted-light description:
  1. **Reduce repetitive work**: Automate document-heavy steps that slow teams down.
  2. **Keep people in control**: Human review and approval stay part of important workflows.
  3. **Connect your systems**: Move validated information into your existing business tools.
  4. **Make data useful**: Turn finance and operations information into visibility.

## 6. Solutions by Industry

- Eyebrow: **SOLUTIONS BY INDUSTRY**
- Headline: **Designed for real business operations.**
- Supporting text: *Solutions for organisations where invoices, shipment updates and business documents are part of everyday work.*
- **5 equal cards in one row** (orange number, bold title, grey description):
  1. **Logistics & Freight Forwarding**: RFQ, shipments, tracking and trade documents
  2. **Automotive & EV**: Purchase invoices, spares and service documents
  3. **Manufacturing**: Supplier invoices and operational documents
  4. **Retail & Distribution**: High-volume invoice and document workflows
  5. **Textile & Garments**: Supplier and purchase documentation
- Below the cards, a row of pill chips: Invoice Automation, Financial Workflows, RFQ to Booking, Shipment Tracking, Document Automation.

## 7. Testimonials (Customer Stories)

- Background: `--bg-alt`.
- Eyebrow: **CUSTOMER STORIES**
- Headline: **Real workflows.** / **Meaningful time saved.** (blue)
- Supporting text: *Selected outcomes from customer workflows. Results depend on process scope, document quality and implementation.*
- **3 white cards:**
  - LOGISTICS (green tag): **FT Logistics**: A specific email-to-CargoWise document workflow reduced from around two hours to approximately two minutes.
  - AUTOMOTIVE & EV: **Rajadurai E-Vehicles**: Manual document workload reduced from days to hours through an AI-assisted workflow.
  - BUSINESS OPERATIONS: **Arishfirma**: Regular operational use for asset and purchase bill workflows.

## 8. How It Works

- Eyebrow: **HOW IT WORKS**
- Headline: **A practical path from problem to progress.**
- Supporting text: *Start small, validate with your own documents and expand when the workflow proves its value.*
- **4 step cards** with a blue top border, orange step number:
  1. **Understand**: Review your process, systems, document types and volumes.
  2. **Configure**: Map the workflow, validation points and integration needs.
  3. **Validate**: Test with representative documents and your team.
  4. **Scale**: Expand to more workflows as results are established.

## 9. Integrations & Resources

- Background: `--bg-alt`.
- Eyebrow: **INTEGRATIONS & RESOURCES**
- Headline (left): **Fits the systems your teams already use.**
- Right: a white panel with a 2-column grid of small grey tiles (bold name + small grey type):
  - **TallyPrime**: Finance integration
  - **CargoWise**: Logistics integration
  - **Email workflows**
  - **API connectivity**
  - (Keep any further tiles already on the live page, e.g. ZohoBooks.)

## 10. FAQ  *(new section, directly below Integrations)*

- Background: `--bg`.
- Eyebrow: **FAQ**
- Headline: **Questions teams ask before they start.**
- Supporting text: *Can't find your answer? Book a demo and we'll walk through your workflow.*
- **Layout:** single column accordion, max-width ~820px (or 2 columns on wide screens: headline left, accordion right). Each item is a white card with 1px border; question in bold ink text, `+` / `-` toggle on the right (blue); answer in `--muted`. First item open by default; only one open at a time; keyboard accessible (`button` + `aria-expanded`).

| # | Question | Answer |
|---|---|---|
| 1 | What is Docsynecx? | Docsynecx is an AI-powered workflow platform for document-heavy finance and logistics teams. It has two desks: Finance Desk for invoice automation and Bank Statement & Reconcilation, and Shipment Desk for RFQ to booking, shipment management, tracking and document automation. |
| 2 | Which systems does it integrate with? | It connects with TallyPrime and CargoWise, and also supports email-based workflows and API connectivity, so validated data moves into the tools your team already uses. |
| 3 | Do we need to replace our current software? | No. Docsynecx sits alongside your existing accounting, ERP or freight systems and feeds them validated data. |
| 4 | Will people still review and approve documents? | Yes. Human review and approval stay part of important workflows, so your team remains in control of what gets posted. |
| 5 | How long does it take to get started? | We start small: understand your process, configure the workflow, validate it with your own documents, then scale. The timeline depends on your document types, volumes and integrations; a demo will give you a realistic estimate. |
| 6 | Which industries do you support? | Logistics and freight forwarding, automotive and EV, manufacturing, retail and distribution, and textile and garments, wherever invoices, shipment updates and business documents are part of daily work. |
| 7 | Are the results shown on the site guaranteed? | The outcomes shown are selected customer results. Actual results depend on process scope, document quality and implementation. |
| 8 | How do I get a demo? | Click **Book a Demo** anywhere on the page, or email info@docsynecx.com, and tell us about your finance or freight workflow. |

> Add `FAQPage` JSON-LD structured data generated from the table above.

## 11. Closing CTA

- White rounded card, centered in the container.
- Eyebrow: **LET'S MAKE WORK FLOW**
- Headline: **What could your team do with less manual work?**
- Text: *Tell us about your finance or freight workflow. We'll help identify a practical place to start.*
- Right-aligned **Book a Demo ↗** (blue).
- Small grey line below the card: SynecX AI Labs Private Limited · Coimbatore, Tamil Nadu, India · info@docsynecx.com

## 12. Footer (dark)

- Background `--ink`.
- Left: logo (white), tagline, and *AI-powered finance and logistics workflows for document-intensive businesses.*
- Columns:
  - **Finance Desk**: Docsynecx Intelligence, Invoice Automation, Bank Statement & Reconcilation, Business Intelligence, AI Insights
  - **Shipment Desk**: RFQ to Booking, Shipment Management, Shipment Tracking, Document Automation
  - **Company**: Solutions, Customers, About Us, Contact
- Bottom bar (thin divider): © 2026 SynecX AI Labs Private Limited. All rights reserved. · info@docsynecx.com

---

## Section order (final)

1. Navbar 2. Hero 3. Stat strip 4. The Platform 5. Why Docsynecx 6. Solutions by Industry 7. Testimonials 8. How It Works 9. Integrations 10. **FAQ** 11. Closing CTA 12. Footer

## Build notes

- Reuse existing components/classes from the live site wherever possible; the FAQ accordion is the only new component.
- Section backgrounds alternate: bg, bg-alt, dark, bg, bg-alt, bg, bg-alt, bg, bg, dark.
- Responsive: nav collapses to a hamburger below ~900px; 5-card and 4-column rows become 2 columns on tablet and 1 on mobile; hero CTAs wrap.
- Accessibility: visible focus states, sufficient contrast on the dark sections, semantic headings (`h1` once in the hero, `h2` per section).
