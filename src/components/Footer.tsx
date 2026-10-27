import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, FileSearch, ListChecks, Linkedin, Workflow } from 'lucide-react';
import { AutoDocsLogo } from './AutoDocsLogo';
import styles from './Footer.module.css';

const navigation = [
  [
    { title: 'Platform', links: [
      { label: 'Finance desk', href: '/finance/' },
      { label: 'Shipment desk', href: '/logistics/' },
      { label: 'How it works', href: '/#how-it-works' },
    ] },
    { title: 'Solutions', links: [
      { label: 'Accounts payable', href: '/accounts-payable/' },
      { label: 'Freight operations', href: '/logistics-trade/' },
      { label: 'Document checks', href: '/#how-it-works' },
    ] },
  ],
  [
    { title: 'Integrations', links: [
      { label: 'Tally', href: '/finance/#finance-workbench' },
      { label: 'Zoho Books', href: '/#faq' },
      { label: 'CargoWise', href: '/logistics/#logistics-workbench' },
    ] },
    { title: 'Resources', links: [
      { label: 'Free calculator', href: '/calculator/' },
      { label: 'Trade insights', href: '/#newsletter' },
      { label: 'Help centre', href: '/#faq' },
    ] },
  ],
  [
    { title: 'Company', links: [
      { label: 'About us', href: '/#why-autodocs' },
      { label: 'Our customers', href: '/#customers' },
      { label: 'Rajadurai E-Vehicles', href: '/customers/rajadurai/' },
      { label: 'FT Logistics', href: '/customers/ft-logistics/' },
      { label: 'Contact', href: '/#demo' },
      { label: 'Start a free trial', href: '/free-trial/' },
      { label: 'Book a demo', href: '/#demo-form' },
    ] },
  ],
];

export const Footer: React.FC = () => (
  <footer id="resources" className={styles.footer}>
    <div className="site-shell">
      <div className={styles.main}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logoLink} aria-label="AutoDocs home">
            <AutoDocsLogo className={styles.logo} />
          </Link>
          <p className={styles.description}>
            The AI-Powered Document Automation Platform for Intelligent Processing, Data Extraction, and Business Workflows.
          </p>
          <div className={styles.socials} aria-label="Follow AutoDocs">
            <a href="https://www.linkedin.com/company/autodocs" target="_blank" rel="noopener noreferrer" aria-label="AutoDocs on LinkedIn (opens in a new tab)">
              <Linkedin size={16} aria-hidden="true" />
            </a>
            <a href="https://twitter.com/autodocs" target="_blank" rel="noopener noreferrer" aria-label="AutoDocs on X (opens in a new tab)">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l7.3-8.5L1.6 2h6.5l4.5 6.8L18.9 2Zm-1.1 18h1.7L7.2 3.9H5.4L17.8 20Z" /></svg>
            </a>
          </div>
          <div className={styles.workflow} aria-label="Document automation workflow">
            {[
              { label: 'Extract', Icon: FileSearch },
              { label: 'Validate', Icon: ListChecks },
              { label: 'Sync', Icon: Workflow },
            ].map(({ label, Icon }) => <Link key={label} href="/#how-it-works" className={styles.workflowItem}>
              <span><Icon size={18} strokeWidth={1.6} aria-hidden="true" /></span>{label}
            </Link>)}
          </div>
          <Link href="/#demo-form" className={styles.demoLink}>Talk to AutoDocs <ArrowUpRight size={15} aria-hidden="true" /></Link>
        </div>

        {navigation.map((groups, index) => <div className={styles.column} key={index}>
          {groups.map(group => <nav key={group.title} aria-label={`${group.title} footer links`}>
            <h2 className={styles.groupTitle}>{group.title}</h2>
            <ul className={styles.links}>
              {group.links.map(link => <li key={link.label}>
                <Link href={link.href} className={link.label === 'Book a demo' || link.label === 'Free calculator' ? styles.featuredLink : undefined}>
                  {link.label}
                  {link.label === 'Book a demo' && <ArrowUpRight size={13} aria-hidden="true" />}
                </Link>
              </li>)}
            </ul>
          </nav>)}
        </div>)}
      </div>

      <div className={styles.bottom}>
        <p>© 2026 AutoDocs AI Labs Private Limited. All rights reserved.</p>
        {/* Keep legal labels as text until actual policy destinations exist. */}
        <div className={styles.legal}><span>Privacy</span><span>Terms</span></div>
      </div>
    </div>
  </footer>
);
