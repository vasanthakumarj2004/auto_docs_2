export const financeRoot = '/finance-desk/';
export const demoHref = '/demo/#demo-form';
export const interestHref = '/finance-desk/accounts-payable/#register-interest';

export const financeCapabilities = [
  { slug: 'invoice-automation', title: 'Invoice Automation', label: 'Document automation', description: 'Turn supplier invoices into structured, reviewable data for your accounting workflow.', bullets: ['AI-powered invoice data extraction', 'GST, HSN and line-item capture', 'Human-in-the-loop validation', 'Duplicate detection and batch processing', 'TallyPrime integration'], link: 'Explore invoice automation' },
  { slug: 'banking-reconciliation', title: 'Banking & Reconciliation', label: 'Banking', description: 'Process bank statements, support bookkeeping and review reconciliation inside TallyPrime.', bullets: ['Bank statement intake', 'Transaction extraction and categorisation', 'Entries posted to TallyPrime', 'Matched and unmatched review', 'Reviewer controls'], link: 'Explore banking & reconciliation' },
  { slug: 'payment-reminders', title: 'Payment Reminders', label: 'Receivables', description: 'Keep outstanding invoices visible and follow up with customers before and after due dates.', bullets: ['Track invoice due dates', 'Identify pending and overdue payments', 'Send or schedule reminders', 'Follow-up visibility', 'More consistent collections'], link: 'Explore payment reminders' },
  { slug: 'accounts-payable', title: 'Accounts Payable', label: 'Payables', description: 'Planned workflows for supplier invoices, payment review and payables visibility.', bullets: ['Supplier invoice and payable information', 'Payment due-date management', 'Review and approval workflows', 'Payables reporting', 'Finance-system integration, subject to scope'], link: 'Register interest' },
  { slug: 'docsynecx-intelligence', title: 'Docsynecx Intelligence', label: 'Business performance', description: 'Six connected views of financial and business performance in one place.', bullets: ['Financial Intelligence', 'Business Intelligence', 'Working Capital Intelligence', 'Operations Intelligence', 'Management and AI Intelligence'], link: 'Explore Docsynecx Intelligence' },
] as const;

export type FinanceSlug = typeof financeCapabilities[number]['slug'];
export type Feature = readonly [tag: string, title: string, description: string];

export const invoiceFeatures: Feature[] = [
  ['INVOICE INTAKE', 'Invoice intake', 'Bring in supplier invoices, including supported PDF and image formats.'],
  ['KEY FIELDS', 'Header and total capture', 'Capture supplier, invoice number, date, totals and other key invoice fields.'],
  ['TAX DETAILS', 'GST and HSN extraction', 'Identify GST and HSN information from supported invoice layouts for validation.'],
  ['ITEM-LEVEL CAPTURE', 'Line-item and tax details', 'Extract item descriptions, quantities, rates, taxable values and tax breakdowns where present in the document.'],
  ['DOCUMENT TYPES', 'Credit and debit notes', 'Process supported credit note and debit note documents as part of the supplier document workflow.'],
  ['HUMAN REVIEW', 'Human-in-the-loop validation', 'Allow users to review extracted fields, correct exceptions and approve information before it is posted.'],
  ['QUALITY CONTROL', 'Confidence review and exception handling', 'Use extraction confidence indicators to help teams prioritise fields that need closer checking.'],
  ['DUPLICATE CHECKS', 'Duplicate detection', 'Identify potential duplicate invoices to help prevent repeated accounting entry.'],
  ['BATCH WORKFLOW', 'Batch invoice processing', 'Process multiple supplier invoices through a structured workflow rather than entering them individually.'],
  ['ACCOUNTING INTEGRATION', 'TallyPrime integration', 'Send approved supplier invoice information to the configured TallyPrime company, reducing manual re-entry.'],
];

export const bankingFeatures: Feature[] = [
  ['STATEMENT PROCESSING', 'Bank statement intake', 'Bring bank statement files into the Docsynecx workflow for processing.'],
  ['DATA CAPTURE', 'Transaction extraction', 'Capture transaction dates, descriptions, debit and credit amounts, and balances from supported statement formats.'],
  ['BOOKKEEPING', 'Transaction categorisation', 'Organise statement transactions into relevant bookkeeping categories for review and posting.'],
  ['TALLYPRIME POSTING', 'Bookkeeping entries in TallyPrime', 'Create the corresponding bank and bookkeeping entries in TallyPrime through the configured workflow.'],
  ['RECONCILIATION', 'Bank reconciliation', 'Reconcile statement transactions with accounting entries and review matched and unmatched items.'],
  ['EXCEPTION REVIEW', 'Unmatched transaction review', 'Identify transactions that require attention and support investigation before finalising the reconciliation.'],
  ['HUMAN REVIEW', 'Validation and controls', 'Keep the accounting team involved in reviewing extracted information, categorisation and reconciliation exceptions.'],
  ['BUSINESS VALUE', 'Benefits for finance teams', 'Reduce repetitive bank entry work, improve bookkeeping consistency and make reconciliation review more structured.'],
];

