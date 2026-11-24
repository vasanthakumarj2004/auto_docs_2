export interface LogisticsPersonaChallenge {
  number: string;
  title: string;
  description: string;
}

export interface LogisticsPersonaFeature {
  tag: string;
  title: string;
  description: string;
  desc?: string;
  upcoming?: boolean;
}

export interface LogisticsPersonaFaq {
  question: string;
  answer: string;
}

export interface LogisticsProcessStepRow {
  who: string;
  what: string;
  status: string;
  type: 'ok' | 'wait' | 'info';
}

export interface LogisticsProcessStepItem {
  num: number;
  title: string;
  desc: string;
  panelBar: string;
  panelStatus: string;
  statusType: 'ok' | 'wait' | 'info';
  rows: LogisticsProcessStepRow[];
  actions?: string[];
  files?: string[];
  foot: string;
}

export interface OtherRoleItem {
  role: string;
  title: string;
  lead: string;
  href: string;
  linkText: string;
}

export interface LogisticsPersonaData {
  slug: 'freight-forwarders' | 'pricing-sourcing' | 'operations-team';
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
  proofStats: Array<{
    title: string;
    copy: string;
    iconName: string;
    highlight?: boolean;
  }>;
  challengesEyebrow: string;
  challengesTitle: string;
  challengesDescription: string;
  challenges: Array<{
    num: string;
    title: string;
    was: string;
    fix: string;
  }>;
  capabilitiesEyebrow: string;
  capabilitiesTitle: string;
  capabilitiesDescription: string;
  gainCards: LogisticsPersonaFeature[];
  processEyebrow: string;
  processTitle: string;
  processDescription: string;
  howSteps: LogisticsProcessStepItem[];
  storyFacts: Array<{ bold: string; desc: string }>;
  proofLabel: string;
  proofTitle: string;
  proofMetricFrom: string;
  proofMetricTo: string;
  proofDescription: string;
  faqsEyebrow: string;
  faqsTitle: string;
  faqs: LogisticsPersonaFaq[];
  otherRoles: OtherRoleItem[];
}

export type LogisticsPersonaSlug = LogisticsPersonaData['slug'];

