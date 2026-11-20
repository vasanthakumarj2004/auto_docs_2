'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowDown, CheckCircle2, Clock, TrendingUp, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { LandingNavigation } from '../LandingNavigation';
import { ShipsyFooter } from '../ShipsyFooter';
import { SharedFaqAccordion } from '../SharedFaqAccordion';
import { LogisticsClosingCta } from './LogisticsClosingCta';
import layoutStyles from '../LandingPage.module.css';
import s from './EmailToBookingPage.module.css';

/* ── Three Ways to Connect Data ── */
const threeWaysData = [
  {
    num: '01 · CargoWise',
    tag: 'Most common',
    title: 'You run CargoWise',
    lead: 'Bookings and jobs go straight into CargoWise.',
    bullets: [
      'Confirmed bookings created with shipper, ports, cargo and rate filled in',
      'Jobs pushed with parties matched to your existing records',
      'Container and B/L numbers picked up for tracking',
      'Ops keeps working in CargoWise as usual',
    ],
  },
  {
    num: '02 · Other TMS or ERP',
    tag: null,
    title: 'You run another system',
    lead: 'Your own TMS or ERP, including ones built in-house.',
    bullets: [
      'We look at what your system can send and receive',
      'Jobs and bookings are pushed in the format it accepts',
      'The same checks and approvals as CargoWise users get',
      'Agreed with your IT team before go-live',
    ],
  },
  {
    num: '03 · Standalone',
    tag: null,
    title: 'No TMS yet',
    lead: 'Run it from your email inbox on its own.',
    bullets: [
      'Quotes, bookings and jobs are kept in Docsynecx',
      'Tracking and document checks work the same way',
      'Connect a TMS later without starting again',
      'A good fit for smaller desks and new branches',
    ],
  },
];

/* ── What Moves Where Table Data ── */
const mappingData = [
  {
    what: 'Customer enquiries',
    comesFrom: 'Your sales inbox',
    endsUpIn: 'Docsynecx, as a quote draft',
    module: 'Email-to-Booking',
    href: '/logistics/email-to-booking/',
  },
  {
    what: 'Vendor rates',
    comesFrom: 'Vendor emails and your rate cards',
    endsUpIn: 'Docsynecx, side by side',
    module: 'Email-to-Booking',
    href: '/logistics/email-to-booking/',
  },
  {
    what: 'Confirmed bookings',
    comesFrom: 'Docsynecx, after your approval',
    endsUpIn: 'CargoWise, TMS or ERP',
    module: 'Email-to-Booking',
    href: '/logistics/email-to-booking/',
  },
  {
    what: 'Jobs',
    comesFrom: 'The accepted quote',
    endsUpIn: 'CargoWise, TMS or ERP',
    module: 'Shipment Operations',
    href: '/logistics/shipment-operations/',
  },
  {
    what: 'B/L, invoice, packing list',
    comesFrom: 'Email attachments',
    endsUpIn: 'Docsynecx, checked against each other',
    module: 'Shipment Operations',
    href: '/logistics/shipment-operations/',
  },
  {
    what: 'Vendor invoices',
    comesFrom: 'Email attachments',
    endsUpIn: 'Docsynecx, checked against the agreed rate',
    module: 'Shipment Operations',
    href: '/logistics/shipment-operations/',
  },
  {
    what: 'Container and LR numbers',
    comesFrom: 'The job',
    endsUpIn: 'Docsynecx tracking',
    module: 'Shipment Tracking',
    href: '/logistics/shipment-tracking/',
  },
  {
    what: 'Positions and milestones',
    comesFrom: 'Carrier data and transporter GPS',
    endsUpIn: "Docsynecx, and your customer's tracking link",
    module: 'Shipment Tracking',
    href: '/logistics/shipment-tracking/',
  },
  {
    what: 'Profit by job and lane',
    comesFrom: 'Quotes, jobs and vendor invoices',
    endsUpIn: 'Management reports',
    module: 'Freight Intelligence',
    href: '/logistics/freight-intelligence/',
    soon: true,
  },
];

