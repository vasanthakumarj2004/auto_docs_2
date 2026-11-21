'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ClosingVisualBg } from './ClosingVisualBg';
import styles from './LandingPage.module.css';

export function LandingClosingCta({
  primaryHref = '/demo/#demo-form',
  secondaryHref = '/#platform',
  title = 'What could your team do with less typing?',
  copy = 'Tell us which documents eat your team\'s day. In 30 minutes we\'ll show you a practical place to start, using your own bills or shipment emails.',
  buttonText = 'Book a demo',
}: {
  primaryHref?: string;
  secondaryHref?: string;
  title?: ReactNode;
  copy?: string;
  buttonText?: string;
}) {
  return (
    <section id="contact" className={styles.closing} aria-labelledby="closing-title">
      <div className="site-shell">
        <div className={styles.closingCard}>
          <div className={styles.closingBgPattern} aria-hidden="true">
            <ClosingVisualBg />
          </div>

          <div className={styles.closingContent}>
            <h2 id="closing-title" className={styles.closingTitle}>
              {title}
            </h2>
            <p className={styles.closingCopy}>
              {copy}
            </p>
            <div className={styles.closingActions}>
              <Link
                href={primaryHref}
                className={`${styles.demoButton} ${styles.closingPrimaryBtn}`}
                data-track="cta_click"
                data-track-name="closing_book_demo"
                data-track-location="closing_cta"
              >
                {buttonText}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
