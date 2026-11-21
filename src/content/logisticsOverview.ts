export const logisticsRoot = '/logistics-desk/';
export const demoHref = '/demo/#demo-form';

export const logisticsModules = [
  {
    slug: 'RFQ-to-booking',
    title: 'RFQ-to-Booking',
    label: '01 · Enquiry to quote',
    badge: 'Most teams start here',
    lead: 'Turn every enquiry into a ready-to-send quote.',
    description: 'Turn every enquiry into a ready-to-send quote. Reads enquiries and attachments from your inbox, gathers vendor rates, compares options side by side and drafts the quote with your margin.',
    bullets: [
      'Reads enquiries and attachments from your inbox',
      'Sends rate requests to your vendors and checks your rate cards',
      'Compares rates and transit times side by side',
      'Drafts the quote with your margin, for you to approve',
      'Creates the booking in CargoWise once the customer says yes',
    ],
    link: 'See RFQ-to-Booking',
  },
  {
    slug: 'shipment-operations',
    title: 'Shipment Operations',
    label: '02 · Jobs and documents',
    lead: 'Catch document mistakes before customs does.',
    description: 'Catch document mistakes before customs does. The accepted quote becomes the job with no retyping from sales to ops. Checks container numbers, weights and seals across documents.',
    bullets: [
      'The accepted quote becomes the job, with no retyping from sales to ops',
      'Reads the B/L, shipping order and packing list',
      'Checks container numbers, weights and seals match across documents',
      'Anything that doesn\'t match waits for your ops team to clear',
      'Updates CargoWise or your own ERP',
    ],
    link: 'See Shipment Operations',
  },
  {
    slug: 'shipment-tracking',
    title: 'Shipment Tracking',
    label: '03 · Tracking',
    lead: 'Hear about a delay before your customer calls you.',
    description: 'Hear about a delay before your customer calls you. Milestones from ocean carriers and transporters in one screen for every active job, with tracking links you can share.',
    bullets: [
      'Milestones from carriers and your transporters',
      'Alerts for delays and transshipment changes',
      'One screen for every active job',
      'A tracking link you can share with your customer',
    ],
    link: 'See Shipment Tracking',
  },
  {
    slug: 'freight-intelligence',
    title: 'Freight Intelligence',
    label: '04 · Profit and performance',
    badge: 'Coming soon',
    lead: 'See which jobs, customers and lanes make you money.',
    description: 'See which jobs, customers and lanes make you money. Profit on every job, quoted vs actual cost with detention/demurrage trends, and monthly management reports ready on day one.',
    bullets: [
      'Profit on every job',
      'Quoted vs actual cost, with detention and demurrage trends',
      'Volume by lane and container type',
      'Which customers convert, and which ones earn',
      'A monthly management report, ready on day one',
    ],
    link: 'Join early access',
  },
] as const;

export type LogisticsSlug = typeof logisticsModules[number]['slug'];
export type Feature = readonly [tag: string, title: string, description: string];

export const logisticsStats = [
  { metric: '60+ min → 15 min', copy: 'to send a customer quote' },
  { metric: '120 → 225', copy: 'quotes a day, same team' },
  { metric: '65% fewer', copy: '"where is my cargo?" emails' },
] as const;

export const logisticsStatsSource = 'Results from a freight rate desk, UAE & India, over 12 months.';

export const logisticsProblem = {
  eyebrow: 'Why quotes go out late',
  headline: 'The customer asked four forwarders.',
  accent: 'The fastest good quote wins.',
  manualTitle: 'One enquiry today',
  manualTag: '≈ 60+ min',
  manualSteps: [
    { time: '09:02', description: 'Enquiry lands with a PDF and a packing list' },
    { time: '09:15', description: 'Ports, weight and cargo copied into a sheet by hand' },
    { time: '09:20', description: 'Rate requests emailed to vendors, one by one' },
    { time: '09:50', description: 'Chasing the two who haven\'t replied' },
    { time: '10:05', description: 'Quote rebuilt in Excel, margin added, sent' },
  ],
  automatedTitle: 'With Docsynecx',
  automatedTag: '≈ 15 min',
  automatedSteps: [
    { time: '09:02', description: 'Enquiry read. Ports, equipment and weight picked up' },
    { time: '09:03', description: 'Rate requests drafted to your vendors on that lane' },
    { time: '09:12', description: 'Replies lined up side by side as they come in' },
    { time: '09:14', description: 'Quote drafted with your margin' },
    { time: '09:17', description: 'You check it and send it' },
  ],
  note: 'Docsynecx does the copying and chasing, so your team spends that hour pricing and winning.',
};

