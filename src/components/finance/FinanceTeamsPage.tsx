'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clock,
  Layers,
  ShieldCheck,
} from 'lucide-react';
import { useAutoCycle } from '@/src/hooks/useAutoCycle';
import { SharedFaqAccordion } from '../SharedFaqAccordion';
import { FinanceClosingCta } from './FinanceClosingCta';
import s from './InvoiceAutomationPage.module.css';

/* ── 1. Proof Stats Strip (Key Facts) ── */
const proofStats = [
  {
    title: 'Month-end in batches',
    copy: 'Hundreds of invoices at once',
    icon: Layers,
  },
  {
    title: 'Exceptions first',
    copy: "Review what's unclear, not every line",
    icon: Clock,
  },
  {
    title: 'GST and duplicate checks',
    copy: 'On every invoice, before approval',
    icon: ShieldCheck,
  },
  {
    title: 'Audit-ready',
    copy: 'Every bill linked to its voucher',
    icon: CheckCircle2,
    highlight: true,
  },
];

/* ── 2. Four Pain Points (Sound familiar?) ── */
const painPoints = [
  {
    num: '01 · Approvals',
    title: "Invoices stuck in someone's inbox",
    was: 'Managers forget to sign off, and early-payment discounts slip away.',
    fix: 'every invoice in one queue, with who has it and how long.',
  },
  {
    num: '02 · Month-end',
    title: 'The last-week flood',
    was: 'Bills pile up in the final days, and the team works late to check and enter them.',
    fix: 'batches read and checked as they arrive.',
  },
  {
    num: '03 · Audits',
    title: '"Who approved this, and where\'s the bill?"',
    was: 'Hunting through folders and emails when the auditors ask.',
    fix: 'the bill, edits and approval, one click from the voucher.',
  },
  {
    num: '04 · GST',
    title: 'Tax errors found too late',
    was: 'Wrong splits and GSTINs surface at filing time, as blocked credit.',
    fix: 'GSTIN, HSN and tax splits checked on every bill.',
  },
];

/* ── 3. What You Get (Gain Cards) ── */
const gainCards = [
  {
    tag: 'Intake',
    title: 'Every source, one queue',
    desc: 'Email, WhatsApp, portal upload and batch upload from branches.',
  },
  {
    tag: 'GST checks',
    title: 'GSTIN, HSN and tax splits',
    desc: 'CGST, SGST and IGST worked out from the lines and compared with the bill.',
  },
  {
    tag: 'Exceptions',
    title: "Review only what's unclear",
    desc: 'Unsure fields, duplicates and tax mismatches flagged. The rest is ready to approve.',
  },
  {
    tag: 'Approvals',
    title: 'Approval rules by department and amount',
    desc: 'Route bills by branch, department or value, with reminders to approvers.',
  },
  {
    tag: 'Banking',
    title: 'Reconciliation in the same place',
    desc: 'Bank lines matched to your sales and purchase entries.',
    linkHref: '/finance-desk/banking-reconciliation/',
    linkText: 'See Banking →',
  },
  {
    tag: 'Audit trail',
    title: 'Every step on record',
    desc: 'Edits, approvals and rejection reasons, with the bill linked to its voucher.',
  },
];

