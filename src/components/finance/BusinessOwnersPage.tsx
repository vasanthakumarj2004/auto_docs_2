'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
  Wallet,
} from 'lucide-react';
import { useAutoCycle } from '@/src/hooks/useAutoCycle';
import { SharedFaqAccordion } from '../SharedFaqAccordion';
import { FinanceClosingCta } from './FinanceClosingCta';
import s from './InvoiceAutomationPage.module.css';

/* ── 1. Proof Stats Strip (Key Facts) ── */
const proofStats = [
  {
    title: 'Cash and commitments',
    copy: 'One view, straight from Tally',
    icon: Wallet,
  },
  {
    title: 'One-click approval',
    copy: 'With the bill attached',
    icon: CheckCircle2,
  },
  {
    title: 'Price and duplicate checks',
    copy: 'Flagged before you sign',
    icon: ShieldCheck,
  },
  {
    title: 'Ask in plain words',
    copy: '"Why is cash down this month?"',
    icon: MessageSquare,
    highlight: true,
  },
];

/* ── 2. Four Pain Points (Sound familiar?) ── */
const painPoints = [
  {
    num: '01 · Month-end',
    title: 'Blind until the books close',
    was: 'Spending and dues only show up weeks later, when accounts closes the month.',
    fix: 'cash, dues and spending, current every day.',
  },
  {
    num: '02 · Leaks',
    title: 'Price hikes and repeat bills',
    was: 'A supplier raises a rate or bills twice, and nobody notices.',
    fix: 'flagged before the bill reaches you.',
  },
  {
    num: '03 · Approvals',
    title: 'Bills piling up on your desk',
    was: 'Paper folders and emails, with no context or purchase history.',
    fix: 'sign off in one click, with the bill and its history.',
  },
  {
    num: '04 · Questions',
    title: 'Asking staff for basic numbers',
    was: 'Every "what do we owe Metro?" stops your accounts team.',
    fix: 'ask Docsynecx and get the answer yourself.',
  },
];

/* ── 3. What You Get (Gain Cards) ── */
const gainCards = [
  {
    tag: 'Cash control',
    upcoming: true,
    title: "What's due, before it's due",
    desc: 'Supplier bills sorted by due date, so there are no cash pinches or late fees.',
  },
  {
    tag: 'Approvals',
    title: 'Sign off only what matters',
    desc: 'Set an amount. Smaller bills go straight to accounts, bigger ones come to you.',
  },
  {
    tag: 'Collections',
    title: 'Who owes you, and how late',
    desc: 'Overdue customers in one list, with reminders your team approves and sends.',
  },
  {
    tag: 'Price checks',
    title: 'No silent price creep',
    desc: 'Item rates compared with past purchases, and repeat bills flagged.',
  },
  {
    tag: 'Ask questions',
    title: 'Answers without opening Tally',
    desc: 'Margins, top expenses, supplier dependence. Ask in plain words.',
  },
  {
    tag: 'Audit-ready',
    title: 'Every voucher has its proof',
    desc: 'Each entry linked to the original bill, who approved it and when.',
  },
];

/* ── 4. Interactive Step Definitions with Panel Data ── */
interface StepRow {
  who: string;
  what: string;
  status: string;
  type: 'ok' | 'wait' | 'info';
}

interface HowStep {
  num: number;
  title: string;
  desc: string;
  panelBar: string;
  panelStatus: string;
  statusType: 'ok' | 'wait' | 'info';
  rows?: StepRow[];
  actions?: string[];
  files?: string[];
  foot: string;
}