/* ── 4 Setup Steps Data ── */
const setupSteps = [
  {
    step: 'Step 1',
    title: 'Look at your system',
    desc: 'Which system you run, and what it can send and receive.',
    end: 'We know how it connects',
    final: false,
  },
  {
    step: 'Step 2',
    title: 'Agree what moves',
    desc: 'Which fields go into bookings and jobs, and how parties are matched to your records.',
    end: 'No surprises in your data',
    final: false,
  },
  {
    step: 'Step 3',
    title: 'Test on sample jobs',
    desc: 'Push a few test bookings and jobs, and your team checks them in your system.',
    end: 'Your team signs off',
    final: false,
  },
  {
    step: 'Step 4',
    title: 'Go live',
    desc: 'Real bookings and jobs start flowing. Ops works where they always work.',
    end: 'Nobody types it in twice',
    final: true,
  },
];

/* ── FAQ items ── */
const faqItems = [
  {
    question: 'Do we need CargoWise to use Docsynecx?',
    answer:
      'No. It works with CargoWise, with other TMS and ERPs, or on its own from your email inbox.',
  },
  {
    question: 'We don\'t use CargoWise. Will it work with our system?',
    answer:
      'Tell us which system you run, including in-house ones. During setup we check what it can send and receive, and agree how bookings and jobs go in, before you commit.',
  },
  {
    question: 'Will it create duplicate shippers or consignees?',
    answer:
      'No. Parties are matched to the records already in your system. We agree how that matching works during setup.',
  },
  {
    question: 'Does anything go into our system without us checking?',
    answer:
      'Bookings only go in after your team approves the quote and the customer confirms. Document mismatches wait for your ops team to clear.',
  },
  {
    question: 'Can we start without a TMS and connect one later?',
    answer:
      'Yes. Start standalone from your inbox, and connect a TMS or ERP when you\'re ready without starting again.',
  },
  {
    question: 'How long does the connection take to set up?',
    answer:
      'It\'s part of the normal setup, which takes about a week for a typical team.',
  },
];

