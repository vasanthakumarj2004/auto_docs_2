"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Radio,
  BellRing,
  Bell,
  Send,
  Eye,
  AlertTriangle,
  Navigation,
  Check,
} from "lucide-react";
import { LandingNavigation } from "../LandingNavigation";
import { ShipsyFooter } from "../ShipsyFooter";
import { SharedFaqAccordion } from "../SharedFaqAccordion";
import { LogisticsClosingCta } from "./LogisticsClosingCta";
import { useAutoCycle } from "@/src/hooks/useAutoCycle";
import layoutStyles from "../LandingPage.module.css";
import s from "./EmailToBookingPage.module.css";

/* ── 6 Steps Data ── */
interface TrackingStep {
  num: number;
  title: string;
  desc: string;
  panelBar: string;
  panelStatus: string;
  statusType: "info" | "wait" | "ok";
  headTitle: string;
  headDesc: string;
  fields?: { label: string; value: string; isWarn?: boolean }[];
  timeline?: { text: string; time: string }[];
  mailAlerts?: {
    title: string;
    badge: string;
    badgeType: "info" | "wait" | "ok";
    body: string;
  }[];
  rows?: {
    who: string;
    what: string;
    status: string;
    type: "info" | "wait" | "ok";
  }[];
  footBold: string;
  foot: string;
}

const stepsData: TrackingStep[] = [
  {
    num: 1,
    title: "Starts from the job",
    desc: "Container, B/L and LR numbers",
    panelBar: "Step 1 of 6 · New shipment",
    panelStatus: "Tracking started",
    statusType: "ok",
    headTitle: "Tracking starts from the job.",
    headDesc:
      "The container, B/L and truck LR numbers come straight from the job, so nobody adds them by hand. Ocean and road legs are linked to the same shipment.",
    fields: [
      { label: "Job", value: "JOB-2026-8812" },
      { label: "Container", value: "MSCU8921045" },
      { label: "B/L", value: "BL-INNSA-77410" },
      { label: "Truck LR", value: "TR-8812" },
      { label: "Route", value: "INNSA → AEJEA" },
      { label: "Customer", value: "Orion Trading" },
    ],
    footBold: "One shipment, every leg.",
    foot: "Road and ocean in one record.",
  },
  {
    num: 2,
    title: "Road & first mile GPS",
    desc: "From your transporter's GPS",
    panelBar: "Step 2 of 6 · Road · LR TR-8812",
    panelStatus: "Gated in",
    statusType: "ok",
    headTitle: "Trucks on the road, without the phone calls.",
    headDesc:
      "The first and last mile come from your transporters' GPS, so you know the container reached the port without calling the driver.",
    timeline: [
      { text: "Loaded at factory, Tiruppur", time: "23 Nov 06:10" },
      { text: "On the road, 1,150 km", time: "23 Nov 14:00" },
      { text: "Gate-in, Nhava Sheva", time: "24 Nov 09:40" },
    ],
    footBold: "Gate-in confirmed",
    foot: "two days before the cut-off.",
  },
  {
    num: 3,
    title: "Live ocean tracking",
    desc: "Where the vessel is right now",
    panelBar: "Step 3 of 6 · Ocean · MSCU8921045",
    panelStatus: "At sea",
    statusType: "info",
    headTitle: "See where the vessel is right now.",
    headDesc:
      "Live vessel position from ship tracking data: where it is, how fast it's going and how far it is from the next port.",
    fields: [
      { label: "Vessel", value: "MV Arabian Star" },
      { label: "Position", value: "Arabian Sea" },
      { label: "Speed", value: "14.2 knots" },
      { label: "Sailed", value: "27 Nov" },
      { label: "Next port", value: "Jebel Ali" },
      { label: "Distance", value: "540 NM" },
    ],
    footBold: "No carrier website logins.",
    foot: "Every vessel in one place.",
  },
  {
    num: 4,
    title: "Real-time ETA update",
    desc: "Updated when the vessel slows",
    panelBar: "Step 4 of 6 · ETA",
    panelStatus: "Changed",
    statusType: "wait",
    headTitle: "An ETA that keeps up with the vessel.",
    headDesc:
      "The ETA is worked out again every 15 minutes from the vessel's real speed and position, not just the carrier's schedule.",
    fields: [
      { label: "Carrier schedule", value: "2 Dec" },
      { label: "Current ETA", value: "3 Dec", isWarn: true },
      { label: "Reason", value: "Slow steaming" },
    ],
    footBold: "The vessel slowed from 17 to 14 knots.",
    foot: "The ETA moved a day, before the carrier said anything.",
  },
  {
    num: 5,
    title: "Early delay alerts",
    desc: "Your team hears first",
    panelBar: "Step 5 of 6 · Alert",
    panelStatus: "For your team",
    statusType: "wait",
    headTitle: "Your team hears first.",
    headDesc:
      "When an ETA slips, a transshipment changes or a truck stops moving, the right person on your team gets an alert with the job and customer attached.",
    mailAlerts: [
      {
        title: "Delay · JOB-2026-8812 · Orion Trading",
        badge: "ETA +1 day",
        badgeType: "wait",
        body: "MSCU8921045 now expected at Jebel Ali on 3 Dec instead of 2 Dec. Delivery truck in Dubai may need to move to 4 Dec.",
      },
      {
        title: "Suggested note to Meera",
        badge: "Draft",
        badgeType: "info",
        body: '"Hi Meera, a quick heads-up: the vessel is running about a day late. New arrival at Jebel Ali is 3 Dec. We\'ll confirm delivery timing shortly."',
      },
    ],
    footBold: "4.2 hours earlier",
    foot: "on average than the carrier's own notice. You decide what to send.",
  },
  {
    num: 6,
    title: "Customer tracking link",
    desc: "For your team and your customer",
    panelBar: "Step 6 of 6 · All shipments",
    panelStatus: "46 moving",
    statusType: "info",
    headTitle: "One screen for your team. One link for your customer.",
    headDesc:
      "See what's late today without opening ten carrier sites. Share a tracking link with your customer so they can check milestones themselves.",
    rows: [
      {
        who: "MSCU8921045 · Orion Trading",
        what: "Arrives Jebel Ali 3 Dec",
        status: "ETA +1 day",
        type: "wait",
      },
      {
        who: "TGHU4410273 · Gulf Home Furnishings",
        what: "Transshipment, Colombo",
        status: "On time",
        type: "ok",
      },
      {
        who: "Customer tracking link",
        what: "Shared with Orion Trading",
        status: "Viewed today",
        type: "ok",
      },
    ],
    footBold: "Customers check the link",
    foot: "instead of emailing you.",
  },
];

