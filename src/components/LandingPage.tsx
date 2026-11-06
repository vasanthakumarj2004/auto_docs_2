'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeftRight, ArrowUpRight, FileText, Zap, ShieldCheck, CheckCircle2, TrendingUp } from 'lucide-react';
import { FinanceFooter } from './FinanceFooter';
import { LandingHero } from './LandingHero';
import { SharedFaqAccordion } from './SharedFaqAccordion';
import { LandingNavigation } from './LandingNavigation';
import { useLandingLayout } from './LandingLayoutProvider';
import CircularCarousel, { CustomerStoryItem } from './CircularCarousel';
import { landingDesks, landingFaqs, landingIndustries } from '../content/landing';
import styles from './LandingPage.module.css';

const DESK_IMAGES: Record<string, string> = {
  finance: '/images/624dcd31-e7ca-4c2f-b804-e87bb521192e.png',
  shipment: '/images/e38389f2-4afd-4f87-86dd-6210a3100071.png',
};

const benefits = [
  ['Reduce repetitive work', 'Automate document-heavy steps that slow teams down.'],
  ['Keep people in control', 'Human review and approval stay part of important workflows.'],
  ['Connect your systems', 'Move validated information into your existing business tools.'],
  ['Make data useful', 'Turn finance and operations information into visibility.'],
];
const BENEFIT_ITEMS = [
  { icon: Zap, tag: 'Autonomous Flow' },
  { icon: ShieldCheck, tag: 'Human Review Gate' },
  { icon: ArrowLeftRight, tag: 'Two-Way System Sync' },
  { icon: TrendingUp, tag: 'Actionable Visibility' },
];
const steps = [
  ['Understand', 'Review your process, systems, document types and volumes.'],
  ['Configure', 'Map the workflow, validation points and integration needs.'],
  ['Validate', 'Test with representative documents and your team.'],
  ['Scale', 'Expand to more workflows as results are established.'],
];
const stories: CustomerStoryItem[] = [
  { tag: 'Logistics', name: 'FreightForwarders', metric: '2 hrs → 2 min', summary: 'email to CargoWise', copy: 'A specific email-to-CargoWise document workflow reduced from around two hours to approximately two minutes.', href: '/customers/ft-logistics/' },
  { tag: 'Automotive & EV', name: 'Automotive Industries', metric: 'Days → hours', summary: 'document workflow', copy: 'Manual document workload reduced from days to hours through an AI-assisted workflow.', href: '/customers/rajadurai/' },
  { tag: 'Business operations', name: 'Manufacturing', metric: 'In daily use', summary: 'assets & purchase bills', copy: 'Regular operational use for asset and purchase bill workflows with zero manual re-entry.' },
  { tag: 'Retail & Distribution', name: 'OmniRetail Networks', metric: '94% automated', summary: 'multi-vendor invoicing', copy: 'High-volume invoice auditing and trade documents posted directly without error delays.' },
  { tag: 'Textile & Garments', name: 'Global Fabrics Ltd', metric: '3x faster sync', summary: 'supplier & export manifests', copy: 'Complex supplier bills and export manifests reconciled in minutes instead of days.' },
];
const integrations = [
  ['TallyPrime', 'Finance integration'], ['CargoWise', 'Logistics integration'],
  ['Email workflows', 'Document intake'], ['API connectivity', 'Connected workflows'],
  ['Zoho Books', 'Finance integration'], ['SAP', 'Enterprise resource planning'],
  ['Oracle ERP', 'Cloud ERP & financial'], ['Microsoft Dynamics', 'Business applications'],
];

function SectionHeading({ eyebrow, title, copy, id }: { eyebrow: string; title: React.ReactNode; copy?: string; id: string }) {
  return <div className={styles.sectionHeading}>
    <div><p className={styles.eyebrow}>{eyebrow}</p><h2 id={id}>{title}</h2></div>
    {copy && <p className={styles.sectionCopy}>{copy}</p>}
  </div>;
}

