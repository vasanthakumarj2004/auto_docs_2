'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCheck,
  CheckCircle2,
  Building2,
  Inbox,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { LandingNavigation } from '../LandingNavigation';
import { LandingClosingCta } from '../LandingClosingCta';
import { ShipsyFooter } from '../ShipsyFooter';
import { SharedFaqAccordion } from '../SharedFaqAccordion';
import { financePersonas, type PersonaData } from '../../content/financePersonas';
import layoutStyles from '../LandingPage.module.css';
import s from './FinancePersonaPage.module.css';
import { PersonaBusinessChallenge } from './PersonaBusinessChallenge';

interface FinancePersonaPageProps {
  persona: PersonaData['slug'];
}

const STEP_ICONS: Record<
  string,
  React.ComponentType<{ size?: number; className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>
> = {
  Inbox,
  Sparkles,
  ShieldCheck,
  CheckCheck,
};

export function FinancePersonaPage({ persona }: FinancePersonaPageProps) {
  const data = financePersonas[persona];
  const demoHref = '/demo/#demo-form';

  const otherPersonas = Object.values(financePersonas).filter((p) => p.slug !== persona);

  return (
    <div className={s.page}>
      <a href="#main-content" className={s.skipLink}>
        Skip to content
      </a>
      <LandingNavigation />

      <main id="main-content">
        {/* 1. HERO SECTION */}
        <section className={s.viewportHero} aria-labelledby="persona-title">
          <div className={`site-shell ${s.heroGrid}`}>
            <div className={s.heroCopy}>
              <p className={s.eyebrow}>{data.eyebrow}</p>
              <h1 id="persona-title" className={s.heroTitle}>
                {data.headline}
                <br />
                <span>{data.accent}</span>
              </h1>
              <p className={s.heroDescription}>{data.description}</p>
              <div className={s.heroActions}>
                <Link href={demoHref} className={s.primaryButton}>
                  {data.primaryCta}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
                <Link href="#capabilities" className={s.secondaryButton}>
                  {data.secondaryCta}
                  <ArrowDown size={16} aria-hidden="true" />
                </Link>
              </div>
              <p className={s.heroTrust}>{data.microline}</p>
            </div>

            <div className={s.heroVisual} aria-label="Illustrative product view">
              <div className={s.product}>
                <div className={s.productHeader}>
                  <strong>{data.visualTitle}</strong>
                  <span>{data.visualLabel}</span>
                </div>
                <div className={s.productTiles}>
                  {data.tiles.map(([label, title]) => (
                    <div key={label}>
                      <span>{label}</span>
                      <strong>{title}</strong>
                    </div>
                  ))}
                </div>
                <div className={s.skeleton} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div className={s.productChip}>
                  <Check size={12} aria-hidden="true" />
                  {data.chip}
                </div>
              </div>
              <p className={s.visualCaption}>Illustrative product view · Configured around your workflow</p>
            </div>
          </div>
        </section>

        {/* 2. BUSINESS CHALLENGE WORKSPACE (Interactive 2-column workspace matching Invoice Automation) */}
        <PersonaBusinessChallenge persona={persona} />

        {/* 3. CAPABILITIES & WHAT YOU GAIN */}
        <section id="capabilities" className={`${s.section} ${s.alternate}`} aria-labelledby="capabilities-title">
          <div className="site-shell">
            <div className={s.sectionHeading}>
              <div>
                <p className={s.eyebrow}>{data.capabilitiesEyebrow}</p>
                <h2 id="capabilities-title">{data.capabilitiesTitle}</h2>
              </div>
            </div>

            <div className={s.panel}>
              <ul className={s.checklist}>
                {data.checklist.map((item) => (
                  <li key={item}>
                    <Check size={15} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={s.featureGrid}>
              {data.features.map(({ tag, title, description }) => (
                <article key={title}>
                  <span className={s.badge}>{tag}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
            <p className={layoutStyles.bottomDescription}>{data.capabilitiesDescription}</p>
          </div>
        </section>

        {/* 4. STEP-BY-STEP PROCESS / WORKFLOW PIPELINE */}
        <section className={s.processSection} aria-labelledby="process-title">
          <div className="site-shell">
            <div className={s.sectionHeading}>
              <div>
                <p className={s.eyebrow}>{data.processEyebrow}</p>
                <h2 id="process-title">{data.processTitle}</h2>
              </div>
              <p className={s.sectionCopy}>{data.processDescription}</p>
            </div>

            {/* Workflow Pipeline */}
            <div className={s.flowPipeline}>
              <div className={s.flowGrid}>
                {((data.processFlow && data.processFlow.length > 0)
                  ? data.processFlow
                  : data.processSteps.map((step, index) => ({
                      number: `0${index + 1}`,
                      phase: `Stage 0${index + 1}`,
                      title: step,
                      description: 'Streamlined operational step in your accounting and invoice workflow.',
                      output: 'Validated & processed',
                      iconName: (['Inbox', 'Sparkles', 'ShieldCheck', 'CheckCheck'][index] || 'Sparkles') as any,
                    }))
                ).map((step, index, arr) => {
                  const IconComponent = STEP_ICONS[step.iconName] || Sparkles;
                  const isLast = index === arr.length - 1;

                  return (
                    <div key={step.number} className={s.flowColumn}>
                      {/* Milestone Track (Node + Directional Connector) */}
                      <div className={s.flowMilestone}>
                        <div className={`${s.flowNode} ${isLast ? s.flowNodeFinal : ''}`}>
                          <span>{step.number}</span>
                        </div>
                        {!isLast && (
                          <div className={s.flowConnector} aria-hidden="true">
                            <span className={s.flowConnectorLine} />
                            <ArrowRight size={13} className={s.flowConnectorArrow} />
                          </div>
                        )}
                      </div>

                      {/* Step Card */}
                      <div className={`${s.flowCard} ${isLast ? s.flowCardFinal : ''}`}>
                        <div className={s.flowCardHeader}>
                          <div className={s.flowIconBox}>
                            <IconComponent size={20} aria-hidden="true" />
                          </div>
                          <span className={s.flowPhaseTag}>{step.phase}</span>
                        </div>

                        <h3 className={s.flowCardTitle}>{step.title}</h3>
                        <p className={s.flowCardDescription}>{step.description}</p>

                        <div className={s.flowCardOutput}>
                          <Check size={12} className={s.flowOutputCheck} aria-hidden="true" />
                          <span>{step.output}</span>
                        </div>
                      </div>

                      {/* Mobile Step Downward Arrow */}
                      {!isLast && (
                        <div className={s.flowMobileArrow} aria-hidden="true">
                          <ArrowDown size={14} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Trust & Review Assurance Note */}
              <p className={s.flowNote}>
                <ShieldCheck size={16} aria-hidden="true" />
                <span>Complete control at every stage — human review, audit trail, and zero changes to your existing Tally setup.</span>
              </p>
            </div>
          </div>
        </section>

        {/* 5. REAL-WORLD IMPACT STORY */}
        <section className={`${s.section} ${s.alternate}`} aria-labelledby="proof-title">
          <div className="site-shell">
            <div className={s.storyGrid}>
              <div className={s.storyMetric}>
                <span className={s.micro}>{data.proofLabel}</span>
                <div>
                  <span>{data.proofMetricFrom}</span>
                  <ArrowRight size={36} />
                  <strong>{data.proofMetricTo}</strong>
                </div>
                <p>{data.proofDescription}</p>
                <span className={s.storyLabel}>
                  <Building2 size={15} />
                  {data.proofTitle} Customer Outcome
                </span>
              </div>

              <div>
                <p className={s.eyebrow}>PROVEN BUSINESS OUTCOME</p>
                <h2 id="proof-title" style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 700, margin: '12px 0 16px' }}>
                  Real workflows.<br />Meaningful time saved.
                </h2>
                <p className={s.sectionCopy} style={{ maxWidth: '520px', marginBottom: '24px' }}>
                  Docsynecx is actively used by teams handling recurring supplier documents, high-volume parts invoices, and multi-client accounts.
                </p>
                <Link href={data.proofLink} className={s.textLink}>
                  {data.proofLinkText} <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 6. RELATED ROLES / WHO ELSE IT'S FOR */}
        <section className={s.section} aria-labelledby="related-title">
          <div className="site-shell">
            <div className={s.sectionHeading}>
              <div>
                <p className={s.eyebrow}>EXPLORE OTHER ROLES</p>
                <h2 id="related-title">Solutions designed for your entire finance workflow.</h2>
              </div>
            </div>

            <div className={s.featureGrid}>
              {otherPersonas.map((other) => (
                <article key={other.slug}>
                  <span className={s.badge}>{other.navTitle}</span>
                  <h3>
                    {other.headline} {other.accent}
                  </h3>
                  <p>{other.description}</p>
                  <Link className={s.textLink} href={`/finance-desk/${other.slug}/`} style={{ marginTop: 'auto', paddingTop: '16px' }}>
                    Explore for {other.navTitle} <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
            <p className={layoutStyles.bottomDescription}>
              Discover how Docsynecx connects business owners, finance controllers, accounts executives, and CA firms.
            </p>
          </div>
        </section>

        {/* 7. ROLE-SPECIFIC FAQS */}
        <section id="faq" className={`${s.section} ${s.alternate}`} aria-labelledby="faq-title">
          <div className="site-shell">
            <div className={s.faqLayout}>
              <div>
                <p className={s.eyebrow}>{data.faqsEyebrow}</p>
                <h2 id="faq-title">{data.faqsTitle}</h2>
                <p className={s.sectionCopy} style={{ marginTop: '14px' }}>
                  Have more questions? Book a personalized walkthrough with our solution engineers.
                </p>
              </div>
              <SharedFaqAccordion items={data.faqs} defaultOpenIndex={0} toggleStyle="plus" />
            </div>
          </div>
        </section>

        <LandingClosingCta primaryHref={demoHref} secondaryHref="/#platform" />
      </main>

      <ShipsyFooter />
    </div>
  );
}
