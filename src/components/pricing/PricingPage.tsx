'use client';

import React from 'react';
import {
  Check,
  X,
  Star,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Percent,
  Clock,
  Layers,
  ShieldCheck,
} from 'lucide-react';
import { LandingNavigation } from '../LandingNavigation';
import { ShipsyFooter } from '../ShipsyFooter';
import { ClosingVisualBg } from '../ClosingVisualBg';
import s from './PricingPage.module.css';

interface PricingPlan {
  id: string;
  tag: string;
  name: string;
  subtitle: string;
  price: string;
  bestFor: string;
  isPopular?: boolean;
  features: string[];
  notIncluded?: string[];
  ctaLabel: string;
  ctaHref: string;
}

const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    tag: 'TRIAL PLAN',
    name: 'Starter',
    subtitle: 'Try real automation with your data',
    price: 'Free',
    bestFor: 'Best for: Small teams evaluating automation',
    isPopular: false,
    features: [
      'Invoice data extraction',
      'GST & basic validation',
      'Limited Tally integration',
      '20 credits',
      '1 company',
      '1 user',
    ],
    notIncluded: [
      'No bulk processing',
      'No advanced rules',
      'Limited automation',
    ],
    ctaLabel: 'Start Free Trial',
    ctaHref: 'https://invoice.docsynecx.com/signin/',
  },
  {
    id: 'professional',
    tag: 'MOST POPULAR',
    name: 'Professional',
    subtitle: 'Built for growing businesses',
    price: 'Custom',
    bestFor: 'Best for: Teams processing invoices regularly',
    isPopular: true,
    features: [
      'Everything in Starter',
      'Bulk invoice processing',
      'Multi-Line Item Extraction',
      'Advanced validation',
      'Full Tally integration',
      'Multi-company support',
      'Multiple users',
    ],
    ctaLabel: 'Start Free Trial',
    ctaHref: 'https://invoice.docsynecx.com/signin/',
  },
  {
    id: 'enterprise',
    tag: 'TAILORED',
    name: 'Enterprise',
    subtitle: 'Custom automation for large-scale operations',
    price: "Let's talk",
    bestFor: 'Best for: High-volume and complex workflows',
    isPopular: false,
    features: [
      'Everything in Professional',
      'Custom workflows & approvals',
      'Dedicated onboarding',
      'SLA & priority support',
      'Custom ERP integrations',
    ],
    ctaLabel: 'Contact Sales',
    ctaHref: 'https://docsynecx.com/contact',
  },
];

interface EnterpriseModule {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  pricing: string;
  pricingSubtext: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
}

const ENTERPRISE_MODULES: EnterpriseModule[] = [
  {
    id: 'logistics',
    badge: 'Enterprise Only',
    title: 'Logistics & Supply Chain',
    subtitle: 'CargoWise-ready document automation',
    pricing: 'Custom Pricing',
    pricingSubtext: 'Based on document volume & integrations',
    features: [
      'BL, AWB, Packing List & Invoice extraction',
      'CargoWise direct data sync',
      'Freight & shipment workflow automation',
      'Multi-party document handling',
      'High-volume batch processing',
      'Dedicated logistics onboarding',
    ],
    ctaLabel: 'Contact Sales',
    ctaHref: 'https://docsynecx.com/contact',
  },
  {
    id: 'workflows',
    badge: 'Enterprise Only',
    title: 'Workflows & Approvals',
    subtitle: 'Multi-level approval automation',
    pricing: 'Custom Pricing',
    pricingSubtext: 'Based on users & workflow complexity',
    features: [
      'Configurable approval hierarchies',
      'Real-time approval tracking',
      'Complete audit logs',
      'Role-based access control',
      'Custom workflow builder',
      'SLA & priority support',
    ],
    ctaLabel: 'Contact Sales',
    ctaHref: 'https://docsynecx.com/contact',
  },
];

