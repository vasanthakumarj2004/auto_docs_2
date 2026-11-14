import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Ship, Mail, PackageCheck, Navigation, BarChart3 } from 'lucide-react';
import { LandingNavigation } from '../LandingNavigation';
import { FinanceFooter } from '../FinanceFooter';
import { SharedFaqAccordion } from '../SharedFaqAccordion';
import { LogisticsHeroCollage } from './LogisticsHeroCollage';
import { ConnectedLogisticsWorkspace } from './ConnectedLogisticsWorkspace';
import { LogisticsWorkflow } from './LogisticsWorkflow';
import { LogisticsGetStarted } from './LogisticsGetStarted';
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
} from '../../content/logistics';
import base from '../LandingPage.module.css';
import s from './LogisticsPages.module.css';

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
    <div className={base.sectionHeading}>
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2>{title}</h2>
      </div>
      {copy && <p className={base.sectionCopy}>{copy}</p>}
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
    <section className={`${base.hero} ${s.viewportHero}`} aria-labelledby="logistics-title">
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
            <Link href={isOverview ? '#modules' : logisticsRoot} className={`button-secondary ${base.heroButton}`}>
              {copy.secondary}
              {isOverview ? <ArrowDown size={16} aria-hidden="true" /> : <ArrowRight size={16} aria-hidden="true" />}
            </Link>
          </div>
          <p className={`${base.trust} ${s.heroTrust}`}>
            <strong>Built for businesses that run on CargoWise</strong>, custom ERPs, and email workflows.
          </p>
        </div>
        <div className={s.heroCollageWrapper}>
          <LogisticsHeroCollage />
        </div>
      </div>
    </section>
  );
}

function Overview() {
  return (
    <>
      {/* Interactive Freight Workflow */}
      <ConnectedLogisticsWorkspace />

      {/* Logistics Modules */}
      <Section id="modules">
        <Heading
          eyebrow="FOUR CONNECTED MODULES"
          title="Bring disconnected freight workflows into one operating flow."
          copy="Choose the modules that fit your operations. Implementation scope and integrations are agreed around your systems and trade processes."
        />
        <div className={s.capabilityGrid}>
          {logisticsModules.map((item, index) => (
            <article className={base.desk} key={item.slug}>
              <div className={s.cardTop}>
                <span>{number(index)} / {item.label}</span>
                {'badge' in item && item.badge && <span className={s.badge}>{item.badge}</span>}
              </div>
              <h3>
                <Link href={`${logisticsRoot}${item.slug}/`}>{item.title}</Link>
              </h3>
              <p className={base.deskCopy}>{item.description}</p>
              <Checklist items={item.bullets} />
              <Link className={base.deskLink} href={`${logisticsRoot}${item.slug}/`}>
                {item.link}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </Section>

      {/* Freight Operating Workflow (Console layout) */}
      <LogisticsWorkflow />

      {/* Flexible Adoption (Discover, Configure, Validate, Go Live) */}
      <LogisticsGetStarted />

      {/* FAQ */}
      <Section id="faq" alternate>
        <div className={base.faqLayout}>
          <Heading eyebrow="COMMON QUESTIONS" title="Logistics Desk FAQ" />
          <SharedFaqAccordion items={logisticsFaqs} defaultOpenIndex={0} toggleStyle="plus" />
        </div>
      </Section>
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

export function LogisticsPage({ page = 'overview' }: { page?: PageKey }) {
  const copy = logisticsPageCopy[page] || logisticsPageCopy.overview;

  return (
    <div className={`${base.page} ${s.page}`}>
      <a href="#main-content" className={base.skipLink}>Skip to content</a>
      <LandingNavigation />
      <main id="main-content">
        <Hero page={page} />
        {page === 'overview' && <Overview />}
        {page === 'email-to-booking' && <EmailToBooking />}
        {page === 'shipment-operations' && <ShipmentOperations />}
        {page === 'shipment-tracking' && <ShipmentTracking />}
        {page === 'freight-intelligence' && <FreightIntelligence />}

        {/* Closing CTA Banner */}
        <Section>
          <div className={`${base.closingCard} ${s.closingCard}`}>
            <div>
              <Eyebrow>{copy.ctaEyebrow}</Eyebrow>
              <h2>{copy.ctaTitle}</h2>
              <p>{copy.ctaCopy}</p>
            </div>
            <Link className={`button-primary ${base.closingButton}`} href={demoHref}>
              Book a Logistics Demo
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </Section>
      </main>
      <FinanceFooter />
    </div>
  );
}
