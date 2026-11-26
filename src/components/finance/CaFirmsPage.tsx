"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  CheckCircle2,
  ShieldCheck,
  UploadCloud,
} from "lucide-react";
import { useAutoCycle } from "@/src/hooks/useAutoCycle";
import { SharedFaqAccordion } from "../SharedFaqAccordion";
import { FinanceClosingCta } from "./FinanceClosingCta";
import s from "./InvoiceAutomationPage.module.css";

/* ── 1. Proof Stats Strip (Key Facts) ── */
const proofStats = [
  {
    title: 'Every client, one workspace',
    copy: 'Each with its own Tally company',
    icon: Building2,
  },
  {
    title: 'Clients send it in',
    copy: 'Email, WhatsApp or upload',
    icon: UploadCloud,
  },
  {
    title: 'GST checked',
    copy: 'GSTIN, HSN and tax splits',
    icon: ShieldCheck,
  },
  {
    title: 'Articles review, not type',
    copy: 'Approve in batches',
    icon: CheckCircle2,
    highlight: true,
  },
];

/* ── 2. Four Pain Points (Sound familiar?) ── */
const painPoints = [
  {
    num: "01 · Late batches",
    title: "Bills arrive in a heap, at the deadline",
    was: "Paper receipts, WhatsApp photos and PDF dumps, days before filing.",
    fix: "clients send as they go, sorted by client automatically.",
  },
  {
    num: "02 · Entry",
    title: "Articles stuck typing vouchers",
    was: "Trainees punch bills into Tally instead of learning to audit.",
    fix: "they check drafts and approve in batches.",
  },
  {
    num: "03 · GST",
    title: "Tax errors found at filing time",
    was: "Wrong splits and GSTINs show up when the return is due.",
    fix: "GSTIN, HSN and tax checked on every bill.",
  },
  {
    num: "04 · Audits",
    title: '"Where\'s the original bill?"',
    was: "Hours lost hunting a source document when a client gets a query.",
    fix: "the bill is linked to its voucher, one click away.",
  },
];

/* ── 3. What You Get (Gain Cards) ── */
const gainCards = [
  {
    tag: "Clients",
    title: "One workspace, many companies",
    desc: "Switch between clients. Each keeps its own Tally company, ledgers and voucher types.",
  },
  {
    tag: "Intake",
    title: "Clients send it straight in",
    desc: "By email, WhatsApp or upload. No chasing, no couriered bags of paper.",
  },
  {
    tag: "GST checks",
    title: "GSTIN, HSN and tax splits",
    desc: "CGST, SGST and IGST worked out from the lines and compared with each bill.",
  },
  {
    tag: "Vouchers",
    title: "Drafted in the client's Tally",
    desc: "Ledgers suggested from that client's past entries. Your team confirms.",
  },
  {
    tag: "Banking",
    title: "Client bank statements too",
    desc: "Categorised, matched to the books and pushed to Tally.",
    linkHref: "/finance-desk/banking-reconciliation/",
    linkText: "See Banking →",
  },
  {
    tag: "Audit trail",
    title: "Every voucher has its source",
    desc: "The original bill linked to its voucher, with who approved it and when.",
  },
];