interface ComparisonRow {
  feature: string;
  starter: string | boolean;
  professional: string | boolean;
  enterprise: string | boolean;
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    feature: 'Invoice Processing',
    starter: 'Limited',
    professional: 'High Volume',
    enterprise: 'Unlimited',
  },
  {
    feature: 'Credits',
    starter: 'Flexible',
    professional: 'Flexible',
    enterprise: 'Custom',
  },
  {
    feature: 'Accuracy',
    starter: 'Standard',
    professional: 'High',
    enterprise: 'Premium',
  },
  {
    feature: 'Tally Integration',
    starter: 'Limited',
    professional: 'Full',
    enterprise: 'Full',
  },
  {
    feature: 'Bulk Processing',
    starter: false,
    professional: true,
    enterprise: true,
  },
  {
    feature: 'Multi-Line Item Extraction',
    starter: false,
    professional: true,
    enterprise: true,
  },
  {
    feature: 'Users',
    starter: '1',
    professional: 'Multiple',
    enterprise: 'Unlimited',
  },
  {
    feature: 'Companies',
    starter: '1',
    professional: 'Multiple',
    enterprise: 'Multi-entity',
  },
  {
    feature: 'Cloud Archive',
    starter: false,
    professional: true,
    enterprise: true,
  },
  {
    feature: 'Workflow Automation',
    starter: false,
    professional: false,
    enterprise: true,
  },
  {
    feature: 'Logistics Integration',
    starter: false,
    professional: false,
    enterprise: true,
  },
  {
    feature: 'Invoice Collection',
    starter: 'Portal',
    professional: 'Portal+Whatsapp',
    enterprise: 'Portal+Whatsapp+Mail',
  },
  {
    feature: 'Support',
    starter: 'Email',
    professional: 'Priority',
    enterprise: 'Dedicated',
  },
];

