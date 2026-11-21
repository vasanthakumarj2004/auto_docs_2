'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clock,
  Inbox,
  Layers,
  MousePointerClick,
  RotateCcw,
  UploadCloud,
} from 'lucide-react';
import { useAutoCycle } from '@/src/hooks/useAutoCycle';
import { SharedFaqAccordion } from '../SharedFaqAccordion';
import { FinanceClosingCta } from './FinanceClosingCta';
import s from './InvoiceAutomationPage.module.css';

/* ── Step definitions with full panel data ── */
const howSteps = [
  {
    num: 1,
    title: 'Send it in',
    desc: 'Upload PDFs and scans in the portal, forward them by email, or send them on WhatsApp. Batches too.',
    panelBar: 'Step 1 of 4 · Inbox',
    panelStatus: '3 new',
    statusType: 'info',
    files: ['INV-4821.pdf', 'Fwd: Invoice 1068 (email)', 'scan_0294.jpg'],
    rows: [
      { who: 'Prime Components', what: 'Uploaded as PDF', status: 'Received', type: 'ok' },
      { who: 'Metro Supplies', what: 'Forwarded by email', status: 'Received', type: 'ok' },
      { who: 'Apex Services', what: 'Scanned paper bill', status: 'Received', type: 'ok' },
    ],
    foot: 'One inbox however the invoice arrives.',
  },
  {
    num: 2,
    title: 'It reads the invoice',
    desc: 'Supplier, GSTIN, invoice number, date, line items, HSN and tax, picked up in seconds.',
    panelBar: 'Step 2 of 4 · Prime Components · INV-4821',
    panelStatus: 'Read',
    statusType: 'ok',
    fields: [
      { label: 'Supplier', value: 'Prime Components' },
      { label: 'GSTIN', value: '33AABCP1234F1Z5' },
      { label: 'Invoice date', value: '12 Nov 2026' },
    ],
    table: {
      headers: ['Item · HSN', 'Qty × Rate', 'Taxable'],
      rows: [
        ['Ball bearings · 8482', '250 × ₹170', '₹42,500'],
        ['Rubber seals · 4016', '450 × ₹45', '₹20,250'],
        ['CGST 9% + SGST 9%', '', '₹11,295'],
      ],
    },
    total: { meta: 'Total · tax matches the lines', big: '₹74,045' },
    foot: 'Read in seconds, including every line item.',
  },
  {
    num: 3,
    title: 'Your team reviews it',
    desc: "Fields it isn't sure about are highlighted. Fix anything, then approve.",
    panelBar: 'Step 3 of 4 · Review',
    panelStatus: '2 need a look',
    statusType: 'wait',
    rows: [
      {
        who: 'Apex Services · GST',
        what: 'Lines on ₹15,000 at 18% give ₹2,700. Invoice says ₹2,970',
        status: 'Tax mismatch',
        type: 'wait',
      },
      {
        who: 'Apex Services · Invoice date',
        what: 'Faint on the scan. Read as 08 Nov 2026',
        status: 'Please check',
        type: 'wait',
      },
      {
        who: 'Metro Supplies · INV-1068',
        what: 'Same supplier, amount and date as INV-1061',
        status: 'Possible duplicate',
        type: 'wait',
      },
    ],
    // actions: ['Fix tax split', 'Confirm date', 'Merge or reject'],
    foot: 'You see why each one was flagged, before you approve.',
  },
  {
    num: 4,
    title: 'Posted to TallyPrime',
    desc: 'A purchase voucher in your Tally company, with the invoice PDF linked.',
    panelBar: 'Step 4 of 4 · TallyPrime',
    panelStatus: 'Voucher created',
    statusType: 'ok',
    table: {
      headers: ['Ledger', 'Dr / Cr', 'Amount'],
      rows: [
        ['Purchase @ 18%', 'Dr', '₹62,750'],
        ['Input CGST 9%', 'Dr', '₹5,647.50'],
        ['Input SGST 9%', 'Dr', '₹5,647.50'],
        ['Prime Components', 'Cr', '₹74,045'],
      ],
    },
    files: ['INV-4821.pdf linked to voucher'],
    foot: 'Purchase voucher in your Tally company, with the source invoice one click away.',
  },
];

