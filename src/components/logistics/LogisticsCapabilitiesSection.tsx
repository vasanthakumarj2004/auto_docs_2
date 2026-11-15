'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  FileText,
  FileSpreadsheet,
  Check,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  AlertTriangle,
  Send,
  Ship,
  TrendingUp,
  Boxes,
  DollarSign,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Radio,
  BarChart3,
  Sparkles,
  Database,
  Search,
  ExternalLink,
  Clock,
  MapPin,
  Anchor,
  Compass,
} from 'lucide-react';
import { type LogisticsSlug } from '../../content/logistics';
import s from './LogisticsCapabilitiesSection.module.css';

interface CapabilityStep {
  stepNum: string;
  shortLabel: string;
  subLabel: string;
  headline: string;
  description: string;
}

interface LogisticsModuleCapabilities {
  railHeader: string;
  eyebrow: string;
  mainTitle: string;
  mainSubtitle: string;
  steps: CapabilityStep[];
}

export const CAPABILITIES_DATA: Record<LogisticsSlug, LogisticsModuleCapabilities> = {
  'email-to-booking': {
    railHeader: 'ENQUIRY RECEIVED · QUOTE PENDING',
    eyebrow: 'WHAT IT HELPS YOUR TEAM DO',
    mainTitle: 'Purpose-built capabilities for everyday operations.',
    mainSubtitle:
      'Configure the workflow around your document types, business rules, review process and connected systems.',
    steps: [
      {
        stepNum: 'STEP 1 OF 7',
        shortLabel: 'READ INCOMING',
        subLabel: 'Inbox read',
        headline: 'Read incoming customer enquiry emails and supported attachments',
        description:
          'Automatically ingest RFQ emails from customer sales inboxes, reading both the message body and supported attachments like packing lists and Excel spreadsheets.',
      },
      {
        stepNum: 'STEP 2 OF 7',
        shortLabel: 'IDENTIFY SHIPMENT',
        subLabel: 'Gaps flagged',
        headline: 'Identify shipment details and information gaps',
        description:
          'Extract vital freight parameters across equipment, origin/destination ports, and ready dates, while proactively flagging missing cargo details before carrier queries.',
      },
      {
        stepNum: 'STEP 3 OF 7',
        shortLabel: 'PREPARE VENDOR',
        subLabel: 'RFQs drafted',
        headline: 'Prepare vendor rate request emails using configured templates',
        description:
          'Instantly assemble standardized RFQ request emails to selected carrier and vendor partners with equipment specifications and corridor parameters.',
      },
      {
        stepNum: 'STEP 4 OF 7',
        shortLabel: 'COMPARE VENDOR',
        subLabel: 'Rates side by side',
        headline: 'Compare vendor rates, transit times and response details',
        description:
          'Parse incoming carrier rate quotations into a normalized side-by-side comparison matrix, automatically highlighting the most cost-effective and fastest options.',
      },
      {
        stepNum: 'STEP 5 OF 7',
        shortLabel: 'SUPPORT VENDOR',
        subLabel: 'Negotiation help',
        headline: 'Support vendor recommendations and email negotiation workflows',
        description:
          'Generate data-backed carrier recommendations and draft intelligent volume counter-offers to negotiate sharper buy rates before customer pricing.',
      },
      {
        stepNum: 'STEP 6 OF 7',
        shortLabel: 'PREPARE CUSTOMER',
        subLabel: 'Quote with margin',
        headline: 'Prepare customer quotations with configured margin inputs',
        description:
          'Calculate customer sell rates dynamically by applying your target commercial margins over selected carrier buy costs with interactive control.',
      },
      {
        stepNum: 'STEP 7 OF 7',
        shortLabel: 'DRAFT CUSTOMER',
        subLabel: 'You approve',
        headline: 'Draft customer acknowledgement and booking-related emails',
        description:
          'Assemble clean, professional customer quote responses and booking confirmations. Operators review and sign off before anything is dispatched.',
      },
    ],
  },

  'shipment-operations': {
    railHeader: 'BOOKING ACCEPTED · JOB IN PROGRESS',
    eyebrow: 'WHAT IT HELPS YOUR TEAM DO',
    mainTitle: 'Purpose-built capabilities for everyday operations.',
    mainSubtitle:
      'Configure the workflow around your document types, business rules, review process and connected systems.',
    steps: [
      {
        stepNum: 'STEP 1 OF 6',
        shortLabel: 'CONVERT ACCEPTED',
        subLabel: 'Job created',
        headline: 'Convert accepted quotation details into shipment or job records',
        description:
          'Automatically convert approved customer quotations into operational shipment jobs, pre-populating cargo specifications, routing parameters, and commercial terms without retyping.',
      },
      {
        stepNum: 'STEP 2 OF 6',
        shortLabel: 'MAINTAIN STANDALONE',
        subLabel: 'CargoWise sync',
        headline: 'Maintain standalone Docsynecx shipment records or integrate with CargoWise',
        description:
          'Manage shipment milestones directly within Docsynecx as an operational control tower or synchronize bidirectionally into CargoWise One subject to scope.',
      },
      {
        stepNum: 'STEP 3 OF 6',
        shortLabel: 'EXTRACT INFORMATION',
        subLabel: 'Multi-doc Extraction',
        headline: 'Extract information from Bill of Lading, Packing List and Commercial Invoice',
        description:
          'Intelligently ingest unstructured PDF and Excel shipping documents, extracting over 45 essential freight fields with automated parsing and data harmonization.',
      },
      {
        stepNum: 'STEP 4 OF 6',
        shortLabel: 'COMPARE KEY',
        subLabel: 'Mismatch flagged',
        headline: 'Compare key shipment fields across documents and flag mismatches',
        description:
          'Perform automated 3-way reconciliation across commercial trade documents to catch discrepancies in piece counts, gross weights, or consignee details before customs filing.',
      },
      {
        stepNum: 'STEP 5 OF 6',
        shortLabel: 'PREPARE CUSTOMS',
        subLabel: 'Filing packet',
        headline: 'Prepare customs declaration data for review; direct filing is not implied',
        description:
          'Assemble validated tariff classifications (HS codes), commercial valuations, and country-of-origin documentation packets ready for licensed customs broker submission.',
      },
      {
        stepNum: 'STEP 6 OF 6',
        shortLabel: 'EXTRACT SUPPLIER',
        subLabel: 'AP reconciliation',
        headline: 'Extract supplier and carrier invoices for downstream reconciliation',
        description:
          'Parse incoming carrier ocean freight invoices and ancillary supplier bills to match against estimated booking costs and prevent margin leakage.',
      },
    ],
  },

  'shipment-tracking': {
    railHeader: 'IN TRANSIT · MILESTONES MONITORED',
    eyebrow: 'WHAT IT HELPS YOUR TEAM DO',
    mainTitle: 'Purpose-built capabilities for everyday operations.',
    mainSubtitle:
      'Configure the workflow around your document types, business rules, review process and connected systems.',
    steps: [
      {
        stepNum: 'STEP 1 OF 6',
        shortLabel: 'OCEAN TRACKING',
        subLabel: 'Vessel AIS',
        headline: 'Ocean vessel and container tracking through supported data sources',
        description:
          'Track container ships globally using real-time satellite AIS telemetry, providing live vessel coordinates, speed, heading, and distance to destination.',
      },
      {
        stepNum: 'STEP 2 OF 6',
        shortLabel: 'ROAD TRACKING',
        subLabel: 'Transporter GPS',
        headline: 'Road shipment tracking using available transporter updates',
        description:
          'Capture telematics and GPS milestones from inland road hauliers and container truckers, monitoring container transit from port CFS to inland warehouse.',
      },
      {
        stepNum: 'STEP 3 OF 6',
        shortLabel: 'MILESTONE VISIBILITY',
        subLabel: 'Agreed stages',
        headline: 'Milestone visibility across agreed shipment stages',
        description:
          'Unify port terminal timestamps, customs release dates, departure events, and transshipment hubs into a single chronological milestone timeline.',
      },
      {
        stepNum: 'STEP 4 OF 6',
        shortLabel: 'DYNAMIC ETA',
        subLabel: 'Re-estimated',
        headline: 'ETA updates when supplied by connected sources',
        description:
          'Continuously recalculate predictive arrival timestamps based on terminal berth delays, transshipment dwell times, and ocean corridor congestion.',
      },
      {
        stepNum: 'STEP 5 OF 6',
        shortLabel: 'PROACTIVE ALERTS',
        subLabel: 'Status notices',
        headline: 'Alerts and notifications for selected status changes',
        description:
          'Automatically dispatch proactive email or WhatsApp notifications to shippers and consignees when critical shipment milestones or schedule revisions occur.',
      },
      {
        stepNum: 'STEP 6 OF 6',
        shortLabel: 'OPERATIONS VIEW',
        subLabel: 'Control tower',
        headline: 'Centralized shipment status view for operations teams',
        description:
          'Consolidate active multi-modal freight operations into a single operational dashboard, providing teams with real-time status and exception monitoring.',
      },
    ],
  },

  'freight-intelligence': {
    railHeader: 'OPERATIONAL ANALYTICS · AUDIT READY',
    eyebrow: 'WHAT IT HELPS YOUR TEAM DO',
    mainTitle: 'Purpose-built capabilities for everyday operations.',
    mainSubtitle:
      'Configure the workflow around your document types, business rules, review process and connected systems.',
    steps: [
      {
        stepNum: 'STEP 1 OF 6',
        shortLabel: 'PROFITABILITY',
        subLabel: 'Shipment P&L',
        headline: 'Shipment-level profitability and margin views',
        description:
          'Calculate true net gross profit on every forwarding job by comparing invoiced customer sell rates against actual carrier buy costs and surcharges.',
      },
      {
        stepNum: 'STEP 2 OF 6',
        shortLabel: 'COST VARIANCE',
        subLabel: 'Quoted vs actual',
        headline: 'Quoted versus actual cost variance analysis',
        description:
          'Analyze variances between initial commercial rate quotations and final carrier invoices to identify freight rate creep and surcharge fluctuations.',
      },
      {
        stepNum: 'STEP 3 OF 6',
        shortLabel: 'MARGIN LEAKAGE',
        subLabel: 'Accessorial alerts',
        headline: 'Potential margin leakage indicators',
        description:
          'Proactively identify unbilled carrier accessorials, detention fees, and demurrage penalties that were not passed through to customer billing.',
      },
      {
        stepNum: 'STEP 4 OF 6',
        shortLabel: 'OPERATIONAL TRENDS',
        subLabel: 'Lane benchmarks',
        headline: 'Operational trends across shipment and trade-lane data',
        description:
          'Analyze macro historical procurement and transit data across primary trade corridors to negotiate sharper contract rates and optimize routing.',
      },
      {
        stepNum: 'STEP 5 OF 6',
        shortLabel: 'CARRIER PERFORMANCE',
        subLabel: 'On-time scoring',
        headline: 'Customer and carrier performance insights',
        description:
          'Benchmark carrier SLA reliability, on-time port arrivals, and rate competitiveness to direct cargo allocations to top-performing vendors.',
      },
      {
        stepNum: 'STEP 6 OF 6',
        shortLabel: 'MANAGEMENT REPORTING',
        subLabel: 'Executive MIS',
        headline: 'Management reporting built from connected operational and financial data',
        description:
          'Generate automated weekly and monthly executive MIS packs with consolidated P&L statements, volume rankings, and carrier scorecard analytics.',
      },
    ],
  },
};

