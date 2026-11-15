export const logisticsRoot = '/logistics-desk/';
export const demoHref = '/demo/#demo-form';

export const logisticsModules = [
  {
    slug: 'email-to-booking',
    title: 'Email-to-Booking Automation',
    label: 'Enquiry-to-quote',
    description: 'Move freight enquiries from inbox to customer quotation and booking. Use AI-assisted workflows to read customer enquiries, gather vendor rates, compare options and prepare customer quotations.',
    bullets: [
      'Capture customer enquiries from email and attachments',
      'Automated vendor rate requests and rate card lookups',
      'Side-by-side carrier rate and transit time comparison',
      'Instant customer quote generation with margin control',
      'Direct booking creation and CargoWise handoff',
    ],
    link: 'Explore Email-to-Booking',
  },
  {
    slug: 'shipment-operations',
    title: 'Shipment Operations Automation',
    label: 'Operations & documents',
    description: 'Connect booking details, shipment documents and job workflows. Support the operational handoff from accepted quotation to shipment job. Extract and validate shipment information.',
    bullets: [
      'Operational handoff from accepted quote to job',
      'Extract B/L, shipping orders and packing lists',
      'Cross-check container numbers, weights and seals',
      'Human-in-the-loop exception review and approvals',
      'Seamless data sync with CargoWise and custom ERPs',
    ],
    link: 'Explore Shipment Operations',
  },
  {
    slug: 'shipment-tracking',
    title: 'Shipment Tracking',
    label: 'Visibility & tracking',
    description: 'Make shipment milestones and delays easier to see. Bring shipment status information into a more visible operational workflow. Track ocean and road movements.',
    bullets: [
      'Carrier and transporter milestone updates',
      'Real-time container status and transshipment alerts',
      'Automated delay notifications for operations teams',
      'Centralised tracking dashboard across all active jobs',
      'Customer-facing milestone visibility links',
    ],
    link: 'Explore Shipment Tracking',
  },
  {
    slug: 'freight-intelligence',
    title: 'Freight Intelligence',
    label: 'Analytics & performance',
    badge: 'Roadmap',
    description: 'Build a clearer view of shipment costs, margins and performance. Freight Intelligence is the analytics layer planned to help forwarders understand shipment profitability, customer margins and operational performance.',
    bullets: [
      'Shipment profitability and gross margin analysis',
      'Carrier cost variance and detention/demurrage trends',
      'Trade-lane volume and container utilization insights',
      'Customer profitability and quotation conversion rates',
      'Automated management MIS and operational reporting',
    ],
    link: 'Explore Freight Intelligence',
  },
] as const;

export type LogisticsSlug = typeof logisticsModules[number]['slug'];
export type Feature = readonly [tag: string, title: string, description: string];

export const emailToBookingFeatures: Feature[] = [
  ['ENQUIRY CAPTURE', 'Inbox & attachment reading', 'Read customer freight enquiries directly from email threads, PDFs, Excel sheets and packing lists.'],
  ['RATE SOURCING', 'Vendor rate gathering', 'Automatically request and pull rates from shipping lines, truckers, and saved contract rate cards.'],
  ['RATE COMPARISON', 'Compare carrier options', 'Evaluate rates, transit times, demurrage free days, and reliability across multiple carriers side-by-side.'],
  ['MARGIN CONTROLS', 'Quotation preparation', 'Apply pre-configured margin rules and generate branded PDF and email quotations in minutes.'],
  ['BOOKING HANDOFF', 'One-click booking', 'Turn accepted quotations directly into confirmed freight bookings with shipping line confirmation.'],
  ['HUMAN OVERSIGHT', 'Review when needed', 'Keep pricing managers in control of special discounts, commodity surcharges, and exception handling.'],
];

export const shipmentOperationsFeatures: Feature[] = [
  ['JOB CREATION', 'Accepted quote to job handoff', 'Automatically create operational shipment files in CargoWise or custom ERPs from confirmed bookings.'],
  ['DOCUMENT INTAKE', 'Extract bills of lading & manifests', 'Capture data from bills of lading, commercial invoices, packing lists, and customs declarations.'],
  ['VALIDATION', 'Container & seal verification', 'Verify container numbers, tare weights, seal numbers and piece counts against booking instructions.'],
  ['EXCEPTION CONTROL', 'Discrepancy alerts', 'Flag weight mismatches, missing HSN codes, and documentation discrepancies before vessel departure.'],
  ['CARGOWISE INTEGRATION', 'Bi-directional sync', 'Keep CargoWise milestones, document archives, and operational tasks updated without manual typing.'],
  ['AUDIT TRAIL', 'Full operational visibility', 'Track who reviewed, edited, and approved each document and milestone along the forwarding chain.'],
];

