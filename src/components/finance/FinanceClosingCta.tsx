'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ClosingVisualBg } from '../ClosingVisualBg';
import { financeClosing } from '../../content/finance';
import styles from './FinanceClosingCta.module.css';

export function FinanceClosingCta() {
  return (
    <section id="contact" className={styles.closing} aria-labelledby="closing-title">
      <div className="site-shell">
        <div className={styles.closingCard}>
          <div className={styles.closingBgPattern} aria-hidden="true">
            <ClosingVisualBg />
          </div>

          <div className={styles.closingContent}>
            <h2 id="closing-title" className={styles.closingTitle}>
              Bring ten invoices.<br />We&apos;ll show you them in Tally.
            </h2>

            <p className={styles.closingCopy}>
              {financeClosing.copy}
            </p>

            {/* 3 Steps */}
            <ol className={styles.stepList} aria-label="Demo onboarding steps">
              {financeClosing.steps.map((step, idx) => (
                <li key={step} className={styles.stepItem}>
                  <span className={styles.stepNum}>{idx + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            {/* 2 Buttons */}
            <div className={styles.closingActions}>
              <Link
                href={financeClosing.primaryHref}
                className={styles.primaryBtn}
              >
                <span>{financeClosing.primaryText}</span>
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link
                href={financeClosing.secondaryHref}
                className={styles.secondaryBtn}
              >
                {financeClosing.secondaryText}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
