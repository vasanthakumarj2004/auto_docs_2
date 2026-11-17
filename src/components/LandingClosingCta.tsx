'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ClosingVisualBg } from './ClosingVisualBg';
import styles from './LandingPage.module.css';

export function LandingClosingCta({
  primaryHref = '/demo/#demo-form',
  secondaryHref = '/#platform',
  title = 'What could your team do with less manual work?',
  copy = 'Tell us about your finance or freight workflow. We’ll help identify a practical place to start.',
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
              <Link href={primaryHref} className={`${styles.demoButton} ${styles.closingPrimaryBtn}`}>
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