export function PricingPage() {
  return (
    <div className={s.page}>
      <a href="#main-content" className={s.skipLink}>
        Skip to content
      </a>

      {/* Global Navigation */}
      <LandingNavigation />

      <main id="main-content" className={s.mainContent}>
        {/* 1. HERO & PRICING PLANS COMBINED */}
        <section className={s.heroSection} aria-labelledby="pricing-hero-title">
          <div className="site-shell">
            <div className={s.heroWrapper}>
              <p className={s.eyebrow}>DOCSYNECX PRICING PLANS</p>
              <h1 id="pricing-hero-title" className={s.heroTitle}>
                Transparent Pricing.<br />
                <span>Smarter Invoice Automation.</span>
              </h1>

              <p className={s.heroSubtitle}>
                Simplify invoice processing, eliminate repetitive manual tasks, and connect effortlessly with your existing accounting systems.
              </p>

              <div className={s.trialPill}>
                <Sparkles size={15} className={s.sparkleIcon} aria-hidden="true" />
                <span>Start with a free trial. Choose a plan that scales with your business.</span>
              </div>
            </div>

            {/* Impact Highlights */}
            <div className={s.metricsRow}>
              <div className={s.metricCard}>
                <div className={s.metricHeader}>
                  <Percent size={18} className={s.metricIcon} aria-hidden="true" />
                  <span className={s.metricNumber}>70%</span>
                </div>
                <p className={s.metricLabel}>
                  Cut Invoice Processing Costs by Up to 70%.
                </p>
              </div>

              <div className={s.metricCard}>
                <div className={s.metricHeader}>
                  <TrendingUp size={18} className={s.metricIcon} aria-hidden="true" />
                  <span className={s.metricNumber}>80%</span>
                </div>
                <p className={s.metricLabel}>
                  Reduce Manual Work by Up to 80%.
                </p>
              </div>

              <div className={`${s.metricCard} ${s.metricCardAccent}`}>
                <div className={s.metricHeader}>
                  <Clock size={18} className={s.metricIconAccent} aria-hidden="true" />
                  <span className={s.metricNumberAccent}>Accelerate</span>
                </div>
                <p className={s.metricLabel}>
                  Automate your workflow, accelerate processing, and give your team more time to focus on what matters.
                </p>
              </div>
            </div>

            {/* Pricing Plans Cards */}
            <h2 id="plans-section-title" className="sr-only">
              Pricing Plans
            </h2>

            <div className={s.cardsGrid}>
              {PRICING_PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`${s.planCard} ${plan.isPopular ? s.popularCard : ''}`}
                >
                  {/* Floating Most Popular Pill Badge */}
                  {plan.isPopular && (
                    <div className={s.popularFloatingBadge}>
                      <Star size={13} fill="currentColor" aria-hidden="true" />
                      <span>Most Popular</span>
                    </div>
                  )}

                  {/* Card Header */}
                  <div className={s.cardHeader}>
                    <span
                      className={`${s.planTag} ${
                        plan.isPopular ? s.planTagPopular : ''
                      }`}
                    >
                      {plan.tag}
                    </span>
                    <h3 className={s.planName}>{plan.name}</h3>
                    <p className={s.planSubtitle}>{plan.subtitle}</p>
                  </div>

                  {/* Price Box */}
                  <div className={s.priceBox}>
                    <div className={s.priceAmount}>{plan.price}</div>
                    <div className={s.bestFor}>{plan.bestFor}</div>
                  </div>

                  {/* Features List */}
                  <div className={s.featuresContainer}>
                    <ul className={s.featureList} aria-label={`${plan.name} features`}>
                      {plan.features.map((feature, i) => (
                        <li key={i} className={s.featureItem}>
                          <Check size={14} className={s.checkIcon} aria-hidden="true" />
                          <span>{feature}</span>
                        </li>
                      ))}

                      {/* Not Included Features */}
                      {plan.notIncluded &&
                        plan.notIncluded.map((feature, i) => (
                          <li
                            key={i}
                            className={`${s.featureItem} ${s.featureItemDisabled}`}
                          >
                            <X size={13} className={s.crossIcon} aria-hidden="true" />
                            <span>{feature}</span>
                          </li>
                        ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <div className={s.cardFooter}>
                    <a
                      href={plan.ctaHref}
                      className={s.planCtaButton}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {plan.ctaLabel}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. ADVANCED AUTOMATION MODULES (ENTERPRISE ONLY) */}
        <section
          id="advanced-modules"
          className={s.modulesSection}
          aria-labelledby="modules-title"
        >
          <div className="site-shell">
            <div className={s.sectionHeaderCenter}>
              <p className={s.eyebrow}>ENTERPRISE ONLY</p>
              <h2 id="modules-title" className={s.sectionTitle}>
                Advanced Automation Modules
              </h2>
              <p className={s.sectionSubtitle}>
                These advanced modules are available exclusively under the Enterprise plan.
              </p>
            </div>

            <div className={s.modulesGrid}>
              {ENTERPRISE_MODULES.map((module) => (
                <div key={module.id} className={s.moduleCard}>
                  <div className={s.moduleHeader}>
                    <span className={s.enterpriseTag}>{module.badge}</span>
                    <h3 className={s.moduleTitle}>{module.title}</h3>
                    <p className={s.moduleSubtitle}>{module.subtitle}</p>
                  </div>

                  <div className={s.modulePricingBox}>
                    <div className={s.modulePricingAmount}>{module.pricing}</div>
                    <div className={s.modulePricingSubtext}>
                      {module.pricingSubtext}
                    </div>
                  </div>

                  <ul className={s.moduleFeaturesList}>
                    {module.features.map((feature, i) => (
                      <li key={i} className={s.moduleFeatureItem}>
                        <Check size={14} className={s.checkIcon} aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={s.moduleFooter}>
                    <a
                      href={module.ctaHref}
                      className={s.moduleCtaButton}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {module.ctaLabel}
                      <ArrowRight size={14} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. FEATURE COMPARISON TABLE */}
        <section
          id="feature-comparison"
          className={s.comparisonSection}
          aria-labelledby="comparison-title"
        >
          <div className="site-shell">
            <div className={s.sectionHeaderCenter}>
              <p className={s.eyebrow}>FEATURE COMPARISON</p>
              <h2 id="comparison-title" className={s.sectionTitle}>
                Choose the Right Plan for Your Business
              </h2>
              <p className={s.sectionSubtitle}>
                Compare all features across our plans and find the perfect solution for your document processing needs.
              </p>
            </div>

            <div className={s.tableCard}>
              <div className={s.tableScroll}>
                <table className={s.comparisonTable}>
                  <thead>
                    <tr>
                      <th className={s.featureColHead}>Feature</th>
                      <th className={s.planColHead}>Starter</th>
                      <th className={`${s.planColHead} ${s.popularColHead}`}>
                        <span className={s.tablePopularBadge}>★ Most Popular</span>
                        Professional
                      </th>
                      <th className={s.planColHead}>Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_ROWS.map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? s.rowEven : s.rowOdd}>
                        <td className={s.featureNameCell}>{row.feature}</td>

                        <td className={s.cellValue}>
                          {typeof row.starter === 'boolean' ? (
                            row.starter ? (
                              <Check
                                size={18}
                                className={s.tableCheck}
                                aria-label="Included"
                              />
                            ) : (
                              <span className={s.tableDash} aria-label="Not included">
                                —
                              </span>
                            )
                          ) : (
                            <span className={s.valueText}>{row.starter}</span>
                          )}
                        </td>

                        <td className={`${s.cellValue} ${s.popularCell}`}>
                          {typeof row.professional === 'boolean' ? (
                            row.professional ? (
                              <Check
                                size={18}
                                className={s.tableCheck}
                                aria-label="Included"
                              />
                            ) : (
                              <span className={s.tableDash} aria-label="Not included">
                                —
                              </span>
                            )
                          ) : (
                            <span className={s.valueTextHighlight}>
                              {row.professional}
                            </span>
                          )}
                        </td>

                        <td className={s.cellValue}>
                          {typeof row.enterprise === 'boolean' ? (
                            row.enterprise ? (
                              <Check
                                size={18}
                                className={s.tableCheck}
                                aria-label="Included"
                              />
                            ) : (
                              <span className={s.tableDash} aria-label="Not included">
                                —
                              </span>
                            )
                          ) : (
                            <span className={s.valueText}>{row.enterprise}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <p className={s.trialGuarantee}>
              All plans include a <strong>7-day free trial</strong>. No credit card required.
            </p>
          </div>
        </section>

        {/* 5. FINAL CALL TO ACTION */}
        <section className={s.closingSection} aria-labelledby="cta-heading">
          <div className="site-shell">
            <div className={s.closingCard}>
              <div className={s.closingBgPattern} aria-hidden="true">
                <ClosingVisualBg noGlow />
              </div>

              <div className={s.closingInner}>
                <div className={s.ctaEyebrow}>
                  <span className={s.ctaEyebrowDot} aria-hidden="true" />
                  <span>ZERO RISK · IMMEDIATE ROI</span>
                </div>

                <h2 id="cta-heading" className={s.ctaHeadline}>
                  Start your free trial today
                </h2>

                <p className={s.ctaSub}>
                  No risk. Immediate ROI. Join hundreds of businesses automating their invoice processing.
                </p>

                <div className={s.ctaActions}>
                  <a
                    href="https://invoice.docsynecx.com/signin/"
                    className={s.brandButton}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Start Free Trial</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>

                  <a
                    href="https://docsynecx.com/request-demo"
                    className={s.secondaryButton}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Book a Demo</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Global Footer without duplicate CTA */}
      <ShipsyFooter showCta={false} />
    </div>
  );
}

export default PricingPage;
