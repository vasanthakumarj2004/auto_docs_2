'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Bell,
  Check,
  FileSpreadsheet,
  LayoutGrid,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { useAutoCycle } from '@/src/hooks/useAutoCycle';
import { SharedFaqAccordion } from '../SharedFaqAccordion';
import { FinanceClosingCta } from './FinanceClosingCta';
import s from './InvoiceAutomationPage.module.css';

/* ── Six views step definitions with full panel data ── */
const howSteps = [
  {
    num: 1,
    title: 'Financial',
    desc: 'Are we making money, and how much cash do we have?',
    panelBar: 'Financial · Nov 2026',
    panelStatus: 'vs Oct',
    statusType: 'info',
    table: {
      headers: ['Line', 'Nov', 'vs Oct'],
      rows: [
        ['Sales', '₹48.2L', '+12%'],
        ['Gross profit', '₹14.9L · 31%', '−2 pts'],
        ['Operating expenses', '₹9.5L', '+4%'],
        ['Net profit', '₹5.4L', '+3%'],
        ['Cash & bank', '₹21.7L', '−₹3.8L'],
      ],
    },
    chips: ['P&L', 'Balance Sheet', 'Profitability', 'Revenue', 'Expenses', 'Cash & Bank'],
    foot: 'Profit and cash side by side, so a good month on paper is never a surprise in the bank.',
  },
  {
    num: 2,
    title: 'Business',
    desc: 'Who are our best customers, suppliers and products?',
    panelBar: 'Business · Nov 2026',
    panelStatus: 'Top 3',
    statusType: 'info',
    rows: [
      {
        who: 'Sharma Textiles',
        what: '₹9.8L sales · 20% of the month',
        status: 'Top customer',
        type: 'ok',
      },
      {
        who: 'Rubber seals',
        what: 'Best seller by margin · 38%',
        status: 'Top product',
        type: 'ok',
      },
      {
        who: 'Kiran Retail',
        what: 'Orders down 30% on last quarter',
        status: 'Watch',
        type: 'wait',
      },
    ],
    chips: ['Sales', 'Purchases', 'Customers', 'Suppliers', 'Products', 'Inventory'],
    foot: 'See which relationships really pay, and which are slipping.',
  },
  {
    num: 3,
    title: 'Working capital',
    desc: "Who owes us, what do we owe, and what's overdue?",
    panelBar: 'Working capital · today',
    panelStatus: '₹6.4L overdue',
    statusType: 'wait',
    deskStats: [
      { val: '₹18.6L', label: 'customers owe us' },
      { val: '₹6.4L', label: 'of that is overdue' },
      { val: '₹11.2L', label: 'we owe suppliers' },
    ],
    rows: [
      {
        who: 'Kiran Retail',
        what: '₹3.2L · over 45 days',
        status: 'Overdue',
        type: 'wait',
      },
      {
        who: 'Metro Supplies',
        what: '₹2.4L due to them this week',
        status: 'Payable',
        type: 'info',
      },
    ],
    chips: ['Receivables', 'Payables', 'Overdue bills', 'Liquidity', 'Cash cycle'],
    foot: 'Ageing in the periods you already use, 30, 60, 90 days or your own.',
  },
  {
    num: 4,
    title: 'Operations',
    desc: 'Which stock is moving, and which supplier is late?',
    panelBar: 'Operations · Nov 2026',
    panelStatus: '2 to look at',
    statusType: 'wait',
    rows: [
      {
        who: 'Ball bearings 6202',
        what: 'No movement in 92 days · ₹2.1L of stock',
        status: 'Slow stock',
        type: 'wait',
      },
      {
        who: 'Metro Supplies',
        what: '3 of the last 10 deliveries late',
        status: 'Supplier',
        type: 'wait',
      },
      {
        who: 'Rubber seals',
        what: 'Bought weekly in small lots',
        status: 'Pattern',
        type: 'info',
      },
    ],
    chips: ['Stock movement', 'Stock ageing', 'Purchase patterns', 'Supplier performance'],
    foot: 'Spot dead stock and late suppliers before they cost you.',
  },
  {
    num: 5,
    title: 'Ask AI',
    desc: 'Why did that number change?',
    panelBar: 'Ask AI · "Why is cash down ₹3.8L when sales are up?"',
    panelStatus: 'Answered',
    statusType: 'ok',
    table: {
      headers: ['What moved cash in Nov', 'From', 'Amount'],
      rows: [
        ['Net profit for the month', 'P&L', '+₹5.4L'],
        ['More waiting with customers', 'Receivables', '−₹4.6L'],
        ['More stock bought', 'Purchases', '−₹2.1L'],
        ['Suppliers paid down', 'Payables', '−₹2.5L'],
        ['Change in cash', '', '−₹3.8L'],
      ],
    },
    chips: ['Ask a question', 'Find the cause', 'Insights', 'Suggested next steps'],
    foot: 'Every answer shows where it came from, so your accountant can check it before anyone acts.',
  },
  {
    num: 6,
    title: 'Management',
    desc: 'Is the MIS ready, and is anything off track?',
    panelBar: 'Management · schedules and alerts',
    panelStatus: '1 alert',
    statusType: 'wait',
    rows: [
      {
        who: 'Monthly MIS',
        what: 'To the owners · 1st of every month',
        status: 'Scheduled',
        type: 'ok',
      },
      {
        who: 'Sales and collections',
        what: 'To the sales head · every Monday',
        status: 'Scheduled',
        type: 'ok',
      },
      {
        who: 'Overdue above ₹5L',
        what: 'Now ₹6.4L. Owners told today',
        status: 'Alert',
        type: 'wait',
      },
    ],
    chips: ['Monthly MIS', 'KPIs', 'This month vs last', 'Scheduled reports', 'Alerts'],
    foot: 'You choose the KPIs, periods and people. The MIS goes out on time.',
  },
];

