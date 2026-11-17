'use client';

import React from 'react';
import { Check } from 'lucide-react';
import base from '../LandingPage.module.css';
import styles from './MonthEndComparison.module.css';

interface WorkflowStep {
  step: string;
  description: string;
}

const manualSteps: WorkflowStep[] = [
  {
    step: 'Step 1',
    description: 'Download the PDF from email, open Tally',
  },
  {
    step: 'Step 2',
    description: 'Type the supplier, items, HSN codes and amounts',
  },
  {
    step: 'Step 3',
    description: 'Work out CGST and SGST and check them against the invoice',
  },
  {
    step: 'Step 4',
    description: 'Search old entries to make sure it isn\'t a duplicate',
  },
  {
    step: 'Step 5',
    description: 'Repeat for the next 200 invoices this month',
  },
];

const automatedSteps: WorkflowStep[] = [
  {
    step: 'Step 1',
    description: 'Invoice read from email, PDF or scan',
  },
  {
    step: 'Step 2',
    description: 'Supplier, GSTIN, HSN, items and tax picked up',
  },
  {
    step: 'Step 3',
    description: 'Tax totals checked against the line items',
  },
  {
    step: 'Step 4',
    description: 'Possible duplicates flagged for you',
  },
  {
    step: 'Step 5',
    description: 'You approve, and it posts to TallyPrime',
  },
];

export function MonthEndComparison() {
  return (
    <section
      id="month-end-comparison"
      className={styles.section}
      aria-labelledby="month-end-title"
    >
      <div className="site-shell">
        {/* Section Header */}
        <div className={styles.header}>
          <p className={styles.eyebrow}>
            MONTH-END REALITY
          </p>
          <h2 id="month-end-title" className={styles.headline}>
            Where month<span>-end goes</span>
          </h2>
          <p className={styles.subtitle}>
            Your team spends the month typing. Then there&apos;s no time to look at the numbers.
          </p>
        </div>

        {/* 2-Column Comparison Grid */}
        <div className={styles.comparisonGrid}>
          {/* Column 1: A typical invoice today (Manual / By Hand) */}
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>A typical invoice today</h3>
              <span className={styles.manualBadge}>by hand</span>
            </div>

            <ol className={styles.stepList}>
              {manualSteps.map((item, index) => (
                <li
                  key={item.step}
                  className={`${styles.stepItem} ${index === manualSteps.length - 1 ? styles.stepItemLast : ''}`}
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
              <h3 className={styles.cardTitle}>With Docsynecx</h3>
              <span className={styles.reviewBadge}>you review</span>
            </div>

            <ol className={styles.stepList}>
              {automatedSteps.map((item, index) => (
                <li
                  key={item.step}
                  className={`${styles.stepItem} ${index === automatedSteps.length - 1 ? styles.stepItemLast : ''}`}
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
          Docsynecx does the typing and checking. Your team reviews, approves and finally has time to read the reports.
        </p>
      </div>
    </section>
  );
}
