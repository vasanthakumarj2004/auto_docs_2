'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  FileSpreadsheet,
  Layers,
  Receipt,
  Sparkles,
} from 'lucide-react';
import { LandingNavigation } from '../LandingNavigation';
import { ShipsyFooter } from '../ShipsyFooter';
import { SharedFaqAccordion } from '../SharedFaqAccordion';
import { LogisticsClosingCta } from './LogisticsClosingCta';
import { useAutoCycle } from '@/src/hooks/useAutoCycle';
import layoutStyles from '../LandingPage.module.css';
import s from './EmailToBookingPage.module.css';

/* ── 6 Steps Data ── */
interface IntelStep {
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
  table?: {
    headers: string[];
    rows: (string | number)[][];
    bestIndex?: number;
    warnCol?: number;
  };
  footBold: string;
  foot: string;
}

const stepsData: IntelStep[] = [
  {
    num: 1,
    title: 'Real profit per job',
    desc: 'What you billed minus what you paid',
    panelBar: '1 · Job profit · November',
    panelStatus: '212 jobs',
    statusType: 'info',
    headTitle: 'The real profit on every job.',
    headDesc:
      'Your sell rate against the carrier\'s buy rate and every surcharge on the vendor invoice. Gross profit per job, without a spreadsheet.',
    rows: [
      { who: 'JOB-2026-8812 · Orion Trading', what: 'Sell $785 · Cost $725', status: '$60 · 7.6%', type: 'wait' },
      { who: 'JOB-2026-8813 · Gulf Home Furnishings', what: 'Sell $2,840 · Cost $2,360', status: '$480 · 16.9%', type: 'ok' },
      { who: 'JOB-2026-8815 · Rhein Machine Parts', what: 'Sell $890 · Cost $690', status: '$200 · 22.5%', type: 'ok' },
    ],
    footBold: 'Sorted by margin,',
    foot: 'so the thin ones are at the top.',
  },
  {
    num: 2,
    title: 'Quoted vs actual gaps',
    desc: 'Where the final cost crept up',
    panelBar: '2 · Quoted vs actual',
    panelStatus: '14 jobs over',
    statusType: 'wait',
    headTitle: 'Spot jobs where the cost crept up.',
    headDesc:
      'Every job compared with what you quoted. You see which jobs cost more than planned, and by how much.',
    table: {
      headers: ['Job', 'Quoted cost', 'Actual cost', 'Gap'],
      rows: [
        ['JOB-8812', '$640', '$725', '+$85'],
        ['JOB-8790', '$1,180', '$1,240', '+$60'],
        ['JOB-8813', '$2,360', '$2,360', '$0'],
      ],
      warnCol: 3,
    },
    footBold: '14 jobs',
    foot: 'this month cost more than quoted.',
  },
  {
    num: 3,
    title: 'Unbilled vendor charges',
    desc: 'Detention, demurrage, THC',
    panelBar: '3 · Charges not billed',
    panelStatus: '$3,420 this month',
    statusType: 'wait',
    headTitle: 'Charges you paid but didn\'t pass on.',
    headDesc:
      'Detention, demurrage, terminal handling and waiting time that showed up on vendor invoices but never made it onto the customer\'s invoice.',
    rows: [
      { who: 'Detention, Jebel Ali', what: '6 jobs · 2 customers', status: '$1,860', type: 'wait' },
      { who: 'Origin THC', what: '11 jobs · Carrier A', status: '$935', type: 'wait' },
      { who: 'Truck waiting time', what: '5 jobs · Nhava Sheva', status: '$625', type: 'wait' },
    ],
    footBold: 'Bill it back',
    foot: 'or fix the quote template before next month.',
  },
  {
    num: 4,
    title: 'Lane margin analysis',
    desc: 'Which routes earn, which run thin',
    panelBar: '4 · Lanes · November',
    panelStatus: '3 of 18 lanes',
    statusType: 'info',
    headTitle: 'Which routes earn, and which you\'re pricing too thin.',
    headDesc:
      'Volume, average margin and unbilled charges for every lane you move.',
    table: {
      headers: ['Lane', 'Jobs', 'Avg margin'],
      rows: [
        ['DEHAM → INMAA', 12, '21.0%'],
        ['INNSA → AEJEA', 42, '14.2%'],
        ['CNSHA → AEJEA', 31, '9.8%'],
      ],
      warnCol: 2,
    },
    footBold: 'Your busiest lanes aren\'t always your best.',
    foot: '',
  },
  {
    num: 5,
    title: 'Carrier on-time & leaks',
    desc: 'On-time record and detention',
    panelBar: '5 · Carriers · Last 90 days',
    panelStatus: '4 carriers',
    statusType: 'info',
    headTitle: 'Which carriers actually deliver.',
    headDesc:
      'On-time arrivals, average delay and detention days for each carrier, from your own tracking data.',
    table: {
      headers: ['Carrier', 'On time', 'Avg delay', 'Detention days'],
      rows: [
        ['Carrier A', '92%', '0.4 days', 3],
        ['Agent B', '85%', '1.1 days', 9],
        ['Carrier C', '78%', '1.8 days', 14],
      ],
      bestIndex: 0,
    },
    footBold: 'The cheapest rate isn\'t always the cheapest carrier.',
    foot: '',
  },
  {
    num: 6,
    title: 'Month-end management pack',
    desc: 'Ready on day one',
    panelBar: '6 · Management report · November',
    panelStatus: 'Ready 1 Dec',
    statusType: 'ok',
    headTitle: 'Your month-end report, ready on day one.',
    headDesc:
      'Margins by customer, lane and branch, with the month\'s leaks and late carriers, in one report for management.',
    fields: [
      { label: 'Jobs', value: '212' },
      { label: 'Gross profit', value: '$48,300' },
      { label: 'Avg margin', value: '14.6%' },
      { label: 'Not billed', value: '$3,420' },
      { label: 'Top lane', value: 'INNSA → AEJEA' },
      { label: 'Branches', value: 'Chennai · Mumbai' },
    ],
    footBold: 'No waiting a week',
    foot: 'for accounts to close the month.',
  },
];

