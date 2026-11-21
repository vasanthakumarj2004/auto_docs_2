'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  TrendingUp,
  ShieldCheck,
  FileText,
  FileSpreadsheet,
} from 'lucide-react';
import { LandingNavigation } from '../LandingNavigation';
import { ShipsyFooter } from '../ShipsyFooter';
import { SharedFaqAccordion } from '../SharedFaqAccordion';
import { LogisticsClosingCta } from './LogisticsClosingCta';
import { useAutoCycle } from '@/src/hooks/useAutoCycle';
import layoutStyles from '../LandingPage.module.css';
import s from './EmailToBookingPage.module.css';

/* ── 5 Steps Data ── */
interface OpsStep {
  num: number;
  title: string;
  desc: string;
  panelBar: string;
  panelStatus: string;
  statusType: 'info' | 'wait' | 'ok';
  headTitle: string;
  headDesc: string;
  fields?: { label: string; value: string }[];
  rows?: { who: string; what: string; status: string; type: 'info' | 'wait' | 'ok' }[];
  files?: string[];
  docCheckTable?: {
    headers: string[];
    rows: {
      field: string;
      draftBL: string;
      draftBLStatus?: 'good' | 'bad';
      invoice: string;
      invoiceStatus?: 'good' | 'bad';
      packingList: string;
      packingListStatus?: 'good' | 'bad';
    }[];
  };
  ratesTable?: {
    headers: string[];
    rows: { charge: string; agreed: string; invoiced: string; isFlagged?: boolean }[];
  };
  footBold: string;
  foot: string;
}

const stepsData: OpsStep[] = [
  {
    num: 1,
    title: 'Accepted quote to job',
    desc: 'No retyping from sales to ops',
    panelBar: 'Step 1 of 5 · New job',
    panelStatus: 'Created from quote',
    statusType: 'ok',
    headTitle: 'The accepted quote becomes the job.',
    headDesc:
      'When the customer says yes, the job is opened with the shipper, consignee, cargo, ports, Incoterm and agreed rate already filled in from the quote. Nobody in ops retypes it.',
    fields: [
      { label: 'Job', value: 'JOB-2026-8812' },
      { label: 'From quote', value: 'QT-9042' },
      { label: 'Shipper', value: 'Orion Trading' },
      { label: 'Route', value: 'INNSA → AEJEA' },
      { label: 'Equipment', value: "1 × 40' HC FCL" },
      { label: 'Cargo', value: 'Garments · 18,200 kg' },
      { label: 'Incoterm', value: 'FOB Nhava Sheva' },
      { label: 'Carrier', value: 'Carrier A' },
      { label: 'Sell rate', value: 'USD 785' },
    ],
    footBold: 'Sales to ops in one step.',
    foot: 'The same details the customer agreed to.',
  },
  {
    num: 2,
    title: 'Pushed to your ERP',
    desc: 'Pushed to CargoWise or your ERP',
    panelBar: 'Step 2 of 5 · Job created',
    panelStatus: 'Pushed',
    statusType: 'ok',
    headTitle: 'The job is created and pushed to your system.',
    headDesc:
      'Docsynecx creates the job, then pushes it to CargoWise or your own ERP, so ops works where they always work. If you don\'t use one, the job stays in Docsynecx.',
    rows: [
      { who: 'Job created', what: 'JOB-2026-8812', status: 'Done', type: 'ok' },
      { who: 'Pushed to CargoWise or ERP', what: 'Job, parties, cargo and rate', status: 'Pushed', type: 'ok' },
      { who: 'Shipper and consignee', what: 'Matched to existing CargoWise records', status: 'Matched', type: 'ok' },
      { who: 'Milestones', what: 'Cargo ready 24 Nov · ETD 27 Nov', status: 'Added', type: 'ok' },
    ],
    footBold: 'No double entry.',
    foot: 'One job, in the system you already use.',
  },
  {
    num: 3,
    title: 'Reads every document',
    desc: 'B/L, invoice and packing list',
    panelBar: 'Step 3 of 5 · Documents',
    panelStatus: '3 read',
    statusType: 'info',
    headTitle: 'Reads every document on the job.',
    headDesc:
      'Pulls container and seal numbers, weights, package counts and parties from the draft B/L, commercial invoice and packing list as they arrive.',
    files: ['draft-BL-8812.pdf', 'commercial-invoice.pdf', 'packing-list.xlsx'],
    fields: [
      { label: 'Container', value: 'MSCU8921045' },
      { label: 'Seal', value: 'ML-448120' },
      { label: 'Packages', value: '640 cartons' },
    ],
    footBold: 'No copying between documents.',
    foot: 'Every figure is read once and shared across the job.',
  },
  {
    num: 4,
    title: 'Document mismatch check',
    desc: 'Flagged before the B/L is final',
    panelBar: 'Step 4 of 5 · Document check',
    panelStatus: '1 to clear',
    statusType: 'wait',
    headTitle: 'Catches the mismatch before it costs you.',
    headDesc:
      'Container numbers, seals, weights and package counts are checked across all three documents. Anything that doesn\'t match waits for your ops team.',
    docCheckTable: {
      headers: ['Field', 'Draft B/L', 'Invoice', 'Packing list'],
      rows: [
        { field: 'Container', draftBL: 'MSCU8921045', draftBLStatus: 'good', invoice: 'MSCU8921045', invoiceStatus: 'good', packingList: 'MSCU8921045', packingListStatus: 'good' },
        { field: 'Seal', draftBL: 'ML-448120', draftBLStatus: 'good', invoice: 'n/a', invoiceStatus: 'good', packingList: 'ML-448120', packingListStatus: 'good' },
        { field: 'Gross weight', draftBL: '18,400 kg', draftBLStatus: 'bad', invoice: '18,200 kg', invoiceStatus: 'good', packingList: '18,200 kg', packingListStatus: 'good' },
        { field: 'Packages', draftBL: '640 ctns', draftBLStatus: 'good', invoice: '640 ctns', invoiceStatus: 'good', packingList: '640 ctns', packingListStatus: 'good' },
      ],
    },
    footBold: 'Weight on the draft B/L is 200 kg over.',
    foot: 'Flagged for ops to correct with the carrier before the B/L is final.',
  },
  {
    num: 5,
    title: 'Checks vendor bills',
    desc: 'Against the rate you agreed',
    panelBar: 'Step 5 of 5 · Vendor invoice',
    panelStatus: '1 charge flagged',
    statusType: 'wait',
    headTitle: 'Checks what vendors bill you.',
    headDesc:
      'When the carrier\'s invoice arrives, it\'s compared line by line with the rate you agreed. Extra charges are flagged before you pay.',
    ratesTable: {
      headers: ['Charge', 'Agreed', 'Invoiced'],
      rows: [
        { charge: 'Ocean freight', agreed: '$640', invoiced: '$640' },
        { charge: 'Origin THC', agreed: 'Included', invoiced: '$85', isFlagged: true },
      ],
    },
    footBold: '$85 terminal handling charge wasn\'t in the agreed rate.',
    foot: 'Flagged for your team to query with Carrier A.',
  },
];

