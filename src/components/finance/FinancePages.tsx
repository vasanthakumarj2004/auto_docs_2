import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { LandingNavigation } from '../LandingNavigation';
import { FinanceFooter } from '../FinanceFooter';
import { SharedFaqAccordion } from '../SharedFaqAccordion';
import { DemoCta } from '../DemoCta';
import { ConnectedFinanceWorkspace } from './ConnectedFinanceWorkspace';
import { FinanceGetStarted } from './FinanceGetStarted';
import { FinanceWorkflow } from './FinanceWorkflow';
import { FinanceHeroVisual } from './FinanceHeroVisual';
import { InvoiceBusinessChallenge } from './InvoiceBusinessChallenge';
import { InvoiceHowItWorks } from './InvoiceHowItWorks';
import { InvoiceWhoItIsFor } from './InvoiceWhoItIsFor';
import { BankingWhyItMatters } from './BankingWhyItMatters';
import { BankingWorkflowOverview } from './BankingWorkflowOverview';
import { PayableWorkingTowards } from './PayableWorkingTowards';
import { ClosingVisualBg } from '../ClosingVisualBg';
import { bankingFeatures, demoHref, financeCapabilities, financeFaqs, financePageCopy, financeRoot, intelligenceCapabilities, interestHref, invoiceFeatures, payableFeatures, type Feature, type FinanceSlug } from '../../content/finance';
import base from '../LandingPage.module.css';
import s from './FinancePages.module.css';

type PageKey = 'overview' | FinanceSlug;
const number = (index: number) => String(index + 1).padStart(2, '0');

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className={`${base.eyebrow} ${s.eyebrow}`}>{children}</p>;
}
function Heading({ eyebrow, title, copy }: { eyebrow: string; title: ReactNode; copy?: string }) {
  return <div className={base.sectionHeading}><div><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2></div>{copy && <p className={base.sectionCopy}>{copy}</p>}</div>;
}
function Section({ children, id, alternate = false, dark = false }: { children: ReactNode; id?: string; alternate?: boolean; dark?: boolean }) {
  return <section id={id} className={`${base.section} ${alternate ? base.alternate : ''} ${dark ? s.dark : ''}`}><div className="site-shell">{children}</div></section>;
}
function Checklist({ items }: { items: readonly string[] }) {
  return <ul className={s.checklist}>{items.map(item => <li key={item}><Check size={15} aria-hidden="true" /><span>{item}</span></li>)}</ul>;
}
function Process({ items }: { items: string[] }) {
  return <ol className={s.process}>{items.map((item, index) => <li key={item}><span>{item}</span>{index < items.length - 1 && <ArrowRight size={18} aria-hidden="true" />}</li>)}</ol>;
}
function Features({ items }: { items: Feature[] }) {
  return <div className={s.featureGrid}>{items.map(([tag, title, description]) => <article key={title}><span className={s.badge}>{tag}</span><h3>{title}</h3><p>{description}</p></article>)}</div>;
}
function Numbered({ items, steps = false }: { items: string[][]; steps?: boolean }) {
  if (steps) return <ol className={base.steps}>{items.map(([title, description], index) => <li key={title}><span className={`${base.number} ${s.number}`}>{number(index)}</span><h3>{title}</h3><p>{description}</p></li>)}</ol>;
  return <div className={base.industries}>{items.map(([title, description], index) => <article key={title}><span className={`${base.number} ${s.number}`}>{number(index)}</span><h3>{title}</h3><p>{description}</p></article>)}</div>;
}
function Split({ eyebrow, title, copy, children }: { eyebrow: string; title: string; copy: string; children: ReactNode }) {
  return <div className={base.integrationLayout}><div><Heading eyebrow={eyebrow} title={title} /><p className={base.sectionCopy}>{copy}</p></div>{children}</div>;
}
function Related({ slugs }: { slugs: FinanceSlug[] }) {
  return <Section alternate><Heading eyebrow="CONNECTED FINANCE DESK" title="Part of a connected finance workspace." /><div className={`${s.featureGrid} ${s.related}`}>{slugs.map(slug => {
    const item = financeCapabilities.find(capability => capability.slug === slug)!;
    return <article key={slug}><span className={s.badge}>{item.label}</span><h3>{item.title}</h3><p>{item.description}</p><Link className={base.textLink} href={`${financeRoot}${slug}/`}>Explore capability <ArrowRight size={15} aria-hidden="true" /></Link></article>;
  })}</div></Section>;
}

