'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ClosingVisualBg } from '../ClosingVisualBg';
import { financeClosing } from '../../content/finance';
import styles from './FinanceClosingCta.module.css';

interface FinanceClosingCtaProps {
  eyebrow?: string;
  title?: React.ReactNode;
  copy?: string;
  steps?: readonly string[] | string[];
  primaryHref?: string;
  primaryText?: string;
  secondaryHref?: string;
  secondaryText?: string;
}

export function FinanceClosingCta({
  eyebrow,
  title,
  copy,
  steps,
  primaryHref,
  primaryText,
  secondaryHref = '/finance-desk/#tools',
  secondaryText,
}: FinanceClosingCtaProps = {}) {
  const resolvedEyebrow = eyebrow ?? financeClosing.eyebrow;
  const resolvedTitle = title ?? (
    <>
      Bring ten invoices.<br /><span>We&apos;ll show you them in Tally.</span>
    </>
  );
  const resolvedCopy = copy ?? financeClosing.copy;
  // const resolvedSteps = steps ?? financeClosing.steps;
  const resolvedPrimaryHref = primaryHref ?? financeClosing.primaryHref;
  const resolvedPrimaryText = primaryText ?? financeClosing.primaryText;
  const resolvedSecondaryText = secondaryText ?? financeClosing.secondaryText;
  return (
    <section id="contact" className={styles.closing} aria-labelledby="closing-title">
      <div className="site-shell">
        <div className={styles.closingCard}>
          <div className={styles.closingBgPattern} aria-hidden="true">
            <ClosingVisualBg />
          </div>

          <div className={styles.closingContent}>
            {resolvedEyebrow && (
              <p className={styles.closingEyebrow}>{resolvedEyebrow}</p>
            )}
            <h2 id="closing-title" className={styles.closingTitle}>
              {resolvedTitle}
            </h2>

            <p className={styles.closingCopy}>
              {resolvedCopy}
            </p>

            {/* 3 Steps */}
            {/* <ol className={styles.stepList} aria-label="Demo onboarding steps">
              {resolvedSteps.map((step, idx) => (
                <li key={step} className={styles.stepItem}>
                  <span className={styles.stepNum}>{idx + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol> */}

            {/* Action Buttons */}
            <div className={styles.closingActions}>
              <Link
                href={resolvedPrimaryHref}
                className={styles.primaryBtn}
              >
                <span>{resolvedPrimaryText}</span>
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              {secondaryText && (
                <Link
                  href={secondaryHref}
                  className={styles.secondaryBtn}
                >
                  <span>{secondaryText}</span>
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