/* ── FAQ items ── */
const faqItems = [
  {
    question: 'Does my team still check the documents?',
    answer:
      'Yes. Anything that doesn\'t match, and any extra charge on a vendor invoice, waits for someone on your ops team. Nothing is finalised or paid on its own.',
  },
  {
    question: 'Does it work with CargoWise or our own system?',
    answer:
      'Yes. Docsynecx creates the job and pushes it to CargoWise or your own ERP, so ops keeps working where they already work. If you don\'t use one, jobs stay in Docsynecx.',
  },
  {
    question: 'Which documents can it read?',
    answer:
      'B/Ls, commercial invoices, packing lists and shipping orders, as PDFs, scans or Excel sheets. We check your own document formats during setup.',
  },
  {
    question: 'Will it fit how our ops desk already works?',
    answer:
      'Yes. We set it up around your document types, the checks you already do and who approves what. You agree the setup before we start.',
  },
  {
    question: 'How long does setup take?',
    answer:
      'About a week for a typical team. You test it on your own jobs and documents before going live.',
  },
];

/* ── Control items ── */
const controlDecisions = [
  { bold: 'How to fix a mismatch', desc: 'and who to ask' },
  { bold: 'When the B/L is final', desc: 'with the carrier' },
  { bold: 'When the job is ready', desc: 'to move on' },
  { bold: 'Whether to pay', desc: 'a vendor invoice' },
];