/* ── 4. Interactive Steps ── */
const howSteps = [
  {
    num: 1,
    title: "Clients send bills",
    desc: "Bills and bank statements by email, WhatsApp or upload, sorted by client.",
    panelBar: "Step 1 of 4 · Incoming",
    panelStatus: "98 bills",
    statusType: "info" as const,
    rows: [
      {
        who: "Apex Engineering Pvt Ltd",
        what: "48 bills · email",
        status: "Received",
        type: "ok" as const,
      },
      {
        who: "Kovai Textiles",
        what: "32 bills · upload",
        status: "Received",
        type: "ok" as const,
      },
      {
        who: "Sri Lakshmi Traders",
        what: "18 bills · WhatsApp",
        status: "Received",
        type: "ok" as const,
      },
    ],
    foot: "Sorted by client as they arrive, without a call to your office.",
  },
  {
    num: 2,
    title: "Read and checked",
    desc: "Lines, HSN, GST and duplicates, with inter- or intra-state tax worked out.",
    panelBar: "Step 2 of 4 · Checks",
    panelStatus: "9 flags",
    statusType: "wait" as const,
    rows: [
      { who: 'Kovai Textiles · INV-2231', what: 'Out-of-state supplier, but CGST + SGST charged', status: 'Should be IGST', type: 'wait' as const },
      { who: 'Sri Lakshmi Traders · photo', what: 'Bill number faint on the photo', status: 'Please check', type: 'wait' as const },
      { who: 'Kovai Textiles · INV-2240', what: 'Same supplier, amount and date as INV-2236', status: 'Duplicate?', type: 'wait' as const },
    ],
    foot: "Problems caught before filing, not after.",
  },
  {
    num: 3,
    title: 'Articles review',
    desc: 'Suggested ledgers and flags checked in batches, client by client.',
    panelBar: 'Step 3 of 4 · Review · Apex Engineering',
    panelStatus: '48 of 48',
    statusType: 'ok' as const,
    rows: [
      { who: '46 bills', what: 'Ledgers as suggested · approved as a batch', status: 'Approved', type: 'ok' as const },
      { who: '2 bills', what: 'New supplier · ledger chosen by your article', status: 'Approved', type: 'ok' as const },
    ],
    foot: "A client's month reviewed in one sitting, not typed over three days.",
  },
  {
    num: 4,
    title: "Posted to each client's Tally",
    desc: "Vouchers in the right company, with the bill attached.",
    panelBar: "Step 4 of 4 · Client Tally companies",
    panelStatus: "Posted",
    statusType: "ok" as const,
    rows: [
      {
        who: "Apex Engineering Pvt Ltd",
        what: "48 purchase vouchers · bills attached",
        status: "Posted",
        type: "ok" as const,
      },
      {
        who: "Kovai Textiles",
        what: "27 posted · 5 being checked",
        status: "In progress",
        type: "wait" as const,
      },
      {
        who: "Sri Lakshmi Traders",
        what: "14 posted · 4 to check",
        status: "In progress",
        type: "wait" as const,
      },
    ],
    foot: "Each voucher in the right client's books, ready for returns and audits.",
  },
];

/* ── 5. CA FAQs ── */
const faqItems = [
  {
    question: "Can we manage many client Tally companies from one account?",
    answer:
      "Yes. Each client has its own profile, with its own Tally company, ledgers and voucher types.",
  },
  {
    question: "How do clients send us documents?",
    answer:
      "By email, WhatsApp or upload. Bills land in your firm's queue, already sorted by client.",
  },
  {
    question: "Is client data kept separate?",
    answer:
      "Yes. Each client's documents and books sit in their own profile. We'll take you through security and access in the demo.",
  },
  {
    question: "Does anything post without our review?",
    answer:
      "No. Your team approves every entry before it goes into a client's Tally.",
  },
  {
    question: "How long does it take to get started?",
    answer:
      "The first-time setup with TallyPrime takes minutes. Then add clients one by one, starting with your busiest.",
  },
];

/* ── 6. For Your Clients' Teams ── */
const otherRoles = [
  {
    role: "Business owners",
    title: "Know where every rupee stands",
    lead: "Cash, dues and the bills that need sign-off, without waiting for month-end.",
    href: "/finance-desk/business-owners/",
    linkText: "For business owners",
  },
  {
    role: "Finance teams",
    title: "Close the month faster",
    lead: "Every invoice in one queue, approval rules, and the exceptions first.",
    href: "/finance-desk/finance-teams/",
    linkText: "For finance teams",
  },
  {
    role: "Accounts teams",
    title: "Stop retyping bills",
    lead: "Bills read, ledgers suggested and vouchers drafted. Check and post in one click.",
    href: "/finance-desk/accounts-teams/",
    linkText: "For accounts teams",
  },
];

