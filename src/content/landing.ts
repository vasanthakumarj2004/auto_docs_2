export const landingFaqs = [
  { question: 'What is Docsynecx?', answer: 'Docsynecx is an AI-powered workflow platform for document-heavy finance and logistics teams. It has two desks: Finance Desk for invoice automation and financial intelligence, and Shipment Desk for RFQ to booking, shipment management, tracking and document automation.' },
  { question: 'Which systems does it integrate with?', answer: 'It connects with TallyPrime and CargoWise, and also supports email-based workflows and API connectivity, so validated data moves into the tools your team already uses.' },
  { question: 'Do we need to replace our current software?', answer: 'No. Docsynecx sits alongside your existing accounting, ERP or freight systems and feeds them validated data.' },
  { question: 'Will people still review and approve documents?', answer: 'Yes. Human review and approval stay part of important workflows, so your team remains in control of what gets posted.' },
  { question: 'How long does it take to get started?', answer: 'We start small: understand your process, configure the workflow, validate it with your own documents, then scale. The timeline depends on your document types, volumes and integrations; a demo will give you a realistic estimate.' },
  { question: 'Which industries do you support?', answer: 'Logistics and freight forwarding, automotive and EV, manufacturing, retail and distribution, and textile and garments, wherever invoices, shipment updates and business documents are part of daily work.' },
  { question: 'Are the results shown on the site guaranteed?', answer: 'The outcomes shown are selected customer results. Actual results depend on process scope, document quality and implementation.' },
  { question: 'How do I get a demo?', answer: 'Click Book a Demo anywhere on the page, or email info@docsynecx.com, and tell us about your finance or freight workflow.' },
];

export const landingDesks = [
  {
    id: 'finance', title: 'Finance Desk', tag: 'Finance automation & intelligence', href: '/finance-desk/',
    copy: 'Move beyond invoice entry. Automate supplier documents and bring financial intelligence, business reporting and AI insights into one workspace.',
    features: ['Invoice Automation', 'Banking & Reconciliation', 'Payment Reminders', 'Accounts Payable (Upcoming)', 'Docsynecx Intelligence'],
  },
  {
    id: 'shipment', title: 'Shipment Desk', tag: 'Freight & logistics operations', href: '/logistics/',
    copy: 'Connect freight operations from customer enquiry and booking to shipment management, tracking and document automation.',
    features: ['RFQ to Booking', 'Shipment Management', 'Shipment Tracking', 'Document Automation'],
  },
];

export const landingIndustries = [
  { id: 'logistics-industry', title: 'Logistics & Freight Forwarding', copy: 'RFQ, shipments, tracking and trade documents' },
  { id: 'automotive-industry', title: 'Automotive & EV', copy: 'Purchase invoices, spares and service documents' },
  { id: 'manufacturing-industry', title: 'Manufacturing', copy: 'Supplier invoices and operational documents' },
  { id: 'retail-industry', title: 'Retail & Distribution', copy: 'High-volume invoice and document workflows' },
  { id: 'textile-industry', title: 'Textile & Garments', copy: 'Supplier and purchase documentation' },
];