/* ── FAQ items ── */
const faqItems = [
  {
    question: 'When will it be available?',
    answer:
      'It\'s in development now. Join early access and we\'ll tell you when it\'s ready to run on your jobs.',
  },
  {
    question: 'Do we need the other modules?',
    answer:
      'It works best with them, because your quotes, jobs and vendor invoices are already in one place. If you don\'t use them, we\'ll look at bringing the same data in from CargoWise or your ERP.',
  },
  {
    question: 'Does it work with CargoWise or our own system?',
    answer:
      'That\'s the plan. We\'ll check what data your system can share, and how, before you start.',
  },
  {
    question: 'Does it change anything in our jobs or invoices?',
    answer:
      'No. It only reads your data and shows reports. It doesn\'t send, change or approve anything.',
  },
];

/* ── Control items ── */
const controlDecisions = [
  { bold: '1. Bring in', desc: 'quotes, jobs and vendor invoices' },
  { bold: '2. Match up', desc: 'each job with its quote and invoices' },
  { bold: '3. Work out', desc: 'profit, gaps and unbilled charges' },
  { bold: '4. Report', desc: 'by job, customer, lane and carrier' },
];

export function FreightIntelligencePage() {
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
              <nav aria-label="Breadcrumb" className={s.breadcrumb}>
                <Link href="/logistics-desk/">Logistics Desk</Link>
                <span className={s.breadcrumbSeparator}>/</span>
                <span>Freight Intelligence</span>
              </nav>

              <p className={s.eyebrow}>
                <span className={s.soonPill}>Coming soon</span>
                FREIGHT INTELLIGENCE · PROFIT AND PERFORMANCE
              </p>

              <h1 id="hero-title" className={s.heroTitle}>
                See which jobs, customers and lanes <em>actually make you money.</em>
              </h1>

              <p className={s.heroDescription}>
                Margins worked out in Excel. Detention you paid but never billed. Month-end reports
                that arrive a week late. Freight Intelligence will show the real profit on every
                job, and where it&apos;s leaking.
              </p>

              <div className={s.heroActions}>
                <Link href="/demo/#demo-form" className="button-primary">
                  <span>Join early access</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <a href="#steps" className="button-secondary">
                  <span>See what you&apos;ll get</span>
                </a>
              </div>

              <p className={s.promise}>
                <CheckCircle2 size={18} aria-hidden="true" />
                <span>Built on the quotes, jobs and vendor invoices already in your desk.</span>
              </p>

              <p className={s.heroTrust}>
                Works with <strong>Standalone or CargoWise</strong>, your own ERP, or just your email inbox.{' '}
                <strong>Early access now open.</strong>
              </p>
            </div>

            {/* Right Live Preview Card */}
            <div className={s.heroVisualWrapper}>
              <div className={s.ambientGlow} aria-hidden="true" />
              <div className={s.ghostCardBehind} aria-hidden="true" />

              <div
                className={s.intelligenceCard}
                role="img"
                aria-label="Example job profit: Orion Trading job quoted at 18.5 percent margin, actual margin 7.6 percent after an unbilled terminal handling charge"
              >
                <div className={s.intelCardTop}>
                  <span>
                    <strong>Job profit</strong> · JOB-2026-8812
                  </span>
                  <span className={s.marginLeakBadge}>MARGIN LEAK</span>
                </div>
                <div className={s.intelCardBody}>
                  <div className={s.intelRouteHeader}>
                    <span>INNSA</span>
                    <span className={s.intelRouteArrow}>→</span>
                    <span>AEJEA</span>
                  </div>
                  <p className={s.intelMetaText}>Orion Trading · 1 × 40&apos; HC · Carrier A</p>

                  <table className={s.intelTable}>
                    <thead>
                      <tr>
                        <th>Line</th>
                        <th>Quoted</th>
                        <th>Actual</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Sell rate</td>
                        <td>$785</td>
                        <td>$785</td>
                      </tr>
                      <tr>
                        <td>Ocean freight</td>
                        <td>$640</td>
                        <td>$640</td>
                      </tr>
                      <tr>
                        <td>Origin THC</td>
                        <td>$0</td>
                        <td className={s.intelWarnVal}>$85</td>
                      </tr>
                      <tr className={s.intelProfitRow}>
                        <td>
                          <strong>Profit</strong>
                        </td>
                        <td>$145</td>
                        <td className={s.intelWarnVal}>$60</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className={s.intelMarginBox}>
                    <span className={s.intelMarginLabel}>Margin, quoted → actual</span>
                    <span className={s.intelMarginValue}>18.5% → 7.6%</span>
                  </div>
                </div>
                <p className={s.intelSampleFoot}>SAMPLE DATA · EXAMPLE OF WHAT YOU&apos;LL SEE</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. WHERE THE NUMBERS COME FROM SECTION */}
        <section className={s.statStrip} aria-label="Where the numbers come from">
          <div className="site-shell">
            <p className={s.statStripEyebrow}>WHERE THE NUMBERS COME FROM</p>
            <div className={s.statsGrid}>
              <div className={s.outcomeCard}>
                <div className={s.outcomeIconBadge} aria-hidden="true">
                  <FileSpreadsheet size={20} />
                </div>
                <div className={s.outcomeCardContent}>
                  <span className={s.outcomeStatValue}>Quotes</span>
                  <span className={s.outcomeStatLabel}>
                    what you agreed with the customer, from RFQ-to-Booking
                  </span>
                </div>
              </div>
              <div className={s.outcomeCard}>
                <div className={s.outcomeIconBadge} aria-hidden="true">
                  <Layers size={20} />
                </div>
                <div className={s.outcomeCardContent}>
                  <span className={s.outcomeStatValue}>Jobs</span>
                  <span className={s.outcomeStatLabel}>
                    what actually moved, from Shipment Operations or your ERP
                  </span>
                </div>
              </div>
              <div className={s.outcomeCard}>
                <div className={s.outcomeIconBadge} aria-hidden="true">
                  <Receipt size={20} />
                </div>
                <div className={s.outcomeCardContent}>
                  <span className={s.outcomeStatValue}>Vendor invoices</span>
                  <span className={s.outcomeStatLabel}>what you actually paid, line by line</span>
                </div>
              </div>
            </div>
            <p className={s.statSource}>
              Freight Intelligence is in development. What&apos;s shown on this page is the planned
              scope, with sample data.
            </p>
          </div>
        </section>

        {/* 3. CONTROL SECTION */}
        <section className={s.controlSection} aria-labelledby="ctrl-h">
          <div className="site-shell">
            <div className={s.controlHead}>
              <p className={s.eyebrow}>HOW IT WORKS</p>
              <h2 id="ctrl-h" className={s.headline}>
                No new data entry. <em>It uses what your desk already has.</em>
              </h2>
              <p className={s.lead}>
                If you use RFQ-to-Booking and Shipment Operations, the numbers are already there.
                If you don&apos;t, we&apos;ll look at bringing them in from CargoWise or your ERP.
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

        {/* 4. SIX STEPS (HOW IT WORKS) */}
        <section id="steps" className={s.howSectionDark} aria-labelledby="steps-h">
          <div className="site-shell">
            <div className={s.secHead}>
              <p className={s.eyebrow}>WHAT YOU GET</p>
              <h2 id="steps-h" className={s.headlineLight}>
                Six answers your management team <em>asks for every month</em>.
              </h2>
              <p className={s.leadLight}>
                Here&apos;s what Freight Intelligence pulls together across your quotes, jobs and
                invoices.
              </p>
            </div>

            <div className={s.howGrid} {...containerProps}>
              {/* Tab Selector Buttons */}
              <ol className={s.stepsList} role="tablist" aria-label="Six answers">
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

                      {/* Tables */}
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
                              {activeStep.table.rows.map((row, rIdx) => {
                                const isBest = activeStep.table?.bestIndex === rIdx;
                                return (
                                  <tr key={rIdx} className={isBest ? s.bestRow : undefined}>
                                    {row.map((cell, cIdx) => {
                                      const isWarn =
                                        activeStep.table?.warnCol === cIdx &&
                                        typeof cell === 'string' &&
                                        (cell.includes('+') || cell.includes('9.8%'));
                                      return (
                                        <td
                                          key={cIdx}
                                          style={{
                                            fontWeight: cIdx === 0 ? 600 : 400,
                                            color: isWarn ? '#d97706' : undefined,
                                          }}
                                        >
                                          {cell}
                                        </td>
                                      );
                                    })}
                                  </tr>
                                );
                              })}
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

        {/* 5. EARLY ACCESS RESULTS SECTION */}
        <section className={s.storySection} aria-labelledby="res-h">
          <div className="site-shell">
            <div className={s.secHead}>
              <p className={s.eyebrow}>EARLY ACCESS</p>
              <h2 id="res-h" className={s.headline}>
                Help shape it with <em>your own numbers</em>.
              </h2>
              <p className={s.lead}>
                We&apos;re building Freight Intelligence with a small group of forwarders. Early
                access teams see it first, run it on their own jobs, and tell us which reports matter
                most.
              </p>
            </div>

            <div className={s.resultsGrid4}>
              <div className={s.resultStatCard}>
                <span className={s.resultStatNum}>First look</span>
                <span className={s.resultStatLabel}>see each report before it&apos;s released</span>
              </div>
              <div className={s.resultStatCard}>
                <span className={s.resultStatNum}>Your data</span>
                <span className={s.resultStatLabel}>run it on your own jobs and lanes</span>
              </div>
              <div className={s.resultStatCard}>
                <span className={s.resultStatNum}>Your say</span>
                <span className={s.resultStatLabel}>tell us which numbers you need</span>
              </div>
              <div className={s.resultStatCard}>
                <span className={s.resultStatNum}>No extra work</span>
                <span className={s.resultStatLabel}>if you already use our other modules</span>
              </div>
            </div>

            <div style={{ marginTop: 32 }}>
              <Link href="/demo/#demo-form" className="button-secondary">
                <span>Join early access</span>
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
                    What owners and finance heads ask us first.
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

export default FreightIntelligencePage;