export const shipmentTrackingFeatures: Feature[] = [
  ['OCEAN TRACKING', 'Shipping line milestones', 'Connect direct vessel and container tracking across 50+ ocean carriers, tracking vessel departure, arrival, and discharge.'],
  ['ROAD & FIRST-MILE', 'Transporter visibility', 'Track container trailer movement from shipper factory to port gates with GPS and milestone check-ins.'],
  ['EXCEPTION ALERTS', 'Early delay detection', 'Get notified about roll-overs, port congestion, customs holds, and ETA revisions before customers ask.'],
  ['CLIENT PORTAL', 'Self-service milestone links', 'Provide shippers and consignees with branded tracking links, reducing status update phone calls and emails.'],
  ['INTEGRATED TIMELINE', 'Single view across all jobs', 'See all active import and export shipments on one unified operational map and dashboard.'],
];

export const freightIntelligenceFeatures: Feature[] = [
  ['PROFITABILITY', 'Shipment margin analysis', 'Compare quoted revenue against actual carrier and vendor invoices to spot margin slippage.'],
  ['COST VARIANCE', 'Detention & demurrage alerts', 'Identify detention, demurrage, and unexpected terminal charges before they erode shipment profits.'],
  ['CARRIER PERFORMANCE', 'On-time delivery benchmarks', 'Evaluate shipping line schedule reliability, transit time accuracy, and vendor performance.'],
  ['TRADE LANES', 'Volume & equipment utilization', 'Analyze freight volumes, TEUs shipped, and route profitability across major origins and destinations.'],
  ['MANAGEMENT MIS', 'Automated executive reporting', 'Schedule weekly forwarding summaries, revenue reports, and quote conversion analytics for management.'],
];

export const logisticsFaqs = [
  {
    question: 'Does Logistics Desk integrate with CargoWise and custom ERPs?',
    answer: 'Yes. Logistics Desk is built to connect with CargoWise, custom forwarding ERPs, transport management systems (TMS), and email inboxes. Data moves directly into your operating systems without manual re-entry.',
  },
  {
    question: 'Can Logistics Desk replace human freight forwarders?',
    answer: 'No. Logistics Desk is an AI operating platform designed to assist operators by eliminating repetitive typing and document extraction. Human review, exception handling, and final approvals always remain firmly with your team.',
  },
  {
    question: 'Can we start with only one module like Email-to-Booking?',
    answer: 'Yes. Flexible adoption allows you to start with Email-to-Booking to accelerate quotation turnaround, and add Shipment Operations, Tracking, or Freight Intelligence as your operations scale.',
  },
  {
    question: 'How does Email-to-Booking handle messy customer emails and attachments?',
    answer: 'Our intelligent document models parse complex customer emails, PDFs, Excel sheets, and packing lists to identify origin, destination, cargo dimensions, weight, commodity, and timeline requirements accurately.',
  },
  {
    question: 'Will our team still review quotes and bookings before sending?',
    answer: 'Yes. Your team stays in complete control. Every quote, rate comparison, and booking can be reviewed and approved before moving forward.',
  },
];

