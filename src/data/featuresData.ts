export interface PersonaData {
  id: 'forwarders' | 'finance' | 'brokers';
  title: string;
  badge: string;
  headline: string;
  subheadline: string;
  primaryCta: string;
  secondaryCta: string;
  metrics: { value: string; label: string }[];
  bulletPoints: string[];
}

export const personas: Record<string, PersonaData> = {
  forwarders: {
    id: 'forwarders',
    title: 'Freight Forwarders & 3PLs',
    badge: 'CargoWise & Freight Automation',
    headline: 'Stop building shipments by hand.',
    subheadline:
      'Docsynecx monitors your shared inbox, ingests pre-alerts, extracts every field across BLs and packing lists, and writes complete shipments straight into CargoWise before your team opens the email.',
    primaryCta: 'Automate CargoWise intake',
    secondaryCta: 'Explore shipment desk',
    metrics: [
      { value: '2 hrs → 2 min', label: 'Email pre-alert to CargoWise booking' },
      { value: '100%', label: 'Container & seal verification rate' },
      { value: '0 missed', label: 'Incoterm & port code exceptions' },
    ],
    bulletPoints: [
      'Native eAdaptor integration with universal CargoWise schemas',
      'Multi-document cross-checks between Commercial Invoice, BL, and Packing List',
      'Automated origin, destination, HS codes, weights, and dimensions parsing',
    ],
  },
  finance: {
    id: 'finance',
    title: 'Finance & Accounts Payable',
    badge: 'Tally & ERP Accounts Payable',
    headline: 'Every bill read, checked, and posted to Tally.',
    subheadline:
      'Eliminate manual data-entry desks. Docsynecx captures line items, cross-references GSTIN portals, suppresses duplicate invoices, and posts verified vouchers straight into Tally or your ERP.',
    primaryCta: 'Automate finance desk',
    secondaryCta: 'Calculate AP savings',
    metrics: [
      { value: 'Days → minutes', label: 'Bill ingestion to approved ledger entry' },
      { value: 'Zero', label: 'Duplicate payments or fraudulent invoices' },
      { value: '₹4.8L+', label: 'Average annual savings per AP operator' },
    ],
    bulletPoints: [
      'Two-way and three-way matching with POs and Goods Receipts',
      'Live GSTIN & e-Invoice IRN validation via official government APIs',
      'Direct XML and REST voucher posting into Tally Prime without re-keying',
    ],
  },
  brokers: {
    id: 'brokers',
    title: 'Customs Brokers & Importers',
    badge: 'Customs Entry & Tariff Compliance',
    headline: 'File faster. Flag less. Sleep better.',
    subheadline:
      'Turn hundreds of line items on commercial invoices into complete, compliant customs filings. Spot classification errors and duty discrepancies before submitting to authorities.',
    primaryCta: 'Review customs engine',
    secondaryCta: 'See tariff accuracy',
    metrics: [
      { value: '99.4%', label: 'HS code classification precision' },
      { value: '8x faster', label: 'Line-item customs declarations' },
      { value: '100%', label: 'Audit trail on all submitted declarations' },
    ],
    bulletPoints: [
      'Automated HSN / Tariff code recommendation with country-specific duty rules',
      'Discrepancy alerts on gross vs net weight and invoice totals',
      'Complete exportable digital audit trail ready for customs inspection',
    ],
  },
};

export interface InteractiveRule {
  id: string;
  condition: string;
  event: string;
  action: string;
  system: 'CargoWise' | 'Tally Prime' | 'Customs Desk';
  status: 'Auto-Executed' | 'Held for Review' | 'Flagged & Notified';
  statusColor: 'emerald' | 'amber' | 'blue';
  sampleDocument: string;
}

