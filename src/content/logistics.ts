export type LogisticsSlug =
  | 'email-to-booking'
  | 'shipment-operations'
  | 'shipment-tracking'
  | 'freight-intelligence';

export interface CapabilityItem {
  prefix: string;
  text: string;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer?: string;
}

export interface LogisticsModuleData {
  slug: LogisticsSlug;
  breadcrumb: string;
  moduleName: string;
  iconName: 'envelope' | 'square' | 'crosshair' | 'diamond';
  eyebrow: string;
  heroTitle: string;
  heroDescription: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  cardBadges: string[];
  capabilities: CapabilityItem[];
  workflowSteps: StepItem[];
  integrationsCopy: string;
  scopingNeeds: string;
  closingTitle: string;
}

export const sharedLogisticsCopy = {
  capabilitiesEyebrow: 'WHAT IT HELPS YOUR TEAM DO',
  capabilitiesTitle: 'Purpose-built capabilities for everyday operations.',
  capabilitiesCopy:
    'Configure the workflow around your document types, business rules, review process and connected systems.',

  workflowEyebrow: 'HOW IT WORKS',
  workflowTitle: 'A clear workflow, with people in control.',
  workflowCopy:
    'Typical process flow. Exact steps are finalized during implementation discovery.',
  workflowStepDescription:
    'Information moves to the next stage with visibility and review checkpoints.',

  integrationsEyebrow: 'INTEGRATIONS & DEPLOYMENT',
  integrationsTitle: 'Designed to work with your existing systems.',
  integrationsWarning:
    'Integration availability, data access, automation scope and deployment approach are confirmed during technical discovery. Not every external system or data source is available out of the box.',

  scopingEyebrow: "LET'S SCOPE YOUR WORKFLOW",
  scopingTitle: 'What we need to understand',
  scopingButtonText: 'Request a consultation ↗',

  faqEyebrow: 'FREQUENTLY ASKED QUESTIONS',
  faqTitle: 'Before you get started.',
  faqs: [
    {
      question: 'Can this be configured for our existing process?',
      answer:
        'Yes. We begin by understanding your current workflow, document formats, business rules and exception handling. The final scope is agreed before implementation.',
    },
    {
      question: 'Does it work with our current ERP or operating system?',
      answer:
        'Integration availability, data access, automation scope and system connectivity are assessed during technical discovery to align with your ERP, TMS, or freight operating software.',
    },
    {
      question: 'Will the system run without human review?',
      answer:
        'No. Human review and review checkpoints remain built in at key stages so your operations team maintains complete visibility and control over all customer and shipment actions.',
    },
  ] as FaqItem[],

  closingCopy: 'Share your current process and document volume with our team.',
  closingButtonText: 'Book a discussion ↗',
};

