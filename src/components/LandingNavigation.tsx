'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { DocsynecxLogo } from './DocsynecxLogo';
import { landingDesks, landingIndustries } from '../content/landing';
import styles from './LandingPage.module.css';

const menus = [
  ...landingDesks.map(desk => ({ label: desk.title, links: [
    { label: `Explore ${desk.title}`, href: desk.href },
    ...desk.features.map(label => ({ label, href: desk.href })),
  ] })),
  { label: 'Solutions', links: landingIndustries.map(industry => ({ label: industry.title, href: `/#${industry.id}` })) },
  { label: 'Resources', links: [
    { label: 'How it works', href: '/#how-it-works' },
    { label: 'Integrations', href: '/#integrations' },
    { label: 'Free ROI calculator', href: '/calculator/' },
    { label: 'Frequently asked questions', href: '/#faq' },
  ] },
];

export function LandingNavigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const mobileTrigger = useRef<HTMLButtonElement>(null);
  const menuTriggers = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (openMenu) {
        menuTriggers.current[openMenu]?.focus();
        setOpenMenu(null);
      } else if (mobileOpen) {
        setMobileOpen(false);
        mobileTrigger.current?.focus();
      }
    };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', escape);
    };
  }, [openMenu, mobileOpen]);

  const close = () => { setOpenMenu(null); setMobileOpen(false); };

  return (
    <header ref={headerRef} className={styles.header}>
      <div className={`site-shell ${styles.navbar}`}>
        <Link href="/" className={styles.brand} aria-label="Docsynecx home" onClick={close}>
          <DocsynecxLogo className={styles.logo} />
          <span>Intelligent workflows</span>
        </Link>
        <button ref={mobileTrigger} type="button" className={styles.mobileToggle} aria-expanded={mobileOpen} aria-controls="landing-navigation" aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} onClick={() => { setMobileOpen(!mobileOpen); setOpenMenu(null); }}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav id="landing-navigation" className={styles.navigation} data-open={mobileOpen} aria-label="Main navigation">
          {menus.map((menu, index) => (
            <div key={menu.label} className={styles.navGroup}>
              {index === 3 && <Link className={styles.customersLink} href="/#customers" onClick={close}>Customers</Link>}
              <div className={styles.dropdown} onBlur={event => {
                if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpenMenu(current => current === menu.label ? null : current);
              }}>
                <button ref={node => { menuTriggers.current[menu.label] = node; }} type="button" aria-expanded={openMenu === menu.label} aria-controls={`landing-menu-${index}`} onClick={() => setOpenMenu(openMenu === menu.label ? null : menu.label)}>
                  {menu.label}<ChevronDown size={13} aria-hidden="true" />
                </button>
                <ul id={`landing-menu-${index}`} className={styles.dropdownPanel} hidden={openMenu !== menu.label}>
                  {menu.links.map(link => <li key={link.label}><Link href={link.href} onClick={close}>{link.label}</Link></li>)}
                </ul>
              </div>
            </div>
          ))}
          <Link href="/demo/" className={`${styles.demoButton} ${styles.navDemo} ${styles.mobileDemo}`} onClick={close}>Book a Demo</Link>
        </nav>
        <Link href="/demo/" className={`${styles.demoButton} ${styles.navDemo} ${styles.desktopDemo}`} onClick={close}>Book a Demo</Link>
      </div>
    </header>
  );
}
