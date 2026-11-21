export const landingFaqs = [
  { question: 'What is Docsynecx?', answer: 'A platform that takes repetitive document work off finance and freight teams. Finance Desk handles bills, bank statements, reminders and reporting for Tally users. Logistics Desk turns enquiries into quotes and shipment documents into jobs, and tracks every container.' },
  { question: 'Which systems does it work with?', answer: 'TallyPrime, Zoho Books (supplier bills), CargoWise and custom ERPs. Logistics Desk can also run on its own if you don\'t use a TMS.' },
  { question: 'Do we need to replace our current software?', answer: 'No. Docsynecx works alongside the systems you already use, and your team keeps working in them.' },
  { question: 'Will people still review and approve?', answer: 'Yes, always. Nothing is posted to your books, sent to a customer or pushed to CargoWise until someone on your team approves it.' },
  { question: 'How long does it take to get started?', answer: 'Finance Desk connects to TallyPrime in minutes. Logistics Desk is live in about a week, set up and tested on your own emails and documents.' },
  { question: 'Which industries do you support?', answer: 'Automotive and EV, manufacturing, textiles and garments, retail and distribution, and freight and logistics. If your team handles a lot of documents, we can help.' },
  { question: 'Are the results on this site guaranteed?', answer: 'No. They\'re results individual customers reported. Yours depend on your volumes and workflows, so we\'ll show you on your own documents in the demo.' },
  { question: 'How do I get a demo?', answer: 'Book a 30-minute slot and bring a few of your own bills or shipment emails. We\'ll show you exactly what Docsynecx does with them.' },
];

export const landingDesks = [
  {
    id: 'finance', title: 'Finance', tag: 'Finance automation & intelligence', href: '/finance-desk/',
    copy: 'Supplier bills read and checked, bank statements reconciled, customers reminded and your numbers explained, all ready in TallyPrime for your team to approve.',
    features: ['Invoice Automation', 'Banking & Reconcilation', 'Payment Reminders','Docsynecx Intelligence','Accounts Payable'],
  },
  {
    id: 'logistics', title: 'Logistics', tag: 'Freight & logistics operations', href: '/logistics-desk/',
    copy: 'Enquiries turned into quotes, accepted quotes into jobs, documents checked and every container tracked, in CargoWise, your ERP or Docsynecx on its own.',
    features: ['RFQ to Booking', 'Shipment Operations', 'Shipment Tracking', 'Freight Intelligence'],
  },
];

export const landingIndustries = [
  {
    id: 'logistics-industry',
    title: 'Logistics & Freight Forwarding',
    copy: 'RFQ, shipments, container tracking and trade documents.',
    image: '/images/industry-logistics.jpg',
  },
  {
    id: 'automotive-industry',
    title: 'Automotive & EV',
    copy: 'Purchase invoices, spare parts and service documentation.',
    image: '/images/industry-automotive.jpg',
  },
  {
    id: 'manufacturing-industry',
    title: 'Manufacturing',
    copy: 'Supplier invoices, material receipts and operational records.',
    image: '/images/industry-manufacturing.jpg',
  },
  {
    id: 'retail-industry',
    title: 'Retail & Distribution',
    copy: 'High-volume invoice auditing and multi-vendor document workflows.',
    image: '/images/industry-retail.jpg',
  },
  {
    id: 'textile-industry',
    title: 'Textile & Garments',
    copy: 'Supplier and purchase documentation with rapid ledger posting.',
    image: '/images/industry-textile.jpg',
  },
];
