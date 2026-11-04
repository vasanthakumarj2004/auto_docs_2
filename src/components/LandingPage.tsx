import Link from 'next/link';
import { ArrowRight, ArrowLeftRight, ArrowUpRight, FileText } from 'lucide-react';
import { DocsynecxLogo } from './DocsynecxLogo';
import { LandingHero } from './LandingHero';
import { SharedFaqAccordion } from './SharedFaqAccordion';
import { LandingNavigation } from './LandingNavigation';
import { landingDesks, landingFaqs, landingIndustries } from '../content/landing';
import styles from './LandingPage.module.css';

const benefits = [
  ['Reduce repetitive work', 'Automate document-heavy steps that slow teams down.'],
  ['Keep people in control', 'Human review and approval stay part of important workflows.'],
  ['Connect your systems', 'Move validated information into your existing business tools.'],
  ['Make data useful', 'Turn finance and operations information into visibility.'],
];
const steps = [
  ['Understand', 'Review your process, systems, document types and volumes.'],
  ['Configure', 'Map the workflow, validation points and integration needs.'],
  ['Validate', 'Test with representative documents and your team.'],
  ['Scale', 'Expand to more workflows as results are established.'],
];
const stories = [
  { tag: 'Logistics', name: 'FT Logistics', metric: '2 hrs → 2 min', summary: 'email to CargoWise', copy: 'A specific email-to-CargoWise document workflow reduced from around two hours to approximately two minutes.', href: '/customers/ft-logistics/' },
  { tag: 'Automotive & EV', name: 'Rajadurai E-Vehicles', metric: 'Days → hours', summary: 'document workflow', copy: 'Manual document workload reduced from days to hours through an AI-assisted workflow.', href: '/customers/rajadurai/' },
  { tag: 'Business operations', name: 'Arishfirma', metric: 'In daily use', summary: 'assets & purchase bills', copy: 'Regular operational use for asset and purchase bill workflows.' },
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
  return <div className={styles.page}>
    <a href="#main-content" className={styles.skipLink}>Skip to content</a>
    <LandingNavigation />
    <main id="main-content">
      <LandingHero />
      <section className={styles.statStrip} aria-labelledby="outcomes-title">
        <div className="site-shell">
          <h2 id="outcomes-title" className={styles.eyebrow}>Selected customer outcomes</h2>
          <div className={styles.stats}>{stories.map(story => <div key={story.name}>
            <p className={styles.statValue}>{story.metric}</p>
            <p className={styles.statLabel}><strong>{story.name}</strong><span> · {story.summary}</span></p>
          </div>)}</div>
        </div>
      </section>
      <section id="platform" className={styles.section} aria-labelledby="platform-title">
        <div className="site-shell">
          <SectionHeading id="platform-title" eyebrow="One platform. Two desks." title={<>Two focused workspaces.<br />One connected platform.</>} copy="Start with the workflow that takes the most effort today. Expand as your teams are ready." />
          <div className={styles.desks}>{landingDesks.map((desk, index) => <article key={desk.id} id={desk.id} className={styles.desk} data-desk={desk.id}>
            <div className={styles.deskTop}><p className={styles.eyebrow}>{desk.tag}</p><span className={styles.deskIcon}>{index === 0 ? <FileText size={24} aria-hidden="true" /> : <ArrowLeftRight size={24} aria-hidden="true" />}</span></div>
            <h3>{desk.title}</h3><p className={styles.deskCopy}>{desk.copy}</p>
            <ul className={styles.chips}>{desk.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
            <Link href={desk.href} className={styles.deskLink}>Explore {desk.title}<ArrowRight size={17} aria-hidden="true" /></Link>
          </article>)}</div>
        </div>
      </section>
      <section id="why-docsynecx" className={`${styles.section} ${styles.alternate}`} aria-labelledby="why-title">
        <div className="site-shell">
          <SectionHeading id="why-title" eyebrow="Why Docsynecx" title={<>Less manual effort.<br /><span>More operational clarity.</span></>} />
          <div className={styles.benefits}>{benefits.map(([title, copy], index) => <article key={title}>
            <span className={styles.number}>0{index + 1}</span><h3>{title}</h3><p>{copy}</p>
          </article>)}</div>
        </div>
      </section>
      <section id="solutions" className={styles.section} aria-labelledby="solutions-title">
        <div className="site-shell">
          <SectionHeading id="solutions-title" eyebrow="Solutions by industry" title="Designed for real business operations." copy="Solutions for organisations where invoices, shipment updates and business documents are part of everyday work." />
          <div className={styles.industries}>{landingIndustries.map((industry, index) => <article key={industry.id} id={industry.id}>
            <span className={styles.number}>0{index + 1}</span><h3>{industry.title}</h3><p>{industry.copy}</p>
          </article>)}</div>
          <ul className={`${styles.chips} ${styles.workflowChips}`}>{['Invoice Automation', 'Financial Workflows', 'RFQ to Booking', 'Shipment Tracking', 'Document Automation'].map(item => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>
      <section id="customers" className={`${styles.section} ${styles.alternate}`} aria-labelledby="customers-title">
        <div className="site-shell">
          <SectionHeading id="customers-title" eyebrow="Customer stories" title={<>Real workflows.<br /><span>Meaningful time saved.</span></>} copy="Selected outcomes from customer workflows. Results depend on process scope, document quality and implementation." />
          <div className={styles.stories}>{stories.map(story => <article key={story.name}>
            <p className={styles.storyTag}>{story.tag}</p><h3>{story.name}</h3><p>{story.copy}</p>
            {story.href && <Link href={story.href} className={styles.textLink}>Read customer story<ArrowUpRight size={15} aria-hidden="true" /></Link>}
          </article>)}</div>
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
      <section id="faq" className={styles.section} aria-labelledby="faq-title">
        <div className={`site-shell ${styles.faqLayout}`}>
          <div><SectionHeading id="faq-title" eyebrow="FAQ" title="Questions teams ask before they start." /><p className={styles.sectionCopy}>Can’t find your answer? <Link href="/demo/" className={styles.inlineLink}>Book a demo</Link> and we’ll walk through your workflow.</p></div>
          <SharedFaqAccordion items={landingFaqs} defaultOpenIndex={0} toggleStyle="plus" />
        </div>
      </section>
      <section id="contact" className={styles.closing} aria-labelledby="closing-title">
        <div className="site-shell">
          <div className={styles.closingCard}>
            <div><p className={styles.eyebrow}>Let’s make work flow</p><h2 id="closing-title">What could your team do with less manual work?</h2><p>Tell us about your finance or freight workflow. We’ll help identify a practical place to start.</p></div>
            <Link href="/demo/" className={`button-primary ${styles.closingButton}`}>Book a Demo<ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
          <p className={styles.companyLine}>SynecX AI Labs Private Limited · Coimbatore, Tamil Nadu, India · <a href="mailto:info@docsynecx.com">info@docsynecx.com</a></p>
        </div>
      </section>
    </main>
    <footer className={styles.footer}>
      <div className="site-shell">
        <div className={styles.footerGrid}>
          <div><Link href="/" className={styles.brand} aria-label="Docsynecx home"><DocsynecxLogo variant="footer" className={styles.footerLogo} /><span>Intelligent workflows</span></Link><p className={styles.footerDescription}>AI-powered finance and logistics workflows for document-intensive businesses.</p></div>
          {landingDesks.map(desk => <nav key={desk.id} aria-label={`${desk.title} footer links`}><h2>{desk.title}</h2><ul>{desk.id === 'finance' && <li><Link href={desk.href}>Docsynecx Intelligence</Link></li>}{desk.features.map(feature => <li key={feature}><Link href={desk.href}>{feature}</Link></li>)}</ul></nav>)}
          <nav aria-label="Company footer links"><h2>Company</h2><ul><li><Link href="/#solutions">Solutions</Link></li><li><Link href="/#customers">Customers</Link></li><li><Link href="/#why-docsynecx">About Us</Link></li><li><Link href="/demo/">Contact</Link></li></ul></nav>
        </div>
        <div className={styles.footerBottom}><p>© 2026 SynecX AI Labs Private Limited. All rights reserved.</p><a href="mailto:info@docsynecx.com">info@docsynecx.com</a></div>
      </div>
    </footer>
  </div>;
}
