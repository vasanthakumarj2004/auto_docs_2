'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CalendarClock,
  Check,
  CheckCircle2,
  FileText,
  MousePointerClick,
  TrendingUp,
} from 'lucide-react';
import { useAutoCycle } from '@/src/hooks/useAutoCycle';
import { DemoCta } from '../DemoCta';
import { SharedFaqAccordion } from '../SharedFaqAccordion';
import s from './InvoiceAutomationPage.module.css';

/* ── Step definitions with full panel data ── */
const howSteps = [
  {
    num: 1,
    title: 'Collect bills and POs',
    desc: 'Every supplier bill with its PO and payment terms, checked and in one place.',
    panelBar: 'Step 1 of 4 · Supplier bills',
    panelStatus: '3 checked',
    statusType: 'ok',
    rows: [
      {
        who: 'Prime Components · INV-9021',
        what: 'PO-8492 · 30 days · spare parts · ₹1,45,200',
        status: 'PO matched',
        type: 'ok',
      },
      {
        who: 'Metro Supplies · INV-4491',
        what: 'PO-1028 · 15 days · industrial supplies · ₹82,450',
        status: 'PO matched',
        type: 'ok',
      },
      {
        who: 'Apex Services · INV-0194',
        what: 'Contract #29 · due on receipt · maintenance · ₹24,800',
        status: 'Terms checked',
        type: 'ok',
      },
    ],
    foot: 'Bill, PO, terms and GSTIN checked together, before anyone approves.',
  },
  {
    num: 2,
    title: 'Track due dates',
    desc: "See what's due and what's late, so the urgent bills come first.",
    panelBar: 'Step 2 of 4 · Due dates · 17 Nov',
    panelStatus: '1 late',
    statusType: 'wait',
    rows: [
      {
        who: 'Apex Services · ₹24,800',
        what: 'Due on receipt, 15 Nov',
        status: '2 days late',
        type: 'wait',
      },
      {
        who: 'Metro Supplies · ₹82,450',
        what: 'Due 19 Nov',
        status: 'In 2 days',
        type: 'info',
      },
      {
        who: 'Prime Components · ₹1,45,200',
        what: 'Due 20 Nov',
        status: 'In 3 days',
        type: 'info',
      },
    ],
    total: { meta: 'Due in the next 7 days', big: '₹2,52,450' },
    foot: 'The urgent bills first, so no supplier is paid late by accident.',
  },
  {
    num: 3,
    title: 'Route for approval',
    desc: 'Department head, then finance. You set the levels, every step is logged.',
    panelBar: 'Step 3 of 4 · Approval · Metro Supplies INV-4491',
    panelStatus: '2 of 2 levels',
    statusType: 'info',
    rows: [
      {
        who: 'Stores head',
        what: 'Goods received and checked · 16 Nov, 4:10 PM',
        status: 'Approved',
        type: 'ok',
      },
      {
        who: 'Finance controller',
        what: 'Reminder sent this morning',
        status: 'Waiting',
        type: 'wait',
      },
      {
        who: 'Then',
        what: 'Ready to schedule for 19 Nov',
        status: 'Next',
        type: 'info',
      },
    ],
    actions: ['Send reminder', 'Approve bill', 'Reassign level'],
    foot: 'Everyone can see who has the bill, and every sign-off is on record.',
  },
  {
    num: 4,
    title: 'Report and plan',
    desc: "Ageing, supplier balances and the cash you'll need in the weeks ahead.",
    panelBar: 'Step 4 of 4 · Payables ageing',
    panelStatus: 'Today',
    statusType: 'info',
    table: {
      headers: ['Age', 'Bills', 'Amount'],
      rows: [
        ['0–30 days', '15', '₹8.9L'],
        ['31–60 days', '3', '₹1.9L'],
        ['60+ days', '1', '₹0.4L'],
        ['Total owed to suppliers', '19', '₹11.2L'],
      ],
    },
    foot: "Know what's owed and when it's due, before you plan the week's payments.",
  },
];

