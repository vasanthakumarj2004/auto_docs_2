'use client';

import React, { useState } from 'react';
import { Activity, ArrowUp, ChevronRight, FileText, MessageSquare, Plus, Search, TableProperties, Video, X } from 'lucide-react';
import { PipelineView } from './PipelineView';
import styles from './LivePipelinePanel.module.css';

interface LivePipelinePanelProps {
  isPaused: boolean;
  isPosted: boolean;
  onStateChange: (posted: boolean) => void;
  onTabChange: (index: number) => void;
}

const views = [
  { label: 'Live Pipeline', icon: Activity },
  { label: 'Finance Bill Queue', icon: TableProperties },
  { label: '2-Min Walkthrough', icon: Video },
];

export const LivePipelinePanel: React.FC<LivePipelinePanelProps> = ({ isPaused, isPosted, onStateChange, onTabChange }) => {
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <div className={styles.shell} data-live-pipeline-shell>
      <div className={styles.topbar}>
        <div className={styles.tabs} role="tablist" aria-label="Product preview views">
          {views.map(({ label, icon: Icon }, index) => (
            <button key={label} type="button" role="tab" aria-selected={index === 0}
              id={`live-preview-tab-${index}`} aria-controls={index === 0 ? 'live-preview-content' : undefined}
              tabIndex={index === 0 ? 0 : -1}
              onClick={() => onTabChange(index)}
              onKeyDown={(event) => {
                if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) {
                  event.preventDefault();
                  const next = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : event.key === 'ArrowRight' ? (index + 1) % 3 : (index + 2) % 3;
                  onTabChange(next);
                  requestAnimationFrame(() => {
                    const panel = document.querySelector('[data-hero-product-panel]');
                    panel?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
                  });
                }
              }} className={styles.tab}>
              <Icon size={13} aria-hidden="true" />
              <span>{label}</span>
              {index === 0 && <span className={styles.dot} />}
              {index === 1 && <span className={styles.count}>24</span>}
            </button>
          ))}
        </div>
        <span className={styles.telemetry}><span className={styles.dot} />Auto-sync telemetry</span>
      </div>

      <nav className={styles.workspaceTabs} aria-label="Pipeline workspace">
        {views.map(({ label, icon: Icon }, index) => (
          <button key={label} type="button" aria-current={index === 0 ? 'page' : undefined} onClick={() => onTabChange(index)}>
            {index !== 0 && <Icon size={14} aria-hidden="true" />}{label}
          </button>
        ))}
      </nav>

      <div className={styles.workspace} id="live-preview-content" role="tabpanel" aria-labelledby="live-preview-tab-0">
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <span>Live Pipeline</span>
            <button type="button" className={styles.search} onClick={() => onTabChange(1)} aria-label="Search bills in Finance Bill Queue">
              <Search size={12} aria-hidden="true" />Search
            </button>
          </div>
          <span className={styles.liveBadge}><ArrowUp size={11} aria-hidden="true" />Live Pipeline</span>
        </div>
        <div className={styles.graphViewport}>
          <PipelineView isPaused={isPaused} onStateChange={onStateChange} />
        </div>
      </div>

      <div className={styles.activity}>
        <button type="button" className={styles.billActivity} onClick={() => onTabChange(1)} aria-label="View Apex Freight in the bill queue">
          <span className={styles.documentIcon}><FileText size={19} aria-hidden="true" /><span>PDF</span></span>
          <span className={styles.activityCopy}><strong>Apex Freight</strong><span>Document captured, checks complete</span></span>
        </button>
        <button type="button" className={styles.postActivity} onClick={() => onTabChange(1)} aria-label="View invoice INV-8492 in the bill queue">
          <span className={styles.plusIcon}><Plus size={22} aria-hidden="true" /></span>
          <span className={styles.activityCopy}><strong>INV-8492</strong><span>{isPosted ? 'Posted to Tally' : 'Ready for posting'}</span></span>
          <span className={styles.activityArrow}><ChevronRight size={17} aria-hidden="true" /></span>
        </button>
      </div>

      <button type="button" className={styles.helpButton} onClick={() => setHelpOpen(!helpOpen)} aria-expanded={helpOpen} aria-controls="pipeline-help" aria-label={helpOpen ? 'Close pipeline help' : 'About this pipeline'}>
        {helpOpen ? <X size={19} /> : <MessageSquare size={21} fill="currentColor" />}
      </button>
      {helpOpen && <aside id="pipeline-help" className={styles.help}>
        <strong>From bill to books</strong>
        <p>This preview reads a bill, checks it, and creates a Tally voucher. Open Finance Bill Queue to inspect the demo bills.</p>
      </aside>}
    </div>
  );
};