/* ── FAQ items ── */
const faqItems = [
  {
    question: "Does anything go to our customer automatically?",
    answer:
      "Only the tracking link, and only if you choose to share it. Delay alerts come to your team first, and any note to the customer is a draft until someone on your team sends it.",
  },
  {
    question: "Which carriers and transporters does it track?",
    answer:
      "Ocean tracking uses carrier data and live vessel positions. Road tracking uses your transporters' GPS. We check coverage for your carriers, transporters and lanes during setup.",
  },
  {
    question: "Do we have to enter container numbers by hand?",
    answer:
      "No. Container, B/L and truck LR numbers come from the job, whether it's in Docsynecx, CargoWise or your own ERP. You can also add a shipment by hand if you need to.",
  },
  {
    question: "Will it fit how our team already works?",
    answer:
      "Yes. We set up the milestones you report on, who gets which alerts, and how customers see their shipments. You agree the setup before we start.",
  },
  {
    question: "How long does setup take?",
    answer:
      "About a week for a typical team. You test it on your own live shipments before going live.",
  },
];

/* ── Control items from Section 3 ── */
const controlDecisions = [
  {
    step: "01 · SMART ALERTS",
    title: "Route updates to the right people",
    desc: "Direct shipment alerts to the team members responsible for each job, customer or lane.",
    icon: Bell,
  },
  {
    step: "02 · CUSTOMER UPDATES",
    title: "Review before you communicate",
    desc: "Prepare customer-facing updates for your team to review and approve.",
    icon: Send,
  },
  {
    step: "03 · SHIPMENT VISIBILITY",
    title: "Share tracking access selectively",
    desc: "Give selected customers access to shipment status where sharing is enabled.",
    icon: Eye,
  },
  {
    step: "04 · EXCEPTION HANDLING",
    title: "Decide what happens next",
    desc: "Identify delays and exceptions, then choose the operational action to take.",
    icon: AlertTriangle,
  },
];