const howSteps: HowStep[] = [
  {
    num: 1,
    title: 'Bills come in',
    desc: 'Email, WhatsApp or upload. Branch bills and utility bills too.',
    panelBar: 'Step 1 of 4 · Inbox',
    panelStatus: 'Today',
    statusType: 'info',
    rows: [
      { who: 'Prime Components', what: 'Emailed PDF · ₹1,45,200', status: 'Received', type: 'ok' },
      { who: 'Metro Supplies', what: 'Sent on WhatsApp · ₹82,450', status: 'Received', type: 'ok' },
      { who: 'Electricity · Branch 2', what: 'Uploaded scan · ₹18,640', status: 'Received', type: 'ok' },
    ],
    foot: 'Every bill in one inbox, from every branch.',
  },
  {
    num: 2,
    title: 'Docsynecx checks them',
    desc: 'GST, totals, duplicates and price changes, before anyone approves.',
    panelBar: 'Step 2 of 4 · Checks',
    panelStatus: '1 flag',
    statusType: 'wait',
    rows: [
      { who: 'GST and totals', what: 'All three bills add up', status: 'Passed', type: 'ok' },
      { who: 'Duplicates', what: 'No repeat bills found', status: 'Passed', type: 'ok' },
      { who: 'Prime Components · price', what: 'Ball bearings ₹170 each. Last PO ₹160', status: 'Up 6%', type: 'wait' },
    ],
    foot: "Problems caught before anyone signs, not after the money's gone.",
  },
  {
    num: 3,
    title: 'You sign off the big ones',
    desc: 'Routine bills go to accounts. High-value bills and odd prices come to you.',
    panelBar: 'Step 3 of 4 · Your approvals',
    panelStatus: '2 for you',
    statusType: 'wait',
    rows: [
      { who: 'Prime Components · ₹1,45,200', what: 'Above your ₹50,000 limit · price up 6%', status: 'Your sign-off', type: 'wait' },
      { who: 'Metro Supplies · ₹82,450', what: 'Above your ₹50,000 limit · PDF attached', status: 'Your sign-off', type: 'wait' },
      { who: 'Electricity · ₹18,640', what: 'Under the limit', status: 'Accounts approved', type: 'ok' },
    ],
    actions: ['Approve', 'Ask a question'],
    foot: 'Only the bills that need you, with everything you need to decide.',
  },
  {
    num: 4,
    title: 'Posted to Tally',
    desc: 'A purchase voucher, with the bill and your approval linked.',
    panelBar: 'Step 4 of 4 · TallyPrime',
    panelStatus: 'Voucher created',
    statusType: 'ok',
    rows: [
      { who: 'Metro Supplies · INV-4491', what: 'Purchase voucher · ₹82,450', status: 'Posted', type: 'ok' },
    ],
    files: ['INV-4491.pdf linked', 'Approved by you · 17 Nov, 6:12 PM'],
    foot: 'Proof on every voucher, ready for your auditor.',
  },
];

/* ── 5. Customer Story Facts ── */
const storyFacts = [
  { bold: 'Multi-branch', desc: 'spares and service bills' },
  { bold: 'Hours, not days', desc: "to process the month's bills" },
  { bold: 'Owner sign-off', desc: 'kept on every high-value bill' },
];

/* ── 6. Owner FAQs ── */
const faqItems = [
  {
    question: 'Do we have to stop using TallyPrime?',
    answer:
      'No. Docsynecx works with your existing Tally company and ledgers. Your team keeps working in Tally as they do today.',
  },
  {
    question: 'What do I see when a bill needs my approval?',
    answer:
      'The bill itself, the checks it passed or failed, and what you paid this supplier before. Approve in one click.',
  },
  {
    question: 'How does it stop duplicate payments?',
    answer:
      'Every bill is compared with ones already received, by supplier, bill number, amount and date. Anything that looks like a repeat is flagged before approval.',
  },
  {
    question: 'Does anything go into Tally without approval?',
    answer:
      'No. Every entry is reviewed and approved first, by your team or by you, depending on the limits you set.',
  },
  {
    question: 'How long does it take to get started?',
    answer:
      'The first-time setup with TallyPrime takes minutes. Then we test with your own bills and train your team in a single session.',
  },
];

