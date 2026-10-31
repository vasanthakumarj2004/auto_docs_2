'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Check, CheckCircle2, Database, FileCheck2, FileText, Inbox, Mail, ScanLine, ShieldCheck, Upload } from 'lucide-react';
import { useLandingLayout } from './LandingLayoutProvider';
import styles from './HowItWorks.module.css';

const steps = [
  { number: '01', label: 'Capture', title: 'We collect your documents', description: 'Send PDFs and scans, or connect email, portals and APIs. We bring your finance and shipment documents into one flow.', href: '/demo/', action: 'Bring your documents' },
  { number: '02', label: 'Extract', title: 'We turn documents into data', description: 'Our AI reads each document and structures the fields your team needs, from invoice line items to bank transactions and shipment details.', href: '/finance/', action: 'Explore Finance Desk' },
  { number: '03', label: 'Validate', title: 'We check before moving forward', description: 'We apply your business rules, check for duplicates and mismatches, and route exceptions for review before data moves downstream.', href: '/finance/#finance-workbench', action: 'See the checks' },
  { number: '04', label: 'Sync', title: 'We sync with your systems', description: 'Validated data reaches your accounting, ERP or transport system, so your team can continue the workflow without entering it again.', href: '/logistics/', action: 'Explore Logistics Desk' },
];

function WorkflowVisual({ index }: { index: number }) {
  return <div className={styles.visual} data-visual={index} aria-hidden="true">
    <div className={styles.visualGrid} />
    {index === 0 && <div className={styles.captureScene}>
      <div className={styles.orbit} /><div className={styles.orbitInner} />
      <div className={styles.sourceDocument} data-position="one"><Mail size={22} /><span>Email</span><i /><i /></div>
      <div className={styles.sourceDocument} data-position="two"><FileText size={22} /><span>Invoice.pdf</span><i /><i /></div>
      <div className={styles.sourceDocument} data-position="three"><Upload size={22} /><span>Upload</span><i /><i /></div>
      <div className={styles.captureHub}><Inbox size={43} strokeWidth={1.4} /><strong>One inbox</strong></div>
      <div className={styles.sceneBadge}><CheckCircle2 size={15} />Ready for processing</div>
    </div>}
    {index === 1 && <div className={styles.extractScene}>
      <div className={styles.extractionPaper}><FileText size={28} /><span>Example invoice</span><i /><i /><i /><div className={styles.paperTable}><b /><b /><b /><b /><b /><b /></div><div className={styles.scanLine} /></div>
      <div className={styles.dataPanel}><div className={styles.panelTop}><ScanLine size={18} /><span>Structured data</span><span className={styles.panelDot} /></div>
        {[['Document', 'Vendor invoice'], ['Invoice no.', 'INV-0042'], ['Line items', 'Captured'], ['Tax details', 'Extracted']].map(([label, value]) => <div className={styles.dataRow} key={label}><span>{label}</span><strong>{value}</strong></div>)}
        <div className={styles.panelFooter}><Check size={14} />Ready for validation</div>
      </div>
    </div>}
    {index === 2 && <div className={styles.validationScene}>
      <div className={styles.validationHalo} />
      <div className={styles.validationPanel}>
        <div className={styles.validationHeading}><span><ShieldCheck size={28} /></span><div><small>Your rules. Every document.</small><strong>Checks before sync</strong></div></div>
        {['GST & duplicate checks', 'Purchase order matching', 'Cross-document checks'].map(label => <div className={styles.checkRow} key={label}><CheckCircle2 size={18} /><span>{label}</span><i /></div>)}
        <div className={styles.reviewNote}><FileCheck2 size={16} />Exceptions stay with your team</div>
      </div>
    </div>}
    {index === 3 && <div className={styles.syncScene}>
      <svg className={styles.connections} viewBox="0 0 440 320" fill="none"><path d="M220 160H110V62H65M220 160H330V62H375M220 160H110V258H65M220 160H330V258H375" /></svg>
      <div className={styles.syncHub}><Database size={31} /><strong>Verified data</strong><span>Ready to sync</span></div>
      {['Tally', 'Zoho Books', 'CargoWise', 'ERP / TMS'].map((name, i) => <div className={styles.system} data-system={i} key={name}><span>{name === 'ERP / TMS' ? <Database size={21} /> : name[0]}</span><strong>{name}</strong><Check size={13} /></div>)}
    </div>}
  </div>;
}

export const HowItWorks: React.FC = () => {
  const { appearance } = useLandingLayout();
  const stackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const bounds = stack.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight * 0.7 - bounds.top) / bounds.height));
      stack.style.setProperty('--rail-progress', `${progress * 100}%`);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    observer.observe(stack);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, []);

  // Reveal a covered card when its link receives keyboard focus.
  const revealCard = (index: number, target: EventTarget & HTMLAnchorElement) => {
    if (!target.matches(':focus-visible')) return;
    const stack = stackRef.current;
    const card = cardRefs.current[index];
    if (!stack || !card || getComputedStyle(card).position !== 'sticky') return;
    const gap = parseFloat(getComputedStyle(stack).rowGap) || 0;
    const top = window.scrollY + stack.getBoundingClientRect().top;
    window.scrollTo({ top: top + index * (card.offsetHeight + gap) - parseFloat(getComputedStyle(card).top), behavior: 'instant' });
  };

  return <section id="how-it-works" className={styles.section} data-appearance={appearance} aria-labelledby="how-it-works-title">
    <div className="site-shell">
      <div className={styles.heading}>
        <span className={styles.eyebrow}>Your documents. One connected workflow.</span>
        <h2 id="how-it-works-title">How we do</h2>
        <p>We handle capture, extraction, checks and system updates, with your team in control of approvals and exceptions.</p>
      </div>
      <div ref={stackRef} className={styles.stack}>
        <div className={styles.rail} aria-hidden="true"><span /><i /></div>
        {steps.map((step, index) => <article key={step.number} ref={element => { cardRefs.current[index] = element; }}
          className={styles.card} id={`how-it-works-step-${step.number}`} style={{ '--card-index': index } as React.CSSProperties}>
          <div className={styles.copy}>
            <div className={styles.kicker}><span>{step.number}</span>{step.label}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
            <Link href={step.href} className={styles.learnMore} onFocus={event => revealCard(index, event.currentTarget)}>{step.action}<ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
          <WorkflowVisual index={index} />
        </article>)}
      </div>
    </div>
  </section>;
};