export function ShipmentTrackingPage() {
  const { active, goTo, containerProps } = useAutoCycle({
    itemCount: stepsData.length,
    interval: 4000,
    resumeDelay: 6000,
  });

  const activeStep = stepsData[active] || stepsData[0];

  return (
    <div className={`${layoutStyles.page} ${s.page}`}>
      <a href="#main-content" className={s.skipLink}>
        Skip to content
      </a>

      {/* Global Navigation */}
      <LandingNavigation />

      <main id="main-content">
        {/* 1. HERO SECTION */}
        <section
          className={`${s.viewportHero} ${s.mobileHero}`}
          aria-labelledby="hero-title"
        >
          <div className={`site-shell ${s.heroGrid}`}>
            {/* Left Copy */}
            <div className={s.heroCopy}>
              <p className={s.eyebrow}>SHIPMENT TRACKING · OCEAN AND ROAD</p>

              <h1 id="hero-title" className={s.heroTitle}>
                Hear about a delay <em>before your customer calls you.</em>
              </h1>

              <p className={s.heroDescription}>
                Logging into carrier sites. Calling the transporter. Answering
                &ldquo;where is my cargo?&rdquo; all day. Docsynecx follows
                every container and truck, updates the ETA and tells your team
                the moment something slips.
              </p>

              <div className={s.heroActions}>
                <Link href="/demo-form" className={s.primaryBtn}>
                  <span>Book a demo</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
                <a href="#steps" className={s.secondaryBtn}>
                  <span>Follow one container</span>
                  <ArrowDown size={15} aria-hidden="true" />
                </a>
              </div>

              <p className={s.promise}>
                <CheckCircle2 size={18} aria-hidden="true" />
                <span>
                  Delay alerts come to your team first. You decide what to tell
                  the customer.
                </span>
              </p>

              <p className={s.heroTrust}>
                Works with <strong>Standalone or CargoWise</strong>, your own
                ERP, or just your email inbox.{" "}
                <strong>Live in about a week.</strong>
              </p>
            </div>

            {/* Right Live Preview Card */}
            <div className={s.heroVisualWrapper}>
              <div className={s.ambientGlow} aria-hidden="true" />
              <div className={s.ghostCardBehind} aria-hidden="true" />

              <div
                className={s.qcard}
                role="img"
                aria-label="Example tracking desk: 46 shipments moving, 41 on time, 3 delayed, 2 waiting for gate-in"
              >
                <div className={s.qcardTop}>
                  <span>
                    <strong>Tracking</strong> · Today
                  </span>
                  <span className={`${s.statusBadge} ${s.info}`}>
                    46 moving
                  </span>
                </div>
                <div className={s.qcardBody}>
                  <div className={s.deskStats}>
                    <div className={s.statBox}>
                      <span className={s.statVal}>41</span>
                      <span className={s.statLabel}>on time</span>
                    </div>
                    <div className={s.statBox}>
                      <span className={s.statVal}>3</span>
                      <span className={s.statLabel}>delayed</span>
                    </div>
                    <div className={s.statBox}>
                      <span className={s.statVal}>2</span>
                      <span className={s.statLabel}>waiting for gate-in</span>
                    </div>
                  </div>

                  <div className={s.qcardRows}>
                    <div className={s.heroRowCard}>
                      <div className={s.heroRowTop}>
                        <span className={s.rowWho}>
                          MSCU8921045 · Orion Trading
                        </span>
                        <span className={`${s.statusBadge} ${s.wait}`}>
                          ETA +1 day
                        </span>
                      </div>
                      <span className={s.rowWhat}>INNSA → AEJEA · at sea</span>
                    </div>

                    <div className={s.heroRowCard}>
                      <div className={s.heroRowTop}>
                        <span className={s.rowWho}>
                          TGHU4410273 · Gulf Home Furnishings
                        </span>
                        <span className={`${s.statusBadge} ${s.ok}`}>
                          On time
                        </span>
                      </div>
                      <span className={s.rowWhat}>CNSHA → AEJEA · at sea</span>
                    </div>

                    <div className={s.heroRowCard}>
                      <div className={s.heroRowTop}>
                        <span className={s.rowWho}>
                          LR TR-8814 · Rhein Machine Parts
                        </span>
                        <span className={`${s.statusBadge} ${s.ok}`}>
                          On time
                        </span>
                      </div>
                      <span className={s.rowWhat}>
                        Chennai port → Hosur · by road
                      </span>
                    </div>
                  </div>
                </div>
                <p className={s.sampleNote}>Sample data</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. PROOF STATS SECTION */}
        <section className={s.statStrip} aria-label="Results">
          <div className="site-shell">
            <p className={s.statStripEyebrow}>
              PROVEN OUTCOMES · OCEAN &amp; ROAD TRACKING
            </p>
            <div className={s.statsGrid}>
              <div className={s.outcomeCard}>
                <div className={s.outcomeIconBadge} aria-hidden="true">
                  <Clock size={20} />
                </div>
                <div className={s.outcomeCardContent}>
                  <span className={s.outcomeStatValue}>65% fewer</span>
                  <span className={s.outcomeStatLabel}>
                    &ldquo;where is my cargo?&rdquo; emails
                  </span>
                </div>
              </div>
              <div className={s.outcomeCard}>
                <div className={s.outcomeIconBadge} aria-hidden="true">
                  <BellRing size={20} />
                </div>
                <div className={s.outcomeCardContent}>
                  <span className={s.outcomeStatValue}>4.2 hours</span>
                  <span className={s.outcomeStatLabel}>
                    earlier than the carrier&apos;s own delay notice
                  </span>
                </div>
              </div>
              <div className={s.outcomeCard}>
                <div className={s.outcomeIconBadge} aria-hidden="true">
                  <Radio size={20} />
                </div>
                <div className={s.outcomeCardContent}>
                  <span className={s.outcomeStatValue}>Every 15 min</span>
                  <span className={s.outcomeStatLabel}>
                    ETAs and milestones refreshed
                  </span>
                </div>
              </div>
            </div>
            <p className={s.statSource}>
              Results from a forwarder tracking 1,850+ ocean and road shipments
              a day.
            </p>
          </div>
        </section>

        {/* 3. CONTROL SECTION */}
        <section className={s.controlSection} aria-labelledby="ctrl-h">
          <div className="site-shell">
            <div className={s.controlHead}>
              <p className={s.eyebrow}>YOU STAY IN CHARGE</p>
              <h2 id="ctrl-h" className={s.headline}>
                Docsynecx watches every shipment.{" "}
                <em>Your team talks to the customer.</em>
              </h2>
              <p className={s.lead}>
                Shipment alerts come to your team first. Customer updates remain
                drafts until someone on your team reviews and sends them.
              </p>
            </div>

            <div className={s.controlLayoutWithMock}>
              <div className={s.controlCardsCol}>
                {controlDecisions.map((item) => {
                  const Icon = item.icon;
                  return (
                    <article key={item.step} className={s.controlCard}>
                      <div className={s.controlCardIcon} aria-hidden="true">
                        <Icon size={20} strokeWidth={1.8} />
                      </div>
                      <div>
                        <small className={s.controlCardTag}>{item.step}</small>
                        <h3 className={s.controlCardTitle}>{item.title}</h3>
                        <p className={s.controlCardDesc}>{item.desc}</p>
                      </div>
                    </article>
                  );
                })}
              </div>

              <aside
                className={s.controlMock}
                aria-label="Shipment telemetry case review"
              >
                <div className={s.mockHeaderBar}>
                  <div className={s.mockTitleGroup}>
                    <span className={s.mockPulseDot} aria-hidden="true" />
                    <span className={s.mockTitle}>
                      Shipment telemetry monitor
                    </span>
                  </div>
                  <span className={s.mockBadge}>ILLUSTRATIVE · 1 CASE</span>
                </div>

                <div className={s.mockBody}>
                  {/* Item 1: On Schedule */}
                  <div className={s.mockItem}>
                    <div className={s.mockItemLeft}>
                      <div className={s.mockItemIconWrap}>
                        <Navigation size={16} />
                      </div>
                      <div className={s.mockItemText}>
                        <span className={s.mockItemTitle}>
                          DXC-2048 · Chennai → Singapore
                        </span>
                        <span className={s.mockItemSub}>
                          Vessel underway · ETA on schedule (Oct 24)
                        </span>
                      </div>
                    </div>
                    <span className={s.mockStatusChipOk}>
                      <Check size={12} strokeWidth={2.5} />
                      <span>On schedule</span>
                    </span>
                  </div>

                  {/* Item 2: Active Flagged Delay Case */}
                  <div className={`${s.mockItem} ${s.mockItemActive}`}>
                    <div className={s.mockItemLeft}>
                      <div
                        className={`${s.mockItemIconWrap} ${s.mockItemIconWrapWarn}`}
                      >
                        <AlertTriangle size={16} />
                      </div>
                      <div className={s.mockItemText}>
                        <span className={s.mockItemTitle}>
                          DXC-2051 · Mumbai → Rotterdam
                        </span>
                        <span className={s.mockItemSub}>
                          Port congestion delay flagged
                        </span>
                      </div>
                    </div>
                    <span className={s.mockStatusChipWarn}>
                      <Clock size={12} strokeWidth={2.5} />
                      <span>Review case</span>
                    </span>
                  </div>

                  {/* Active Case Review Detail Card */}
                  <div className={s.mockCaseCard}>
                    <div className={s.mockCaseHeader}>
                      <span>DELAY FLAGGED (+48H)</span>
                      <span>DRAFT READY</span>
                    </div>
                    <p className={s.mockCaseDesc}>
                      Transshipment delay at Salalah. Automated draft email
                      prepared for <strong>Gulf Home Furnishings</strong>.
                    </p>
                    <div className={s.mockCaseActions}>
                      <button type="button" className={s.mockBtnPrimary}>
                        Review &amp; send update
                      </button>
                      <button type="button" className={s.mockBtnSecondary}>
                        Rebook haulage
                      </button>
                    </div>
                  </div>

                  {/* Item 3: On Schedule */}
                  <div className={s.mockItem}>
                    <div className={s.mockItemLeft}>
                      <div className={s.mockItemIconWrap}>
                        <CheckCircle2 size={16} />
                      </div>
                      <div className={s.mockItemText}>
                        <span className={s.mockItemTitle}>
                          DXC-2056 · Coimbatore → Dubai
                        </span>
                        <span className={s.mockItemSub}>
                          Cleared customs at Jebel Ali
                        </span>
                      </div>
                    </div>
                    <span className={s.mockStatusChipOk}>
                      <Check size={12} strokeWidth={2.5} />
                      <span>On schedule</span>
                    </span>
                  </div>
                </div>

                <div className={s.mockFooter}>
                  Illustrative interface only—not live shipment data. Alerts
                  come to your team first, and customer communications remain
                  drafts until your team sends them.
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* 4. SIX STEPS (HOW IT WORKS) */}
        <section
          id="steps"
          className={s.howSectionDark}
          aria-labelledby="steps-h"
        >
          <div className="site-shell">
            <div className={s.secHead}>
              <p className={s.eyebrow}>FOLLOW ONE SHIPMENT</p>
              <h2 id="steps-h" className={s.headlineLight}>
                From the factory gate to the <em>customer&apos;s door</em>.
              </h2>
              <p className={s.leadLight}>
                Here&apos;s how one container is followed from loading to
                arrival, with every delay caught early.
              </p>
            </div>

            <div className={s.howGrid} {...containerProps}>
              {/* Tab Selector Buttons */}
              <ol className={s.stepsList} role="tablist" aria-label="Six steps">
                {stepsData.map((step, idx) => (
                  <li key={step.num}>
                    <button
                      type="button"
                      role="tab"
                      id={`step-tab-${step.num}`}
                      aria-controls={`step-panel-${step.num}`}
                      aria-selected={active === idx}
                      className={s.stepButtonDark}
                      onClick={() => goTo(idx)}
                    >
                      <span className={s.stepNumDark}>{step.num}</span>
                      <span className={s.stepTextDark}>
                        <strong>{step.title}</strong>
                        <span className={s.stepDescDark}>{step.desc}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ol>

              {/* Dynamic Interactive Panel */}
              <div className={s.previewCol}>
                <div className={s.panelGlow} aria-hidden="true" />
                <div
                  id={`step-panel-${activeStep.num}`}
                  role="tabpanel"
                  aria-labelledby={`step-tab-${activeStep.num}`}
                  style={{ position: "relative", zIndex: 1 }}
                >
                  <div className={s.interactivePanelDark}>
                    <div className={s.panelTopDark}>
                      <span>{activeStep.panelBar}</span>
                      <span
                        className={`${s.statusBadge} ${s[activeStep.statusType] || s.info}`}
                      >
                        {activeStep.panelStatus}
                      </span>
                    </div>

                    <div className={s.panelHeadDark}>
                      <h3>{activeStep.headTitle}</h3>
                      <p>{activeStep.headDesc}</p>
                    </div>

                    <div className={s.panelBodyDark}>
                      {/* Step 2 Road GPS Milestones Timeline */}
                      {activeStep.timeline && (
                        <div className={s.timelineTrack}>
                          {activeStep.timeline.map((item) => (
                            <div key={item.text} className={s.timelineStep}>
                              <div
                                className={s.timelineDot}
                                aria-hidden="true"
                              />
                              <span className={s.timelineText}>
                                {item.text}
                              </span>
                              <span className={s.timelineTime}>
                                {item.time}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Fields Grid */}
                      {activeStep.fields && (
                        <div className={s.fieldsGridDark}>
                          {activeStep.fields.map((f) => (
                            <div key={f.label} className={s.fieldBoxDark}>
                              <span className={s.fieldLabelDark}>
                                {f.label}
                              </span>
                              <span
                                className={s.fieldValueDark}
                                style={
                                  f.isWarn
                                    ? { color: "#d97706", fontWeight: 700 }
                                    : undefined
                                }
                              >
                                {f.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Step 5 Mail Alerts */}
                      {activeStep.mailAlerts && (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 12,
                          }}
                        >
                          {activeStep.mailAlerts.map((m) => (
                            <div key={m.title} className={s.mailPreviewDark}>
                              <div className={s.mailHeadDark}>
                                <span>{m.title}</span>
                                <span
                                  className={`${s.statusBadge} ${s[m.badgeType]}`}
                                >
                                  {m.badge}
                                </span>
                              </div>
                              <p className={s.mailBodyDark}>{m.body}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Rows List */}
                      {activeStep.rows && (
                        <div className={s.qcardRows}>
                          {activeStep.rows.map((row) => (
                            <div key={row.who} className={s.qcardRow}>
                              <span className={s.rowWho}>{row.who}</span>
                              <span className={s.rowWhat}>{row.what}</span>
                              <span
                                className={`${s.statusBadge} ${s[row.type] || s.ok}`}
                              >
                                {row.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className={s.panelFootDark}>
                      <strong>{activeStep.footBold} </strong>
                      <span>{activeStep.foot}</span>
                    </div>
                  </div>

                  <p className={s.howNote}>
                    Sample data · Example product view
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. CUSTOMER RESULTS SECTION */}
        <section className={s.storySection} aria-labelledby="res-h">
          <div className="site-shell">
            <div className={s.secHead}>
              <p className={s.eyebrow}>
                CUSTOMER RESULT · OCEAN &amp; ROAD TRACKING
              </p>
              <h2 id="res-h" className={s.headline}>
                65% fewer <em>&ldquo;where is my cargo?&rdquo;</em> emails.
              </h2>
              <p className={s.lead}>
                This forwarder tracks more than 1,850 containers and trucks
                every day. Their team hears about delays hours before the
                carrier tells them, and customers check the tracking link
                instead of emailing.
              </p>
            </div>

            <div className={s.resultsGrid4}>
              <div className={s.resultStatCard}>
                <span className={s.resultStatNum}>1,850+</span>
                <span className={s.resultStatLabel}>
                  containers and trucks tracked every day
                </span>
              </div>
              <div className={s.resultStatCard}>
                <span className={s.resultStatNum}>65% fewer</span>
                <span className={s.resultStatLabel}>
                  &ldquo;where is my cargo?&rdquo; emails
                </span>
              </div>
              <div className={s.resultStatCard}>
                <span className={s.resultStatNum}>4.2 hours</span>
                <span className={s.resultStatLabel}>
                  earlier than the carrier&apos;s delay notice
                </span>
              </div>
              <div className={s.resultStatCard}>
                <span className={s.resultStatNum}>15 min</span>
                <span className={s.resultStatLabel}>
                  between ETA and milestone updates
                </span>
              </div>
            </div>

            <div style={{ marginTop: 32 }}>
              <Link href="/demo-form" className="button-secondary">
                <span>See what this would mean for your customers</span>
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* 6. FAQ SECTION */}
        <section id="faq" className={s.faqSection} aria-labelledby="faq-h">
          <div className="site-shell">
            <div className={s.faqLayout}>
              <div className={s.faqHeading}>
                <div>
                  <p className={s.faqEyebrow}>COMMON QUESTIONS</p>
                  <h2 id="faq-h" className={s.faqTitle}>
                    What ops and customer service teams ask us first.
                  </h2>
                  <p className={s.faqDescription}>
                    Something else on your mind?{" "}
                    <Link href="/demo-form">Ask us in the demo.</Link>
                  </p>
                </div>
              </div>

              <SharedFaqAccordion
                items={faqItems}
                defaultOpenIndex={0}
                toggleStyle="plus"
              />
            </div>
          </div>
        </section>

        {/* 7. CLOSING CTA SECTION */}
        <LogisticsClosingCta
          secondaryHref="/logistics-desk/"
          secondaryText="Back to Logistics Desk"
        />
      </main>

      {/* Global Footer */}
      <ShipsyFooter />
    </div>
  );
}

export default ShipmentTrackingPage;
