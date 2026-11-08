'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Zap,
  ShieldCheck,
} from 'lucide-react';
import { LandingNavigation } from './LandingNavigation';
import { ClosingVisualBg } from './ClosingVisualBg';
import { DocsynecxLogo } from './DocsynecxLogo';
import { CookieSettingsButton } from './cookie-consent/CookieSettingsButton';
import { SOLUTIONS_DATA } from '../content/solutions';
import { landingDesks } from '../content/landing';
import styles from './SolutionsPage.module.css';

const WORKFLOW_ICONS = [Zap, ShieldCheck, CheckCircle2, FileText];

const HERO_COLLAGE_COLUMNS = [
  [
    { src: '/images/hero-collage/ind-automotive-1.jpg', alt: 'Automotive & EV Assembly Line', flex: 1.15 },
    { src: '/images/hero-collage/ind-logistics-1.jpg', alt: 'Cargo Ship & Shipping Containers', flex: 0.95 },
    { src: '/images/hero-collage/ind-manufacturing-1.jpg', alt: 'Industrial Metal Welding Sparks', flex: 1.05 },
  ],
  [
    { src: '/images/hero-collage/ind-textile-1.jpg', alt: 'Textile Factory Yarn Spools', flex: 0.9 },
    { src: '/images/hero-collage/ind-ev.jpg', alt: 'Automotive & Electric Vehicle', flex: 1.25 },
    { src: '/images/hero-collage/ind-finance.jpg', alt: 'Finance & ERP Accounting Ledgers', flex: 0.95 },
  ],
  [
    { src: '/images/hero-collage/ind-logistics-2.jpg', alt: 'Warehouse Forklift & Pallets', flex: 1.05 },
    { src: '/images/hero-collage/ind-manufacturing-2.jpg', alt: 'Precision CNC Machining Factory', flex: 0.9 },
    { src: '/images/hero-collage/ind-textile-loom.jpg', alt: 'Textile Manufacturing Industrial Loom', flex: 1.15 },
  ],
  [
    { src: '/images/hero-collage/ind-retail-2.jpg', alt: 'Retail FMCG Inventory & Distribution', flex: 1.2 },
    { src: '/images/hero-collage/ind-automotive-3.jpg', alt: 'Automotive Manufacturing Plant', flex: 0.85 },
    { src: '/images/hero-collage/ind-logistics-3.jpg', alt: 'Stacked Freight Shipping Containers', flex: 1.05 },
  ],
];

