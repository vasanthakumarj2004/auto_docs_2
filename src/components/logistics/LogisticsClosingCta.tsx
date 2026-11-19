'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ClosingVisualBg } from '../ClosingVisualBg';
import { demoHref } from '../../content/logisticsOverview';
import styles from '../finance/FinanceClosingCta.module.css';

interface LogisticsClosingCtaProps {
  secondaryHref?: string;
  secondaryText?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  copy?: string;
  steps?: string[];
  primaryHref?: string;
  primaryText?: string;
}

export function LogisticsClosingCta({
  secondaryHref = '#how',
  secondaryText = 'See how it works',
  eyebrow = 'SEE IT ON YOUR OWN ENQUIRIES',
  title = (
    <>
      Bring last week&apos;s enquiries.<br />
      <span>We&apos;ll show you the quotes.</span>
    </>
  ),
  copy = 'Send us a few real enquiries from last week. In the demo we\'ll show you the quotes Docsynecx would have drafted, and how fast. You could be live in about a week.',
  steps = [
    'Book a 30-minute demo',
    'Share a few recent enquiries',
    'See the drafted quotes, side by side with yours',
  ],
  primaryHref = demoHref,
  primaryText = 'Book a demo',
}: LogisticsClosingCtaProps = {}) {

  return (
    <section id="contact" className={styles.closing} aria-labelledby="closing-title">
      <div className="site-shell">
        <div className={styles.closingCard}>
          <div className={styles.closingBgPattern} aria-hidden="true">
            <ClosingVisualBg />
          </div>

          <div className={styles.closingContent}>
            <p className={styles.closingEyebrow}>{eyebrow}</p>
            <h2 id="closing-title" className={styles.closingTitle}>
              {title}
            </h2>

            <p className={styles.closingCopy}>
              {copy}
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
              <Link href={primaryHref} className={styles.primaryBtn}>
                <span>{primaryText}</span>
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link href={secondaryHref} className={styles.secondaryBtn}>
                {secondaryText}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
