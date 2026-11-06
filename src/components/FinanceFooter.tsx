import Link from 'next/link';
import { DocsynecxLogo } from './DocsynecxLogo';
import { financeCapabilities, financeRoot } from '../content/finance';
import { landingDesks } from '../content/landing';
import styles from './LandingPage.module.css';

export function FinanceFooter() {
  const shipment = landingDesks.find(desk => desk.id === 'shipment')!;
  return <footer className={styles.footer}>
    <div className="site-shell">
      <div className={styles.footerGrid}>
        <div><Link href="/" className={styles.brand} aria-label="Docsynecx home"><DocsynecxLogo variant="footer" className={styles.footerLogo} /><span>Intelligent workflows</span></Link><p className={styles.footerDescription}>AI-powered finance and logistics workflows for document-intensive businesses.</p></div>
        <nav aria-label="Finance Desk footer links"><h2>Finance Desk</h2><ul>
          <li><Link href={financeRoot}>Overview</Link></li>
          {financeCapabilities.map(item => <li key={item.slug}><Link href={`${financeRoot}${item.slug}/`}>{item.title}{item.slug === 'accounts-payable' && <span className="ml-2 text-[9px] uppercase">Upcoming</span>}</Link></li>)}
        </ul></nav>
        <nav aria-label="Shipment Desk footer links"><h2>Shipment Desk</h2><ul>{shipment.features.map(feature => <li key={feature}><Link href={shipment.href}>{feature}</Link></li>)}</ul></nav>
        <nav aria-label="Company footer links"><h2>Company</h2><ul><li><Link href="/#solutions">Solutions</Link></li><li><Link href="/#customers">Customers</Link></li><li><Link href="/#why-docsynecx">About Us</Link></li><li><Link href="/demo/">Contact</Link></li></ul></nav>
      </div>
      <div className={styles.footerBottom}><p>© 2026 SynecX AI Labs Private Limited. All rights reserved.</p><a href="mailto:info@docsynecx.com">info@docsynecx.com</a></div>
    </div>
  </footer>;
}
