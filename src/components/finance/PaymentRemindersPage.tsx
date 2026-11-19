'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarClock,
  Check,
  CheckCircle2,
  MessageSquare,
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
    title: 'Track due dates',
    desc: 'Unpaid sales invoices picked up from Tally, each with its due date.',
    panelBar: 'Step 1 of 4 · Unpaid invoices from Tally',
    panelStatus: '4 shown',
    statusType: 'info',
    table: {
      headers: ['Customer · Invoice', 'Due', 'Amount'],
      rows: [
        ['Kiran Retail · INV-S-2207', '02 Oct', '₹3,20,000'],
        ['Anand Traders · INV-S-2240', '30 Oct', '₹86,000'],
        ['Patel & Sons · INV-S-2265', '05 Nov', '₹54,500'],
        ['Sharma Textiles · INV-S-2291', '20 Nov', '₹1,20,000'],
      ],
    },
    foot: 'No exports, no spreadsheets. The list comes straight from your books.',
  },
  {
    num: 2,
    title: "Spot what's pending",
    desc: 'Due soon, overdue and long overdue, sorted so the biggest risks come first.',
    panelBar: 'Step 2 of 4 · Pending and overdue',
    panelStatus: '3 overdue',
    statusType: 'wait',
    rows: [
      {
        who: 'Kiran Retail · ₹3,20,000',
        what: '46 days late · 2 reminders so far',
        status: 'Long overdue',
        type: 'wait',
      },
      {
        who: 'Anand Traders · ₹86,000',
        what: '18 days late · no reminder yet',
        status: 'Overdue',
        type: 'wait',
      },
      {
        who: 'Patel & Sons · ₹54,500',
        what: '12 days late · 1 reminder sent',
        status: 'Overdue',
        type: 'wait',
      },
      {
        who: 'Sharma Textiles · ₹1,20,000',
        what: 'Due in 3 days',
        status: 'Due soon',
        type: 'info',
      },
    ],
    foot: 'The biggest, oldest amounts first, so nothing slips through.',
  },
  {
    num: 3,
    title: 'Approve the reminder',
    desc: 'A polite draft with the invoice details. Edit it if you like, then approve.',
    panelBar: 'Step 3 of 4 · Draft for Kiran Retail',
    panelStatus: 'Waiting for approval',
    statusType: 'wait',
    fields: [
      { label: 'To', value: 'Kiran Retail · Accounts' },
      { label: 'Channel', value: 'Email' },
      { label: 'Reminder', value: '3rd' },
    ],
    mail: {
      subject: 'Reminder: INV-S-2207 for ₹3,20,000',
      body: "Hello, a quick reminder that invoice INV-S-2207 for ₹3,20,000 was due on 02 Oct 2026. If it's already on its way, thank you, and please ignore this note. Happy to resend a copy if needed.",
    },
    actions: ['Approve and send', 'Edit'],
    foot: 'Polite, specific and on time. Your team has the last word.',
  },
  {
    num: 4,
    title: 'Send and follow up',
    desc: 'Sent now or scheduled, with a full history for every customer.',
    panelBar: 'Step 4 of 4 · Follow-up log',
    panelStatus: 'Up to date',
    statusType: 'ok',
    rows: [
      {
        who: 'Kiran Retail',
        what: '3rd reminder · email · 17 Nov, 10:30',
        status: 'Sent',
        type: 'ok',
      },
      {
        who: 'Sharma Textiles',
        what: 'Friendly heads-up · WhatsApp · 18 Nov',
        status: 'Scheduled',
        type: 'info',
      },
      {
        who: 'Patel & Sons',
        what: '2nd reminder · email · 14 Nov',
        status: 'Sent',
        type: 'ok',
      },
      {
        who: 'Anand Traders',
        what: '1st reminder drafted',
        status: 'To approve',
        type: 'wait',
      },
    ],
    foot: 'Every reminder logged against its invoice, so anyone can pick up where others left off.',
  },
];

/* ── FAQ items ── */
const faqItems = [
  {
    question: 'Does anything go to customers without our approval?',
    answer:
      'No. Every reminder waits for someone on your team to approve it. Then it is sent straight away or at the time you schedule.',
  },
  {
    question: 'Where do the unpaid invoices come from?',
    answer:
      'From your sales invoices in Tally Prime, with the due dates already there. Nobody has to keep a separate list.',
  },
  {
    question: 'Can we change the wording?',
    answer:
      'Yes. Edit any draft before approving it. The tone stays polite, and you decide how firm the later reminders get.',
  },
  {
    question: 'Which channels can we use?',
    answer: 'Email and WhatsApp. You can pick the channel for each reminder.',
  },
  {
    question: 'How long does setup take?',
    answer:
      'Connect Tally Prime straight away. Your unpaid invoices show up in minutes, with the first reminders ready to approve.',
  },
];