export function SolutionsPage() {
  return (
    <div className={styles.page}>
      <a href="#automotive" className={styles.skipLink}>
        Skip to solutions
      </a>

      {/* Global Navigation matching Homepage */}
      <LandingNavigation />

      <main id="solutions-content">
        {/* ==================================================================
            1. HERO SECTION (2-Column Layout: Left Content, Right Collage)
            ================================================================== */}
        <section className={styles.hero} aria-labelledby="solutions-hero-title">
          <div className="site-shell">
            <div className={styles.heroGrid}>
              {/* Left Column: Content */}
              <div className={styles.heroCopy}>
                <p className={styles.eyebrow}>Industry Solutions</p>

                <h1 id="solutions-hero-title" className={styles.heroTitle}>
                  Purpose-built document intelligence.<br />
                  <span>Designed for real business operations.</span>
                </h1>

                <p className={styles.heroDescription}>
                  Every industry handles documents differently. Docsynecx connects to your existing
                  TallyPrime, SAP, or CargoWise environments to eliminate manual line-item typing,
                  catch reconciliation discrepancies, and accelerate ledger postings.
                </p>

                <div className={styles.heroActions}>
                  <Link href="/demo/" className={`${styles.demoButton} ${styles.primaryBtn}`}>
                    <span>Book a demo</span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                  <a href="#automotive" className={`${styles.demoButton} ${styles.secondaryBtn}`}>
                    <span>Explore industries</span>
                  </a>
                </div>

                <p className={styles.trust}>
                  <CheckCircle2 size={13} className={styles.trustCheckIcon} aria-hidden="true" />
                  <span>
                    <strong>Built for businesses</strong> that run on TallyPrime, SAP, or CargoWise.
                  </span>
                </p>
              </div>

              {/* Right Column: Pure 12-Image Collage matching pencil sketch template */}
              <div className={styles.heroCollage} aria-label="Docsynecx operations visual collage">
                {/* Clipped container with exact pencil-sketch shape */}
                <div className={styles.collageFrame}>
                  <div className={styles.collageGrid}>
                    {HERO_COLLAGE_COLUMNS.map((column, colIdx) => (
                      <div key={colIdx} className={styles.collageColumn}>
                        {column.map((img, imgIdx) => (
                          <div
                            key={imgIdx}
                            className={styles.collageImageWrapper}
                            style={{ flex: img.flex }}
                          >
                            <img
                              src={img.src}
                              alt={img.alt}
                              className={styles.collageImg}
                              loading={colIdx < 2 ? 'eager' : 'lazy'}
                            />
                            <div className={styles.imageOverlay} aria-hidden="true" />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Overall color overlay matching homepage background video color overlay */}
                  <div className={styles.collageOverlay} aria-hidden="true" />
                </div>

                {/* SVG Outline matching the exact pencil sketch shape */}
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className={styles.shapeOutlineSvg}
                  aria-hidden="true"
                >
                  <path
                    d="M 28, 2 L 95, 2 Q 99, 2 99, 6 L 99, 94 Q 99, 98 95, 98 L 8, 98 Q 3, 98 4, 93 L 23, 6 Q 24, 2 28, 2 Z"
                    fill="none"
                    stroke="rgba(24, 203, 150, 0.55)"
                    strokeWidth="1.8"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* SVG Clip Path Definition for the Pencil-Sketched Hero Shape */}
          <svg width="0" height="0" className={styles.clipSvgDef} aria-hidden="true">
            <defs>
              <clipPath id="sketchHeroShape" clipPathUnits="objectBoundingBox">
                <path d="M 0.28, 0.02 L 0.95, 0.02 Q 0.99, 0.02 0.99, 0.06 L 0.99, 0.94 Q 0.99, 0.98 0.95, 0.98 L 0.08, 0.98 Q 0.03, 0.98 0.04, 0.93 L 0.23, 0.06 Q 0.24, 0.02 0.28, 0.02 Z" />
              </clipPath>
            </defs>
          </svg>
        </section>

        {/* ==================================================================
            3. SEPARATE INDUSTRY SECTIONS (Each Exact Display Size: 100svh - 80px)
            ================================================================== */}
        {SOLUTIONS_DATA.map((solution, index) => {
          const isAlt = index % 2 === 1;

          return (
            <section
              key={solution.id}
              id={solution.id}
              className={`${styles.industrySection} ${isAlt ? styles.industrySectionAlt : ''}`}
              aria-labelledby={`${solution.id}-heading`}
            >
              <div className="site-shell">
                {/* Section Heading matching Homepage */}
                <div className={styles.sectionHeading}>
                  <div>
                    <p className={styles.eyebrow}>
                      {solution.sno} · {solution.shortTitle}
                    </p>
                    <h2 id={`${solution.id}-heading`}>
                      {solution.shortTitle}.<br />
                      <span>{solution.shortSubtitle}.</span>
                    </h2>
                  </div>
                </div>

                {/* Div Boxes Bento Grid (Exact display height, compact & clean) */}
                <div
                  className={`${styles.bentoGrid} ${isAlt ? styles.bentoGridReverse : ''}`}
                >
                  {/* Left Bento Card: 16:9 Visual & Testimonial Quote */}
                  <div className={styles.leftBentoCard}>
                    <div className={styles.imageBox}>
                      <img
                        src={solution.image}
                        alt={solution.industry}
                        className={styles.industryImg}
                        loading="lazy"
                      />
                      <div className={styles.imageOverlay} />
                      <div className={styles.metricBadge}>
                        <span className={styles.metricVal}>{solution.metricValue}</span>
                        <span className={styles.metricLbl}>{solution.metricLabel}</span>
                      </div>
                    </div>

                    <div className={styles.quoteBlock}>
                      <p className={styles.quoteCopy}>“{solution.sampleUseCase.quote}”</p>
                      <div className={styles.quoteAuthorRow}>
                        <span className={styles.quoteAuthorName}>
                          {solution.sampleUseCase.author}
                        </span>
                        <div className={styles.cardAccent} aria-hidden="true">
                          <span className={styles.accentDot} />
                          <span className={styles.accentDot} />
                          <span className={styles.accentDot} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: 2 Workflow Cards + Systems & CTA Card */}
                  <div className={styles.rightBentoCol}>
                    <div className={styles.workflowsRow}>
                      {solution.workflows.map((wf, idx) => {
                        const IconComponent = WORKFLOW_ICONS[idx % WORKFLOW_ICONS.length];
                        return (
                          <article key={wf.title} className={styles.workflowCard}>
                            <div className={styles.workflowCardTop}>
                              <div className={styles.workflowIconBox}>
                                <IconComponent size={18} strokeWidth={2.2} aria-hidden="true" />
                              </div>
                              <span className={styles.workflowTag}>{wf.tag}</span>
                            </div>
                            <h3 className={styles.workflowTitle}>{wf.title}</h3>
                            <p className={styles.workflowDesc}>{wf.description}</p>
                          </article>
                        );
                      })}
                    </div>

                    {/* Bottom Systems & CTA Card */}
                    <div className={styles.systemsCtaCard}>
                      <div className={styles.systemsInfo}>
                        <div className={styles.metaRow}>
                          <span className={styles.metaLabel}>Connected Systems</span>
                          <ul className={styles.chipsList}>
                            {solution.systems.map((sys) => (
                              <li key={sys} className={styles.systemChip}>
                                {sys}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className={styles.metaRow}>
                          <span className={styles.metaLabel}>Automated Documents</span>
                          <ul className={styles.chipsList}>
                            {solution.documents.slice(0, 3).map((doc) => (
                              <li key={doc} className={styles.docChip}>
                                <FileText size={11} aria-hidden="true" />
                                {doc}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className={styles.actionBtnWrapper}>
                        <Link href="/demo/" className={`${styles.demoButton} ${styles.primaryBtn}`}>
                          <span>Automate {solution.shortTitle}</span>
                          <ArrowRight size={14} aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom lead description matching homepage slider description */}
                <p className={styles.sliderDescription}>{solution.lead}</p>
              </div>
            </section>
          );
        })}

        {/* ==================================================================
            4. CLOSING CTA SECTION (Matching Homepage)
            ================================================================== */}
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
                  Tell us about your finance or freight workflow. We’ll help identify a practical
                  place to start.
                </p>
                <div className={styles.closingActions}>
                  <Link href="/demo/" className={`${styles.demoButton} ${styles.primaryBtn}`}>
                    Book a demo
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                  <Link href="/#platform" className={`${styles.demoButton} ${styles.secondaryBtn}`}>
                    Explore platform
                  </Link>
                </div>
              </div>
            </div>

            <p className={styles.companyLine}>
              SynecX AI Labs Private Limited · Coimbatore, Tamil Nadu, India ·{' '}
              <a href="mailto:info@docsynecx.com">info@docsynecx.com</a>
            </p>
          </div>
        </section>
      </main>

      {/* ==================================================================
          5. FOOTER (Matching Homepage)
          ================================================================== */}
      <footer className={styles.footer}>
        <div className="site-shell">
          <div className={styles.footerGrid}>
            <div>
              <Link href="/" className={styles.brand} aria-label="Docsynecx home">
                <DocsynecxLogo variant="footer" className={styles.footerLogo} />
              </Link>
              <p className={styles.footerDescription}>
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
                <li>
                  <Link href="/solutions">Solutions</Link>
                </li>
                <li>
                  <Link href="/#customers">Customers</Link>
                </li>
                <li>
                  <Link href="/#why-docsynecx">About Us</Link>
                </li>
                <li>
                  <Link href="/#contact">Contact</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className={styles.footerBottom}>
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
