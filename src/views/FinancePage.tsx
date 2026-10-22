'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Building2, Check, CheckCheck, ChevronDown, CircleCheck, Copy, FileCheck2, FileText, History, Inbox, Layers, LockKeyhole, ShieldCheck, Users, Workflow } from 'lucide-react';
import { FinanceWorkbench } from '../components/finance/FinanceWorkbench';
import s from '../components/finance/FinanceDesk.module.css';

export const BANK_PARTNERS_LABEL = 'via your bank';

const faqs = [
  { question: 'Do we have to replace Tally or change our accounting process?', answer: 'No. Finance Desk is designed to work alongside your accounting system. Bills are captured and reviewed before being mapped to your ledgers and posted into TallyPrime. Your team keeps control of checks and approvals.' },
  { question: 'Can we start with invoice automation and add payments later?', answer: 'Yes. Start with bill capture, validation, duplicate review and ledger posting. Discuss approval and payment workflows separately, based on your bank and integration requirements.' },
  { question: 'What happens when a bill fails a check?', answer: 'The bill stays in a review workflow with the exception visible. Your accounts team can inspect the source document and the relevant fields before deciding how to proceed.' },
  { question: 'Which banks can I pay vendors through?', answer: 'Banking partner and payment integration details will be confirmed before general availability. Book a walkthrough to discuss your bank, authorization process and rollout requirements.' },
  { question: 'Can an approver review a bill from a phone?', answer: 'The approval workflow supports reviewing invoice details, tax breakdowns and vendor information through mobile links. Your team can discuss access controls and approval rules during the walkthrough.' },
];

const capabilities = [
  { icon: FileCheck2, title: 'Line items, not just totals.', copy: 'Capture item descriptions, HSN codes, quantities and tax splits for a useful first review.', label: 'EXTRACTION' },
  { icon: ShieldCheck, title: 'Checks before commitment.', copy: 'Bring GST details, purchase-order matching and tax validation into the review workflow.', label: 'VALIDATION' },
  { icon: Copy, title: 'A second look at repeats.', copy: 'Surface matching vendor records so a repeated bill can be held before it moves forward.', label: 'DUPLICATE REVIEW' },
  { icon: Users, title: 'Approvals with an owner.', copy: 'Route decisions by amount, vendor and role, with the supporting bill in context.', label: 'GOVERNANCE' },
  { icon: Workflow, title: 'A connected payment handoff.', copy: `Move approved bills into your authorized payment process ${BANK_PARTNERS_LABEL}. Confirm integration availability in your demo.`, label: 'PAYMENT WORKFLOWS' },
  { icon: History, title: 'The story behind every entry.', copy: 'Keep source documents, review decisions and voucher references connected for follow-up.', label: 'TRACEABILITY' },
];

function HeroPreview() {
  return <div className={s.heroVisual} aria-label="Illustrative Finance Desk preview">
    <div className={s.visualGrid} aria-hidden="true" />
    <div className={s.visualCaption}><span className={s.liveDot} />FROM BILL TO BOOKS<span>PRODUCT PREVIEW</span></div>
    <div className={s.heroConsole}>
      <div className={s.heroConsoleBar}><span className={s.appIcon}><FileCheck2 size={17} /></span><strong>Finance Desk</strong><span>Bill review</span><span className={s.consoleDots}>•••</span></div>
      <div className={s.heroConsoleBody}>
        <div className={s.previewHeading}><span className={s.micro}>INVOICE · INV-4821</span><span className={s.status}><Check size={12} />Reviewed</span></div>
        <h3>Prime Components Pvt Ltd</h3>
        <div className={s.heroAmount}><span>Invoice total</span><strong>₹74,045<span>.00</span></strong></div>
        <div className={s.heroFields}><div><span>Taxable value</span><b>₹62,750.00</b></div><div><span>IGST · 18%</span><b>₹11,295.00</b></div></div>
        <div className={s.heroCheckRows}><span><CircleCheck size={15} />Line items captured<small>Complete</small></span><span><CircleCheck size={15} />Tax totals matched<small>Complete</small></span><span><CircleCheck size={15} />Finance approval<small>Recorded</small></span></div>
        <div className={s.heroPosting}><span><CheckCheck size={19} /><span><strong>Posted to TallyPrime</strong><small>Purchase voucher · PUR-829</small></span></span><ArrowUpRight size={20} /></div>
      </div>
    </div>
    <div className={s.sourceCard}><span><FileText size={20} /></span><div><strong>Vendor invoice.pdf</strong><small>Source document linked to voucher</small></div><Check size={16} /></div>
    <div className={s.approvalChip}><ShieldCheck size={15} />Your approval stays in the loop</div>
  </div>;
}