export const interactiveRules: InteractiveRule[] = [
  {
    id: 'rule-1',
    event: 'Email received with booking PDF attachments',
    condition: 'Container gross weight on BL matches Packing List within 0.5%',
    action: 'Create Master/House Shipment job via eAdaptor with full consignee details',
    system: 'CargoWise',
    status: 'Auto-Executed',
    statusColor: 'emerald',
    sampleDocument: 'MAEU9182371_PreAlert.pdf',
  },
  {
    id: 'rule-2',
    event: 'Vendor bill received from parts supplier',
    condition: 'Invoice Number & GSTIN match an existing voucher in current fiscal quarter',
    action: 'Halt payment queue, tag as Duplicate Hold, and ping finance manager on Slack',
    system: 'Tally Prime',
    status: 'Held for Review',
    statusColor: 'amber',
    sampleDocument: 'INV-0021_Prime_Hold.pdf',
  },
  {
    id: 'rule-3',
    event: 'Commercial Invoice line-item extraction',
    condition: 'HSN code has differing duty tariff for country of origin (Vietnam vs China)',
    action: 'Highlight classification delta & pre-fill preferential duty entry',
    system: 'Customs Desk',
    status: 'Flagged & Notified',
    statusColor: 'blue',
    sampleDocument: 'CI_68819_VN_Export.pdf',
  },
  {
    id: 'rule-4',
    event: 'Freight AP invoice received from shipping line',
    condition: 'Ocean freight charge matches booked spot rate quotation within ±$50',
    action: 'Approve AP voucher, allocate job cost in CargoWise, and post to ledger',
    system: 'CargoWise',
    status: 'Auto-Executed',
    statusColor: 'emerald',
    sampleDocument: 'Hapag_AP_Voucher_819.pdf',
  },
];

export interface IntegrationItem {
  id: string;
  name: string;
  badge: string;
  type: string;
  description: string;
  capabilities: string[];
}

export const integrationsData: IntegrationItem[] = [
  {
    id: 'cargowise',
    name: 'CargoWise One',
    badge: 'Native eAdaptor',
    type: 'Logistics ERP',
    description:
      'Bi-directional synchronization using universal XML schemas via native eAdaptor. Writes shipments, customs declarations, job billings, and freight AP without screen scraping.',
    capabilities: [
      'Forwarding Master & House Shipments',
      'Customs declarations & line items',
      'Job milestone triggers & events',
      'Freight AP voucher injection',
    ],
  },
  {
    id: 'tally',
    name: 'Tally Prime',
    badge: 'Direct XML / ODBC',
    type: 'Accounting & GST',
    description:
      'Seamless ledger integration. Automatically reads vendor invoices, matches item master & GST ledgers, and posts purchase vouchers straight into company books.',
    capabilities: [
      'Purchase vouchers with auto-tax allocation',
      'HSN/SAC & GST rate verification',
      'Vendor ledger mapping & party balance check',
      'Duplicate voucher prevention',
    ],
  },
  {
    id: 'zoho',
    name: 'Zoho Books',
    badge: 'Certified Partner API',
    type: 'Cloud Accounting',
    description:
      'Instant cloud synchronization. Automatically generates bills, links purchase orders, and verifies vendor 3-way matching in real time.',
    capabilities: [
      'Bill creation with line-item tax details',
      'Vendor credit and debit note reconciliation',
      'Automated approval workflows',
      'Payment tracking & audit trail',
    ],
  },
  {
    id: 'sap-netsuite',
    name: 'SAP & Oracle NetSuite',
    badge: 'Enterprise Connector',
    type: 'Enterprise ERP',
    description:
      'Enterprise-grade middleware connectors with SOC 2 compliance, supporting high-volume AP automation and multi-entity global consolidations.',
    capabilities: [
      'REST & SOAP API ingestion pipelines',
      'Multi-currency & multi-subsidiary posting',
      'Automated 3-way GRN matching',
      'Encrypted payload transmission',
    ],
  },
];

