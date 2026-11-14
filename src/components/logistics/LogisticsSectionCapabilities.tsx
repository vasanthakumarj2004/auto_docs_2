'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Check,
  ArrowRight,
  Sparkles,
  User,
  Paperclip,
  Database,
  Layers,
  CheckCircle2,
  TrendingUp,
  MailCheck,
  Ship,
  FileText,
  Boxes,
  Anchor,
  AlertTriangle,
  Radio,
  BarChart3,
  ShieldCheck,
  DollarSign,
  type LucideIcon,
} from 'lucide-react';
import { type LogisticsSlug } from '../../content/logistics';
import styles from './EmailToBookingCapabilities.module.css';

interface CapabilityTab {
  id: string;
  title: string;
  agentName: string;
  image: string;
  specifics: string;
  capabilities: Array<{ prefix: string; text: string }>;
  dialogue: {
    customerBubble?: {
      label: string;
      text: string;
      attachment?: string;
    };
    agentActions: Array<{
      variant?: 'default' | 'rate' | 'success';
      icon: 'database' | 'layers' | 'trending' | 'check' | 'sparkles' | 'mail' | 'ship' | 'file' | 'alert' | 'radio' | 'chart' | 'dollar';
      header: string;
      text: string;
    }>;
  };
}

const MODULE_CAPABILITIES: Record<LogisticsSlug, CapabilityTab[]> = {
  'email-to-booking': [
    {
      id: 'intake',
      title: 'Enquiry & Intake',
      agentName: 'Enquiry Intake Agent',
      image: '/images/hero-collage/ind-logistics-1.jpg',
      specifics:
        'Read incoming enquiry emails • PDF & Excel attachment parsing • Extract ports & cargo • Identify missing data gaps',
      capabilities: [
        {
          prefix: 'Read incoming',
          text: 'Read incoming customer enquiry emails and supported attachments',
        },
        {
          prefix: 'Identify shipment',
          text: 'Identify shipment details and information gaps',
        },
      ],
      dialogue: {
        customerBubble: {
          label: 'Customer Enquiry',
          text: "“RFQ: Need urgent quotation for 2x40' HC from Shanghai to Rotterdam, ready next Tuesday. Please share rates & earliest sailing.”",
          attachment: 'Packing_List_CN24.pdf (24,500 kg · Auto Parts)',
        },
        agentActions: [
          {
            variant: 'default',
            icon: 'database',
            header: 'AI Extraction',
            text: "Read email & parsed PDF: 2x40' HC · Shanghai (CNSHA) → Rotterdam (NLRTM) · Ready Nov 18 · 24.5 MT Auto Parts.",
          },
          {
            variant: 'rate',
            icon: 'sparkles',
            header: 'Gap Check & Validation',
            text: 'Validated commodity codes; flagged missing consignee customs broker code for review.',
          },
        ],
      },
    },
    {
      id: 'rates',
      title: 'Vendor Rate Discovery',
      agentName: 'Vendor Rate Discovery Agent',
      image: '/images/hero-collage/ind-logistics-3.jpg',
      specifics:
        'Automated vendor RFQs • Multi-carrier rate & transit comparison • Carrier recommendation • Negotiation workflows',
      capabilities: [
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
      ],
      dialogue: {
        customerBubble: {
          label: 'Carrier RFQ Automation',
          text: 'Dispatched configured RFQ templates to preferred ocean carriers for Shanghai → Rotterdam corridor.',
        },
        agentActions: [
          {
            variant: 'default',
            icon: 'layers',
            header: 'Rate Comparison Matrix',
            text: 'Maersk: $2,350 (28d) · MSC: $2,420 (26d) · CMA CGM: $2,500 (24d) · ONE: $2,440 (27d).',
          },
          {
            variant: 'rate',
            icon: 'sparkles',
            header: 'Vendor Recommendation & Negotiation',
            text: 'Recommended MSC for optimal reliability; drafted volume-concession negotiation email.',
          },
        ],
      },
    },
    {
      id: 'quotation',
      title: 'Customer Quotation & Booking',
      agentName: 'Quotation & Booking Agent',
      image: '/images/logistics-desk-card.jpg',
      specifics:
        'Configurable margin calculation • Branded quotation PDF drafting • Booking coordination • Acknowledgement emails',
      capabilities: [
        {
          prefix: 'Prepare customer',
          text: 'Prepare customer quotations with configured margin inputs',
        },
        {
          prefix: 'Draft customer',
          text: 'Draft customer acknowledgement and booking-related emails',
        },
      ],
      dialogue: {
        agentActions: [
          {
            variant: 'default',
            icon: 'trending',
            header: 'Margin Engine',
            text: 'Applied configured 15% target margin to selected base rate ($2,350 base + $352.50 = $2,702.50 quote).',
          },
          {
            variant: 'rate',
            icon: 'mail',
            header: 'Quotation Document Generation',
            text: 'Prepared customer quotation with line-item breakdown, free detention days, and 14-day validity.',
          },
          {
            variant: 'success',
            icon: 'check',
            header: '✓ Ready For Review',
            text: 'Customer quotation & booking acknowledgement email drafted. Ready for human sign-off.',
          },
        ],
      },
    },
  ],

  'shipment-operations': [
    {
      id: 'job-creation',
      title: 'Job Creation & System Sync',
      agentName: 'Job Orchestration Agent',
      image: '/images/industry-logistics.jpg',
      specifics:
        'Accepted quote conversion • CargoWise job mapping • Standalone shipment records • Operational handoff',
      capabilities: [
        {
          prefix: 'Convert accepted',
          text: 'Convert accepted quotation details into shipment or job records',
        },
        {
          prefix: 'Maintain standalone',
          text: 'Maintain standalone Docsynecx shipment records or integrate with CargoWise subject to scope',
        },
      ],
      dialogue: {
        customerBubble: {
          label: 'Customer Booking Acceptance',
          text: '“Quotation #QT-9042 confirmed. Booking 2x40’ HC for Auto Parts ex-Shanghai on earliest sailing.”',
        },
        agentActions: [
          {
            variant: 'default',
            icon: 'database',
            header: 'CargoWise One Job Creation',
            text: 'Forwarding Job #JOB-2026-8812 created in CargoWise with customer milestones and routing orders.',
          },
          {
            variant: 'success',
            icon: 'check',
            header: '✓ Standalone Sync Verified',
            text: 'Docsynecx shipment record established with real-time operational status tracking.',
          },
        ],
      },
    },
    {
      id: 'doc-extraction',
      title: 'Multi-Doc Extraction & Audit',
      agentName: 'Document Cross-Check Agent',
      image: '/images/hero-collage/ind-logistics-3.jpg',
      specifics:
        'BL, Packing List & Invoice parsing • Field cross-matching • Gross weight & piece verification • Mismatch alerts',
      capabilities: [
        {
          prefix: 'Extract information',
          text: 'Extract information from Bill of Lading, Packing List and Commercial Invoice',
        },
        {
          prefix: 'Compare key',
          text: 'Compare key shipment fields across documents and flag mismatches',
        },
      ],
      dialogue: {
        customerBubble: {
          label: 'Trade Documents Intake',
          text: 'Bill of Lading, Packing List, and Commercial Invoice received for container #MSCU8921045.',
          attachment: 'BL_MSCU8921.pdf + Packing_List.xlsx + CI_9812.pdf',
        },
        agentActions: [
          {
            variant: 'default',
            icon: 'file',
            header: 'OCR & Multi-Doc Data Extraction',
            text: 'Extracted 48 key fields: Shipper, Consignee, HS Codes, Gross Weights, Seal Numbers & Line Items.',
          },
          {
            variant: 'rate',
            icon: 'alert',
            header: '3-Way Discrepancy Flagged',
            text: 'Field cross-check: 47 fields match. Mismatch held for review: CI states 420 pkgs, BL states 425 pkgs.',
          },
        ],
      },
    },
    {
      id: 'customs-ap',
      title: 'Customs & Invoice Reconciliation',
      agentName: 'Compliance & AP Agent',
      image: '/images/logistics-desk-card.jpg',
      specifics:
        'Customs declaration preparation • Review-ready filing packets • Supplier invoice extraction • Downstream AP matching',
      capabilities: [
        {
          prefix: 'Prepare customs',
          text: 'Prepare customs declaration data for review; direct filing is not implied',
        },
        {
          prefix: 'Extract supplier',
          text: 'Extract supplier and carrier invoices for downstream reconciliation',
        },
      ],
      dialogue: {
        agentActions: [
          {
            variant: 'default',
            icon: 'database',
            header: 'Customs Declaration Data Assembly',
            text: 'Assembled tariff classification (HS 8708.29), commercial valuation, and origin packets for customs broker review.',
          },
          {
            variant: 'rate',
            icon: 'dollar',
            header: 'Carrier Invoice AP Extraction',
            text: 'Extracted ocean freight invoice ($2,420.00); reconciled against estimated booking cost with zero variance.',
          },
          {
            variant: 'success',
            icon: 'check',
            header: '✓ Operational Data Complete',
            text: 'Exceptions reviewed and operational records finalized. Downstream accounting vouchers ready.',
          },
        ],
      },
    },
  ],

  'shipment-tracking': [
    {
      id: 'ocean-road',
      title: 'Ocean & Road Tracking',
      agentName: 'Multi-Modal Tracking Agent',
      image: '/images/hero-collage/ind-logistics-3.jpg',
      specifics:
        'Vessel AIS & satellite sync • Container milestone tracking • Transporter GPS & road movement updates',
      capabilities: [
        {
          prefix: 'Ocean vessel',
          text: 'Ocean vessel and container tracking through supported data sources',
        },
        {
          prefix: 'Road shipment',
          text: 'Road shipment tracking using available transporter updates',
        },
      ],
      dialogue: {
        customerBubble: {
          label: 'Tracking Reference Input',
          text: '“Track Container #MSCU8921045 on MSC ISABELLA (IMO 9839284) ex-Shanghai to Rotterdam.”',
        },
        agentActions: [
          {
            variant: 'default',
            icon: 'ship',
            header: 'Ocean Vessel AIS Satellite Sync',
            text: 'Vessel position confirmed: East China Sea (31.2° N, 122.5° E). Speed: 18.4 knots. Heading: 142°.',
          },
          {
            variant: 'rate',
            icon: 'radio',
            header: 'Road Transporter GPS Integration',
            text: 'Connected road transporter telematics for inland container delivery leg (vehicle #TN-38-BZ-4921).',
          },
        ],
      },
    },
    {
      id: 'milestones-eta',
      title: 'Milestones & Dynamic ETA',
      agentName: 'Milestone & ETA Engine',
      image: '/images/industry-logistics.jpg',
      specifics:
        'Port departure to delivery stages • Dynamic ETA calculation • Berth & terminal timestamps • Gate-in/Gate-out tracking',
      capabilities: [
        {
          prefix: 'Milestone visibility',
          text: 'Milestone visibility across agreed shipment stages',
        },
        {
          prefix: 'ETA updates',
          text: 'ETA updates when supplied by connected sources',
        },
      ],
      dialogue: {
        agentActions: [
          {
            variant: 'default',
            icon: 'layers',
            header: 'Milestone Chronology Refreshed',
            text: 'Gate-In Port: Nov 17 · Vessel Departure: Nov 19 04:30 UTC · Singapore Transshipment: Nov 29.',
          },
          {
            variant: 'rate',
            icon: 'trending',
            header: 'Dynamic ETA Recalculation',
            text: 'Rotterdam arrival timestamp refreshed: Dec 17, 14:00 CET (re-estimated based on terminal schedule).',
          },
        ],
      },
    },
    {
      id: 'alerts-visibility',
      title: 'Centralized Visibility & Alerts',
      agentName: 'Visibility & Alert Agent',
      image: '/images/logistics-desk-card.jpg',
      specifics:
        'Exception alerts • Transshipment delay notices • Unified operational dashboard • Proactive customer notifications',
      capabilities: [
        {
          prefix: 'Alerts and',
          text: 'Alerts and notifications for selected status changes',
        },
        {
          prefix: 'Centralized shipment',
          text: 'Centralized shipment status view for operations teams',
        },
      ],
      dialogue: {
        customerBubble: {
          label: 'Automated Status Alert',
          text: 'Proactive Notification: “MSC ISABELLA departed Shanghai terminal on schedule. Next milestone: Singapore transit.”',
        },
        agentActions: [
          {
            variant: 'default',
            icon: 'alert',
            header: 'Exception & Delay Monitoring',
            text: 'Monitoring 24 global carriers and transporters for weather, congestion, and berth changes.',
          },
          {
            variant: 'success',
            icon: 'check',
            header: '✓ Centralized Operations View',
            text: 'Single operational dashboard updated with live container telemetry for operations teams.',
          },
        ],
      },
    },
  ],

  'freight-intelligence': [
    {
      id: 'profitability',
      title: 'Profitability & Cost Variance',
      agentName: 'Profitability Analytics Agent',
      image: '/images/logistics-desk-card.jpg',
      specifics:
        'Shipment-level P&L • Quoted vs actual ocean/air cost variance • Demurrage & accessorial cost impact',
      capabilities: [
        {
          prefix: 'Shipment-level profitability',
          text: 'Shipment-level profitability and margin views',
        },
        {
          prefix: 'Quoted versus',
          text: 'Quoted versus actual cost variance analysis',
        },
      ],
      dialogue: {
        customerBubble: {
          label: 'Shipment P&L Query',
          text: 'Analysis for Job #JOB-2026-8812 (Shanghai → Rotterdam · 2x40’ HC · Prime Importers Ltd).',
        },
        agentActions: [
          {
            variant: 'default',
            icon: 'dollar',
            header: 'Revenue vs Actual Cost Variance',
            text: 'Quoted revenue: $2,702.50 | Carrier invoice: $2,380.00 | Net profit: $322.50 (Margin: 11.9%).',
          },
          {
            variant: 'rate',
            icon: 'trending',
            header: 'Cost Variance Breakdown',
            text: 'Ocean base variance: +$70.00 favorable | Fuel adjustment variance: $0.00 | Margin targets fulfilled.',
          },
        ],
      },
    },
    {
      id: 'leakage-trends',
      title: 'Margin Leakage & Trends',
      agentName: 'Leakage Detection & Trends Agent',
      image: '/images/hero-collage/ind-logistics-3.jpg',
      specifics:
        'Margin leakage alerts • Unbilled accessorial detection • Trade-lane volume & rate trends • Transit time variance',
      capabilities: [
        {
          prefix: 'Operational trends',
          text: 'Operational trends across shipment and trade-lane data',
        },
        {
          prefix: 'Potential margin',
          text: 'Potential margin leakage indicators',
        },
      ],
      dialogue: {
        agentActions: [
          {
            variant: 'rate',
            icon: 'alert',
            header: 'Margin Leakage Indicator Flagged',
            text: 'Detected unbilled carrier detention charge ($180.00) not passed through to customer billing.',
          },
          {
            variant: 'default',
            icon: 'chart',
            header: 'Trade-Lane Operational Trends',
            text: 'Asia–Europe lane analysis: Average freight cost reduced by 3.8% over Q3; transit duration steady at 26 days.',
          },
        ],
      },
    },
    {
      id: 'customer-carrier',
      title: 'Customer & Carrier Insights',
      agentName: 'Commercial Intelligence Agent',
      image: '/images/hero-collage/ind-logistics-1.jpg',
      specifics:
        'Carrier on-time reliability scoring • Customer contribution & volume ranking • Automated executive MIS reporting',
      capabilities: [
        {
          prefix: 'Customer and',
          text: 'Customer and carrier performance insights',
        },
        {
          prefix: 'Management reporting',
          text: 'Management reporting built from connected operational and financial data',
        },
      ],
      dialogue: {
        agentActions: [
          {
            variant: 'default',
            icon: 'chart',
            header: 'Carrier Reliability Benchmarking',
            text: 'On-time arrival rankings: Maersk Line (93.4%), MSC (91.2%), CMA CGM (88.7%).',
          },
          {
            variant: 'rate',
            icon: 'trending',
            header: 'Customer Contribution Scoring',
            text: 'Prime Importers ranked Tier-1: 94 shipments/yr, 14.8% average gross margin.',
          },
          {
            variant: 'success',
            icon: 'check',
            header: '✓ Executive Management Reporting',
            text: 'Unified monthly MIS packet compiled from operational CargoWise and financial data.',
          },
        ],
      },
    },
  ],
};