/* ── FAQ items ── */
const faqItems = [
  {
    question: 'Where do the numbers come from?',
    answer:
      "From your Tally Prime company. What each view shows depends on what's recorded in Tally, for example stock views need inventory kept in Tally.",
  },
  {
    question: 'Do we need to change how we use Tally?',
    answer:
      'No. It works from the entries your team already makes. We set up the views around your company and the KPIs you track.',
  },
  {
    question: 'Can we trust the AI answers?',
    answer:
      "Every answer shows the figures and entries it's based on, so your accountant can check it. It helps you decide, it doesn't replace your accountant's judgement.",
  },
  {
    question: 'Can the MIS be sent automatically?',
    answer:
      'Yes. Choose the KPIs, comparison periods, schedule and who gets it. Alerts go out when a number crosses a line you set.',
  },
  {
    question: 'Do we need the other Finance Desk tools?',
    answer:
      'No. Intelligence works on its own with your Tally data. Invoice Automation and Banking keep that data up to date, so the views get sharper.',
  },
];

/* ── Proof stats matching FinanceStatStrip (Without bottom links) ── */
const proofStats = [
  {
    title: 'Six views',
    copy: 'The whole business in one place',
    icon: LayoutGrid,
  },
  {
    title: 'Ask in plain words',
    copy: 'Answers come with the numbers behind them',
    icon: MessageSquare,
  },
  {
    title: 'MIS on schedule',
    copy: 'Built and sent, no Excel nights',
    icon: FileSpreadsheet,
  },
  {
    title: 'Alerts that matter',
    copy: 'Told when a number crosses your line',
    icon: Bell,
    highlight: true,
  },
];

