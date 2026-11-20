'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
  FileSpreadsheet,
  FileText,
  Landmark,
  MousePointerClick,
} from 'lucide-react';
import { useAutoCycle } from '@/src/hooks/useAutoCycle';
import { SharedFaqAccordion } from '../SharedFaqAccordion';
import { FinanceClosingCta } from './FinanceClosingCta';
import s from './InvoiceAutomationPage.module.css';

/* ── Step definitions with full panel data ── */
const howSteps = [
  {
    num: 1,
    title: 'Send the statement',
    desc: 'PDF, Excel or a scan, through the portal, email or WhatsApp. Every account you hold.',
    panelBar: 'Step 1 of 4 · Statements',
    panelStatus: '3 accounts',
    statusType: 'info',
    files: ['HDFC_Oct2026.pdf', 'ICICI_Oct2026.xlsx (email)', 'SBI_Oct2026_scan.jpg (WhatsApp)'],
    rows: [
      { who: 'HDFC Bank ••5020', what: 'PDF · 214 lines', status: 'Received', type: 'ok' },
      { who: 'ICICI Bank ••0019', what: 'Excel · 96 lines', status: 'Received', type: 'ok' },
      { who: 'SBI ••3381', what: 'Scanned copy · 41 lines', status: 'Received', type: 'ok' },
    ],
    foot: 'Every account, every format, however it arrives.',
  },
  {
    num: 2,
    title: 'It categorises every line',
    desc: "Each transaction is sorted into a bookkeeping category and mapped to your ledger. No ledger yet? It's created.",
    panelBar: 'Step 2 of 4 · HDFC Bank ••5020 · Categorise',
    panelStatus: '214 categorised',
    statusType: 'ok',
    table: {
      headers: ['Transaction', 'Category', 'Ledger'],
      rows: [
        ['Sharma Textiles · NEFT · +₹1,45,200', 'Customer receipt', 'Sharma Textiles'],
        ['Metro Supplies · RTGS · −₹82,450', 'Supplier payment', 'Metro Supplies'],
        ['Card settlement · UPI · +₹12,800', 'Sales receipt', 'UPI collections'],
        ['Service fee + GST · −₹590', 'Bank charges', 'Bank charges'],
        ['Interest credit · +₹1,240', 'Interest income', 'Interest received · new'],
      ],
    },
    foot: "Mapped to the ledgers you already have. Interest received didn't exist, so it was created.",
  },
  {
    num: 3,
    title: 'It reconciles with your books',
    desc: 'Checked against your sales and purchase entries: matched, probable match or no match.',
    panelBar: 'Step 3 of 4 · Reconcile',
    panelStatus: 'Suggestions ready',
    statusType: 'info',
    deskStats: [
      { val: '198', label: 'matched' },
      { val: '9', label: 'probable match' },
      { val: '7', label: 'no match' },
    ],
    rows: [
      {
        who: 'Sharma Textiles · +₹1,45,200',
        what: 'Sales invoice INV-9281, same amount and reference',
        status: 'Matched',
        type: 'ok',
      },
      {
        who: 'Metro Supplies · −₹82,450',
        what: 'Purchase bills PB-311 and PB-318 add up to this amount',
        status: 'Probable',
        type: 'info',
      },
      {
        who: 'Raj Enterprises · +₹25,000',
        what: 'No sales or purchase entry found',
        status: 'No match',
        type: 'wait',
      },
    ],
    // actions: ['Confirm probable', 'Investigate unmatched', 'Push matched'],
    foot: 'Every suggestion shows why, so confirming takes a glance.',
  },
  {
    num: 4,
    title: 'Review and push to Tally',
    desc: 'Review every transaction, confirm the probable ones, and push to Tally Prime in minutes.',
    panelBar: 'Step 4 of 4 · Review and push',
    panelStatus: 'Pushed to Tally Prime',
    statusType: 'ok',
    rows: [
      { who: '198 matched', what: 'Reviewed and accepted', status: 'Reconciled', type: 'ok' },
      {
        who: '9 probable',
        what: '8 confirmed by your team, 1 changed',
        status: 'Reconciled',
        type: 'ok',
      },
      {
        who: '7 no match',
        what: 'Raj Enterprises and 6 others left open to follow up',
        status: 'Open',
        type: 'wait',
      },
    ],
    total: { meta: 'Pushed to Tally Prime · 207 entries', big: 'Minutes' },
    foot: "Nothing goes to Tally until you've reviewed it. Open items stay on your list.",
  },
];

