export interface SolutionWorkflowCard {
  tag: string;
  title: string;
  desc: string;
}

export interface SolutionStory {
  metric: string;
  metricLabel: string;
  quote: string;
  author: string;
}

export interface SolutionSubtopic {
  id: string;
  sno: string;
  industry: string;
  shortTitle: string;
  shortSubtitle: string;
  eyebrow: string;
  heading: string;
  headingAccent?: string;
  description: string;
  lead: string;
  image: string;
  metricValue: string;
  metricLabel: string;
  challenge: string;
  ctaText: string;
  secondaryCta?: {
    label: string;
    href: string;
  };
  cards: SolutionWorkflowCard[];
  workflows: {
    title: string;
    description: string;
    tag: string;
  }[];
  documents: string[];
  systems: string[];
  story?: SolutionStory;
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
    industry: 'Automotive & EV',
    shortTitle: 'Automotive & EV',
    shortSubtitle: 'Parts & Warranty Claims',
    eyebrow: '01 · Automotive & EV',
    heading: 'Long spare-parts bills,',
    headingAccent: 'read line by line.',
    description:
      'Dealers and service centres get multi-page bills full of part numbers, quantities and rates. Docsynecx reads every line, checks the GST and drafts the purchase voucher. Your team checks it and approves.',
    lead: 'Dealers and service centres get multi-page bills full of part numbers, quantities and rates. Docsynecx reads every line, checks the GST and drafts the purchase voucher.',
    image: '/images/industry-automotive.jpg',
    metricValue: 'Days → hours',
    metricLabel: "to process the month's bills",
    challenge:
      'High-density supplier bills with hundreds of serial numbers cause manual typing bottlenecks and inventory variances.',
    ctaText: 'See it with your spares bills',
    cards: [
      {
        tag: 'Line-item reading',
        title: 'Every part on the bill',
        desc: 'Part numbers, quantities, rates and tax read from multi-page PDFs and scans, so nobody retypes a 60-line spares bill.',
      },
      {
        tag: 'Checked before posting',
        title: 'Mistakes caught early',
        desc: 'GSTIN, tax splits and repeat bills checked, and ledgers suggested from your past entries for that supplier.',
      },
    ],
    workflows: [
      {
        title: 'Every part on the bill',
        description:
          'Part numbers, quantities, rates and tax read from multi-page PDFs and scans, so nobody retypes a 60-line spares bill.',
        tag: 'Line-item reading',
      },
      {
        title: 'Mistakes caught early',
        description:
          'GSTIN, tax splits and repeat bills checked, and ledgers suggested from your past entries for that supplier.',
        tag: 'Checked before posting',
      },
    ],
    documents: [
      'Supplier tax invoices',
      'Multi-page spare-parts bills',
      'Service and purchase bills',
      'Bank statements',
    ],
    systems: ['TallyPrime', 'Zoho Books', 'Custom ERP'],
    story: {
      metric: 'Days → hours',
      metricLabel: "to process the month's bills",
      quote:
        'Spares, service bills and purchase vouchers across several branches now take hours instead of days.',
      author: 'An automobile e-vehicles dealer',
    },
    sampleUseCase: {
      quote:
        'Spares, service bills and purchase vouchers across several branches now take hours instead of days.',
      author: 'An automobile e-vehicles dealer',
      company: 'Automotive & EV Dealer',
    },
  },
  {
    id: 'manufacturing',
    sno: '02',
    industry: 'Industrial Manufacturing',
    shortTitle: 'Industrial Manufacturing',
    shortSubtitle: 'Gate Passes & Asset Bills',
    eyebrow: '02 · Industrial Manufacturing',
    heading: 'Raw material and asset bills,',
    headingAccent: 'without the backlog.',
    description:
      'Plants buy from dozens of suppliers every week. Docsynecx reads purchase and asset bills as they arrive, checks them, and sends the ones above your limit to the right approver.',
    lead: 'Plants buy from dozens of suppliers every week. Docsynecx reads purchase and asset bills as they arrive, checks them, and sends the ones above your limit to the right approver.',
    image: '/images/industry-manufacturing.jpg',
    metricValue: 'Daily use',
    metricLabel: 'for asset and purchase bills',
    challenge:
      'Factory gate weight slips rarely match vendor invoices, stalling communication between stores, accounts, and suppliers.',
    ctaText: 'See it with your purchase bills',
    cards: [
      {
        tag: 'Purchase and asset bills',
        title: 'Read the day they arrive',
        desc: 'Bills sent by email, WhatsApp or upload are read, checked and drafted as vouchers, instead of waiting in a pile for month-end.',
      },
      {
        tag: 'Approval rules',
        title: 'The right person signs off',
        desc: 'Route bills by department, branch or amount, so a ₹5 lakh machine part goes to the plant head and small bills go straight to accounts.',
      },
    ],
    workflows: [
      {
        title: 'Read the day they arrive',
        description:
          'Bills sent by email, WhatsApp or upload are read, checked and drafted as vouchers, instead of waiting in a pile for month-end.',
        tag: 'Purchase and asset bills',
      },
      {
        title: 'The right person signs off',
        description:
          'Route bills by department, branch or amount, so a ₹5 lakh machine part goes to the plant head and small bills go straight to accounts.',
        tag: 'Approval rules',
      },
    ],
    documents: [
      'Raw material invoices',
      'Asset and capital purchase bills',
      'Contractor and service bills',
      'Bank statements',
    ],
    systems: ['TallyPrime', 'Zoho Books', 'Custom ERP'],
    story: {
      metric: 'Daily use',
      metricLabel: 'for asset and purchase bills',
      quote:
        'In daily use for asset and purchase bills, with every entry approved before it reaches the books.',
      author: 'A busy operations team',
    },
    sampleUseCase: {
      quote:
        'In daily use for asset and purchase bills, with every entry approved before it reaches the books.',
      author: 'A busy operations team',
      company: 'Industrial Manufacturing',
    },
  },
  {
    id: 'textile',
    sno: '03',
    industry: 'Textile & Garments',
    shortTitle: 'Textile & Garments',
    shortSubtitle: 'Many mills, many bills',
    eyebrow: '03 · Textile & Garments',
    heading: 'Many mills, many bills,',
    headingAccent: 'one clean set of books.',
    description:
      'Fabric, yarn and processing bills come in from many small suppliers, often as photos. Docsynecx reads them, flags anything that doesn’t add up, and keeps buyer payments on track.',
    lead: 'Fabric, yarn and processing bills come in from many small suppliers, often as photos. Docsynecx reads them, flags anything that doesn’t add up, and keeps buyer payments on track.',
    image: '/images/industry-textile.jpg',
    metricValue: '3x faster',
    metricLabel: 'Supplier reconciliation',
    challenge:
      'Tracking yardage through dyeing and stitching stages with shrinkage rates makes ledger reconciliation error-prone.',
    ctaText: 'See it with your mill bills',
    cards: [
      {
        tag: 'Supplier bills from anywhere',
        title: 'Photos and scans welcome',
        desc: 'Bills shared on WhatsApp or scanned at the unit are read just like PDFs, with GST and duplicates checked.',
      },
      {
        tag: 'Payment reminders',
        title: 'Buyers reminded on time',
        desc: 'Unpaid sales invoices pulled from Tally with their due dates. Reminders by email and WhatsApp, sent only after your team approves.',
      },
    ],
    workflows: [
      {
        title: 'Photos and scans welcome',
        description:
          'Bills shared on WhatsApp or scanned at the unit are read just like PDFs, with GST and duplicates checked.',
        tag: 'Supplier bills from anywhere',
      },
      {
        title: 'Buyers reminded on time',
        description:
          'Unpaid sales invoices pulled from Tally with their due dates. Reminders by email and WhatsApp, sent only after your team approves.',
        tag: 'Payment reminders',
      },
    ],
    documents: [
      'Fabric and yarn purchase bills',
      'Processing and job-work bills',
      'Sales invoices for reminders',
      'Bank statements',
    ],
    systems: ['TallyPrime', 'Zoho Books', 'Custom ERP'],
    sampleUseCase: {
      quote:
        'Bills shared on WhatsApp or scanned at the unit are read just like PDFs, with GST and duplicates checked.',
      author: 'Textile Operations Lead',
      company: 'Textile & Garment Exports',
    },
  },
  {
    id: 'retail',
    sno: '04',
    industry: 'Retail & Distribution',
    shortTitle: 'Retail & Distribution',
    shortSubtitle: 'Distributor bills in bulk',
    eyebrow: '04 · Retail & Distribution',
    heading: 'Hundreds of distributor bills a day,',
    headingAccent: 'handled.',
    description:
      'When every supplier bills you daily, the pile never stops. Docsynecx reads them in bulk, checks each one, and lines them up for approval. It also chases the retailers and dealers who owe you.',
    lead: 'When every supplier bills you daily, the pile never stops. Docsynecx reads them in bulk, checks each one, and lines them up for approval. It also chases the retailers and dealers who owe you.',
    image: '/images/industry-retail.jpg',
    metricValue: '94% auto',
    metricLabel: 'Posted store vouchers',
    challenge:
      'Reconciling daily deliveries across multiple stores with complex promotional schemes and damaged returns causes leakage.',
    ctaText: 'See it with a day of your bills',
    cards: [
      {
        tag: 'Bulk intake',
        title: 'Volume without overtime',
        desc: 'Upload a batch or forward the email. Every bill is read, GST checked, repeats flagged and the voucher drafted.',
      },
      {
        tag: 'Collections',
        title: 'Know who owes you',
        desc: 'Overdue dealers and retailers in one list, with reminders by email and WhatsApp that your team approves first.',
      },
    ],
    workflows: [
      {
        title: 'Volume without overtime',
        description:
          'Upload a batch or forward the email. Every bill is read, GST checked, repeats flagged and the voucher drafted.',
        tag: 'Bulk intake',
      },
      {
        title: 'Know who owes you',
        description:
          'Overdue dealers and retailers in one list, with reminders by email and WhatsApp that your team approves first.',
        tag: 'Collections',
      },
    ],
    documents: [
      'Distributor and supplier invoices',
      'Purchase bills in bulk',
      'Sales invoices for reminders',
      'Bank statements',
    ],
    systems: ['TallyPrime', 'Zoho Books', 'Custom ERP'],
    sampleUseCase: {
      quote:
        'With hundreds of vendors billing daily, Docsynecx reads them in bulk, checks each one, and lines them up for approval.',
      author: 'Retail Distribution Finance',
      company: 'Retail & Distribution',
    },
  },
  {
    id: 'logistics',
    sno: '05',
    industry: 'Freight & Logistics',
    shortTitle: 'Freight & Logistics',
    shortSubtitle: 'From inbox to ready job',
    eyebrow: '05 · Freight & Logistics',
    heading: 'From the inbox to a ready job,',
    headingAccent: 'in minutes.',
    description:
      'Forwarders spend hours copying details from emails and carrier documents into their system. Docsynecx reads them, creates the job and pushes it to CargoWise, your ERP, or keeps it in Docsynecx. Your team checks it first.',
    lead: 'Forwarders spend hours copying details from emails and carrier documents into their system. Docsynecx reads them, creates the job and pushes it to CargoWise, your ERP, or keeps it in Docsynecx.',
    image: '/images/industry-logistics.jpg',
    metricValue: '60+ min → 15 min',
    metricLabel: 'per shipment intake',
    challenge:
      'Carrier documents arrive in non-standard formats with strict deadlines. Retyping container details creates demurrage risks.',
    ctaText: 'See it with your shipments',
    secondaryCta: {
      label: 'Explore Logistics Desk',
      href: '/logistics-desk/',
    },
    cards: [
      {
        tag: 'Email to job',
        title: 'No more copy and paste',
        desc: 'Containers, weights, ports and parties read from emails and carrier documents, and the job created for your team to review.',
      },
      {
        tag: 'Supplier bills',
        title: 'Freight costs into Tally',
        desc: 'Carrier and vendor bills read, checked and drafted in TallyPrime, with nothing posted until it’s approved.',
      },
    ],
    workflows: [
      {
        title: 'No more copy and paste',
        description:
          'Containers, weights, ports and parties read from emails and carrier documents, and the job created for your team to review.',
        tag: 'Email to job',
      },
      {
        title: 'Freight costs into Tally',
        description:
          'Carrier and vendor bills read, checked and drafted in TallyPrime, with nothing posted until it’s approved.',
        tag: 'Supplier bills',
      },
    ],
    documents: [
      'Booking and enquiry emails',
      'Carrier arrival notices',
      'Bills of lading (MBL / HBL)',
      'Air waybills',
    ],
    systems: ['CargoWise', 'Your ERP', 'Docsynecx standalone', 'TallyPrime'],
    story: {
      metric: '60+ min → 15 min',
      metricLabel: 'per shipment intake',
      quote:
        'An email-to-job workflow that took around two hours per shipment now takes about two minutes.',
      author: 'A logistics company',
    },
    sampleUseCase: {
      quote:
        'An email-to-job workflow that took around two hours per shipment now takes about two minutes.',
      author: 'A logistics company',
      company: 'Freight & Logistics Operations',
    },
  },
];