export function DocsynecxIntelligencePage() {
  const { active, goTo, containerProps } = useAutoCycle({
    itemCount: howSteps.length,
    interval: 3500,
    resumeDelay: 5000,
  });

  const activeStep = howSteps[active] || howSteps[0];

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className={s.heroSection} aria-labelledby="hero-title">
        <div className="site-shell">
          <div className={s.heroGrid}>
            <div>
              <nav className={s.crumb} aria-label="Breadcrumb">
                <Link href="/finance-desk/">Finance Desk</Link>
                <span aria-hidden="true">/</span>
                <span>Docsynecx Intelligence</span>
              </nav>

              <p className={s.eyebrow}>Docsynecx Intelligence · Six views</p>

              <h1 id="hero-title" className={s.heroTitle}>
                Your Tally numbers, explained.
                <br />
                <span>Without waiting for the MIS.</span>
              </h1>

              <p className={s.heroSub}>
                Profit, cash, sales, stock and what&apos;s overdue, in six views your owners can
                read. Ask &ldquo;why did that change?&rdquo; in plain words, and get the MIS sent on
                schedule.
              </p>

              <div className={s.heroActions}>
                <Link href="/demo/#demo-form" className={s.primaryBtn}>
                  <span>Book a demo</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  href="#views"
                  className={s.secondaryBtn}
                  onClick={(e) => {
                    const target = document.getElementById('views');
                    if (target) {
                      e.preventDefault();
                      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      window.history.pushState(null, '', '#views');
                    }
                  }}
                >
                  <span>See the six views</span>
                  <ArrowDown size={16} aria-hidden="true" />
                </Link>
              </div>

              <p className={s.promise}>
                <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                  <circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M6 10.5l2.5 2.5L14 7.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Built from the data already in your Tally Prime.</span>
              </p>
            </div>

            {/* Live Mock Preview Card with 3D Depth Backdrop & Ghost Card */}
            <div className={s.heroVisualWrapper}>
              <div className={s.ambientGlow} aria-hidden="true" />
              <div className={s.ghostCardBehind} aria-hidden="true" />

              <div
                className={s.qcard}
                role="region"
                aria-label="Example November summary: sales 48.2 lakh up 12 percent, gross margin 31 percent, 6.4 lakh overdue, with a question about why cash is down"
              >
                <div className={s.qcardTop}>
                  <span>
                    <strong>This month</strong> · Nov 2026
                  </span>
                  <span className={`${s.statusBadge} ${s.info}`}>vs Oct</span>
                </div>
                <div className={s.qcardBody}>
                  <div className={s.deskStats}>
                    <div>
                      <span className={s.statVal}>₹48.2L</span>
                      <span className={s.statLabel}>sales, up 12%</span>
                    </div>
                    <div>
                      <span className={s.statVal}>31%</span>
                      <span className={s.statLabel}>gross margin</span>
                    </div>
                    <div>
                      <span className={s.statVal}>₹6.4L</span>
                      <span className={s.statLabel}>overdue</span>
                    </div>
                  </div>
                  <div className={s.qcardRows}>
                    <div className={s.qcardRow}>
                      <span className={s.rowWho}>You asked</span>
                      <span className={s.rowWhat}>Why is cash down ₹3.8L when sales are up?</span>
                      <span className={`${s.statusBadge} ${s.info}`}>AI</span>
                    </div>
                    <div className={s.qcardRow}>
                      <span className={s.rowWho}>Answer</span>
                      <span className={s.rowWhat}>
                        ₹4.6L more is waiting with customers, and stock buying rose ₹2.1L
                      </span>
                      <span className={`${s.statusBadge} ${s.ok}`}>Sources</span>
                    </div>
                  </div>

                  
                </div>
                <p className={s.sampleNote}>Sample data</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROOF STATS STRIP */}
      <section className={s.proofSection} aria-labelledby="intelligence-stats-title">
        <div className="site-shell">
          <h2 id="intelligence-stats-title" className={s.proofEyebrow}>
            Docsynecx Intelligence at a glance
          </h2>
          <div className={s.proofGrid4}>
            {proofStats.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className={s.outcomeCard}>
                  <span
                    className={`${s.outcomeIconBadge} ${item.highlight ? s.outcomeIconBadgeHl : ''}`}
                    aria-hidden="true"
                  >
                    <Icon size={20} className="stroke-[2.2]" />
                  </span>
                  <div className={s.outcomeCardContent}>
                    <p className={s.statValue}>{item.title}</p>
                    <p className={s.outcomeCopy}>{item.copy}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. PROBLEM BAND */}
      <section className={s.section} aria-labelledby="problem-h">
        <div className="site-shell">
          <div className={s.secHead}>
            <p className={s.eyebrow}>Why the numbers arrive late</p>
            <h2 id="problem-h" className={s.headline}>
              The data is in Tally.
              <br />
              <span>Getting answers out is the hard part.</span>
            </h2>
            <p className={s.lead}>
              Docsynecx reads what&apos;s already there, so your team stops rebuilding the same
              reports.
            </p>
          </div>

          <div className={s.painGrid}>
            <article className={s.painCard}>
              <span className={s.painMono}>01 · MIS</span>
              <h3>The monthly MIS takes days</h3>
              <p className={s.painWas}>
                Exports, Excel sheets and formulas, rebuilt every month.
              </p>
              <p className={s.painFix}>
                <strong>Now:</strong> built from Tally and sent on the day you choose.
              </p>
            </article>

            <article className={s.painCard}>
              <span className={s.painMono}>02 · The why</span>
              <h3>Numbers without the reason</h3>
              <p className={s.painWas}>
                Profit dropped, but finding out why means digging through ledgers.
              </p>
              <p className={s.painFix}>
                <strong>Now:</strong> ask the question and see the entries behind the answer.
              </p>
            </article>

            <article className={s.painCard}>
              <span className={s.painMono}>03 · Cash</span>
              <h3>Cash surprises</h3>
              <p className={s.painWas}>
                Sales look good, yet the bank balance keeps falling.
              </p>
              <p className={s.painFix}>
                <strong>Now:</strong> receivables, payables and overdue in one view.
              </p>
            </article>

            <article className={s.painCard}>
              <span className={s.painMono}>04 · Stock</span>
              <h3>Money stuck on the shelf</h3>
              <p className={s.painWas}>
                Slow stock and late suppliers only noticed at year-end.
              </p>
              <p className={s.painFix}>
                <strong>Now:</strong> stock ageing and supplier delays flagged as they happen.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 4. SIX VIEWS SECTION */}
      <section id="views" className={`${s.section} ${s.howSectionDark}`} aria-labelledby="views-h">
        <div className="site-shell">
          <div className={s.secHead}>
            <p className={s.eyebrow}>Six views</p>
            <h2 id="views-h" className={s.headline}>
              Six questions your owners ask.
              <br />
              <span>Answered from your books.</span>
            </h2>
            <p className={s.lead}>Pick a view to see the kind of answer it gives.</p>
          </div>

          <div className={s.howGrid} {...containerProps}>
            <div className={s.stepsList} role="tablist" aria-label="Six views">
              {howSteps.map((step, idx) => {
                const isActive = active === idx;
                return (
                  <button
                    key={step.num}
                    type="button"
                    role="tab"
                    id={`view-tab-${step.num}`}
                    aria-selected={isActive}
                    aria-controls={`view-panel-${step.num}`}
                    tabIndex={isActive ? 0 : -1}
                    className={`${s.stepButtonDark} ${isActive ? s.stepButtonDarkActive : ''}`}
                    onClick={() => goTo(idx)}
                  >
                    <span className={s.stepNumDark}>{step.num}</span>
                    <div className={s.stepBodyDark}>
                      <strong>{step.title}</strong>
                      <span>{step.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div>
              <div
                className={s.stepPanelDark}
                role="tabpanel"
                id={`view-panel-${activeStep.num}`}
                aria-label={activeStep.panelBar}
              >
                <div className={s.panelBarDark}>
                  <span>{activeStep.panelBar}</span>
                  <span
                    className={`${s.statusBadge} ${activeStep.statusType === 'ok'
                      ? s.ok
                      : activeStep.statusType === 'wait'
                        ? s.wait
                        : s.info
                      }`}
                  >
                    {activeStep.panelStatus}
                  </span>
                </div>

                <div className={s.panelBodyDark}>
                  {activeStep.deskStats && (
                    <div className={s.deskStats} style={{ marginBottom: 16 }}>
                      {activeStep.deskStats.map((stat, i) => (
                        <div key={i}>
                          <span className={s.statVal}>{stat.val}</span>
                          <span className={s.statLabel}>{stat.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeStep.table && (
                    <div className={s.tableWrapDark}>
                      <table className={s.dataTableDark}>
                        <thead>
                          <tr>
                            {activeStep.table.headers.map((h, i) => (
                              <th key={i}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {activeStep.table.rows.map((row, i) => (
                            <tr key={i}>
                              {row.map((cell, j) => (
                                <td key={j}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {activeStep.rows && (
                    <div className={s.qcardRowsDark}>
                      {activeStep.rows.map((row, i) => (
                        <div key={i} className={s.qcardRowDark}>
                          <span className={s.rowWhoDark}>{row.who}</span>
                          <span className={s.rowWhatDark}>{row.what}</span>
                          <span
                            className={`${s.statusBadge} ${row.type === 'ok' ? s.ok : row.type === 'wait' ? s.wait : s.info
                              }`}
                          >
                            {row.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeStep.chips && (
                    <div className={s.chipsListDark}>
                      {activeStep.chips.map((chip, i) => (
                        <span key={i} className={s.chipDark}>
                          {chip}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <p className={s.panelFootDark}>
                  <strong>{activeStep.foot.split('.')[0]}.</strong>{' '}
                  {activeStep.foot.split('.').slice(1).join('.').trim()}
                </p>
              </div>
              <p className={s.howNoteDark}>Sample data · Example product view</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHO IT'S FOR */}
      <section id="who" className={s.section} aria-labelledby="who-h">
        <div className="site-shell">
          <div className={s.secHead}>
            <p className={s.eyebrow}>Who it&apos;s for</p>
            <h2 id="who-h" className={s.headline}>
              One set of numbers.
              <br />
              <span>Read by everyone who needs them.</span>
            </h2>
          </div>

          <div className={s.moreGrid}>
            <article className={s.moreCard}>
              <span className={s.moreTag}>Owners and directors</span>
              <h3>The business at a glance</h3>
              <p className={s.moreLead}>
                Profit, cash and what&apos;s overdue, without asking the accounts team for a report.
              </p>
            </article>

            <article className={s.moreCard}>
              <span className={s.moreTag}>Finance heads</span>
              <h3>MIS without the Excel nights</h3>
              <p className={s.moreLead}>
                KPIs and comparisons built from Tally, sent on schedule, with alerts when something
                slips.
              </p>
            </article>

            <article className={s.moreCard}>
              <span className={s.moreTag}>Accounts teams</span>
              <h3>Fewer &ldquo;can you pull this?&rdquo; requests</h3>
              <p className={s.moreLead}>
                Managers find answers themselves, and every figure traces back to the books.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 6. THE REST OF THE FINANCE DESK */}
      <section className={`${s.section} ${s.moreSectionDark}`} aria-labelledby="more-h">
        <div className="site-shell">
          <div className={s.secHead}>
            <p className={s.eyebrow}>Works with the rest of Finance Desk</p>
            <h2 id="more-h" className={s.headline}>
              The rest of the
              <br />
              <span>Finance Desk.</span>
            </h2>
          </div>

          <div className={s.moreGrid}>
            <article className={s.moreCard}>
              <span className={s.moreTag}>Invoices</span>
              <h3>Invoice Automation</h3>
              <p className={s.moreLead}>
                Supplier invoices read, checked for GST and duplicates, and approved into Tally.
              </p>
              <Link href="/finance-desk/invoice-automation/" className={s.moreLink}>
                <span>See Invoice Automation</span>
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </article>

            <article className={s.moreCard}>
              <span className={s.moreTag}>Banking</span>
              <h3>Banking &amp; Reconciliation</h3>
              <p className={s.moreLead}>
                Bank statements categorised, reconciled and pushed to Tally in minutes.
              </p>
              <Link href="/finance-desk/banking-reconciliation/" className={s.moreLink}>
                <span>See Banking</span>
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </article>

            <article className={s.moreCard}>
              <span className={s.moreTag}>Receivables</span>
              <h3>Payment Reminders</h3>
              <p className={s.moreLead}>
                Reminders drafted for your team to approve, then sent or scheduled.
              </p>
              <Link href="/finance-desk/payment-reminders/" className={s.moreLink}>
                <span>See Payment Reminders</span>
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section id="faq" className={`${s.section} ${s.altSection}`} aria-labelledby="faq-h">
        <div className="site-shell">
          <div className={s.faqLayout}>
            <div className={s.faqHeading}>
              <div>
                <p className={s.faqEyebrow}>Common questions</p>
                <h2 id="faq-h" className={s.faqTitle}>
                  What owners and finance heads ask us first.
                </h2>
                <p className={s.faqDescription}>
                  Something else on your mind? Ask us in the demo.
                </p>
              </div>
            </div>
            <SharedFaqAccordion items={faqItems} defaultOpenIndex={0} toggleStyle="plus" />
          </div>
        </div>
      </section>

      {/* 8. CLOSING CTA */}
      <FinanceClosingCta
        eyebrow="See it on your own books"
        title={
          <>
            Bring the question
            <br />
            <span>your owner always asks.</span>
          </>
        }
        copy="Tell us the one number that's hardest to get today. In the demo we'll answer it from your own Tally data."
        steps={[
          'Book a 30-minute demo',
          'Tell us the reports you build today',
          'See all six views on your own numbers',
        ]}
        secondaryHref="/finance-desk/"
        secondaryText="Back to Finance Desk"
      />
    </>
  );
}
