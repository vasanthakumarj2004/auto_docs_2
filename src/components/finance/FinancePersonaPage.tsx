'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Building2 } from 'lucide-react';
import { LandingNavigation } from '../LandingNavigation';
import { DocsynecxLogo } from '../DocsynecxLogo';
import { CookieSettingsButton } from '../cookie-consent/CookieSettingsButton';
import { SharedFaqAccordion } from '../SharedFaqAccordion';
import { landingDesks } from '../../content/landing';
import { financePersonas, type PersonaData } from '../../content/financePersonas';
import layoutStyles from '../LandingPage.module.css';
import s from './FinancePersonaPage.module.css';
import { PersonaBusinessChallenge } from './PersonaBusinessChallenge';

interface FinancePersonaPageProps {
  persona: PersonaData['slug'];
}

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
              <p className={s.sectionCopy}>{data.capabilitiesDescription}</p>
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
          </div>
        </section>

        {/* 4. STEP-BY-STEP PROCESS */}
        <section className={s.section} aria-labelledby="process-title">
          <div className="site-shell">
            <div className={s.sectionHeading}>
              <div>
                <p className={s.eyebrow}>{data.processEyebrow}</p>
                <h2 id="process-title">{data.processTitle}</h2>
              </div>
              <p className={s.sectionCopy}>{data.processDescription}</p>
            </div>

            <ol className={s.process}>
              {data.processSteps.map((step, index) => (
                <li key={step}>
                  <span>{step}</span>
                  {index < data.processSteps.length - 1 && (
                    <ArrowRight size={18} aria-hidden="true" />
                  )}
                </li>
              ))}
            </ol>
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
              <p className={s.sectionCopy}>
                Discover how Docsynecx connects business owners, finance controllers, accounts executives, and CA firms.
              </p>
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

        {/* 8. CLOSING CTA CARD */}
        <section className={s.section}>
          <div className="site-shell">
            <div className={s.closingCard}>
              <div>
                <p className={s.eyebrow}>{data.ctaEyebrow}</p>
                <h2>{data.ctaTitle}</h2>
                <p>{data.ctaDescription}</p>
              </div>
              <Link className={s.primaryButton} href={demoHref}>
                {data.ctaButtonText}
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER (Matching Homepage & Solutions on changes_2) */}
      <footer className={layoutStyles.footer}>
        <div className="site-shell">
          <div className={layoutStyles.footerGrid}>
            <div>
              <Link href="/" className={layoutStyles.brand} aria-label="Docsynecx home">
                <DocsynecxLogo variant="footer" className={layoutStyles.footerLogo} />
              </Link>
              <p className={layoutStyles.footerDescription}>
                AI-powered finance and logistics workflows for document-intensive businesses.
              </p>
            </div>
            {landingDesks.map((desk) => (
              <nav key={desk.id} aria-label={`${desk.title} footer links`}>
                <h2>{desk.title}</h2>
                <ul>
                  {desk.id === 'finance' && (
                    <li>
                      <Link href={desk.href}>Docsynecx Intelligence</Link>
                    </li>
                  )}
                  {desk.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </nav>
            ))}
            <nav aria-label="Company footer links">
              <h2>Company</h2>
              <ul>
                <li><Link href="/solutions">Solutions</Link></li>
                <li><Link href="/#customers">Customers</Link></li>
                <li><Link href="/#why-docsynecx">About Us</Link></li>
                <li><Link href="/#contact">Contact</Link></li>
              </ul>
            </nav>
          </div>
          <div className={layoutStyles.footerBottom}>
            <p>© 2026 SynecX AI Labs Private Limited. All rights reserved.</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <CookieSettingsButton />
              <a href="mailto:info@docsynecx.com">info@docsynecx.com</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