export const logisticsPersonas: Record<LogisticsPersonaSlug, LogisticsPersonaData> = {
  'freight-forwarders': {
    slug: 'freight-forwarders',
    navTitle: 'Freight Forwarders',
    metaTitle: 'For Freight Forwarders · Docsynecx Logistics Desk',
    metaDescription: 'For freight forwarding owners and leadership: turn customer enquiries into quotes in minutes, enforce margin rules, stop margin leaks, and scale volume without adding headcount.',
    eyebrow: 'For freight forwarders & leadership',
    headline: 'Win more shipments. Protect your margins.',
    accent: 'Scale without adding headcount.',
    description: 'Turn enquiries into ready quotes while the shipper is still warm. Lock in margin rules across every lane, eliminate booking retyping into CargoWise, and track shipments before clients chase your team.',
    primaryCta: 'Book a demo',
    secondaryCta: 'What you get',
    microline: 'Nothing is sent to a customer or pushed to CargoWise without your team\'s review.',
    visualTitle: 'Commercial Cockpit',
    visualLabel: 'This week',
    tiles: [
      ['Quote Turnaround', '15 mins avg · Up 4x'],
      ['Margin Guard', 'Zero unapproved discounts'],
    ],
    chip: '42 active enquiries · 38 quoted · 0 margin leaks',
    proofStats: [
      {
        title: 'Quote turnaround',
        copy: 'Minutes, not 24 to 48 hours',
        iconName: 'Zap',
      },
      {
        title: 'Margin governance',
        copy: 'Every quote respects your margin floor',
        iconName: 'ShieldCheck',
      },
      {
        title: 'Scale without hiring',
        copy: 'Handle 3x shipment volume on current staff',
        iconName: 'TrendingUp',
      },
      {
        title: 'CargoWise sync',
        copy: 'One-click push with zero retyping',
        iconName: 'CheckCircle2',
        highlight: true,
      },
    ],
    challengesEyebrow: 'SOUND FAMILIAR?',
    challengesTitle: 'Four things that cap a freight forwarder\'s growth.',
    challengesDescription: 'Docsynecx eliminates quotation delays, margin erosion, and operational bottlenecks across your forwarding floor.',
    challenges: [
      {
        num: '01 · Lost RFQs',
        title: 'Quotes arrive 24 hours too late',
        was: 'Shippers email four forwarders; by the time your team pulls rates and drafts a reply, the booking is lost.',
        fix: 'enquiries read and quotes drafted in under 15 minutes.',
      },
      {
        num: '02 · Margin leaks',
        title: 'Quoting on gut feel and old rates',
        was: 'Sales reps trim margins arbitrarily or quote on expired carrier tariffs, causing unforeseen losses on billing.',
        fix: 'automated margin floors and live tariff benchmarking.',
      },
      {
        num: '03 · Headcount tax',
        title: 'More TEUs means hiring more clerks',
        was: 'Growing container volumes requires hiring armies of operators to type documents into CargoWise.',
        fix: 'documents extracted and synced with 2-minute human approval.',
      },
      {
        num: '04 · Customer churn',
        title: 'Blind until the customer escalates',
        was: 'You only find out a container was rolled or detained when an angry shipper calls to complain.',
        fix: 'real-time milestone tracking and proactive customer alerts.',
      },
    ],
    capabilitiesEyebrow: 'WHAT YOU GET',
    capabilitiesTitle: 'Grow your freight business without operational drag.',
    capabilitiesDescription: 'Give your branch managers, sales team, and operators the intelligence to respond faster and operate profitably.',
    gainCards: [
      {
        tag: 'Speed to market',
        title: 'Win the quote while it\'s warm',
        description: 'Read inbound customer RFQs from emails and attachments; draft complete quotes in minutes.',
      },
      {
        tag: 'Margin protection',
        title: 'Enforce commercial rules',
        description: 'Set minimum profit margins by trade lane, customer tier, or commodity. Flags sub-margin quotes instantly.',
      },
      {
        tag: 'Volume scale',
        title: 'Operate 3x more shipments',
        description: 'Automate repetitive document extraction so your existing team can focus on client relationships.',
      },
      {
        tag: 'CargoWise connected',
        title: 'Direct ERP & TMS synchronization',
        description: 'Quotes, accepted bookings, and shipment documents flow directly into CargoWise or your proprietary ERP.',
      },
      {
        tag: 'Executive visibility',
        title: 'Lane, carrier & margin analytics',
        description: 'Know which trade lanes make money, carrier reliability scores, and win rates across all branches.',
      },
      {
        tag: 'Proactive retention',
        title: 'Milestone alerts before escalations',
        description: 'Track vessel schedules, container milestones, and exception flags in one centralized operational overview.',
      },
    ],
    processEyebrow: 'HOW IT WORKS',
    processTitle: 'From customer enquiry to verified CargoWise booking.',
    processDescription: 'Four connected stages with full human governance at every milestone.',
    howSteps: [
      {
        num: 1,
        title: 'Enquiry received',
        desc: 'Customer sends an RFQ via email, Excel sheet, or PDF.',
        panelBar: 'Step 1 of 4 · Commercial Intake',
        panelStatus: 'Auto-Parsed',
        statusType: 'info',
        rows: [
          { who: 'Apex Exports', what: '5x40HC · Nhava Sheva to Rotterdam · Ocean', status: 'Parsed', type: 'ok' },
          { who: 'Zenith Pharma', what: '2 pallets · BLR to FRA · Air Freight', status: 'Parsed', type: 'ok' },
          { who: 'Sun Textile Mills', what: '2x20GP · Tuticorin to Colombo · Feeder', status: 'Parsed', type: 'ok' },
        ],
        foot: 'All customer enquiry emails gathered and parsed in one unified queue.',
      },
      {
        num: 2,
        title: 'Carrier rates compared',
        desc: 'Docsynecx benchmarks contracts and spot rates, adding your margin.',
        panelBar: 'Step 2 of 4 · Rate Benchmark & Margin',
        panelStatus: 'Rates matched',
        statusType: 'wait',
        rows: [
          { who: 'Maersk Line', what: '$2,150/40HC · 24 days transit · Direct', status: 'Best Transit', type: 'ok' },
          { who: 'MSC Mediterranean', what: '$1,980/40HC · 28 days transit · 1 transshipment', status: 'Best Price', type: 'ok' },
          { who: 'Margin Applied', what: 'Apex Exports margin set at +$250/box', status: 'Locked', type: 'info' },
        ],
        actions: ['Select MSC', 'Select Maersk'],
        foot: 'Carrier buy rates normalized with standard margins automatically applied.',
      },
      {
        num: 3,
        title: 'Quote sent & approved',
        desc: 'Your sales executive reviews the drafted quote and hits send.',
        panelBar: 'Step 3 of 4 · Review & Dispatch',
        panelStatus: '1-Click Send',
        statusType: 'ok',
        rows: [
          { who: 'Apex Quote #QT-891', what: 'Total $11,150 · Margin $1,250 · Valid 7 days', status: 'Ready to Send', type: 'ok' },
        ],
        actions: ['Send to Apex Exports', 'Edit Margins'],
        foot: 'Professional branded quote sent to the shipper within 15 minutes of inquiry.',
      },
      {
        num: 4,
        title: 'Pushed to CargoWise',
        desc: 'When the shipper confirms, the booking job is created automatically.',
        panelBar: 'Step 4 of 4 · TMS Job Execution',
        panelStatus: 'Job Created',
        statusType: 'ok',
        rows: [
          { who: 'CargoWise Job #SH-2026-041', what: 'Booking created · Carrier allocated · Routing set', status: 'Synced', type: 'ok' },
        ],
        files: ['Booking confirmation attached', 'Customer email thread linked'],
        foot: 'Shipment data synced to CargoWise with zero manual retyping.',
      },
    ],
    storyFacts: [
      { bold: '2 hrs → 2 min', desc: 'shipment intake and booking creation' },
      { bold: '100% margin lock', desc: 'zero unauthorized rate cuts by sales' },
      { bold: '4x volume', desc: 'handled without hiring additional doc clerks' },
    ],
    proofLabel: 'CUSTOMER OUTCOME',
    proofTitle: 'Mid-Market Freight Forwarder',
    proofMetricFrom: '2 hrs',
    proofMetricTo: '2 min',
    proofDescription: 'Handling over 800 TEUs monthly across ocean and air trade lanes. Inquiries that used to sit in inboxes for a full day now receive accurate, margin-protected quotes in under 15 minutes.',
    faqsEyebrow: 'LEADERSHIP QUESTIONS',
    faqsTitle: 'What forwarder leadership asks us first.',
    faqs: [
      {
        question: 'Do we have to replace CargoWise or our existing TMS?',
        answer: 'No. Docsynecx is designed to sit alongside CargoWise, your custom ERP, or proprietary forwarding software. It handles the chaotic intake and pushes verified entries directly into your system.',
      },
      {
        question: 'How does Docsynecx prevent margin leakage on quotes?',
        answer: 'You define organizational commercial margin rules by lane, volume, or customer tier. Docsynecx applies these automatically and flags any quote where the margin dips below your threshold for manager sign-off.',
      },
      {
        question: 'Will our team still have review control over quotes and bookings?',
        answer: 'Always. Nothing is emailed to a customer or booked with a carrier until someone on your team reviews and approves the drafted numbers.',
      },
      {
        question: 'Can we handle both Ocean and Air freight enquiries?',
        answer: 'Yes. Docsynecx supports FCL, LCL, Air Freight, and multi-modal moves, extracting container types (20GP, 40HC, Reefer), chargeable weights (CBM vs gross kg), and customs classifications.',
      },
      {
        question: 'How long does implementation take?',
        answer: 'Logistics Desk is typically up and running in about a week. We test with your own real customer enquiry emails and carrier contract sheets to ensure accuracy before rollout.',
      },
    ],
    otherRoles: [
      {
        role: 'Pricing & Sourcing',
        title: 'Master carrier tariff chaos',
        lead: 'Compare multi-carrier buy rates, manage surcharges, and draft winning quotes in minutes.',
        href: '/logistics-desk/pricing-sourcing/',
        linkText: 'For pricing teams',
      },
      {
        role: 'Operations Team',
        title: 'Stop retyping shipping documents',
        lead: 'Turn B/Ls, invoices, and packing lists into verified CargoWise jobs in 2 minutes.',
        href: '/logistics-desk/operations-team/',
        linkText: 'For operations teams',
      },
    ],
  },

  'pricing-sourcing': {
    slug: 'pricing-sourcing',
    navTitle: 'Pricing & Sourcing Team',
    metaTitle: 'For Pricing & Sourcing Teams · Docsynecx Logistics Desk',
    metaDescription: 'For freight pricing and procurement teams: normalize incoming carrier rate sheets, compare ocean and air spot rates instantly, apply margin rules, and generate quotes in minutes.',
    eyebrow: 'For pricing & sourcing teams',
    headline: 'From carrier tariff chaos',
    accent: 'To winning quotes in minutes.',
    description: 'Stop digging through hundreds of carrier rate PDFs, Excel matrices, and spot emails. Docsynecx extracts buy rates, benchmarks carrier options side-by-side, applies your margins, and prepares customer quotes automatically.',
    primaryCta: 'Book a demo',
    secondaryCta: 'See rate comparison',
    microline: 'Your team selects the carrier and approves every quotation line item.',
    visualTitle: 'Rate Benchmarking',
    visualLabel: 'Spot & Contract',
    tiles: [
      ['Carrier Comparison', '3 Lines · Live benchmark'],
      ['Surcharge Engine', 'BAF / CAF / PSS auto-calculated'],
    ],
    chip: 'Carrier rate extracted · $1,980/40HC · 28d transit',
    proofStats: [
      {
        title: 'Multi-carrier benchmarking',
        copy: 'Compare ocean & air rates side-by-side',
        iconName: 'Layers',
      },
      {
        title: 'Tariff normalization',
        copy: 'Carrier PDFs and emails into clean rates',
        iconName: 'FileText',
      },
      {
        title: 'Zero surcharge misses',
        copy: 'Origin, ocean, and destination splits',
        iconName: 'ShieldCheck',
      },
      {
        title: 'Quotation in minutes',
        copy: 'Drafted and ready for your team to send',
        iconName: 'Zap',
        highlight: true,
      },
    ],
    challengesEyebrow: 'SOUND FAMILIAR?',
    challengesTitle: 'Four things that slow down the pricing desk.',
    challengesDescription: 'Docsynecx takes the manual search, currency math, and comparison off your desk so you can quote more and win more.',
    challenges: [
      {
        num: '01 · PDF overload',
        title: 'Drowning in carrier rate sheets',
        was: 'Dozens of emails daily with tariff matrices, spot offers, and surcharges from shipping lines and airlines.',
        fix: 'automated extraction into one searchable rate repository.',
      },
      {
        num: '02 · Slow comparison',
        title: 'Manual carrier comparison under pressure',
        was: 'Switching between 4 carrier portals to compare transit times, free days, and freight rates for one client.',
        fix: 'side-by-side carrier benchmarking in one screen.',
      },
      {
        num: '03 · Expired rates',
        title: 'Quoting on outdated spot rates',
        was: 'Accidentally using last week\'s spot validity or missing an emergency bunker surcharge announcement.',
        fix: 'automatic rate validity verification and surcharge checks.',
      },
      {
        num: '04 · Quotation drafting',
        title: 'Retyping breakdown emails for every inquiry',
        was: 'Copy-pasting ocean freight, origin terminal handling (THC), and destination drayage into client emails.',
        fix: 'auto-drafted professional quotation emails ready in 1 click.',
      },
    ],
    capabilitiesEyebrow: 'WHAT YOU GET',
    capabilitiesTitle: 'Turn around more quotes with complete pricing precision.',
    capabilitiesDescription: 'Everything your commercial team needs to manage carrier buy rates and respond to customer RFQs in record time.',
    gainCards: [
      {
        tag: 'Intelligent ingestion',
        title: 'Parse carrier tariff updates',
        description: 'Automatically reads incoming carrier rates from contract PDFs, Excel sheets, and spot announcement emails.',
      },
      {
        tag: 'Side-by-side benchmarking',
        title: 'Instant carrier comparison',
        description: 'Compare carrier options by base freight, transit days, transshipment ports, free time, and sailing frequency.',
      },
      {
        tag: 'Surcharge engine',
        title: 'Accurate cost breakdown',
        description: 'Separates origin charges, ocean/air freight, bunker surcharges, and destination handling with clean currency conversion.',
      },
      {
        tag: 'Dynamic margin rules',
        title: 'Automated markup calculation',
        description: 'Apply pre-configured margin matrices based on customer profile, cargo volume, or trade lane.',
      },
      {
        tag: 'Spot validity guard',
        title: 'Never quote an expired rate',
        description: 'Monitors spot rate expiration dates and flags expiring carrier validity before the quote leaves your desk.',
      },
      {
        tag: 'Quote template generator',
        title: '1-click customer quotes',
        description: 'Drafts comprehensive, itemized quotation emails and PDF rate cards ready for sales review.',
      },
    ],
    processEyebrow: 'YOUR NEW ROUTINE',
    processTitle: 'Ingest. Benchmark. Margin. Quote.',
    processDescription: 'From a customer freight RFQ to a ready-to-send quote in four frictionless steps.',
    howSteps: [
      {
        num: 1,
        title: 'RFQ arrives',
        desc: 'Customer request parsed: origin, destination, container type, cargo readiness date.',
        panelBar: 'Step 1 of 4 · Request Matching',
        panelStatus: 'RFQ Identified',
        statusType: 'info',
        rows: [
          { who: 'Route Requested', what: 'Chennai (INMAA) to Hamburg (DEHAM)', status: 'Port Matched', type: 'ok' },
          { who: 'Equipment', what: '3x40ft High Cube (40HC) · General Cargo', status: 'Verified', type: 'ok' },
          { who: 'Cargo Ready Date', what: 'Ready 10 Dec 2026 · Target arrival end Jan', status: 'Timeline Set', type: 'info' },
        ],
        foot: 'Port pairs, container requirements, and timeline extracted automatically.',
      },
      {
        num: 2,
        title: 'Carrier rates compared',
        desc: 'Docsynecx pulls your contracted rates and recent spot offers across carriers.',
        panelBar: 'Step 2 of 4 · Carrier Benchmark',
        panelStatus: '3 Carriers Found',
        statusType: 'wait',
        rows: [
          { who: 'Hapag-Lloyd', what: '$2,050/box · 26 days · 14 free days at POD', status: 'Recommended', type: 'ok' },
          { who: 'ONE Network', what: '$1,920/box · 31 days · 7 free days at POD', status: 'Lowest Cost', type: 'ok' },
          { who: 'CMA CGM', what: '$2,100/box · 25 days · 10 free days at POD', status: 'Fastest Transit', type: 'ok' },
        ],
        actions: ['Select Hapag-Lloyd', 'Select ONE Network'],
        foot: 'Base rates, surcharges, and detention terms side by side in seconds.',
      },
      {
        num: 3,
        title: 'Margin & local fees added',
        desc: 'Applies origin THC, doc fees, local drayage, and target customer margin.',
        panelBar: 'Step 3 of 4 · Margin Application',
        panelStatus: 'Profits Locked',
        statusType: 'ok',
        rows: [
          { who: 'Ocean Buy Rate', what: '$2,050 / container (Hapag-Lloyd)', status: 'Buy Cost', type: 'info' },
          { who: 'Origin + BAF Surcharges', what: '₹14,500 THC + $120 BAF per box', status: 'Calculated', type: 'ok' },
          { who: 'Commercial Margin', what: '+$300 markup per container', status: 'Target Met', type: 'ok' },
        ],
        foot: 'All origin and destination charges itemized with clean margin calculation.',
      },
      {
        num: 4,
        title: 'Quote ready to dispatch',
        desc: 'A complete, professional customer quote is ready for your team\'s review.',
        panelBar: 'Step 4 of 4 · Customer Quote Output',
        panelStatus: 'Quote Ready',
        statusType: 'ok',
        rows: [
          { who: 'Quote #QT-2026-904', what: 'Full breakdown for 3x40HC to Hamburg · Valid till 15 Dec', status: 'Approved to Send', type: 'ok' },
        ],
        actions: ['Send Quote Email', 'Download PDF'],
        foot: 'Quote out the door while the customer is still considering options.',
      },
    ],
    storyFacts: [
      { bold: '10 mins', desc: 'average RFQ turnaround from receipt to quote' },
      { bold: 'Zero surcharge leaks', desc: 'origin THC and BAF captured every time' },
      { bold: '35% higher win rate', desc: 'faster replies capture more bookings' },
    ],
    proofLabel: 'PRICING BENCHMARK',
    proofTitle: 'Ocean Freight Procurement Desk',
    proofMetricFrom: '4 hrs',
    proofMetricTo: '12 min',
    proofDescription: 'Managing pricing across 12 major ocean trade lanes. Manual tariff lookups and spreadsheet calculations replaced with instantaneous multi-carrier rate comparisons and margin-protected quotes.',
    faqsEyebrow: 'PRICING QUESTIONS',
    faqsTitle: 'What pricing teams ask about daily workflows.',
    faqs: [
      {
        question: 'How does Docsynecx get carrier rate information?',
        answer: 'Docsynecx reads and normalizes your existing carrier contracts, Excel rate matrices, spot quotation emails, and rate announcement PDFs sent to your pricing inbox.',
      },
      {
        question: 'Can we configure different margin rules for different clients?',
        answer: 'Yes. You can configure custom markup rules by customer account tier, commodity type, trade corridor, or sales representative.',
      },
      {
        question: 'How are local charges and terminal handling fees (THC) handled?',
        answer: 'Docsynecx maintains your local charge tariff masters (origin THC, documentation fee, VGM, BL charges, destination delivery order fees) and automatically includes them in the quote breakdown.',
      },
      {
        question: 'Does it support multi-currency quotation?',
        answer: 'Yes. Docsynecx automatically handles currency conversions (USD, EUR, INR, AED, SGD, etc.) using live or fixed company exchange rates.',
      },
      {
        question: 'What if carrier rates change mid-month?',
        answer: 'When a carrier emails an updated rate sheet or GRI announcement, Docsynecx parses the new file and updates the active rate pool, archiving older versions automatically.',
      },
    ],
    otherRoles: [
      {
        role: 'Freight Forwarders',
        title: 'Scale forwarder growth',
        lead: 'Executive visibility into trade lanes, margin governance, and operational scale.',
        href: '/logistics-desk/freight-forwarders/',
        linkText: 'For forwarder leadership',
      },
      {
        role: 'Operations Team',
        title: 'Stop retyping shipping documents',
        lead: 'Turn B/Ls, invoices, and packing lists into verified CargoWise jobs in 2 minutes.',
        href: '/logistics-desk/operations-team/',
        linkText: 'For operations teams',
      },
    ],
  },

  'operations-team': {
    slug: 'operations-team',
    navTitle: 'Operations Team',
    metaTitle: 'For Operations Teams · Docsynecx Logistics Desk',
    metaDescription: 'For freight forwarding operations teams: eliminate copy-pasting into CargoWise, validate Bills of Lading and packing lists, track containers, and prevent demurrage penalties.',
    eyebrow: 'For operations & documentation teams',
    headline: 'Stop retyping shipping documents.',
    accent: 'Create CargoWise jobs in two minutes.',
    description: 'Docsynecx reads commercial invoices, packing lists, and booking confirmations line by line. It checks for discrepancies, drafts the shipment job in CargoWise, and tracks your containers automatically.',
    primaryCta: 'Book a demo',
    secondaryCta: 'See job creation',
    microline: 'Your operators review and verify every field before the job is pushed to CargoWise.',
    visualTitle: 'CargoWise Intake',
    visualLabel: 'Job #CW-8842',
    tiles: [
      ['Packing List Parsed', '480 cartons · 12,400 kg · 32 CBM'],
      ['CargoWise Job', 'Pushed & verified in 1 click'],
    ],
    chip: 'Job ready · 0 discrepancy · HBL draft linked',
    proofStats: [
      {
        title: 'Job creation speed',
        copy: '2 minutes instead of 2 hours per file',
        iconName: 'Zap',
      },
      {
        title: 'Zero B/L discrepancies',
        copy: 'Cross-checks packing list vs carrier draft',
        iconName: 'ShieldCheck',
      },
      {
        title: 'Automated milestone tracking',
        copy: 'Real-time container events and ETA updates',
        iconName: 'Clock',
      },
      {
        title: 'Demurrage prevention',
        copy: 'Early warnings before free time expires',
        iconName: 'CheckCircle2',
        highlight: true,
      },
    ],
    challengesEyebrow: 'SOUND FAMILIAR?',
    challengesTitle: 'Four things that bog down freight operations.',
    challengesDescription: 'Docsynecx takes the dual-screen typing and carrier chasing off your desk, so you can deliver exceptional customer service.',
    challenges: [
      {
        num: '01 · Dual-screen typing',
        title: 'Retyping packing lists into CargoWise',
        was: 'Squinting at a customer PDF packing list on screen 1 while typing carton counts and weights into CargoWise on screen 2.',
        fix: 'every line item and package count extracted automatically.',
      },
      {
        num: '02 · Costly amendments',
        title: 'Discrepancies between SI and carrier B/L',
        was: 'A typo in the container or seal number slips through, triggering $100 carrier amendment fees and customs hold-ups.',
        fix: 'automatic cross-validation flags discrepancies before submission.',
      },
      {
        num: '03 · Chasing carrier websites',
        title: '"Where is my container?" customer chasing',
        was: 'Logging into 6 different carrier tracking portals every morning to check vessel arrival and discharge status.',
        fix: 'unified live container milestones in one dashboard.',
      },
      {
        num: '04 · Demurrage traps',
        title: 'Detention bills that eat your profits',
        was: 'Missing container discharge notifications until free days have expired and port storage charges hit.',
        fix: 'proactive alerts on approaching free time cut-offs.',
      },
    ],
    capabilitiesEyebrow: 'WHAT YOU GET',
    capabilitiesTitle: 'Less manual keying. Zero document mistakes.',
    capabilitiesDescription: 'Everything your operations desk needs to move shipments from booking to final delivery with speed and accuracy.',
    gainCards: [
      {
        tag: 'Document parsing',
        title: 'Extract packing lists & invoices',
        description: 'Reads complex multi-page packing lists, item descriptions, weights, volume, and container stuffing details.',
      },
      {
        tag: 'CargoWise sync',
        title: 'Direct shipment job creation',
        description: 'Creates shipment jobs, parties, routing, and commodity entries in CargoWise with a single click.',
      },
      {
        tag: 'Discrepancy checker',
        title: 'Catch errors before the carrier does',
        description: 'Cross-validates customer Shipping Instructions against carrier draft Bills of Lading to prevent amendment fees.',
      },
      {
        tag: 'Milestone tracking',
        title: 'Live multi-carrier visibility',
        description: 'Aggregates gate-in, vessel departure, transshipment, discharge, and customs release events across carriers.',
      },
      {
        tag: 'Demurrage guard',
        title: 'Free-time expiry alerts',
        description: 'Calculates remaining demurrage and detention free days at destination, alerting operations before charges kick in.',
      },
      {
        tag: 'Proactive customer updates',
        title: 'Drafted status notifications',
        description: 'Prepares branded email updates for your shippers at key milestones so they never have to chase you.',
      },
    ],
    processEyebrow: 'YOUR NEW ROUTINE',
    processTitle: 'Upload. Verify. Push to CargoWise. Track.',
    processDescription: 'How a messy set of customer shipping documents becomes an active, tracked shipment in minutes.',
    howSteps: [
      {
        num: 1,
        title: 'Drop documents in',
        desc: 'Customer sends commercial invoice, packing list, and shipping instruction.',
        panelBar: 'Step 1 of 4 · Document Intake',
        panelStatus: '3 Documents Parsed',
        statusType: 'info',
        rows: [
          { who: 'Packing List #PL-4820', what: '1,200 cartons · 18,400 kg · 45 CBM', status: 'Extracted', type: 'ok' },
          { who: 'Commercial Invoice', what: 'Value $84,200 · HSN 6109.10 · 3 line items', status: 'Extracted', type: 'ok' },
          { who: 'Booking Confirmation', what: 'Carrier booking #MAEU9284102', status: 'Linked', type: 'ok' },
        ],
        foot: 'All shipping papers parsed and aligned into a unified shipment record.',
      },
      {
        num: 2,
        title: 'Discrepancy validation',
        desc: 'Docsynecx cross-checks weights, carton counts, and container numbers.',
        panelBar: 'Step 2 of 4 · Validation Check',
        panelStatus: 'Checks Complete',
        statusType: 'wait',
        rows: [
          { who: 'Container Numbers', what: 'MSKU-8291048 & MSKU-3910294 verified', status: 'Passed', type: 'ok' },
          { who: 'Weight Check', what: 'VGM weight matches packing list total', status: 'Passed', type: 'ok' },
          { who: 'Consignee Address', what: 'Missing tax ID on customer SI', status: 'Flagged for Review', type: 'wait' },
        ],
        actions: ['Confirm Address', 'View Carrier Draft'],
        foot: 'Potential amendment penalties caught before submitting to the carrier.',
      },
      {
        num: 3,
        title: 'Pushed to CargoWise',
        desc: 'One click creates the full job, attaches documents, and sets the workflow.',
        panelBar: 'Step 3 of 4 · CargoWise Synchronization',
        panelStatus: 'Job Active',
        statusType: 'ok',
        rows: [
          { who: 'CargoWise Job #J-2026-8842', what: 'Shipper, Consignee, Routing, Containers populated', status: 'Created', type: 'ok' },
        ],
        files: ['PL-4820.pdf attached', 'Carrier Booking linked in CargoWise eDocs'],
        foot: 'Job created in CargoWise with documents attached to eDocs in under 2 minutes.',
      },
      {
        num: 4,
        title: 'Automated milestone tracking',
        desc: 'Carrier updates, vessel AIS tracking, and milestone alerts in one live view.',
        panelBar: 'Step 4 of 4 · Live Tracking',
        panelStatus: 'On Schedule',
        statusType: 'ok',
        rows: [
          { who: 'Vessel Maersk Gateshead', what: 'Departed Nhava Sheva · ETA Rotterdam 18 Dec', status: 'In Transit', type: 'ok' },
          { who: 'Customer Update', what: 'Departure milestone email drafted for shipper', status: 'Ready to Send', type: 'info' },
        ],
        actions: ['Send Customer Update', 'View Map Tracking'],
        foot: 'Shipper informed automatically without manual emails or tracking lookups.',
      },
    ],
    storyFacts: [
      { bold: '2 hrs → 2 min', desc: 'to create a complete CargoWise shipment job' },
      { bold: 'Zero amendments', desc: 'cross-validation prevents $100 penalty fees' },
      { bold: '85% fewer chasing calls', desc: 'proactive milestone updates sent to clients' },
    ],
    proofLabel: 'OPERATIONS BENCHMARK',
    proofTitle: 'Documentation & Customer Service Desk',
    proofMetricFrom: '2 hrs',
    proofMetricTo: '2 min',
    proofDescription: 'Handling over 400 active ocean and air shipments monthly. Documentation executives no longer spend their days keying numbers into CargoWise or checking carrier portals, shifting focus to client care.',
    faqsEyebrow: 'OPERATIONS QUESTIONS',
    faqsTitle: 'What operations executives ask about day-to-day use.',
    faqs: [
      {
        question: 'Does it create real jobs in CargoWise?',
        answer: 'Yes. Docsynecx connects directly with CargoWise via secure API or eAdaptor, creating actual forwarding shipment jobs with routing, parties, container details, and eDocs attachments.',
      },
      {
        question: 'What if a packing list has handwritten notes or skewed scanning?',
        answer: 'Docsynecx uses vision-language models specifically trained on noisy logistics paperwork. Any field with low confidence is flagged in yellow so your operator checks it before sync.',
      },
      {
        question: 'How does it stop carrier B/L amendment fees?',
        answer: 'Docsynecx automatically cross-references the carrier\'s draft B/L against the customer\'s original Shipping Instructions (SI) and packing list, highlighting any discrepancy in container numbers, weights, or piece counts.',
      },
      {
        question: 'Can we track container milestones across different shipping lines?',
        answer: 'Yes. Docsynecx aggregates tracking feeds across major ocean carriers and airlines, consolidating gate-in, vessel departure, transshipment, arrival, and discharge in one dashboard.',
      },
      {
        question: 'Do operations staff need specialized technical training?',
        answer: 'No. The interface is designed for everyday freight operators. If your team knows how to use email and CargoWise, they can master Docsynecx in a single 30-minute training session.',
      },
    ],
    otherRoles: [
      {
        role: 'Freight Forwarders',
        title: 'Scale forwarder growth',
        lead: 'Executive visibility into trade lanes, margin governance, and operational scale.',
        href: '/logistics-desk/freight-forwarders/',
        linkText: 'For forwarder leadership',
      },
      {
        role: 'Pricing & Sourcing',
        title: 'Master carrier tariff chaos',
        lead: 'Compare multi-carrier buy rates, manage surcharges, and draft winning quotes in minutes.',
        href: '/logistics-desk/pricing-sourcing/',
        linkText: 'For pricing teams',
      },
    ],
  },
};