export function CaFirmsPage() {
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
              <p className={s.eyebrow}>For CA firms</p>

              <h1 id="hero-title" className={s.heroTitle}>
                Every client&apos;s bills, in one place.
                <br />
                <span>Posted to the right Tally company.</span>
              </h1>

              <p className={s.heroSub}>
                Clients send bills and bank statements by email, WhatsApp or
                upload. Docsynecx reads them, checks GST and duplicates, and
                drafts vouchers in each client&apos;s own Tally company. Your
                articles review and approve, instead of typing.
              </p>

              <div className={s.heroActions}>
                <Link href="/demo-form" className={s.primaryBtn}>
                  <span>Book a demo</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  href="#how"
                  className={s.secondaryBtn}
                  onClick={(e) => {
                    const target = document.getElementById("how");
                    if (target) {
                      e.preventDefault();
                      target.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                      window.history.pushState(null, "", "#how");
                    }
                  }}
                >
                  <span>See how it works</span>
                  <ArrowDown size={16} aria-hidden="true" />
                </Link>
              </div>

              <p className={s.promise}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <circle
                    cx="10"
                    cy="10"
                    r="9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M6 10.5l2.5 2.5L14 7.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>
                  Nothing is posted to a client&apos;s books until your team
                  approves it.
                </span>
              </p>
            </div>

            {/* Live Mock Preview Card with 3D Depth Backdrop & Ghost Card */}
            <div className={s.heroVisualWrapper}>
              <div className={s.ambientGlow} aria-hidden="true" />
              <div className={s.ghostCardBehind} aria-hidden="true" />

              <div
                className={s.qcard}
                role="region"
                aria-label="Example your clients view: 12 companies, 98 bills received, 89 ready to approve, 9 need a look"
              >
                <div className={s.qcardTop}>
                  <span>
                    <strong>Your clients</strong> · This week
                  </span>
                  <span className={`${s.statusBadge} ${s.info}`}>
                    12 companies
                  </span>
                </div>
                <div className={s.qcardBody}>
                  <div className={s.deskStats}>
                    <div>
                      <span className={s.statVal}>98</span>
                      <span className={s.statLabel}>bills received</span>
                    </div>
                    <div>
                      <span className={s.statVal}>89</span>
                      <span className={s.statLabel}>ready to approve</span>
                    </div>
                    <div>
                      <span className={s.statVal}>9</span>
                      <span className={s.statLabel}>need a look</span>
                    </div>
                  </div>
                  <div className={s.qcardRows}>
                    <div className={s.qcardRow}>
                      <span className={s.rowWho}>Apex Engineering Pvt Ltd</span>
                      <span className={s.rowWhat}>48 bills · by email</span>
                      <span className={`${s.statusBadge} ${s.ok}`}>Read</span>
                    </div>
                    <div className={s.qcardRow}>
                      <span className={s.rowWho}>Kovai Textiles</span>
                      <span className={s.rowWhat}>32 bills · uploaded</span>
                      <span className={`${s.statusBadge} ${s.wait}`}>
                        5 to check
                      </span>
                    </div>
                    <div className={s.qcardRow}>
                      <span className={s.rowWho}>Sri Lakshmi Traders</span>
                      <span className={s.rowWhat}>
                        18 bills · WhatsApp photos
                      </span>
                      <span className={`${s.statusBadge} ${s.wait}`}>
                        4 to check
                      </span>
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
      <section className={s.proofSection} aria-labelledby="ca-stats-title">
        <div className="site-shell">
          <h2 id="ca-stats-title" className={s.proofEyebrow}>
            Key facts
          </h2>
          <div className={s.proofGrid4}>
            {proofStats.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`${s.outcomeCard} ${item.highlight ? s.highlightOutcome : ""}`}
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
      <section
        className={`${s.section} ${s.altSection}`}
        aria-labelledby="problem-h"
      >
        <div className="site-shell">
          <div className={s.secHead}>
            <p className={s.eyebrow}>Sound familiar?</p>
            <h2 id="problem-h" className={s.headline}>
              Four things that eat into
              <br />
              <span>every filing season.</span>
            </h2>
            <p className={s.lead}>
              Docsynecx takes the collecting and typing off your team, so they
              can review, reconcile and advise.
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
              More clients,
              <br />
              <span>without more typing.</span>
            </h2>
          </div>

          <div className={s.handlesGrid}>
            {gainCards.map((card) => (
              <article key={card.title} className={s.handleCard}>
                <span className={s.handleTag}>{card.tag}</span>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                {card.linkHref && (
                  <Link
                    href={card.linkHref}
                    className={s.moreLink}
                    style={{ marginTop: 12 }}
                  >
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
      <section
        id="how"
        className={`${s.section} ${s.howSectionDark}`}
        aria-labelledby="how-h"
      >
        <div className="site-shell">
          <div className={s.secHead}>
            <p className={s.eyebrow}>How it works</p>
            <h2 id="how-h" className={s.headline}>
              From a client&apos;s pile of bills
              <br />
              <span>to posted vouchers.</span>
            </h2>
            <p className={s.lead}>
              Four steps, with your team approving every entry.
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
                    className={`${s.stepButtonDark} ${active === idx ? s.stepButtonDarkActive : ""}`}
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
                  <span
                    className={`${s.statusBadge} ${s[activeStep.statusType] || s.info}`}
                  >
                    {activeStep.panelStatus}
                  </span>
                </div>

                <div className={s.panelBodyDark}>
                  {activeStep.rows && (
                    <div className={s.qcardRowsDark}>
                      {activeStep.rows.map((row) => (
                        <div key={row.who} className={s.qcardRowDark}>
                          <span className={s.rowWhoDark}>{row.who}</span>
                          <span className={s.rowWhatDark}>{row.what}</span>
                          <span
                            className={`${s.statusBadge} ${s[row.type] || s.ok}`}
                          >
                            {row.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <p className={s.panelFootDark}>
                  <strong>{activeStep.foot.split(",")[0]},</strong>
                  {activeStep.foot.includes(",")
                    ? activeStep.foot.substring(
                        activeStep.foot.indexOf(",") + 1,
                      )
                    : ""}
                </p>
              </div>

              <p className={s.howNoteDark}>
                Sample data · Example product view
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section id="faq" className={s.section} aria-labelledby="faq-h">
        <div className="site-shell">
          <div className={s.faqLayout}>
            <div className={s.faqHeading}>
              <div>
                <p className={s.faqEyebrow}>CA practice questions</p>
                <h2 id="faq-h" className={s.faqTitle}>
                  What CA firms ask us first.
                </h2>
                <p className={s.faqDescription}>
                  Something else on your mind?{" "}
                  <Link href="/demo-form">Ask us in the demo.</Link>
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

      {/* 7. FOR YOUR CLIENTS' TEAMS */}
      <section
        className={`${s.section} ${s.moreSectionDark}`}
        aria-labelledby="roles-h"
      >
        <div className="site-shell">
          <div className={s.secHead}>
            <p className={s.eyebrow}>For your clients&apos; teams</p>
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

      {/* 8. CLOSING CTA */}
      <FinanceClosingCta
        eyebrow="See it on a real client"
        title={
          <>
            Bring one client&apos;s messy month.
            <br />
            <span>We&apos;ll run it with you.</span>
          </>
        }
        copy="Pick the client whose bills you dread. In the demo you'll see them read, checked and ready to post to their Tally company."
        // steps={[
        //   'Book a 30-minute demo',
        //   "Bring one client's bills for a month",
        //   'See them checked and ready to post',
        // ]}
        primaryHref="/demo-form"
        primaryText="Book a demo"
        secondaryHref="/finance-desk/"
        secondaryText="Explore Finance Desk"
      />
    </>
  );
}
