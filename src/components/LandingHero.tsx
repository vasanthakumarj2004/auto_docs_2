'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { HeroProductPanel } from './hero/HeroProductPanel';
import { useLandingLayout } from './LandingLayoutProvider';
import { LayoutSwitcher } from './LayoutSwitcher';
import styles from './LandingPage.module.css';

export function LandingHero() {
  const { layout } = useLandingLayout();

  return <>
    <section id="top" className={styles.hero} data-hero-layout={layout} data-appearance="dark" aria-labelledby="hero-title">
      <div className={`site-shell ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          {/* <p className={styles.eyebrow}>Intelligent workflows. Everyday progress.</p> */}
          <h1 id="hero-title" className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-[-0.03em] leading-[1.12] -mt-10">Grow the business.<br /><span>Not the data-entry desk.</span></h1>
          <p className={styles.heroDescription}>Bills read, checked, paid and posted to Tally. Emails become CargoWise jobs. Your team handles exceptions, not typing.</p>
          <div className={styles.heroActions}>
            <Link href="/finance/" className={`desk-button ${styles.heroButton} ${styles.financeButton}`}>I run a finance desk<ArrowRight size={16} aria-hidden="true" /></Link>
            <Link href="/logistics/" className={`desk-button ${styles.heroButton} ${styles.shipmentButton}`}>I run a shipment desk<ArrowRight size={16} aria-hidden="true" /></Link>
            {layout === 'v1' && <Link href="/demo/" className={`${styles.heroButton} ${styles.demoButton}`}>Book a demo</Link>}
          </div>
          <p className={styles.trust}><strong>Built for businesses</strong> that run on Tally, an ERP or CargoWise.</p>
        </div>
        {layout === 'v1' && <div className={styles.heroVisual}>
          <div className={styles.visualPanel}><HeroProductPanel /></div>
          <p className={styles.visualCaption}>Product preview · Illustrative document data</p>
        </div>}
      </div>
    </section>
    <LayoutSwitcher />
  </>;
}
