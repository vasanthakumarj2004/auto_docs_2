'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { useAutoCycle } from '@/src/hooks/useAutoCycle';
import { SharedFaqAccordion } from '../SharedFaqAccordion';
import { LogisticsClosingCta } from './LogisticsClosingCta';
import { logisticsPersonas } from '../../content/logisticsPersonas';
import s from '../finance/InvoiceAutomationPage.module.css';

export function FreightForwardersPage() {
  const data = logisticsPersonas['freight-forwarders'];

  const { active, goTo, containerProps } = useAutoCycle({
    itemCount: data.howSteps.length,
    interval: 3500,
    resumeDelay: 5000,
  });

  const activeStep = data.howSteps[active] || data.howSteps[0];

  const iconMap: Record<string, React.ElementType> = {
    Zap,
    ShieldCheck,
    TrendingUp,
    CheckCircle2,
  };

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className={s.heroSection} aria-labelledby="hero-title">
        <div className="site-shell">
          <div className={s.heroGrid}>
            <div>
              <p className={s.eyebrow}>{data.eyebrow}</p>

              <h1 id="hero-title" className={s.heroTitle}>
                {data.headline}
                <br />
                <span>{data.accent}</span>
              </h1>

              <p className={s.heroSub}>{data.description}</p>

              <div className={s.heroActions}>
                <Link href="/demo/#demo-form" className={s.primaryBtn}>
                  <span>{data.primaryCta}</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  href="#gain"
                  className={s.secondaryBtn}
                  onClick={(e) => {
                    const target = document.getElementById('gain');
                    if (target) {
                      e.preventDefault();
                      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      window.history.pushState(null, '', '#gain');
                    }
                  }}
                >
                  <span>{data.secondaryCta}</span>
                  <ArrowDown size={16} aria-hidden="true" />
                </Link>
              </div>

              <p className={s.promise}>
                <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                  <circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M6 10.5l2.5 2.5L14 7.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{data.microline}</span>
              </p>
            </div>

            {/* Live Mock Preview Card with 3D Depth Backdrop & Ghost Card */}
            <div className={s.heroVisualWrapper}>
              <div className={s.ambientGlow} aria-hidden="true" />
              <div className={s.ghostCardBehind} aria-hidden="true" />

              <div
                className={s.qcard}
                role="region"
                aria-label="Example freight forwarder cockpit: quote turnaround, margin protection, CargoWise sync"
              >
                <div className={s.qcardTop}>
                  <span>
                    <strong>{data.visualTitle}</strong> · {data.visualLabel}
                  </span>
                  <span className={`${s.statusBadge} ${s.ok}`}>Live Sync</span>
                </div>
                <div className={s.qcardBody}>
                  <div className={s.deskStats}>
                    <div>
                      <span className={s.statVal}>15 min</span>
                      <span className={s.statLabel}>avg quote turnaround</span>
                    </div>
                    <div>
                      <span className={s.statVal}>+$250</span>
                      <span className={s.statLabel}>margin floor / TEU</span>
                    </div>
                    <div>
                      <span className={s.statVal}>98.4%</span>
                      <span className={s.statLabel}>CargoWise match</span>
                    </div>
                  </div>
                  <div className={s.qcardRows}>
                    <div className={s.qcardRow}>
                      <span className={s.rowWho}>Apex Exports</span>
                      <span className={s.rowWhat}>5x40HC · Nhava Sheva to Rotterdam · $1,980/box</span>
                      <span className={`${s.statusBadge} ${s.ok}`}>Quote Ready</span>
                    </div>
                    <div className={s.qcardRow}>
                      <span className={s.rowWho}>Zenith Pharma</span>
                      <span className={s.rowWhat}>BLR to FRA · Air Freight 840 kg · Transit 2d</span>
                      <span className={`${s.statusBadge} ${s.info}`}>Rates Matched</span>
                    </div>
                    <div className={s.qcardRow}>
                      <span className={s.rowWho}>CargoWise Booking</span>
                      <span className={s.rowWhat}>Job #SH-2026-041 · MSC Paloma booked</span>
                      <span className={`${s.statusBadge} ${s.purple}`}>Synced</span>
                    </div>
                  </div>
                </div>
                <p className={s.sampleNote}>{data.chip}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROOF STATS STRIP */}
      <section className={s.proofSection} aria-labelledby="forwarder-stats-title">
        <div className="site-shell">
          <h2 id="forwarder-stats-title" className={s.proofEyebrow}>
            Key facts
          </h2>
          <div className={s.proofGrid4}>
            {data.proofStats.map((item) => {
              const Icon = iconMap[item.iconName] || Zap;
              return (
                <div
                  key={item.title}
                  className={`${s.outcomeCard} ${item.highlight ? s.highlightOutcome : ''}`}
                >
                  <span className={s.outcomeIconBadge} aria-hidden="true">
                    <Icon size={20} className="stroke-[2.2]" />
                  </span>
                  <div className={s.outcomeCardContent}>
                    <p className={s.statValue}>{item.title}</p>
                    <p className={s.outcomeCopy}>{item.copy}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. PROBLEM BAND */}
      <section className={`${s.section} ${s.altSection}`} aria-labelledby="problem-h">
        <div className="site-shell">
          <div className={s.secHead}>
            <p className={s.eyebrow}>{data.challengesEyebrow}</p>
            <h2 id="problem-h" className={s.headline}>
              Four things that cap a<br />
              <span>freight forwarder&apos;s growth.</span>
            </h2>
            <p className={s.lead}>{data.challengesDescription}</p>
          </div>

          <div className={s.painGrid}>
            {data.challenges.map((item) => (
              <article key={item.num} className={s.painCard}>
                <span className={s.painMono}>{item.num}</span>
                <h3>{item.title}</h3>
                <p className={s.painWas}>{item.was}</p>
                <p className={s.painFix}>
                  <strong>Now:</strong> {item.fix}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHAT YOU GET */}
      <section id="gain" className={s.section} aria-labelledby="gain-h">
        <div className="site-shell">
          <div className={s.secHead}>
            <p className={s.eyebrow}>{data.capabilitiesEyebrow}</p>
            <h2 id="gain-h" className={s.headline}>
              Grow your freight business
              <br />
              <span>without operational drag.</span>
            </h2>
            <p className={s.lead}>{data.capabilitiesDescription}</p>
          </div>

          <div className={s.handlesGrid}>
            {data.gainCards.map((card) => (
              <article key={card.title} className={s.handleCard}>
                <span className={s.handleTag}>
                  {card.tag}
                  {card.upcoming && (
                    <span className={s.badge} style={{ marginLeft: 8 }}>
                      Upcoming
                    </span>
                  )}
                </span>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section id="how" className={`${s.section} ${s.howSectionDark}`} aria-labelledby="how-h">
        <div className="site-shell">
          <div className={s.secHead}>
            <p className={s.eyebrow}>{data.processEyebrow}</p>
            <h2 id="how-h" className={s.headline}>
              From customer enquiry
              <br />
              <span>to verified CargoWise booking.</span>
            </h2>
            <p className={s.lead}>{data.processDescription}</p>
          </div>

          <div className={s.howGrid} {...containerProps}>
            {/* Step Tabs List */}
            <ol className={s.stepsList} role="tablist" aria-label="Four steps">
              {data.howSteps.map((step, idx) => (
                <li key={step.num}>
                  <button
                    type="button"
                    role="tab"
                    id={`step-tab-${step.num}`}
                    aria-controls={`step-panel-${step.num}`}
                    aria-selected={active === idx}
                    className={`${s.stepButtonDark} ${active === idx ? s.stepButtonDarkActive : ''}`}
                    onClick={() => goTo(idx)}
                  >
                    <span className={s.stepNumDark}>{step.num}</span>
                    <span className={s.stepTextDark}>
                      <strong>{step.title}</strong>
                      <span className={s.stepDescDark}>{step.desc}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>

            {/* Active Step Panel */}
            <div>
              <div
                className={s.stepPanelDark}
                role="tabpanel"
                id={`step-panel-${activeStep.num}`}
                aria-labelledby={`step-tab-${activeStep.num}`}
              >
                <div className={s.panelBarDark}>
                  <span>{activeStep.panelBar}</span>
                  <span className={`${s.statusBadge} ${s[activeStep.statusType] || s.info}`}>
                    {activeStep.panelStatus}
                  </span>
                </div>

                <div className={s.panelBodyDark}>
                  {activeStep.rows && (
                    <div className={s.qcardRowsDark}>
                      {activeStep.rows.map((row) => (
                        <div key={row.who} className={s.qcardRowDark}>
                          <span className={s.rowWhoDark}>{row.who}</span>
                          <span className={s.rowWhatDark}>{row.what}</span>
                          <span className={`${s.statusBadge} ${s[row.type] || s.ok}`}>
                            {row.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeStep.actions && (
                    <div className={s.qactionsDark}>
                      {activeStep.actions.map((act) => (
                        <button key={act} type="button" className={s.actionBtnDark}>
                          {act}
                        </button>
                      ))}
                    </div>
                  )}

                  {activeStep.files && (
                    <div className={s.fileListDark} style={{ marginTop: 14, marginBottom: 0 }}>
                      {activeStep.files.map((file) => (
                        <span key={file} className={s.fileChipDark}>
                          {file}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <p className={s.panelFootDark}>
                  <strong>{activeStep.foot.split(',')[0]},</strong>
                  {activeStep.foot.includes(',') ? activeStep.foot.substring(activeStep.foot.indexOf(',') + 1) : ''}
                </p>
              </div>

              <p className={s.howNoteDark}>Sample data · Forwarding workflow view</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CUSTOMER STORY */}
      <section className={`${s.section} ${s.altSection}`} aria-labelledby="cust-h">
        <div className="site-shell">
          <div className={s.storyCard}>
            <div className={s.storyCopy}>
              <p className={s.eyebrow}>{data.proofLabel}</p>
              <h2 id="cust-h">{data.proofTitle}: From days to minutes.</h2>
              <p>{data.proofDescription}</p>
            </div>

            <ul className={s.storyFacts}>
              {data.storyFacts.map((fact) => (
                <li key={fact.bold} className={s.storyFactItem}>
                  <strong className={s.storyFactBold}>{fact.bold}</strong>
                  <span className={s.storyFactDesc}>{fact.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 7. FOR THE REST OF YOUR TEAM */}
      <section className={`${s.section} ${s.moreSectionDark}`} aria-labelledby="roles-h">
        <div className="site-shell">
          <div className={s.secHead}>
            <p className={s.eyebrow}>For the rest of your team</p>
            <h2 id="roles-h" className={s.headline}>
              Built for everyone who
              <br />
              <span>moves the freight.</span>
            </h2>
          </div>

          <div className={s.moreGrid}>
            {data.otherRoles.map((role) => (
              <article key={role.role} className={s.moreCard}>
                <span className={s.moreTag}>{role.role}</span>
                <h3>{role.title}</h3>
                <p className={s.moreLead}>{role.lead}</p>
                <Link href={role.href} className={s.moreLink}>
                  <span>{role.linkText}</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section id="faq" className={s.section} aria-labelledby="faq-h">
        <div className="site-shell">
          <div className={s.faqLayout}>
            <div className={s.faqHeading}>
              <div>
                <p className={s.faqEyebrow}>{data.faqsEyebrow}</p>
                <h2 id="faq-h" className={s.faqTitle}>
                  {data.faqsTitle}
                </h2>
                <p className={s.faqDescription}>
                  Have specific integration questions?{' '}
                  <Link href="/demo/#demo-form">Ask our specialists in the demo.</Link>
                </p>
              </div>
            </div>
            <SharedFaqAccordion items={data.faqs} defaultOpenIndex={0} toggleStyle="plus" />
          </div>
        </div>
      </section>

      {/* 9. CLOSING CTA */}
      <LogisticsClosingCta
        eyebrow="SEE IT ON YOUR OWN ENQUIRIES"
        title={
          <>
            Bring last week&apos;s enquiries.
            <br />
            <span>We&apos;ll show you the quotes.</span>
          </>
        }
        copy="Send us a few real customer enquiry emails. In the demo we'll show you how fast Docsynecx benchmarks carrier rates and drafts ready-to-send quotes."
        primaryHref="/demo/#demo-form"
        primaryText="Book a demo"
        secondaryHref="/logistics-desk/"
        secondaryText="Explore Logistics Desk"
      />
    </>
  );
}