export const FinancePage: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const closingRef = useRef<HTMLElement>(null);
  const [showSticky, setShowSticky] = useState(false);
  const [closingReached, setClosingReached] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const hero = heroRef.current;
    const closing = closingRef.current;
    if (!hero || !closing) return;
    const heroObserver = new IntersectionObserver(([entry]) => setShowSticky(!entry.isIntersecting && entry.boundingClientRect.top < 0), { threshold: 0 });
    const closingObserver = new IntersectionObserver(([entry]) => setClosingReached(entry.boundingClientRect.top < window.innerHeight), { threshold: 0 });
    heroObserver.observe(hero);
    closingObserver.observe(closing);
    return () => { heroObserver.disconnect(); closingObserver.disconnect(); };
  }, []);

  return <main className={s.page} id="finance-top">
    <section className={s.hero} ref={heroRef} aria-labelledby="finance-title">
      <div className={`${s.container} ${s.heroGrid}`}>
        <div className={s.heroCopy}>
          <span className={s.eyebrow}><span className={s.liveDot} />FINANCE DESK / BUILT AROUND TALLY</span>
          <h1 id="finance-title">Approve the bill.<br />Pay the vendor.<br /><span>The entry posts itself.</span></h1>
          <p>From a vendor invoice to your books, keep every check and approval connected. Give your finance team a bill to review, not a screen to retype.</p>
          <div className={s.actions}><a className={s.primaryButton} href="/#demo">Book a demo <ArrowRight size={17} /></a><a className={s.secondaryButton} href="#finance-workbench">Explore the workflow <ArrowDown size={17} /></a></div>
          <div className={s.heroTrust}><span><Check size={14} />Works with TallyPrime</span><span><Check size={14} />Your approval rules</span></div>
        </div>
        <HeroPreview />
      </div>
      <div className={`${s.container} ${s.proofStrip}`}><span className={s.micro}>CUSTOMER SPOTLIGHT</span><strong>Rajadurai E-Vehicles</strong><span className={s.proofResult}>Days <ArrowRight size={18} /> hours</span><span>Purchase, spares and service entries</span><a href="/customers/rajadurai/" className={s.textLink}>Read the story <ArrowUpRight size={15} /></a></div>
    </section>

    <section id="dual-module-section" className={`${s.section} ${s.darkSection}`} aria-labelledby="finance-challenge-title">
      <div className={s.container}><div className={s.challengeLayout}>
        <div><span className={s.eyebrow}>THE CHALLENGE</span><h2 id="finance-challenge-title">More vendor bills.<br />The same manual handoffs.</h2><p className={s.sectionIntro}>The work between receiving a bill and closing the books is where time and control get lost.</p>
          <div className={s.problemRows}>{[
            ['01', 'The same details, entered again.', 'PDF line items, tax splits and party ledgers move from one screen to another.'],
            ['02', 'Exceptions found too late.', 'A repeated bill or a mismatched tax amount interrupts the next step.'],
            ['03', 'Decisions scattered across messages.', 'Accounts teams chase the approval, the payment status and the final entry.'],
          ].map(([number, title, copy]) => <div key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div>
        </div>
        <div className={s.moduleStack}>
          <div className={s.moduleCard}><div className={s.moduleTop}><span className={s.featureIcon}><FileCheck2 size={22} /></span><span className={s.micro}>START WITH THE BILL</span></div><h3>Invoice automation</h3><p>Build a reliable path from incoming document to reviewed accounting entry.</p><ul className={s.checkList}><li><Check size={15} />Capture and GST-check bills</li><li><Check size={15} />Review potential duplicates</li><li><Check size={15} />Post to Tally, Zoho Books or your ERP</li></ul><a href="/free-trial/" className={s.textLink}>Explore invoice automation <ArrowRight size={16} /></a></div>
          <div className={`${s.moduleCard} ${s.addOnCard}`}><div className={s.moduleTop}><span className={s.featureIcon}><Users size={22} /></span><span className={s.micro}>EXTEND THE WORKFLOW</span></div><h3>Approvals & payments</h3><p>Connect approval rules and payment handoffs to the same reviewed bill.</p><a href="/#demo" className={s.textLink}>Discuss your payment workflow <ArrowRight size={16} /></a></div>
        </div>
      </div></div>
    </section>

    <section className={`${s.section} ${s.journeySection}`} aria-labelledby="finance-journey-title"><div className={s.container}>
      <div className={s.sectionHeading}><div><span className={s.eyebrow}>THE CONNECTED DESK</span><h2 id="finance-journey-title">One bill. A clear path to your books.</h2></div><p>Each step carries the document and its context forward. Your team stays in control of the decisions.</p></div>
      <ol className={s.journey}>{[
        { icon: Inbox, name: 'Capture', text: 'Email, PDF, scan or upload' },
        { icon: ShieldCheck, name: 'Check', text: 'Line items, taxes and duplicates' },
        { icon: Users, name: 'Approve', text: 'Your rules and authorized owners' },
        { icon: Building2, name: 'Post', text: 'Mapped ledgers and a linked voucher' },
      ].map(({ icon: Icon, name, text }, index) => <li key={name}><div><span className={s.featureIcon}><Icon size={22} /></span><span className={s.micro}>0{index + 1}</span></div><h3>{name}</h3><p>{text}</p></li>)}</ol>
      <div className={s.journeyFoot}><span><Layers size={16} />One source document</span><span><LockKeyhole size={16} />Approval controls</span><span><History size={16} />A connected audit trail</span></div>
    </div></section>

    <section id="finance-workbench" className={`${s.section} ${s.workbenchSection}`} aria-labelledby="finance-workbench-title"><div className={s.container}>
      <div className={s.sectionHeading}><div><span className={s.eyebrow}>INSIDE FINANCE DESK</span><h2 id="finance-workbench-title">Less explanation.<br />More of the actual workflow.</h2></div><p>Explore four everyday tasks. Switch views, inspect a duplicate and try an approval with sample data.</p></div>
      <FinanceWorkbench />
    </div></section>

    <section className={`${s.section} ${s.darkSection} ${s.capabilitiesSection}`} aria-labelledby="finance-controls-title"><div className={s.container}>
      <div className={s.sectionHeading}><div><span className={s.eyebrow}>BUILT FOR THE DETAILS</span><h2 id="finance-controls-title">Move faster.<br />Keep the controls that matter.</h2></div><p>Automation handles the repetitive work. Your team owns exceptions, approvals and the final decision.</p></div>
      <div className={s.capabilityGrid}>{capabilities.map(({ icon: Icon, title, copy, label }) => <article key={title}><div><Icon size={23} /><span className={s.micro}>{label}</span></div><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </div></section>

    <section className={`${s.section} ${s.storySection}`} id="customer-story-rajadurai" aria-labelledby="finance-story-title"><div className={`${s.container} ${s.storyGrid}`}>
      <div className={s.storyMetric}><span className={s.micro}>RAJADURAI E-VEHICLES</span><div><span>Days</span><ArrowRight size={43} /><strong>hours.</strong></div><p>Purchase, spares and service entry into TallyPrime.</p><span className={s.storyLabel}><Building2 size={15} />Customer story</span></div>
      <div><span className={s.eyebrow}>FROM THE FINANCE DESK</span><h2 id="finance-story-title">A shorter path<br />from bills to books.</h2><p className={s.sectionIntro}>See how Rajadurai E-Vehicles condensed purchase, spares and service ledger entries from days to hours with AutoDocs.</p><div className={s.storyTags}><span>Purchase</span><span>Spares</span><span>Service</span></div><a href="/customers/rajadurai/" className={s.textLink}>Explore the customer story <ArrowUpRight size={17} /></a></div>
    </div></section>

    <section className={`${s.section} ${s.faqSection}`} aria-labelledby="finance-faq-title"><div className={`${s.container} ${s.faqGrid}`}>
      <div><span className={s.eyebrow}>BEFORE YOU GET STARTED</span><h2 id="finance-faq-title">Good questions.<br />Clear answers.</h2><p className={s.sectionIntro}>Start with your accounting setup and the way your team works today.</p><a href="/#demo" className={s.textLink}>Talk through your requirements <ArrowRight size={16} /></a></div>
      <div className={s.faqList}>{faqs.map(({ question, answer }, index) => <div className={s.faqItem} key={question} data-open={openFaq === index}><h3><button type="button" id={`finance-faq-button-${index}`} aria-expanded={openFaq === index} aria-controls={`finance-faq-answer-${index}`} onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{question}</span><ChevronDown size={18} aria-hidden="true" /></button></h3><div id={`finance-faq-answer-${index}`} role="region" aria-labelledby={`finance-faq-button-${index}`} hidden={openFaq !== index}><p>{answer}</p></div></div>)}</div>
    </div></section>

    <section className={s.closingSection} ref={closingRef} aria-labelledby="finance-closing-title"><div className={s.container}><div className={s.closingCard}><div><span className={s.eyebrow}>YOUR NEXT FINANCE WORKFLOW</span><h2 id="finance-closing-title">Bring a bill.<br />See the whole journey.</h2><p>Walk through capture, checks, approvals and Tally posting with your team’s requirements in mind.</p></div><div className={s.closingActions}><a href="/#demo" className={s.primaryButton}>Book a Finance Desk demo <ArrowRight size={17} /></a><a href="/free-trial/" className={s.textLink}>Start with invoice automation <ArrowUpRight size={16} /></a><span>Built around your existing accounting workflow.</span></div></div></div></section>

    {showSticky && !closingReached && <aside className={s.stickyBar} aria-label="Finance Desk demo"><div className={`${s.container} ${s.stickyInner}`}><span><span className={s.liveDot} /><strong>Finance Desk</strong><span>From vendor bill to your books.</span></span><a href="/#demo" className={s.primaryButton}>Book a demo <ArrowRight size={15} /></a></div></aside>}
  </main>;
};
