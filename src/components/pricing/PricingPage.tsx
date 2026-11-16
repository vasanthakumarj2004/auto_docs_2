'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, ArrowUpRight } from 'lucide-react';
import { LandingNavigation } from '../LandingNavigation';
import { ShipsyFooter } from '../ShipsyFooter';
import s from './PricingPage.module.css';

interface FinancePlan {
  id: string;
  planNumber: string;
  name: string;
  description: string;
  isAdvanced?: boolean;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
}

const FINANCE_PLANS: FinancePlan[] = [
  {
    id: 'starter',
    planNumber: 'Finance Plan 01',
    name: 'Starter',
    description:
      'A practical starting point for businesses looking to simplify their invoice and finance document workflows.',
    isAdvanced: false,
    features: [
      'Core invoice automation workflow',
      'AI-powered document data extraction',
      'Document review and validation',
      'Accounting workflow integration, subject to plan scope',
      'Standard support and onboarding',
    ],
    ctaLabel: 'Enquire about Starter',
    ctaHref: '/demo/#demo-form',
  },
  {
    id: 'professional',
    planNumber: 'Finance Plan 02 · Advanced',
    name: 'Professional',
    description:
      'For growing teams that need broader automation capabilities and a more connected finance workflow.',
    isAdvanced: true,
    features: [
      'Everything included in Starter',
      'Higher-volume document processing options',
      'Advanced workflow and validation requirements',
      'Expanded integration and configuration options',
      'Priority support and onboarding assistance',
    ],
    ctaLabel: 'Enquire about Professional',
    ctaHref: '/demo/#demo-form',
  },
];

interface LogisticsModule {
  id: string;
  moduleNumber: string;
  title: string;
  description: string;
}

const LOGISTICS_MODULES: LogisticsModule[] = [
  {
    id: 'module-01',
    moduleNumber: 'Module 01',
    title: 'Email-to-Booking',
    description:
      'Customer enquiry reading, vendor rate requests, rate comparison and quotation preparation.',
  },
  {
    id: 'module-02',
    moduleNumber: 'Module 02',
    title: 'Shipment Operations',
    description:
      'Job creation, shipment document extraction, validation and operating-system handoff.',
  },
  {
    id: 'module-03',
    moduleNumber: 'Module 03',
    title: 'Shipment Tracking',
    description:
      'Carrier and transporter updates, shipment milestones, ETA visibility and alerts.',
  },
  {
    id: 'module-04',
    moduleNumber: 'Module 04',
    title: 'Docsynecx Complete',
    description:
      'A combined approach across selected logistics modules, based on your operational requirements.',
  },
];

