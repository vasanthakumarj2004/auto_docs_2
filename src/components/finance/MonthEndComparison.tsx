'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { financeProblem } from '../../content/finance';
import base from '../LandingPage.module.css';
import styles from './MonthEndComparison.module.css';

export function MonthEndComparison() {
  return (
    <section
      id="problem"
      className={styles.section}
      aria-labelledby="problem-h"
    >
      <div className="site-shell">
        {/* Section Header */}
        <div className={styles.header}>
          <p className={styles.eyebrow}>
            {financeProblem.eyebrow}
          </p>
          <h2 id="problem-h" className={styles.headline}>
            {financeProblem.headline}
          </h2>
        </div>

        {/* 2-Column Comparison Grid */}
        <div className={styles.comparisonGrid}>
          {/* Column 1: A typical invoice today (Manual / By Hand) */}
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>{financeProblem.manualTitle}</h3>
              <span className={styles.manualBadge}>{financeProblem.manualTag}</span>
            </div>

            <ol className={styles.stepList}>
              {financeProblem.manualSteps.map((item, index) => (
                <li
                  key={item.step}
                  className={`${styles.stepItem} ${index === financeProblem.manualSteps.length - 1 ? styles.stepItemLast : ''}`}
                >
                  <span className={styles.stepNumberManual}>{item.step}</span>
                  <span className={styles.stepDescription}>{item.description}</span>
                </li>
              ))}
            </ol>
          </article>

          {/* Column 2: With Docsynecx (Automated / You Review) */}
          <article className={`${styles.card} ${styles.cardAutomated}`}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>{financeProblem.automatedTitle}</h3>
              <span className={styles.reviewBadge}>{financeProblem.automatedTag}</span>
            </div>

            <ol className={styles.stepList}>
              {financeProblem.automatedSteps.map((item, index) => (
                <li
                  key={item.step}
                  className={`${styles.stepItem} ${index === financeProblem.automatedSteps.length - 1 ? styles.stepItemLast : ''}`}
                >
                  <div className={styles.stepLead}>
                    <Check size={14} className={styles.checkIcon} aria-hidden="true" />
                    <span className={styles.stepNumberAutomated}>{item.step}</span>
                  </div>
                  <span className={styles.stepDescriptionAutomated}>{item.description}</span>
                </li>
              ))}
            </ol>
          </article>
        </div>

        {/* Narrative Description matching .bottomDescription pattern */}
        <p className={base.bottomDescription}>
          {financeProblem.note}
        </p>
      </div>
    </section>
  );
}