export const logisticsHowItWorks = {
  eyebrow: 'How it works',
  headline: 'From first email',
  accent: 'to delivered container.',
  description:
    'Four steps, with your team in control at each one. Your operators stay in charge, your data gets checked, and your customers stay informed.',
  steps: [
    {
      number: 1,
      title: 'Read the enquiry',
      description:
        'Ports, equipment, weight and cargo are picked up from the email, PDF or packing list. Nobody retypes them.',
      panelTitle: 'Freight enquiry inbox',
      panelBadge: '3 new today',
      panelFoot:
        'No retyping. Every enquiry becomes a quote draft in minutes. Missing details get a question drafted back to the customer.',
      items: [
        {
          who: 'Kaveri Textiles Pvt Ltd',
          what: 'INNSA → AEJEA · 1×40\' HC · 18,200 kg',
          status: 'Quote ready',
          statusType: 'wait',
        },
        {
          who: 'Gulf Home Furnishings LLC',
          what: 'CNSHA → AEJEA · 2×40\' HC · 24,500 kg',
          status: 'Rates: 3 of 4 in',
          statusType: 'info',
        },
        {
          who: 'Rhein Machine Parts GmbH',
          what: 'DEHAM → INMAA · 4 pallets · 1,850 kg',
          status: 'Missing: Incoterm',
          statusType: 'wait',
        },
      ],
    },
    {
      number: 2,
      title: 'Get rates and quote',
      description:
        'Rate requests go to your vendors, replies are lined up side by side, and the quote is drafted with your margin. You approve it before it goes.',
      panelTitle: 'Rates · CNSHA → AEJEA · 2×40\' HC',
      panelBadge: 'Waiting for you',
      panelFoot: 'You approve and send. Nothing goes out until you do.',
      rates: [
        { vendor: 'Carrier A', transit: '18 days', freeDays: '14', rate: '$1,180', best: true },
        { vendor: 'Agent B', transit: '20 days', freeDays: '10', rate: '$1,225', best: false },
        { vendor: 'Carrier C', transit: '16 days', freeDays: '7', rate: '$1,310', best: false },
        { vendor: 'Carrier D', transit: 'Reminder sent', freeDays: '-', rate: '-', reminder: true },
      ],
      quoteTotal: '$2,840',
      quoteTotalLabel: 'Quote with your margin, 2 boxes',
    },
    {
      number: 3,
      title: 'Open the job',
      description:
        'The accepted quote becomes a job in CargoWise. The B/L, invoice and packing list are checked against each other, and mismatches are flagged.',
      panelTitle: 'Job JOB-2026-8812 · Document check',
      panelBadge: '1 to clear',
      panelFoot:
        'Weight doesn\'t match. Flagged for your ops team before the B/L is final. The job is already in CargoWise.',
      checks: [
        { field: 'Container no.', bl: 'MSCU8921045', pl: 'MSCU8921045', match: true },
        { field: 'Seal no.', bl: 'ML-448120', pl: 'ML-448120', match: true },
        { field: 'Gross weight', bl: '18,400 kg', pl: '18,040 kg', match: false },
        { field: 'Packages', bl: '640 cartons', pl: '640 cartons', match: true },
      ],
    },
    {
      number: 4,
      title: 'Track to delivery',
      description:
        'Containers at sea and trucks on the road in one view. Your team hears about delays first, and customers get a tracking link.',
      panelTitle: 'MSCU8921045 · CNSHA → AEJEA',
      panelBadge: 'Delay flagged',
      panelFoot:
        'Your team heard first. The customer\'s tracking link already shows the new ETA.',
      milestones: [
        { label: 'Gate-in, Shanghai', date: '08 Nov', status: 'done' },
        { label: 'Loaded and sailed', date: '10 Nov', status: 'done' },
        { label: 'Transshipment, Colombo. Vessel running late', date: 'ETA +2 days', status: 'late' },
        { label: 'Arrival, Jebel Ali', date: '30 Nov', status: 'pending' },
        { label: 'Delivered by truck', date: '02 Dec', status: 'pending' },
      ],
    },
  ],
};

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
    question: 'Do we check everything before it\'s sent?',
    answer:
      'Yes. Every rate request, quote and booking waits for someone on your team to approve it. Nothing reaches a customer or vendor on its own. You can also set approval limits, for example so quotes under a certain margin need a manager.',
  },
  {
    question: 'Can we start with just RFQ-to-Booking?',
    answer:
      'Yes, and most teams do. It\'s live in about a week. Add operations and tracking whenever you\'re ready, with no re-setup.',
  },
  {
    question: 'Does it work with CargoWise or our own system?',
    answer:
      'Yes. Bookings and jobs go straight into CargoWise or your own ERP, so nobody types them in twice. No system? It works from your email inbox on its own.',
  },
  {
    question: 'What about messy emails and attachments?',
    answer:
      'That\'s normal freight email, and it\'s what Docsynecx is built for. It reads the email body, PDFs and packing lists, and pulls out ports, equipment, weight and cargo. If something\'s missing, like the weight or the Incoterm, it flags it and drafts the question back to the customer.',
  },
  {
    question: 'Does this replace my sales or ops team?',
    answer:
      'No. It does the copying, chasing and first drafts. Your people still price, negotiate and look after the customer, and they get through more enquiries in a day.',
  },
];