/* ── FAQ items ── */
const faqItems = [
  {
    question: 'When can we start using it?',
    answer:
      "Accounts Payable is coming soon. Register your interest and you'll be among the first to see it, and help shape it around how your team works.",
  },
  {
    question: 'How is it different from Invoice Automation?',
    answer:
      'Invoice Automation reads supplier invoices and posts them to Tally. Accounts Payable picks up from there: due dates, approvals, and what to pay when.',
  },
  {
    question: 'Can we set our own approval levels?',
    answer:
      'Yes. Choose who approves, in what order, and from what amount. Every sign-off is logged.',
  },
  {
    question: 'Will it show what we owe each supplier?',
    answer:
      'Yes. Supplier balances, ageing in 0–30, 31–60 and 60+ day buckets, and what is coming due in the weeks ahead.',
  },
];

/* ── Proof stats matching FinanceStatStrip ── */
const proofStats = [
  {
    title: 'Bills, POs and terms',
    copy: 'One place for every supplier',
    icon: FileText,
  },
  {
    title: 'Due dates in view',
    copy: 'No late fees, no surprises',
    icon: CalendarClock,
  },
  {
    title: 'Ageing and balances',
    copy: 'What you owe, to whom, and when',
    icon: TrendingUp,
  },
  {
    title: 'Multi-level approval',
    copy: 'The right sign-off, every step logged',
    icon: CheckCircle2,
    highlight: true,
  },
];

