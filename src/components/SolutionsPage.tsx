'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  FileText,
  Inbox,
  MousePointerClick,
  ShieldCheck,
} from 'lucide-react';
import { LandingNavigation } from './LandingNavigation';
import { ShipsyFooter } from './ShipsyFooter';
import { FinanceClosingCta } from './finance/FinanceClosingCta';
import { SOLUTIONS_DATA } from '../content/solutions';
import styles from './SolutionsPage.module.css';

export function SolutionsPage() {
  return (
    <div className={styles.page}>
      <a href="#industries" className={styles.skipLink}>
        Skip to industries
      </a>

      {/* Global Navigation */}
      <LandingNavigation />

      <main id="solutions-content">
        {/* ==================================================================
            1. HERO SECTION (Matching content/industries.html)
            ================================================================== */}
        <section className={styles.hero} aria-labelledby="solutions-hero-title">
          <div className="site-shell">
            <div className={styles.heroGrid}>
              {/* Left Column: Copy, Actions & Trust Promise */}
              <div className={styles.heroCopy}>
                <nav className={styles.crumb} aria-label="Breadcrumb">
                  <Link href="/finance-desk/">Finance Desk</Link>
                  <span aria-hidden="true">/</span>
                  <span className={styles.crumbCurrent} aria-current="page">
                    Industries
                  </span>
                </nav>

                <span className={styles.eyebrow}>Industries</span>

                <h1 id="solutions-hero-title" className={styles.heroTitle}>
                  Every industry has its own paperwork. <br />
                  <span>We read yours.</span>
                </h1>

                <p className={styles.heroSub}>
                  Spares bills, mill bills, distributor invoices, carrier notices. Docsynecx reads
                  the documents your team types in today, checks them, and drafts the entry in
                  TallyPrime, Zoho Books, your own ERP or CargoWise. Your team reviews and approves.
                </p>

                <div className={styles.heroActions}>
                  <Link href="/demo/#demo-form" className="button-primary">
                    <span>Book a demo</span>
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                  <a href="#industries" className="button-secondary">
                    <span>Find your industry</span>
                    <ArrowDown size={15} aria-hidden="true" />
                  </a>
                </div>

                <p className={styles.promise}>
                  <CheckCircle2 size={18} className={styles.promiseCheckIcon} aria-hidden="true" />
                  <span>In every industry, nothing is posted until your team approves it.</span>
                </p>
              </div>

              {/* Right Column: Jump to your industry Navigation Card with 3D Depth matching /pricing/ */}
              <div className={styles.heroVisualWrapper}>
                <div className={styles.ambientGlow} aria-hidden="true" />
                <div className={styles.ghostCardBehind} aria-hidden="true" />

                <nav className={styles.indPick} aria-label="Jump to your industry">
                  <span className={styles.indPickHead}>Jump to your industry</span>
                  {SOLUTIONS_DATA.map((ind) => (
                    <a key={ind.id} href={`#${ind.id}`} className={styles.indPickItem}>
                      <span className={styles.mono}>{ind.sno}</span>
                      <span className={styles.indPickName}>{ind.industry}</span>
                      <span className={styles.indPickArrow} aria-hidden="true">
                        →
                      </span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            2. KEY FACTS / PROOF TILES STRIP (Matching Image 2 dark navy strip)
            ================================================================== */}
        <section className={styles.proofTiles} aria-labelledby="solutions-glance-title">
          <div className="site-shell">
            <p id="solutions-glance-title" className={styles.proofEyebrow}>
              Document workflows at a glance
            </p>
            <ul className={styles.tileRow}>
              <li className={styles.tile}>
                <span className={styles.tileIcon} aria-hidden="true">
                  <Inbox size={20} strokeWidth={2.2} />
                </span>
                <div className={styles.tileContent}>
                  <strong className={styles.tileTitle}>Portal · email · WhatsApp</strong>
                  <span className={styles.tileSubtitle}>Send documents the way you already do</span>
                </div>
              </li>

              <li className={styles.tile}>
                <span className={styles.tileIcon} aria-hidden="true">
                  <FileText size={20} strokeWidth={2.2} />
                </span>
                <div className={styles.tileContent}>
                  <strong className={styles.tileTitle}>Every line read</strong>
                  <span className={styles.tileSubtitle}>Multi-page PDFs, scans and photos</span>
                </div>
              </li>

              <li className={styles.tile}>
                <span className={styles.tileIcon} aria-hidden="true">
                  <ShieldCheck size={20} strokeWidth={2.2} />
                </span>
                <div className={styles.tileContent}>
                  <strong className={styles.tileTitle}>Checked first</strong>
                  <span className={styles.tileSubtitle}>GST, duplicates and ledgers</span>
                </div>
              </li>

              <li className={styles.tile}>
                <span className={styles.tileIcon} aria-hidden="true">
                  <MousePointerClick size={20} strokeWidth={2.2} />
                </span>
                <div className={styles.tileContent}>
                  <strong className={styles.tileTitle}>One click to approve</strong>
                  <span className={styles.tileSubtitle}>Your team checks, Docsynecx types</span>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Anchor Target */}
        <div id="industries" />

        {/* ==================================================================
            3. SEPARATE INDUSTRY SECTIONS
            ================================================================== */}
        {SOLUTIONS_DATA.map((solution, index) => {
          const isAlt = index % 2 === 1;

          return (
            <section
              key={solution.id}
              id={solution.id}
              className={`${styles.indSection} ${isAlt ? styles.indSectionAlt : ''}`}
              aria-labelledby={`${solution.id}-h`}
            >
              <div className="site-shell">
                <div className={styles.indGrid}>
                  {/* Left Column: Copy & Optional Story */}
                  <div className={styles.indCopy}>
                    <span className={styles.eyebrow}>{solution.eyebrow}</span>
                    <h2 id={`${solution.id}-h`} className={styles.indHeading}>
                      {solution.heading}
                      {solution.headingAccent && (
                        <>
                          <br />
                          <span>{solution.headingAccent}</span>
                        </>
                      )}
                    </h2>
                    <p className={styles.indSub}>{solution.description}</p>

                    {solution.story && (
                      <figure className={styles.indStory}>
                        <div className={styles.indBig}>
                          <b>{solution.story.metric}</b>
                          <span>{solution.story.metricLabel}</span>
                        </div>
                        <blockquote>
                          <p>“{solution.story.quote}”</p>
                          <figcaption>{solution.story.author}</figcaption>
                        </blockquote>
                      </figure>
                    )}

                    <div className={styles.indActions}>
                      <Link className="button-primary" href="/demo/#demo-form">
                        <span>{solution.ctaText}</span>
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </Link>
                      {solution.secondaryCta && (
                        <Link className="button-secondary" href={solution.secondaryCta.href}>
                          <span>{solution.secondaryCta.label}</span>
                          <ArrowRight size={15} aria-hidden="true" />
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Right Column: 2 Feature Cards + Documents & Systems Lists */}
                  <div className={styles.indSide}>
                    <div className={styles.indCards}>
                      {solution.cards.map((card) => (
                        <article key={card.title} className={styles.indCard}>
                          <span className={styles.cardMono}>{card.tag}</span>
                          <h3 className={styles.cardTitle}>{card.title}</h3>
                          <p className={styles.cardDesc}>{card.desc}</p>
                        </article>
                      ))}
                    </div>

                    <div className={styles.indLists}>
                      <div className={styles.indDocsCol}>
                        <span className={styles.indListHeader}>Documents we read</span>
                        <ul className={styles.indDocsList}>
                          {solution.documents.map((doc) => (
                            <li key={doc}>
                              <Check size={14} className={styles.docCheckIcon} aria-hidden="true" />
                              <span>{doc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className={styles.indSysCol}>
                        <span className={styles.indListHeader}>Works with</span>
                        <ul className={styles.indSysList}>
                          {solution.systems.map((sys) => (
                            <li key={sys} className={styles.sysPill}>
                              {sys}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* ==================================================================
            4. CLOSING CTA SECTION (Matching InvoiceAutomationPage way)
            ================================================================== */}
        <FinanceClosingCta
          eyebrow="NOT ON THE LIST?"
          title={
            <>
              What could your team <br />
              <span>do with less typing?</span>
            </>
          }
          copy="Tell us which documents eat your team's day. We'll show you a practical place to start, using your own bills."
          // steps={[
          //   'Book a 30-minute demo',
          //   'Bring a few of your real documents',
          //   'See them read, checked and ready to approve',
          // ]}
          primaryHref="/demo/#demo-form"
          primaryText="Book a demo"
          secondaryHref="/finance-desk/"
          secondaryText="Explore Finance Desk"
        />
      </main>

      <ShipsyFooter />
    </div>
  );
}
