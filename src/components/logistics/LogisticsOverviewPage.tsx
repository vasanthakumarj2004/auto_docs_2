import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Ship, Mail, PackageCheck, Navigation, BarChart3 } from 'lucide-react';
import { LandingNavigation } from '../LandingNavigation';
import { ShipsyFooter } from '../ShipsyFooter';
import { SharedFaqAccordion } from '../SharedFaqAccordion';
import { LogisticsHeroCollage } from './LogisticsHeroCollage';
import { LogisticsHeroVisual } from './LogisticsHeroVisual';
import { LogisticsStatStrip } from './LogisticsStatStrip';
import { LogisticsProblemComparison } from './LogisticsProblemComparison';
import { LogisticsHowItWorks } from './LogisticsHowItWorks';
import { LogisticsGetStarted } from './LogisticsGetStarted';
import { LogisticsClosingCta } from './LogisticsClosingCta';
import { LandingClosingCta } from '../LandingClosingCta';
import { EmailToBookingPage } from './EmailToBookingPage';
import {
  demoHref,
  logisticsModules,
  logisticsFaqs,
  logisticsPageCopy,
  logisticsRoot,
  emailToBookingFeatures,
  shipmentOperationsFeatures,
  shipmentTrackingFeatures,
  freightIntelligenceFeatures,
  type Feature,
  type LogisticsSlug,
} from '../../content/logisticsOverview';
import base from '../LandingPage.module.css';
import s from './LogisticsOverviewPage.module.css';

type PageKey = 'overview' | LogisticsSlug;
const number = (index: number) => String(index + 1).padStart(2, '0');

const MODULE_FLOW_IMAGES: Record<string, { image: string; alt: string; flowTag: string }> = {
  'email-to-booking': {
    image: '/images/logistics-collage/logistics-plane-1.jpg',
    alt: 'Customer enquiry intake and carrier quotation flow',
    flowTag: 'Flow Stage 01 · Inbound Intake',
  },
  'shipment-operations': {
    image: '/images/logistics-collage/logistics-ship-2.jpg',
    alt: 'Shipment operations and CargoWise ERP synchronization',
    flowTag: 'Flow Stage 02 · Execution & Documents',
  },
  'shipment-tracking': {
    image: '/images/logistics-collage/logistics-port-1.jpg',
    alt: 'Container port terminal and live milestone tracking',
    flowTag: 'Flow Stage 03 · Milestone Telemetry',
  },
  'freight-intelligence': {
    image: '/images/logistics-collage/logistics-supply-1.jpg',
    alt: 'Global freight intelligence and margin analytics',
    flowTag: 'Flow Stage 04 · Profitability Insight',
  },
};

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className={`${base.eyebrow} ${s.eyebrow}`}>{children}</p>;
}

function Heading({ eyebrow, title, copy }: { eyebrow: string; title: ReactNode; copy?: string }) {
  return (
    <div className={s.secHead}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className={s.headline}>{title}</h2>
      {copy && <p className={s.lead}>{copy}</p>}
    </div>
  );
}

function Section({ children, id, alternate = false, dark = false }: { children: ReactNode; id?: string; alternate?: boolean; dark?: boolean }) {
  return (
    <section id={id} className={`${base.section} ${alternate ? base.alternate : ''} ${dark ? s.dark : ''}`}>
      <div className="site-shell">{children}</div>
    </section>
  );
}

