export interface LineItem {
  id: string;
  description: string;
  qty: string;
  rate: string;
  amount: string;
}

export interface InvoiceData {
  vendor: string;
  gstin: string;
  invoiceNo: string;
  date: string;
  dueDate: string;
  lineItems: LineItem[];
  taxableValue: string;
  taxRate: string;
  taxAmount: string;
  totalAmount: string;
  fileSize: string;
  fileName: string;
}

export interface VoucherData {
  voucherNo: string;
  ledger: string;
  status: string;
  auditId: string;
  syncedAt: string;
  company: string;
  accountant: string;
}

export interface BillQueueItem {
  id: string;
  billNo: string;
  vendor: string;
  gstin: string;
  date: string;
  amount: string;
  amountRaw: number;
  gstStatus: 'Verified' | 'Pending';
  status: 'Posted to Tally' | 'Needs review' | 'Duplicate hold';
  ownerInitials: string;
  ownerName: string;
  category: string;
  isDuplicate?: boolean;
  duplicateOf?: string;
  explanation?: string;
  auditTrail: {
    step: string;
    time: string;
    actor: string;
    status: 'completed' | 'current' | 'pending';
  }[];
}

export const pipelineInvoice: InvoiceData = {
  vendor: 'Apex Freight Logistics',
  gstin: '33AABCP1234A1Z5',
  invoiceNo: 'INV-8492',
  date: '14-10-2024',
  dueDate: '28-10-2024',
  lineItems: [
    { id: '1', description: 'Ocean Freight (40\' HC)', qty: '1 cntr', rate: '₹84,500', amount: '₹84,500' },
    { id: '2', description: 'Terminal Handling (THC)', qty: '1 job', rate: '₹22,150', amount: '₹22,150' },
    { id: '3', description: 'Bunker Adjustment (BAF)', qty: '1 job', rate: '₹14,367', amount: '₹14,367' },
  ],
  taxableValue: '₹1,21,017',
  taxRate: '18% IGST',
  taxAmount: '₹21,783',
  totalAmount: '₹1,42,800',
  fileSize: '142 KB',
  fileName: 'INV-8492.pdf',
};

export const pipelineVoucher: VoucherData = {
  voucherNo: '#PUR-8492',
  ledger: 'Freight Inward (Ocean)',
  status: 'Approved',
  auditId: '#89283',
  syncedAt: '14-Oct-2024 10:42:11',
  company: 'Prime Components Ltd',
  accountant: 'Finance Desk Auto-Sync',
};

