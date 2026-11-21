'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  FileText,
  FileSpreadsheet,
  Clock,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { LandingNavigation } from '../LandingNavigation';
import { ShipsyFooter } from '../ShipsyFooter';
import { SharedFaqAccordion } from '../SharedFaqAccordion';
import { LogisticsClosingCta } from './LogisticsClosingCta';
import { useAutoCycle } from '@/src/hooks/useAutoCycle';
import layoutStyles from '../LandingPage.module.css';
import s from './EmailToBookingPage.module.css';

/* ── 8 Steps Data ── */
interface HowStep {
  num: number;
  title: string;
  desc: string;
  panelBar: string;
  panelStatus: string;
  statusType: 'info' | 'wait' | 'ok';
  headTitle: string;
  headDesc: string;
  mail?: {
    header: string;
    sub?: string;
    statusBadge?: { text: string; type: 'info' | 'wait' | 'ok' };
    body: string;
    files?: string[];
  };
  fields?: { label: string; value: string }[];
  rows?: { who: string; what: string; status: string; type: 'info' | 'wait' | 'ok' }[];
  table?: {
    headers: string[];
    rows: {
      vendor: string;
      transit: string;
      freeDays: string;
      rate: string;
      best?: boolean;
      mutedSpan?: string;
    }[];
  };
  total?: { meta: string; big: string };
  actions?: { approveText: string; editText: string };
  footBold: string;
  foot: string;
}