function Hero({ page }: { page: PageKey }) {
  const copy = financePageCopy[page];
  const upcoming = page === 'accounts-payable';
  const intelligence = page === 'docsynecx-intelligence';
  return <section className={`${base.hero} ${s.viewportHero}`} aria-labelledby="finance-title">
    <div className={`site-shell ${base.heroGrid} ${s.heroGrid}`}>
      <div className={`${base.heroCopy} ${s.heroCopy}`}>
        <Eyebrow>{copy.eyebrow}</Eyebrow>
        {upcoming && <span className={`${s.badge} ${s.heroBadge}`}>Upcoming capability</span>}
        <h1 id="finance-title" className={s.heroTitle}>{copy.headline}<br /><span>{copy.accent}</span></h1>
        <p className={base.heroDescription}>{copy.description}</p>
        <div className={base.heroActions}>
          <Link href={upcoming ? '#register-interest' : intelligence ? '#capabilities' : demoHref} className={`button-primary ${base.heroButton}`}>{copy.primary}{intelligence ? <ArrowRight size={16} aria-hidden="true" /> : <ArrowUpRight size={16} aria-hidden="true" />}</Link>
          <Link href={upcoming ? financeRoot : intelligence ? demoHref : '#capabilities'} className={`button-secondary ${base.heroButton}`}>{upcoming ? 'Explore Finance Desk' : intelligence ? 'Book a demo' : 'Explore capabilities'}{!upcoming && !intelligence && <ArrowDown size={16} aria-hidden="true" />}</Link>
        </div>
        <p className={`${base.trust} ${s.heroTrust}`}>{intelligence ? <><strong>Decision support, not a replacement</strong> for accounting controls or management judgement.</> : copy.microline}</p>
      </div>
      <div className={s.heroImageWrapper}>
        <FinanceHeroVisual />
      </div>
    </div>
  </section>;
}

function Overview() {
  return <>
    <ConnectedFinanceWorkspace />
    <Section id="capabilities"><Heading eyebrow="FIVE CONNECTED CAPABILITIES" title="Finance operations, made more intelligent." copy="Explore the capabilities within Finance Desk. Each can address a distinct need while contributing to a connected finance environment." />
      <div className={s.capabilityGrid}>{financeCapabilities.map((item, index) => <article className={base.desk} key={item.slug}>
        <div className={s.cardTop}><span>{number(index)} / {item.label}</span>{item.slug === 'accounts-payable' && <span className={s.badge}>Upcoming</span>}</div>
        <h3><Link href={`${financeRoot}${item.slug}/`}>{item.title}</Link></h3><p className={base.deskCopy}>{item.description}</p><Checklist items={item.bullets} />
        <Link className={base.deskLink} href={item.slug === 'accounts-payable' ? interestHref : `${financeRoot}${item.slug}/`}>{item.link}<ArrowRight size={16} aria-hidden="true" /></Link>
      </article>)}</div>
    </Section>
    <FinanceWorkflow />
    <FinanceGetStarted />
    <Section id="faq" alternate><div className={base.faqLayout}><Heading eyebrow="COMMON QUESTIONS" title="Finance Desk FAQ" /><SharedFaqAccordion items={financeFaqs} defaultOpenIndex={0} toggleStyle="plus" /></div></Section>
  </>;
}

function Invoice() {
  return <>
    <InvoiceBusinessChallenge />
    <Section id="capabilities"><Heading eyebrow="WHAT YOU CAN DO" title="Make the information work harder for you." copy="Start with the needs that matter most to your team. Scope and available workflows can be confirmed during a product walkthrough." /><div className={s.panel}><Checklist items={[
      'AI-powered invoice data extraction', 'Supplier, invoice number and date capture', 'GST and HSN extraction', 'Line-item and tax detail capture', 'Credit note and debit note processing', 'Human-in-the-loop validation and confidence review', 'Duplicate detection and batch processing', 'TallyPrime integration',
    ]} /></div><Features items={invoiceFeatures} /></Section>
    <InvoiceHowItWorks />
    <InvoiceWhoItIsFor />
  </>;
}

function Banking() {
  return <>
    <BankingWhyItMatters />
    <Section id="capabilities"><Heading eyebrow="BANK STATEMENT & RECONCILIATION CAPABILITIES" title="From bank statement to TallyPrime bookkeeping and reconciliation." copy="Docsynecx processes bank statement information, supports bookkeeping and reconciliation, and posts the resulting entries into TallyPrime. Exact formats and workflow steps depend on the implementation configuration." /><Features items={bankingFeatures} /></Section>
    <BankingWorkflowOverview />
    <Related slugs={['invoice-automation', 'payment-reminders', 'docsynecx-intelligence']} />
  </>;
}

