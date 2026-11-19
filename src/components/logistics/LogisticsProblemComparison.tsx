'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { logisticsProblem } from '../../content/logisticsOverview';
import styles from './LogisticsProblemComparison.module.css';

export function LogisticsProblemComparison() {
  return (
    <section
      id="problem"
      className={styles.section}
      aria-labelledby="problem-h"
    >
      <div className="site-shell">
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>{logisticsProblem.eyebrow}</span>
          <h2 id="problem-h" className={styles.headline}>
            {logisticsProblem.headline}{' '}
            <span>{logisticsProblem.accent}</span>
          </h2>
        </div>

        {/* 2-Column Comparison Grid */}
        <div className={styles.comparisonGrid}>
          {/* Column 1: One enquiry today ≈ 60+ min */}
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>{logisticsProblem.manualTitle}</h3>
              <span className={styles.manualBadge}>{logisticsProblem.manualTag}</span>
            </div>

            <ol className={styles.stepList}>
              {logisticsProblem.manualSteps.map((item, index) => (
                <li
                  key={item.time + item.description}
                  className={`${styles.stepItem} ${
                    index === logisticsProblem.manualSteps.length - 1 ? styles.stepItemLast : ''
                  }`}
                >
                  <span className={styles.stepTime}>{item.time}</span>
                  <span className={styles.stepDescription}>{item.description}</span>
                </li>
              ))}
            </ol>
          </article>

          {/* Column 2: With Docsynecx ≈ 15 min */}
          <article className={`${styles.card} ${styles.cardAutomated}`}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>{logisticsProblem.automatedTitle}</h3>
              <span className={styles.reviewBadge}>{logisticsProblem.automatedTag}</span>
            </div>

            <ol className={styles.stepList}>
              {logisticsProblem.automatedSteps.map((item, index) => (
                <li
                  key={item.time + item.description}
                  className={`${styles.stepItem} ${
                    index === logisticsProblem.automatedSteps.length - 1 ? styles.stepItemLast : ''
                  }`}
                >
                  <span className={styles.stepTimeAutomated}>
                    <Check size={13} aria-hidden="true" />
                    {item.time}
                  </span>
                  <span className={styles.stepDescriptionAutomated}>{item.description}</span>
                </li>
              ))}
            </ol>
          </article>
        </div>

        <p className={styles.note}>{logisticsProblem.note}</p>
      </div>
    </section>
  );
}