export function AccountsPayablePage() {
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
                <span>Accounts Payable</span>
              </nav>

              <p className={s.eyebrow}>
                Accounts Payable <span className={s.badge}>Upcoming capability</span>
              </p>

              <h1 id="hero-title" className={s.heroTitle}>
                Pay suppliers on time,
                <br />
                <span>with every bill approved.</span>
              </h1>

              <p className={s.heroSub}>
                Every supplier bill, PO and payment term in one place. See what&apos;s due this week,
                send bills to the right approver, and know exactly what you owe, to whom and when.
              </p>

              <div className={s.heroActions}>
                <Link
                  href="#register-interest"
                  className={s.primaryBtn}
                  onClick={(e) => {
                    const target = document.getElementById('register-interest');
                    if (target) {
                      e.preventDefault();
                      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      window.history.pushState(null, '', '#register-interest');
                    }
                  }}
                >
                  <span>Register interest</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
                <Link href="/finance-desk/" className={s.secondaryBtn}>
                  <span>Explore Finance Desk</span>
                  <ArrowRight size={16} aria-hidden="true" />
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
                <span>Every bill is signed off by the right people before it&apos;s scheduled for payment.</span>
              </p>
            </div>

            {/* Live Mock Preview Card with 3D Depth Backdrop & Ghost Card */}
            <div className={s.heroVisualWrapper}>
              <div className={s.ambientGlow} aria-hidden="true" />
              <div className={s.ghostCardBehind} aria-hidden="true" />

              <div
                className={s.qcard}
                role="region"
                aria-label="Example payables view: 2.52 lakh due this week, 1 bill waiting for approval, 1 overdue"
              >
                <div className={s.qcardTop}>
                  <span>
                    <strong>Payables</strong> · This week
                  </span>
                  <span className={`${s.statusBadge} ${s.info}`}>3 bills</span>
                </div>
                <div className={s.qcardBody}>
                  <div className={s.deskStats}>
                    <div>
                      <span className={s.statVal}>₹2.52L</span>
                      <span className={s.statLabel}>due this week</span>
                    </div>
                    <div>
                      <span className={s.statVal}>1</span>
                      <span className={s.statLabel}>waiting approval</span>
                    </div>
                    <div>
                      <span className={s.statVal}>1</span>
                      <span className={s.statLabel}>overdue</span>
                    </div>
                  </div>
                  <div className={s.qcardRows}>
                    <div className={s.qcardRow}>
                      <span className={s.rowWho}>Prime Components</span>
                      <span className={s.rowWhat}>INV-9021 · ₹1,45,200 · due 20 Nov</span>
                      <span className={`${s.statusBadge} ${s.ok}`}>Approved</span>
                    </div>
                    <div className={s.qcardRow}>
                      <span className={s.rowWho}>Metro Supplies</span>
                      <span className={s.rowWhat}>INV-4491 · ₹82,450 · due 19 Nov</span>
                      <span className={`${s.statusBadge} ${s.info}`}>With finance</span>
                    </div>
                    <div className={s.qcardRow}>
                      <span className={s.rowWho}>Apex Services</span>
                      <span className={s.rowWhat}>INV-0194 · ₹24,800 · 2 days late</span>
                      <span className={`${s.statusBadge} ${s.wait}`}>Overdue</span>
                    </div>
                  </div>

                  {/* Interactive Action Row matching Image 1 */}
                  <div className={s.heroActionRow}>
                    <button
                      type="button"
                      className={s.heroApproveBtn}
                    >
                      <Check size={16} aria-hidden="true" />
                      <span>Schedule payment · ₹1,45,200</span>
                    </button>
                    <button
                      type="button"
                      className={s.heroEditBtn}
                    >
                      Details
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
      <section className={s.proofSection} aria-labelledby="payables-stats-title">
        <div className="site-shell">
          <h2 id="payables-stats-title" className={s.proofEyebrow}>
            Accounts Payable at a glance
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
            <p className={s.eyebrow}>Why payables get messy</p>
            <h2 id="problem-h" className={s.headline}>
              Bills everywhere. Approvals stuck.
              <br />
              <span>Due dates missed.</span>
            </h2>
            <p className={s.lead}>
              Accounts Payable brings it all into one flow, so your team pays the right bills at the
              right time.
            </p>
          </div>

          <div className={s.painGrid}>
            <article className={s.painCard}>
              <span className={s.painMono}>01 · Bills</span>
              <h3>Bills scattered everywhere</h3>
              <p className={s.painWas}>
                Email, WhatsApp, paper and PO copies in different places.
              </p>
              <p className={s.painFix}>
                <strong>Now:</strong> every bill with its PO and terms, in one list.
              </p>
            </article>

            <article className={s.painCard}>
              <span className={s.painMono}>02 · Due dates</span>
              <h3>Late fees and angry suppliers</h3>
              <p className={s.painWas}>
                Due dates tracked in someone&apos;s head or an Excel sheet.
              </p>
              <p className={s.painFix}>
                <strong>Now:</strong> what&apos;s due this week, sorted by date and amount.
              </p>
            </article>

            <article className={s.painCard}>
              <span className={s.painMono}>03 · Approvals</span>
              <h3>Bills stuck in someone&apos;s inbox</h3>
              <p className={s.painWas}>Nobody knows who has it, or who still needs to sign.</p>
              <p className={s.painFix}>
                <strong>Now:</strong> each bill goes to the right approver, with a reminder.
              </p>
            </article>

            <article className={s.painCard}>
              <span className={s.painMono}>04 · Visibility</span>
              <h3>What do we owe, really?</h3>
              <p className={s.painWas}>Ageing and supplier balances rebuilt by hand at month-end.</p>
              <p className={s.painFix}>
                <strong>Now:</strong> ageing, balances and what&apos;s coming due, always current.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section id="how" className={`${s.section} ${s.howSectionDark}`} aria-labelledby="how-h">
        <div className="site-shell">
          <div className={s.secHead}>
            <p className={s.eyebrow}>How it will work</p>
            <h2 id="how-h" className={s.headline}>
              Collect. Track. Approve.
              <br />
              <span>Plan.</span>
            </h2>
            <p className={s.lead}>
              One supplier bill, from arrival to approved and scheduled for payment.
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

                  {activeStep.actions && (
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

      {/* 5. WHAT IT HANDLES */}
      <section id="handles" className={s.section} aria-labelledby="handles-h">
        <div className="site-shell">
          <div className={s.secHead}>
            <p className={s.eyebrow}>Everything in Accounts Payable</p>
            <h2 id="handles-h" className={s.headline}>
              From the bill arriving
              <br />
              <span>to knowing what to pay this week.</span>
            </h2>
          </div>

          <div className={s.handlesGrid}>
            <article className={s.handleCard}>
              <span className={s.handleTag}>Bills</span>
              <h3>Every supplier bill</h3>
              <p>Bills from every supplier in one list, with line items and GSTIN.</p>
            </article>

            <article className={s.handleCard}>
              <span className={s.handleTag}>Purchase orders</span>
              <h3>Matched to the PO</h3>
              <p>Each bill checked against its purchase order or contract before approval.</p>
            </article>

            <article className={s.handleCard}>
              <span className={s.handleTag}>Terms</span>
              <h3>Payment terms built in</h3>
              <p>15 days, 30 days or due on receipt, and the due date worked out for you.</p>
            </article>

            <article className={s.handleCard}>
              <span className={s.handleTag}>Due dates</span>
              <h3>What&apos;s due and what&apos;s late</h3>
              <p>Upcoming dues sorted by date and amount, so you avoid late fees.</p>
            </article>

            <article className={s.handleCard}>
              <span className={s.handleTag}>Approvals</span>
              <h3>Multi-level sign-off</h3>
              <p>Department head, then finance controller. You set the levels and limits.</p>
            </article>

            <article className={s.handleCard}>
              <span className={s.handleTag}>Audit trail</span>
              <h3>Every step on record</h3>
              <p>Who approved what, and when, for every bill.</p>
            </article>

            <article className={s.handleCard}>
              <span className={s.handleTag}>Ageing</span>
              <h3>0–30, 31–60, 60+ days</h3>
              <p>See how old every unpaid bill is, at any moment.</p>
            </article>

            <article className={s.handleCard}>
              <span className={s.handleTag}>Balances</span>
              <h3>Supplier balances and trends</h3>
              <p>What you owe each supplier, and how it&apos;s moving month to month.</p>
            </article>

            <article className={s.handleCard}>
              <span className={s.handleTag}>Cash planning</span>
              <h3>Cash you&apos;ll need</h3>
              <p>What&apos;s coming due in the weeks ahead, so payments never surprise you.</p>
            </article>
          </div>
        </div>
      </section>

      {/* 6. THE REST OF THE FINANCE DESK */}
      <section className={`${s.section} ${s.moreSectionDark}`} aria-labelledby="more-h">
        <div className="site-shell">
          <div className={s.secHead}>
            <p className={s.eyebrow}>Available today</p>
            <h2 id="more-h" className={s.headline}>
              Start with the rest of the
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
                Reminders by email and WhatsApp, approved by your team before they go.
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
                  What payables teams ask us first.
                </h2>
                <p className={s.faqDescription}>
                  Something else on your mind? Tell us when you register.
                </p>
              </div>
            </div>
            <SharedFaqAccordion items={faqItems} defaultOpenIndex={0} toggleStyle="plus" />
          </div>
        </div>
      </section>

      {/* 8. REGISTER INTEREST FORM */}
      <section
        id="register-interest"
        className={s.section}
        aria-labelledby="register-h"
        style={{ scrollMarginTop: 80 }}
      >
        <div className="site-shell">
          <div style={{ maxWidth: 720, marginInline: 'auto' }}>
            <div className={s.secHead} style={{ textAlign: 'center', marginInline: 'auto', marginBottom: 36 }}>
              <p className={s.eyebrow} style={{ justifyContent: 'center' }}>
                Register your interest
              </p>
              <h2 id="register-h" className={s.headline}>
                Be first to see
                <br />
                <span>Accounts Payable.</span>
              </h2>
              <p className={s.lead}>
                Tell us what your payables team needs. We&apos;ll show you Accounts Payable first, and
                build it around how you work.
              </p>
            </div>

            <DemoCta intent="accounts-payable" />
          </div>
        </div>
      </section>
    </>
  );
}
