'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import { DocsynecxLogo } from './DocsynecxLogo';
import { DocsynecxDashboardPreview } from './DocsynecxDashboardPreview';
import { DocsynecxPhonePreview } from './DocsynecxPhonePreview';
import { FinanceMenu } from './FinanceMenu';
import { landingNavigationMenus } from '../content/landing';
import menuStyles from './LandingPage.module.css';
import styles from './LandingLayoutThree.module.css';

export function LandingLayoutThreeNavigation() {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const header = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const menuTriggers = useRef<Record<string, HTMLButtonElement | null>>({});
  const close = () => { setOpen(false); setOpenMenu(null); };

  useEffect(() => {
    if (!open && !openMenu) return;
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) { setOpen(false); setOpenMenu(null); }
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (openMenu) { menuTriggers.current[openMenu]?.focus(); setOpenMenu(null); }
      else { setOpen(false); trigger.current?.focus(); }
    };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', escape);
    };
  }, [open, openMenu]);

  return <header ref={header} className={styles.header} data-landing-header="v3">
    <Link href="/" className={styles.brand} aria-label="Docsynecx home" onClick={close}>
      <DocsynecxLogo className={styles.logo} />
      <span>Intelligent workflows</span>
    </Link>
    <button ref={trigger} className={styles.menuToggle} type="button" aria-expanded={open}
      aria-controls="layout-three-navigation" aria-label={open ? 'Close navigation' : 'Open navigation'}
      onClick={() => { setOpen(!open); setOpenMenu(null); }}>{open ? <X size={22} /> : <Menu size={22} />}</button>
    <nav id="layout-three-navigation" className={styles.navigation} data-open={open} aria-label="Main navigation">
      <div className={styles.navLinks}>
        <FinanceMenu onNavigate={close} />
        {landingNavigationMenus.map((menu, index) => <div key={menu.label} className={styles.navGroup}>
          {index === 2 && <Link href="/#customers" onClick={close}>Customers</Link>}
          <div className={`${menuStyles.dropdown} ${styles.menuDropdown}`} onBlur={event => {
            if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpenMenu(current => current === menu.label ? null : current);
          }}>
            <button ref={node => { menuTriggers.current[menu.label] = node; }} type="button"
              aria-expanded={openMenu === menu.label} aria-controls={`layout-three-menu-${index}`}
              onClick={() => setOpenMenu(openMenu === menu.label ? null : menu.label)}>
              {menu.label}<ChevronDown size={13} aria-hidden="true" />
            </button>
            <ul id={`layout-three-menu-${index}`} className={`${menuStyles.dropdownPanel} ${styles.menuPanel}`} hidden={openMenu !== menu.label}>
              {menu.links.map(link => <li key={link.label}><Link href={link.href} onClick={close}>{link.label}</Link></li>)}
            </ul>
          </div>
        </div>)}
      </div>
      <div className={styles.navActions}>
        <Link href="/demo/" className={styles.primaryButton} onClick={close}>Book a Demo</Link>
      </div>
    </nav>
  </header>;
}

export function LandingLayoutThreeHero() {
  return <section id="top" className={styles.heroFrame} data-hero-layout="v3" aria-labelledby="hero-title">
    <div className={styles.hero}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>Intelligent workflows. Everyday progress.</p>
        <h1 id="hero-title">Grow the business.<br /><span>Not the data-entry desk.</span></h1>
        <p className={styles.description}>Bills read, checked, paid and posted to Tally. Emails become CargoWise jobs. Your team handles exceptions, not typing.</p>
        <div className={styles.heroActions}>
          <Link href="/finance-desk/" className={styles.primaryButton}>I run a finance desk<ArrowRight size={16} aria-hidden="true" /></Link>
          <Link href="/logistics/" className={styles.primaryButton}>I run a shipment desk<ArrowRight size={16} aria-hidden="true" /></Link>
          <Link href="/demo/" className={`${styles.outlineButton} ${menuStyles.demoButton}`}>Book a demo</Link>
        </div>
        <p className={styles.heroNote}><strong>Built for businesses</strong> that run on Tally, an ERP or CargoWise.</p>
      </div>
      <div className={styles.productVisual}>
        <div className={styles.phoneBackdrop} aria-hidden="true">{Array.from({ length: 8 }, (_, index) => <span key={index} />)}</div>
        <div className={styles.phonePosition}><DocsynecxPhonePreview /></div>
        <div className={styles.dashboardStage}><div className={styles.dashboardTilt}><DocsynecxDashboardPreview /></div></div>
      </div>
    </div>
  </section>;
}
