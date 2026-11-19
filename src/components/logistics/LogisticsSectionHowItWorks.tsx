'use client';

import React, { useRef, useState, type KeyboardEvent } from 'react';
import {
  Mail,
  Sparkles,
  Layers,
  CheckCircle2,
  ChevronRight,
  FileText,
  Ship,
  TrendingUp,
  FileCheck2,
  Check,
  CheckCheck,
  Plane,
  Anchor,
  Laptop,
  Boxes,
  Database,
  Search,
  Radio,
  BarChart3,
  DollarSign,
  AlertTriangle,
  type LucideIcon,
} from 'lucide-react';
import { type LogisticsModuleSlug } from '../../content/logistics';
import s from './EmailToBookingHowItWorks.module.css';

interface WorkflowStepConfig {
  stepNumber: string;
  name: string;
  title: string;
  description: string;
  icon: LucideIcon;
  floatingChips: Array<{ text: string; icon: LucideIcon; position: 'top-left' | 'top-right' }>;
  windowTitle: string;
  windowPill: string;
  bannerImage: string;
  bannerTag: string;
  bannerIcon: LucideIcon;
  rows: Array<{
    title: string;
    detail: string;
    icon: LucideIcon;
    statusPill?: string;
  }>;
  progressTitle: string;
  progressStatus: string;
  progressDetail: string;
  resultCallout: string;
}