/* ── FAQ items ── */
const faqItems = [
  {
    question: 'Does anything post to Tally without our approval?',
    answer:
      "No. Every invoice waits for someone on your team to review and approve it before it's posted to TallyPrime.",
  },
  {
    question: 'What if the scan is faint or the layout is unusual?',
    answer:
      "Fields it isn't sure about are highlighted, so your team knows exactly what to check. Nothing is guessed silently.",
  },
  {
    question: 'Does it check GST?',
    answer:
      "Yes. It works out CGST, SGST or IGST from the line items and compares them with what's on the invoice. Any difference is flagged for review.",
  },
  {
    question: 'How does it spot duplicates?',
    answer:
      'It compares each invoice with ones already received, by supplier, invoice number, amount and date, and flags anything that looks like a repeat.',
  },
  {
    question: 'How long does setup take?',
    answer:
      'Connect TallyPrime straight away and approve your first invoice in minutes. You test it on your own invoices before anything is posted.',
  },
  // {
  //   question: 'Does it work with our TallyPrime?',
  //   answer:
  //     'Yes. Approved invoices post to your TallyPrime company as purchase vouchers, with the source invoice PDF linked. We set up your ledgers and tax accounts with you during onboarding.',
  // },
  // {
  //   question: 'Can we start with just invoices and add banking later?',
  //   answer:
  //     "Yes, and most teams do. Start with invoice automation, then add banking reconciliation, payment reminders and reporting whenever you're ready.",
  // },
];

/* ── Proof stats matching modern tile strip ── */
const proofStats = [
  {
    title: 'Portal · email · WhatsApp',
    copy: 'Every invoice in one inbox',
    icon: Inbox,
  },
  {
    title: 'Bulk upload',
    copy: 'Send a month of invoices in one go',
    icon: Layers,
  },
  {
    title: 'Hours back every week',
    copy: 'Your team stops typing invoices into Tally',
    icon: Clock,
  },
  {
    title: 'One click to approve',
    copy: 'Your team checks, Docsynecx types',
    icon: MousePointerClick,
    highlight: true,
  },
];