export function LogisticsIntegrationsPage() {
  return (
    <div className={`${layoutStyles.page} ${s.page}`}>
      <a href="#main-content" className={s.skipLink}>
        Skip to content
      </a>

      {/* Global Navigation */}
      <LandingNavigation />

      <main id="main-content">
        {/* 1. HERO SECTION (Warm Paper Gradient matching Email-to-Booking) */}
        <section className={s.viewportHero} aria-labelledby="hero-title">
          <div className={`site-shell ${s.heroGrid}`}>
            {/* Left Copy */}
            <div className={s.heroCopy}>
              <nav aria-label="Breadcrumb" className={s.breadcrumb}>
                <Link href="/logistics-desk/">Freight Desk</Link>
                <span className={s.breadcrumbSeparator}>/</span>
                <span>Integrations</span>
              </nav>

              <p className={s.eyebrow}>INTEGRATIONS · CARGOWISE, TMS AND ERP</p>

              <h1 id="hero-title" className={s.heroTitle}>
                Works with the system <em>your team already uses.</em>
              </h1>

              <p className={s.heroDescription}>
                CargoWise, another TMS, your own ERP, or just your email inbox. Docsynecx does the
                reading, checking and drafting, then pushes jobs and bookings into your system.
                Nobody types anything twice.
              </p>

              <div className={s.heroActions}>
                <Link href="/demo/#demo-form" className="button-primary">
                  <span>Book a demo</span>
                  <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
                <a href="#ways" className="button-secondary">
                  <span>See how it connects</span>
                </a>
              </div>

              <p className={s.promise}>
                <CheckCircle2 size={18} aria-hidden="true" />
                <span>Your system stays your system. Ops keeps working where they always work.</span>
              </p>

              <p className={s.heroTrust}>
                Works with <strong>CargoWise</strong>, your own ERP, or just your email inbox. <strong>Live in about a week.</strong>
              </p>
            </div>

            {/* Right Live Preview Card (Matching Email-to-Booking) */}
            <div className={s.heroVisualWrapper}>
              <div className={s.ambientGlow} aria-hidden="true" />
              <div className={s.ghostCardBehind} aria-hidden="true" />

              <div
                className={s.qcard}
                role="img"
                aria-label="Example integration flow: inquiries and documents arrive, Docsynecx reads and checks them, jobs and bookings are pushed to CargoWise or your TMS/ERP"
              >
                {/* Top bar */}
                <div className={s.intelCardTop}>
                  <strong>How data moves</strong>
                  <span className={s.marginLeakBadge} style={{ color: '#94a3b8', borderColor: 'rgba(255, 255, 255, 0.14)', background: 'rgba(255, 255, 255, 0.05)' }}>
                    One job
                  </span>
                </div>

                {/* Body with vertical 3-stage flow */}
                <div className={s.intelCardBody}>
                  <div className={s.flowContainer}>
                    {/* Node 1: Comes in */}
                    <div className={s.flowNode}>
                      <span className={s.flowNodeEyebrow}>Comes in</span>
                      <span className={s.flowNodeTitle}>Your inbox</span>
                      <span className={s.flowNodeSub}>Enquiries, rates, B/Ls, invoices</span>
                    </div>

                    {/* Connector Arrow */}
                    <div className={s.flowArrow}>
                      <ArrowDown size={18} aria-hidden="true" />
                    </div>

                    {/* Node 2: Docsynecx Core */}
                    <div className={s.flowNode}>
                      <span className={s.flowNodeEyebrow}>Docsynecx Core</span>
                      <span className={s.flowNodeTitle}>Reads, checks, drafts</span>
                      <span className={s.flowNodeSub}>Your team approves</span>
                    </div>

                    {/* Connector Arrow */}
                    <div className={s.flowArrow}>
                      <ArrowDown size={18} aria-hidden="true" />
                    </div>

                    {/* Node 3: Goes out */}
                    <div className={s.flowNode}>
                      <span className={s.flowNodeEyebrow}>Goes out</span>
                      <span className={s.flowNodeTitle}>CargoWise · TMS · ERP</span>
                      <span className={s.flowNodeSub}>Bookings and jobs, filled in</span>
                    </div>
                  </div>
                </div>

                <p className={s.intelSampleFoot}>Example flow · End-to-end automation</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. THREE WAYS TO CONNECT SECTION (#ways - Clean Light Paper like Control Section) */}
        <section id="ways" className={s.controlSection} aria-labelledby="ways-h">
          <div className="site-shell">
            <div className={s.controlHead}>
              <p className={s.eyebrow}>THREE WAYS TO CONNECT</p>
              <h2 id="ways-h" className={s.headline}>
                Pick the one that matches <em>your desk.</em>
              </h2>
              <p className={s.lead}>
                Most forwarders fit one of these. We confirm which during setup, before you commit.
              </p>
            </div>

            <div className={s.threeWaysGrid}>
              {threeWaysData.map((item) => (
                <article key={item.num} className={s.threeWaysCard}>
                  <div className={s.threeWaysCardTop}>
                    <span className={s.threeWaysMonoNum}>{item.num}</span>
                    {item.tag && <span className={s.threeWaysTag}>{item.tag}</span>}
                  </div>
                  <h3 className={s.threeWaysTitle}>{item.title}</h3>
                  <p className={s.threeWaysLead}>{item.lead}</p>
                  <ul className={s.threeWaysList}>
                    {item.bullets.map((bullet, idx) => (
                      <li key={idx} className={s.threeWaysItem}>
                        <span className={s.threeWaysBullet} aria-hidden="true" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 3. WHAT MOVES WHERE TABLE SECTION (#map - Deep Navy Container like Steps in Email-to-Booking) */}
        <section id="map" className={s.howSectionDark} aria-labelledby="map-h">
          <div className="site-shell">
            <div className={s.secHead}>
              <p className={s.eyebrow} style={{ color: '#18cb96' }}>WHAT MOVES WHERE</p>
              <h2 id="map-h" className={s.headlineLight}>
                Every piece of data, and <em>where it ends up.</em>
              </h2>
              <p className={s.leadLight}>
                Following one shipment from the first email to the month-end report.
              </p>
            </div>

            <div className={s.mapTableWrapDark}>
              <table className={s.mapTableDark}>
                <thead>
                  <tr>
                    <th>What</th>
                    <th>Comes from</th>
                    <th>Ends up in</th>
                    <th>Module</th>
                  </tr>
                </thead>
                <tbody>
                  {mappingData.map((row, idx) => (
                    <tr key={idx}>
                      <td>
                        <strong>{row.what}</strong>
                      </td>
                      <td>{row.comesFrom}</td>
                      <td>{row.endsUpIn}</td>
                      {/* <td>
                        <Link href={row.href} className={s.moduleBadgeDark}>
                          <span>{row.module}</span>
                          {row.soon && <span className={s.soonPill}>Soon</span>}
                        </Link>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 4. SETUP SECTION (#setup - Warm Paper Gradient like Story Section) */}
        <section id="setup" className={s.storySection} aria-labelledby="setup-h">
          <div className="site-shell">
            <div className={s.secHead}>
              <p className={s.eyebrow}>PART OF THE ONE-WEEK SETUP</p>
              <h2 id="setup-h" className={s.headline}>
                Connected in the <em>same week you go live.</em>
              </h2>
              <p className={s.lead}>
                The connection is set up alongside everything else. You test it on sample jobs
                before anything real goes into your system.
              </p>
            </div>

            <div className={s.setupWeekGrid}>
              {setupSteps.map((step) => (
                <div key={step.step} className={s.setupPhaseCard}>
                  <div className={`${s.setupPhaseHead} ${step.final ? s.setupPhaseHeadFinal : ''}`}>
                    <span className={s.setupPhaseMono}>{step.step}</span>
                  </div>
                  <h3 className={s.setupPhaseTitle}>{step.title}</h3>
                  <p className={s.setupPhaseDesc}>{step.desc}</p>
                  <p className={s.setupPhaseEnd}>{step.end}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. FAQ SECTION (Clean White Paper) */}
        <section id="faq" className={s.faqSection} aria-labelledby="faq-h">
          <div className="site-shell">
            <div className={s.faqLayout}>
              <div className={s.faqHeading}>
                <div>
                  <p className={s.faqEyebrow}>COMMON QUESTIONS</p>
                  <h2 id="faq-h" className={s.faqTitle}>
                    What IT and ops heads ask us first.
                  </h2>
                  <p className={s.faqDescription}>
                    Running something we haven&apos;t listed?{' '}
                    <Link href="/demo/#demo-form">Ask us in the demo.</Link>
                  </p>
                </div>
              </div>

              <SharedFaqAccordion items={faqItems} defaultOpenIndex={0} toggleStyle="plus" />
            </div>
          </div>
        </section>

        {/* 6. CLOSING CTA SECTION (Deep Navy Card) */}
        <LogisticsClosingCta
          eyebrow="SEE IT WITH YOUR SYSTEM"
          title={
            <>
              Tell us what you run.<br />
              <span>We&apos;ll show you how it connects.</span>
            </>
          }
          copy="In the demo we'll walk through how bookings and jobs would land in your system, using a few of your own recent enquiries."
          steps={[
            'Book a 30-minute demo',
            'Tell us which TMS or ERP you use',
            'See a booking land in it, step by step',
          ]}
          secondaryHref="/logistics-desk/"
          secondaryText="Back to Freight Desk"
        />
      </main>

      {/* Global Footer */}
      <ShipsyFooter />
    </div>
  );
}