export function PricingPage() {
  const [activeTab, setActiveTab] = useState<'finance' | 'logistics'>('finance');

  const scrollToSection = (id: string, tab: 'finance' | 'logistics') => {
    setActiveTab(tab);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={s.page}>
      <a href="#main-content" className={s.skipLink}>
        Skip to content
      </a>

      {/* Global Navigation */}
      <LandingNavigation />

      <main id="main-content" className={s.mainContent}>
        {/* HERO HEADER SECTION */}
        <section className={s.heroSection} aria-labelledby="pricing-hero-title">
          <div className="site-shell">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className={s.breadcrumb}>
              <Link href="/" className={s.breadcrumbLink}>
                Home
              </Link>
              <span className={s.breadcrumbSeparator} aria-hidden="true">
                /
              </span>
              <span className={s.breadcrumbCurrent} aria-current="page">
                Pricing
              </span>
            </nav>

            <div className={s.heroWrapper}>
              <div className={s.eyebrowWrapper}>
                <p className={s.eyebrow}>Docsynecx plans</p>
              </div>

              <h1 id="pricing-hero-title" className={s.heroTitle}>
                Choose the right platform for your workflow.
              </h1>

              <p className={s.heroSubtitle}>
                Explore the available plans and modules across Docsynecx Finance and Docsynecx
                Logistics. We’ll understand your requirements and help you choose the right fit.
              </p>

              {/* Category Switcher Tabs */}
              <div className={s.tabSwitcher} role="tablist" aria-label="Pricing categories">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'finance'}
                  onClick={() => scrollToSection('finance-plans', 'finance')}
                  className={`${s.tabButton} ${activeTab === 'finance' ? s.tabButtonActive : ''}`}
                >
                  Finance Plans
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'logistics'}
                  onClick={() => scrollToSection('logistics-modules', 'logistics')}
                  className={`${s.tabButton} ${activeTab === 'logistics' ? s.tabButtonActive : ''}`}
                >
                  Logistics Modules
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 1. DOCSYNECX FINANCE SECTION */}
        <section
          id="finance-plans"
          className={s.financeSection}
          aria-labelledby="finance-section-title"
        >
          <div className="site-shell">
            <div className={s.sectionHeader}>
              <div className={s.eyebrowWrapper}>
                <p className={s.eyebrow}>Docsynecx Finance</p>
              </div>
              <h2 id="finance-section-title" className={s.sectionTitle}>
                Simple plans for smarter finance operations.
              </h2>
              <p className={s.sectionSubtitle}>
                Choose between Starter and Professional based on your document processing and business
                workflow requirements.
              </p>
            </div>

            {/* Finance Plans Grid (Starter & Professional) */}
            <div className={s.financeGrid}>
              {FINANCE_PLANS.map((plan) => (
                <article
                  key={plan.id}
                  className={`${s.planCard} ${plan.isAdvanced ? s.planCardAdvanced : ''}`}
                >
                  <div className={s.cardTop}>
                    <span
                      className={`${s.planBadge} ${
                        plan.isAdvanced ? s.planBadgeAdvanced : ''
                      }`}
                    >
                      <span className={s.badgeDot} aria-hidden="true" />
                      {plan.planNumber}
                    </span>
                    <h3 className={s.planName}>{plan.name}</h3>
                    <p className={s.planDescription}>{plan.description}</p>
                  </div>

                  <div className={s.featuresDivider} />

                  <ul className={s.featureList} aria-label={`${plan.name} plan capabilities`}>
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className={s.featureItem}>
                        <span className={s.checkBadge} aria-hidden="true">
                          <Check size={13} className={s.checkIcon} />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={s.planFooter}>
                    <Link
                      href={plan.ctaHref}
                      className={plan.isAdvanced ? s.buttonPrimary : s.buttonSecondary}
                    >
                      <span>{plan.ctaLabel}</span>
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Commercial proposal disclaimer note */}
            <p className={s.commercialDisclaimer}>
              Plan limits, included modules, credit allocation, integrations and support
              entitlements will be confirmed in the commercial proposal. No subscription amounts
              are displayed on this website.
            </p>
          </div>
        </section>

        {/* 2. DOCSYNECX LOGISTICS SECTION */}
        <section
          id="logistics-modules"
          className={s.logisticsSection}
          aria-labelledby="logistics-section-title"
        >
          <div className="site-shell">
            <div className={s.sectionHeader}>
              <div className={s.eyebrowWrapper}>
                <p className={s.eyebrow}>Docsynecx Logistics</p>
              </div>
              <h2 id="logistics-section-title" className={s.sectionTitle}>
                Flexible modules for freight forwarding operations.
              </h2>
              <p className={s.sectionSubtitle}>
                Select the operational workflows you want to automate. Logistics pricing is scoped
                based on selected modules, shipment volumes, integrations and implementation
                requirements.
              </p>
            </div>

            {/* Logistics Modules Grid (4 modules) */}
            <div className={s.modulesGrid}>
              {LOGISTICS_MODULES.map((module) => (
                <article key={module.id} className={s.moduleCard}>
                  <div className={s.moduleCardHeader}>
                    <span className={s.moduleBadge}>{module.moduleNumber}</span>
                    <h3 className={s.moduleTitle}>{module.title}</h3>
                  </div>
                  <p className={s.moduleDescription}>{module.description}</p>
                </article>
              ))}
            </div>

            {/* Logistics Request Proposal CTA */}
            <div className={s.logisticsActionWrapper}>
              <Link href="/demo/#demo-form" className={s.buttonPrimary}>
                <span>Request Logistics Proposal</span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>

            {/* Logistics Roadmap note */}
            <p className={s.roadmapNote}>
              Freight Intelligence is presented separately as a roadmap capability; confirm
              availability before including it in a commercial scope.
            </p>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <ShipsyFooter showCta={false} />
    </div>
  );
}

export default PricingPage;
