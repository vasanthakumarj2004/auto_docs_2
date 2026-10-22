'use client';

import React, { useEffect, useRef, useState } from 'react';
import { 
  ArrowDown, 
  ArrowRight, 
  ArrowUpRight, 
  Building2, 
  Check, 
  CheckCheck, 
  ChevronDown, 
  CircleCheck, 
  Copy, 
  FileCheck2, 
  FileText, 
  History, 
  Inbox, 
  Layers, 
  LockKeyhole, 
  Scale, 
  ShieldCheck, 
  Ship, 
  Users, 
  Workflow 
} from 'lucide-react';
import { LogisticsWorkbench } from '../components/logistics/LogisticsWorkbench';
import s from '../components/logistics/LogisticsDesk.module.css';

const forwarderFaqs = [
  {
    question: 'How does AutoDocs connect with CargoWise One?',
    answer:
      'AutoDocs integrates natively with CargoWise One via standard eAdaptor XML interfaces. There is zero screen scraping, no fragile browser extensions, and no local desktop software installs. Booking confirmations, ocean bills of lading, and packing list line items transmit directly into your forwarding database.',
  },
  {
    question: 'Can AutoDocs handle non-standard and scanned carrier BL formats?',
    answer:
      'Yes. AutoDocs uses advanced multimodal document models trained across thousands of ocean carriers (Maersk, MSC, CMA CGM, Hapag-Lloyd, ONE, Cosco) and air waybill formats. It dynamically extracts container numbers, seal IDs, piece counts, and weights without relying on rigid coordinate templates.',
  },
  {
    question: 'What happens when shipment weights or container numbers mismatch?',
    answer:
      'When discrepancies between a bill of lading, customer packing list, or commercial invoice exceed your configured tolerance thresholds (e.g., gross weight variance or container typo), AutoDocs places the job on an exception hold and highlights the exact discrepancy for documentation desk verification.',
  },
  {
    question: 'Can we automate customs declaration pre-fills alongside forwarding jobs?',
    answer:
      'Yes. AutoDocs extracts line-item tariff descriptions from commercial invoices and automatically maps them against your customer’s historic HS code profiles, pre-filling customs entries and saving 15–20 minutes per international declaration.',
  },
  {
    question: 'How are multi-branch and forwarder approval permissions managed?',
    answer:
      'You can configure branch-level routing, customer-specific business rules, and tiered operator permissions. Exception holds and shipment approvals can be reviewed directly by branch operators or supervisors before eAdaptor transmission.',
  },
];

const capabilities = [
  {
    icon: Ship,
    title: 'Multimodal freight extraction.',
    copy: 'Extract carrier BLs, air waybills, booking confirmations, and arrival notices with full container and voyage context.',
    label: 'FREIGHT EXTRACTION',
  },
  {
    icon: Scale,
    title: 'Cross-document reconciliation.',
    copy: 'Reconcile bills of lading against customer packing lists to spot weight variations, piece count errors, and container typos early.',
    label: 'INTEGRITY AUDIT',
  },
  {
    icon: ShieldCheck,
    title: 'Exception routing that protects margin.',
    copy: 'Hold discrepancies before freight moves to prevent expensive customs delays, carrier amendment fees, and demurrage penalties.',
    label: 'EXCEPTION CONTROLS',
  },
  {
    icon: Users,
    title: 'Branch and operator governance.',
    copy: 'Route shipment approvals and exception reviews by branch, trade lane, and forwarder team member with complete transparency.',
    label: 'GOVERNANCE',
  },
  {
    icon: Workflow,
    title: 'Native CargoWise eAdaptor sync.',
    copy: 'Transmit validated forwarding jobs directly into CargoWise One via secure eAdaptor XML interfaces with zero coordinate scraping.',
    label: 'CARGOWISE INTEGRATION',
  },
  {
    icon: History,
    title: 'Permanent shipment audit trail.',
    copy: 'Keep customer emails, carrier PDFs, parsed metadata, and CargoWise job references permanently linked for instant compliance retrieval.',
    label: 'AUDIT TRACEABILITY',
  },
];