const stepsData: HowStep[] = [
  {
    num: 1,
    title: 'Read the enquiry',
    desc: 'Email and attachments picked up',
    panelBar: 'Step 1 of 8 · Sales inbox',
    panelStatus: 'Reading',
    statusType: 'info',
    headTitle: 'Picks up the enquiry and its attachments.',
    headDesc:
      'Reads the email and the attached packing list and Excel sheet from your sales inbox. Ports, equipment, weight, cargo and ready date are picked up without anyone retyping them.',
    mail: {
      header: 'Meera · Orion Trading',
      sub: 'to sales@yourcompany',
      body: '"Hi team, please quote for one 40HC. Cargo is ready 24 Nov. Details are in the attached list. Thanks, Meera"',
      files: ['packing-list.pdf', 'enquiry.xlsx'],
    },
    fields: [
      { label: 'From', value: 'INNSA · Nhava Sheva' },
      { label: 'To', value: 'AEJEA · Jebel Ali' },
      { label: 'Equipment', value: "1 × 40' HC" },
      { label: 'Weight', value: '18,200 kg' },
      { label: 'Cargo', value: 'Garments' },
      { label: 'Ready', value: '24 Nov' },
    ],
    footBold: 'No retyping.',
    foot: 'Picked up from the email and both attachments.',
  },
  {
    num: 2,
    title: "Spot what's missing",
    desc: 'Gaps flagged, question drafted',
    panelBar: 'Step 2 of 8 · Gaps',
    panelStatus: '2 missing',
    statusType: 'wait',
    headTitle: "Flags what you'd have to ask anyway.",
    headDesc:
      "Meera didn't give an Incoterm or say whether the cargo is hazardous. Docsynecx flags it and drafts a short question back to her, so you're not waiting on it at quote time.",
    rows: [
      { who: 'Incoterm', what: 'Not in email or attachments', status: 'Missing', type: 'wait' },
      { who: 'Hazardous (DG)?', what: 'Not stated', status: 'Missing', type: 'wait' },
    ],
    mail: {
      header: 'Draft reply to Meera',
      statusBadge: { text: 'Waiting for you', type: 'wait' },
      body: '"Hi Meera, thanks for the enquiry. Could you confirm the Incoterm (FOB or EXW) and whether the garments contain hazardous goods? We\'ll send your quote through as soon as we have that."',
    },
    footBold: 'One click to send,',
    foot: 'or edit it first.',
  },
  {
    num: 3,
    title: 'Ask vendors for rates',
    desc: 'Sent to the right carriers',
    panelBar: 'Step 3 of 8 · Vendors',
    panelStatus: '3 requested',
    statusType: 'info',
    headTitle: 'Sends to the right carriers and agents.',
    headDesc:
      'Docsynecx knows which lines and agents you use for Nhava Sheva to Jebel Ali. It formats the request with your account references and sends it out, or pulls existing contract rates from your rate sheets.',
    rows: [
      { who: 'Maersk Line', what: 'Contract rate card applied', status: 'Rate card', type: 'ok' },
      { who: 'Hapag-Lloyd', what: 'Request sent via email', status: 'Sent 10:14', type: 'info' },
      { who: 'CMA CGM', what: 'Request sent via portal', status: 'Sent 10:14', type: 'info' },
    ],
    footBold: 'Contract rates first.',
    foot: 'Spot requests only where you need them.',
  },
  {
    num: 4,
    title: 'Compare the quotes',
    desc: 'Side-by-side comparison',
    panelBar: 'Step 4 of 8 · Comparison',
    panelStatus: '3 replies in',
    statusType: 'ok',
    headTitle: 'Lines them up side by side.',
    headDesc:
      "As replies come back, rates, transit times, free days and validity are parsed out and set against one another. You don't have to hunt through five emails to find who had 14 free days.",
    table: {
      headers: ['Vendor', 'Transit', 'Free days', 'Buy rate'],
      rows: [
        { vendor: 'Maersk', transit: '5 days', freeDays: '14 days', rate: '$640', best: true },
        { vendor: 'Hapag-Lloyd', transit: '6 days', freeDays: '7 days', rate: '$690' },
        { vendor: 'CMA CGM', transit: '4 days', freeDays: '7 days', rate: '$735' },
      ],
    },
    footBold: 'Maersk is $50 cheaper',
    foot: 'and gives 7 more free days at Jebel Ali.',
  },
  {
    num: 5,
    title: 'Push back on rates',
    desc: 'Targeted counter-offer',
    panelBar: 'Step 5 of 8 · Negotiation',
    panelStatus: 'Optional',
    statusType: 'wait',
    headTitle: 'Drafts the push-back if you want it.',
    headDesc:
      'Hapag-Lloyd is $50 higher than Maersk. Docsynecx can draft a quick counter-offer with your target rate. You approve it before it goes.',
    mail: {
      header: 'Counter-offer to Hapag-Lloyd',
      sub: 'Target: $640 · to match Maersk',
      statusBadge: { text: 'Drafted', type: 'wait' },
      body: '"Hi team, we have a firm enquiry for 1x40HC INNSA-AEJEA ready 24 Nov. Can you match USD 640 with 14 free days? Booking today if you can."',
    },
    footBold: 'Optional step.',
    foot: 'Skip straight to quoting if you already have the rate you want.',
  },
  {
    num: 6,
    title: 'Draft the customer quote',
    desc: 'Sell rate with your margin',
    panelBar: 'Step 6 of 8 · Draft quote',
    panelStatus: 'Ready',
    statusType: 'ok',
    headTitle: 'Drafts the quote in your own format.',
    headDesc:
      'Applies your margin rules for Orion Trading, writes out the transit time, free days and validity, and prepares the PDF quote or email in your company template.',
    table: {
      headers: ['Item', 'Calculation', 'Amount'],
      rows: [
        { vendor: 'Ocean freight (buy)', transit: 'Maersk', freeDays: '-', rate: '$640', mutedSpan: '$640' },
        { vendor: 'Your margin', transit: 'Agreed 18%', freeDays: '-', rate: '+$115', mutedSpan: '+$115' },
        { vendor: 'Destination THC', transit: 'Pass-through', freeDays: '-', rate: '$30', mutedSpan: '$30' },
      ],
    },
    total: { meta: 'Sell rate to Orion Trading', big: '$785' },
    footBold: 'Same layout',
    foot: 'your customers already know.',
  },
  {
    num: 7,
    title: 'You approve and send',
    desc: 'Nothing goes out until you say so',
    panelBar: 'Step 7 of 8 · Review',
    panelStatus: 'Waiting for you',
    statusType: 'wait',
    headTitle: 'Nothing goes out until you say so.',
    headDesc:
      'The reply to Meera waits in your review list. Change anything you like, then send it.',
    mail: {
      header: 'Quote to Meera · Orion Trading',
      sub: 'INNSA → AEJEA',
      body: '"Hi Meera, please find our rate for 1×40HC Nhava Sheva to Jebel Ali: USD 785, 5 days transit, 14 free days at destination, valid to 30 Nov."',
    },
    actions: { approveText: 'Approve & send', editText: 'Edit quote' },
    footBold: 'Enquiry to quote sent:',
    foot: 'about 15 minutes, including vendor replies.',
  },
  {
    num: 8,
    title: 'Book it',
    desc: 'Booking created in CargoWise',
    panelBar: 'Step 8 of 8 · Booking',
    panelStatus: 'Confirmed',
    statusType: 'ok',
    headTitle: 'Customer says yes, booking is created.',
    headDesc:
      'When Meera confirms, the booking is created and passed to CargoWise with everything already filled in. Ops picks it up from there.',
    rows: [
      { who: 'Orion Trading confirmed', what: '"Go ahead, thanks." · 11:42', status: 'Accepted', type: 'ok' },
      { who: 'Booking created in CargoWise', what: 'Shipper, ports, equipment, cargo, rate', status: 'Done', type: 'ok' },
    ],
    footBold: 'No retyping',
    foot: 'from sales to ops.',
  },
];

