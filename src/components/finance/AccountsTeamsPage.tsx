'use client';

import React from 'react';
import Link from 'next/link';
import {
  AlertCircle,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  FileText,
  ShieldCheck,
} from 'lucide-react';
import { useAutoCycle } from '@/src/hooks/useAutoCycle';
import { SharedFaqAccordion } from '../SharedFaqAccordion';
import { FinanceClosingCta } from './FinanceClosingCta';
import s from './InvoiceAutomationPage.module.css';

/* ── 1. Proof Stats Strip (Key Facts) ── */
const proofStats = [
  {
    title: 'Every line item',
    copy: 'Item, HSN, qty, rate and tax',
    icon: FileText,
  },
  {
    title: 'Unsure fields flagged',
    copy: 'You check what matters first',
    icon: AlertCircle,
  },
  {
    title: 'Duplicates caught',
    copy: 'Before the bill goes in twice',
    icon: ShieldCheck,
  },
  {
    title: 'One click to post',
    copy: 'Purchase voucher, bill attached',
    icon: CheckCircle2,
    highlight: true,
  },
];

/* ── 2. Four Pain Points (Sound familiar?) ── */
const painPoints = [
  {
    num: '01 · Typing',
    title: 'Retyping every bill',
    was: 'Supplier, date, bill number, item codes, quantities and rates, typed from a PDF on the other screen.',
    fix: 'read for you, line by line.',
  },
  {
    num: '02 · Layouts',
    title: 'Messy, rotated, two-page bills',
    was: "Every supplier's bill looks different, and some are scans of handwritten copies.",
    fix: 'all read the same way. Anything unclear is highlighted.',
  },
  {
    num: '03 · Tax maths',
    title: 'CGST, SGST or IGST?',
    was: 'Checking splits and HSN codes across a twelve-line bill, with a calculator.',
    fix: 'tax worked out from the lines and checked against the total.',
  },
  {
    num: '04 · Duplicates',
    title: 'The bill you already entered',
    was: 'It came by email last week, and now on paper. Then come the reversal entries.',
    fix: 'flagged before you post it.',
  },
];

/* ── 3. What You Get (Gain Cards) ── */
const gainCards = [
  {
    tag: 'Line items',
    title: 'Every line, even on long bills',
    desc: 'Descriptions, HSN, quantities, rates, discounts and tax, across multi-page tables.',
  },
  {
    tag: 'Ledgers',
    title: 'Ledgers suggested for you',
    desc: 'Supplier, purchase and tax ledgers suggested from your past entries. You confirm.',
  },
  {
    tag: 'Unsure fields',
    title: 'Highlighted for you',
    desc: 'Anything unclear on the bill is flagged, so you check it first.',
  },
  {
    tag: 'Duplicates',
    title: 'No bill entered twice',
    desc: 'Checked by supplier GSTIN, bill number, date and amount.',
  },
  {
    tag: 'Totals',
    title: 'Tax and round-off checked',
    desc: "Taxable value plus tax compared with the bill's grand total.",
  },
  {
    tag: 'Batches',
    title: 'Clear a pile in one sitting',
    desc: 'Upload dozens of bills at once and work through them in order.',
  },
];