export const payableFeatures: Feature[] = [
  ['PLANNED', 'Supplier invoice management', 'Organise supplier invoice and payable information in one place.'],
  ['PLANNED', 'Payment due-date management', 'Help teams review upcoming supplier due dates and prioritise payment obligations.'],
  ['PLANNED', 'Approval workflows', 'Configurable review and approval steps for supplier invoices and payable actions, subject to product design.'],
  ['PLANNED', 'Payables reporting', 'Reports for supplier balances, due amounts, ageing and payable trends.'],
  ['UNDER DEVELOPMENT', 'Roadmap preview', 'Accounts Payable is under development. Scope, release timing and supported integrations will be confirmed as the product roadmap is finalised.'],
];

export const intelligenceCapabilities = [
  { id: 'financial', label: 'Financial performance', title: 'Financial Intelligence', description: 'Understand the financial health of your business through a clear view of performance, profitability and cash position.', chips: ['Profit & Loss (P&L)', 'Balance Sheet', 'Profitability', 'Revenue', 'Expenses', 'Cash & Bank'], detail: 'Review revenue and expenses alongside profitability, balance-sheet information and cash positions. Available reports depend on the connected TallyPrime data and agreed reporting scope.' },
  { id: 'business', label: 'Business performance', title: 'Business Intelligence', description: 'Review the key commercial drivers of your business across sales, purchases, customers, suppliers and products.', chips: ['Sales', 'Purchases', 'Customers', 'Suppliers', 'Products', 'Inventory'], detail: 'Explore how sales, purchasing and product activity relate to customer and supplier performance. The depth of each view depends on the records available from your connected systems.' },
  { id: 'working-capital', label: 'Cash flow & liquidity', title: 'Working Capital Intelligence', description: 'Understand how receivables, payables and overdue obligations influence liquidity and the cash cycle.', chips: ['Receivables', 'Payables', 'Overdue Bills', 'Liquidity', 'Cash Cycle'], detail: 'Bring outstanding receivables and payables into the same review, including overdue obligations. Discuss ageing periods and cash-cycle reporting requirements during discovery.' },
  { id: 'operations', label: 'Inventory & supplier operations', title: 'Operations Intelligence', description: 'Identify operational patterns across stock movement, ageing, purchasing and supplier performance.', chips: ['Inventory Movement', 'Stock Ageing', 'Purchase Patterns', 'Supplier Performance'], detail: 'Review inventory movements and ageing alongside purchase patterns and supplier information. Available measures depend on the quality and detail of connected inventory and purchase records.' },
  { id: 'ai', label: 'AI-assisted understanding', title: 'AI Intelligence', description: 'Ask questions about business performance, investigate underlying causes and receive actionable insights to support decisions.', chips: ['Conversational AI', 'Root Cause Analysis', 'Business Insights', 'Recommendations'], detail: 'Use questions to explore connected business information and investigate movements. Review AI-assisted explanations against source data and apply your accounting controls and management judgement.' },
  { id: 'management', label: 'Management reporting', title: 'Management Intelligence', description: 'Bring key measures together with structured MIS, performance tracking and timely reporting for management reviews.', chips: ['Automated MIS', 'KPIs', 'Comparisons', 'Scheduled Reports', 'Alerts'], detail: 'Discuss the KPIs, comparison periods, reporting schedules and alerts your management team needs. Reporting is configured around available data and agreed workflows.' },
] as const;

export const financeFaqs = [
  { question: 'Does Finance Desk support TallyPrime?', answer: 'Yes. Approved supplier invoice information can move into the configured TallyPrime company. Banking and reconciliation workflows can also support TallyPrime bookkeeping. The exact integration and posting scope is confirmed during discovery.' },
  { question: 'Can Finance Desk replace manual finance information work?', answer: 'Finance Desk helps reduce repetitive document entry and organise financial information. Human review, accounting controls and management judgement remain part of the workflow.' },
  { question: 'Is Finance Desk only an invoice automation product?', answer: 'Invoice Automation is one of five connected capabilities, alongside Banking & Reconciliation, Payment Reminders, the upcoming Accounts Payable capability and Docsynecx Intelligence. Intelligence brings six views of financial and business performance into one place.' },
  { question: 'Can we start with only one capability?', answer: 'Yes. Start with a focused use case, validate it with your documents and systems, and expand based on agreed scope. Accounts Payable is under development and is not yet available for deployment.' },
  { question: 'Will people still review and approve documents?', answer: 'Yes. Your team reviews extracted information, corrects exceptions and approves information before it moves into the configured accounting workflow.' },
];

