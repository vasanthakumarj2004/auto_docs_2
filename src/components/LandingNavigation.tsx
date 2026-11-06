'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { DocsynecxLogo } from './DocsynecxLogo';
import { landingNavigationMenus as menus } from '../content/landing';
import styles from './LandingPage.module.css';
import { FinanceMenu } from './FinanceMenu';
import { useLandingLayout } from './LandingLayoutProvider';
import { LandingLayoutTwoNavigation } from './LandingLayoutTwo';

export function LandingNavigation() {
  const { layout } = useLandingLayout();
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

  if (layout === 'v2') return <LandingLayoutTwoNavigation />;

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
          <FinanceMenu onNavigate={close} />
          {menus.map((menu, index) => (
            <div key={menu.label} className={styles.navGroup}>
              {index === 2 && <Link className={styles.customersLink} href="/#customers" onClick={close}>Customers</Link>}
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
