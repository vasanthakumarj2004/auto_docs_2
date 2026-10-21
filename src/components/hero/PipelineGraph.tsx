'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Check, CheckCircle2, ChevronDown, FileSpreadsheet, FileText, MoreHorizontal } from 'lucide-react';
import styles from './PipelineGraph.module.css';

interface PipelineGraphProps {
  isPaused?: boolean;
  onStateChange?: (isPosted: boolean) => void;
}

type Phase = 'reading' | 'checking' | 'posted' | 'reset';
const CYCLE_SECONDS = 5.5;

export const PipelineGraph: React.FC<PipelineGraphProps> = ({ isPaused = false, onStateChange }) => {
  const [phase, setPhase] = useState<Phase>('reading');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const elapsedRef = useRef(0);
  const running = !isPaused && !reducedMotion && !pageHidden;
  const posted = reducedMotion || phase === 'posted';

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(preference.matches);
    const updateVisibility = () => setPageHidden(document.hidden);
    updateMotion();
    updateVisibility();
    preference.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      preference.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!running) return;
    let frame = 0;
    let previous = 0;
    let lastPhase: Phase | undefined;
    const tick = (now: number) => {
      if (previous) elapsedRef.current += (now - previous) / 1000;
      previous = now;
      const time = elapsedRef.current % CYCLE_SECONDS;
      const next: Phase = time < 0.65 ? 'reading' : time < 1.8 ? 'checking' : time < 5.1 ? 'posted' : 'reset';
      // React only updates at state boundaries. SVG/CSS handle continuous motion.
      if (next !== lastPhase) { setPhase(next); lastPhase = next; }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running]);

  useEffect(() => { onStateChange?.(posted); }, [posted, onStateChange]);

  return (
    <div className={styles.scene} data-pipeline-scene data-phase={phase} data-posted={posted} data-running={running}
      role="img" aria-label="Illustrative workflow: an incoming Apex Freight bill is read and checked, then a voucher is posted to Tally Prime.">
      <svg className={styles.connections} viewBox="0 0 800 370" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <path className={styles.incomingTrack} d="M16 258H167C225 258 208 149 265 149" />
        <path className={styles.straightTrack} d="M177 149H265" />
        <path className={styles.arrow} d="m260 145 5 4-5 4" />
        <path className={`${styles.packet} ${styles.incomingPacket}`} pathLength="100" d="M177 149H265" />
        <path className={`${styles.packet} ${styles.lowerPacket}`} pathLength="100" d="M16 258H167C225 258 208 149 265 149" />
        <path className={styles.elbowTrack} d="M453 149H466Q482 149 482 165V254Q482 272 500 272H516" />
        <path className={`${styles.packet} ${styles.elbowPacket}`} pathLength="100" d="M453 149H466Q482 149 482 165V254Q482 272 500 272H516" />
        <circle className={styles.inputHalo} cx="265" cy="149" r="12" />
        <circle className={styles.port} cx="265" cy="149" r="5" />
        <circle className={styles.outputPort} cx="453" cy="149" r="4" />
        <circle className={styles.destinationHalo} cx="516" cy="272" r="11" />
        <circle className={styles.destinationPort} cx="516" cy="272" r="5" />
      </svg>

      <div className={styles.incoming}>
        <div className={styles.stepHeading}>
          <div className={styles.stepLine}><span className={styles.kicker}>Step 01</span><span className={styles.ingestion}>Ingestion</span></div>
          <h3>Incoming bill</h3>
          <p>Email &middot; PDF &middot; Scan</p>
        </div>
        <div className={styles.invoice}>
          <div className={styles.invoiceHeading}>
            <span className={styles.pdf}><FileText size={17} /><b>PDF</b></span>
            <span><strong>Apex Freight</strong><small>Apex Freight</small></span>
            <FileText size={10} className={styles.smallFile} />
          </div>
          <div className={styles.amount}><span>Invoice</span><strong>&#8377;1,42,000</strong></div>
          <div className={styles.invoiceLines}><span /><span /><span /></div>
          <div className={styles.invoiceFooter}><span>Captured</span><span>INV-8492</span></div>
        </div>
      </div>

      <div className={styles.reading}>
        <div className={styles.stepHeading}>
          <span className={styles.kicker}>Step 02</span>
          <h3>Reading &amp; Check</h3>
          <p>Reconciliation telemetry</p>
        </div>
        <div className={styles.extraction}>
          <div className={styles.extractionTop}>
            <span className={styles.sheetIcon}><FileSpreadsheet size={20} /></span>
            <MoreHorizontal size={16} />
          </div>
          <div className={styles.extractionText}><span><strong>Bill Extraction</strong><small>Ready to post</small></span><ChevronDown size={12} /></div>
          <div className={styles.scanBeam} aria-hidden="true" />
        </div>
      </div>

      <div className={styles.result}>
        <div className={styles.stackBack} aria-hidden="true" />
        <div className={styles.stackMiddle} aria-hidden="true" />
        <div className={`${styles.resultCard} ${styles.extractorCard}`} aria-hidden={posted}>
          <div className={styles.resultTitle}><h3>AI Extractor</h3><span className={styles.done}>Done</span></div>
          <p className={styles.resultSubtitle}>Response Telemetry</p>
          <div className={styles.checkGroup}>
            <span className={styles.fieldLabel}>Returns</span>
            <div className={styles.chips}><span><CheckCircle2 size={10} />Matched 2B</span><span>Verified</span></div>
          </div>
          <div className={styles.progressGroup}>
            <span className={styles.fieldLabel}>Timestamp</span><strong>4.2s</strong>
            <div className={styles.progressTrack}><span /></div>
          </div>
          <div className={styles.bottomChecks}>
            <div className={styles.chips}><span>Matched 2B</span><span>Verified</span></div>
            <span className={styles.audit}>Batch 04.08</span>
          </div>
        </div>

        <div className={`${styles.resultCard} ${styles.voucherCard}`} aria-hidden={!posted}>
          <span className={styles.ribbon}>Tally Prime</span>
          <div className={styles.tallyMark}><span>Tally</span><small>Truly Powerful</small></div>
          <div className={styles.voucherTitle}><strong>Tally Prime</strong><span>Synced</span></div>
          <p className={styles.voucherCaption}>Auto-voucher created</p>
          <div className={styles.voucherWell}>
            <CheckCircle2 size={14} className={styles.voucherCheck} />
            <strong>Auto-voucher created</strong>
            <span className={styles.voucherNumber}>#PUR-8492</span>
            <div className={styles.postedBar}><Check size={14} /><span>Posted</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};