export const financePageCopy = {
  overview: {
    eyebrow: 'DOCSYNECX / FINANCE DESK', headline: 'Automate finance.', accent: 'Unlock intelligence.',
    description: 'Go beyond invoice automation. Bring intelligent document processing, financial intelligence, business intelligence and AI-powered insights into one connected finance workspace.',
    primary: 'Book a Finance Desk Demo', microline: 'Invoice workflows · Financial visibility · Business insights',
    visualTitle: 'FINANCE DESK', visualLabel: 'ILLUSTRATIVE PRODUCT VIEW', tiles: [['Document workflow', 'Invoice review'], ['Business view', 'Financial insights']], chip: 'Extract · Validate · Understand',
    ctaEyebrow: 'DOCSYNECX FINANCE DESK', ctaTitle: 'Bring your finance workflows into one connected workspace.', ctaCopy: "Tell us about your documents, accounting system and reporting needs, and we’ll help identify a practical starting point.",
  },
  'invoice-automation': {
    eyebrow: 'FINANCE DESK / INVOICE AUTOMATION', headline: 'Turn supplier invoices', accent: 'into structured data.',
    description: 'Automate invoice data capture, validation and accounting workflows with AI-powered document processing. Keep your team in control with human review before information moves into your accounting system.',
    primary: 'Book a Demo', microline: 'Finance Desk · Structured data · Review-led workflow',
    visualTitle: 'PRODUCT EXPERIENCE', visualLabel: 'FINANCE DESK', tiles: [['Automation', 'Invoice Automation'], ['Workspace', 'Finance Desk']], chip: 'AI-powered · Human-guided · Connected',
    ctaEyebrow: 'DOCSYNECX FINANCE DESK', ctaTitle: 'Make invoice processing more consistent, reviewable and efficient.', ctaCopy: "Let’s understand your current process and identify a practical starting point for your team.",
  },
  'banking-reconciliation': {
    eyebrow: 'FINANCE DESK / BANKING & RECONCILIATION', headline: 'Bank statements, organised.', accent: 'Reconciliation made clearer.',
    description: 'Process bank statement data, support bookkeeping and review reconciliation in TallyPrime, with your accounting team in control.',
    primary: 'Talk to Docsynecx', microline: 'Finance Desk · Bookkeeping · Reconciliation review',
    visualTitle: 'BANK STATEMENT WORKSPACE', visualLabel: 'FINANCE DESK', tiles: [['Statement data', 'Structured transactions'], ['Review', 'Match & verify']], chip: 'Statement · Match · Review',
    ctaEyebrow: 'LET’S TALK', ctaTitle: 'Explore bank statement and reconciliation workflows.', ctaCopy: "Tell us about your bank formats, accounting system and reconciliation process. We’ll discuss a suitable scope and implementation approach.",
  },
  'payment-reminders': {
    eyebrow: 'FINANCE DESK / PAYMENT REMINDERS', headline: 'Stay on top of collections with', accent: 'Payment Reminders.',
    description: 'Keep outstanding invoices visible and help your team follow up with customers before and after payment due dates.',
    primary: 'Talk to Docsynecx', microline: 'Finance Desk · Receivables visibility · Follow-up workflow',
    visualTitle: 'PAYMENT FOLLOW-UP', visualLabel: 'FINANCE DESK', tiles: [['Payment due', 'Track due dates'], ['Follow-up', 'Stay consistent']], chip: 'Due dates · Reminders · Follow-ups',
    ctaEyebrow: 'LET’S TALK', ctaTitle: 'Bring more structure to payment follow-ups.', ctaCopy: 'Discuss your current receivables process, customer communication needs and payment reminder workflow with our team.',
  },
  'accounts-payable': {
    eyebrow: 'FINANCE DESK / ACCOUNTS PAYABLE', headline: 'Accounts Payable,', accent: 'with intelligent workflows.',
    description: 'Accounts Payable is being designed to bring greater structure and visibility to supplier invoice processing and payable workflows.',
    primary: 'Register Your Interest', microline: 'Under development · Not yet available for deployment',
    visualTitle: 'ACCOUNTS PAYABLE', visualLabel: 'IN DEVELOPMENT', tiles: [['Supplier workflows', 'In development'], ['Payable visibility', 'Planned capability']], chip: 'Building the next finance workflow',
    ctaEyebrow: 'SHAPE THE ROADMAP', ctaTitle: 'Interested in Accounts Payable?', ctaCopy: 'Tell us about your supplier invoice volumes, approval process and accounting system. We welcome conversations with businesses interested in this upcoming capability.',
  },
  'docsynecx-intelligence': {
    eyebrow: 'DOCSYNECX / FINANCE DESK / INTELLIGENCE', headline: 'Understand business performance.', accent: 'See the bigger picture.',
    description: 'Docsynecx Intelligence brings financial and business information into clearer view, helping teams review performance, understand key movements and ask better questions.',
    primary: 'Explore Intelligence', microline: 'Decision support, not a replacement for accounting controls or management judgement.',
    visualTitle: 'DOCSYNECX INTELLIGENCE', visualLabel: 'BUSINESS PERFORMANCE', tiles: [['Financial', 'Overview'], ['Business', 'Performance']], chip: 'Insights · Comparisons · AI-assisted',
    ctaEyebrow: 'MAKE YOUR DATA MORE USEFUL', ctaTitle: 'Bring business performance into focus.', ctaCopy: 'Discuss your reporting needs, source data and the questions your team wants to answer.',
  },
} as const;
