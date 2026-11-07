'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './LandingPage.module.css';

export function LandingHero() {
  return (
    <section id="top" className={styles.hero} data-hero-layout="v2" data-appearance="dark" aria-labelledby="hero-title">
      <div className={`site-shell ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <h1 id="hero-title" className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-[-0.03em] leading-[1.12] -mt-10">
            Grow the business.<br /><span>Not the data-entry desk.</span>
          </h1>
          <p className={styles.heroDescription}>
            Bills read, checked, paid and posted to Tally. Emails become CargoWise jobs. Your team handles exceptions, not typing.
          </p>
          <div className={styles.heroActions}>
            <Link href="/finance/" className={`desk-button ${styles.heroButton} ${styles.financeButton}`}>
              I run a finance desk
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link href="/logistics/" className={`desk-button ${styles.heroButton} ${styles.logisticsButton}`}>
              I run a logistics desk
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link href="/demo/" className={`${styles.heroButton} ${styles.demoButton}`}>
              Book a demo
            </Link>
          </div>
          <p className={styles.trust}>
            <strong>Built for businesses</strong> that run on Tally, an ERP or CargoWise.
          </p>
        </div>
      </div>
    </section>
  );
}