export const logisticsModules: Record<LogisticsSlug, LogisticsModuleData> = {
  'email-to-booking': {
    slug: 'email-to-booking',
    breadcrumb: 'Docsynecx Logistics / Email-to-Booking Automation',
    moduleName: 'Email-to-Booking Automation',
    iconName: 'envelope',
    eyebrow: 'DOCSYNECX LOGISTICS · MODULE',
    heroTitle: 'Move freight enquiries from inbox to customer quotation and booking.',
    heroDescription:
      'Use AI-assisted workflows to read customer enquiries, gather vendor rates, compare options and prepare customer quotations — helping freight teams reduce repetitive email coordination.',
    primaryCtaText: 'Discuss this module ↗',
    secondaryCtaText: 'Explore Logistics platform',
    cardBadges: ['AI-assisted', 'Workflow status', 'Review ready'],
    capabilities: [
      {
        prefix: 'Read incoming',
        text: 'Read incoming customer enquiry emails and supported attachments',
      },
      {
        prefix: 'Identify shipment',
        text: 'Identify shipment details and information gaps',
      },
      {
        prefix: 'Prepare vendor',
        text: 'Prepare vendor rate request emails using configured templates',
      },
      {
        prefix: 'Compare vendor',
        text: 'Compare vendor rates, transit times and response details',
      },
      {
        prefix: 'Support vendor',
        text: 'Support vendor recommendations and email negotiation workflows',
      },
      {
        prefix: 'Prepare customer',
        text: 'Prepare customer quotations with configured margin inputs',
      },
      {
        prefix: 'Draft customer',
        text: 'Draft customer acknowledgement and booking-related emails',
      },
    ],
    workflowSteps: [
      {
        number: 'STEP 01',
        title: 'Customer enquiry arrives by email.',
        description: sharedLogisticsCopy.workflowStepDescription,
      },
      {
        number: 'STEP 02',
        title: 'AI reads details and prepares vendor RFQs.',
        description: sharedLogisticsCopy.workflowStepDescription,
      },
      {
        number: 'STEP 03',
        title: 'Rates are compared and a quote is prepared.',
        description: sharedLogisticsCopy.workflowStepDescription,
      },
      {
        number: 'STEP 04',
        title: 'Customer confirmation is received and booking is coordinated.',
        description: sharedLogisticsCopy.workflowStepDescription,
      },
    ],
    integrationsCopy:
      "Email-based workflow; integration with freight systems can be assessed for the customer's process.",
    scopingNeeds:
      'Modes handled, enquiry volume, vendor network, rate formats, margin rules, email platform and booking process.',
    closingTitle: 'See how Email-to-Booking Automation can fit your workflow.',
  },

  'shipment-operations': {
    slug: 'shipment-operations',
    breadcrumb: 'Docsynecx Logistics / Shipment Operations Automation',
    moduleName: 'Shipment Operations Automation',
    iconName: 'square',
    eyebrow: 'DOCSYNECX LOGISTICS · MODULE',
    heroTitle: 'Connect booking details, shipment documents and job workflows.',
    heroDescription:
      "Support the operational handoff from accepted quotation to shipment job. Extract and validate shipment information from key documents and prepare structured data for the forwarder's operating system.",
    primaryCtaText: 'Discuss this module ↗',
    secondaryCtaText: 'Explore Logistics platform',
    cardBadges: ['AI-assisted', 'Workflow status', 'Review ready'],
    capabilities: [
      {
        prefix: 'Convert accepted',
        text: 'Convert accepted quotation details into shipment or job records',
      },
      {
        prefix: 'Maintain standalone',
        text: 'Maintain standalone Docsynecx shipment records or integrate with CargoWise subject to scope',
      },
      {
        prefix: 'Extract information',
        text: 'Extract information from Bill of Lading, Packing List and Commercial Invoice',
      },
      {
        prefix: 'Compare key',
        text: 'Compare key shipment fields across documents and flag mismatches',
      },
      {
        prefix: 'Prepare customs',
        text: 'Prepare customs declaration data for review; direct filing is not implied',
      },
      {
        prefix: 'Extract supplier',
        text: 'Extract supplier and carrier invoices for downstream reconciliation',
      },
    ],
    workflowSteps: [
      {
        number: 'STEP 01',
        title: 'Accepted quote or booking is received.',
        description: sharedLogisticsCopy.workflowStepDescription,
      },
      {
        number: 'STEP 02',
        title: 'Job data is created or passed to the connected system.',
        description: sharedLogisticsCopy.workflowStepDescription,
      },
      {
        number: 'STEP 03',
        title: 'Shipment documents are extracted and cross-checked.',
        description: sharedLogisticsCopy.workflowStepDescription,
      },
      {
        number: 'STEP 04',
        title: 'Exceptions are reviewed and operational data is completed.',
        description: sharedLogisticsCopy.workflowStepDescription,
      },
    ],
    integrationsCopy:
      'Standalone workflow or CargoWise integration; other TMS/ERP connectivity assessed individually.',
    scopingNeeds:
      'TMS or CargoWise setup, document types, job creation rules, customs data requirements and AP workflow.',
    closingTitle: 'See how Shipment Operations Automation can fit your workflow.',
  },

  'shipment-tracking': {
    slug: 'shipment-tracking',
    breadcrumb: 'Docsynecx Logistics / Shipment Tracking',
    moduleName: 'Shipment Tracking',
    iconName: 'crosshair',
    eyebrow: 'DOCSYNECX LOGISTICS · MODULE',
    heroTitle: 'Make shipment milestones and delays easier to see.',
    heroDescription:
      'Bring shipment status information into a more visible operational workflow. Track ocean and road movements using supported carrier or transporter data sources, with milestone and ETA updates where available.',
    primaryCtaText: 'Discuss this module ↗',
    secondaryCtaText: 'Explore Logistics platform',
    cardBadges: ['AI-assisted', 'Workflow status', 'Review ready'],
    capabilities: [
      {
        prefix: 'Ocean vessel',
        text: 'Ocean vessel and container tracking through supported data sources',
      },
      {
        prefix: 'Road shipment',
        text: 'Road shipment tracking using available transporter updates',
      },
      {
        prefix: 'Milestone visibility',
        text: 'Milestone visibility across agreed shipment stages',
      },
      {
        prefix: 'ETA updates',
        text: 'ETA updates when supplied by connected sources',
      },
      {
        prefix: 'Alerts and',
        text: 'Alerts and notifications for selected status changes',
      },
      {
        prefix: 'Centralized shipment',
        text: 'Centralized shipment status view for operations teams',
      },
    ],
    workflowSteps: [
      {
        number: 'STEP 01',
        title: 'Shipment or container reference is captured.',
        description: sharedLogisticsCopy.workflowStepDescription,
      },
      {
        number: 'STEP 02',
        title: 'Tracking source is queried or updates are received.',
        description: sharedLogisticsCopy.workflowStepDescription,
      },
      {
        number: 'STEP 03',
        title: 'Milestones and ETA are refreshed.',
        description: sharedLogisticsCopy.workflowStepDescription,
      },
      {
        number: 'STEP 04',
        title: 'Teams receive relevant status alerts.',
        description: sharedLogisticsCopy.workflowStepDescription,
      },
    ],
    integrationsCopy:
      'Carrier APIs and transporter update connectivity depend on provider availability, credentials and coverage.',
    scopingNeeds:
      'Carriers, transporters, trade lanes, shipment volume, identifiers, milestone definitions and alert preferences.',
    closingTitle: 'See how Shipment Tracking can fit your workflow.',
  },

  'freight-intelligence': {
    slug: 'freight-intelligence',
    breadcrumb: 'Docsynecx Logistics / Freight Intelligence',
    moduleName: 'Freight Intelligence',
    iconName: 'diamond',
    eyebrow: 'DOCSYNECX LOGISTICS · MODULE',
    heroTitle: 'Build a clearer view of shipment costs, margins and performance.',
    heroDescription:
      'Freight Intelligence is the analytics layer planned to help forwarders understand shipment profitability, customer and carrier performance, cost variance and potential margin leakage. Scope and availability should be confirmed for each engagement.',
    primaryCtaText: 'Discuss this module ↗',
    secondaryCtaText: 'Explore Logistics platform',
    cardBadges: ['AI-assisted', 'Workflow status', 'Review ready'],
    capabilities: [
      {
        prefix: 'Shipment-level profitability',
        text: 'Shipment-level profitability and margin views',
      },
      {
        prefix: 'Quoted versus',
        text: 'Quoted versus actual cost variance analysis',
      },
      {
        prefix: 'Customer and',
        text: 'Customer and carrier performance insights',
      },
      {
        prefix: 'Operational trends',
        text: 'Operational trends across shipment and trade-lane data',
      },
      {
        prefix: 'Potential margin',
        text: 'Potential margin leakage indicators',
      },
      {
        prefix: 'Management reporting',
        text: 'Management reporting built from connected operational and financial data',
      },
    ],
    workflowSteps: [
      {
        number: 'STEP 01',
        title: 'Collect available quotation, shipment and cost data.',
        description: sharedLogisticsCopy.workflowStepDescription,
      },
      {
        number: 'STEP 02',
        title: 'Normalize key customer, carrier and shipment dimensions.',
        description: sharedLogisticsCopy.workflowStepDescription,
      },
      {
        number: 'STEP 03',
        title: 'Calculate agreed performance and profitability measures.',
        description: sharedLogisticsCopy.workflowStepDescription,
      },
      {
        number: 'STEP 04',
        title: 'Review trends and exceptions through management reports.',
        description: sharedLogisticsCopy.workflowStepDescription,
      },
    ],
    integrationsCopy:
      'Depends on the availability and quality of quotation, shipment, carrier and invoice data across connected systems.',
    scopingNeeds:
      'Data sources, cost components, margin model, customer/carrier dimensions, reporting cadence and required dashboards.',
    closingTitle: 'See how Freight Intelligence can fit your workflow.',
  },
};