export function InvoiceAutomationPage() {
  const [isApproved, setIsApproved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleApprove = () => {
    setIsApproved((prev) => !prev);
  };

  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };

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
              <p className={s.eyebrow}>
                Invoice Automation <span className={s.badge}>Most teams start here</span>
              </p>

              <h1 id="hero-title" className={s.heroTitle}>
                Stop typing supplier
                <br />
                invoices <span>into Tally.</span>
              </h1>

              <p className={s.heroSub}>
                Upload the invoice in the portal, email it, or send it on WhatsApp. Docsynecx reads
                the supplier, GSTIN, HSN, line items and tax, checks the GST and looks for
                duplicates. Your team reviews it and posts it to TallyPrime.
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

            {/* Live Mock Preview Card with 3D Depth Backdrop & Ghost Card matching Image 1 */}
            <div className={s.heroVisualWrapper}>
              <div className={s.ambientGlow} aria-hidden="true" />
              <div className={s.ghostCardBehind} aria-hidden="true" />

              <div
                className={s.qcard}
                role="region"
                aria-label="Example invoice inbox with three supplier invoices: one ready to approve, one possible duplicate, one GST mismatch"
              >
                <div className={s.qcardTop}>
                  <span>
                    <strong>Invoice inbox</strong> · Today
                  </span>
                  <span className={`${s.statusBadge} ${s.info}`}>
                    {isApproved ? 'All approved' : '3 to review'}
                  </span>
                </div>
                <div className={s.qcardBody}>
                  <div className={s.deskStats}>
                    <div>
                      <span className={s.statVal}>{isApproved ? '0' : '1'}</span>
                      <span className={s.statLabel}>ready to approve</span>
                    </div>
                    <div>
                      <span className={s.statVal}>1</span>
                      <span className={s.statLabel}>possible duplicate</span>
                    </div>
                    <div>
                      <span className={s.statVal}>1</span>
                      <span className={s.statLabel}>GST to check</span>
                    </div>
                  </div>
                  <div className={s.qcardRows}>
                    <div className={s.qcardRow}>
                      <span className={s.rowWho}>Prime Components</span>
                      <span className={s.rowWhat}>INV-4821 · PDF · ₹74,045</span>
                      <span className={`${s.statusBadge} ${s.ok}`}>Ready</span>
                    </div>
                    <div className={s.qcardRow}>
                      <span className={s.rowWho}>Metro Supplies</span>
                      <span className={s.rowWhat}>INV-1068 · Email · ₹32,450</span>
                      <span className={`${s.statusBadge} ${s.wait}`}>Duplicate?</span>
                    </div>
                    <div className={s.qcardRow}>
                      <span className={s.rowWho}>Apex Services</span>
                      <span className={s.rowWhat}>INV-0294 · Scan · ₹17,970</span>
                      <span className={`${s.statusBadge} ${s.wait}`}>GST mismatch</span>
                    </div>
                  </div>

                  {/* Interactive Action Row matching Image 1 */}
                  
                </div>
                <p className={s.sampleNote}>Sample data</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROOF STATS STRIP (MATCHING FinanceStatStrip in FinancePages) */}
      <section className={s.proofSection} aria-labelledby="invoice-stats-title">
        <div className="site-shell">
          <h2 id="invoice-stats-title" className={s.proofEyebrow}>
            Invoice Automation at a glance
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
            <p className={s.eyebrow}>Why invoices take so long</p>
            <h2 id="problem-h" className={s.headline}>
              Four jobs your accounts team
              <br />
              <span>does on every invoice.</span>
            </h2>
            <p className={s.lead}>
              Docsynecx does the first draft of each one, so your team only checks and approves.
            </p>
          </div>

          <div className={s.painGrid}>
            <article className={s.painCard}>
              <span className={s.painMono}>01 · Typing</span>
              <h3>Keying every invoice by hand</h3>
              <p className={s.painWas}>
                Supplier, invoice number, date and every line item, typed into Tally.
              </p>
              <p className={s.painFix}>
                <strong>Now:</strong> read from the invoice and filled in for you.
              </p>
            </article>

            <article className={s.painCard}>
              <span className={s.painMono}>02 · Formats</span>
              <h3>Every supplier&apos;s invoice looks different</h3>
              <p className={s.painWas}>
                Scanned paper, PDFs, Excel sheets and emails, each laid out its own way.
              </p>
              <p className={s.painFix}>
                <strong>Now:</strong> all of them go into one inbox and are read the same way.
              </p>
            </article>

            <article className={s.painCard}>
              <span className={s.painMono}>03 · GST</span>
              <h3>Checking tax splits line by line</h3>
              <p className={s.painWas}>
                CGST, SGST, IGST and HSN codes checked across long multi-item invoices.
              </p>
              <p className={s.painFix}>
                <strong>Now:</strong> tax worked out from the lines and compared with the invoice.
              </p>
            </article>

            <article className={s.painCard}>
              <span className={s.painMono}>04 · Duplicates</span>
              <h3>The same bill entered twice</h3>
              <p className={s.painWas}>
                A resent invoice slips into a batch and ends up paid twice.
              </p>
              <p className={s.painFix}>
                <strong>Now:</strong> possible duplicates flagged before they reach your books.
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
              Send. Read. Review.
              <br />
              <span>Post.</span>
            </h2>
            <p className={s.lead}>
              One supplier invoice, from your inbox to a purchase voucher in TallyPrime.
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
                    id={`step-tab-${step.num}`}
                    aria-selected={isActive}
                    aria-controls={`step-panel-${step.num}`}
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
                id={`step-panel-${activeStep.num}`}
                role="tabpanel"
                aria-labelledby={`step-tab-${activeStep.num}`}
                className={s.stepPanelDark}
              >
                <div className={s.panelBarDark}>
                  <span>{activeStep.panelBar}</span>
                  <span className={`${s.statusBadge} ${s[activeStep.statusType]}`}>
                    {activeStep.panelStatus}
                  </span>
                </div>

                <div className={s.panelBodyDark}>
                  {activeStep.files && (
                    <div className={s.fileListDark}>
                      {activeStep.files.map((file, i) => (
                        <span key={i} className={s.fileChipDark}>
                          {file}
                        </span>
                      ))}
                    </div>
                  )}

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

                  {activeStep.rows && (
                    <div className={s.qcardRowsDark}>
                      {activeStep.rows.map((row, i) => (
                        <div key={i} className={s.qcardRowDark}>
                          <span className={s.rowWhoDark}>{row.who}</span>
                          <span className={s.rowWhatDark}>{row.what}</span>
                          <span className={`${s.statusBadge} ${s[row.type]}`}>{row.status}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeStep.table && (
                    <table className={s.dataTableDark}>
                      <thead>
                        <tr>
                          {activeStep.table.headers.map((th, i) => (
                            <th key={i}>{th}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {activeStep.table.rows.map((tr, i) => (
                          <tr key={i}>
                            {tr.map((td, j) => (
                              <td key={j}>{td}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
              Everything on the invoice,
              <br />
              <span>and the checks your team does today.</span>
            </h2>
          </div>

          <div className={s.handlesGrid}>
            <article className={s.handleCard}>
              <span className={s.handleTag}>Intake</span>
              <h3>Portal, email and WhatsApp</h3>
              <p>
                Upload PDFs and scans in the portal, one at a time or in a batch, or send them by
                email or WhatsApp.
              </p>
            </article>

            <article className={s.handleCard}>
              <span className={s.handleTag}>Header</span>
              <h3>Supplier, number, date and totals</h3>
              <p>The key details on every invoice, picked up without typing.</p>
            </article>

            <article className={s.handleCard}>
              <span className={s.handleTag}>Tax</span>
              <h3>GSTIN, HSN, CGST, SGST and IGST</h3>
              <p>Tax details read from the invoice and checked against the line items.</p>
            </article>

            <article className={s.handleCard}>
              <span className={s.handleTag}>Lines</span>
              <h3>Every line item</h3>
              <p>Descriptions, quantities, rates, taxable values and tax for each line.</p>
            </article>

            <article className={s.handleCard}>
              <span className={s.handleTag}>Notes</span>
              <h3>Credit and debit notes</h3>
              <p>Handled in the same inbox as supplier invoices.</p>
            </article>

            <article className={s.handleCard}>
              <span className={s.handleTag}>Checks</span>
              <h3>Unsure fields and duplicates</h3>
              <p>
                Anything it isn&apos;t confident about is highlighted, and possible duplicates are
                flagged.
              </p>
            </article>

            <article className={s.handleCard}>
              <span className={s.handleTag}>Review</span>
              <h3>Your team approves</h3>
              <p>Fix anything, then approve. You decide who can approve what.</p>
            </article>

            <article className={s.handleCard}>
              <span className={s.handleTag}>Batches</span>
              <h3>Month-end in one go</h3>
              <p>Work through a pile of invoices together instead of one at a time.</p>
            </article>

            <article className={s.handleCard}>
              <span className={s.handleTag}>TallyPrime</span>
              <h3>Posted as a purchase voucher</h3>
              <p>Approved invoices go to your TallyPrime company, with the PDF linked.</p>
            </article>
          </div>
        </div>
      </section>

      {/* 6. THE REST OF THE FINANCE DESK */}
      <section className={`${s.section} ${s.moreSectionDark}`} aria-labelledby="more-h">
        <div className="site-shell">
          <div className={s.secHead}>
            <p className={s.eyebrow}>Add when you&apos;re ready</p>
            <h2 id="more-h" className={s.headline}>
              The rest of the
              <br />
              <span>Finance Desk.</span>
            </h2>
          </div>

          <div className={s.moreGrid}>
            <article className={s.moreCard}>
              <span className={s.moreTag}>Banking</span>
              <h3>Banking &amp; Reconciliation</h3>
              <p className={s.moreLead}>
                Bank statements into Tally, matched and ready to review.
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
            <SharedFaqAccordion
              items={faqItems}
              defaultOpenIndex={0}
              toggleStyle="plus"
            />
          </div>
        </div>
      </section>

      {/* 8. CLOSING CTA (Card view matching uploaded design) */}
      <FinanceClosingCta secondaryHref="/finance-desk/" secondaryText="Back to Finance Desk" />
    </>
  );
}
