'use client';

import React from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { LandingNavigation } from '../LandingNavigation';
import { LandingClosingCta } from '../LandingClosingCta';
import { ShipsyFooter } from '../ShipsyFooter';
import base from '../LandingPage.module.css';
import s from './PricingPage.module.css';

const FINANCE_STARTER_FEATURES = [
  'Core invoice automation workflow',
  'AI-powered document data extraction',
  'Document review and validation',
  'Accounting workflow integration, subject to plan scope',
  'Standard support and onboarding',
];

const FINANCE_PROFESSIONAL_FEATURES = [
  'Everything included in Starter',
  'Higher-volume document processing options',
  'Advanced workflow and validation requirements',
  'Expanded integration and configuration options',
  'Priority support and onboarding assistance',
];

const LOGISTICS_MODULES = [
  {
    moduleNumber: 'MODULE 01',
    title: 'Email-to-Booking',
    description:
      'Customer enquiry reading, vendor rate requests, rate comparison and quotation preparation.',
  },
  {
    moduleNumber: 'MODULE 02',
    title: 'Shipment Operations',
    description:
      'Job creation, shipment document extraction, validation and operating-system handoff.',
  },
  {
    moduleNumber: 'MODULE 03',
    title: 'Shipment Tracking',
    description:
      'Carrier and transporter updates, shipment milestones, ETA visibility and alerts.',
  },
  {
    moduleNumber: 'MODULE 04',
    title: 'Docsynecx Complete',
    description:
      'A combined approach across selected logistics modules, based on your operational requirements.',
  },
];

export function PricingPage() {
  return (
    <div className={s.page}>
      <a href="#main-content" className={base.skipLink}>
        Skip to content
      </a>

      {/* Global Navigation with Pricing Active */}
      <LandingNavigation />

      <main id="main-content" className={s.mainContent}>
        {/* SECTION 1 — HERO */}
        <section className={s.heroSection} aria-labelledby="pricing-hero-title">
          <div className="site-shell">
            <div className={s.heroContent}>
              <h1 id="pricing-hero-title" className={s.heroTitle}>
                Choose the right platform for your{' '}
                <span className={s.highlight}>workflow.</span>
              </h1>

              <p className={s.heroDescription}>
                Explore the available plans and modules across Docsynecx Finance and
                Docsynecx Logistics. We&apos;ll understand your requirements and help you
                choose the right fit.
              </p>

              <div className={s.heroActions}>
                <a href="#finance-plans" className={s.anchorPill}>
                  Finance Plans
                </a>
                <a href="#logistics-modules" className={s.anchorPill}>
                  Logistics Modules
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 — DOCSYNECX FINANCE */}
        <section
          id="finance-plans"
          className={s.section}
          aria-labelledby="finance-section-title"
        >
          <div className="site-shell">
            <div className={s.sectionHeader}>
              <p className={s.eyebrow}>DOCSYNECX FINANCE</p>
              <h2 id="finance-section-title" className={s.sectionTitle}>
                Simple plans for smarter finance operations.
              </h2>
              <p className={s.sectionSubtitle}>
                Choose between Starter and Professional based on your document
                processing and business workflow requirements.
              </p>
            </div>

            {/* Side-by-Side Dual Cards */}
            <div className={s.financeGrid}>
              {/* Card 1 — Starter */}
              <div className={`${s.planCard} ${s.starterCard}`}>
                <span className={s.planTag}>FINANCE PLAN 01</span>
                <h3 className={s.planTitle}>Starter</h3>
                <p className={s.planDescription}>
                  A practical starting point for businesses looking to simplify their
                  invoice and finance document workflows.
                </p>

                <ul className={s.featureList}>
                  {FINANCE_STARTER_FEATURES.map((feature) => (
                    <li key={feature} className={s.featureItem}>
                      <Check size={16} className={s.checkIcon} aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/demo/#demo-form"
                  className={s.buttonOutlined}
                  aria-label="Enquire about Starter finance plan"
                >
                  Enquire about Starter ↗
                </Link>
              </div>

              {/* Card 2 — Professional (Highlighted) */}
              <div className={`${s.planCard} ${s.professionalCard}`}>
                <span className={s.planTag}>FINANCE PLAN 02 · ADVANCED</span>
                <h3 className={s.planTitle}>Professional</h3>
                <p className={s.planDescription}>
                  For growing teams that need broader automation capabilities and a more
                  connected finance workflow.
                </p>

                <ul className={s.featureList}>
                  {FINANCE_PROFESSIONAL_FEATURES.map((feature) => (
                    <li key={feature} className={s.featureItem}>
                      <Check size={16} className={s.checkIcon} aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/demo/#demo-form"
                  className={s.buttonGreen}
                  aria-label="Enquire about Professional finance plan"
                >
                  Enquire about Professional ↗
                </Link>
              </div>
            </div>

            <p className={s.footnote}>
              Plan limits, included modules, credit allocation, integrations and support
              entitlements will be confirmed in the commercial proposal. No subscription
              amounts are displayed on this website.
            </p>
          </div>
        </section>

        {/* SECTION 3 — DOCSYNECX LOGISTICS */}
        <section
          id="logistics-modules"
          className={s.section}
          aria-labelledby="logistics-section-title"
        >
          <div className="site-shell">
            <div className={s.sectionHeader}>
              <p className={s.eyebrow}>DOCSYNECX LOGISTICS</p>
              <h2 id="logistics-section-title" className={s.sectionTitle}>
                Flexible modules for freight forwarding operations.
              </h2>
              <p className={s.sectionSubtitle}>
                Select the operational workflows you want to automate. Logistics pricing is
                scoped based on selected modules, shipment volumes, integrations and
                implementation requirements.
              </p>
            </div>

            {/* 2 x 2 Grid of White Cards */}
            <div className={s.logisticsGrid}>
              {LOGISTICS_MODULES.map((module) => (
                <div key={module.moduleNumber} className={s.moduleCard}>
                  <span className={s.moduleTag}>{module.moduleNumber}</span>
                  <h3 className={s.moduleTitle}>{module.title}</h3>
                  <p className={s.moduleDescription}>{module.description}</p>
                </div>
              ))}
            </div>

            <div className={s.logisticsActionBlock}>
              <Link
                href="/demo/#demo-form"
                className={s.buttonBlue}
                aria-label="Request Logistics Proposal"
              >
                Request Logistics Proposal ↗
              </Link>

              <p className={s.logisticsFootnote}>
                Freight Intelligence is presented separately as a roadmap capability;
                confirm availability before including it in a commercial scope.
              </p>
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

export default PricingPage;