export function LandingPage() {
  const { layout } = useLandingLayout();
  const [heroHeight, setHeroHeight] = useState<number>(0);

  useEffect(() => {
    const update = () => {
      const hero = document.getElementById('top');
      if (hero) {
        const rect = hero.getBoundingClientRect();
        const scroll = window.scrollY || document.documentElement.scrollTop;
        setHeroHeight(rect.bottom + scroll);
      }
    };
    update();
    const hero = document.getElementById('top');
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null;
    if (hero && ro) ro.observe(hero);
    window.addEventListener('resize', update);
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  return <div className={styles.page}>
    <a href="#main-content" className={styles.skipLink}>Skip to content</a>
    {/* Full background video starting from announcement bar down through hero (Layout 4 from changes_1) */}
    {layout === 'v4' && (
      <div
        className={styles.heroBgWrapper}
        style={{ height: heroHeight > 0 ? `${heroHeight}px` : '100svh' }}
        aria-hidden="true"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className={styles.heroBgMedia}
          poster="/images/bg1_thumb.jpg"
        >
          <source src="/images/bg1.mp4" type="video/mp4" />
          <img src="/images/bg1.gif" alt="" className={styles.heroBgMedia} />
        </video>
        <div className={styles.heroOverlay} />
      </div>
    )}
    <LandingNavigation />
    <main id="main-content">
      <LandingHero />
      <section className={styles.statStrip} aria-labelledby="outcomes-title">
        <div className="site-shell">
          <h2 id="outcomes-title" className={styles.eyebrow}>Selected customer outcomes</h2>
          <div className={styles.stats}>
            {stories.slice(0, 3).map((story, index) => {
              const Icon = index === 0 ? Zap : index === 1 ? ShieldCheck : CheckCircle2;
              return (
                <div key={story.name} className={styles.outcomeCard}>
                  <div className={styles.outcomeCardTop}>
                    <p className={styles.statValue}>{story.metric}</p>
                    <span className={styles.outcomeIconBadge} aria-hidden="true">
                      <Icon size={15} className="stroke-[2.2]" />
                    </span>
                  </div>
                  <div className={styles.outcomeCardBody}>
                    <h3 className={styles.outcomeTitle}>{story.name}</h3>
                    <p className={styles.outcomeSummary}>{story.summary}</p>
                    <p className={styles.outcomeCopy}>{story.copy}</p>
                  </div>
                  {story.href && (
                    <Link href={story.href} className={styles.outcomeLink}>
                      <span>Read customer story</span>
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section id="platform" className={styles.section} aria-labelledby="platform-title">
        <div className="site-shell">
          <SectionHeading id="platform-title" eyebrow="One platform. Two desks." title={<>One Platform.<br /><span>Endless Opportunities.</span></>} />
          <div className={styles.desks}>
            {landingDesks.map((desk, index) => {
              const imageSrc = DESK_IMAGES[desk.id] || (index === 0 ? '/images/624dcd31-e7ca-4c2f-b804-e87bb521192e.png' : '/images/e38389f2-4afd-4f87-86dd-6210a3100071.png');
              return (
                <article key={desk.id} id={desk.id} className={styles.desk} data-desk={desk.id} tabIndex={0}>
                  <div className={styles.deskImageWrapper}>
                    <img
                      src={imageSrc}
                      alt={`${desk.title} background`}
                      className={styles.deskImage}
                      loading="lazy"
                    />
                    <div className={styles.deskScrim} />
                  </div>

                  <div className={styles.deskCenterView}>
                    <h3 className={styles.deskCenterTitle}>{desk.title}</h3>
                  </div>

                  <div className={styles.deskHoverView}>
                    <div className={styles.deskHoverTop}>
                      <span className={styles.deskHoverEyebrow}>{desk.tag}</span>
                      <span className={styles.deskHoverIcon}>
                        {index === 0 ? <FileText size={20} aria-hidden="true" /> : <ArrowLeftRight size={20} aria-hidden="true" />}
                      </span>
                    </div>

                    <div className={styles.deskHoverBody}>
                      <h3 className={styles.deskHoverTitle}>{desk.title}</h3>
                      <p className={styles.deskHoverCopy}>{desk.copy}</p>
                      <ul className={styles.deskHoverChips}>
                        {desk.features.map(feature => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>
                    </div>

                    <div className={styles.deskHoverFooter}>
                      <Link href={desk.href} className={styles.deskHoverLink}>
                        Explore {desk.title}
                        <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <p className={styles.deskText}>Start with the workflow that takes the most effort today. Expand as your teams are ready.</p>
        </div>
      </section>
      <section id="why-docsynecx" className={`${styles.section} ${styles.alternate}`} aria-labelledby="why-title">
        <div className="site-shell">
          <SectionHeading id="why-title" eyebrow="Why Docsynecx" title={<>Less manual effort.<br /><span>More operational clarity.</span></>} />
          <div className={styles.benefits}>
            {benefits.map(([title, copy], index) => {
              const item = BENEFIT_ITEMS[index] || BENEFIT_ITEMS[0];
              const IconComponent = item.icon;
              return (
                <article key={title} className={styles.benefitCard}>
                  <div className={styles.benefitVisual}>
                    <div className={styles.benefitIconBox}>
                      <div className={styles.benefitRingOuter} />
                      <div className={styles.benefitRingInner} />
                      <span className={styles.benefitIconBadge}>
                        <IconComponent size={26} strokeWidth={2.2} aria-hidden="true" />
                      </span>
                      <span className={styles.benefitTag}>
                        <span className={styles.benefitDot} />
                        {item.tag}
                      </span>
                    </div>
                  </div>

                  <div className={styles.benefitContent}>
                    <span className={styles.benefitNumber}>0{index + 1}</span>
                    <h3 className={styles.benefitTitle}>{title}</h3>
                    <p className={styles.benefitCopy}>{copy}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section id="solutions" className={styles.section} aria-labelledby="solutions-title">
        <div className="site-shell">
          <SectionHeading id="solutions-title" eyebrow="Solutions by industry" title="Designed for real business operations." copy="" />
          <div className={styles.industries}>
            {landingIndustries.map((industry) => (
              <article key={industry.id} id={industry.id} className={styles.industryCard}>
                <div className={styles.industryImageWrapper}>
                  <img
                    src={industry.image}
                    alt={industry.title}
                    className={styles.industryImage}
                    loading="lazy"
                  />
                  <div className={styles.industryImageOverlay} aria-hidden="true" />
                </div>
                <h3 className={styles.industryTitle}>{industry.title}</h3>
                <p className={styles.industryCopy}>{industry.copy}</p>
              </article>
            ))}
          </div>
          <ul className={`${styles.chips} ${styles.workflowChips}`}>{['Invoice Automation', 'Financial Workflows', 'RFQ to Booking', 'Shipment Tracking', 'Document Automation'].map(item => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>
      <section id="customers" className={`${styles.section} ${styles.alternate}`} aria-labelledby="customers-title">
        <div className="site-shell">
          <SectionHeading id="customers-title" eyebrow="Customer stories" title={<>Real workflows.<br /><span>Meaningful time saved.</span></>} copy="" />
          
          <div style={{ width: '100%', height: '450px', position: 'relative', marginTop: '-50px', marginBottom: '-30px' }}>
            <CircularCarousel
              stories={stories}
              preset="cylinder"
              intro="rise"
              cardWidth={400}
              aspectRatio={1.28}
              gap={25}
              speed={8}
              fadeColor="#f6f5f9"
              depthFade={0.55}
              cornerRadius={12}
              draggable={true}
              pauseOnHover={true}
              focusOnClick={true}
            />
          </div>
        </div>
      </section>
      <section id="how-it-works" className={styles.section} aria-labelledby="process-title">
        <div className="site-shell">
          <SectionHeading id="process-title" eyebrow="How it works" title="A practical path from problem to progress." copy="Start small, validate with your own documents and expand when the workflow proves its value." />
          <ol className={styles.steps}>{steps.map(([title, copy], index) => <li key={title}>
            <span className={styles.number}>0{index + 1}</span><h3>{title}</h3><p>{copy}</p>
          </li>)}</ol>
        </div>
      </section>
      <section id="integrations" className={`${styles.section} ${styles.alternate}`} aria-labelledby="integrations-title">
        <div className={`site-shell ${styles.integrationLayout}`}>
          <div><SectionHeading id="integrations-title" eyebrow="Integrations & resources" title="Fits the systems your teams already use." /><p className={styles.sectionCopy}>Keep your existing tools. Move validated information into the workflows your team relies on.</p><Link href="/demo/" className={styles.textLink}>Discuss your integration<ArrowRight size={16} aria-hidden="true" /></Link></div>
          <div className={styles.integrationPanel}>{integrations.map(([name, type]) => <div key={name}><strong>{name}</strong><span>{type}</span></div>)}</div>
        </div>
      </section>
      <section id="faq" className={`${styles.section} ${styles.faqSection}`} aria-labelledby="faq-title">
        <div className={`site-shell ${styles.faqLayout}`}>
          <div className={styles.faqHeader}>
            <p className={styles.eyebrow}>FAQ</p>
            <h2 id="faq-title">Frequently asked questions</h2>
            <p className={styles.faqSubtitle}>Everything you need to know about Docsynecx document automation, integrations, and deployment.</p>
          </div>
          <SharedFaqAccordion items={landingFaqs} defaultOpenIndex={0} toggleStyle="plus" />
        </div>
      </section>

      {/* Standalone "Let's make work flow" light card section outside the footer */}
      <section id="contact" className={styles.closing} aria-labelledby="closing-title">
        <div className="site-shell">
          <div className={styles.closingCardLight}>
            <div className={styles.closingEyebrow}>
              <span className={styles.closingEyebrowDot} aria-hidden="true" />
              <span>Let’s make work flow</span>
            </div>
            <h2 id="closing-title" className={styles.closingHeadline}>
              What could your team do with less manual work?
            </h2>
            <p className={styles.closingSub}>
              Finance and logistics are too critical for manual typing and data-entry errors. Docsynecx automates document checks, posting, and matching directly in Tally and CargoWise.
            </p>
            <div className={styles.closingCtas}>
              <Link href="/demo/" className={styles.closingPrimaryBtn}>
                <span>Book a Demo</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
              <Link href="/calculator/" className={styles.closingGhostBtn}>
                <span>Calculate ROI</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
    <FinanceFooter />
  </div>;
}