function HeroPreview() {
  return (
    <div className={s.heroVisual} aria-label="Illustrative Logistics Desk preview">
      <div className={s.visualGrid} aria-hidden="true" />
      <div className={s.visualCaption}>
        <span className={s.liveDot} />
        FROM SHIPMENT EMAIL TO TMS
        <span>PRODUCT PREVIEW</span>
      </div>
      <div className={s.heroConsole}>
        <div className={s.heroConsoleBar}>
          <span className={s.appIcon}>
            <Ship size={17} />
          </span>
          <strong>Logistics Desk</strong>
          <span>Shipment review</span>
          <span className={s.consoleDots}>•••</span>
        </div>
        <div className={s.heroConsoleBody}>
          <div className={s.previewHeading}>
            <span className={s.micro}>OCEAN BL · HL-9384721</span>
            <span className={s.status}>
              <Check size={12} />
              Reconciled
            </span>
          </div>
          <h3>TransWorld Logistics LLC</h3>
          <div className={s.heroAmount}>
            <span>Gross shipment weight</span>
            <strong>
              24,500<span> KG</span>
            </strong>
          </div>
          <div className={s.heroFields}>
            <div>
              <span>Port Routing Pair</span>
              <b>JEA (Jebel Ali) → INNSA</b>
            </div>
            <div>
              <span>Containers</span>
              <b>2 × 40HC (HLXU-4920194)</b>
            </div>
          </div>
          <div className={s.heroCheckRows}>
            <span>
              <CircleCheck size={15} />
              Container numbers & seals valid
              <small>Complete</small>
            </span>
            <span>
              <CircleCheck size={15} />
              BL ↔ Packing list reconciled
              <small>Complete</small>
            </span>
            <span>
              <CircleCheck size={15} />
              Customs declaration drafted
              <small>Recorded</small>
            </span>
          </div>
          <div className={s.heroPosting}>
            <span>
              <CheckCheck size={19} />
              <span>
                <strong>Created in CargoWise One</strong>
                <small>Forwarding job · #S00038421</small>
              </span>
            </span>
            <ArrowUpRight size={20} />
          </div>
        </div>
      </div>
      <div className={s.sourceCard}>
        <span>
          <FileText size={20} />
        </span>
        <div>
          <strong>Booking & BL.pdf</strong>
          <small>Source paperwork linked to CargoWise job</small>
        </div>
        <Check size={16} />
      </div>
      <div className={s.approvalChip}>
        <ShieldCheck size={15} />
        Exception controls keep your desk in the loop
      </div>
    </div>
  );
}

