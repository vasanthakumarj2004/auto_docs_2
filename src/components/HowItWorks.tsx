'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Mail, Search, FileCheck2, Database, CheckCircle2, FileText, Check, ArrowRight } from 'lucide-react';
import styles from './HowItWorks.module.css';

const steps = [
    {
      step: '01',
      title: 'Document comes in',
      desc: 'Via email, PDF, or customer upload — AutoDocs ingests it automatically.',
      icon: Mail,
      artifact: 'PDF · Scan · Pre-Alert Email',
    },
    {
      step: '02',
      title: 'Details extracted',
      desc: 'AutoDocs extracts line items, party ledgers, GSTIN, and shipment specs.',
      icon: Search,
      artifact: 'Line Items · GSTIN · Container #',
    },
    {
      step: '03',
      title: 'Cross-checked & matched',
      desc: 'Reconciles BL vs Packing List, checks GST portal, and verifies PO matching.',
      icon: FileCheck2,
      artifact: 'GST Portal · 3-Way PO · BL vs PL',
    },
    {
      step: '04',
      title: 'Pushed to system',
      desc: 'Voucher or job is built and pushed directly into Tally or CargoWise.',
      icon: Database,
      artifact: 'Tally XML · CargoWise eAdaptor',
    },
    {
      step: '05',
      title: 'Review exceptions only',
      desc: 'Your team reviews only flagged discrepancies — clean records post automatically.',
      icon: CheckCircle2,
      artifact: 'Exception Queue · Audit Log',
    },
  ];

// Illustrations use only the existing step labels, keeping the website's copy intact.
function StepPreview({ index }: { index: number }) {
  const item = steps[index];
  const Icon = item.icon;
  const labels = item.artifact.split(' · ');

  return (
    <div className={styles.preview} aria-hidden="true">
      <div className={styles.previewHeader}>
        <span className={styles.previewIcon}><Icon size={21} /></span>
        <span className={styles.previewStep}>STEP {item.step}</span>
        <span className={styles.statusDot} />
      </div>
      {index === 0 && <>
        <div className={styles.sourcePills}>{labels.map(label => <span key={label}>{label}</span>)}</div>
        <div className={styles.scanTrack}><span /></div>
        <div className={styles.documents}>{labels.map(label => (
          <div className={styles.document} key={label}>
            <FileText size={25} /><span>{label}</span>
            <div className={styles.paperLines}><i /><i /><i /></div>
            <span className={styles.documentCheck}><Check size={13} /></span>
          </div>
        ))}</div>
      </>}
      {index === 1 && <div className={styles.extraction}>
        {labels.map((label, i) => <div className={styles.field} key={label}>
          <span>{label}</span><div className={styles.fieldValue}><i style={{ width: `${72 - i * 14}%` }} /><Check size={16} /></div>
        </div>)}
        <div className={styles.tableLines}>{[0, 1, 2].map(row => <div key={row}><i /><i /><i /></div>)}</div>
      </div>}
      {index === 2 && <>
        <div className={styles.checks}>{labels.map(label => <div key={label}><CheckCircle2 size={21} /><span>{label}</span></div>)}</div>
        <div className={styles.match}><FileText size={30} /><span /><FileCheck2 size={30} /></div>
      </>}
      {index === 3 && <>
        <div className={styles.transfer}><FileCheck2 size={32} /><span><ArrowRight size={20} /></span><Database size={32} /></div>
        <div className={styles.destinations}>{labels.map(label => <div key={label}><span>{label}</span><Check size={19} /></div>)}</div>
      </>}
      {index === 4 && <div className={styles.review}>
        {labels.map((label, i) => <div key={label}>
          <span className={styles.reviewLabel}>{i === 0 ? <Search size={18} /> : <CheckCircle2 size={18} />}{label}</span>
          {[0, 1, 2].map(row => <div className={styles.reviewRow} key={row}><i /><span>{i === 0 && row === 0 ? <Search size={14} /> : <Check size={14} />}</span></div>)}
        </div>)}
      </div>}
    </div>
  );
}

export const HowItWorks: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)');
    const updateMode = () => setEnhanced(query.matches);
    updateMode();
    query.addEventListener('change', updateMode);
    return () => query.removeEventListener('change', updateMode);
  }, []);

  useEffect(() => {
    if (!enhanced) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      const pin = pinRef.current;
      if (!section || !pin) return;
      const travel = section.offsetHeight - pin.offsetHeight;
      const progress = Math.max(0, Math.min(1, (64 - section.getBoundingClientRect().top) / travel));
      const stepPosition = progress * (steps.length - 1);
      // A small dead band avoids flickering between steps on tiny scroll reversals.
      setActiveStep(current => Math.abs(stepPosition - current) > 0.56
        ? Math.round(stepPosition)
        : current);
      section.style.setProperty('--timeline-progress', `${progress * 100}%`);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(sectionRef.current!);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      resizeObserver.disconnect();
    };
  }, [enhanced]);

  const selectStep = (index: number) => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;
    const top = window.scrollY + section.getBoundingClientRect().top - 64;
    const travel = section.offsetHeight - pin.offsetHeight;
    window.scrollTo({ top: top + travel * index / (steps.length - 1), behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} id="how-it-works" className={styles.section} data-enhanced={enhanced} aria-labelledby="how-it-works-title">
      <div ref={pinRef} className={styles.pin}>
        <div className="site-shell">
          <div className={styles.heading}>
            <div className="eyebrow mb-4">End-To-End Automation</div>
            <h2 id="how-it-works-title" className="text-2xl md:text-3xl font-extrabold tracking-[-0.04em] text-slate-950 sm:text-4xl">How it works</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 max-w-xl">
              From incoming bill or pre-alert email to verified system ledger — fully automated, fully auditable.
            </p>
          </div>
          <div className={styles.stage}>
            {enhanced && <nav className={styles.timeline} aria-label="How it works steps">
              <div className={styles.track}><span /></div>
              {steps.map((item, index) => <button
                key={item.step}
                type="button"
                className={styles.node}
                data-active={index === activeStep}
                data-complete={index < activeStep}
                aria-label={`Step ${item.step}: ${item.title}`}
                aria-current={index === activeStep ? 'step' : undefined}
                aria-controls={`how-it-works-step-${item.step}`}
                onClick={() => selectStep(index)}
              >{item.step}</button>)}
            </nav>}
            {steps.map((item, index) => <article
              key={item.step}
              id={`how-it-works-step-${item.step}`}
              className={styles.step}
              data-active={index === activeStep}
              data-side={index % 2 === 0 ? 'left' : 'right'}
              aria-hidden={enhanced && index !== activeStep ? true : undefined}
              style={{ '--step-ratio': index / (steps.length - 1) } as React.CSSProperties}
            >
              <div className={styles.copy}>
                <span className={styles.mobileNumber}>STEP {item.step}</span>
                <div className={styles.artifact}>{item.artifact}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <div className={styles.visual}><StepPreview index={index} /></div>
            </article>)}
          </div>
        </div>
      </div>
    </section>
  );
};