const MODULE_WORKFLOWS: Record<LogisticsModuleSlug, WorkflowStepConfig[]> = {
  'email-to-booking': [
    {
      stepNumber: '01',
      name: 'Enquiry Arrival',
      title: 'Customer enquiry arrives by email.',
      description: 'Information moves to the next stage with visibility and review checkpoints.',
      icon: Mail,
      floatingChips: [
        { text: 'Packing_List.pdf', icon: FileText, position: 'top-right' },
        { text: 'Inbound Customer Email', icon: Mail, position: 'top-left' },
      ],
      windowTitle: 'Customer Enquiry Intake',
      windowPill: 'Automated Parsing',
      bannerImage: '/images/industry-logistics.jpg',
      bannerTag: 'Air & Ocean Freight Intake',
      bannerIcon: Plane,
      rows: [
        {
          title: 'Prime Importers Ltd · RFQ Ingestion',
          detail: 'Enquiry for 2x40’ HC Shanghai (CNSHA) → Rotterdam (NLRTM)',
          icon: FileText,
        },
        {
          title: 'Cargo Specification Extracted',
          detail: 'Auto Parts · 24,500 kg · Ready date: Nov 18 · Non-hazardous',
          icon: Boxes,
        },
      ],
      progressTitle: 'AI detail extraction complete',
      progressStatus: 'Review Ready',
      progressDetail: 'Origin · Destination · Equipment (40’ HC) · Commodity · Target sailing',
      resultCallout: 'Automated customer enquiry parsing with zero manual retyping.',
    },
    {
      stepNumber: '02',
      name: 'AI RFQ Preparation',
      title: 'AI reads details and prepares vendor RFQs.',
      description: 'Information moves to the next stage with visibility and review checkpoints.',
      icon: Sparkles,
      floatingChips: [
        { text: '4 Carrier RFQs', icon: Ship, position: 'top-right' },
        { text: 'Standard Template', icon: Sparkles, position: 'top-left' },
      ],
      windowTitle: 'Vendor RFQ Preparation',
      windowPill: 'Carriers Selected',
      bannerImage: '/images/hero-collage/ind-logistics-3.jpg',
      bannerTag: 'Ocean Carrier Network Dispatch',
      bannerIcon: Anchor,
      rows: [
        {
          title: 'Maersk Line · FCL 40’ HC',
          detail: 'Shanghai → Rotterdam · Configured template RFQ applied',
          icon: Ship,
          statusPill: 'Prepared',
        },
        {
          title: 'MSC Mediterranean · Direct Service',
          detail: 'Shanghai → Rotterdam · Spot & contract rate queried',
          icon: Ship,
          statusPill: 'Prepared',
        },
      ],
      progressTitle: 'Vendor rate requests formatted',
      progressStatus: 'Ready for Send',
      progressDetail: 'Standardized RFQs queued across approved carrier contacts',
      resultCallout: 'Multi-carrier rate requests generated using approved templates.',
    },
    {
      stepNumber: '03',
      name: 'Rate Comparison & Quote',
      title: 'Rates are compared and a quote is prepared.',
      description: 'Information moves to the next stage with visibility and review checkpoints.',
      icon: Layers,
      floatingChips: [
        { text: '15% Margin Applied', icon: TrendingUp, position: 'top-right' },
        { text: 'Rates Normalized', icon: Layers, position: 'top-left' },
      ],
      windowTitle: 'Rate Comparison & Quotation',
      windowPill: 'Best Option Ready',
      bannerImage: '/images/logistics-desk-card.jpg',
      bannerTag: 'Rate Analytics & Margin Rules',
      bannerIcon: Laptop,
      rows: [
        {
          title: 'Carrier Comparison Matrix',
          detail: 'Maersk $2,350 (28d) · MSC $2,420 (26d) · CMA $2,500 (24d)',
          icon: Layers,
        },
        {
          title: 'Margin Engine & Customer Pricing',
          detail: 'Base $2,350 + $352.50 (15% margin) = Total Quote $2,702.50',
          icon: TrendingUp,
        },
      ],
      progressTitle: 'Customer quotation prepared',
      progressStatus: 'Complete',
      progressDetail: 'Line-item charges · Validity dates · Free demurrage/detention terms included',
      resultCallout: 'Instant rate normalization and margin calculation with review controls.',
    },
    {
      stepNumber: '04',
      name: 'Booking & Handoff',
      title: 'Customer confirmation is received and booking is coordinated.',
      description: 'Information moves to the next stage with visibility and review checkpoints.',
      icon: CheckCircle2,
      floatingChips: [
        { text: 'Customer Confirmed', icon: CheckCircle2, position: 'top-right' },
        { text: 'Booking Coordinated', icon: Ship, position: 'top-left' },
      ],
      windowTitle: 'Booking Coordination & Handoff',
      windowPill: 'Review Checkpoint',
      bannerImage: '/images/hero-collage/ind-logistics-1.jpg',
      bannerTag: 'Operational Handoff & Confirmation',
      bannerIcon: Boxes,
      rows: [
        {
          title: 'Customer Acceptance Received',
          detail: 'Quotation #QT-9042 approved by customer via email',
          icon: CheckCircle2,
        },
        {
          title: 'Booking Coordinated & Email Drafted',
          detail: 'Reference #BKG-SHA-77291 · Acknowledgement email drafted',
          icon: FileText,
          statusPill: 'Operator Review',
        },
      ],
      progressTitle: 'Human review checkpoint ready',
      progressStatus: 'Verified',
      progressDetail: 'Operator confirms final booking details before carrier booking is confirmed',
      resultCallout: 'Seamless handoff from quote acceptance to booking with team in control.',
    },
  ],

  'shipment-operations': [
    {
      stepNumber: '01',
      name: 'Booking Intake',
      title: 'Accepted quote or booking is received.',
      description: 'Information moves to the next stage with visibility and review checkpoints.',
      icon: Mail,
      floatingChips: [
        { text: 'Accepted Quote #QT-9042', icon: FileText, position: 'top-right' },
        { text: 'Booking Instructions', icon: CheckCircle2, position: 'top-left' },
      ],
      windowTitle: 'Booking Intake & Verification',
      windowPill: 'Job Ingestion',
      bannerImage: '/images/industry-logistics.jpg',
      bannerTag: 'Operational Booking Receipt',
      bannerIcon: Plane,
      rows: [
        {
          title: 'Accepted Customer Quotation #QT-9042',
          detail: 'Shipper: Prime Components · Consignee: EuroAuto BV · 2x40’ HC',
          icon: FileText,
        },
        {
          title: 'Routing & Commercial Terms Validated',
          detail: 'FOB Shanghai → CIF Rotterdam · Agreed rate: $2,702.50',
          icon: CheckCircle2,
        },
      ],
      progressTitle: 'Quotation data converted into job records',
      progressStatus: 'Ready for Sync',
      progressDetail: 'Shipper, Consignee, Cargo Specs, Port Codes & Target Milestones mapped',
      resultCallout: 'Accepted quotation details converted directly into operational job records.',
    },
    {
      stepNumber: '02',
      name: 'System Sync',
      title: 'Job data is created or passed to the connected system.',
      description: 'Information moves to the next stage with visibility and review checkpoints.',
      icon: Database,
      floatingChips: [
        { text: 'CargoWise One Sync', icon: Database, position: 'top-right' },
        { text: 'Job #JOB-2026-8812', icon: FileCheck2, position: 'top-left' },
      ],
      windowTitle: 'Operating System Synchronization',
      windowPill: 'Two-Way Sync',
      bannerImage: '/images/logistics-desk-card.jpg',
      bannerTag: 'CargoWise / TMS Connectivity',
      bannerIcon: Laptop,
      rows: [
        {
          title: 'CargoWise One Forwarding Job #JOB-8812',
          detail: 'Department: Sea Freight Export · Billing profile & milestones active',
          icon: Database,
          statusPill: 'Created',
        },
        {
          title: 'Standalone Docsynecx Record',
          detail: 'Web tracking reference #DSX-9821 established with client portal access',
          icon: FileCheck2,
          statusPill: 'Active',
        },
      ],
      progressTitle: 'Operating system handoff verified',
      progressStatus: 'Connected',
      progressDetail: 'Job creation rules applied subject to customer CargoWise configuration',
      resultCallout: 'Job created in operating system with zero manual re-entry.',
    },
    {
      stepNumber: '03',
      name: 'Doc Extraction & Audit',
      title: 'Shipment documents are extracted and cross-checked.',
      description: 'Information moves to the next stage with visibility and review checkpoints.',
      icon: Layers,
      floatingChips: [
        { text: 'BL, PL & CI Extracted', icon: FileText, position: 'top-right' },
        { text: '3-Way Audit', icon: Layers, position: 'top-left' },
      ],
      windowTitle: 'Document Extraction & Cross-Check',
      windowPill: 'Audit Checkpoint',
      bannerImage: '/images/hero-collage/ind-logistics-3.jpg',
      bannerTag: 'Multi-Document Audit Matrix',
      bannerIcon: Anchor,
      rows: [
        {
          title: 'Bill of Lading vs Packing List Match',
          detail: 'Gross Weight (24,500 kg) & Seal #MSCU-0912 verified across docs',
          icon: Layers,
        },
        {
          title: 'Commercial Invoice Valuation Cross-Check',
          detail: 'Total value $94,500.00 matched against customs declared amounts',
          icon: CheckCircle2,
        },
      ],
      progressTitle: 'Cross-document discrepancy audit complete',
      progressStatus: 'Verified',
      progressDetail: '48 key fields compared across Bill of Lading, Packing List & Commercial Invoice',
      resultCallout: 'Key shipment fields cross-verified across all documents with discrepancy alerts.',
    },
    {
      stepNumber: '04',
      name: 'Operational Completion',
      title: 'Exceptions are reviewed and operational data is completed.',
      description: 'Information moves to the next stage with visibility and review checkpoints.',
      icon: CheckCircle2,
      floatingChips: [
        { text: 'Exceptions Resolved', icon: CheckCircle2, position: 'top-right' },
        { text: 'Customs Packet Ready', icon: FileText, position: 'top-left' },
      ],
      windowTitle: 'Operational Data Completion',
      windowPill: 'Review Ready',
      bannerImage: '/images/hero-collage/ind-logistics-1.jpg',
      bannerTag: 'Operational Sign-Off & AP Handoff',
      bannerIcon: Boxes,
      rows: [
        {
          title: 'Customs Declaration Packet Prepared',
          detail: 'Tariff code HS 8708.29 assembled for customs broker review',
          icon: FileText,
          statusPill: 'Ready',
        },
        {
          title: 'Carrier Invoice AP Handoff',
          detail: 'Carrier freight invoice ($2,420) extracted for downstream voucher match',
          icon: DollarSign,
          statusPill: 'Verified',
        },
      ],
      progressTitle: 'Human review checkpoint passed',
      progressStatus: 'Approved',
      progressDetail: 'Operator validation finalized before downstream operational release',
      resultCallout: 'Operational data completed with review checkpoints at every stage.',
    },
  ],

  'shipment-tracking': [
    {
      stepNumber: '01',
      name: 'Reference Capture',
      title: 'Shipment or container reference is captured.',
      description: 'Information moves to the next stage with visibility and review checkpoints.',
      icon: Search,
      floatingChips: [
        { text: 'Container #MSCU8921045', icon: Boxes, position: 'top-right' },
        { text: 'BL Ref: MSCUSHA98', icon: FileText, position: 'top-left' },
      ],
      windowTitle: 'Shipment Identifier Registration',
      windowPill: 'Reference Captured',
      bannerImage: '/images/industry-logistics.jpg',
      bannerTag: 'Container & Consignment Intake',
      bannerIcon: Plane,
      rows: [
        {
          title: 'Ocean Container Reference #MSCU8921045',
          detail: 'Vessel: MSC ISABELLA · Carrier: MSC · 40’ High Cube',
          icon: Boxes,
        },
        {
          title: 'Inland Road Consignment Linked',
          detail: 'Transporter LR #TR-8812 · Shanghai terminal gate-in transfer',
          icon: FileText,
        },
      ],
      progressTitle: 'Tracking references registered in system',
      progressStatus: 'Connected',
      progressDetail: 'Multi-modal carrier, container & transporter IDs linked to job record',
      resultCallout: 'Shipment references captured across ocean and road movements.',
    },
    {
      stepNumber: '02',
      name: 'Tracking Query',
      title: 'Tracking source is queried or updates are received.',
      description: 'Information moves to the next stage with visibility and review checkpoints.',
      icon: Radio,
      floatingChips: [
        { text: 'Carrier AIS Satellite', icon: Ship, position: 'top-right' },
        { text: 'Transporter Telematics', icon: Radio, position: 'top-left' },
      ],
      windowTitle: 'Data Source Ingestion & Query',
      windowPill: 'Feed Active',
      bannerImage: '/images/hero-collage/ind-logistics-3.jpg',
      bannerTag: 'Carrier API & Transporter Telemetry',
      bannerIcon: Anchor,
      rows: [
        {
          title: 'Carrier Satellite AIS Telemetry',
          detail: 'Vessel Speed: 18.4 kn · Position: East China Sea · Heading: 142°',
          icon: Ship,
          statusPill: 'Live',
        },
        {
          title: 'Ocean Terminal EDI Feed',
          detail: 'Shanghai Berth 4 discharge confirmed · Gate-out scheduled',
          icon: Radio,
          statusPill: 'Synced',
        },
      ],
      progressTitle: 'Supported tracking sources queried',
      progressStatus: 'Live Feed',
      progressDetail: 'Real-time status updates received from connected carrier APIs and transporters',
      resultCallout: 'Carrier data and transporter movements brought into one unified view.',
    },
    {
      stepNumber: '03',
      name: 'Milestones & ETA',
      title: 'Milestones and ETA are refreshed.',
      description: 'Information moves to the next stage with visibility and review checkpoints.',
      icon: Layers,
      floatingChips: [
        { text: 'Dynamic ETA: Dec 17', icon: TrendingUp, position: 'top-right' },
        { text: 'Milestones Refreshed', icon: Layers, position: 'top-left' },
      ],
      windowTitle: 'Milestone & ETA Calculation',
      windowPill: 'Refreshed',
      bannerImage: '/images/logistics-desk-card.jpg',
      bannerTag: 'Milestone Timeline & ETA Engine',
      bannerIcon: Laptop,
      rows: [
        {
          title: 'Port Milestone Timeline',
          detail: 'Departure: Nov 19 · Transshipment Singapore: Nov 29 · Arrival: Dec 17',
          icon: Layers,
        },
        {
          title: 'Dynamic ETA Recalculation',
          detail: 'Rotterdam ETA: Dec 17, 14:00 CET (adjusted for berth schedule)',
          icon: TrendingUp,
        },
      ],
      progressTitle: 'Milestone chronology & ETA refreshed',
      progressStatus: 'Up to Date',
      progressDetail: 'Timestamps updated across origin, voyage, transshipment and final arrival',
      resultCallout: 'Milestones and ETA updated in real time from connected sources.',
    },
    {
      stepNumber: '04',
      name: 'Status Alerts',
      title: 'Teams receive relevant status alerts.',
      description: 'Information moves to the next stage with visibility and review checkpoints.',
      icon: CheckCircle2,
      floatingChips: [
        { text: 'Delay Notification', icon: AlertTriangle, position: 'top-right' },
        { text: 'Team Alert Dispatched', icon: CheckCircle2, position: 'top-left' },
      ],
      windowTitle: 'Alert Rules & Visibility Distribution',
      windowPill: 'Alert Ready',
      bannerImage: '/images/hero-collage/ind-logistics-1.jpg',
      bannerTag: 'Operational Dashboard & Alerts',
      bannerIcon: Boxes,
      rows: [
        {
          title: 'Configured Exception Alert Triggered',
          detail: 'Port congestion notice: Transshipment dwell flagged for review',
          icon: AlertTriangle,
          statusPill: 'Dispatched',
        },
        {
          title: 'Centralized Operations Dashboard',
          detail: 'Shipment milestone reflected in live operations status board',
          icon: CheckCircle2,
          statusPill: 'Updated',
        },
      ],
      progressTitle: 'Notifications sent to configured stakeholders',
      progressStatus: 'Delivered',
      progressDetail: 'Operations teams and customer portals receive proactive milestone updates',
      resultCallout: 'Proactive status updates delivered to operations teams and customers.',
    },
  ],

  'freight-intelligence': [
    {
      stepNumber: '01',
      name: 'Data Collection',
      title: 'Collect available quotation, shipment and cost data.',
      description: 'Information moves to the next stage with visibility and review checkpoints.',
      icon: Database,
      floatingChips: [
        { text: 'Multi-System Ingestion', icon: Database, position: 'top-right' },
        { text: '1,240 Shipments Ingested', icon: BarChart3, position: 'top-left' },
      ],
      windowTitle: 'Operational Data Pipeline Ingestion',
      windowPill: 'Pipeline Active',
      bannerImage: '/images/industry-logistics.jpg',
      bannerTag: 'Enterprise Data Collection',
      bannerIcon: Plane,
      rows: [
        {
          title: 'Quotation & Pricing Repository',
          detail: 'Ingested 1,240 customer quotations and agreed margin parameters',
          icon: Database,
        },
        {
          title: 'TMS & Carrier Cost Invoices',
          detail: 'Connected CargoWise forwarding jobs & carrier billing invoices',
          icon: FileText,
        },
      ],
      progressTitle: 'Financial and operational data assembled',
      progressStatus: 'Connected',
      progressDetail: 'Quotation, shipment, carrier and invoice feeds brought into analytics layer',
      resultCallout: 'Available quotation, shipment and invoice data unified.',
    },
    {
      stepNumber: '02',
      name: 'Normalization',
      title: 'Normalize key customer, carrier and shipment dimensions.',
      description: 'Information moves to the next stage with visibility and review checkpoints.',
      icon: Layers,
      floatingChips: [
        { text: 'Dimensions Normalized', icon: Layers, position: 'top-right' },
        { text: 'Currency Harmonized', icon: DollarSign, position: 'top-left' },
      ],
      windowTitle: 'Dimensional Normalization Engine',
      windowPill: 'Harmonized',
      bannerImage: '/images/hero-collage/ind-logistics-3.jpg',
      bannerTag: 'Multi-Dimensional Data Cleaning',
      bannerIcon: Anchor,
      rows: [
        {
          title: 'Trade Lane & Equipment Standardization',
          detail: 'Normalized 40+ origin/dest ports and container TEU weight breaks',
          icon: Layers,
          statusPill: 'Standardized',
        },
        {
          title: 'Multi-Currency Conversion',
          detail: 'USD, EUR, and INR converted to base reporting currency with audit trail',
          icon: DollarSign,
          statusPill: 'Normalized',
        },
      ],
      progressTitle: 'Multidimensional harmonization complete',
      progressStatus: 'Normalized',
      progressDetail: 'Customer accounts, carrier codes, and trade corridors unified for analysis',
      resultCallout: 'Key customer, carrier and shipment dimensions harmonized.',
    },
    {
      stepNumber: '03',
      name: 'Profitability Measures',
      title: 'Calculate agreed performance and profitability measures.',
      description: 'Information moves to the next stage with visibility and review checkpoints.',
      icon: TrendingUp,
      floatingChips: [
        { text: 'Gross Profit: 16.2%', icon: TrendingUp, position: 'top-right' },
        { text: 'Carrier OTP: 92.4%', icon: BarChart3, position: 'top-left' },
      ],
      windowTitle: 'Profitability & Performance Analytics',
      windowPill: 'KPIs Computed',
      bannerImage: '/images/logistics-desk-card.jpg',
      bannerTag: 'Margin Analytics & Cost Variance',
      bannerIcon: Laptop,
      rows: [
        {
          title: 'Shipment-Level Gross Profitability',
          detail: 'Revenue $2,702.50 vs Cost $2,380.00 · Profit: $322.50 (Margin: 11.9%)',
          icon: TrendingUp,
        },
        {
          title: 'Quoted vs Actual Cost Variance',
          detail: 'Ocean freight variance: +$70.00 favorable · Zero margin leakage',
          icon: BarChart3,
        },
      ],
      progressTitle: 'Agreed performance algorithms calculated',
      progressStatus: 'Calculated',
      progressDetail: 'Shipment profit, cost variance, carrier reliability and margin leakage scored',
      resultCallout: 'Profitability, cost variance and carrier benchmarks calculated.',
    },
    {
      stepNumber: '04',
      name: 'Management Reporting',
      title: 'Review trends and exceptions through management reports.',
      description: 'Information moves to the next stage with visibility and review checkpoints.',
      icon: CheckCircle2,
      floatingChips: [
        { text: 'Executive MIS Ready', icon: FileCheck2, position: 'top-right' },
        { text: 'Management Review', icon: CheckCircle2, position: 'top-left' },
      ],
      windowTitle: 'Management Dashboards & Reporting',
      windowPill: 'Review Ready',
      bannerImage: '/images/hero-collage/ind-logistics-1.jpg',
      bannerTag: 'Executive MIS & Exception Packet',
      bannerIcon: Boxes,
      rows: [
        {
          title: 'Trade Lane Margin Leakage Report',
          detail: 'Identified $180 unbilled detention fee · Leakage flagged for billing',
          icon: AlertTriangle,
          statusPill: 'Actionable',
        },
        {
          title: 'Customer & Carrier Performance Scorecard',
          detail: 'Monthly executive MIS compiled with profitability rankings and OTP scores',
          icon: CheckCircle2,
          statusPill: 'Compiled',
        },
      ],
      progressTitle: 'Executive management reports ready',
      progressStatus: 'Delivered',
      progressDetail: 'Automated reporting delivered for weekly leadership reviews and margin controls',
      resultCallout: 'Actionable trends and exceptions delivered through management reports.',
    },
  ],
};