/* ── FAQ items ── */
const faqItems = [
  {
    question: 'Does anything post to Tally without our approval?',
    answer:
      'No. Every new entry waits for someone on your team to review and approve it before it is posted to Tally Prime.',
  },
  {
    question: 'Which banks and formats work?',
    answer:
      "Statements in PDF, Excel or a scanned copy, uploaded in the portal or sent by email or WhatsApp. Bring a recent statement from each of your banks to the demo and we'll show you them read.",
  },
  {
    question: "What's a probable match?",
    answer:
      "A close call, like one payment that covers two purchase bills, or an amount that's slightly off. It's shown with the reason, and your team confirms or changes it. Lines with no match at all are listed separately, so nothing is guessed.",
  },
  {
    question: 'How does it choose the ledger?',
    answer:
      'Each transaction is first sorted into a bookkeeping category, like a customer receipt or bank charges. If you already have a ledger for it, the line is mapped there. If not, the ledger is created instantly.',
  },
  {
    question: 'How long does setup take?',
    answer:
      'Connect Tally Prime straight away, send your first statement, and push to Tally in minutes. You review every transaction before anything is posted.',
  },
];

/* ── Proof stats matching FinanceStatStrip ── */
const proofStats = [
  {
    title: 'PDF · Excel · scan',
    copy: 'Sent by portal, email or WhatsApp',
    icon: FileText,
  },
  {
    title: 'Every bank account',
    copy: 'All your accounts reconciled in one place',
    icon: Landmark,
  },
  {
    title: 'Hours back at month-end',
    copy: 'No more ticking lines against Tally',
    icon: Clock,
  },
  {
    title: 'One click to approve',
    copy: 'Your team checks, Docsynecx matches',
    icon: MousePointerClick,
    highlight: true,
  },
];