export const comparisonTable = [
  {
    dimension: 'Core Technology',
    docsynecx: 'Document-trained AI with domain schema reasoning',
    ocr: 'Flat text regex & positional OCR templates',
    rpa: 'Brittle UI click macros & screen scraping',
    manual: 'Manual typing and copy-pasting',
  },
  {
    dimension: 'Handling Layout Variations',
    docsynecx: 'Zero template maintenance; adapts to new vendor formats',
    ocr: 'Breaks whenever invoice layout changes',
    rpa: 'Breaks on software UI updates',
    manual: 'Slow and prone to human exhaustion',
  },
  {
    dimension: 'Direct System Writeback',
    docsynecx: 'Native CargoWise eAdaptor & Tally XML server',
    ocr: 'Requires manual export/import of CSV',
    rpa: 'Simulates keyboard clicks (frequent crashes)',
    manual: 'Manual double entry across screens',
  },
  {
    dimension: 'Cross-Document Reconciliation',
    docsynecx: 'Cross-checks BL vs Packing List vs Invoice automatically',
    ocr: 'Single-page extraction only',
    rpa: 'Cannot reason across mismatched fields',
    manual: '15-30 minutes of manual side-by-side checking',
  },
  {
    dimension: 'Duplicate & Fraud Protection',
    docsynecx: 'Real-time database and GST portal verification',
    ocr: 'None',
    rpa: 'Basic exact-string match only',
    manual: 'Frequent duplicate payments slip through',
  },
  {
    dimension: 'Setup & Deployment Time',
    docsynecx: 'Live in 48-72 hours with zero rip-and-replace',
    ocr: 'Weeks of template building',
    rpa: '3-6 months of custom consulting',
    manual: 'Ongoing hiring & training overhead',
  },
];

export const securityHighlights = [
  {
    title: 'Zero AI Model Training',
    description:
      'Your financial records, trade contracts, and vendor data are never retained or used to train public or foundational models.',
  },
  {
    title: 'Bank-Grade Encryption',
    description:
      'All data encrypted with AES-256 at rest and TLS 1.3 in transit. Sensitive credentials stored in HSM-secured vaults.',
  },
  {
    title: 'Enterprise SSO & IAM',
    description:
      'Single sign-on via Microsoft Entra ID (Azure AD), Google Workspace, and Okta with granular role-based access control.',
  },
  {
    title: 'SOC 2 Type II Aligned',
    description:
      'Strict change-control procedures, automated vulnerability scanning, isolated tenant architecture, and comprehensive audit logs.',
  },
];

export const faqList = [
  {
    question: 'How does Docsynecx connect with CargoWise without disrupting our operations?',
    answer:
      'Docsynecx connects via CargoWise’s official eAdaptor interface using universal XML schemas. It requires zero changes to your existing CargoWise installation, no custom plugins, and zero downtime. Shipments and AP vouchers write directly to your database.',
  },
  {
    question: 'Can Docsynecx handle poorly scanned invoices and varied vendor formats?',
    answer:
      'Yes. Unlike legacy template-based OCR that breaks when a column shifts by 2 millimeters, Docsynecx uses domain-specialized vision models that understand the semantics of logistics and financial documents regardless of layout, scan resolution, or language.',
  },
  {
    question: 'How are duplicate invoices and GST mismatches caught before posting to Tally?',
    answer:
      'Every invoice ingested undergoes a real-time validation pipeline: checking supplier GSTIN status, invoice number uniqueness in your books, line-item tax calculations, and 2-way/3-way PO matching. Suspect bills are automatically flagged in a dedicated review queue.',
  },
  {
    question: 'What is the implementation timeline for a forwarder or accounting team?',
    answer:
      'Most teams go live within 48 to 72 hours. Because Docsynecx works through native APIs and shared inboxes, you do not need to replace your ERP, hire integration consultants, or train your operators on a complex new system.',
  },
  {
    question: 'Is our trade data private and compliant?',
    answer:
      'Completely. We adhere to enterprise security standards including AES-256 encryption, TLS 1.3, multi-tenant isolation, and a strict guarantee that customer data is never used to train machine learning models.',
  },
];