export const logisticsPageCopy = {
  overview: {
    eyebrow: 'DOCSYNECX / LOGISTICS DESK',
    headline: 'The AI operating platform for',
    accent: 'freight forwarders.',
    description: 'Connect customer enquiries, vendor rates, quotations, bookings, shipment documents and tracking through AI-assisted freight workflows.',
    primary: 'Book a Logistics Demo',
    secondary: 'Explore modules',
    microline: 'Freight operations · Enquiry-to-booking · CargoWise & ERP workflows',
    visualTitle: 'LOGISTICS DESK',
    visualLabel: 'LIVE FREIGHT WORKSPACE',
    tiles: [
      ['Workflow', 'Freight operations'],
      ['Status', 'Enquiry-to-booking'],
    ],
    chip: 'Capture · Quote · Book · Track',
    ctaEyebrow: 'DOCSYNECX LOGISTICS DESK',
    ctaTitle: 'Make every freight workflow work harder.',
    ctaCopy: 'Show us how your team manages enquiries, bookings and shipment operations today, and we’ll show you Docsynecx on your own trade workflows.',
  },
  'email-to-booking': {
    eyebrow: 'LOGISTICS DESK / EMAIL-TO-BOOKING',
    headline: 'Move freight enquiries from inbox',
    accent: 'to confirmed booking.',
    description: 'Capture customer requirements from email, gather vendor rates, compare options and prepare customer quotations in minutes.',
    primary: 'Book a Logistics Demo',
    secondary: 'Explore modules',
    microline: 'Logistics Desk · Inbox reading · Rapid quoting · CargoWise booking',
    visualTitle: 'EMAIL-TO-BOOKING WORKSPACE',
    visualLabel: 'LOGISTICS DESK',
    tiles: [
      ['Enquiries', '148 processed'],
      ['Quotes sent', '92 prepared'],
    ],
    chip: 'Enquiry · Rates · Quote · Book',
    ctaEyebrow: 'DOCSYNECX LOGISTICS DESK',
    ctaTitle: 'Turn customer enquiries into faster quotes.',
    ctaCopy: 'Let’s look at how your team handles freight inquiries today and see how much time Docsynecx can save your operators.',
  },
  'shipment-operations': {
    eyebrow: 'LOGISTICS DESK / SHIPMENT OPERATIONS',
    headline: 'Connect booking details, documents',
    accent: 'and shipment workflows.',
    description: 'Support the operational handoff from accepted quotation to shipment job. Extract, validate and sync shipping documents with CargoWise and custom ERPs.',
    primary: 'Book a Logistics Demo',
    secondary: 'Explore modules',
    microline: 'Logistics Desk · B/L extraction · Job creation · CargoWise sync',
    visualTitle: 'SHIPMENT OPERATIONS',
    visualLabel: 'LOGISTICS DESK',
    tiles: [
      ['Jobs active', '37 shipments'],
      ['Documents checked', '100% verified'],
    ],
    chip: 'B/L · Packing lists · CargoWise sync',
    ctaEyebrow: 'DOCSYNECX LOGISTICS DESK',
    ctaTitle: 'Eliminate duplicate data entry across shipment files.',
    ctaCopy: 'Discuss your operational document workflows and system integrations with our logistics team.',
  },
  'shipment-tracking': {
    eyebrow: 'LOGISTICS DESK / SHIPMENT TRACKING',
    headline: 'Make shipment milestones and delays',
    accent: 'easy to see and manage.',
    description: 'Bring ocean carrier and road milestone updates into one visible operational workflow with automated exception alerts.',
    primary: 'Book a Logistics Demo',
    secondary: 'Explore modules',
    microline: 'Logistics Desk · 50+ ocean carriers · Road milestone tracking',
    visualTitle: 'SHIPMENT TRACKING',
    visualLabel: 'LOGISTICS DESK',
    tiles: [
      ['Ocean shipments', '24 on water'],
      ['Road consignments', '13 in transit'],
    ],
    chip: 'Milestones · Exception alerts · Customer links',
    ctaEyebrow: 'DOCSYNECX LOGISTICS DESK',
    ctaTitle: 'Proactive milestone visibility for your forwarding desk.',
    ctaCopy: 'See how automated carrier milestone updates reduce inquiry emails and keep operations running on time.',
  },
  'freight-intelligence': {
    eyebrow: 'LOGISTICS DESK / FREIGHT INTELLIGENCE',
    headline: 'Understand shipment profitability,',
    accent: 'costs and performance.',
    description: 'Freight Intelligence is the analytics layer designed to help forwarders analyze shipment margins, carrier variances and commercial performance.',
    primary: 'Book a Logistics Demo',
    secondary: 'Explore modules',
    microline: 'Roadmap preview · Profitability · Cost variance · Performance MIS',
    visualTitle: 'FREIGHT INTELLIGENCE',
    visualLabel: 'IN DEVELOPMENT',
    tiles: [
      ['Margin analysis', 'Planned analytics'],
      ['Carrier variance', 'Roadmap preview'],
    ],
    chip: 'Shipment margins · Demurrage insights · Reporting',
    ctaEyebrow: 'SHAPE THE ROADMAP',
    ctaTitle: 'Interested in Freight Intelligence?',
    ctaCopy: 'Tell us about your forwarding volumes, margin analysis needs and management reporting. We welcome conversations with forwarders interested in this capability.',
  },
} as const;
