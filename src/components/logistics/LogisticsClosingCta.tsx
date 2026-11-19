'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ClosingVisualBg } from '../ClosingVisualBg';
import { demoHref } from '../../content/logisticsOverview';
import styles from '../finance/FinanceClosingCta.module.css';

export function LogisticsClosingCta() {
  const steps = [
    'Book a 30-minute demo',
    'Share a few recent enquiries',
    'See the drafted quotes, side by side with yours',
  ];

  return (
    <section id="contact" className={styles.closing} aria-labelledby="closing-title">
      <div className="site-shell">
        <div className={styles.closingCard}>
          <div className={styles.closingBgPattern} aria-hidden="true">
            <ClosingVisualBg />
          </div>

          <div className={styles.closingContent}>
            <p className={styles.closingEyebrow}>SEE IT ON YOUR OWN ENQUIRIES</p>
            <h2 id="closing-title" className={styles.closingTitle}>
              Bring last week&apos;s enquiries.<br />
              <span>We&apos;ll show you the quotes.</span>
            </h2>

            <p className={styles.closingCopy}>
              Send us a few real enquiries from last week. In the demo we&apos;ll show you the
              quotes Docsynecx would have drafted, and how fast. You could be live in about a week.
            </p>

            <ol className={styles.stepList} aria-label="Demo onboarding steps">
              {steps.map((step, idx) => (
                <li key={step} className={styles.stepItem}>
                  <span className={styles.stepNum}>{idx + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <div className={styles.closingActions}>
              <Link href={demoHref} className={styles.primaryBtn}>
                <span>Book a demo</span>
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link href="#how" className={styles.secondaryBtn}>
                See how it works
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