/* ── 4. Interactive Steps ── */
const howSteps = [
  {
    num: 1,
    title: 'Everything in one queue',
    desc: 'Email, WhatsApp, portal and branch uploads, in batches.',
    panelBar: 'Step 1 of 4 · November queue',
    panelStatus: '412 invoices',
    statusType: 'info' as const,
    rows: [
      { who: 'Email', what: 'Forwarded from suppliers and branches', status: '268', type: 'ok' as const },
      { who: 'Portal upload', what: 'PDFs and scans, single and batch', status: '96', type: 'ok' as const },
      { who: 'WhatsApp', what: 'Photos and PDFs from the field', status: '48', type: 'ok' as const },
    ],
    foot: 'One queue for the whole month, however invoices arrive.',
  },
  {
    num: 2,
    title: 'Read and checked',
    desc: 'Line items, HSN, GST and duplicates checked on every invoice.',
    panelBar: 'Step 2 of 4 · Checks',
    panelStatus: '26 exceptions',
    statusType: 'wait' as const,
    deskStats: [
      { val: '386', label: 'all checks passed' },
      { val: '14', label: 'unsure fields' },
      { val: '12', label: 'GST or duplicate flags' },
    ],
    rows: [
      { who: 'Apex Services · INV-0294', what: 'Lines give ₹2,700 GST. Bill says ₹2,970', status: 'GST mismatch', type: 'wait' as const },
      { who: 'Metro Supplies · INV-1068', what: 'Same supplier, amount and date as INV-1061', status: 'Duplicate?', type: 'wait' as const },
    ],
    foot: 'Your team starts with the 26 that need them, not all 412.',
  },
  {
    num: 3,
    title: 'Your team approves',
    desc: 'Routed by your approval rules. Clear invoices approved in batches.',
    panelBar: 'Step 3 of 4 · Approvals',
    panelStatus: '386 approved',
    statusType: 'ok' as const,
    rows: [
      { who: 'Clear invoices', what: 'Reviewed and approved as a batch', status: '386', type: 'ok' as const },
      { who: 'Apex Services · INV-0294', what: 'Supplier sent corrected bill', status: 'Fixed', type: 'ok' as const },
      { who: 'Metro Supplies · INV-1068', what: 'Rejected: duplicate of INV-1061', status: 'Rejected', type: 'wait' as const },
    ],
    foot: 'Every approval and rejection reason is logged.',
  },
  {
    num: 4,
    title: 'Posted to TallyPrime',
    desc: 'Purchase vouchers to the right ledgers, bill attached.',
    panelBar: 'Step 4 of 4 · TallyPrime',
    panelStatus: 'Vouchers created',
    statusType: 'ok' as const,
    table: {
      headers: ['Prime Components · INV-4821', 'Dr / Cr', 'Amount'],
      rows: [
        ['Purchase @ 18%', 'Dr', '₹62,750'],
        ['Input CGST 9%', 'Dr', '₹5,647.50'],
        ['Input SGST 9%', 'Dr', '₹5,647.50'],
        ['Prime Components', 'Cr', '₹74,045'],
      ],
    },
    files: ['INV-4821.pdf linked · Approved 28 Nov · audit log kept'],
    foot: 'Right ledgers, bill attached, ready for the auditors.',
  },
];

/* ── 5. Customer Story Facts ── */
const storyFacts = [
  { bold: '60+ min → 15 min', desc: 'document review and entry' },
  { bold: 'Hundreds', desc: 'of recurring documents a month' },
  { bold: 'Every entry', desc: 'still reviewed by the team' },
];

/* ── 6. Finance FAQs ── */
const faqItems = [
  {
    question: 'Will our accountants still check entries before posting?',
    answer:
      'Yes. Nothing goes to TallyPrime until your team approves it. Unclear fields and flagged invoices are shown first.',
  },
  {
    question: 'Can we set approval rules by department or amount?',
    answer:
      'Yes. Route invoices by department, branch, category or amount, for example invoices over ₹50,000 going to a director. Approvers get reminders, and every step is logged.',
  },
  {
    question: 'Does it handle credit and debit notes?',
    answer:
      'Yes. They come into the same queue as supplier invoices and go through the same checks.',
  },
  {
    question: 'What about multiple branches?',
    answer:
      'Branches send bills into the same queue by email, WhatsApp or upload, so the finance team sees the whole month in one place.',
  },
  {
    question: 'How long does it take to get started?',
    answer:
      'The first-time setup with TallyPrime takes minutes. Then we test with your own invoices and train your team in a single session.',
  },
];