/* ── FAQ items ── */
const faqItems = [
  {
    question: 'Do we check every quote before it goes out?',
    answer:
      'Yes. Rate requests, counter-offers and customer quotes all wait for someone on your team to approve them. Nothing goes to a customer or vendor on its own.',
  },
  {
    question: 'What if the enquiry is messy or half the details are missing?',
    answer:
      "That's most freight email, and it's what this is built for. It reads the email body, PDFs and Excel sheets. If something's missing, like the weight, the Incoterm or the ready date, it flags it and drafts the question back to the customer.",
  },
  {
    question: 'Does it work with CargoWise or our own system?',
    answer:
      'Yes. Confirmed bookings go straight into CargoWise or your own ERP, so nobody types them in twice.',
  },
  {
    question: 'Will it fit how our desk already works?',
    answer:
      'Yes. We set it up around your lanes, your vendors, your rate cards and your margin rules. You agree the setup before we start.',
  },
  {
    question: 'How long does setup take?',
    answer:
      'About a week for a typical desk. You test it on your own enquiries before any customer sees a quote.',
  },
];

/* ── Control items ── */
const controlDecisions = [
  { bold: 'Which vendors', desc: 'get a rate request' },
  { bold: 'Whether to push back', desc: 'on a rate' },
  { bold: 'The final price', desc: 'and your margin' },
  { bold: 'When the quote goes', desc: 'to the customer' },
];