/* ── 7. For the Rest of Your Team ── */
const otherRoles = [
  {
    role: 'Finance teams',
    title: 'Close the month days earlier',
    lead: 'High-volume invoices, multi-level approvals and GST checks in one place.',
    href: '/finance-desk/finance-teams/',
    linkText: 'For finance teams',
  },
  {
    role: 'Accounts teams',
    title: 'Stop retyping bills into Tally',
    lead: 'Bills read, ledgers mapped and vouchers drafted. Your team reviews and approves.',
    href: '/finance-desk/accounts-teams/',
    linkText: 'For accounts teams',
  },
  {
    role: 'CA firms',
    title: "Every client's bills, one workspace",
    lead: 'Client bills read, GST checked and posted across all your client companies.',
    href: '/finance-desk/ca-firms/',
    linkText: 'For CA firms',
  },
];

export function BusinessOwnersPage() {
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
              <p className={s.eyebrow}>For business owners</p>

              <h1 id="hero-title" className={s.heroTitle}>
                Know where every rupee stands.
                <br />
                <span>Without waiting for month-end.</span>
              </h1>

              <p className={s.heroSub}>
                See your cash, what you owe and what you&apos;re owed. Sign off the bills that matter in one click, and ask your numbers questions in plain words. All from the TallyPrime your team already uses.
              </p>

              <div className={s.heroActions}>
                <Link href="/demo/#demo-form" className={s.primaryBtn}>
                  <span>Book a demo</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  href="#gain"
                  className={s.secondaryBtn}
                  onClick={(e) => {
                    const target = document.getElementById('gain');
                    if (target) {
                      e.preventDefault();
                      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      window.history.pushState(null, '', '#gain');
                    }
                  }}
                >
                  <span>What you get</span>
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
                <span>Nothing is posted to Tally without approval. You decide which bills need yours.</span>
              </p>
            </div>

            {/* Live Mock Preview Card with 3D Depth Backdrop & Ghost Card */}
            <div className={s.heroVisualWrapper}>
              <div className={s.ambientGlow} aria-hidden="true" />
              <div className={s.ghostCardBehind} aria-hidden="true" />

              <div
                className={s.qcard}
                role="region"
                aria-label="Example owner view: 21.7 lakh cash and bank, 2.52 lakh due to suppliers this week, 6.4 lakh overdue from customers"
              >
                <div className={s.qcardTop}>
                  <span>
                    <strong>Owner view</strong> · This week
                  </span>
                  <span className={`${s.statusBadge} ${s.wait}`}>1 for you</span>
                </div>
                <div className={s.qcardBody}>
                  <div className={s.deskStats}>
                    <div>
                      <span className={s.statVal}>₹21.7L</span>
                      <span className={s.statLabel}>cash and bank</span>
                    </div>
                    <div>
                      <span className={s.statVal}>₹2.52L</span>
                      <span className={s.statLabel}>due to suppliers</span>
                    </div>
                    <div>
                      <span className={s.statVal}>₹6.4L</span>
                      <span className={s.statLabel}>overdue from customers</span>
                    </div>
                  </div>
                  <div className={s.qcardRows}>
                    <div className={s.qcardRow}>
                      <span className={s.rowWho}>Metro Supplies</span>
                      <span className={s.rowWhat}>INV-4491 · ₹82,450 · PDF attached</span>
                      <span className={`${s.statusBadge} ${s.wait}`}>Your sign-off</span>
                    </div>
                    <div className={s.qcardRow}>
                      <span className={s.rowWho}>Prime Components</span>
                      <span className={s.rowWhat}>Ball bearings ₹170, last PO ₹160</span>
                      <span className={`${s.statusBadge} ${s.info}`}>Price up 6%</span>
                    </div>
                    <div className={s.qcardRow}>
                      <span className={s.rowWho}>Kiran Retail</span>
                      <span className={s.rowWhat}>₹3,20,000 · 46 days late</span>
                      <span className={`${s.statusBadge} ${s.ok}`}>Reminder sent</span>
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
      <section className={s.proofSection} aria-labelledby="owner-stats-title">
        <div className="site-shell">
          <h2 id="owner-stats-title" className={s.proofEyebrow}>
            Key facts
          </h2>
          <div className={s.proofGrid4}>
            {proofStats.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`${s.outcomeCard} ${item.highlight ? s.highlightOutcome : ''}`}
                >
                  <span className={s.outcomeIconBadge} aria-hidden="true">
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
      <section className={`${s.section} ${s.altSection}`} aria-labelledby="problem-h">
        <div className="site-shell">
          <div className={s.secHead}>
            <p className={s.eyebrow}>Sound familiar?</p>
            <h2 id="problem-h" className={s.headline}>
              Four things that keep
              <br />
              <span>owners guessing.</span>
            </h2>
            <p className={s.lead}>
              Your numbers are all in Tally. Docsynecx puts them where you can see and act on them.
            </p>
          </div>

          <div className={s.painGrid}>
            {painPoints.map((item) => (
              <article key={item.num} className={s.painCard}>
                <span className={s.painMono}>{item.num}</span>
                <h3>{item.title}</h3>
                <p className={s.painWas}>{item.was}</p>
                <p className={s.painFix}>
                  <strong>Now:</strong> {item.fix}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHAT YOU GET */}
      <section id="gain" className={s.section} aria-labelledby="gain-h">
        <div className="site-shell">
          <div className={s.secHead}>
            <p className={s.eyebrow}>What you get</p>
            <h2 id="gain-h" className={s.headline}>
              Control of the money,
              <br />
              <span>without doing the accounts.</span>
            </h2>
          </div>

          <div className={s.handlesGrid}>
            {gainCards.map((card) => (
              <article key={card.title} className={s.handleCard}>
                <span className={s.handleTag}>
                  {card.tag}
                  {card.upcoming && (
                    <span className={s.badge} style={{ marginLeft: 8 }}>
                      Upcoming
                    </span>
                  )}
                </span>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section id="how" className={`${s.section} ${s.howSectionDark}`} aria-labelledby="how-h">
        <div className="site-shell">
          <div className={s.secHead}>
            <p className={s.eyebrow}>How it works</p>
            <h2 id="how-h" className={s.headline}>
              Your team does the work.
              <br />
              <span>You keep control.</span>
            </h2>
            <p className={s.lead}>
              One supplier bill, from the inbox to Tally, with you in the loop only when it counts.
            </p>
          </div>

          <div className={s.howGrid} {...containerProps}>
            {/* Step Tabs List */}
            <ol className={s.stepsList} role="tablist" aria-label="Four steps">
              {howSteps.map((step, idx) => (
                <li key={step.num}>
                  <button
                    type="button"
                    role="tab"
                    id={`step-tab-${step.num}`}
                    aria-controls={`step-panel-${step.num}`}
                    aria-selected={active === idx}
                    className={`${s.stepButtonDark} ${active === idx ? s.stepButtonDarkActive : ''}`}
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

            {/* Active Step Panel */}
            <div>
              <div
                className={s.stepPanelDark}
                role="tabpanel"
                id={`step-panel-${activeStep.num}`}
                aria-labelledby={`step-tab-${activeStep.num}`}
              >
                <div className={s.panelBarDark}>
                  <span>{activeStep.panelBar}</span>
                  <span className={`${s.statusBadge} ${s[activeStep.statusType] || s.info}`}>
                    {activeStep.panelStatus}
                  </span>
                </div>

                <div className={s.panelBodyDark}>
                  {/* Rows */}
                  {activeStep.rows && (
                    <div className={s.qcardRowsDark}>
                      {activeStep.rows.map((row) => (
                        <div key={row.who} className={s.qcardRowDark}>
                          <span className={s.rowWhoDark}>{row.who}</span>
                          <span className={s.rowWhatDark}>{row.what}</span>
                          <span className={`${s.statusBadge} ${s[row.type] || s.ok}`}>
                            {row.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Actions for Step 3 */}
                  {activeStep.actions && (
                    <div className={s.qactionsDark}>
                      <button type="button" className={s.actionBtnDark}>
                        Approve
                      </button>
                      <button type="button" className={s.actionBtnSecondaryDark}>
                        Ask a question
                      </button>
                    </div>
                  )}

                  {/* Files for Step 4 */}
                  {activeStep.files && (
                    <div className={s.fileListDark} style={{ marginTop: 14, marginBottom: 0 }}>
                      {activeStep.files.map((file) => (
                        <span key={file} className={s.fileChipDark}>
                          {file}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <p className={s.panelFootDark}>
                  <strong>{activeStep.foot.split(',')[0]},</strong>
                  {activeStep.foot.includes(',') ? activeStep.foot.substring(activeStep.foot.indexOf(',') + 1) : ''}
                </p>
              </div>

              <p className={s.howNoteDark}>Sample data · Example product view</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CUSTOMER STORY */}
      <section className={`${s.section} ${s.altSection}`} aria-labelledby="cust-h">
        <div className="site-shell">
          <div className={s.storyCard}>
            <div className={s.storyCopy}>
              <p className={s.eyebrow}>Customer story</p>
              <h2 id="cust-h">An automobile e-vehicles dealer: days of bills, done in hours.</h2>
              <p>
                Spares, service bills and purchase vouchers across several branches now take hours instead of days, and the owner still signs off on what matters.
              </p>
            </div>

            <ul className={s.storyFacts}>
              {storyFacts.map((fact) => (
                <li key={fact.bold} className={s.storyFactItem}>
                  <strong className={s.storyFactBold}>{fact.bold}</strong>
                  <span className={s.storyFactDesc}>{fact.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 7. FOR THE REST OF YOUR TEAM */}
      <section className={`${s.section} ${s.moreSectionDark}`} aria-labelledby="roles-h">
        <div className="site-shell">
          <div className={s.secHead}>
            <p className={s.eyebrow}>For the rest of your team</p>
            <h2 id="roles-h" className={s.headline}>
              Built for everyone who
              <br />
              <span>touches the books.</span>
            </h2>
          </div>

          <div className={s.moreGrid}>
            {otherRoles.map((role) => (
              <article key={role.role} className={s.moreCard}>
                <span className={s.moreTag}>{role.role}</span>
                <h3>{role.title}</h3>
                <p className={s.moreLead}>{role.lead}</p>
                <Link href={role.href} className={s.moreLink}>
                  <span>{role.linkText}</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* 8. FAQ */}
      <section id="faq" className={s.section} aria-labelledby="faq-h">
        <div className="site-shell">
          <div className={s.faqLayout}>
            <div className={s.faqHeading}>
              <div>
                <p className={s.faqEyebrow}>Owner questions</p>
                <h2 id="faq-h" className={s.faqTitle}>
                  What owners ask us first.
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

      {/* 9. CLOSING CTA */}
      <FinanceClosingCta
        eyebrow="See your own numbers"
        title={
          <>
            Thirty minutes. Your own Tally.
            <br />
            <span>Real answers.</span>
          </>
        }
        copy="Bring the question you always ask your accounts team. We'll answer it from your books in the demo."
        // steps={[
        //   'Book a 30-minute demo',
        //   'Connect TallyPrime or bring a few bills',
        //   'See your cash, dues and approvals in one view',
        // ]}
        primaryHref="/demo/#demo-form"
        primaryText="Book a demo"
        secondaryHref="/finance-desk/"
        secondaryText="Explore Finance Desk"
      />
    </>
  );
}