interface LogisticsSectionHowItWorksProps {
  slug: LogisticsModuleSlug;
}

export function LogisticsSectionHowItWorks({ slug }: LogisticsSectionHowItWorksProps) {
  const steps = MODULE_WORKFLOWS[slug] || MODULE_WORKFLOWS['email-to-booking'];
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      next = (index + 1) % steps.length;
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      next = (index + steps.length - 1) % steps.length;
    } else if (event.key === 'Home') {
      next = 0;
    } else if (event.key === 'End') {
      next = steps.length - 1;
    } else {
      return;
    }
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  const activeStep = steps[active];

  return (
    <section
      id="how-it-works"
      className={`${s.section} ${s.darkTheme}`}
      aria-labelledby="how-it-works-title"
    >
      <div className="site-shell">
        <div className={s.heading}>
          <p className={s.eyebrow}>HOW IT WORKS</p>
          <h2 id="how-it-works-title" className={s.headline}>
            A clear workflow, with people in control.
          </h2>
          <p className={s.intro}>
            Typical process flow. Exact steps are finalized during implementation discovery.
          </p>
        </div>

        <div className={s.workspace}>
          {/* Left Column: Interactive 4 Steps */}
          <div
            className={s.steps}
            role="tablist"
            aria-label="How it works workflow steps"
            aria-orientation="vertical"
          >
            {steps.map(({ name, stepNumber, title, description, icon: Icon }, index) => (
              <button
                key={stepNumber}
                type="button"
                role="tab"
                id={`workflow-step-${index}`}
                aria-controls={`workflow-preview-${index}`}
                aria-selected={active === index}
                tabIndex={active === index ? 0 : -1}
                ref={(element) => {
                  tabs.current[index] = element;
                }}
                onClick={() => setActive(index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                className={s.step}
              >
                <span className={s.stepNumber}>{stepNumber}</span>
                <span className={s.stepCopy}>
                  <span className={s.stepLabel}>
                    <Icon size={14} />
                    {name}
                  </span>
                  <strong>{title}</strong>
                  <span className={s.description}>{description}</span>
                </span>
                <ChevronRight className={s.stepArrow} size={16} />
              </button>
            ))}
          </div>

          {/* Right Column: Stage with Logistics Image & Window */}
          <div className={s.stage}>
            <div className={s.glow} aria-hidden="true" />
            <div className={s.preview} role="tabpanel" id={`workflow-preview-${active}`}>
              {/* Floating Chips */}
              {activeStep.floatingChips.map((chip, i) => {
                const ChipIcon = chip.icon;
                const posClass =
                  chip.position === 'top-right' ? s.chipTopRight : s.chipTopLeft;
                return (
                  <div key={i} className={`${s.floatingChip} ${posClass}`}>
                    <ChipIcon size={14} />
                    <span>{chip.text}</span>
                  </div>
                );
              })}

              <div className={s.window}>
                {/* Window Header */}
                <div className={s.windowHeader}>
                  <span>
                    <activeStep.icon size={16} />
                    {activeStep.windowTitle}
                  </span>
                  <span className={s.pill}>{activeStep.windowPill}</span>
                </div>

                {/* Logistics Image Banner inside Window */}
                <div className={s.imageBanner}>
                  <img
                    src={activeStep.bannerImage}
                    alt={activeStep.windowTitle}
                    className={s.bannerImg}
                    loading="lazy"
                  />
                  <div className={s.bannerOverlay}>
                    <span className={s.bannerTag}>
                      <activeStep.bannerIcon size={13} /> {activeStep.bannerTag}
                    </span>
                  </div>
                </div>

                {/* Document / Stage Data Rows */}
                <div className={s.documentList}>
                  {activeStep.rows.map((row, i) => {
                    const RowIcon = row.icon;
                    return (
                      <div key={i} className={s.documentRow}>
                        <span className={s.documentIcon}>
                          <RowIcon size={18} />
                        </span>
                        <div>
                          <strong>{row.title}</strong>
                          <small>{row.detail}</small>
                        </div>
                        {row.statusPill ? (
                          <span className={s.pill}>{row.statusPill}</span>
                        ) : (
                          <Check size={16} />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Extraction / Progress Bar */}
                <div className={s.extraction}>
                  <div className={s.extractionHeader}>
                    <Sparkles size={14} />
                    <strong>{activeStep.progressTitle}</strong>
                    <span>{activeStep.progressStatus}</span>
                  </div>
                  <div className={s.progress}>
                    <span className={s.progressBar} />
                  </div>
                  <p>{activeStep.progressDetail}</p>
                </div>

                {/* Window Footer */}
                <div className={s.windowFooter}>
                  <FileCheck2 size={14} />
                  <span>Information moves to the next stage with visibility and review checkpoints.</span>
                  <ChevronRight size={14} />
                </div>
              </div>

              {/* Result Callout Takeaway */}
              <div className={s.result}>
                <CheckCheck size={16} />
                <span>{activeStep.resultCallout}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LogisticsSectionHowItWorks;
