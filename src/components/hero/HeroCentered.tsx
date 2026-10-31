'use client';

import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import styles from './HeroCentered.module.css';
import { useLandingLayout } from '../LandingLayoutProvider';

export function HeroCentered() {
  const { appearance } = useLandingLayout();
  return (
    <section className={styles.hero} data-hero-layout="v2" data-appearance={appearance} aria-labelledby="centred-hero-title">
      <div className={styles.content}>
        <div className={styles.eyebrow}><span />For businesses that run on Tally, an ERP, or CargoWise</div>
        <h1 id="centred-hero-title" className={styles.title}>
          <span>Grow the business.</span>
          <span className={styles.accent}>Not the data-entry desk.</span>
        </h1>
        <p className={styles.description}>
          Bills read, checked, paid and posted to Tally. Emails become CargoWise jobs.
          <span>Your team handles exceptions, not typing.</span>
        </p>
        <div className={styles.actions}>
          <Link href="/finance/" className={`desk-button ${styles.cta}`}>
            <span>Run a finance desk</span><ArrowRight size={19} aria-hidden="true" />
          </Link>
          <Link href="/logistics/" className={`desk-button ${styles.cta}`}>
            <span>Run the logistics desk</span><ArrowRight size={19} aria-hidden="true" />
          </Link>
        </div>
        <div className={styles.trust}>
          <span><Check size={15} aria-hidden="true" />Built around your approvals</span>
          <span><Check size={15} aria-hidden="true" />No rip-and-replace</span>
        </div>
      </div>
    </section>
  );
}