/* ── 7. For the Rest of Your Team ── */
const otherRoles = [
  {
    role: 'Business owners',
    title: 'Know where every rupee stands',
    lead: 'Cash, dues and the bills that need your sign-off, without waiting for month-end.',
    href: '/finance-desk/business-owners/',
    linkText: 'For business owners',
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

export function FinanceTeamsPage() {
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
              <p className={s.eyebrow}>For finance teams</p>

              <h1 id="hero-title" className={s.heroTitle}>
                Close the month faster.
                <br />
                <span>With every invoice checked.</span>
              </h1>

              <p className={s.heroSub}>
                Every supplier invoice in one queue. GST and duplicates checked automatically. Approved by your team and posted to TallyPrime with the bill attached. Your team reviews the exceptions, not every line.
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
                <span>Nothing is posted to TallyPrime until your team approves it.</span>
              </p>
            </div>

            {/* Live Mock Preview Card with 3D Depth Backdrop & Ghost Card */}
            <div className={s.heroVisualWrapper}>
              <div className={s.ambientGlow} aria-hidden="true" />
              <div className={s.ghostCardBehind} aria-hidden="true" />

              <div
                className={s.qcard}
                role="region"
                aria-label="Example month-end queue: 412 invoices, 386 ready to approve, 26 need a look"
              >
                <div className={s.qcardTop}>
                  <span>
                    <strong>Month-end queue</strong> · Nov 2026
                  </span>
                  <span className={`${s.statusBadge} ${s.wait}`}>26 exceptions</span>
                </div>
                <div className={s.qcardBody}>
                  <div className={s.deskStats}>
                    <div>
                      <span className={s.statVal}>412</span>
                      <span className={s.statLabel}>invoices this month</span>
                    </div>
                    <div>
                      <span className={s.statVal}>386</span>
                      <span className={s.statLabel}>ready to approve</span>
                    </div>
                    <div>
                      <span className={s.statVal}>26</span>
                      <span className={s.statLabel}>need a look</span>
                    </div>
                  </div>
                  <div className={s.qcardRows}>
                    <div className={s.qcardRow}>
                      <span className={s.rowWho}>Prime Components</span>
                      <span className={s.rowWhat}>INV-4821 · ₹74,045 · checks passed</span>
                      <span className={`${s.statusBadge} ${s.ok}`}>Ready</span>
                    </div>
                    <div className={s.qcardRow}>
                      <span className={s.rowWho}>Metro Supplies</span>
                      <span className={s.rowWhat}>INV-1068 · same as INV-1061?</span>
                      <span className={`${s.statusBadge} ${s.wait}`}>Duplicate?</span>
                    </div>
                    <div className={s.qcardRow}>
                      <span className={s.rowWho}>Apex Services</span>
                      <span className={s.rowWhat}>INV-0294 · GST ₹2,970, lines give ₹2,700</span>
                      <span className={`${s.statusBadge} ${s.wait}`}>GST mismatch</span>
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
      <section className={s.proofSection} aria-labelledby="finance-stats-title">
        <div className="site-shell">
          <h2 id="finance-stats-title" className={s.proofEyebrow}>
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
              Four things that make
              <br />
              <span>month-end late.</span>
            </h2>
            <p className={s.lead}>
              Docsynecx takes the checking and chasing off your team, so the books close on time.
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
              Control over volume,
              <br />
              <span>without adding people.</span>
            </h2>
          </div>

          <div className={s.handlesGrid}>
            {gainCards.map((card) => (
              <article key={card.title} className={s.handleCard}>
                <span className={s.handleTag}>{card.tag}</span>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                {card.linkHref && (
                  <Link href={card.linkHref} className={s.moreLink} style={{ marginTop: 12 }}>
                    <span>{card.linkText}</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                )}
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
              From a month of invoices
              <br />
              <span>to posted vouchers.</span>
            </h2>
            <p className={s.lead}>
              Four steps, with your team in control of every entry.
            </p>
          </div>

          <div className={s.howGrid} {...containerProps}>
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
                  {/* Desk stats in step 2 */}
                  {activeStep.deskStats && (
                    <div className={s.deskStats} style={{ marginBottom: 16 }}>
                      {activeStep.deskStats.map((st) => (
                        <div key={st.label}>
                          <span className={s.statVal}>{st.val}</span>
                          <span className={s.statLabel}>{st.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

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

                  {/* Table in Step 4 */}
                  {activeStep.table && (
                    <table className={s.dataTableDark} style={{ marginTop: 12 }}>
                      <thead>
                        <tr>
                          {activeStep.table.headers.map((h) => (
                            <th key={h}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {activeStep.table.rows.map((r, i) => (
                          <tr key={i}>
                            <td>{r[0]}</td>
                            <td>{r[1]}</td>
                            <td><strong>{r[2]}</strong></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                  {/* Files in Step 4 */}
                  {activeStep.files && (
                    <div className={s.fileListDark} style={{ marginTop: 12, marginBottom: 0 }}>
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
              <h2 id="cust-h">A logistics company: 2 hours of entry, now 2 minutes.</h2>
              <p>
                Hundreds of recurring supplier documents a month. Review and entry that took hours now takes minutes, and the team still checks every entry.
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

      {/* 7. FAQ */}
      <section id="faq" className={s.section} aria-labelledby="faq-h">
        <div className="site-shell">
          <div className={s.faqLayout}>
            <div className={s.faqHeading}>
              <div>
                <p className={s.faqEyebrow}>Finance questions</p>
                <h2 id="faq-h" className={s.faqTitle}>
                  What finance managers ask before rollout.
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

      {/* 8. FOR THE REST OF YOUR TEAM */}
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

      {/* 9. CLOSING CTA */}
      <FinanceClosingCta
        eyebrow="See it on your own month-end"
        title={
          <>
            Bring last month&apos;s invoices.
            <br />
            <span>We&apos;ll run them with you.</span>
          </>
        }
        copy="Share a batch of real supplier invoices. In the demo you'll see them read, checked and the exceptions sorted, ready to approve into TallyPrime."
        // steps={[
        //   'Book a 30-minute demo',
        //   'Share a batch of recent invoices',
        //   'See the exceptions your team would review',
        // ]}
        primaryHref="/demo/#demo-form"
        primaryText="Book a demo"
        secondaryHref="/finance-desk/"
        secondaryText="Explore Finance Desk"
      />
    </>
  );
}