export function BankingReconciliationPage() {
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
                <span>Banking &amp; Reconciliation</span>
              </nav>

              <p className={s.eyebrow}>Banking &amp; Reconciliation</p>

              <h1 id="hero-title" className={s.heroTitle}>
                Bank reconciliation in Tally,
                <br />
                <span>without the ticking.</span>
              </h1>

              <p className={s.heroSub}>
                Send your bank statement. Docsynecx sorts every transaction into the right ledger,
                checks it against your sales and purchase entries, and shows what matched, what
                probably matches and what doesn&apos;t. Review it all, then push to Tally in minutes.
              </p>

              <div className={s.heroActions}>
                <Link href="/demo/#demo-form" className={s.primaryBtn}>
                  <span>Book a demo</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  href="#how"
                  className={s.secondaryBtn}
                  onClick={(e) => {
                    const target = document.getElementById('how');
                    if (target) {
                      e.preventDefault();
                      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      window.history.pushState(null, '', '#how');
                    }
                  }}
                >
                  <span>See how it works</span>
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
                <span>Nothing is posted to Tally Prime until your team approves it.</span>
              </p>
            </div>

            {/* Live Mock Preview Card with 3D Depth Backdrop & Ghost Card */}
            <div className={s.heroVisualWrapper}>
              <div className={s.ambientGlow} aria-hidden="true" />
              <div className={s.ghostCardBehind} aria-hidden="true" />

              <div
                className={s.qcard}
                role="region"
                aria-label="Example October bank statement with 214 lines: 198 matched, 9 probable matches, 7 with no match"
              >
                <div className={s.qcardTop}>
                  <span>
                    <strong>HDFC Bank ••5020</strong> · Oct 2026
                  </span>
                  <span className={`${s.statusBadge} ${s.info}`}>214 lines</span>
                </div>
                <div className={s.qcardBody}>
                  <div className={s.deskStats}>
                    <div>
                      <span className={s.statVal}>198</span>
                      <span className={s.statLabel}>matched</span>
                    </div>
                    <div>
                      <span className={s.statVal}>9</span>
                      <span className={s.statLabel}>probable match</span>
                    </div>
                    <div>
                      <span className={s.statVal}>7</span>
                      <span className={s.statLabel}>no match</span>
                    </div>
                  </div>
                  <div className={s.qcardRows}>
                    <div className={s.qcardRow}>
                      <span className={s.rowWho}>Sharma Textiles</span>
                      <span className={s.rowWhat}>+₹1,45,200 · Sales INV-9281</span>
                      <span className={`${s.statusBadge} ${s.ok}`}>Matched</span>
                    </div>
                    <div className={s.qcardRow}>
                      <span className={s.rowWho}>Metro Supplies</span>
                      <span className={s.rowWhat}>−₹82,450 · 2 purchase bills</span>
                      <span className={`${s.statusBadge} ${s.info}`}>Probable</span>
                    </div>
                    <div className={s.qcardRow}>
                      <span className={s.rowWho}>Raj Enterprises</span>
                      <span className={s.rowWhat}>+₹25,000 · no reference</span>
                      <span className={`${s.statusBadge} ${s.wait}`}>No match</span>
                    </div>
                  </div>

                  {/* Interactive Action Row matching Image 1 */}
                  <div className={s.heroActionRow}>
                    <button
                      type="button"
                      className={s.heroApproveBtn}
                    >
                      <Check size={16} aria-hidden="true" />
                      <span>Reconcile 198 entries · Post to Tally</span>
                    </button>
                    <button
                      type="button"
                      className={s.heroEditBtn}
                    >
                      Review
                    </button>
                  </div>
                </div>
                <p className={s.sampleNote}>Sample data</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROOF STATS STRIP */}
      <section className={s.proofSection} aria-labelledby="banking-stats-title">
        <div className="site-shell">
          <h2 id="banking-stats-title" className={s.proofEyebrow}>
            Banking Reconciliation at a glance
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
            <p className={s.eyebrow}>Why month-end drags</p>
            <h2 id="problem-h" className={s.headline}>
              Four things that slow down
              <br />
              <span>every bank reconciliation.</span>
            </h2>
            <p className={s.lead}>
              Docsynecx does the groundwork on each one, so your team only reviews what needs a
              person.
            </p>
          </div>

          <div className={s.painGrid}>
            <article className={s.painCard}>
              <span className={s.painMono}>01 · Formats</span>
              <h3>Every bank&apos;s statement looks different</h3>
              <p className={s.painWas}>
                Dates, narrations and columns laid out differently by each bank, then cleaned up by
                hand in Excel.
              </p>
              <p className={s.painFix}>
                <strong>Now:</strong> every statement read into the same clean list.
              </p>
            </article>

            <article className={s.painCard}>
              <span className={s.painMono}>02 · Matching</span>
              <h3>Ticking lines against your books</h3>
              <p className={s.painWas}>
                Hundreds of lines checked one by one against sales and purchase entries.
              </p>
              <p className={s.painFix}>
                <strong>Now:</strong> matched for you. You only look at probable and no-match lines.
              </p>
            </article>

            <article className={s.painCard}>
              <span className={s.painMono}>03 · Categories</span>
              <h3>Deciding where every line goes</h3>
              <p className={s.painWas}>
                Each transaction coded by hand, and new ledgers set up in Tally first.
              </p>
              <p className={s.painFix}>
                <strong>Now:</strong> categorised for you, mapped to your ledger or a new one
                created.
              </p>
            </article>

            <article className={s.painCard}>
              <span className={s.painMono}>04 · Unknowns</span>
              <h3>Money you can&apos;t explain</h3>
              <p className={s.painWas}>
                A credit with a vague narration holds up closing the month.
              </p>
              <p className={s.painFix}>
                <strong>Now:</strong> unmatched lines listed up front, so they&apos;re chased first.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section id="how" className={`${s.section} ${s.howSectionDark}`} aria-labelledby="how-h">
        <div className="site-shell">
          <div className={s.secHead}>
            <p className={s.eyebrow}>How it works</p>
            <h2 id="how-h" className={s.headline}>
              Send. Categorise. Reconcile.
              <br />
              <span>Push.</span>
            </h2>
            <p className={s.lead}>
              One month&apos;s bank statement, from upload to reconciled in Tally Prime.
            </p>
          </div>

          <div className={s.howGrid} {...containerProps}>
            <div className={s.stepsList} role="tablist" aria-label="Four steps">
              {howSteps.map((step, idx) => {
                const isSelected = active === idx;
                return (
                  <button
                    key={step.num}
                    type="button"
                    role="tab"
                    id={`how-tab-${step.num}`}
                    aria-selected={isSelected}
                    aria-controls={`how-panel-${step.num}`}
                    tabIndex={isSelected ? 0 : -1}
                    className={`${s.stepButtonDark} ${isSelected ? s.stepButtonDarkActive : ''}`}
                    onClick={() => goTo(idx)}
                  >
                    <span className={s.stepNumDark}>{step.num}</span>
                    <span className={s.stepBodyDark}>
                      <strong>{step.title}</strong>
                      <span>{step.desc}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div>
              <div
                className={s.stepPanelDark}
                role="tabpanel"
                id={`how-panel-${activeStep.num}`}
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
                  {activeStep.files && (
                    <div className={s.filesListDark}>
                      {activeStep.files.map((file, i) => (
                        <span key={i} className={s.fileChipDark}>
                          {file}
                        </span>
                      ))}
                    </div>
                  )}

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

                  {activeStep.total && (
                    <div className={s.qtotalDark}>
                      <span className={s.totalMetaDark}>{activeStep.total.meta}</span>
                      <span className={s.totalBigDark}>{activeStep.total.big}</span>
                    </div>
                  )}

                  {/* {activeStep.actions && (
                    <div className={s.qactionsDark}>
                      {activeStep.actions.map((act, i) => (
                        <button
                          key={i}
                          type="button"
                          className={i === 0 ? s.actionBtnDark : s.actionBtnSecondaryDark}
                        >
                          {act}
                        </button>
                      ))}
                    </div>
                  )} */}
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

      {/* 5. WHAT IT HANDLES */}
      <section id="handles" className={s.section} aria-labelledby="handles-h">
        <div className="site-shell">
          <div className={s.secHead}>
            <p className={s.eyebrow}>What it handles</p>
            <h2 id="handles-h" className={s.headline}>
              Everything on the statement,
              <br />
              <span>and the checks your team does today.</span>
            </h2>
          </div>

          <div className={s.handlesGrid}>
            <article className={s.handleCard}>
              <span className={s.handleTag}>Statements</span>
              <h3>Portal, email and WhatsApp</h3>
              <p>
                PDF, Excel or scanned statements, as your bank sends them. One month or several at
                once.
              </p>
            </article>

            <article className={s.handleCard}>
              <span className={s.handleTag}>Lines</span>
              <h3>Every transaction</h3>
              <p>Date, narration, reference number, debit, credit and running balance.</p>
            </article>

            <article className={s.handleCard}>
              <span className={s.handleTag}>Narrations</span>
              <h3>UPI, NEFT, RTGS and cheques</h3>
              <p>Bank codes turned into a name and reference your team can read.</p>
            </article>

            <article className={s.handleCard}>
              <span className={s.handleTag}>Categories</span>
              <h3>Sorted for bookkeeping</h3>
              <p>Receipts, payments, charges, interest and more, each line in its category.</p>
            </article>

            <article className={s.handleCard}>
              <span className={s.handleTag}>Ledgers</span>
              <h3>Mapped, or created for you</h3>
              <p>
                Lines go to the ledger you already have. If there isn&apos;t one, it&apos;s created
                instantly.
              </p>
            </article>

            <article className={s.handleCard}>
              <span className={s.handleTag}>Matched</span>
              <h3>Checked against your books</h3>
              <p>Each line compared with your sales and purchase entries.</p>
            </article>

            <article className={s.handleCard}>
              <span className={s.handleTag}>Probable match</span>
              <h3>Close calls, with the reason</h3>
              <p>Like one payment covering two bills. You confirm or change it.</p>
            </article>

            <article className={s.handleCard}>
              <span className={s.handleTag}>No match</span>
              <h3>Nothing guessed</h3>
              <p>Lines with no entry in your books are listed for your team to follow up.</p>
            </article>

            <article className={s.handleCard}>
              <span className={s.handleTag}>Tally Prime</span>
              <h3>Review, then push</h3>
              <p>Review every transaction, then push to Tally Prime in minutes.</p>
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

            <article className={s.moreCard}>
              <span className={s.moreTag}>Reports</span>
              <h3>Docsynecx Intelligence</h3>
              <p className={s.moreLead}>
                Six views of your Tally numbers that your owners can read.
              </p>
              <Link href="/finance-desk/docsynecx-intelligence/" className={s.moreLink}>
                <span>See the six views</span>
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
                  What accounts teams ask us first.
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

      {/* 8. CLOSING CTA */}
      <FinanceClosingCta
        eyebrow="See it on your own statement"
        title={
          <>
            Bring last month&apos;s statement.
            <br />
            <span>We&apos;ll reconcile it with you.</span>
          </>
        }
        copy="Share one month from your main bank account. In the demo you'll see every line categorised, checked against your books, and sorted into matched, probable and no match."
        steps={[
          'Book a 30-minute demo',
          'Share one recent bank statement',
          'See it categorised and reconciled',
        ]}
        secondaryHref="/finance-desk/"
        secondaryText="Back to Finance Desk"
      />
    </>
  );
}