interface LogisticsSectionCapabilitiesProps {
  slug: LogisticsSlug;
}

export function LogisticsSectionCapabilities({ slug }: LogisticsSectionCapabilitiesProps) {
  const tabs = MODULE_CAPABILITIES[slug] || MODULE_CAPABILITIES['email-to-booking'];
  const [activeTabId, setActiveTabId] = useState<string>(tabs[0].id);
  const [showAll, setShowAll] = useState(false);

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  const renderIcon = (type: string) => {
    switch (type) {
      case 'database':
        return <Database size={13} aria-hidden="true" />;
      case 'layers':
        return <Layers size={13} aria-hidden="true" />;
      case 'trending':
        return <TrendingUp size={13} aria-hidden="true" />;
      case 'mail':
        return <MailCheck size={13} aria-hidden="true" />;
      case 'check':
        return <CheckCircle2 size={13} aria-hidden="true" />;
      case 'ship':
        return <Ship size={13} aria-hidden="true" />;
      case 'file':
        return <FileText size={13} aria-hidden="true" />;
      case 'alert':
        return <AlertTriangle size={13} aria-hidden="true" />;
      case 'radio':
        return <Radio size={13} aria-hidden="true" />;
      case 'chart':
        return <BarChart3 size={13} aria-hidden="true" />;
      case 'dollar':
        return <DollarSign size={13} aria-hidden="true" />;
      default:
        return <Sparkles size={13} aria-hidden="true" />;
    }
  };

  return (
    <section id="capabilities" className={styles.darkSection} aria-labelledby="capabilities-title">
      <div className="site-shell">
        <div className={styles.layoutGrid}>
          {/* Left Column: Interactive Controller */}
          <div className={styles.leftCol}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              <span>WHAT IT HELPS YOUR TEAM DO</span>
            </div>

            <h2 id="capabilities-title" className={styles.headline}>
              Purpose-built capabilities for everyday operations.
            </h2>

            <p className={styles.description}>
              Configure the workflow around your document types, business rules, review process and
              connected systems.
            </p>

            {/* Vertical Typographic Tabs */}
            <div className={styles.tabsList} role="tablist" aria-label="Capabilities workflow stages">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTabId === tab.id}
                  className={styles.tabButton}
                  data-active={activeTabId === tab.id}
                  onClick={() => {
                    setActiveTabId(tab.id);
                    setShowAll(false);
                  }}
                >
                  <span className={styles.tabIndicator} aria-hidden="true" />
                  <span>{tab.title}</span>
                </button>
              ))}
            </div>

            {/* Capabilities List */}
            <div style={{ marginBottom: '24px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '14px',
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 650,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#94a3b8',
                  }}
                >
                  {showAll
                    ? 'All Purpose-Built Capabilities'
                    : `${activeTab.title} Capabilities (${activeTab.capabilities.length})`}
                </span>
                <button
                  type="button"
                  onClick={() => setShowAll(!showAll)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--color-brand, #18cb96)',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    padding: 0,
                  }}
                >
                  {showAll ? 'View by active stage' : 'View all at once'}
                </button>
              </div>

              <ul className={styles.tabChecklist} aria-label="Capabilities list">
                {(showAll ? tabs.flatMap((t) => t.capabilities) : activeTab.capabilities).map(
                  (cap) => (
                    <li key={cap.prefix} className={styles.checkItem}>
                      <span className={styles.checkIcon} aria-hidden="true">
                        <Check size={12} className="stroke-[2.5]" />
                      </span>
                      <span>
                        <strong>{cap.prefix}</strong> — {cap.text}
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>

            <Link href="/demo/#demo-form" className={styles.ctaButton}>
              <span>Discuss this capability</span>
              <ArrowRight size={14} aria-hidden="true" />
            </Link>

            {/* Specifics Point Strip */}
            <div className={styles.specificsStrip}>
              <p className={styles.specificsEyebrow}>{activeTab.agentName}</p>
              <p className={styles.specificsText}>{activeTab.specifics}</p>
            </div>
          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className={styles.visualCard} role="region" aria-label="Live workflow preview">
            {/* Background Image with Cinematic Scrim */}
            <div className={styles.bgImageWrapper}>
              <img
                src={activeTab.image}
                alt={activeTab.title}
                className={styles.bgImage}
                loading="lazy"
              />
              <div className={styles.bgScrim} />
            </div>

            {/* Card Header with Live Status Dot */}
            <div className={styles.cardHeader}>
              <span className={styles.agentBadge}>
                <span className={styles.pulseDot} aria-hidden="true" />
                {activeTab.agentName}
              </span>
              <span style={{ fontSize: '11px', color: '#94a3b8', letterSpacing: '0.04em' }}>
                AI-Assisted Workflow
              </span>
            </div>

            {/* Floating Dialogue and Action Stack */}
            <div className={styles.dialogueStack}>
              {activeTab.dialogue.customerBubble && (
                <div className={styles.customerBubble}>
                  <div className={styles.customerBubbleLabel}>
                    <User size={12} aria-hidden="true" />
                    <span>{activeTab.dialogue.customerBubble.label}</span>
                  </div>
                  <p className={styles.customerBubbleText}>
                    {activeTab.dialogue.customerBubble.text}
                  </p>
                  {activeTab.dialogue.customerBubble.attachment && (
                    <div className={styles.customerAttachment}>
                      <Paperclip size={12} aria-hidden="true" />
                      <span>{activeTab.dialogue.customerBubble.attachment}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Agent Actions */}
              {activeTab.dialogue.agentActions.map((action, index) => (
                <div
                  key={index}
                  className={styles.agentPill}
                  data-variant={action.variant || 'default'}
                >
                  <div className={styles.agentPillHeader}>
                    {renderIcon(action.icon)}
                    <span>{action.header}</span>
                  </div>
                  <p className={styles.agentPillText}>{action.text}</p>
                </div>
              ))}
            </div>

            {/* Card Footer Interactive Pill */}
            <div className={styles.cardFooter}>
              <div className={styles.interactivePrompt}>
                <Sparkles size={14} aria-hidden="true" />
                <span>Review ready · Operator in control</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LogisticsSectionCapabilities;