export function EmailToBookingPage() {
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
        {/* 1. HERO SECTION (Warm Paper Gradient matching Logistics Desk) */}
        <section className={s.viewportHero} aria-labelledby="hero-title">
          <div className={`site-shell ${s.heroGrid}`}>
            {/* Left Copy */}
            <div className={s.heroCopy}>
              <p className={s.eyebrow}>RFQ-TO-BOOKING · MOST TEAMS START HERE</p>

              <h1 id="hero-title" className={s.heroTitle}>
                Turn every customer enquiry into a <em>ready-to-send quote</em> in minutes.
              </h1>

              <p className={s.heroDescription}>
                Docsynecx reads the enquiry and its attachments, spots what&apos;s missing, asks
                your vendors for rates, compares them side by side and drafts the quote with your
                margin. You check it and send it. When the customer says yes, the booking goes into
                CargoWise.
              </p>

              <div className={s.heroActions}>
                <Link href="/demo/#demo-form" className="button-primary">
                  <span>Book a demo</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>

                <a href="#steps" className="button-secondary">
                  <span>See the 8 steps</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </a>
              </div>

              <p className={s.promise}>
                <CheckCircle2 size={18} aria-hidden="true" />
                <span>Nothing goes to a customer or vendor until your team approves it.</span>
              </p>

              <p className={s.heroTrust}>
                Works with <strong>Standalone or CargoWise</strong>, your own ERP, or just your email inbox. <strong>Live in about a week.</strong>
              </p>
            </div>

            {/* Right Live Preview Card */}
            <div className={s.heroVisualWrapper}>
              <div className={s.ambientGlow} aria-hidden="true" />
              <div className={s.ghostCardBehind} aria-hidden="true" />

              <div
                className={s.qcard}
                role="img"
                aria-label="Example sales inbox summary: 12 enquiries today, 8 quotes drafted, 3 waiting for rates, 1 missing information"
              >
                <div className={s.qcardTop}>
                  <span>
                    <strong>Sales inbox</strong> · Today
                  </span>
                  <span className={`${s.statusBadge} ${s.info}`}>12 enquiries</span>
                </div>
                <div className={s.qcardBody}>
                  <div className={s.deskStats}>
                    <div className={s.statBox}>
                      <span className={s.statVal}>8</span>
                      <span className={s.statLabel}>quotes drafted</span>
                    </div>
                    <div className={s.statBox}>
                      <span className={s.statVal}>3</span>
                      <span className={s.statLabel}>waiting for rates</span>
                    </div>
                    <div className={s.statBox}>
                      <span className={s.statVal}>1</span>
                      <span className={s.statLabel}>missing info</span>
                    </div>
                  </div>

                  <div className={s.qcardRows}>
                    <div className={s.heroRowCard}>
                      <div className={s.heroRowTop}>
                        <span className={s.rowWho}>Orion Trading · Meera</span>
                        <span className={`${s.statusBadge} ${s.ok}`}>Waiting for you</span>
                      </div>
                      <span className={s.rowWhat}>INNSA → AEJEA · 1×40HC</span>
                    </div>

                    <div className={s.heroRowCard}>
                      <div className={s.heroRowTop}>
                        <span className={s.rowWho}>Gulf Home Furnishings LLC</span>
                        <span className={`${s.statusBadge} ${s.info}`}>Rates: 3 of 4 in</span>
                      </div>
                      <span className={s.rowWhat}>CNSHA → AEJEA · 2×40&apos; HC</span>
                    </div>

                    <div className={s.heroRowCard}>
                      <div className={s.heroRowTop}>
                        <span className={s.rowWho}>Rhein Machine Parts GmbH</span>
                        <span className={`${s.statusBadge} ${s.wait}`}>Missing: Incoterm</span>
                      </div>
                      <span className={s.rowWhat}>DEHAM → INMAA · 4 pallets</span>
                    </div>
                  </div>
                </div>
                <p className={s.sampleNote}>Sample data</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. PROOF STATS SECTION (Navy Strip with Warm Cards) */}
        <section className={s.statStrip} aria-label="Results">
          <div className="site-shell">
            <p className={s.statStripEyebrow}>
              PROVEN OUTCOMES · FREIGHT RATE DESK · UAE &amp; INDIA · 12 MONTHS
            </p>
            <div className={s.statsGrid}>
              <div className={s.outcomeCard}>
                <div className={s.outcomeIconBadge} aria-hidden="true">
                  <Clock size={20} />
                </div>
                <div className={s.outcomeCardContent}>
                  <span className={s.outcomeStatValue}>60+ min → 15 min</span>
                  <span className={s.outcomeStatLabel}>from enquiry to quote sent</span>
                </div>
              </div>
              <div className={s.outcomeCard}>
                <div className={s.outcomeIconBadge} aria-hidden="true">
                  <TrendingUp size={20} />
                </div>
                <div className={s.outcomeCardContent}>
                  <span className={s.outcomeStatValue}>120 → 225+</span>
                  <span className={s.outcomeStatLabel}>quotes a day, with the same team</span>
                </div>
              </div>
              <div className={s.outcomeCard}>
                <div className={s.outcomeIconBadge} aria-hidden="true">
                  <Zap size={20} />
                </div>
                <div className={s.outcomeCardContent}>
                  <span className={s.outcomeStatValue}>21 sec</span>
                  <span className={s.outcomeStatLabel}>to draft the quote once rates are in</span>
                </div>
              </div>
            </div>
            <p className={s.statSource}>Results from a freight rate desk, UAE &amp; India, over 12 months.</p>
          </div>
        </section>

        {/* 4. CONTROL SECTION (Clean Light Paper) */}
        <section className={s.controlSection} aria-labelledby="ctrl-h">
          <div className="site-shell">
            <div className={s.controlHead}>
              <p className={s.eyebrow}>YOU STAY IN CHARGE</p>
              <h2 id="ctrl-h" className={s.headline}>
                Docsynecx does the legwork. <em>Your team makes the calls.</em>
              </h2>
              <p className={s.lead}>
                Nothing leaves your company without someone on your team approving it.
              </p>
            </div>

            <ul className={s.decisionList}>
              {controlDecisions.map((item) => (
                <li key={item.bold} className={s.decisionCard}>
                  <strong>{item.bold}</strong>
                  <span>{item.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3. EIGHT STEPS (HOW IT WORKS - Deep Navy Container) */}
        <section id="steps" className={s.howSectionDark} aria-labelledby="steps-h">
          <div className="site-shell">
            <div className={s.secHead}>
              <p className={s.eyebrow}>FOLLOW ONE ENQUIRY</p>
              <h2 id="steps-h" className={s.headlineLight}>
                From Meera&apos;s email to a <em>confirmed booking</em>.
              </h2>
              <p className={s.leadLight}>
                Here&apos;s what happens to one everyday enquiry, step by step. Your team steps in
                wherever something leaves your company.
              </p>
            </div>

            <div className={s.howGrid} {...containerProps}>
              {/* Tab Selector Buttons */}
              <ol className={s.stepsList} role="tablist" aria-label="Eight steps">
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

              {/* Dynamic Interactive Panel — white card with glow */}
              <div className={s.previewCol}>
                <div className={s.panelGlow} aria-hidden="true" />
                <div
                  id={`step-panel-${activeStep.num}`}
                  role="tabpanel"
                  aria-labelledby={`step-tab-${activeStep.num}`}
                  style={{ position: 'relative', zIndex: 1 }}
                >
                <div className={s.interactivePanelDark}>
                  <div className={s.panelTopDark}>
                    <span>{activeStep.panelBar}</span>
                    <span className={`${s.statusBadge} ${s[activeStep.statusType] || s.info}`}>
                      {activeStep.panelStatus}
                    </span>
                  </div>

                  <div className={s.panelHeadDark}>
                    <h3>{activeStep.headTitle}</h3>
                    <p>{activeStep.headDesc}</p>
                  </div>

                  <div className={s.panelBodyDark}>
                    {/* Mail Preview */}
                    {activeStep.mail && (
                      <div className={s.mailPreviewDark}>
                        <div className={s.mailHeadDark}>
                          <span>{activeStep.mail.header}</span>
                          {activeStep.mail.sub && (
                            <span className={s.mailSubDark}>{activeStep.mail.sub}</span>
                          )}
                          {activeStep.mail.statusBadge && (
                            <span
                              className={`${s.statusBadge} ${s[activeStep.mail.statusBadge.type] || s.wait
                                }`}
                            >
                              {activeStep.mail.statusBadge.text}
                            </span>
                          )}
                        </div>
                        <p className={s.mailBodyDark}>{activeStep.mail.body}</p>
                        {activeStep.mail.files && (
                          <div className={s.mailFilesDark}>
                            {activeStep.mail.files.map((file) => (
                              <span key={file} className={s.fileChipDark}>
                                {file.endsWith('.pdf') ? (
                                  <FileText size={14} aria-hidden="true" />
                                ) : (
                                  <FileSpreadsheet size={14} aria-hidden="true" />
                                )}
                                {file}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Step 1 Fields */}
                    {activeStep.fields && (
                      <div className={s.fieldsGridDark}>
                        {activeStep.fields.map((f) => (
                          <div key={f.label} className={s.fieldBoxDark}>
                            <span className={s.fieldLabelDark}>{f.label}</span>
                            <span className={s.fieldValueDark}>{f.value}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Step 2, 3, 8 Rows */}
                    {activeStep.rows && (
                      <div className={s.qcardRows}>
                        {activeStep.rows.map((row) => (
                          <div key={row.who} className={s.qcardRow}>
                            <span className={s.rowWho}>{row.who}</span>
                            <span className={s.rowWhat}>{row.what}</span>
                            <span className={`${s.statusBadge} ${s[row.type] || s.ok}`}>
                              {row.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Step 4 Rate Comparison Table */}
                    {activeStep.table && (
                      <div className={s.tableWrapDark}>
                        <table className={s.dataTableDark}>
                          <thead>
                            <tr>
                              {activeStep.table.headers.map((h) => (
                                <th key={h}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {activeStep.table.rows.map((r, i) => (
                              <tr key={i} className={r.best ? s.bestRow : ''}>
                                <td>
                                  {r.best ? <strong>{r.vendor} ★</strong> : r.vendor}
                                </td>
                                <td>{r.transit}</td>
                                <td>{r.freeDays}</td>
                                <td>
                                  {r.mutedSpan ? (
                                    <span style={{ color: '#64748b' }}>{r.mutedSpan}</span>
                                  ) : (
                                    <strong>{r.rate}</strong>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Step 6 Total Row */}
                    {activeStep.total && (
                      <div className={s.qtotalDark}>
                        <span className={s.totalMetaDark}>{activeStep.total.meta}</span>
                        <span className={s.totalBigDark}>{activeStep.total.big}</span>
                      </div>
                    )}

                    {/* Step 7 Actions (Static UI Mockup) */}
                    {activeStep.actions && (
                      <div className={s.panelActionsDark} aria-hidden="true">
                        <div className={s.approveBtn}>
                          {activeStep.actions.approveText}
                        </div>
                        <div className={s.editBtn}>
                          {activeStep.actions.editText}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className={s.panelFootDark}>
                    <strong>{activeStep.footBold} </strong>
                    <span>{activeStep.foot}</span>
                  </div>
                </div>

                <p className={s.howNote}>Sample data · Example product view</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. CUSTOMER RESULTS SECTION (Warm Paper Gradient) */}
        <section className={s.storySection} aria-labelledby="res-h">
          <div className="site-shell">
            <div className={s.secHead}>
              <p className={s.eyebrow}>
                CUSTOMER RESULT · FREIGHT RATE DESK · UAE &amp; INDIA · 12 MONTHS
              </p>
              <h2 id="res-h" className={s.headline}>
                Same team, <em>nearly twice the quotes</em>.
              </h2>
              <p className={s.lead}>
                Their desk used to send about 120 quotes a day. A year later it&apos;s over 225, with
                the same people. Every enquiry goes through the same steps, not just the easy ones.
              </p>
            </div>

            <div className={s.resultsGrid4}>
              <div className={s.resultStatCard}>
                <span className={s.resultStatNum}>120 → 225+</span>
                <span className={s.resultStatLabel}>quotes a day</span>
              </div>
              <div className={s.resultStatCard}>
                <span className={s.resultStatNum}>15 min</span>
                <span className={s.resultStatLabel}>from enquiry to quote sent, was 60+ min</span>
              </div>
              <div className={s.resultStatCard}>
                <span className={s.resultStatNum}>21 sec</span>
                <span className={s.resultStatLabel}>to draft the quote once vendor rates are in</span>
              </div>
              <div className={s.resultStatCard}>
                <span className={s.resultStatNum}>35% → 73%</span>
                <span className={s.resultStatLabel}>of quotes won. Faster quotes, more first replies.</span>
              </div>
            </div>

            <div style={{ marginTop: 32 }}>
              <Link href="/demo/#demo-form" className="button-secondary">
                <span>See what this would mean for your desk</span>
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* 6. FAQ SECTION (Matching logistics-desk way) */}
        <section id="faq" className={s.faqSection} aria-labelledby="faq-h">
          <div className="site-shell">
            <div className={s.faqLayout}>
              <div className={s.faqHeading}>
                <div>
                  <p className={s.faqEyebrow}>COMMON QUESTIONS</p>
                  <h2 id="faq-h" className={s.faqTitle}>
                    What forwarders ask us first.
                  </h2>
                  <p className={s.faqDescription}>
                    Something else on your mind?{' '}
                    <Link href="/demo/#demo-form">Ask us in the demo.</Link>
                  </p>
                </div>
              </div>

              <SharedFaqAccordion items={faqItems} defaultOpenIndex={0} toggleStyle="plus" />
            </div>
          </div>
        </section>

        {/* 7. CLOSING CTA SECTION (Shared Logistics Closing CTA) */}
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

export default EmailToBookingPage;
