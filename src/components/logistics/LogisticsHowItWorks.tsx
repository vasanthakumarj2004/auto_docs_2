'use client';

import React from 'react';
import { useAutoCycle } from '@/src/hooks/useAutoCycle';
import { logisticsHowItWorks } from '../../content/logisticsOverview';
import styles from './LogisticsHowItWorks.module.css';

export function LogisticsHowItWorks() {
  const { active, goTo, containerProps } = useAutoCycle({
    itemCount: logisticsHowItWorks.steps.length,
    interval: 3500,
    resumeDelay: 5000,
  });

  const currentStep = logisticsHowItWorks.steps[active] || logisticsHowItWorks.steps[0];

  // Helper to determine status badge variant
  const getBadgeType = (badge: string) => {
    const lower = badge.toLowerCase();
    if (lower.includes('wait') || lower.includes('clear') || lower.includes('delay') || lower.includes('missing')) {
      return styles.wait;
    }
    if (lower.includes('ready') || lower.includes('complete') || lower.includes('done')) {
      return styles.ok;
    }
    return styles.info;
  };

  return (
    <section id="how" className={`${styles.section} ${styles.howSectionDark}`} aria-labelledby="how-h">
      <div className="site-shell">
        <div className={styles.secHead}>
          <p className={styles.eyebrow}>{logisticsHowItWorks.eyebrow}</p>
          <h2 id="how-h" className={styles.headline}>
            {logisticsHowItWorks.headline}
            <br />
            <span>{logisticsHowItWorks.accent}</span>
          </h2>
          <p className={styles.lead}>{logisticsHowItWorks.description}</p>
        </div>

        <div className={styles.howGrid} {...containerProps}>
          {/* Step selection tablist matching InvoiceAutomationPage */}
          <div className={styles.stepsList} role="tablist" aria-label="Workflow steps">
            {logisticsHowItWorks.steps.map((step, idx) => {
              const isActive = active === idx;
              return (
                <button
                  key={step.number}
                  type="button"
                  role="tab"
                  id={`how-tab-${step.number}`}
                  aria-selected={isActive}
                  aria-controls={`how-panel-${step.number}`}
                  className={`${styles.stepButtonDark} ${isActive ? styles.stepButtonDarkActive : ''}`}
                  onClick={() => goTo(idx)}
                >
                  <span className={styles.stepNumDark}>{step.number}</span>
                  <div className={styles.stepBodyDark}>
                    <strong>{step.title}</strong>
                    <span>{step.description}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Step live panel matching InvoiceAutomationPage */}
          <div>
            <div
              id={`how-panel-${currentStep.number}`}
              role="tabpanel"
              aria-labelledby={`how-tab-${currentStep.number}`}
              className={styles.stepPanelDark}
            >
              <div className={styles.panelBarDark}>
                <span>{currentStep.panelTitle}</span>
                <span className={`${styles.statusBadge} ${getBadgeType(currentStep.panelBadge)}`}>
                  {currentStep.panelBadge}
                </span>
              </div>

              <div className={styles.panelBodyDark}>
                {/* Step 1 View: Freight enquiry inbox list */}
                {active === 0 && 'items' in currentStep && currentStep.items && (
                  <div className={styles.qcardRowsDark}>
                    {currentStep.items.map((item) => (
                      <div key={item.who} className={styles.qcardRowDark}>
                        <span className={styles.rowWhoDark}>{item.who}</span>
                        <span className={styles.rowWhatDark}>{item.what}</span>
                        <span
                          className={`${styles.statusBadge} ${
                            item.statusType === 'wait' ? styles.wait : styles.info
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Step 2 View: Rate comparison table & total box */}
                {active === 1 && 'rates' in currentStep && currentStep.rates && (
                  <>
                    <div className={styles.tableScroll} role="region" aria-label="Vendor rate comparison" tabIndex={0}>
                    <table className={styles.dataTableDark}>
                      <thead>
                        <tr>
                          <th>Vendor</th>
                          <th>Transit</th>
                          <th>Free days</th>
                          <th style={{ textAlign: 'right' }}>Per box</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentStep.rates.map((rate) => (
                          <tr
                            key={rate.vendor}
                            className={rate.best ? styles.bestRowDark : undefined}
                          >
                            <td>
                              <strong>{rate.vendor}</strong>
                              {rate.best && <span className={styles.bestBadge}>BEST</span>}
                            </td>
                            <td>{rate.transit}</td>
                            <td>{rate.freeDays}</td>
                            <td
                              style={{
                                textAlign: 'right',
                                fontWeight: rate.best ? 700 : 500,
                                color: rate.best ? '#15803d' : 'inherit',
                              }}
                            >
                              {rate.rate}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    </div>

                    {'quoteTotal' in currentStep && (
                      <div className={styles.qtotalDark}>
                        <span className={styles.totalMetaDark}>{currentStep.quoteTotalLabel}</span>
                        <span className={styles.totalBigDark}>{currentStep.quoteTotal}</span>
                      </div>
                    )}
                  </>
                )}

                {/* Step 3 View: Document checks against B/L and Packing List */}
                {active === 2 && 'checks' in currentStep && currentStep.checks && (
                  <div className={styles.tableScroll} role="region" aria-label="Document comparison" tabIndex={0}>
                  <table className={styles.dataTableDark}>
                    <thead>
                      <tr>
                        <th>Field</th>
                        <th>B/L</th>
                        <th>Packing list</th>
                        <th style={{ textAlign: 'right' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentStep.checks.map((chk) => (
                        <tr key={chk.field}>
                          <td>
                            <strong>{chk.field}</strong>
                          </td>
                          <td
                            style={{
                              color: chk.match ? '#0f172a' : '#b45309',
                              fontWeight: chk.match ? 400 : 600,
                            }}
                          >
                            {chk.bl}
                          </td>
                          <td
                            style={{
                              color: chk.match ? '#0f172a' : '#b45309',
                              fontWeight: chk.match ? 400 : 600,
                            }}
                          >
                            {chk.pl}
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <span
                              className={`${styles.statusBadge} ${chk.match ? styles.ok : styles.wait}`}
                            >
                              {chk.match ? 'Match' : 'Mismatch'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                )}

                {/* Step 4 View: Tracking milestones with connected status nodes */}
                {active === 3 && 'milestones' in currentStep && currentStep.milestones && (
                  <div className={styles.trackListDark}>
                    {currentStep.milestones.map((ms, index) => {
                      const isLast = index === currentStep.milestones!.length - 1;
                      return (
                        <div key={ms.label} className={styles.trackItemDark}>
                          <div className={styles.trackDotCol}>
                            <span
                              className={`${styles.trackDot} ${
                                ms.status === 'done'
                                  ? styles.dotOk
                                  : ms.status === 'late'
                                  ? styles.dotLate
                                  : styles.dotPending
                              }`}
                            />
                            {!isLast && <span className={styles.trackLine} />}
                          </div>
                          <div className={styles.trackContentDark}>
                            <span
                              className={
                                ms.status === 'late'
                                  ? styles.trackTitleLate
                                  : styles.trackTitleDark
                              }
                            >
                              {ms.label}
                            </span>
                            <span className={styles.trackDateDark}>{ms.date}</span>
                          </div>
                          <span
                            className={`${styles.statusBadge} ${
                              ms.status === 'done'
                                ? styles.ok
                                : ms.status === 'late'
                                ? styles.wait
                                : styles.pendingBadge
                            }`}
                          >
                            {ms.status === 'done'
                              ? 'Completed'
                              : ms.status === 'late'
                              ? 'Delay'
                              : 'Pending'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <p className={styles.panelFootDark}>
                <strong>{currentStep.panelFoot.split('.')[0]}.</strong>{' '}
                {currentStep.panelFoot.split('.').slice(1).join('.').trim()}
              </p>
            </div>
            <p className={styles.howNoteDark}>Sample data · Example product view</p>
          </div>
        </div>
      </div>
    </section>
  );
}