function Checklist({ items }: { items: readonly string[] }) {
  return (
    <ul className={s.checklist}>
      {items.map(item => (
        <li key={item}>
          <Check size={15} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Features({ items }: { items: Feature[] }) {
  return (
    <div className={s.featureGrid}>
      {items.map(([tag, title, description]) => (
        <article key={title}>
          <span className={s.badge}>{tag}</span>
          <h3>{title}</h3>
          <p>{description}</p>
        </article>
      ))}
    </div>
  );
}

function Hero({ page }: { page: PageKey }) {
  const copy = logisticsPageCopy[page] || logisticsPageCopy.overview;
  const isOverview = page === 'overview';

  return (
    <section className={`${base.hero} ${s.viewportHero} ${isOverview ? s.overviewHero : ''}`} aria-labelledby="logistics-title">
      <div className={`site-shell ${base.heroGrid} ${s.heroGrid}`}>
        <div className={`${base.heroCopy} ${s.heroCopy}`}>
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h1 id="logistics-title" className={s.heroTitle}>
            {copy.headline}<br />
            <span>{copy.accent}</span>
          </h1>
          <p className={base.heroDescription}>{copy.description}</p>
          <div className={base.heroActions}>
            <Link href={demoHref} className={`button-primary ${base.heroButton}`}>
              {copy.primary}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <Link href={isOverview ? '#how' : logisticsRoot} className={`button-secondary ${base.heroButton}`}>
              {copy.secondary}
              {isOverview ? <ArrowDown size={16} aria-hidden="true" /> : <ArrowRight size={16} aria-hidden="true" />}
            </Link>
          </div>
          {isOverview ? (
            <>
              {'promise' in copy && copy.promise && (
                <p className={s.promise}>
                  <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                    <circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="M6 10.5l2.5 2.5L14 7.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{copy.promise}</span>
                </p>
              )}
              <p className={`${base.trust} ${s.heroTrust}`}>
                Works with <strong>Standalone or CargoWise</strong>, your own ERP, or just your email inbox. <strong>Live in about a week.</strong>
              </p>
            </>
          ) : (
            <p className={`${base.trust} ${s.heroTrust}`}>
              <strong>Built for businesses that run on CargoWise</strong>, custom ERPs, and email workflows.
            </p>
          )}
        </div>
        <div className={isOverview ? s.heroVisualWrapper : s.heroCollageWrapper}>
          {isOverview ? <LogisticsHeroVisual /> : <LogisticsHeroCollage />}
        </div>
      </div>
    </section>
  );
}

function Overview() {
  return (
    <>
      {/* Proof / Results stat strip */}
      <LogisticsStatStrip />

      {/* Problem / Enquiry Comparison */}
      <LogisticsProblemComparison />

      {/* How it works: 4 steps with interactive tab panel */}
      <LogisticsHowItWorks />

      {/* Four Modules */}
      <Section id="modules">
        <Heading
          eyebrow="START WITH ONE. ADD THE REST WHEN YOU'RE READY."
          title={<>Four modules,<br /><span>one desk.</span></>}
          copy="Most teams start with RFQ-to-Booking and add operations and tracking later. We set each one up around how your desk already works."
        />
        <div className={s.capabilityGrid}>
          {logisticsModules.map((item) => (
            <article className={base.desk} key={item.slug}>
              <div className={s.cardTop}>
                <span>{item.label}</span>
                {'badge' in item && item.badge && <span className={s.badge}>{item.badge}</span>}
              </div>
              <h3>
                <Link href={`${logisticsRoot}${item.slug}/`}>{item.title}</Link>
              </h3>
              <p className={base.deskCopy}>{item.lead}</p>
              <Checklist items={item.bullets} />
              <Link className={base.deskLink} href={`${logisticsRoot}${item.slug}/`}>
                {item.link}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </Section>

      {/* Live in about a week (Discover, Configure, Test, Go live) */}
      <LogisticsGetStarted />

      {/* FAQ */}
      <Section id="faq" alternate>
        <div className={s.faqLayout}>
          <div className={s.faqHeading}>
            <div>
              <p className={s.faqEyebrow}>COMMON QUESTIONS</p>
              <h2 id="faq-h" className={s.faqTitle}>
                What forwarders ask us first.
              </h2>
              <p className={s.faqDescription}>
                Something else on your mind?{' '}
                <Link href="/demo/#demo-form">Ask us in the demo.</Link>
              </p>
            </div>
          </div>
          <SharedFaqAccordion items={logisticsFaqs} defaultOpenIndex={0} toggleStyle="plus" />
        </div>
      </Section>

      {/* Closing CTA */}
      <LogisticsClosingCta />
    </>
  );
}

function EmailToBooking() {
  return (
    <Section id="capabilities">
      <Heading
        eyebrow="EMAIL-TO-BOOKING AUTOMATION"
        title="Move freight enquiries from inbox to customer quotation."
        copy="Capture customer requirements from email, gather vendor rates, compare options and prepare customer quotations in minutes."
      />
      <Features items={emailToBookingFeatures} />
    </Section>
  );
}

function ShipmentOperations() {
  return (
    <Section id="capabilities">
      <Heading
        eyebrow="SHIPMENT OPERATIONS AUTOMATION"
        title="Connect booking details, documents and shipment workflows."
        copy="Support the operational handoff from accepted quotation to shipment job. Extract, validate and sync shipping documents with CargoWise and custom ERPs."
      />
      <Features items={shipmentOperationsFeatures} />
    </Section>
  );
}

function ShipmentTracking() {
  return (
    <Section id="capabilities">
      <Heading
        eyebrow="SHIPMENT TRACKING"
        title="Make shipment milestones and delays easy to see."
        copy="Bring ocean carrier and road milestone updates into one visible operational workflow with automated exception alerts."
      />
      <Features items={shipmentTrackingFeatures} />
    </Section>
  );
}

function FreightIntelligence() {
  return (
    <Section id="capabilities">
      <Heading
        eyebrow="FREIGHT INTELLIGENCE"
        title="Understand shipment profitability, costs and performance."
        copy="Freight Intelligence is the analytics layer designed to help forwarders analyze shipment margins, carrier variances and commercial performance."
      />
      <Features items={freightIntelligenceFeatures} />
    </Section>
  );
}

export function LogisticsOverviewPage({ page = 'overview' }: { page?: PageKey }) {
  if (page === 'email-to-booking') {
    return <EmailToBookingPage />;
  }

  const copy = logisticsPageCopy[page] || logisticsPageCopy.overview;

  return (
    <div className={`${base.page} ${s.page}`}>
      <a href="#main-content" className={base.skipLink}>Skip to content</a>
      <LandingNavigation />
      <main id="main-content">
        <Hero page={page} />
        {page === 'overview' && <Overview />}
        {page === 'shipment-operations' && <ShipmentOperations />}
        {page === 'shipment-tracking' && <ShipmentTracking />}
        {page === 'freight-intelligence' && <FreightIntelligence />}

        {/* Closing CTA Banner for individual sub-pages */}
        {page !== 'overview' && (
          <LandingClosingCta primaryHref={demoHref} secondaryHref="/#platform" />
        )}
      </main>
      <ShipsyFooter />
    </div>
  );
}
