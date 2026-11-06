'use client';

import { ArrowRight, ArrowUpRight, Calculator, Database, HelpCircle, Receipt, Truck, Workflow } from 'lucide-react';
import type { ResourceCardStyle } from './ResourceCardStyleProvider';
import styles from './ResourcesMenuVariants.module.css';

const products = [
  { href: '/finance-desk/invoice-automation/', label: 'Invoice Automation', description: 'Read bills, validate details and post to Tally.', Icon: Receipt },
  { href: '/logistics', label: 'Logistics & Supply Chain', description: 'Turn shipment documents into CargoWise jobs.', Icon: Truck },
  { href: '/#how-it-works', label: 'How we do', description: 'Capture, extract, validate and sync.', Icon: Workflow },
];
const tools = [
  { href: '/calculator', label: 'Free ROI Calculator', description: 'See the time and cost your team could save.', Icon: Calculator },
  { href: '/finance-desk/invoice-automation/', label: 'Tally & ERP Integrations', description: 'Connect the systems your team already uses.', Icon: Database },
  { href: '/#faq', label: 'FAQ & Help Center', description: 'Answers about setup, checks and security.', Icon: HelpCircle },
];
const desks = [
  { name: 'Finance', title: 'Approve the bill. The entry posts itself.', image: '/images/finance-desk-card.jpg', href: '/finance-desk/', detail: 'From the first invoice to the final entry, keep your finance team in control.' },
  { name: 'Logistics', title: 'Documents in. Shipments moving.', image: '/images/logistics-desk-card.jpg', href: '/logistics', detail: 'Bring shipment details together and give your operations team a job to review.' },
];

export function ResourcesMenuVariants({ variant, onNavigate, activeSlide = 0, onSlideChange, compact = false }: {
  variant: ResourceCardStyle;
  onNavigate: (href: string) => void;
  activeSlide?: 0 | 1;
  onSlideChange?: (index: 0 | 1) => void;
  compact?: boolean;
}) {
  const desk = desks[activeSlide];
  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => { event.preventDefault(); onNavigate(href); };
  const linkGroup = (title: string, items: typeof products) => <div className={styles.group}>
    <h3>{title}</h3>
    <div className={styles.links}>{items.map(({ href, label, description, Icon }) => <a key={label} href={href} onClick={event => navigate(event, href)} className={styles.link}>
      <span className={styles.icon}><Icon size={18} strokeWidth={1.6} aria-hidden="true" /></span>
      <span className={styles.linkText}><strong>{label}</strong><small>{description}</small></span>
      <ArrowUpRight className={styles.linkArrow} size={13} aria-hidden="true" />
    </a>)}</div>
  </div>;
  return <div className={`${styles.surface} ${compact ? styles.compact : ''}`} data-resource-style={variant}>
    <div className={styles.main}>
      <div className={styles.navigation}>
        {linkGroup('Products & automation', products)}
        {linkGroup('Integrations & tools', tools)}
      </div>
      <aside className={styles.feature}>
        <span className={styles.eyebrow}>The Docsynecx platform</span>
        {variant === 'spotlight' && <>
          {onSlideChange && <div className={styles.deskTabs} role="group" aria-label="Featured desk">
            {desks.map((item, index) => <button key={item.name} type="button" aria-pressed={activeSlide === index} onClick={() => onSlideChange(index as 0 | 1)}>{item.name}</button>)}
          </div>}
          <img className={styles.image} src={desk.image} alt={`${desk.name} document automation preview`} width={480} height={270} />
        </>}
        <h3>{variant === 'spotlight' ? desk.title : <>Every document.<br />One connected <em>workflow.</em></>}</h3>
        <p>{variant === 'spotlight' ? desk.detail : 'Less retyping. More time for the work that moves your business forward.'}</p>
        <a className={styles.featureLink} href={variant === 'spotlight' ? desk.href : '/demo/'} onClick={event => navigate(event, variant === 'spotlight' ? desk.href : '/demo/')}>
          {variant === 'spotlight' ? `Explore ${desk.name} Desk` : 'Explore the platform'}<ArrowRight size={14} aria-hidden="true" />
        </a>
        <div className={styles.featureBottom}><span>See it with your documents.</span><a href="/demo/" onClick={event => navigate(event, '/demo/')}>Book a demo <ArrowUpRight size={13} aria-hidden="true" /></a></div>
      </aside>
    </div>
    <div className={styles.footer}><span>Built for the way your team works.</span><a href="/demo/" onClick={event => navigate(event, '/demo/')}>Talk to our team <ArrowRight size={13} aria-hidden="true" /></a></div>
  </div>;
}