/* ── 4. Interactive Steps ── */
const howSteps = [
  {
    num: 1,
    title: 'Upload the bills',
    desc: 'One bill or a batch. PDF, scan, email or WhatsApp. No renaming or sorting.',
    panelBar: "Step 1 of 4 · Today's bills",
    panelStatus: '24 uploaded',
    statusType: 'info' as const,
    fileChips: ['bharat_INV-7312.pdf', 'scan_0294.jpg', '+ 22 more'],
    rows: [
      { who: 'Bharat Fasteners · INV-7312', what: 'PDF · 3 lines', status: 'Read', type: 'ok' as const },
      { who: 'Apex Services · INV-0294', what: 'Scanned copy · 2 lines', status: '1 field unclear', type: 'wait' as const },
    ],
    foot: 'Drop them in and start checking, no sorting first.',
  },
  {
    num: 2,
    title: 'Check the details',
    desc: 'Supplier, GSTIN, date, lines and totals, against the bill.',
    panelBar: 'Step 2 of 4 · Bharat Fasteners · INV-7312',
    panelStatus: 'Totals match',
    statusType: 'ok' as const,
    fields: [
      { label: 'Supplier GSTIN', value: '33AAFCB4521K1Z2' },
      { label: 'Bill date', value: '14 Nov 2026' },
      { label: 'Place of supply', value: 'Tamil Nadu' },
    ],
    table: {
      headers: ['Item · HSN', 'Qty × Rate', 'Taxable'],
      rows: [
        ['Flange bolt M12 · 7318', '500 × ₹42.00', '₹21,000'],
        ['Hex nut M12 · 7318', '500 × ₹18.50', '₹9,250'],
        ['Spring washer SS · 7318', '1,000 × ₹4.20', '₹4,200'],
        ['CGST 9% + SGST 9%', '', '₹6,201'],
      ],
    },
    total: { meta: '₹34,450 taxable plus ₹6,201 GST is', big: '₹40,651' },
    foot: '₹34,450 taxable plus ₹6,201 GST is ₹40,651, same as the bill.',
  },
  {
    num: 3,
    title: 'Confirm the ledgers',
    desc: "Suggested from how you've booked this supplier before.",
    panelBar: 'Step 3 of 4 · Ledgers',
    panelStatus: 'Suggested',
    statusType: 'info' as const,
    rows: [
      { who: 'Supplier', what: 'Bharat Fasteners (Sundry Creditors)', status: 'Same as last time', type: 'ok' as const },
      { who: 'Purchase', what: 'Purchase @ 18% · Fasteners', status: 'Same as last time', type: 'ok' as const },
      { who: 'Tax', what: 'Input CGST 9% · Input SGST 9%', status: 'From place of supply', type: 'info' as const },
    ],
    foot: 'Change any ledger before you post. You always have the last word.',
  },
  {
    num: 4,
    title: 'Post to Tally Prime',
    desc: 'One click. A purchase voucher with the bill attached.',
    panelBar: 'Step 4 of 4 · Tally Prime',
    panelStatus: 'PUR-829 posted',
    statusType: 'ok' as const,
    table: {
      headers: ['Ledger', 'Dr / Cr', 'Amount'],
      rows: [
        ['Purchase @ 18% · Fasteners', 'Dr', '₹34,450'],
        ['Input CGST 9%', 'Dr', '₹3,100.50'],
        ['Input SGST 9%', 'Dr', '₹3,100.50'],
        ['Bharat Fasteners', 'Cr', '₹40,651'],
      ],
    },
    files: ['INV-7312.pdf attached'],
    foot: 'A real purchase voucher in your Tally company, ready for GST returns.',
  },
];

/* ── 5. Customer Story Facts ── */
const storyFacts = [
  { bold: 'Every day', desc: 'purchase bills and asset documents' },
  { bold: 'Minutes, not hours', desc: 'to check and post' },
  { bold: 'No retyping', desc: 'the team only reviews' },
];

/* ── 6. Accounts FAQs ── */
const faqItems = [
  {
    question: 'Does it create real vouchers in Tally Prime?',
    answer:
      'Yes. Purchase vouchers in your Tally company, using your own ledger names, with the bill attached.',
  },
  {
    question: 'What if a bill has 50 line items?',
    answer:
      'Every line is read, including tables that run over several pages. You check them in one list.',
  },
  {
    question: 'What if it isn\'t sure about a field?',
    answer:
      'The field is highlighted so you check it first. Nothing is guessed silently, and nothing posts until you approve.',
  },
  {
    question: 'Do we need technical skills?',
    answer:
      'No. If you can use Tally, you can use Docsynecx. We train your team in a single session.',
  },
  {
    question: 'How long does it take to get started?',
    answer:
      'The first-time setup with Tally Prime takes minutes. Then we test it with your own bills.',
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
    role: 'Finance teams',
    title: 'Close the month faster',
    lead: 'Every invoice in one queue, approval rules, and the exceptions first.',
    href: '/finance-desk/finance-teams/',
    linkText: 'For finance teams',
  },
  {
    role: 'CA firms',
    title: "Every client's bills, one workspace",
    lead: 'Client bills read, GST checked and posted across all your client companies.',
    href: '/finance-desk/ca-firms/',
    linkText: 'For CA firms',
  },
];

