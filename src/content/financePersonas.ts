export interface PersonaChallenge {
  number: string;
  title: string;
  description: string;
}

export interface PersonaFeature {
  tag: string;
  title: string;
  description: string;
}

export interface PersonaFaq {
  question: string;
  answer: string;
}

export interface PersonaData {
  slug: 'business-owners' | 'finance-teams' | 'accounts-teams' | 'ca-firms';
  navTitle: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  accent: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  microline: string;
  visualTitle: string;
  visualLabel: string;
  tiles: [string, string][];
  chip: string;
  challengesEyebrow: string;
  challengesTitle: string;
  challengesDescription: string;
  challenges: PersonaChallenge[];
  capabilitiesEyebrow: string;
  capabilitiesTitle: string;
  capabilitiesDescription: string;
  checklist: string[];
  features: PersonaFeature[];
  processEyebrow: string;
  processTitle: string;
  processDescription: string;
  processSteps: string[];
  proofLabel: string;
  proofTitle: string;
  proofMetricFrom: string;
  proofMetricTo: string;
  proofDescription: string;
  proofLink: string;
  proofLinkText: string;
  faqsEyebrow: string;
  faqsTitle: string;
  faqs: PersonaFaq[];
  ctaEyebrow: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
}

export const financePersonas: Record<PersonaData['slug'], PersonaData> = {
  'business-owners': {
    slug: 'business-owners',
    navTitle: 'Business Owners',
    metaTitle: 'Docsynecx for Business Owners | Complete Financial Visibility',
    metaDescription: 'Empower business owners with real-time financial visibility, automated invoice approvals, and connected cash flow intelligence without waiting for month-end reports.',
    eyebrow: 'DOCSYNECX / FOR BUSINESS OWNERS',
    headline: 'Complete financial clarity.',
    accent: 'Zero guesswork.',
    description: 'Stop waiting for month-end accounting reports to understand cash flow and supplier commitments. Docsynecx brings invoice approvals, spending visibility, and financial intelligence into a unified workspace.',
    primaryCta: 'Book an Owner Walkthrough',
    secondaryCta: 'Explore capabilities',
    microline: 'Real-time visibility · Automated approvals · Works with your existing TallyPrime',
    visualTitle: 'EXECUTIVE OVERVIEW',
    visualLabel: 'OWNER CONSOLE',
    tiles: [
      ['Cash & Commitments', 'Real-time visibility'],
      ['Approval Routing', '1-Tap mobile review'],
    ],
    chip: 'Commitments · Working Capital · Cash Flow',
    challengesEyebrow: 'OWNER BLINDSPOTS',
    challengesTitle: 'The operational friction business owners face every day.',
    challengesDescription: 'Running a growing business requires knowing where every rupee is committed before cash leaves your account.',
    challenges: [
      {
        number: '01',
        title: 'Flying blind between month-end closes',
        description: 'Crucial purchasing and expenditure figures remain buried in accounting ledgers until your accounts team closes books weeks later.',
      },
      {
        number: '02',
        title: 'Uncontrolled rate variances & repeats',
        description: 'Vendor price hikes, duplicate invoices, and incorrect tax charges slip through because no single system flags historical discrepancies.',
      },
      {
        number: '03',
        title: 'Approval bottlenecks on owner desks',
        description: 'Bills pile up in emails and paper folders awaiting your sign-off without contextual supporting documents or purchase histories.',
      },
      {
        number: '04',
        title: 'Reliance on key staff for basic numbers',
        description: 'Simple queries about vendor dues or project expenses require halting your finance team to pull ad-hoc reports from Tally.',
      },
    ],
    capabilitiesEyebrow: 'WHAT BUSINESS OWNERS GAIN',
    capabilitiesTitle: 'Turn accounting data into proactive leadership decisions.',
    capabilitiesDescription: 'Gain confidence in your financial runway, control company expenditures, and empower your team without micromanagement.',
    checklist: [
      'Real-time cash flow and upcoming supplier dues tracker',
      'Mobile-friendly 1-tap invoice approvals with attached source PDFs',
      'Instant duplicate and price variance warnings before approvals',
      'Working Capital Intelligence for receivables and payables ageing',
      'Direct integration with TallyPrime without altering chart of accounts',
      'Conversational AI to ask plain-English questions about business metrics',
    ],
    features: [
      {
        tag: 'CASH CONTROL',
        title: 'Real-Time Payables Visibility',
        description: 'See upcoming supplier obligations sorted by due date, preventing sudden liquidity pinches and late-payment penalties.',
      },
      {
        tag: 'GOVERNANCE',
        title: 'Threshold-Based Approvals',
        description: 'Configure approval thresholds so routine small bills flow directly to accounts, while high-value expenses require your sign-off.',
      },
      {
        tag: 'WORKING CAPITAL',
        title: 'Receivables & Collections Tracking',
        description: 'Monitor customer payment overdue ageing and track automated follow-ups to keep days sales outstanding (DSO) strictly in check.',
      },
      {
        tag: 'RATE VARIANCE',
        title: 'Historical Vendor Rate Checks',
        description: 'Automatically compare current invoice item rates against past purchase orders to spot unexpected price creep immediately.',
      },
      {
        tag: 'DECISION INTELLIGENCE',
        title: 'Ask Plain-English Performance Questions',
        description: 'Use Docsynecx Intelligence to query gross margins, supplier dependencies, and top product expenses without opening Tally.',
      },
      {
        tag: 'AUDIT-READY',
        title: 'Zero Paper Trails to Chase',
        description: 'Every posted voucher is permanently linked to its original source invoice, review timestamp, and approver signature.',
      },
    ],
    processEyebrow: 'FROM INVOICE TO CLARITY',
    processTitle: 'How business owners maintain control effortlessly.',
    processDescription: 'A streamlined workflow that frees your executive time while keeping financial safeguards airtight.',
    processSteps: ['Bills captured from emails & scans', 'AI verifies GST & duplicates', 'Owner reviews high-value items', 'Voucher auto-posts to TallyPrime'],
    proofLabel: 'CUSTOMER SPOTLIGHT',
    proofTitle: 'Rajadurai E-Vehicles',
    proofMetricFrom: 'Days',
    proofMetricTo: 'hours',
    proofDescription: 'Condensed multi-branch spares, service bills, and purchase vouchers into hours with complete executive oversight.',
    proofLink: '/customers/rajadurai/',
    proofLinkText: 'Read owner case study',
    faqsEyebrow: 'OWNER QUESTIONS',
    faqsTitle: 'Common questions from business owners',
    faqs: [
      {
        question: 'Do I or my team have to abandon TallyPrime?',
        answer: 'No. Docsynecx connects directly with your existing TallyPrime setup. Your chart of accounts, party ledgers, and voucher series stay exactly as they are.',
      },
      {
        question: 'Can I approve invoices on the go from my phone?',
        answer: 'Yes. Authorized approvers receive clean mobile links where they can view the original PDF, inspect line items, and approve or query in seconds.',
      },
      {
        question: 'How does this protect my business against duplicate payments?',
        answer: 'Every incoming document is analyzed against existing records for matching vendor GSTIN, invoice number, date, and amount. Repeats are flagged before entry.',
      },
      {
        question: 'What is the implementation timeline for an SME?',
        answer: 'Typical rollout takes under 1 to 2 weeks. We map your current voucher templates, test with your sample invoices, and train your staff in a single session.',
      },
    ],
    ctaEyebrow: 'OWNER-LEVEL CONTROL',
    ctaTitle: 'Get total financial clarity across your business.',
    ctaDescription: 'Schedule a tailored walkthrough to see how Docsynecx streamlines your bills, eliminates duplicates, and provides real-time cash visibility.',
    ctaButtonText: 'Book an Owner Walkthrough',
  },

  'finance-teams': {
    slug: 'finance-teams',
    navTitle: 'Finance Teams',
    metaTitle: 'Docsynecx for Finance Teams | Scale Invoicing & Accelerate Closes',
    metaDescription: 'Equip finance managers and controllers with automated invoice validation, structured exception handling, approval workflows, and TallyPrime integration.',
    eyebrow: 'DOCSYNECX / FOR FINANCE TEAMS',
    headline: 'Automate invoice cycles.',
    accent: 'Accelerate month-end.',
    description: 'Give your finance team an intelligent workspace to process thousands of supplier invoices, route multi-level approvals, enforce GST compliance, and close books days earlier.',
    primaryCta: 'Book a Finance Team Demo',
    secondaryCta: 'Explore capabilities',
    microline: 'High-volume batching · Exception management · End-to-end audit compliance',
    visualTitle: 'FINANCE WORKBENCH',
    visualLabel: 'CONTROLLER VIEW',
    tiles: [
      ['Batch Processing', 'Automated intake'],
      ['Exception Triage', 'Confidence review'],
    ],
    chip: 'Batch Intake · Exception Triage · Ledger Sync',
    challengesEyebrow: 'FINANCE TEAM BOTTLENECKS',
    challengesTitle: 'The operational friction finance managers fight each month.',
    challengesDescription: 'As transaction volumes multiply, manual review routines turn finance teams into paper-pushing bottlenecks.',
    challenges: [
      {
        number: '01',
        title: 'Chasing managers for approval sign-offs',
        description: 'Unapproved invoices get stuck in departmental inboxes, delaying month-end reporting and missing supplier early-payment discounts.',
      },
      {
        number: '02',
        title: 'Month-end processing crunches',
        description: 'Batches of supplier bills flood in during the final days of the month, forcing late hours of tedious verification and entry.',
      },
      {
        number: '03',
        title: 'Scattered audit trails and missing documents',
        description: 'Tracking down which manager approved an invoice or where the original tax bill is stored creates stress during internal and statutory audits.',
      },
      {
        number: '04',
        title: 'Reconciliation discrepancies and GST mismatches',
        description: 'Discrepancies between physical bills, accounting entries, and GSTR-2B portal filings cause credit blocks and compliance notices.',
      },
    ],
    capabilitiesEyebrow: 'BUILT FOR FINANCE CONTROLLERS',
    capabilitiesTitle: 'Standardise workflows, reduce cycle time, and stay in control.',
    capabilitiesDescription: 'Docsynecx combines automated document extraction with structured business rules and approval matrices tailored to your organisation.',
    checklist: [
      'Multi-source ingestion: automated email scraping, drag-and-drop, and scan folders',
      'Configurable multi-level approval hierarchies by department and bill value',
      'Automated line-item extraction with HSN code validation and tax rate checks',
      'Duplicate detection engine across invoice numbers, vendors, and totals',
      'Automated voucher creation in TallyPrime with linked source PDF attachments',
      'Comprehensive audit trails logging every edit, approval, and rejection reason',
    ],
    features: [
      {
        tag: 'BATCH AUTOMATION',
        title: 'Automated Invoice Intake & Routing',
        description: 'Incoming emails with PDF attachments are ingested, OCR-extracted, and assigned to the right cost center queue automatically.',
      },
      {
        tag: 'GOVERNANCE',
        title: 'Multi-Level Approval Matrix',
        description: 'Define sequential or parallel approval rules by branch, department, expenditure type, or value threshold with automated reminders.',
      },
      {
        tag: 'TAX COMPLIANCE',
        title: 'Automated GST & HSN Verification',
        description: 'Validate supplier GSTIN status, verify HSN code structures, and ensure SGST/CGST/IGST tax splits calculate accurately.',
      },
      {
        tag: 'EXCEPTION QUEUE',
        title: 'Confidence-Based Review',
        description: 'High-confidence extractions move directly forward; only fields with ambiguities or missing purchase orders get flagged for human review.',
      },
      {
        tag: 'RECONCILIATION',
        title: 'Bank Statement Match & Tally Sync',
        description: 'Reconcile statement entries directly against supplier purchase vouchers in TallyPrime with automated match suggestions.',
      },
      {
        tag: 'AUDIT LOG',
        title: 'Permanent Source Document Linking',
        description: 'Eliminate physical filing cabinets. Source bills, audit logs, and approval notes remain accessible with one click inside Tally.',
      },
    ],
    processEyebrow: 'STRUCTURED AP WORKFLOW',
    processTitle: 'From vendor invoice to ledger posting in 4 controlled steps.',
    processDescription: 'Full visibility at every milestone so no invoice ever slips through the cracks or gets delayed.',
    processSteps: ['Central Inbox Ingestion', 'AI OCR & Line-Item Check', 'Departmental Approval', 'Automated TallyPrime Posting'],
    proofLabel: 'LOGISTICS BENCHMARK',
    proofTitle: 'FT Logistics',
    proofMetricFrom: '2 hrs',
    proofMetricTo: '2 min',
    proofDescription: 'End-to-end document review and system entry collapsed from hours to minutes across hundreds of recurring documents.',
    proofLink: '/customers/ft-logistics/',
    proofLinkText: 'Read team case study',
    faqsEyebrow: 'FINANCE FAQS',
    faqsTitle: 'Questions finance managers ask before rollout',
    faqs: [
      {
        question: 'Can we configure custom approval hierarchies?',
        answer: 'Yes. You can route invoices based on department, branch, expense category, or invoice total (e.g., invoices over ₹50,000 requiring director sign-off).',
      },
      {
        question: 'How does Docsynecx handle multi-branch or multi-GSTIN companies?',
        answer: 'Docsynecx natively supports multi-company and multi-branch configurations, routing each invoice to its respective Tally company file.',
      },
      {
        question: 'Will our accountants still verify entries before posting?',
        answer: 'Absolutely. Docsynecx is designed around human review. Your team reviews confidence scores, validates exceptions, and approves the voucher before it is committed.',
      },
      {
        question: 'Does it support credit notes, debit notes, and advance vouchers?',
        answer: 'Yes. Docsynecx supports vendor credit notes, debit notes, and payment adjustments alongside standard supplier purchase invoices.',
      },
    ],
    ctaEyebrow: 'SCALE FINANCE OPERATIONS',
    ctaTitle: 'Free your finance team from repetitive invoice data entry.',
    ctaDescription: 'Explore how Docsynecx streamlines approval bottlenecks, enforces tax checks, and automates posting into TallyPrime.',
    ctaButtonText: 'Book a Finance Team Demo',
  },

  'accounts-teams': {
    slug: 'accounts-teams',
    navTitle: 'Accounts Teams',
    metaTitle: 'Docsynecx for Accounts Teams | Zero Retyping & 1-Click Tally Vouchers',
    metaDescription: 'Eliminate manual invoice data entry for accounts teams. Extract line items, check GST/HSN, prevent duplicate entries, and post vouchers into TallyPrime in seconds.',
    eyebrow: 'DOCSYNECX / FOR ACCOUNTS TEAMS',
    headline: 'Stop manual retyping.',
    accent: 'Post bills in one click.',
    description: 'Accounts executives spend up to 70% of their workday keying vendor bills, part numbers, and tax splits into Tally. Docsynecx automates the data extraction, ledger mapping, and voucher creation so you can focus on review.',
    primaryCta: 'Book an Accounts Demo',
    secondaryCta: 'Explore capabilities',
    microline: 'Zero manual typing · Line items & HSN · 1-Click TallyPrime voucher creation',
    visualTitle: 'VOUCHER AUTOMATION',
    visualLabel: 'ACCOUNTS DESK',
    tiles: [
      ['PDF Line Items', 'Auto-extracted'],
      ['Tally Voucher', 'PUR-829 posted'],
    ],
    chip: 'Line Items · Tax Splits · Instant Vouchers',
    challengesEyebrow: 'DAILY ACCOUNTS PAINS',
    challengesTitle: 'The daily data entry grind that slows accounts executives down.',
    challengesDescription: 'Typing thousands of numbers and item descriptions line-by-line is slow, stressful, and prone to human error.',
    challenges: [
      {
        number: '01',
        title: 'Mind-numbing manual bill retyping',
        description: 'Typing vendor names, dates, invoice numbers, item codes, quantities, and rates from paper or split-screen PDFs into Tally.',
      },
      {
        number: '02',
        title: 'Messy, rotated, and inconsistent layouts',
        description: 'Every vendor formats their bill differently—some on two pages, some handwritten, and some with complex multi-tier tables.',
      },
      {
        number: '03',
        title: 'Time lost calculating tax splits & HSN',
        description: 'Manually verifying whether SGST+CGST equals 18% or if an interstate transaction requires IGST across dozen-item bills.',
      },
      {
        number: '04',
        title: 'The nightmare of duplicate bills',
        description: 'Entering a bill that was already received last week via email, causing awkward supplier calls and tedious reversal entries.',
      },
    ],
    capabilitiesEyebrow: 'SUPERPOWERS FOR ACCOUNTS',
    capabilitiesTitle: 'Review bills with ease. Post them to Tally in seconds.',
    capabilitiesDescription: 'Keep your hands off the number pad. Docsynecx extracts every field with high precision and prepares the complete Tally voucher for your approval.',
    checklist: [
      'Automatic line-item capture: description, HSN code, quantity, rate, discount, and tax',
      'Smart ledger auto-suggestion based on historical vendor and item purchase history',
      'Instant duplicate checks comparing vendor GSTIN, invoice number, date, and amount',
      'Side-by-side verification: original invoice PDF displayed right next to extracted data',
      'One-click direct voucher push to TallyPrime purchase register with attached PDF',
      'Batch processing mode to review and clear dozens of bills in a single sitting',
    ],
    features: [
      {
        tag: 'LINE-ITEM CAPTURE',
        title: 'Granular Line Items & HSN',
        description: 'Extract multi-page line item tables including descriptions, quantities, unit rates, discounts, and HSN codes without typing a character.',
      },
      {
        tag: 'LEDGER MAPPING',
        title: 'Smart Ledger Auto-Matching',
        description: 'Docsynecx learns your chart of accounts. Vendor ledgers, purchase ledgers, and tax ledgers are automatically suggested for your confirmation.',
      },
      {
        tag: 'SIDE-BY-SIDE REVIEW',
        title: 'Side-by-Side Verification Screen',
        description: 'Inspect the extracted fields directly alongside the source invoice preview. Clicking any field highlights the exact bounding box on the original PDF.',
      },
      {
        tag: 'DUPLICATE GUARD',
        title: 'Active Duplicate Detection',
        description: 'Never enter a bill twice. The system checks against all existing entries in your Tally company and alerts you immediately if a match exists.',
      },
      {
        tag: '1-CLICK POSTING',
        title: 'Direct TallyPrime Voucher Creation',
        description: 'Approve the review with a single keystroke. A native purchase voucher is instantly generated in TallyPrime with the source document attached.',
      },
      {
        tag: 'ROUND-OFF CHECKS',
        title: 'Automatic Tax & Round-Off Reconciliation',
        description: 'Mathematical validations automatically verify taxable value plus taxes against the invoice grand total, factoring in round-offs.',
      },
    ],
    processEyebrow: 'THE FAST TRACK TO TALLY',
    processTitle: 'Your new everyday accounts routine.',
    processDescription: 'Move from chaotic paper stacks to a clean, stress-free digital review desk.',
    processSteps: ['Upload PDF or Scan', 'Review Fields Side-by-Side', 'Confirm Suggested Ledgers', 'Push Voucher to TallyPrime'],
    proofLabel: 'EFFICIENCY BENCHMARK',
    proofTitle: 'Arishfirma Operations',
    proofMetricFrom: 'Hours',
    proofMetricTo: 'minutes',
    proofDescription: 'High-frequency purchase bill posting and asset documentation handled daily with zero manual retyping.',
    proofLink: '/customers/rajadurai/',
    proofLinkText: 'See customer workflow',
    faqsEyebrow: 'ACCOUNTS FAQS',
    faqsTitle: 'Questions accounts teams ask about daily usage',
    faqs: [
      {
        question: 'Does this create real vouchers inside TallyPrime?',
        answer: 'Yes! It creates authentic Purchase Vouchers (or Journal Vouchers) directly in your selected Tally company file, perfectly mapped to your ledger names.',
      },
      {
        question: 'What if an invoice has 50 different line items?',
        answer: 'Docsynecx handles multi-page, multi-line bills effortlessly. It extracts all 50 items with quantities, rates, and taxes in seconds, ready for review.',
      },
      {
        question: 'What happens if a field is extracted with low confidence?',
        answer: 'Docsynecx highlights low-confidence fields in yellow or orange, drawing your attention immediately so you can verify or edit with a single click.',
      },
      {
        question: 'Do we need technical skills to operate Docsynecx?',
        answer: 'Not at all. If you know how to review an invoice and use Tally, you can master Docsynecx in 15 minutes.',
      },
    ],
    ctaEyebrow: 'END THE RETYPING GRIND',
    ctaTitle: 'Ready to post your vendor invoices in seconds?',
    ctaDescription: 'Try a demo with your own real-world invoices and see how much time your accounts team saves on day one.',
    ctaButtonText: 'Book an Accounts Demo',
  },

  'ca-firms': {
    slug: 'ca-firms',
    navTitle: 'CA Firms',
    metaTitle: 'Docsynecx for CA Firms | High-Volume Client Accounting & GST Automation',
    metaDescription: 'Scale your CA firm with AI-powered document intake, multi-client bookkeeping, rapid GSTR-2B reconciliation, and automated Tally voucher posting.',
    eyebrow: 'DOCSYNECX / FOR CA FIRMS',
    headline: 'High-speed client bookkeeping.',
    accent: 'Flawless GST compliance.',
    description: 'Chartered Accountants and tax practitioners handle hundreds of messy client documents every month. Docsynecx automates client bill intake, tax extraction, and TallyPrime voucher creation across all your client companies.',
    primaryCta: 'Book a CA Practice Demo',
    secondaryCta: 'Explore capabilities',
    microline: 'Multi-client workspace · GSTR-2B validation · Fast turnaround for audit & filing',
    visualTitle: 'PRACTICE SUITE',
    visualLabel: 'CA FIRM CONSOLE',
    tiles: [
      ['Client Companies', 'Multi-tenant intake'],
      ['GST Reconciliation', '2B matching ready'],
    ],
    chip: 'Multi-Client · GSTR-2B Ready · Audit Trail',
    challengesEyebrow: 'CA PRACTICE HEADACHES',
    challengesTitle: 'The seasonal chaos and document friction CA firms battle.',
    challengesDescription: 'From missing client bills to tax season overtime, document processing drains valuable advisory hours from your firm.',
    challenges: [
      {
        number: '01',
        title: 'Clients dumping mixed document batches late',
        description: 'Clients send bagfuls of paper receipts, WhatsApp photo snaps, and chaotic PDF dumps right as GST filing deadlines loom.',
      },
      {
        number: '02',
        title: 'Junior staff trapped in endless data entry',
        description: 'Trainees and articles spend 80% of their time manually punching vouchers into Tally instead of auditing, reconciling, and advising.',
      },
      {
        number: '03',
        title: 'GSTR-2B mismatch headaches & blocked ITC',
        description: 'Reconciling client purchase records against the GST portal reveals unfiled supplier bills and miscalculated tax values too late.',
      },
      {
        number: '04',
        title: 'Audit trail fragmentation across multiple clients',
        description: 'When clients face scrutiny or queries from tax departments, locating the original source bill and ledger justification takes hours.',
      },
    ],
    capabilitiesEyebrow: 'PRACTICE EXPANSION SUITE',
    capabilitiesTitle: 'Double your client capacity without increasing your headcount.',
    capabilitiesDescription: 'Equip your firm with automated document intake, standard ledger mapping, and high-speed Tally voucher posting.',
    checklist: [
      'Multi-client management workspace to toggle between different client entities',
      'Client document upload portal: clients can drop PDFs or email them directly',
      'Automated GSTIN, HSN, and tax calculation validation against GST portal rules',
      'Smart bulk voucher creation across multiple Tally companies and ledger masters',
      'GSTR-2B purchase register matching to flag missing input tax credits (ITC)',
      'Immutable audit trails linking every posted voucher to the original client document',
    ],
    features: [
      {
        tag: 'MULTI-TENANT',
        title: 'Multi-Client Practice Workspace',
        description: 'Organise work by client company. Switch effortlessly between clients with isolated ledgers, rules, and voucher series.',
      },
      {
        tag: 'CLIENT PORTAL',
        title: 'Effortless Client Document Drop',
        description: 'Give clients dedicated email addresses or a simple upload link. Their bills land straight in your firm’s processing inbox.',
      },
      {
        tag: 'GST RECONCILIATION',
        title: 'Input Tax Credit (ITC) Protection',
        description: 'Automatically check supplier GSTINs, verify reverse charge applicability, and match invoices against purchase records to protect client ITC.',
      },
      {
        tag: 'SCALABLE STAFFING',
        title: 'Articles Spend Time on Review, Not Entry',
        description: 'Junior staff and article trainees shift from data punchers to data reviewers, processing 5x more vouchers in the same billable hours.',
      },
      {
        tag: 'BANK STATEMENT SYNC',
        title: 'Automated Client Bank Bookkeeping',
        description: 'Parse PDF bank statements from all major Indian banks and generate corresponding contra and payment entries in TallyPrime.',
      },
      {
        tag: 'AUDIT PROOF',
        title: 'Permanent Source Attachment for Audit',
        description: 'During tax audits or statutory reviews, pull up the original supplier invoice PDF linked directly to the Tally voucher in one click.',
      },
    ],
    processEyebrow: 'THE CA FIRM WORKFLOW',
    processTitle: 'From client document dump to reconciled books in minutes.',
    processDescription: 'Standardised, stress-free client accounting built for peak tax season volume.',
    processSteps: ['Client Drops Bills & Statements', 'AI Extracts Lines, HSN & GST', 'Article Reviews & Approves', 'Vouchers Sync to Client Tally'],
    proofLabel: 'PRACTICE IMPACT',
    proofTitle: 'Turnaround Time',
    proofMetricFrom: 'Days',
    proofMetricTo: 'hours',
    proofDescription: 'Dramatic reduction in client month-end bookkeeping cycle, freeing partner time for high-value advisory work.',
    proofLink: '/customers/rajadurai/',
    proofLinkText: 'Explore workflow impact',
    faqsEyebrow: 'CA PRACTICE FAQS',
    faqsTitle: 'Questions CA practitioners ask about Docsynecx',
    faqs: [
      {
        question: 'Can we manage multiple client Tally companies on one account?',
        answer: 'Yes. Docsynecx supports multiple client profiles, allowing you to configure separate Tally company files, ledger masters, and voucher types for each client.',
      },
      {
        question: 'How do our clients send documents to us?',
        answer: 'Clients can forward bills to a custom client-specific email address, upload files through a branded portal, or have their scanner save to a monitored folder.',
      },
      {
        question: 'Is client financial data secure and confidential?',
        answer: 'Yes. Docsynecx uses enterprise-grade encryption both in transit and at rest, maintaining strict data segregation between different client entities.',
      },
      {
        question: 'Does Docsynecx work during GST tax filing peaks?',
        answer: 'Docsynecx is designed for high-concurrency batch processing. It scales effortlessly during GST return deadlines and year-end audit peaks.',
      },
    ],
    ctaEyebrow: 'TRANSFORM YOUR CA PRACTICE',
    ctaTitle: 'Scale your firm’s client capacity and eliminate tax season crunch.',
    ctaDescription: 'See a live demonstration of multi-client document processing and Tally voucher automation built specifically for CA firms.',
    ctaButtonText: 'Book a CA Practice Demo',
  },
};