function Reminders() {
  return <>
    <Section id="capabilities" alternate><Split eyebrow="WHY IT MATTERS" title="Make payment follow-ups easier to manage." copy="Keep outstanding invoices visible and help your team follow up with customers before and after payment due dates."><div className={s.panel}><Checklist items={[
      'View customer invoices and payment due dates', 'Identify pending and overdue payments', 'Send or schedule reminders using supported channels', 'Maintain visibility into follow-up activity', 'Support a more consistent collections process',
    ]} /></div></Split></Section>
    <Section><Heading eyebrow="A SIMPLE PROCESS" title="From due date to customer follow-up." copy="Reminder rules, communication channels and follow-up status can be configured according to the available product functionality and your business needs." /><Process items={['Track invoice due dates', 'Identify pending payments', 'Send reminders', 'Review follow-ups']} /></Section>
    <Related slugs={['invoice-automation', 'banking-reconciliation', 'docsynecx-intelligence']} />
  </>;
}

function Payable() {
  return <>
    <PayableWorkingTowards />
    <Section id="capabilities"><Heading eyebrow="PLANNED CAPABILITIES" title="A preview of what’s ahead." copy="Accounts Payable is under development. These planned areas describe the product direction, not currently available workflows." /><Features items={payableFeatures} /></Section>
  </>;
}

function Intelligence() {
  return <Section alternate id="capabilities"><Heading eyebrow="UNDERSTAND BUSINESS PERFORMANCE" title={<>Six intelligence capabilities.<br /><span>One connected view.</span></>} copy="Explore six focused views of business performance, operations and management. Data availability and reporting depth depend on connected source systems and configured workflows." />
    <div className={s.intelligenceList}>{intelligenceCapabilities.map((item, index) => <article key={item.id} id={item.id} className={s.intelligenceCard}>
      <span className={s.intelligenceNumber}>{number(index)}</span>
      <div><Eyebrow>{item.label}</Eyebrow><h3>{item.title}</h3><p>{item.description}</p><details><summary>Explore {item.title}<ArrowRight size={15} aria-hidden="true" /></summary><p>{item.detail}</p><Link className={base.textLink} href={demoHref}>Discuss your reporting needs<ArrowUpRight size={14} aria-hidden="true" /></Link></details></div>
      <ul className={base.chips} aria-label={`${item.title} topics`}>{item.chips.map(chip => <li key={chip}>{chip}</li>)}</ul>
    </article>)}</div>
  </Section>;
}

export function FinancePage({ page = 'overview' }: { page?: PageKey }) {
  const copy = financePageCopy[page];
  const upcoming = page === 'accounts-payable';
  return <div className={`${base.page} ${s.page}`}>
    <a href="#main-content" className={base.skipLink}>Skip to content</a>
    <LandingNavigation />
    <main id="main-content">
      <Hero page={page} />
      {page === 'overview' && <Overview />}
      {page === 'invoice-automation' && <Invoice />}
      {page === 'banking-reconciliation' && <Banking />}
      {page === 'payment-reminders' && <Reminders />}
      {upcoming && <Payable />}
      {page === 'docsynecx-intelligence' && <Intelligence />}
      <Section><div className={`${base.closingCard} ${s.closingCard}`}><div><Eyebrow>{copy.ctaEyebrow}</Eyebrow><h2>{copy.ctaTitle}</h2><p>{copy.ctaCopy}</p></div><Link className={`button-primary ${base.closingButton}`} href={upcoming ? '#register-interest' : demoHref}>{upcoming ? 'Register Interest' : page === 'overview' ? 'Book a Finance Desk Demo' : page === 'banking-reconciliation' || page === 'payment-reminders' ? 'Talk to Docsynecx' : 'Book a Demo'}<ArrowUpRight size={16} aria-hidden="true" /></Link></div>
        {page === 'docsynecx-intelligence' && <p className={s.disclaimer}>Financial and business intelligence capabilities are scoped to available connected data. Current financial and business reporting pages describe analysis using TallyPrime data. Confirm data availability and configured scope during discovery.</p>}
        {upcoming && <div id="register-interest" className={s.interestForm}><DemoCta intent="accounts-payable" /></div>}
      </Section>
    </main>
    <FinanceFooter />
  </div>;
}