/* ── Proof stats matching FinanceStatStrip (Without bottom links) ── */
const proofStats = [
  {
    title: 'Before and after due date',
    copy: 'On the schedule you set',
    icon: CalendarClock,
  },
  {
    title: 'Email · WhatsApp',
    copy: 'Where your customers actually read',
    icon: MessageSquare,
  },
  {
    title: 'Every follow-up logged',
    copy: 'Who was reminded, when and how',
    icon: CheckCircle2,
  },
  {
    title: 'One click to approve',
    copy: 'Docsynecx drafts, your team sends',
    icon: MousePointerClick,
    highlight: true,
  },
];

export function PaymentRemindersPage() {
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
                <span>Payment Reminders</span>
              </nav>

              <p className={s.eyebrow}>Payment Reminders</p>

              <h1 id="hero-title" className={s.heroTitle}>
                Get paid on time,
                <br />
                <span>without chasing every customer.</span>
              </h1>

              <p className={s.heroSub}>
                Docsynecx picks up every unpaid sales invoice from Tally and drafts a polite
                reminder before and after the due date. Your team approves it, then it&apos;s sent or
                scheduled, and every follow-up is tracked.
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
                <span>No reminder goes to a customer until your team approves it.</span>
              </p>
            </div>

            {/* Live Mock Preview Card with 3D Depth Backdrop & Ghost Card */}
            <div className={s.heroVisualWrapper}>
              <div className={s.ambientGlow} aria-hidden="true" />
              <div className={s.ghostCardBehind} aria-hidden="true" />

              <div
                className={s.qcard}
                role="region"
                aria-label="Example collections view: 18.6 lakh outstanding, 6.4 lakh overdue, 4 reminders to approve"
              >
                <div className={s.qcardTop}>
                  <span>
                    <strong>Collections</strong> · 17 Nov 2026
                  </span>
                  <span className={`${s.statusBadge} ${s.wait}`}>4 to approve</span>
                </div>
                <div className={s.qcardBody}>
                  <div className={s.deskStats}>
                    <div>
                      <span className={s.statVal}>₹18.6L</span>
                      <span className={s.statLabel}>outstanding</span>
                    </div>
                    <div>
                      <span className={s.statVal}>₹6.4L</span>
                      <span className={s.statLabel}>overdue</span>
                    </div>
                    <div>
                      <span className={s.statVal}>4</span>
                      <span className={s.statLabel}>reminders to approve</span>
                    </div>
                  </div>
                  <div className={s.qcardRows}>
                    <div className={s.qcardRow}>
                      <span className={s.rowWho}>Kiran Retail</span>
                      <span className={s.rowWhat}>₹3,20,000 · over 45 days late</span>
                      <span className={`${s.statusBadge} ${s.wait}`}>To approve</span>
                    </div>
                    <div className={s.qcardRow}>
                      <span className={s.rowWho}>Sharma Textiles</span>
                      <span className={s.rowWhat}>₹1,20,000 · due in 3 days</span>
                      <span className={`${s.statusBadge} ${s.info}`}>Scheduled</span>
                    </div>
                    <div className={s.qcardRow}>
                      <span className={s.rowWho}>Patel &amp; Sons</span>
                      <span className={s.rowWhat}>₹54,500 · 12 days late</span>
                      <span className={`${s.statusBadge} ${s.ok}`}>2nd sent</span>
                    </div>
                  </div>

                  {/* Interactive Action Row matching Image 1 */}
                  <div className={s.heroActionRow}>
                    <button
                      type="button"
                      className={s.heroApproveBtn}
                    >
                      <Check size={16} aria-hidden="true" />
                      <span>Send 4 approved reminders</span>
                    </button>
                    <button
                      type="button"
                      className={s.heroEditBtn}
                    >
                      Customize
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
      <section className={s.proofSection} aria-labelledby="reminders-stats-title">
        <div className="site-shell">
          <h2 id="reminders-stats-title" className={s.proofEyebrow}>
            Payment Reminders at a glance
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
            <p className={s.eyebrow}>Why collections slip</p>
            <h2 id="problem-h" className={s.headline}>
              Customers rarely refuse to pay.
              <br />
              <span>They forget, and nobody reminds them.</span>
            </h2>
            <p className={s.lead}>
              Docsynecx keeps every unpaid invoice in view and the reminders on time, so your team
              only approves.
            </p>
          </div>

          <div className={s.painGrid}>
            <article className={s.painCard}>
              <span className={s.painMono}>01 · Visibility</span>
              <h3>Who owes what, right now?</h3>
              <p className={s.painWas}>
                The outstanding list is pulled from Tally into Excel every week.
              </p>
              <p className={s.painFix}>
                <strong>Now:</strong> every unpaid invoice in one list, with days overdue.
              </p>
            </article>

            <article className={s.painCard}>
              <span className={s.painMono}>02 · Timing</span>
              <h3>Reminders go out late, or not at all</h3>
              <p className={s.painWas}>
                Follow-ups depend on someone remembering on a busy day.
              </p>
              <p className={s.painFix}>
                <strong>Now:</strong> drafted before and after the due date, on your schedule.
              </p>
            </article>

            <article className={s.painCard}>
              <span className={s.painMono}>03 · Writing</span>
              <h3>The same awkward email, again</h3>
              <p className={s.painWas}>
                Each reminder typed from scratch, invoice details copied by hand.
              </p>
              <p className={s.painFix}>
                <strong>Now:</strong> polite drafts with the invoice, amount and due date filled in.
              </p>
            </article>

            <article className={s.painCard}>
              <span className={s.painMono}>04 · Tracking</span>
              <h3>No record of who was chased</h3>
              <p className={s.painWas}>
                Calls and emails scattered across inboxes and phones.
              </p>
              <p className={s.painFix}>
                <strong>Now:</strong> every reminder logged against the invoice it&apos;s for.
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
              Track. Spot. Approve.
              <br />
              <span>Follow up.</span>
            </h2>
            <p className={s.lead}>
              From an unpaid invoice in Tally to a reminder your customer actually reads.
            </p>
          </div>

          <div className={s.howGrid} {...containerProps}>
            <div className={s.stepsList} role="tablist" aria-label="Four steps">
              {howSteps.map((step, idx) => {
                const isActive = active === idx;
                return (
                  <button
                    key={step.num}
                    type="button"
                    role="tab"
                    id={`how-tab-${step.num}`}
                    aria-selected={isActive}
                    aria-controls={`how-panel-${step.num}`}
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
                  {activeStep.fields && (
                    <div className={s.fieldsGridDark}>
                      {activeStep.fields.map((f, i) => (
                        <div key={i} className={s.fieldItemDark}>
                          <span className={s.fieldLabelDark}>{f.label}</span>
                          <span className={s.fieldValueDark}>{f.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeStep.mail && (
                    <div className={s.mailBoxDark}>
                      <p>
                        <strong>Subject:</strong> {activeStep.mail.subject}
                      </p>
                      <p>{activeStep.mail.body}</p>
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
            <p className={s.eyebrow}>What it handles</p>
            <h2 id="handles-h" className={s.headline}>
              Everything your team does
              <br />
              <span>to get an invoice paid.</span>
            </h2>
          </div>

          <div className={s.handlesGrid}>
            <article className={s.handleCard}>
              <span className={s.handleTag}>Invoices</span>
              <h3>Every unpaid invoice</h3>
              <p>Picked up from your Tally sales, with customer, amount and due date.</p>
            </article>

            <article className={s.handleCard}>
              <span className={s.handleTag}>Ageing</span>
              <h3>Due soon and overdue</h3>
              <p>Sorted by how late and how large, so the biggest risks come first.</p>
            </article>

            <article className={s.handleCard}>
              <span className={s.handleTag}>Before due</span>
              <h3>Friendly heads-ups</h3>
              <p>A gentle note a few days before the due date. Many customers simply pay.</p>
            </article>

            <article className={s.handleCard}>
              <span className={s.handleTag}>After due</span>
              <h3>Firmer follow-ups</h3>
              <p>A second and third reminder if it&apos;s still unpaid, on the gaps you choose.</p>
            </article>

            <article className={s.handleCard}>
              <span className={s.handleTag}>Drafts</span>
              <h3>Details filled in</h3>
              <p>Invoice number, amount and due date in every message. No copying.</p>
            </article>

            <article className={s.handleCard}>
              <span className={s.handleTag}>Channels</span>
              <h3>Email and WhatsApp</h3>
              <p>Reach customers where they&apos;re most likely to reply.</p>
            </article>

            <article className={s.handleCard}>
              <span className={s.handleTag}>Review</span>
              <h3>Your team approves</h3>
              <p>Read, edit or hold any reminder. Nothing goes out without a yes.</p>
            </article>

            <article className={s.handleCard}>
              <span className={s.handleTag}>Schedule</span>
              <h3>Send now or later</h3>
              <p>Approve today, and it goes out at the time you pick.</p>
            </article>

            <article className={s.handleCard}>
              <span className={s.handleTag}>History</span>
              <h3>A log for every customer</h3>
              <p>Every reminder, channel and date, against the invoice it&apos;s for.</p>
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
              <span className={s.moreTag}>Reports</span>
              <h3>Docsynecx Intelligence</h3>
              <p className={s.moreLead}>
                Six views of your Tally numbers, including who owes you and how late.
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
        eyebrow="See it on your own receivables"
        title={
          <>
            Bring your overdue list.
            <br />
            <span>We&apos;ll draft the first reminders with you.</span>
          </>
        }
        copy="In the demo you'll see your unpaid invoices from Tally, sorted by risk, with reminders ready for your team to approve."
        steps={[
          'Book a 30-minute demo',
          'Connect Tally Prime or share your outstanding list',
          'See reminders drafted and ready to approve',
        ]}
        secondaryHref="/finance-desk/"
        secondaryText="Back to Finance Desk"
      />
    </>
  );
}