export const LogisticsPage: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const closingRef = useRef<HTMLElement>(null);
  const [showSticky, setShowSticky] = useState(false);
  const [closingReached, setClosingReached] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const hero = heroRef.current;
    const closing = closingRef.current;
    if (!hero || !closing) return;
    const heroObserver = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    const closingObserver = new IntersectionObserver(
      ([entry]) => setClosingReached(entry.boundingClientRect.top < window.innerHeight),
      { threshold: 0 }
    );
    heroObserver.observe(hero);
    closingObserver.observe(closing);
    return () => {
      heroObserver.disconnect();
      closingObserver.disconnect();
    };
  }, []);

  return (
    <main className={s.page} id="logistics-top">
      {/* SECTION 1: SPLIT HERO WITH PREVIEW CONSOLE & PROOF STRIP */}
      <section className={s.hero} ref={heroRef} aria-labelledby="logistics-title">
        <div className={`${s.container} ${s.heroGrid}`}>
          <div className={s.heroCopy}>
            <span className={s.eyebrow}>
              <span className={s.liveDot} />
              LOGISTICS DESK / BUILT AROUND CARGOWISE
            </span>
            <h1 id="logistics-title">
              Shipment emails in.
              <br />
              CargoWise jobs out.
              <br />
              <span>Exceptions flagged before freight moves.</span>
            </h1>
            <p>
              Turn customer booking emails and carrier paperwork into structured CargoWise jobs automatically. Give your
              documentation desk exceptions to review, not screens to retype.
            </p>
            <div className={s.actions}>
              <a className={s.primaryButton} href="/#demo">
                Book a demo <ArrowRight size={17} />
              </a>
              <a className={s.secondaryButton} href="#logistics-workbench">
                Explore the workflow <ArrowDown size={17} />
              </a>
            </div>
            <div className={s.heroTrust}>
              <span>
                <Check size={14} />
                Native CargoWise eAdaptor XML
              </span>
              <span>
                <Check size={14} />
                Your forwarding validation rules
              </span>
            </div>
          </div>
          <HeroPreview />
        </div>
        <div className={`${s.container} ${s.proofStrip}`}>
          <span className={s.micro}>CUSTOMER SPOTLIGHT</span>
          <strong>FT Logistics</strong>
          <span className={s.proofResult}>
            2 hrs <ArrowRight size={18} /> 2 min
          </span>
          <span>Email-to-CargoWise forwarding jobs</span>
          <a href="/customers/ft-logistics/" className={s.textLink}>
            Read the story <ArrowUpRight size={15} />
          </a>
        </div>
      </section>

      {/* SECTION 2: THE CHALLENGE & DUAL MODULE STACK (Dark Navy) */}
      <section
        id="dual-module-section"
        className={`${s.section} ${s.darkSection}`}
        aria-labelledby="logistics-challenge-title"
      >
        <div className={s.container}>
          <div className={s.challengeLayout}>
            <div>
              <span className={s.eyebrow}>THE CHALLENGE</span>
              <h2 id="logistics-challenge-title">
                More shipment volume.
                <br />
                The same manual handoffs.
              </h2>
              <p className={s.sectionIntro}>
                The work between receiving customer booking emails and keying jobs into CargoWise is where documentation
                time and margin get lost.
              </p>
              <div className={s.problemRows}>
                {[
                  [
                    '01',
                    'The same details, entered again.',
                    'Container numbers, seals, weights, and shipper entities typed manually from PDF attachments into CargoWise.',
                  ],
                  [
                    '02',
                    'Exceptions found too late.',
                    'A weight discrepancy between the BL and packing list triggers customs holds and demurrage penalties at the port.',
                  ],
                  [
                    '03',
                    'Decisions scattered across inboxes.',
                    'Documentation teams spend hours chasing Outlook attachments, rate approvals, and manual job updates.',
                  ],
                ].map(([number, title, copy]) => (
                  <div key={number}>
                    <span>{number}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={s.moduleStack}>
              <div className={s.moduleCard}>
                <div className={s.moduleTop}>
                  <span className={s.featureIcon}>
                    <Ship size={22} />
                  </span>
                  <span className={s.micro}>START WITH THE EMAIL</span>
                </div>
                <h3>CargoWise job automation</h3>
                <p>Build a reliable path from incoming booking paperwork to reviewed, native CargoWise forwarding entries.</p>
                <ul className={s.checkList}>
                  <li>
                    <Check size={15} />
                    Extract carrier BLs, packing lists & booking emails
                  </li>
                  <li>
                    <Check size={15} />
                    Reconcile weights, piece counts & container IDs
                  </li>
                  <li>
                    <Check size={15} />
                    Post native eAdaptor XML directly into CargoWise One
                  </li>
                </ul>
                <a href="/free-trial/" className={s.textLink}>
                  Explore forwarding automation <ArrowRight size={16} />
                </a>
              </div>
              <div className={`${s.moduleCard} ${s.addOnCard}`}>
                <div className={s.moduleTop}>
                  <span className={s.featureIcon}>
                    <Users size={22} />
                  </span>
                  <span className={s.micro}>EXTEND THE WORKFLOW</span>
                </div>
                <h3>Customs pre-fill & freight AP audit</h3>
                <p>Auto-map HS tariff codes from commercial invoices and audit incoming carrier invoices against agreed freight buy rates.</p>
                <a href="/#demo" className={s.textLink}>
                  Discuss your forwarder workflow <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE CONNECTED DESK (4-Step Journey) */}
      <section className={`${s.section} ${s.journeySection}`} aria-labelledby="logistics-journey-title">
        <div className={s.container}>
          <div className={s.sectionHeading}>
            <div>
              <span className={s.eyebrow}>THE CONNECTED DESK</span>
              <h2 id="logistics-journey-title">One shipment. A clear path to your TMS.</h2>
            </div>
            <p>Each step carries the document and its freight context forward. Your team stays in control of the exceptions.</p>
          </div>
          <ol className={s.journey}>
            {[
              { icon: Inbox, name: 'Capture', text: 'Booking emails, ocean BLs, air waybills & packing lists' },
              { icon: Scale, name: 'Check', text: 'Cross-check gross weights, pieces, seals & container IDs' },
              { icon: ShieldCheck, name: 'Validate', text: 'Enforce tolerance rules and spot paperwork errors' },
              { icon: Building2, name: 'Post', text: 'Native eAdaptor XML creates CargoWise One job' },
            ].map(({ icon: Icon, name, text }, index) => (
              <li key={name}>
                <div>
                  <span className={s.featureIcon}>
                    <Icon size={22} />
                  </span>
                  <span className={s.micro}>0{index + 1}</span>
                </div>
                <h3>{name}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
          <div className={s.journeyFoot}>
            <span>
              <Layers size={16} />
              One linked shipment file
            </span>
            <span>
              <LockKeyhole size={16} />
              Exception tolerance holds
            </span>
            <span>
              <History size={16} />
              Traceable eAdaptor audit trail
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 4: INSIDE LOGISTICS DESK (Interactive 4-Tab Workbench) */}
      <section
        id="logistics-workbench"
        className={`${s.section} ${s.workbenchSection}`}
        aria-labelledby="logistics-workbench-title"
      >
        <div className={s.container}>
          <div className={s.sectionHeading}>
            <div>
              <span className={s.eyebrow}>INSIDE LOGISTICS DESK</span>
              <h2 id="logistics-workbench-title">
                Less explanation.
                <br />
                More of the actual workflow.
              </h2>
            </div>
            <p>Explore four everyday forwarding tasks. Switch views, inspect a container variance, and try an automated CargoWise job creation with sample data.</p>
          </div>
          <LogisticsWorkbench />
        </div>
      </section>

      {/* SECTION 5: BUILT FOR THE DETAILS (Capabilities Grid - Dark Navy) */}
      <section
        className={`${s.section} ${s.darkSection} ${s.capabilitiesSection}`}
        aria-labelledby="logistics-controls-title"
      >
        <div className={s.container}>
          <div className={s.sectionHeading}>
            <div>
              <span className={s.eyebrow}>BUILT FOR THE DETAILS</span>
              <h2 id="logistics-controls-title">
                Move faster.
                <br />
                Keep the controls that matter.
              </h2>
            </div>
            <p>Automation handles repetitive PDF extraction. Your forwarding team owns exceptions, container holds, and dispatch authorization.</p>
          </div>
          <div className={s.capabilityGrid}>
            {capabilities.map(({ icon: Icon, title, copy, label }) => (
              <article key={title}>
                <div>
                  <Icon size={23} />
                  <span className={s.micro}>{label}</span>
                </div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: CUSTOMER STORY (FT Logistics Metric Split) */}
      <section className={`${s.section} ${s.storySection}`} id="customer-story-ft-logistics" aria-labelledby="logistics-story-title">
        <div className={`${s.container} ${s.storyGrid}`}>
          <div className={s.storyMetric}>
            <span className={s.micro}>FT LOGISTICS</span>
            <div>
              <span>2 hrs</span>
              <ArrowRight size={43} />
              <strong>2 min.</strong>
            </div>
            <p>Shipment email extraction and direct CargoWise One job posting.</p>
            <span className={s.storyLabel}>
              <Building2 size={15} />
              Customer story
            </span>
          </div>
          <div>
            <span className={s.eyebrow}>FROM THE FORWARDING DESK</span>
            <h2 id="logistics-story-title">
              A shorter path
              <br />
              from shipment emails to CargoWise.
            </h2>
            <p className={s.sectionIntro}>
              See how FT Logistics scaled monthly shipment volume across ocean and air freight without adding documentation headcount or risking customs demurrage.
            </p>
            <div className={s.storyTags}>
              <span>Ocean Freight</span>
              <span>Air Waybills</span>
              <span>CargoWise eAdaptor</span>
            </div>
            <a href="/customers/ft-logistics/" className={s.textLink}>
              Explore the customer story <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 7: BEFORE YOU GET STARTED (FAQs with Accordion) */}
      <section className={`${s.section} ${s.faqSection}`} aria-labelledby="logistics-faq-title">
        <div className={`${s.container} ${s.faqGrid}`}>
          <div>
            <span className={s.eyebrow}>BEFORE YOU GET STARTED</span>
            <h2 id="logistics-faq-title">
              Good questions.
              <br />
              Clear answers.
            </h2>
            <p className={s.sectionIntro}>
              Start with your forwarding setup, carrier paperwork, and the way your documentation team operates today.
            </p>
            <a href="/#demo" className={s.textLink}>
              Talk through your forwarding requirements <ArrowRight size={16} />
            </a>
          </div>
          <div className={s.faqList}>
            {forwarderFaqs.map(({ question, answer }, index) => (
              <div className={s.faqItem} key={question} data-open={openFaq === index}>
                <h3>
                  <button
                    type="button"
                    id={`logistics-faq-button-${index}`}
                    aria-expanded={openFaq === index}
                    aria-controls={`logistics-faq-answer-${index}`}
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span>{question}</span>
                    <ChevronDown size={18} aria-hidden="true" />
                  </button>
                </h3>
                <div
                  id={`logistics-faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`logistics-faq-button-${index}`}
                  hidden={openFaq !== index}
                >
                  <p>{answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: CLOSING CTA CARD & STICKY BAR */}
      <section className={s.closingSection} ref={closingRef} aria-labelledby="logistics-closing-title">
        <div className={s.container}>
          <div className={s.closingCard}>
            <div>
              <span className={s.eyebrow}>YOUR NEXT FORWARDING WORKFLOW</span>
              <h2 id="logistics-closing-title">
                Bring a shipment email.
                <br />
                See the whole journey.
              </h2>
              <p>
                Walk through email capture, BL cross-checks, HS code mapping, and CargoWise job creation with your team’s sample shipments in mind.
              </p>
            </div>
            <div className={s.closingActions}>
              <a href="/#demo" className={s.primaryButton}>
                Book a Logistics Desk demo <ArrowRight size={17} />
              </a>
              <a href="/free-trial/" className={s.textLink}>
                Start with document automation <ArrowUpRight size={16} />
              </a>
              <span>Built around your existing CargoWise One workflow.</span>
            </div>
          </div>
        </div>
      </section>

      {showSticky && !closingReached && (
        <aside className={s.stickyBar} aria-label="Logistics Desk demo">
          <div className={`${s.container} ${s.stickyInner}`}>
            <span>
              <span className={s.liveDot} />
              <strong>Logistics Desk</strong>
              <span>Shipment emails in. CargoWise jobs out.</span>
            </span>
            <a href="/#demo" className={s.primaryButton}>
              Book a demo <ArrowRight size={15} />
            </a>
          </div>
        </aside>
      )}
    </main>
  );
};
