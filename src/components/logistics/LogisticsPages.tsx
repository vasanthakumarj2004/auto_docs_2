'use client';

import React from 'react';
import Link from 'next/link';
import {
  Mail,
  Square,
  Crosshair,
  Diamond,
  Check,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { LandingNavigation } from '../LandingNavigation';
import { ShipsyFooter } from '../ShipsyFooter';
import { SharedFaqAccordion } from '../SharedFaqAccordion';
import { LandingClosingCta } from '../LandingClosingCta';
import {
  logisticsModules,
  sharedLogisticsCopy,
  type LogisticsSlug,
} from '../../content/logistics';
import { LogisticsCapabilitiesSection } from './LogisticsCapabilitiesSection';
import { LogisticsSectionHowItWorks } from './LogisticsSectionHowItWorks';
import { LogisticsScaleBenchmark } from './LogisticsScaleBenchmark';
import { EmailToBookingPage } from './EmailToBookingPage';
import { ShipmentOperationsPage } from './ShipmentOperationsPage';
import { ShipmentTrackingPage } from './ShipmentTrackingPage';
import { FreightIntelligencePage } from './FreightIntelligencePage';
import { LogisticsIntegrationsPage } from './LogisticsIntegrationsPage';
import base from '../LandingPage.module.css';
import s from './LogisticsPages.module.css';

interface LogisticsPageProps {
  slug: LogisticsSlug;
}

export function LogisticsPage({ slug }: LogisticsPageProps) {
  if (slug === 'RFQ-to-booking') {
    return <EmailToBookingPage />;
  }
  if (slug === 'shipment-operations') {
    return <ShipmentOperationsPage />;
  }
  if (slug === 'shipment-tracking') {
    return <ShipmentTrackingPage />;
  }
  if (slug === 'freight-intelligence') {
    return <FreightIntelligencePage />;
  }
  if (slug === 'integrations') {
    return <LogisticsIntegrationsPage />;
  }

  const moduleData = (logisticsModules as Record<string, any>)[slug];

  if (!moduleData) {
    return null;
  }

  const renderIcon = () => {
    switch (moduleData.iconName) {
      case 'envelope':
        return <Mail size={22} className="stroke-[2.2]" aria-hidden="true" />;
      case 'square':
        return <Square size={22} className="stroke-[2.2]" aria-hidden="true" />;
      case 'crosshair':
        return <Crosshair size={22} className="stroke-[2.2]" aria-hidden="true" />;
      case 'diamond':
        return <Diamond size={22} className="stroke-[2.2]" aria-hidden="true" />;
      default:
        return <Mail size={22} aria-hidden="true" />;
    }
  };

  return (
    <div className={`${base.page} ${s.page}`}>
      <a href="#main-content" className={base.skipLink}>
        Skip to content
      </a>

      {/* Global Navigation */}
      <LandingNavigation />

      <main id="main-content" style={{ flex: '1 0 auto' }}>
        {/* HERO SECTION */}
        <section className={s.viewportHero} aria-labelledby="hero-title">
          <div className={`site-shell ${base.heroGrid} ${s.heroGrid}`}>
            {/* Left Copy */}
            <div className={base.heroCopy}>
              <p className={s.eyebrow}>{moduleData.eyebrow}</p>

              <h1 id="hero-title" className={s.heroTitle}>
                {moduleData.heroTitle}
              </h1>

              <p className={s.heroDescription}>{moduleData.heroDescription}</p>

              <div className={s.heroActions}>
                <Link
                  href="/demo/#demo-form"
                  className={`button-primary ${base.heroButton}`}
                >
                  <span>{moduleData.primaryCtaText}</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>

                <Link
                  href="/#platform"
                  className={`button-secondary ${base.heroButton}`}
                >
                  <span>{moduleData.secondaryCtaText}</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div className={base.heroVisual} aria-label="Module status overview">
              <div className={s.heroCard}>
                <div className={s.heroCardHeader}>
                  <div className={s.heroCardTitleBlock}>
                    <div className={s.heroCardIconWrap}>{renderIcon()}</div>
                    <div>
                      <h2 className={s.heroCardTitle}>{moduleData.moduleName}</h2>
                      <p className={s.heroCardSubtitle}>Docsynecx Logistics Platform</p>
                    </div>
                  </div>
                  <span className={s.badge}>
                    <span className={s.badgePulse} aria-hidden="true" />
                    Live Review
                  </span>
                </div>

                {/* Status Badges */}
                <div className={s.heroBadgesRow}>
                    {
                      moduleData.cardBadges?.map((badge: string, idx: number) => (
                        <span key={badge} className={s.badge}>
                          {idx === 0 && <Sparkles size={12} aria-hidden="true" />}
                          {idx === 1 && <ShieldCheck size={12} aria-hidden="true" />}
                          {idx === 2 && <CheckCircle2 size={12} aria-hidden="true" />}
                          {badge}
                        </span>
                      ))
                    }
                </div>

                {/* Simulated Workflow Status Snapshot */}
                <div className={s.heroCardPreview}>
                  <div className={s.heroPreviewRow}>
                    <span className={s.heroPreviewLabel}>Workflow Status</span>
                    <span className={s.heroPreviewValue}>
                      <span className={s.badgePulse} aria-hidden="true" />
                      Active &amp; Monitoring
                    </span>
                  </div>
                  <div className={s.heroPreviewRow}>
                    <span className={s.heroPreviewLabel}>Review Checkpoint</span>
                    <span className={s.heroPreviewValue}>Review ready</span>
                  </div>
                  <div className={s.heroCardSkeleton} aria-hidden="true">
                    <span className={s.heroSkeletonBar} />
                    <span className={s.heroSkeletonBar} />
                    <span className={s.heroSkeletonBar} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: WHAT IT HELPS YOUR TEAM DO (Reusable across all 4 logistics pages) */}
        <LogisticsCapabilitiesSection slug={slug} />

        {/* SECTION 2: HOW IT WORKS */}
        <LogisticsSectionHowItWorks slug={slug} />

        {/* SECTION 3: SCALE BENCHMARK (Replaces Integration & Deployment) */}
        <LogisticsScaleBenchmark slug={slug} />

        {/* SECTION 4: FREQUENTLY ASKED QUESTIONS */}
        <section id="faq" className={`${base.section} ${base.alternate}`}>
          <div className="site-shell">
            <div className={s.faqLayout}>
              <div className={base.sectionHeading} style={{ textAlign: 'center', marginBottom: '32px' }}>
                <div>
                  <p className={s.eyebrow} style={{ justifyContent: 'center' }}>
                    {sharedLogisticsCopy.faqEyebrow}
                  </p>
                  <h2>{sharedLogisticsCopy.faqTitle}</h2>
                </div>
              </div>

              <SharedFaqAccordion
                items={sharedLogisticsCopy.faqs}
                defaultOpenIndex={0}
                toggleStyle="plus"
              />
            </div>
          </div>
        </section>

        <LandingClosingCta primaryHref="/demo/#demo-form" secondaryHref="/#platform" />
      </main>

      {/* Global Footer */}
      <ShipsyFooter />
    </div>
  );
}

export default LogisticsPage;