export const initialQueueBills: BillQueueItem[] = [
  {
    id: '1',
    billNo: 'INV-2018',
    vendor: 'Alpha Components',
    gstin: '33AABCA1122B1Z1',
    date: '12-10-2024',
    amount: '₹1,84,200',
    amountRaw: 184200,
    gstStatus: 'Verified',
    status: 'Posted to Tally',
    ownerInitials: 'AC',
    ownerName: 'Arun C.',
    category: 'Electrical Parts',
    auditTrail: [
      { step: 'Received via shared inbox', time: '09:12:04', actor: 'System Gateway', status: 'completed' },
      { step: 'PDF extraction & math validation', time: '09:12:06', actor: 'Docsynecx OCR', status: 'completed' },
      { step: 'GSTIN verified on GST Portal 2B', time: '09:12:07', actor: 'GST API', status: 'completed' },
      { step: '3-way PO match confirmed', time: '09:12:08', actor: 'Finance Desk', status: 'completed' },
      { step: 'Posted to Tally (Voucher #PUR-2018)', time: '09:12:09', actor: 'Tally XML Sync', status: 'completed' },
    ],
  },
  {
    id: '2',
    billNo: 'BILL-3081',
    vendor: 'Shivraj Traders',
    gstin: '27AAACS4455C1Z8',
    date: '13-10-2024',
    amount: '₹92,450',
    amountRaw: 92450,
    gstStatus: 'Verified',
    status: 'Posted to Tally',
    ownerInitials: 'ST',
    ownerName: 'Sanjay T.',
    category: 'Fasteners & Tools',
    auditTrail: [
      { step: 'Received via shared inbox', time: '11:45:10', actor: 'System Gateway', status: 'completed' },
      { step: 'PDF extraction & math validation', time: '11:45:12', actor: 'Docsynecx OCR', status: 'completed' },
      { step: 'GSTIN verified on GST Portal 2B', time: '11:45:13', actor: 'GST API', status: 'completed' },
      { step: 'Approved by Finance Head', time: '11:45:14', actor: 'Sanjay T.', status: 'completed' },
      { step: 'Posted to Tally (Voucher #PUR-3081)', time: '11:45:15', actor: 'Tally XML Sync', status: 'completed' },
    ],
  },
  {
    id: '3',
    billNo: 'INV-0021',
    vendor: 'Prime Components',
    gstin: '33AABCP1234A1Z5',
    date: '14-10-2024',
    amount: '₹74,095',
    amountRaw: 74095,
    gstStatus: 'Verified',
    status: 'Duplicate hold',
    ownerInitials: 'PC',
    ownerName: 'Priya C.',
    category: 'Machined Parts',
    isDuplicate: true,
    duplicateOf: 'INV-0021 (Posted 04-Oct)',
    explanation: 'Matches INV-0021. Held, not paid twice.',
    auditTrail: [
      { step: 'Received via supplier portal', time: '14:20:01', actor: 'System Gateway', status: 'completed' },
      { step: 'PDF extraction & math validation', time: '14:20:03', actor: 'Docsynecx OCR', status: 'completed' },
      { step: 'Duplicate detected in Tally ledger', time: '14:20:04', actor: 'Audit Engine', status: 'current' },
      { step: 'Held before payout queue', time: '14:20:04', actor: 'Guardrail Policy', status: 'current' },
      { step: 'Posting halted awaiting review', time: '14:20:05', actor: 'Priya C.', status: 'pending' },
    ],
  },
  {
    id: '4',
    billNo: 'BILL-2082',
    vendor: 'Jaxon Industrial',
    gstin: '29AAACJ9988D1Z2',
    date: '14-10-2024',
    amount: '₹3,15,000',
    amountRaw: 315000,
    gstStatus: 'Verified',
    status: 'Posted to Tally',
    ownerInitials: 'JI',
    ownerName: 'Joseph I.',
    category: 'Raw Sheet Metal',
    auditTrail: [
      { step: 'Received via shared inbox', time: '16:05:22', actor: 'System Gateway', status: 'completed' },
      { step: 'PDF extraction & math validation', time: '16:05:24', actor: 'Docsynecx OCR', status: 'completed' },
      { step: 'GSTIN verified on GST Portal 2B', time: '16:05:25', actor: 'GST API', status: 'completed' },
      { step: 'Approved by Joseph I.', time: '16:05:26', actor: 'Joseph I.', status: 'completed' },
      { step: 'Posted to Tally (Voucher #PUR-2082)', time: '16:05:27', actor: 'Tally XML Sync', status: 'completed' },
    ],
  },
  {
    id: '5',
    billNo: 'INV-4091',
    vendor: 'TransLogix India',
    gstin: '36AABCT6677E1Z3',
    date: '15-10-2024',
    amount: '₹1,42,800',
    amountRaw: 142800,
    gstStatus: 'Verified',
    status: 'Needs review',
    ownerInitials: 'TL',
    ownerName: 'Tanvi L.',
    category: 'Freight & Haulage',
    explanation: 'Rate variance: +₹4,200 against agreed rate card. Requires approval.',
    auditTrail: [
      { step: 'Received via freight email', time: '10:02:15', actor: 'System Gateway', status: 'completed' },
      { step: 'PDF extraction & math validation', time: '10:02:17', actor: 'Docsynecx OCR', status: 'completed' },
      { step: 'GSTIN verified on GST Portal 2B', time: '10:02:18', actor: 'GST API', status: 'completed' },
      { step: 'Flagged: Rate card variance check', time: '10:02:19', actor: 'Rule Engine', status: 'current' },
      { step: 'Assigned to Tanvi L. for approval', time: '10:02:20', actor: 'Tanvi L.', status: 'pending' },
    ],
  },
  {
    id: '6',
    billNo: 'BILL-1185',
    vendor: 'Premier Freight',
    gstin: '07AAACP3322F1Z4',
    date: '15-10-2024',
    amount: '₹2,68,500',
    amountRaw: 268500,
    gstStatus: 'Verified',
    status: 'Posted to Tally',
    ownerInitials: 'PF',
    ownerName: 'Pradeep F.',
    category: 'Air Cargo Express',
    auditTrail: [
      { step: 'Received via shared inbox', time: '12:30:11', actor: 'System Gateway', status: 'completed' },
      { step: 'PDF extraction & math validation', time: '12:30:13', actor: 'Docsynecx OCR', status: 'completed' },
      { step: 'GSTIN verified on GST Portal 2B', time: '12:30:14', actor: 'GST API', status: 'completed' },
      { step: 'Approved by Pradeep F.', time: '12:30:15', actor: 'Pradeep F.', status: 'completed' },
      { step: 'Posted to Tally (Voucher #PUR-1185)', time: '12:30:16', actor: 'Tally XML Sync', status: 'completed' },
    ],
  },
];

export const walkthroughChapters = [
  { id: 0, label: '00:00 Intake', timeSec: 0, title: 'Multi-Channel Bill Intake', desc: 'Ingests bills automatically from shared inboxes, supplier portals, and scan folders without manual uploads.' },
  { id: 1, label: '00:30 Extract', timeSec: 30, title: 'AI Extraction & Math Check', desc: 'Reads every line item, tax breakdown, and HSN/SAC code with 99.8% field confidence and zero template setup.' },
  { id: 2, label: '01:00 Check', timeSec: 60, title: 'GST & Duplicate Guardrails', desc: 'Validates vendor GSTIN directly against government 2B portal and halts duplicates before payment approval.' },
  { id: 3, label: '01:30 Post', timeSec: 90, title: 'Zero-Touch Tally Posting', desc: 'Creates complete purchase vouchers directly in Tally Prime with audit trails while keeping your books unchanged.' },
];
