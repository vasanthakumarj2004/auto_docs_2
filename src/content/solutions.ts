export interface SolutionSubtopic {
  id: string;
  sno: string;
  industry: string;
  shortTitle: string;
  shortSubtitle: string;
  lead: string;
  image: string;
  metricValue: string;
  metricLabel: string;
  challenge: string;
  workflows: {
    title: string;
    description: string;
    tag: string;
  }[];
  documents: string[];
  systems: string[];
  sampleUseCase: {
    quote: string;
    author: string;
    company: string;
  };
}

export const SOLUTIONS_DATA: SolutionSubtopic[] = [
  {
    id: 'automotive',
    sno: '01',
    industry: 'Automotive Industry',
    shortTitle: 'Automotive & EV',
    shortSubtitle: 'Parts & Warranty Claims',
    lead: 'Automate multi-line spare parts bills, delivery challans, and warranty claims directly into Tally or SAP.',
    image: '/images/industry-automotive.jpg',
    metricValue: 'Days → Hours',
    metricLabel: 'Ledger close cycle',
    challenge: 'High-density supplier bills with hundreds of serial numbers cause manual typing bottlenecks and inventory variances.',
    workflows: [
      {
        title: '3-Way PO & Challan Match',
        description: 'Matches incoming vendor invoices against POs and Delivery Challans, flagging price discrepancies before voucher generation.',
        tag: '3-Way Match',
      },
      {
        title: 'Spare Parts & Serial Extraction',
        description: 'Multi-page PDFs with part numbers, serials, and batch codes parsed with 99.4% accuracy, eliminating typing entirely.',
        tag: 'Line-Item AI',
      },
    ],
    documents: ['Vendor Tax Invoices', 'Delivery Challans (DC)', 'Parts Manifests', 'GRN Vouchers', 'OEM Credit Notes'],
    systems: ['TallyPrime', 'SAP S/4HANA', 'Zoho Books', 'Oracle ERP'],
    sampleUseCase: {
      quote: 'Manual document workload reduced from days to hours through an AI-assisted workflow with 100% audit confidence.',
      author: 'Rajadurai E-Vehicles',
      company: 'Automotive & EV Manufacturer',
    },
  },
  {
    id: 'manufacturing',
    sno: '02',
    industry: 'Manufacturing',
    shortTitle: 'Industrial Manufacturing',
    shortSubtitle: 'Gate Passes & Asset Bills',
    lead: 'Digitize weighbridge slips, store goods receipts, and contractor bills with automated tolerance checks.',
    image: '/images/industry-manufacturing.jpg',
    metricValue: 'In daily use',
    metricLabel: 'Asset bill intake',
    challenge: 'Factory gate weight slips rarely match vendor invoices, stalling communication between stores, accounts, and suppliers.',
    workflows: [
      {
        title: 'Gate Pass & Weight Ingestion',
        description: 'Digitizes weighbridge tickets and gate passes, linking them directly to purchase orders in real time.',
        tag: 'Gate Inward',
      },
      {
        title: 'Material Tolerance Checks',
        description: 'Validates billed weight against physical receipt with tolerance checks, alerting only when limits are exceeded.',
        tag: 'Tolerance Gate',
      },
    ],
    documents: ['Raw Material Invoices', 'Weighbridge Slips', 'Gate Inward Passes', 'Store Goods Receipts', 'Capex Asset Bills'],
    systems: ['TallyPrime', 'SAP', 'Microsoft Dynamics 365', 'Infor ERP'],
    sampleUseCase: {
      quote: 'Regular operational use for asset and purchase bill workflows with zero manual re-entry and complete plant visibility.',
      author: 'Arishfirma',
      company: 'Industrial Manufacturing',
    },
  },
  {
    id: 'textile',
    sno: '03',
    industry: 'Textile & Garments',
    shortTitle: 'Textile & Garments',
    shortSubtitle: 'Job-Work & Exports',
    lead: 'Track yardage across external processing stages, reconcile contractor bills, and speed up export manifests.',
    image: '/images/industry-textile.jpg',
    metricValue: '3x faster',
    metricLabel: 'Supplier reconciliation',
    challenge: 'Tracking yardage through dyeing and stitching stages with shrinkage rates makes ledger reconciliation error-prone.',
    workflows: [
      {
        title: 'Job-Work Challan Tracking',
        description: 'Tracks fabric sent for processing, comparing dispatched yardage with returned rolls while applying shrinkage formulas.',
        tag: 'Job-Work Sync',
      },
      {
        title: 'Export Shipping Alignment',
        description: 'Harmonizes commercial invoices, packing lists, and shipping bills to eliminate customs discrepancies before filing.',
        tag: 'Export Compliance',
      },
    ],
    documents: ['Fabric Purchase Bills', 'Job-Work Challans', 'Commercial Invoices', 'Packing Lists', 'Shipping Bills'],
    systems: ['TallyPrime', 'Custom Apparel ERP', 'SAP', 'CargoWise'],
    sampleUseCase: {
      quote: 'Export manifests and multi-currency supplier bills reconciled in minutes instead of days, keeping shipments on schedule.',
      author: 'Global Fabrics Ltd',
      company: 'Textile & Garment Exports',
    },
  },
  {
    id: 'retail',
    sno: '04',
    industry: 'Retail & Distribution',
    shortTitle: 'Retail & Distribution',
    shortSubtitle: 'Store Bills & Rebates',
    lead: 'Ingest hundreds of distributor invoices daily, verify promotional scheme discounts, and batch-post store receipts.',
    image: '/images/industry-retail.jpg',
    metricValue: '94% auto',
    metricLabel: 'Posted store vouchers',
    challenge: 'Reconciling daily deliveries across multiple stores with complex promotional schemes and damaged returns causes leakage.',
    workflows: [
      {
        title: 'Multi-Store Invoice Intake',
        description: 'Ingests distributor invoices daily via email drops, automatically sorting and tagging bills by store location.',
        tag: 'Store Intake',
      },
      {
        title: 'Trade Scheme & Rebate Audit',
        description: 'Audits volume rebates, promotional discounts, and prompt payment allowances against verified contracts.',
        tag: 'Rebate Audit',
      },
    ],
    documents: ['Distributor Invoices', 'Store Delivery Receipts', 'Promotional Credit Notes', 'RTV Return Memos', 'Proof of Delivery'],
    systems: ['TallyPrime', 'Retail POS ERP', 'SAP Business One', 'Zoho Books'],
    sampleUseCase: {
      quote: 'With hundreds of vendors billing us daily across locations, Docsynecx matches invoices against POs and posts with 94% automation.',
      author: 'OmniRetail Networks',
      company: 'Retail & Distribution',
    },
  },
  {
    id: 'logistics',
    sno: '05',
    industry: 'Logistics & Freight Forwarders',
    shortTitle: 'Freight & Logistics',
    shortSubtitle: 'Arrival Notices to CargoWise',
    lead: 'Turn carrier arrival notices, freight invoices, and customs manifests into verified CargoWise jobs in seconds.',
    image: '/images/industry-logistics.jpg',
    metricValue: '2 hrs → 2 min',
    metricLabel: 'Per shipment intake',
    challenge: 'Carrier documents arrive in non-standard formats with strict deadlines. Retyping container details creates demurrage risks.',
    workflows: [
      {
        title: 'Email-to-CargoWise Sync',
        description: 'Monitors inbound inboxes, extracts container lists, weights, and ports from arrival notices, and creates CargoWise jobs.',
        tag: 'CargoWise eAdaptor',
      },
      {
        title: 'Carrier Freight & Tariff Audit',
        description: 'Cross-references carrier bills against quotation tariffs, instantly highlighting unauthorized detention charges.',
        tag: 'Tariff Audit',
      },
    ],
    documents: ['Carrier Arrival Notices', 'Master / House BL (MBL/HBL)', 'Air Waybills (AWB)', 'Ocean Freight Invoices', 'Detention Slips'],
    systems: ['CargoWise (WiseTech Global)', 'TallyPrime', 'SAP Logistics', 'FreightSoft'],
    sampleUseCase: {
      quote: 'A specific email-to-CargoWise document workflow reduced from around two hours to approximately two minutes with zero errors.',
      author: 'FT Logistics',
      company: 'Freight & Logistics Operations',
    },
  },
];