interface LogisticsCapabilitiesSectionProps {
  slug: LogisticsSlug;
}

export function LogisticsCapabilitiesSection({ slug }: LogisticsCapabilitiesSectionProps) {
  const config = CAPABILITIES_DATA[slug] || CAPABILITIES_DATA['email-to-booking'];
  const steps = config.steps;

  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [margin, setMargin] = useState<number>(12);
  const [actionStates, setActionStates] = useState<Record<string, any>>({});

  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const isManualNavRef = useRef<boolean>(false);
  const manualTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeStep = steps[activeIdx] || steps[0];
  const vendorCost = 1180;
  const calculatedQuote = Math.round(vendorCost * (1 + margin / 100));

  // Reset to step 0 when slug changes
  useEffect(() => {
    setActiveIdx(0);
  }, [slug]);

  // Auto-scroll flow tracking: automatically progresses through steps as user scrolls down
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let ticking = false;

    const handleScroll = () => {
      if (isManualNavRef.current) return;
      if (window.innerWidth < 860) return; // Desktop scrollytelling

      const container = containerRef.current;
      const stage = stageRef.current;
      if (!container || !stage) return;

      const rect = container.getBoundingClientRect();
      const topOffset = 84; // Offset matching the fixed navigation bar

      // If user hasn't reached the sticky point yet, remain on Step 0
      if (rect.top > topOffset) {
        setActiveIdx((prev) => (prev !== 0 ? 0 : prev));
        return;
      }

      const stageHeight = stage.offsetHeight;
      const scrollableDist = rect.height - stageHeight;

      if (scrollableDist <= 0) return;

      const scrolled = topOffset - rect.top;

      // If user scrolled past the container, hold on the final step
      if (scrolled >= scrollableDist) {
        setActiveIdx((prev) => (prev !== steps.length - 1 ? steps.length - 1 : prev));
        return;
      }

      // Smooth progress mapped to steps
      const progress = Math.max(0, Math.min(scrolled / scrollableDist, 0.9999));
      const stepIdx = Math.min(steps.length - 1, Math.floor(progress * steps.length));

      setActiveIdx((prev) => (prev !== stepIdx ? stepIdx : prev));
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    const onWheel = () => {
      // User manual wheel interaction immediately releases any programmatic nav lock
      if (isManualNavRef.current) {
        isManualNavRef.current = false;
        if (manualTimeoutRef.current) {
          clearTimeout(manualTimeoutRef.current);
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('wheel', onWheel);
      if (manualTimeoutRef.current) {
        clearTimeout(manualTimeoutRef.current);
      }
    };
  }, [steps.length]);

  const goToStep = (idx: number, scrollWindow: boolean = true) => {
    const clamped = Math.max(0, Math.min(steps.length - 1, idx));
    setActiveIdx(clamped);

    if (scrollWindow && typeof window !== 'undefined' && window.innerWidth >= 860) {
      const container = containerRef.current;
      const stage = stageRef.current;
      if (container && stage) {
        const rect = container.getBoundingClientRect();
        const topOffset = 84;
        const stageHeight = stage.offsetHeight;
        const scrollableDist = rect.height - stageHeight;

        if (scrollableDist > 0) {
          const stepProgress = (clamped + 0.5) / steps.length;
          const containerStartScrollY = window.scrollY + (rect.top - topOffset);
          const targetScrollY = containerStartScrollY + stepProgress * scrollableDist;

          isManualNavRef.current = true;
          if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);
          manualTimeoutRef.current = setTimeout(() => {
            isManualNavRef.current = false;
          }, 700);

          window.scrollTo({
            top: targetScrollY,
            behavior: 'smooth',
          });
        }
      }
    }
  };

  const handleNext = () => {
    if (activeIdx < steps.length - 1) {
      goToStep(activeIdx + 1);
    }
  };

  const handlePrev = () => {
    if (activeIdx > 0) {
      goToStep(activeIdx - 1);
    }
  };

  // Helper to update specific interactive action states
  const setAction = (key: string, value: any) => {
    setActionStates((prev) => ({ ...prev, [key]: value }));
  };

  /* =========================================================================
     CARD SIMULATOR RENDERERS BY SLUG & STEP
     ========================================================================= */
  const renderCardContent = () => {
    switch (slug) {
      // ---------------------------------------------------------------------
      // 1. EMAIL-TO-BOOKING (7 STEPS)
      // ---------------------------------------------------------------------
      case 'email-to-booking': {
        switch (activeIdx) {
          case 0: // Read incoming
            return (
              <div className={s.previewCard}>
                <div className={s.cardHeaderBar}>
                  <div className={s.cardHeaderTitle}>
                    <span>INBOX · SALES@FORWARDER</span>
                  </div>
                  <span className={s.statusPillGreen}>READING</span>
                </div>
                <div className={s.cardBody}>
                  <div className={s.cardHeadline}>Enquiry: 1×40HC Nhava Sheva → Jebel Ali</div>
                  <div className={s.emailBubble}>
                    &ldquo;Hi team, please quote for one 40HC. Cargo is ready 24 Nov. Details are in the
                    attached list. Thanks, Meera (Orion Trading)&rdquo;
                  </div>
                  <div className={s.attachmentRow}>
                    <span className={s.attachmentChip}>
                      <FileText size={13} />
                      <span>packing-list.pdf</span>
                    </span>
                    <span className={s.attachmentChip}>
                      <FileSpreadsheet size={13} />
                      <span>enquiry.xlsx</span>
                    </span>
                  </div>
                </div>
                <div className={s.cardFooterBar}>
                  <span>2 ATTACHMENTS PARSED</span>
                  <span>SAMPLE DATA</span>
                </div>
              </div>
            );
          case 1: // Identify shipment
            return (
              <div className={s.previewCard}>
                <div className={s.cardHeaderBar}>
                  <div className={s.cardHeaderTitle}>
                    <span>SHIPMENT DETAILS</span>
                  </div>
                  <span className={s.statusPillGreen}>1 GAP</span>
                </div>
                <div className={s.cardBody}>
                  <div className={s.paramTable}>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Origin</span>
                      <span className={s.paramValue}>Nhava Sheva (INNSA)</span>
                    </div>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Destination</span>
                      <span className={s.paramValue}>Jebel Ali (AEJEA)</span>
                    </div>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Equipment</span>
                      <span className={s.paramValue}>1 × 40HC</span>
                    </div>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Cargo ready</span>
                      <span className={s.paramValue}>24 Nov</span>
                    </div>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Gross weight</span>
                      <span className={s.paramValue}>
                        <span className={s.gapBadge}>
                          <AlertCircle size={11} /> Missing · ask customer
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className={s.cardFooterBar}>
                  <span>4 OF 5 FIELDS FOUND</span>
                  <span>SAMPLE DATA</span>
                </div>
              </div>
            );
          case 2: // Prepare vendor
            return (
              <div className={s.previewCard}>
                <div className={s.cardHeaderBar}>
                  <div className={s.cardHeaderTitle}>
                    <span>VENDOR RFQ DRAFT</span>
                  </div>
                  <span className={s.statusPillGreen}>TEMPLATE APPLIED</span>
                </div>
                <div className={s.cardBody}>
                  <div className={s.attachmentRow}>
                    <span className={s.attachmentChip}>Maersk Line</span>
                    <span className={s.attachmentChip}>Hapag-Lloyd</span>
                    <span className={s.attachmentChip}>CMA CGM</span>
                    <span className={s.attachmentChip}>MSC</span>
                  </div>
                  <div className={s.emailBubble}>
                    &ldquo;RFQ: Nhava Sheva to Jebel Ali · 1×40HC · Cargo ready 24 Nov. Please share
                    rates &amp; validity.&rdquo;
                  </div>
                  <div className={s.cardActionRow}>
                    <button
                      type="button"
                      className={s.btnPrimaryGreen}
                      onClick={() => setAction('e2b_step3Sent', true)}
                    >
                      <Send size={13} />
                      <span>
                        {actionStates.e2b_step3Sent ? '✓ 4 RFQ Drafts Queued' : 'Send 4 RFQ Drafts'}
                      </span>
                    </button>
                  </div>
                </div>
                <div className={s.cardFooterBar}>
                  <span>4 CARRIERS SELECTED</span>
                  <span>SAMPLE DATA</span>
                </div>
              </div>
            );
          case 3: // Compare vendor
            return (
              <div className={s.previewCard}>
                <div className={s.cardHeaderBar}>
                  <div className={s.cardHeaderTitle}>
                    <span>RATE COMPARISON</span>
                  </div>
                  <span className={s.statusPillGreen}>3 QUOTES</span>
                </div>
                <div className={s.cardBody}>
                  <div className={s.carrierMatrix}>
                    <div className={`${s.carrierRow} ${s.carrierRowBest}`}>
                      <div className={s.carrierInfo}>
                        <div className={s.carrierName}>
                          Maersk Line <span className={s.gapBadge}>Best value</span>
                        </div>
                        <div className={s.carrierMeta}>28 days transit · 14d free demurrage</div>
                      </div>
                      <div className={s.carrierPrice}>$1,180</div>
                    </div>
                    <div className={s.carrierRow}>
                      <div className={s.carrierInfo}>
                        <div className={s.carrierName}>
                          MSC <span className={s.gapBadge}>Fastest</span>
                        </div>
                        <div className={s.carrierMeta}>24 days transit · 10d free demurrage</div>
                      </div>
                      <div className={s.carrierPrice}>$1,220</div>
                    </div>
                    <div className={s.carrierRow}>
                      <div className={s.carrierInfo}>
                        <div className={s.carrierName}>CMA CGM</div>
                        <div className={s.carrierMeta}>26 days transit · 12d free demurrage</div>
                      </div>
                      <div className={s.carrierPrice}>$1,240</div>
                    </div>
                  </div>
                </div>
                <div className={s.cardFooterBar}>
                  <span>BEST OPTION HIGHLIGHTED</span>
                  <span>SAMPLE DATA</span>
                </div>
              </div>
            );
          case 4: // Support vendor
            return (
              <div className={s.previewCard}>
                <div className={s.cardHeaderBar}>
                  <div className={s.cardHeaderTitle}>
                    <span>NEGOTIATION ASSISTANT</span>
                  </div>
                  <span className={s.statusPillGreen}>AI ADVICE</span>
                </div>
                <div className={s.cardBody}>
                  <div className={s.emailBubble}>
                    &ldquo;Maersk is $40 lower than MSC. However, MSC offers 4 days faster transit.
                    Recommend countering MSC at $1,190 based on last month&rsquo;s volume.&rdquo;
                  </div>
                  <div className={s.cardActionRow}>
                    <button
                      type="button"
                      className={s.btnPrimaryGreen}
                      onClick={() => setAction('e2b_step5', 'counter_sent')}
                    >
                      {actionStates.e2b_step5 === 'counter_sent'
                        ? '✓ Counter-Offer Drafted'
                        : 'Adopt recommendation ($1,190)'}
                    </button>
                    <button
                      type="button"
                      className={s.btnOutline}
                      onClick={() => setAction('e2b_step5', 'manual')}
                    >
                      Adjust counter-offer
                    </button>
                  </div>
                </div>
                <div className={s.cardFooterBar}>
                  <span>DATA-BACKED NEGOTIATION</span>
                  <span>SAMPLE DATA</span>
                </div>
              </div>
            );
          case 5: // Prepare customer
            return (
              <div className={s.previewCard}>
                <div className={s.cardHeaderBar}>
                  <div className={s.cardHeaderTitle}>
                    <span>CUSTOMER QUOTE BUILDER</span>
                  </div>
                  <span className={s.statusPillGreen}>LIVE CALCULATOR</span>
                </div>
                <div className={s.cardBody}>
                  <div className={s.sliderCard}>
                    <div className={s.sliderRow}>
                      <span>Carrier Buy Cost</span>
                      <span className={s.paramValue}>${vendorCost}</span>
                    </div>
                    <div className={s.sliderRow}>
                      <span>Target Margin</span>
                      <span style={{ color: '#059669', fontWeight: 700 }}>{margin}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={30}
                      step={1}
                      value={margin}
                      onChange={(e) => setMargin(Number(e.target.value))}
                      className={s.sliderInput}
                      aria-label="Target Margin Percentage"
                    />
                  </div>
                  <div className={s.calculatedOutput}>
                    <span>Customer Sell Rate</span>
                    <span style={{ fontSize: '16px' }}>${calculatedQuote}</span>
                  </div>
                </div>
                <div className={s.cardFooterBar}>
                  <span>DYNAMIC MARGIN ENGINE</span>
                  <span>SAMPLE DATA</span>
                </div>
              </div>
            );
          case 6: // Draft customer
          default:
            return (
              <div className={s.previewCard}>
                <div className={s.cardHeaderBar}>
                  <div className={s.cardHeaderTitle}>
                    <span>CUSTOMER QUOTATION EMAIL</span>
                  </div>
                  <span className={s.statusPillGreen}>REVIEW READY</span>
                </div>
                <div className={s.cardBody}>
                  <div className={s.emailBubble}>
                    &ldquo;Dear Meera, We are pleased to quote <strong>${calculatedQuote}</strong> for 1×40HC
                    Nhava Sheva to Jebel Ali. Transit time: 28 days with Maersk Line. Rate valid until
                    30 Nov. Please reply to confirm booking.&rdquo;
                  </div>
                  <div className={s.cardActionRow}>
                    <button
                      type="button"
                      className={s.btnPrimaryGreen}
                      onClick={() => setAction('e2b_step7', 'approved')}
                    >
                      {actionStates.e2b_step7 === 'approved'
                        ? '✓ Dispatched to customer'
                        : 'Approve & send'}
                    </button>
                    <button
                      type="button"
                      className={s.btnOutline}
                      onClick={() => setAction('e2b_step7', 'refine')}
                    >
                      Refine tone
                    </button>
                    <button
                      type="button"
                      className={s.btnOutline}
                      onClick={() => setAction('e2b_step7', 'held')}
                    >
                      Hold
                    </button>
                  </div>
                </div>
                <div className={s.cardFooterBar}>
                  <span>PEOPLE STAY IN CONTROL</span>
                  <span>SAMPLE DATA</span>
                </div>
              </div>
            );
        }
      }

      // ---------------------------------------------------------------------
      // 2. SHIPMENT OPERATIONS (6 STEPS)
      // ---------------------------------------------------------------------
      case 'shipment-operations': {
        switch (activeIdx) {
          case 0: // Convert accepted
            return (
              <div className={s.previewCard}>
                <div className={s.cardHeaderBar}>
                  <div className={s.cardHeaderTitle}>
                    <span>FORWARDING JOB INGESTION</span>
                  </div>
                  <span className={s.statusPillGreen}>AUTO-CONVERTED</span>
                </div>
                <div className={s.cardBody}>
                  <div className={s.cardHeadline}>Forwarding Job #JOB-2026-8812</div>
                  <div className={s.paramTable}>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Accepted Quote</span>
                      <span className={s.paramValue}>#QT-9042 · Prime Importers Ltd</span>
                    </div>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Routing Corridor</span>
                      <span className={s.paramValue}>Shanghai (CNSHA) → Rotterdam (NLRTM)</span>
                    </div>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Equipment</span>
                      <span className={s.paramValue}>2 × 40&apos; HC FCL (Auto Parts)</span>
                    </div>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Carrier Booking</span>
                      <span className={s.paramValue}>MSC Mediterranean · Direct Service</span>
                    </div>
                  </div>
                  <div className={s.cardActionRow}>
                    <button
                      type="button"
                      className={s.btnPrimaryGreen}
                      onClick={() => setAction('so_jobSynced', true)}
                    >
                      {actionStates.so_jobSynced ? '✓ Job Synced to TMS' : 'Sync Job to System'}
                    </button>
                  </div>
                </div>
                <div className={s.cardFooterBar}>
                  <span>SALES TO OPS HANDOFF</span>
                  <span>SAMPLE DATA</span>
                </div>
              </div>
            );
          case 1: // Maintain standalone
            return (
              <div className={s.previewCard}>
                <div className={s.cardHeaderBar}>
                  <div className={s.cardHeaderTitle}>
                    <span>SYSTEM INTEGRATION CONTROL</span>
                  </div>
                  <span className={s.statusPillGreen}>BIDIRECTIONAL</span>
                </div>
                <div className={s.cardBody}>
                  <div className={s.attachmentRow}>
                    <span className={s.attachmentChip}>Docsynecx Standalone Tower</span>
                    <span className={s.attachmentChip}>CargoWise One eAdaptor</span>
                  </div>
                  <div className={s.paramTable}>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Sync Status</span>
                      <span className={s.paramValue}>
                        <span className={s.gapBadge}>✓ Active &amp; Connected</span>
                      </span>
                    </div>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Latency</span>
                      <span className={s.paramValue}>&lt; 1.2s Real-Time Event Sync</span>
                    </div>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Mapped Records</span>
                      <span className={s.paramValue}>Routing Orders, Milestones, Vouchers</span>
                    </div>
                  </div>
                </div>
                <div className={s.cardFooterBar}>
                  <span>ENTERPRISE TMS CONNECTIVITY</span>
                  <span>SAMPLE DATA</span>
                </div>
              </div>
            );
          case 2: // Extract information
            return (
              <div className={s.previewCard}>
                <div className={s.cardHeaderBar}>
                  <div className={s.cardHeaderTitle}>
                    <span>TRADE DOCUMENTS EXTRACTION</span>
                  </div>
                  <span className={s.statusPillGreen}>48 FIELDS PARSED</span>
                </div>
                <div className={s.cardBody}>
                  <div className={s.attachmentRow}>
                    <span className={s.attachmentChip}>
                      <FileText size={13} /> BL_MSCU8921.pdf
                    </span>
                    <span className={s.attachmentChip}>
                      <FileSpreadsheet size={13} /> Packing_List.xlsx
                    </span>
                    <span className={s.attachmentChip}>
                      <FileText size={13} /> Commercial_Invoice.pdf
                    </span>
                  </div>
                  <div className={s.paramTable}>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Container No</span>
                      <span className={s.paramValue}>MSCU8921045 / 40&apos; HC</span>
                    </div>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Seal Number</span>
                      <span className={s.paramValue}>SL-991204 (Intact)</span>
                    </div>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Commodity / HS</span>
                      <span className={s.paramValue}>8708.29 · Auto Body Parts</span>
                    </div>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Gross Weight</span>
                      <span className={s.paramValue}>24,500 kg</span>
                    </div>
                  </div>
                </div>
                <div className={s.cardFooterBar}>
                  <span>INTELLIGENT DOCUMENT EXTRACTION</span>
                  <span>SAMPLE DATA</span>
                </div>
              </div>
            );
          case 3: // Compare key
            return (
              <div className={s.previewCard}>
                <div className={s.cardHeaderBar}>
                  <div className={s.cardHeaderTitle}>
                    <span>3-WAY DOCUMENT CROSS-CHECK</span>
                  </div>
                  <span className={s.statusPillAmber}>1 MISMATCH FLAGGED</span>
                </div>
                <div className={s.cardBody}>
                  <div className={s.carrierMatrix}>
                    <div className={s.carrierRow}>
                      <div className={s.carrierInfo}>
                        <div className={s.carrierName}>Shipper &amp; Consignee Details</div>
                        <div className={s.carrierMeta}>Prime Components Ltd → EuroAuto BV</div>
                      </div>
                      <div className={s.gapBadge}>Match ✓</div>
                    </div>
                    <div className={s.carrierRow}>
                      <div className={s.carrierInfo}>
                        <div className={s.carrierName}>Container &amp; Seal Identifiers</div>
                        <div className={s.carrierMeta}>MSCU8921045 · Seal SL-991204</div>
                      </div>
                      <div className={s.gapBadge}>Match ✓</div>
                    </div>
                    <div className={s.carrierRow} style={{ borderColor: '#fecaca', backgroundColor: '#fff5f5' }}>
                      <div className={s.carrierInfo}>
                        <div className={s.carrierName} style={{ color: '#b91c1c' }}>
                          Declared Package Count
                        </div>
                        <div className={s.carrierMeta}>Invoice states 420 pkgs · BL states 425 pkgs</div>
                      </div>
                      <span className={s.gapBadgeAmber}>⚠ Held for Review</span>
                    </div>
                  </div>
                  <div className={s.cardActionRow}>
                    <button
                      type="button"
                      className={s.btnPrimaryGreen}
                      onClick={() => setAction('so_discrepancy', 'held')}
                    >
                      {actionStates.so_discrepancy === 'held'
                        ? '✓ Held & Discrepancy Notice Sent'
                        : 'Hold & request shipper clarification'}
                    </button>
                  </div>
                </div>
                <div className={s.cardFooterBar}>
                  <span>PRE-DEPARTURE AUDIT CHECKPOINT</span>
                  <span>SAMPLE DATA</span>
                </div>
              </div>
            );
          case 4: // Prepare customs
            return (
              <div className={s.previewCard}>
                <div className={s.cardHeaderBar}>
                  <div className={s.cardHeaderTitle}>
                    <span>CUSTOMS COMPLIANCE PACKET</span>
                  </div>
                  <span className={s.statusPillGreen}>BROKER READY</span>
                </div>
                <div className={s.cardBody}>
                  <div className={s.paramTable}>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Tariff Classification</span>
                      <span className={s.paramValue}>HS 8708.29 · Automotive Components</span>
                    </div>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Customs Valuation</span>
                      <span className={s.paramValue}>$38,450.00 CIF Rotterdam</span>
                    </div>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Origin Verification</span>
                      <span className={s.paramValue}>Certificate of Origin #CO-CN24 Verified</span>
                    </div>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Compliance Scope</span>
                      <span className={s.paramValue}>Direct filing not implied; broker packet ready</span>
                    </div>
                  </div>
                </div>
                <div className={s.cardFooterBar}>
                  <span>REGULATORY PREPARATION</span>
                  <span>SAMPLE DATA</span>
                </div>
              </div>
            );
          case 5: // Extract supplier
          default:
            return (
              <div className={s.previewCard}>
                <div className={s.cardHeaderBar}>
                  <div className={s.cardHeaderTitle}>
                    <span>CARRIER INVOICE AP AUDIT</span>
                  </div>
                  <span className={s.statusPillGreen}>0 VARIANCE</span>
                </div>
                <div className={s.cardBody}>
                  <div className={s.paramTable}>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Carrier Invoice</span>
                      <span className={s.paramValue}>MSC Invoice #INV-88219</span>
                    </div>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Billed Freight Cost</span>
                      <span className={s.paramValue}>$2,420.00</span>
                    </div>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Estimated Buy Cost</span>
                      <span className={s.paramValue}>$2,420.00</span>
                    </div>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Reconciliation Variance</span>
                      <span className={s.paramValue}>
                        <span className={s.gapBadge}>+$0.00 Zero Margin Leakage</span>
                      </span>
                    </div>
                  </div>
                  <div className={s.cardActionRow}>
                    <button
                      type="button"
                      className={s.btnPrimaryGreen}
                      onClick={() => setAction('so_apVoucher', 'approved')}
                    >
                      {actionStates.so_apVoucher === 'approved'
                        ? '✓ AP Voucher Posted to ERP'
                        : 'Approve AP voucher for ERP / Tally'}
                    </button>
                  </div>
                </div>
                <div className={s.cardFooterBar}>
                  <span>AUTOMATED AP MATCHING</span>
                  <span>SAMPLE DATA</span>
                </div>
              </div>
            );
        }
      }

      // ---------------------------------------------------------------------
      // 3. SHIPMENT TRACKING (6 STEPS)
      // ---------------------------------------------------------------------
      case 'shipment-tracking': {
        switch (activeIdx) {
          case 0: // Ocean tracking
            return (
              <div className={s.previewCard}>
                <div className={s.cardHeaderBar}>
                  <div className={s.cardHeaderTitle}>
                    <span>VESSEL AIS TELEMETRY</span>
                  </div>
                  <span className={s.statusPillGreen}>LIVE SATELLITE</span>
                </div>
                <div className={s.cardBody}>
                  <div className={s.cardHeadline}>MSC ISABELLA · IMO 9839284</div>
                  <div className={s.paramTable}>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Current Coordinates</span>
                      <span className={s.paramValue}>31.2° N, 122.5° E (East China Sea)</span>
                    </div>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Navigation Speed</span>
                      <span className={s.paramValue}>18.4 knots · Heading 142° SE</span>
                    </div>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Next Port Milestone</span>
                      <span className={s.paramValue}>Singapore Transshipment (680 NM)</span>
                    </div>
                  </div>
                </div>
                <div className={s.cardFooterBar}>
                  <span>GLOBAL AIS FEED CONNECTED</span>
                  <span>SAMPLE DATA</span>
                </div>
              </div>
            );
          case 1: // Road tracking
            return (
              <div className={s.previewCard}>
                <div className={s.cardHeaderBar}>
                  <div className={s.cardHeaderTitle}>
                    <span>INLAND ROAD TELEMATICS</span>
                  </div>
                  <span className={s.statusPillGreen}>GPS CONNECTED</span>
                </div>
                <div className={s.cardBody}>
                  <div className={s.cardHeadline}>Trailer #TN-38-BZ-4921 (Container #MSCU8921045)</div>
                  <div className={s.paramTable}>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Transport Corridor</span>
                      <span className={s.paramValue}>Nhava Sheva CFS → ICD Dadri Warehouse</span>
                    </div>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Live Telematics</span>
                      <span className={s.paramValue}>Driver: Rajesh K. · Speed: 52 km/h</span>
                    </div>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Remaining Distance</span>
                      <span className={s.paramValue}>348 km · Est 6.5 hours remaining</span>
                    </div>
                  </div>
                </div>
                <div className={s.cardFooterBar}>
                  <span>MULTI-MODAL ROAD VISIBILITY</span>
                  <span>SAMPLE DATA</span>
                </div>
              </div>
            );
          case 2: // Milestone visibility
            return (
              <div className={s.previewCard}>
                <div className={s.cardHeaderBar}>
                  <div className={s.cardHeaderTitle}>
                    <span>MILESTONE CHRONOLOGY</span>
                  </div>
                  <span className={s.statusPillGreen}>3 OF 5 COMPLETED</span>
                </div>
                <div className={s.cardBody}>
                  <div className={s.carrierMatrix}>
                    <div className={s.carrierRow}>
                      <div className={s.carrierInfo}>
                        <div className={s.carrierName}>Gate-In Terminal Port</div>
                        <div className={s.carrierMeta}>Nov 17 · 10:30 UTC · Terminal Berth 4</div>
                      </div>
                      <div className={s.gapBadge}>Completed ✓</div>
                    </div>
                    <div className={s.carrierRow}>
                      <div className={s.carrierInfo}>
                        <div className={s.carrierName}>Vessel Sailing Departure</div>
                        <div className={s.carrierMeta}>Nov 19 · 04:30 UTC · Shanghai Port</div>
                      </div>
                      <div className={s.gapBadge}>Completed ✓</div>
                    </div>
                    <div className={s.carrierRow} style={{ borderColor: '#059669', backgroundColor: '#f0fdf4' }}>
                      <div className={s.carrierInfo}>
                        <div className={s.carrierName} style={{ color: '#047857' }}>
                          Singapore Transshipment Hub
                        </div>
                        <div className={s.carrierMeta}>Nov 29 · 18:00 UTC · In Transit</div>
                      </div>
                      <span className={s.gapBadge}>Active Stage</span>
                    </div>
                  </div>
                </div>
                <div className={s.cardFooterBar}>
                  <span>END-TO-END EVENT TRACKING</span>
                  <span>SAMPLE DATA</span>
                </div>
              </div>
            );
          case 3: // Dynamic ETA
            return (
              <div className={s.previewCard}>
                <div className={s.cardHeaderBar}>
                  <div className={s.cardHeaderTitle}>
                    <span>DYNAMIC ETA PREDICTION</span>
                  </div>
                  <span className={s.statusPillGreen}>AI RECALCULATED</span>
                </div>
                <div className={s.cardBody}>
                  <div className={s.paramTable}>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Original Scheduled ETA</span>
                      <span className={s.paramValue}>Dec 15 · 20:00 CET</span>
                    </div>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Dynamic AI ETA</span>
                      <span className={s.paramValue} style={{ color: '#059669', fontWeight: 700 }}>
                        Dec 17 · 14:00 CET (+42h)
                      </span>
                    </div>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Primary Variance Factor</span>
                      <span className={s.paramValue}>Terminal berth queue at transshipment hub</span>
                    </div>
                  </div>
                </div>
                <div className={s.cardFooterBar}>
                  <span>PREDICTIVE LOGISTICS ENGINE</span>
                  <span>SAMPLE DATA</span>
                </div>
              </div>
            );
          case 4: // Proactive alerts
            return (
              <div className={s.previewCard}>
                <div className={s.cardHeaderBar}>
                  <div className={s.cardHeaderTitle}>
                    <span>PROACTIVE CLIENT ALERTS</span>
                  </div>
                  <span className={s.statusPillGreen}>AUTOMATED NOTICE</span>
                </div>
                <div className={s.cardBody}>
                  <div className={s.emailBubble}>
                    &ldquo;Proactive Update for Prime Importers Ltd: MSC ISABELLA departure verified.
                    Arrival timestamp re-estimated to Dec 17, 14:00 CET due to Singapore berth queue.
                    Container seal intact.&rdquo;
                  </div>
                  <div className={s.cardActionRow}>
                    <button
                      type="button"
                      className={s.btnPrimaryGreen}
                      onClick={() => setAction('st_alertSent', true)}
                    >
                      {actionStates.st_alertSent ? '✓ Client Alert Dispatched' : 'Send proactive client update'}
                    </button>
                  </div>
                </div>
                <div className={s.cardFooterBar}>
                  <span>CUSTOMER VISIBILITY EXPERIENCE</span>
                  <span>SAMPLE DATA</span>
                </div>
              </div>
            );
          case 5: // Operations view
          default:
            return (
              <div className={s.previewCard}>
                <div className={s.cardHeaderBar}>
                  <div className={s.cardHeaderTitle}>
                    <span>OPERATIONS CONTROL TOWER</span>
                  </div>
                  <span className={s.statusPillGreen}>24 SHIPMENTS LIVE</span>
                </div>
                <div className={s.cardBody}>
                  <div className={s.paramTable}>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>On-Schedule Cargo</span>
                      <span className={s.paramValue}>
                        <span className={s.gapBadge}>21 Shipments (87.5%)</span>
                      </span>
                    </div>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Monitored Exceptions</span>
                      <span className={s.paramValue}>
                        <span className={s.gapBadgeAmber}>3 Shipments Flagged</span>
                      </span>
                    </div>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Active Carrier Integrations</span>
                      <span className={s.paramValue}>Maersk, MSC, CMA CGM, Hapag-Lloyd</span>
                    </div>
                  </div>
                </div>
                <div className={s.cardFooterBar}>
                  <span>CENTRALIZED OPERATIONAL COMMAND</span>
                  <span>SAMPLE DATA</span>
                </div>
              </div>
            );
        }
      }

      // ---------------------------------------------------------------------
      // 4. FREIGHT INTELLIGENCE (6 STEPS)
      // ---------------------------------------------------------------------
      case 'freight-intelligence':
      default: {
        switch (activeIdx) {
          case 0: // Profitability
            return (
              <div className={s.previewCard}>
                <div className={s.cardHeaderBar}>
                  <div className={s.cardHeaderTitle}>
                    <span>SHIPMENT P&amp;L ANALYTICS</span>
                  </div>
                  <span className={s.statusPillGreen}>11.9% MARGIN</span>
                </div>
                <div className={s.cardBody}>
                  <div className={s.cardHeadline}>Job #JOB-2026-8812 (Shanghai → Rotterdam)</div>
                  <div className={s.paramTable}>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Billed Customer Revenue</span>
                      <span className={s.paramValue}>$2,702.50</span>
                    </div>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Carrier Freight Buy Cost</span>
                      <span className={s.paramValue}>$2,380.00</span>
                    </div>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Net Gross Profit</span>
                      <span className={s.paramValue} style={{ color: '#059669', fontWeight: 700 }}>
                        +$322.50 (11.9% Margin)
                      </span>
                    </div>
                  </div>
                </div>
                <div className={s.cardFooterBar}>
                  <span>SHIPMENT PROFITABILITY AUDIT</span>
                  <span>SAMPLE DATA</span>
                </div>
              </div>
            );
          case 1: // Cost variance
            return (
              <div className={s.previewCard}>
                <div className={s.cardHeaderBar}>
                  <div className={s.cardHeaderTitle}>
                    <span>QUOTED VS ACTUAL VARIANCE</span>
                  </div>
                  <span className={s.statusPillGreen}>+$70 FAVORABLE</span>
                </div>
                <div className={s.cardBody}>
                  <div className={s.paramTable}>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Ocean Base Buy Rate</span>
                      <span className={s.paramValue}>Quoted $2,350 vs Actual $2,280 (+$70)</span>
                    </div>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Bunker Surcharge (BAF)</span>
                      <span className={s.paramValue}>Quoted $180 vs Actual $180 ($0.00)</span>
                    </div>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Terminal Handling (THC)</span>
                      <span className={s.paramValue}>Quoted $140 vs Actual $140 ($0.00)</span>
                    </div>
                  </div>
                </div>
                <div className={s.cardFooterBar}>
                  <span>LINE-ITEM COST CONTROL</span>
                  <span>SAMPLE DATA</span>
                </div>
              </div>
            );
          case 2: // Margin leakage
            return (
              <div className={s.previewCard}>
                <div className={s.cardHeaderBar}>
                  <div className={s.cardHeaderTitle}>
                    <span>MARGIN LEAKAGE MONITOR</span>
                  </div>
                  <span className={s.statusPillAmber}>1 LEAKAGE DETECTED</span>
                </div>
                <div className={s.cardBody}>
                  <div className={s.emailBubble}>
                    &ldquo;Carrier billed $180.00 for 2 days container detention at Shanghai CFS.
                    Currently unbilled to customer account (Prime Importers Ltd).&rdquo;
                  </div>
                  <div className={s.cardActionRow}>
                    <button
                      type="button"
                      className={s.btnPrimaryGreen}
                      onClick={() => setAction('fi_leakage', 'billed')}
                    >
                      {actionStates.fi_leakage === 'billed'
                        ? '✓ Supplemental Invoice $180 Drafted'
                        : 'Bill to customer ($180.00)'}
                    </button>
                    <button
                      type="button"
                      className={s.btnOutline}
                      onClick={() => setAction('fi_leakage', 'absorbed')}
                    >
                      Absorb as operational cost
                    </button>
                  </div>
                </div>
                <div className={s.cardFooterBar}>
                  <span>REVENUE LOSS PREVENTION</span>
                  <span>SAMPLE DATA</span>
                </div>
              </div>
            );
          case 3: // Operational trends
            return (
              <div className={s.previewCard}>
                <div className={s.cardHeaderBar}>
                  <div className={s.cardHeaderTitle}>
                    <span>CORRIDOR PROCUREMENT TRENDS</span>
                  </div>
                  <span className={s.statusPillGreen}>Q3 BENCHMARK</span>
                </div>
                <div className={s.cardBody}>
                  <div className={s.paramTable}>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Asia → Europe Median Rate</span>
                      <span className={s.paramValue}>$2,340 / FEU (-3.8% QoQ)</span>
                    </div>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Average Transit Duration</span>
                      <span className={s.paramValue}>26.2 days (Stable)</span>
                    </div>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Corridor Volume</span>
                      <span className={s.paramValue}>142 FEU across 18 sailings</span>
                    </div>
                  </div>
                </div>
                <div className={s.cardFooterBar}>
                  <span>PROCUREMENT INTELLIGENCE</span>
                  <span>SAMPLE DATA</span>
                </div>
              </div>
            );
          case 4: // Carrier performance
            return (
              <div className={s.previewCard}>
                <div className={s.cardHeaderBar}>
                  <div className={s.cardHeaderTitle}>
                    <span>CARRIER ON-TIME PERFORMANCE</span>
                  </div>
                  <span className={s.statusPillGreen}>4 CARRIERS RANKED</span>
                </div>
                <div className={s.cardBody}>
                  <div className={s.carrierMatrix}>
                    <div className={`${s.carrierRow} ${s.carrierRowBest}`}>
                      <div className={s.carrierInfo}>
                        <div className={s.carrierName}>
                          1. MSC Mediterranean <span className={s.gapBadge}>Top reliability</span>
                        </div>
                        <div className={s.carrierMeta}>48 shipments · 26d average transit</div>
                      </div>
                      <div className={s.carrierPrice}>94.2% OTP</div>
                    </div>
                    <div className={s.carrierRow}>
                      <div className={s.carrierInfo}>
                        <div className={s.carrierName}>2. Maersk Line</div>
                        <div className={s.carrierMeta}>42 shipments · 28d average transit</div>
                      </div>
                      <div className={s.carrierPrice}>91.8% OTP</div>
                    </div>
                    <div className={s.carrierRow}>
                      <div className={s.carrierInfo}>
                        <div className={s.carrierName}>3. CMA CGM</div>
                        <div className={s.carrierMeta}>30 shipments · 24d average transit</div>
                      </div>
                      <div className={s.carrierPrice}>88.5% OTP</div>
                    </div>
                  </div>
                </div>
                <div className={s.cardFooterBar}>
                  <span>CARRIER SLA BENCHMARKING</span>
                  <span>SAMPLE DATA</span>
                </div>
              </div>
            );
          case 5: // Management reporting
          default:
            return (
              <div className={s.previewCard}>
                <div className={s.cardHeaderBar}>
                  <div className={s.cardHeaderTitle}>
                    <span>EXECUTIVE MIS REPORTING</span>
                  </div>
                  <span className={s.statusPillGreen}>READY TO EXPORT</span>
                </div>
                <div className={s.cardBody}>
                  <div className={s.attachmentRow}>
                    <span className={s.attachmentChip}>Monthly_PL_Summary.pdf</span>
                    <span className={s.attachmentChip}>Lane_Margin_Matrix.xlsx</span>
                    <span className={s.attachmentChip}>Carrier_Scorecards.pdf</span>
                  </div>
                  <div className={s.paramTable}>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Reporting Scope</span>
                      <span className={s.paramValue}>All Air &amp; Ocean Jobs (Oct 2026)</span>
                    </div>
                    <div className={s.paramRow}>
                      <span className={s.paramLabel}>Consolidated Gross Profit</span>
                      <span className={s.paramValue} style={{ color: '#059669', fontWeight: 700 }}>
                        $48,920.00 (14.2% Net)
                      </span>
                    </div>
                  </div>
                  <div className={s.cardActionRow}>
                    <button
                      type="button"
                      className={s.btnPrimaryGreen}
                      onClick={() => setAction('fi_exported', true)}
                    >
                      {actionStates.fi_exported ? '✓ MIS Reports Exported' : 'Export Executive MIS Pack'}
                    </button>
                  </div>
                </div>
                <div className={s.cardFooterBar}>
                  <span>LEADERSHIP REPORTING</span>
                  <span>SAMPLE DATA</span>
                </div>
              </div>
            );
        }
      }
    }
  };

  return (
    <section
      id="capabilities"
      className={s.lightSection}
      aria-labelledby="capabilities-section-title"
    >
      <div className={s.capabilitiesShell}>
        {/* Section Header */}
        <div className={s.sectionHeader}>
          <div className={s.eyebrow}>
            <span className={s.eyebrowDot} aria-hidden="true" />
            <span>{config.eyebrow}</span>
          </div>
          <h2 id="capabilities-section-title" className={s.mainTitle}>
            {config.mainTitle}
          </h2>
          <p className={s.mainSubtitle}>{config.mainSubtitle}</p>
        </div>

        {/* Scrollytelling Container */}
        <div ref={containerRef} className={s.scrollyContainer}>
          {/* Sticky Stage pinned while scrolling */}
          <div ref={stageRef} className={s.stickyStage}>
            <div className={s.workflowLayout}>
              {/* ZONE 1: LEFT VERTICAL STEPPER RAIL */}
              <nav aria-label="Capabilities Stepper" className={s.stepperRail}>
                <div className={s.stepperHeader}>
                  <span>{config.railHeader}</span>
                </div>

                <ol className={s.stepsList}>
                  {steps.map((step, idx) => {
                    const isCompleted = idx < activeIdx;
                    const isActive = idx === activeIdx;

                    return (
                      <li
                        key={step.shortLabel}
                        className={s.stepItem}
                        data-active={isActive ? 'true' : 'false'}
                        data-completed={isCompleted ? 'true' : 'false'}
                      >
                        {idx < steps.length - 1 && (
                          <span className={s.stepLine} aria-hidden="true" />
                        )}

                        <span className={s.stepNode} aria-hidden="true">
                          {isCompleted ? (
                            <Check size={10} color="#ffffff" strokeWidth={3} />
                          ) : isActive ? (
                            <span className={s.stepNodeInner} />
                          ) : null}
                        </span>

                        <button
                          type="button"
                          className={s.stepButton}
                          onClick={() => goToStep(idx)}
                          aria-current={isActive ? 'step' : undefined}
                        >
                          <span className={s.stepTitle}>{step.shortLabel}</span>
                          <span className={s.stepSubtitle}>{step.subLabel}</span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </nav>

              {/* ZONE 2: CENTER HEADLINE & DESCRIPTION */}
              <div className={s.centerZone}>
                <div className={s.stepTag}>
                  <span>
                    {activeStep.stepNum} · {activeStep.shortLabel}
                  </span>
                </div>

                <h3 className={s.stepHeadline}>{activeStep.headline}</h3>
                <p className={s.stepDescription}>{activeStep.description}</p>

                <div className={s.quickNavRow}>
                  <button
                    type="button"
                    className={s.navArrowBtn}
                    onClick={handlePrev}
                    disabled={activeIdx === 0}
                    aria-label="Previous capability"
                  >
                    <ChevronLeft size={14} />
                    <span>Previous</span>
                  </button>

                  <button
                    type="button"
                    className={s.navArrowBtn}
                    onClick={handleNext}
                    disabled={activeIdx === steps.length - 1}
                    aria-label="Next capability"
                  >
                    <span>Next step</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* ZONE 3: RIGHT INTERACTIVE OPERATIONAL CARD */}
              <div className={s.cardZone} aria-live="polite">
                {renderCardContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LogisticsCapabilitiesSection;