export const logisticsPageCopy = {
  overview: {
    eyebrow: 'AI rate desk for freight forwarders',
    headline: 'Quote faster.\nWin more shipments.',
    accent: 'Straight from your inbox.',
    description:
      'Docsynecx reads every customer enquiry as it lands, asks your vendors for rates, lines them up side by side and drafts the quote. Your team checks it and sends it.',
    primary: 'Book a demo',
    secondary: 'See how it works',
    promise: 'Nothing goes to a customer or vendor until your team approves it.',
    trust: 'Works with Standalone or CargoWise, your own ERP, or just your email inbox. Live in about a week.',
    microline: 'Freight operations · Enquiry-to-booking · CargoWise & ERP workflows',
    visualTitle: 'LOGISTICS DESK',
    visualLabel: 'LIVE FREIGHT WORKSPACE',
    tiles: [
      ['Workflow', 'Freight operations'],
      ['Status', 'Enquiry-to-booking'],
    ],
    chip: 'Capture · Quote · Book · Track',
    ctaEyebrow: 'See it on your own enquiries',
    ctaTitle: 'Bring last week\'s enquiries. We\'ll show you the quotes.',
    ctaCopy:
      'Send us a few real enquiries from last week. In the demo we\'ll show you the quotes Docsynecx would have drafted, and how fast. You could be live in about a week.',
    // ctaSteps: [
    //   'Book a 30-minute demo',
    //   'Share a few recent enquiries',
    //   'See the drafted quotes, side by side with yours',
    // ],
  },
  'RFQ-to-booking': {
    eyebrow: 'LOGISTICS DESK / EMAIL-TO-BOOKING',
    headline: 'Move freight enquiries from inbox',
    accent: 'to confirmed booking.',
    description: 'Capture customer requirements from email, gather vendor rates, compare options and prepare customer quotations in minutes.',
    primary: 'Book a demo',
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
    primary: 'Book a demo',
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
    primary: 'Book a demo',
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
    primary: 'Book a demo',
    secondary: 'Explore modules',
    microline: 'Roadmap preview · Profitability · Cost variance · Performance MIS',
    visualTitle: 'FREIGHT INTELLIGENCE',
    visualLabel: 'IN DEVELOPMENT',
    tiles: [
      ['Margin analysis', 'Upcoming analytics'],
      ['Carrier variance', 'Roadmap preview'],
    ],
    chip: 'Shipment margins · Demurrage insights · Reporting',
    ctaEyebrow: 'SHAPE THE ROADMAP',
    ctaTitle: 'Interested in Freight Intelligence?',
    ctaCopy: 'Tell us about your forwarding volumes, margin analysis needs and management reporting. We welcome conversations with forwarders interested in this capability.',
  },
} as const;
