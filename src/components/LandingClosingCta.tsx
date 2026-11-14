'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ClosingVisualBg } from './ClosingVisualBg';
import styles from './LandingPage.module.css';

export function LandingClosingCta({
  primaryHref = '/demo/#demo-form',
  secondaryHref = '/#platform',
}: {
  primaryHref?: string;
  secondaryHref?: string;
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
              What could your team do with less manual work?
            </h2>
            <p className={styles.closingCopy}>
              Tell us about your finance or freight workflow. We’ll help identify a practical place to start.
            </p>
            <div className={styles.closingActions}>
              <Link href={primaryHref} className={`${styles.demoButton} ${styles.closingPrimaryBtn}`}>
                Book a demo
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href={secondaryHref} className={`${styles.demoButton} ${styles.closingSecondaryBtn}`}>
                Explore platform
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
