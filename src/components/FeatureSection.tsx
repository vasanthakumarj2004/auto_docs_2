'use client';
import React, { useEffect, useRef, useState, ReactNode } from 'react';
import { Check, FileText, ArrowDown } from 'lucide-react';
import { DeskDocumentPreview } from './DeskDocumentPreview';
import styles from './FeatureSection.module.css';

interface FeatureSectionProps {
  id: string;
  label: string;
  title: string;
  copy: string;
  steps: [string, string, string][];
  visual?: ReactNode;
  visualType?: 'finance' | 'logistics';
  reverse?: boolean;
}

const stepEyebrowsMap: Record<string, string[]> = {
  finance: [
    '01 · INVOICE & GST INTELLIGENCE',
    '02 · APPROVAL & TALLY SYNC',
    '03 · DUPLICATE GUARDRAILS',
  ],
  logistics: [
    '01 · INBOX TO STRUCTURED JOB',
    '02 · MULTI-DOCUMENT RECONCILIATION',
    '03 · CUSTOMS & FREIGHT AP ALIGNMENT',
  ],
};

const stepBadgesMap: Record<string, string[][]> = {
  finance: [
    ['✓ GSTIN & HSN/SAC rates verified', '✓ 100% line-item & tax math extraction'],
    ['✓ Multi-level approval recorded', '✓ Direct XML push to Tally voucher #829'],
    ['✓ Cross-checked against historical vendor ledger', '✓ Automatic duplicate hold before payout'],
  ],
  logistics: [
    ['✓ Auto-ingest attachment-heavy booking emails', '✓ Instant shipper, consignee & port mapping'],
    ['✓ Container, seal, weight & package count matched', '✓ Read & cross-checked in 110s'],
    ['✓ HS codes & commercial invoice values verified', '✓ Ready for CargoWise eAdaptor posting'],
  ],
};

const breadcrumbsMap: Record<string, string[]> = {
  finance: [
    'AutoDocs · Read & GST-check',
    'AutoDocs · Approve & post to Tally',
    'AutoDocs · Duplicate protection',
  ],
  logistics: [
    'AutoDocs · Booking intake',
    'AutoDocs · Document cross-check',
    'AutoDocs · CargoWise & AP sync',
  ],
};