export function ShipmentOperationsPage() {
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
        <section className={s.viewportHero} aria-labelledby="hero-title">
          <div className={`site-shell ${s.heroGrid}`}>
            {/* Left Copy */}
            <div className={s.heroCopy}>
              <p className={s.eyebrow}>SHIPMENT OPERATIONS · FROM SALES TO OPS</p>

              <h1 id="hero-title" className={s.heroTitle}>
                The quote is won. <em>Now the paperwork starts.</em>
              </h1>

              <p className={s.heroDescription}>
                Re-keying the job order. Chasing document fields. Calling the carrier. Twenty-five
                minutes per shipment. Docsynecx opens the job from the accepted quote, checks the
                documents and flags what doesn&apos;t match.
              </p>

              <div className={s.heroActions}>
                <Link href="/demo/#demo-form" className="button-primary">
                  <span>Book a demo</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <a href="#steps" className="button-secondary">
                  <span>See the 5 steps</span>
                </a>
              </div>

              <p className={s.promise}>
                <CheckCircle2 size={18} aria-hidden="true" />
                <span>
                  Anything that doesn&apos;t match waits for your ops team. Nothing is finalised until
                  they clear it.
                </span>
              </p>

              <p className={s.heroTrust}>
                Works with <strong>Standalone or CargoWise</strong>, your own ERP, or just your email inbox.{' '}
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
                aria-label="Example ops desk summary: 24 jobs opened today, 21 documents matched, 3 mismatches waiting for ops"
              >
                <div className={s.qcardTop}>
                  <span>
                    <strong>Ops desk</strong> · Today
                  </span>
                  <span className={`${s.statusBadge} ${s.info}`}>24 jobs opened</span>
                </div>
                <div className={s.qcardBody}>
                  <div className={s.deskStats}>
                    <div className={s.statBox}>
                      <span className={s.statVal}>21</span>
                      <span className={s.statLabel}>documents all match</span>
                    </div>
                    <div className={s.statBox}>
                      <span className={s.statVal}>3</span>
                      <span className={s.statLabel}>mismatches to clear</span>
                    </div>
                    <div className={s.statBox}>
                      <span className={s.statVal}>2</span>
                      <span className={s.statLabel}>vendor invoices flagged</span>
                    </div>
                  </div>

                  <div className={s.qcardRows}>
                    <div className={s.heroRowCard}>
                      <div className={s.heroRowTop}>
                        <span className={s.rowWho}>JOB-2026-8812 · Orion Trading</span>
                        <span className={`${s.statusBadge} ${s.wait}`}>Weight mismatch</span>
                      </div>
                      <span className={s.rowWhat}>INNSA → AEJEA · 1×40&apos; HC</span>
                    </div>

                    <div className={s.heroRowCard}>
                      <div className={s.heroRowTop}>
                        <span className={s.rowWho}>JOB-2026-8813 · Gulf Home Furnishings</span>
                        <span className={`${s.statusBadge} ${s.ok}`}>All match</span>
                      </div>
                      <span className={s.rowWhat}>CNSHA → AEJEA · 2×40&apos; HC</span>
                    </div>

                    <div className={s.heroRowCard}>
                      <div className={s.heroRowTop}>
                        <span className={s.rowWho}>JOB-2026-8815 · Rhein Machine Parts</span>
                        <span className={`${s.statusBadge} ${s.info}`}>Waiting for B/L</span>
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

        {/* 2. PROOF STATS SECTION */}
        <section className={s.statStrip} aria-label="Results">
          <div className="site-shell">
            <p className={s.statStripEyebrow}>
              PROVEN OUTCOMES · OCEAN &amp; AIR OPERATIONS · 12 MONTHS
            </p>
            <div className={s.statsGrid}>
              <div className={s.outcomeCard}>
                <div className={s.outcomeIconBadge} aria-hidden="true">
                  <Clock size={20} />
                </div>
                <div className={s.outcomeCardContent}>
                  <span className={s.outcomeStatValue}>25+ min → 35 sec</span>
                  <span className={s.outcomeStatLabel}>to set up a new job</span>
                </div>
              </div>
              <div className={s.outcomeCard}>
                <div className={s.outcomeIconBadge} aria-hidden="true">
                  <TrendingUp size={20} />
                </div>
                <div className={s.outcomeCardContent}>
                  <span className={s.outcomeStatValue}>175 → 420+</span>
                  <span className={s.outcomeStatLabel}>jobs opened a day, same team</span>
                </div>
              </div>
              <div className={s.outcomeCard}>
                <div className={s.outcomeIconBadge} aria-hidden="true">
                  <ShieldCheck size={20} />
                </div>
                <div className={s.outcomeCardContent}>
                  <span className={s.outcomeStatValue}>99.4%</span>
                  <span className={s.outcomeStatLabel}>of document details read correctly</span>
                </div>
              </div>
            </div>
            <p className={s.statSource}>
              Results from an ocean and air operations team over 12 months. Accuracy measured on B/Ls,
              packing lists and commercial invoices.
            </p>
          </div>
        </section>

        {/* 3. CONTROL SECTION */}
        <section className={s.controlSection} aria-labelledby="ctrl-h">
          <div className="site-shell">
            <div className={s.controlHead}>
              <p className={s.eyebrow}>YOU STAY IN CHARGE</p>
              <h2 id="ctrl-h" className={s.headline}>
                Docsynecx does the checking. <em>Your team makes the calls.</em>
              </h2>
              <p className={s.lead}>
                Mismatches and extra charges always stop for a person. Nothing is finalised or paid
                on its own.
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

        {/* 4. FIVE STEPS (HOW IT WORKS) */}
        <section id="steps" className={s.howSectionDark} aria-labelledby="steps-h">
          <div className="site-shell">
            <div className={s.secHead}>
              <p className={s.eyebrow}>FOLLOW ONE SHIPMENT</p>
              <h2 id="steps-h" className={s.headlineLight}>
                From accepted quote to a <em>clean set of documents</em>.
              </h2>
              <p className={s.leadLight}>
                Here&apos;s how one job moves from the quote to CargoWise, with every document checked
                along the way.
              </p>
            </div>

            <div className={s.howGrid} {...containerProps}>
              {/* Tab Selector Buttons */}
              <ol className={s.stepsList} role="tablist" aria-label="Five steps">
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
                      {/* Step 3 Attached Files */}
                      {activeStep.files && (
                        <div className={s.mailFilesDark} style={{ marginBottom: 16 }}>
                          {activeStep.files.map((file) => (
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

                      {/* Fields Grid */}
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

                      {/* Rows List */}
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

                      {/* Step 4 Document Check Comparison Table */}
                      {activeStep.docCheckTable && (
                        <div className={s.tableWrapDark}>
                          <table className={s.dataTableDark}>
                            <thead>
                              <tr>
                                {activeStep.docCheckTable.headers.map((h) => (
                                  <th key={h}>{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {activeStep.docCheckTable.rows.map((r) => (
                                <tr key={r.field}>
                                  <td style={{ fontWeight: 600 }}>{r.field}</td>
                                  <td className={r.draftBLStatus === 'bad' ? s.tagBad : s.tagGood}>
                                    {r.draftBL}
                                  </td>
                                  <td className={r.invoiceStatus === 'bad' ? s.tagBad : s.tagGood}>
                                    {r.invoice}
                                  </td>
                                  <td className={r.packingListStatus === 'bad' ? s.tagBad : s.tagGood}>
                                    {r.packingList}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Step 5 Rates & Invoice Reconciliation Table */}
                      {activeStep.ratesTable && (
                        <div className={s.tableWrapDark}>
                          <table className={s.dataTableDark}>
                            <thead>
                              <tr>
                                {activeStep.ratesTable.headers.map((h) => (
                                  <th key={h}>{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {activeStep.ratesTable.rows.map((r) => (
                                <tr key={r.charge}>
                                  <td style={{ fontWeight: 600 }}>{r.charge}</td>
                                  <td>{r.agreed}</td>
                                  <td className={r.isFlagged ? s.tagWarn : undefined}>
                                    {r.invoiced}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
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

        {/* 5. CUSTOMER RESULTS SECTION */}
        <section className={s.storySection} aria-labelledby="res-h">
          <div className="site-shell">
            <div className={s.secHead}>
              <p className={s.eyebrow}>
                CUSTOMER RESULT · OCEAN &amp; AIR OPERATIONS · 12 MONTHS
              </p>
              <h2 id="res-h" className={s.headline}>
                Job set-up in 35 seconds, <em>not 25 minutes</em>.
              </h2>
              <p className={s.lead}>
                This ops team used to open about 175 jobs a day. A year later it&apos;s over 420, with
                the same people. Every job goes through the same document checks, not just the big
                ones.
              </p>
            </div>

            <div className={s.resultsGrid4}>
              <div className={s.resultStatCard}>
                <span className={s.resultStatNum}>175 → 420+</span>
                <span className={s.resultStatLabel}>jobs opened a day</span>
              </div>
              <div className={s.resultStatCard}>
                <span className={s.resultStatNum}>35 sec</span>
                <span className={s.resultStatLabel}>median time to set up a job, was 25+ min</span>
              </div>
              <div className={s.resultStatCard}>
                <span className={s.resultStatNum}>99.4%</span>
                <span className={s.resultStatLabel}>
                  of details read correctly from B/Ls, invoices and packing lists
                </span>
              </div>
              <div className={s.resultStatCard}>
                <span className={s.resultStatNum}>Every job</span>
                <span className={s.resultStatLabel}>
                  checked across the B/L, invoice and packing list
                </span>
              </div>
            </div>

            <div style={{ marginTop: 32 }}>
              <Link href="/demo/#demo-form" className="button-secondary">
                <span>See what this would mean for your ops team</span>
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
                    What ops managers ask us first.
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

export default ShipmentOperationsPage;
