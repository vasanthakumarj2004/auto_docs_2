'use client';

import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Check, FileText, Mail, ShieldCheck, Sparkles, Workflow } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import styles from './LandingHero.module.css';

const workflows = {
  finance: {
    label: 'Finance Desk', title: 'From invoice to your books.',
    steps: [
      { icon: FileText, title: 'Invoice', detail: 'Document intake' },
      { icon: Sparkles, title: 'Read & check', detail: 'Invoice automation' },
      { icon: ShieldCheck, title: 'Review', detail: 'Human approval' },
      { icon: Check, title: 'Tally', detail: 'Validated posting' },
    ],
    systems: ['TallyPrime', 'Zoho Books', 'Custom ERP'],
    capabilities: ['Invoice Automation', 'Bank Statement & Reconciliation'],
  },
  logistics: {
    label: 'Logistics Desk', title: 'From email to CargoWise.',
    steps: [
      { icon: Mail, title: 'Email', detail: 'Document intake' },
      { icon: Sparkles, title: 'Read & check', detail: 'Document automation' },
      { icon: ShieldCheck, title: 'Review', detail: 'Human approval' },
      { icon: Check, title: 'CargoWise', detail: 'Connected workflows' },
    ],
    systems: ['CargoWise', 'Custom ERP', 'Email workflows'],
    capabilities: ['RFQ to Booking', 'Shipment Management'],
  },
};

type WorkflowPreviewProps = { mode?: 'dashboard' | 'video'; videoSrc?: string; poster?: string };

export function WorkflowPreview({ mode = 'dashboard', videoSrc, poster }: WorkflowPreviewProps) {
  const [desk, setDesk] = useState<keyof typeof workflows>('finance');
  const current = workflows[desk];
  return (
    <div className={styles.dashboard}>
      {mode === 'video' && videoSrc ? (
        <video className={styles.demoVideo} controls playsInline preload="none" poster={poster} aria-label="Docsynecx workflow demo"><source src={videoSrc} /></video>
      ) : <>
        <div className={styles.dashboardHeader}>
          <span className={styles.dashboardBrand}><Workflow size={17} aria-hidden="true" /> Docsynecx <span>/ workflows</span></span>
          <span className={styles.previewLabel}><i /> Workflow preview</span>
        </div>
        <div className={styles.dashboardBody}>
          <div className={styles.workspace}>
            <div className={styles.workspaceHeading}>
              <h2 id="workflow-title">{current.title}</h2>
              <div className={styles.deskTabs} role="group" aria-label="Preview a workflow">
                {(Object.keys(workflows) as Array<keyof typeof workflows>).map((key) => <button type="button" key={key} aria-pressed={desk === key} aria-controls="workflow-canvas" onClick={() => setDesk(key)}>{workflows[key].label}</button>)}
              </div>
            </div>
            <div id="workflow-canvas" className={styles.canvas} role="region" aria-labelledby="workflow-title" aria-live="polite">
              <ol className={styles.nodes}>
                {current.steps.map(({ icon: Icon, title, detail }, index) => <li key={title} className={styles.node}>
                  <span className={styles.nodeIndex}>0{index + 1}</span><span className={styles.nodeIcon}><Icon size={20} aria-hidden="true" /></span><strong>{title}</strong><span>{detail}</span>
                </li>)}
              </ol>
              <p className={styles.reviewNote}><ShieldCheck size={13} aria-hidden="true" /> Your team handles exceptions, not typing.</p>
            </div>
          </div>
          <aside className={styles.connections} aria-label={`${current.label} integrations`}>
            <span className={styles.smallLabel}>Connected workflows</span>
            {current.systems.map((system) => <div key={system}><span className={styles.systemIcon}>{system.charAt(0)}</span><span>{system}</span><ArrowUpRight size={13} aria-hidden="true" /></div>)}
            <p>Built for businesses that run on Tally, an ERP or CargoWise.</p>
          </aside>
        </div>
        <div className={styles.dashboardFooter}><span><i /> {current.label}</span><span>{current.capabilities.join(' / ')}</span></div>
      </>}
    </div>
  );
}

export function LandingHero() {
  const frameRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let request = 0;
    const update = () => {
      request = 0;
      const progress = motion.matches ? 1 : Math.min(1, Math.max(0, window.scrollY / 600));
      frame.style.setProperty('--frame-tilt', `${18 * (1 - progress)}deg`);
      frame.style.setProperty('--frame-scale', `${0.94 + 0.06 * progress}`);
    };
    const onScroll = () => { if (!request) request = window.requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    motion.addEventListener('change', update);
    return () => { window.removeEventListener('scroll', onScroll); motion.removeEventListener('change', update); window.cancelAnimationFrame(request); };
  }, []);
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.landscape} aria-hidden="true"><div className={styles.horizon} /><div className={styles.water} /></div>
      <div className={styles.copy}>
        <p className={styles.eyebrow}><span /> One platform. Two desks.</p>
        <h1 id="hero-title">Grow the business.<br /><span>Not the data-entry desk.</span></h1>
        <p className={styles.description}>Bills read, checked, paid and posted to Tally. Emails become CargoWise jobs. Your team handles exceptions, not typing.</p>
        <div className={styles.offerCard}>
          <div className={styles.offerHeading}><Workflow size={15} aria-hidden="true" /><span>THE DOCSYNECX PLATFORM</span></div>
          <div className={styles.offerBody}><p>See it on your own documents.</p><Link href="/#contact">Book a demo <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
        </div>
        <div className={styles.deskLinks}>
          <Link href="/finance-desk/">I run a finance desk <ArrowUpRight size={17} aria-hidden="true" /></Link>
          <Link href="/#platform">I run a logistics desk <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
        <p className={styles.trust}>Built for businesses that run on <strong>Tally, an ERP or CargoWise.</strong></p>
      </div>
      <div className={styles.mediaArea}>
        <div className={styles.mediaCaption}><span>[ WORKFLOW PREVIEW ]</span><span>Explore your workflow <ArrowDown size={12} aria-hidden="true" /></span></div>
        <div className={styles.frame} ref={frameRef}><WorkflowPreview /><span className={styles.corner} aria-hidden="true" /><span className={styles.corner} aria-hidden="true" /></div>
      </div>
    </section>
  );
}