export const FeatureSection: React.FC<FeatureSectionProps> = ({
  id, label, title, copy, steps, visual, visualType, reverse = false,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [syncVisible, setSyncVisible] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const syncRef = useRef<HTMLDivElement>(null);
  const isFinance = visualType === 'finance';
  const eyebrows = visualType ? stepEyebrowsMap[visualType] : [];
  const badges = visualType ? stepBadgesMap[visualType] : [];
  const breadcrumbs = visualType ? breadcrumbsMap[visualType] : [];

  useEffect(() => {
    const grid = gridRef.current;
    const summary = copyRef.current;
    const preview = previewRef.current;
    if (!grid || !summary || !preview) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      grid.style.setProperty('--desk-left-height', `${summary.offsetHeight}px`);
      const stages = Array.from(preview.querySelectorAll<HTMLElement>('[data-desk-stage]'));
      const readingLine = Math.max(120, Math.min(240, window.innerHeight * 0.3));
      let next = 0;
      stages.forEach((stage, index) => {
        if (stage.getBoundingClientRect().top <= readingLine) next = index;
      });
      setActiveStep(next);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(summary);
    resizeObserver.observe(preview);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  useEffect(() => {
    const footer = syncRef.current;
    if (!footer) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSyncVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.25 });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const selectStep = (index: number) => {
    const stage = previewRef.current?.querySelectorAll<HTMLElement>('[data-desk-stage]')[index];
    if (!stage) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: window.scrollY + stage.getBoundingClientRect().top - 112,
      behavior: reducedMotion ? 'instant' : 'smooth',
    });
  };

  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-desk-title`}>
      <div ref={gridRef} className={`site-shell ${styles.deskGrid} ${reverse ? styles.deskGridReversed : ''}`}>
        <div ref={copyRef} className={styles.stickyLeft}>
          <span className="section-label font-mono text-[11px] font-bold uppercase tracking-wider text-brand-violet">{label}</span>
          <h2 id={`${id}-desk-title`} className="mt-3 max-w-xl text-3xl font-extrabold leading-[1.15] tracking-[-0.05em] text-slate-950 sm:text-4xl">{title}</h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-slate-600">{copy}</p>
          <ol className={styles.stepList}>
            {steps.map(([num, stepTitle, stepDesc], index) => (
              <li key={num}>
                <button type="button" className={styles.stepLink}
                  data-active={activeStep === index}
                  aria-current={activeStep === index ? 'step' : undefined}
                  aria-controls={`${id}-desk-stage-${index}`}
                  onClick={() => selectStep(index)}>
                  <span className={styles.stepDash} aria-hidden="true" />
                  <span><strong>{stepTitle}</strong><span className={styles.stepDescription}>{stepDesc}</span></span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div ref={previewRef} className={styles.preview} aria-label={`${label} illustrative workflow`}>
          <div className={styles.windowBar}>
            <span><FileText size={15} aria-hidden="true" />{breadcrumbs?.[0] || 'AutoDocs Telemetry'}</span>
            <span className={styles.statusPill}>{isFinance ? 'Ready to post' : 'Live'}</span>
          </div>
          <div id={`${id}-desk-stage-0`} data-desk-stage="0" className={styles.documentStage}>
            {visualType ? <DeskDocumentPreview type={visualType} /> : visual}
          </div>

          <div className={styles.extractionBar}>
            <span>{isFinance ? 'Bill review' : 'BL ↔ Packing List ↔ Invoice'}</span>
            <span className={styles.confidence}>{isFinance ? 'AI Field Confidence: 99.9%' : '✓ Read & cross-checked in 110s'}</span>
          </div>

          <div className={styles.checkSection}>
            <div className={styles.eyebrow}>{eyebrows?.[0]}</div>
            <div className={styles.fields}>
              {(isFinance ? [
                ['Tax invoice', 'INV #829 · FY 2024-25'],
                ['GSTIN', '33AABCP1234A1Z5'],
                ['Prime Components', '4 line items · 18% GST'],
                ['Total', '₹74,095'],
              ] : [
                ['Origin → destination', 'INMAA → SGSIN'],
                ['Shipment', "1 x 40' HC · Sea export"],
                ['CargoWise job', 'S00038421'],
                ['BL ↔ Packing List ↔ Invoice', '18,400 kg · 0 Discrepancies'],
              ]).map(([field, value]) => <div key={field}><span>{field}</span><strong>{value}</strong></div>)}
            </div>
            <ul className={styles.checkList}>{badges?.[0]?.map(badge => <li key={badge}>{badge}</li>)}</ul>
          </div>

          {steps.slice(1).map(([num, stepTitle, stepDesc], offset) => {
            const index = offset + 1;
            return <div key={num} id={`${id}-desk-stage-${index}`} data-desk-stage={index}
              className={styles.checkSection} data-active={activeStep === index}>
              <div className={styles.eyebrow}>{eyebrows?.[index]}</div>
              <h3 className={styles.stageTitle}>{stepTitle}</h3>
              <p className={styles.stageDescription}>{stepDesc}</p>
              <ul className={styles.checkList}>{badges?.[index]?.map(badge => <li key={badge}>{badge}</li>)}</ul>
              <div className={styles.resultRow}>
                <Check size={16} aria-hidden="true" />
                {isFinance
                  ? index === 1 ? 'Approval recorded' : 'No duplicate bill found'
                  : index === 1 ? '3 documents cross-checked · ready for review' : 'Customs HS & Freight Payables Aligned · Ready for CargoWise eAdaptor posting'}
              </div>
              {isFinance && index === 2 && <p className={styles.auditNote}>Scanned 1,420 historical vouchers · Repeated Invoice #INV-1104 held automatically</p>}
            </div>;
          })}

          <div className={styles.summaryRow}>
            <strong>{isFinance ? 'GST & line items totals verified' : '✓ Read & cross-checked in 110s'}</strong>
            <span><ArrowDown size={14} aria-hidden="true" />{isFinance ? 'XML Sync Active' : 'eAdaptor XML Payload Ready'}</span>
          </div>
          <div ref={syncRef} className={styles.syncFooter} data-visible={syncVisible}>
            <div className={styles.syncHeading}>
              <span>{breadcrumbs?.[isFinance ? 1 : 2]}</span>
              <span className={styles.syncStatus}>{isFinance ? 'Posted to Tally: voucher #829' : 'Job created'}</span>
            </div>
            <div className={styles.syncTrack} aria-hidden="true"><span /></div>
            <div className={styles.syncChecks}>
              {(isFinance ? ['GST & line items totals verified', 'Approval recorded', 'No duplicate bill found']
                : ['3 documents cross-checked · ready for review', 'CargoWise job · S00038421', 'Customs HS & Freight Payables Aligned'])
                .map((text, index) => <span key={text} style={{ '--sync-index': index } as React.CSSProperties}><Check size={14} aria-hidden="true" />{text}</span>)}
            </div>
          </div>
          <p className={styles.caption}>{isFinance ? 'Same review workflow, your approval rules, zero retyping.' : 'From attachment-heavy email to structured shipment.'}</p>
          <p className={styles.disclaimer}>{isFinance ? 'Illustrative workflow · your approvals rules, your books' : 'Illustrative workflow · from email to structured shipment'}</p>
        </div>
      </div>
    </section>
  );
};