export function AccountsTeamsPage() {
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
                <span>For accounts teams</span>
              </nav>

              <p className={s.eyebrow}>For accounts teams</p>

              <h1 id="hero-title" className={s.heroTitle}>
                Stop retyping bills.
                <br />
                <span>Check them and post to Tally.</span>
              </h1>

              <p className={s.heroSub}>
                Docsynecx reads every line of the bill, item, HSN, quantity, rate and tax, suggests the right ledgers and drafts the voucher. You check it against the bill and post it to Tally Prime in one click.
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
                  <span>See your new routine</span>
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
                <span>You review every bill. Nothing is posted to Tally until you approve it.</span>
              </p>
            </div>

            {/* Live Mock Preview Card with 3D Depth Backdrop & Ghost Card */}
            <div className={s.heroVisualWrapper}>
              <div className={s.ambientGlow} aria-hidden="true" />
              <div className={s.ghostCardBehind} aria-hidden="true" />

              <div
                className={s.qcard}
                role="region"
                aria-label="Example bill: Bharat Fasteners INV-7312 with 3 items totaling 40,651"
              >
                <div className={s.qcardTop}>
                  <span>
                    <strong>Bharat Fasteners</strong> · INV-7312
                  </span>
                  <span className={`${s.statusBadge} ${s.ok}`}>Ready to post</span>
                </div>
                <div className={s.qcardBody}>
                  <div className={s.qcardRows}>
                    <div className={s.qcardRow}>
                      <span className={s.rowWho}>Flange bolt M12</span>
                      <span className={s.rowWhat}>500 × ₹42.00 · HSN 7318 · 18%</span>
                      <span className={`${s.statusBadge} ${s.ok}`}>Read</span>
                    </div>
                    <div className={s.qcardRow}>
                      <span className={s.rowWho}>Hex nut M12</span>
                      <span className={s.rowWhat}>500 × ₹18.50 · HSN 7318 · 18%</span>
                      <span className={`${s.statusBadge} ${s.ok}`}>Read</span>
                    </div>
                    <div className={s.qcardRow}>
                      <span className={s.rowWho}>Spring washer SS</span>
                      <span className={s.rowWhat}>1,000 × ₹4.20 · HSN 7318 · 18%</span>
                      <span className={`${s.statusBadge} ${s.ok}`}>Read</span>
                    </div>
                  </div>

                  <div className={s.qtotalDark} style={{ margin: '14px 20px 14px' }}>
                    <span className={s.totalMetaDark}>Total · tax and round-off check out</span>
                    <span className={s.totalBigDark}>₹40,651</span>
                  </div>

                  
                </div>
                <p className={s.sampleNote}>Sample data</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROOF STATS STRIP */}
      <section className={s.proofSection} aria-labelledby="accounts-stats-title">
        <div className="site-shell">
          <h2 id="accounts-stats-title" className={s.proofEyebrow}>
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
              Four things that fill an
              <br />
              <span>accounts executive&apos;s day.</span>
            </h2>
            <p className={s.lead}>
              Docsynecx does the typing and the maths. You do the checking.
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
              Check bills,
              <br />
              <span>don&apos;t type them.</span>
            </h2>
          </div>

          <div className={s.handlesGrid}>
            {gainCards.map((card) => (
              <article key={card.title} className={s.handleCard}>
                <span className={s.handleTag}>{card.tag}</span>
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
            <p className={s.eyebrow}>Your new routine</p>
            <h2 id="how-h" className={s.headline}>
              Upload. Check.
              <br />
              <span>Confirm. Post.</span>
            </h2>
            <p className={s.lead}>
              One supplier bill, from a PDF to a purchase voucher in Tally Prime.
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
                  {/* File Chips in Step 1 */}
                  {activeStep.fileChips && (
                    <div className={s.fileListDark} style={{ marginBottom: 14 }}>
                      {activeStep.fileChips.map((fc) => (
                        <span key={fc} className={s.fileChipDark}>
                          {fc}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Fields in Step 2 */}
                  {activeStep.fields && (
                    <div className={s.fieldsGridDark}>
                      {activeStep.fields.map((f) => (
                        <div key={f.label} className={s.fieldItemDark}>
                          <span className={s.fieldLabelDark}>{f.label}</span>
                          <span className={s.fieldValueDark}>{f.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Rows in Step 1 & 3 */}
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

                  {/* Table in Step 2 & 4 */}
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

                  {/* Total in Step 2 */}
                  {activeStep.total && (
                    <div className={s.qtotalDark} style={{ marginTop: 12 }}>
                      <span className={s.totalMetaDark}>{activeStep.total.meta}</span>
                      <span className={s.totalBigDark}>{activeStep.total.big}</span>
                    </div>
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
              <h2 id="cust-h">A busy operations team: purchase bills in minutes, not hours.</h2>
              <p>
                Purchase bills and asset documents come in every day. The team now checks and posts them in minutes, instead of spending hours retyping.
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
                <p className={s.faqEyebrow}>Accounts questions</p>
                <h2 id="faq-h" className={s.faqTitle}>
                  What accounts teams ask about daily use.
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
        eyebrow="See it on your own bills"
        title={
          <>
            Bring your messiest bill.
            <br />
            <span>We&apos;ll post it with you.</span>
          </>
        }
        copy="Two pages, rotated, handwritten, fifty lines. In the demo you'll see it read, checked and ready to post to Tally Prime."
        // steps={[
        //   'Book a 30-minute demo',
        //   'Bring a few bills you hate typing',
        //   'See them ready to post in Tally',
        // ]}
        primaryHref="/demo/#demo-form"
        primaryText="Book a demo"
        secondaryHref="/finance-desk/"
        secondaryText="Explore Finance Desk"
      />
    </>
  );
}
