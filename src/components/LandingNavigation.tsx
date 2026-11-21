'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X, ArrowRight, ArrowUpRight, Workflow } from 'lucide-react';
import { DocsynecxLogo } from './DocsynecxLogo';
import { AnnouncementBarV2 } from './AnnouncementBar';
import styles from './LandingPage.module.css';
import cardStyles from './NavbarMenuCard.module.css';

interface MegaOverviewLink {
  title: string;
  description?: string;
  href: string;
}

interface MegaFeatureLink {
  sno?: string | number;
  title: string;
  description?: string;
  href: string;
}

interface MegaSimpleLink {
  title: string;
  href: string;
}

interface MegaMenuData {
  label: string;
  eyebrow: string;
  overviewHref: string;
  exploreLabel: string;
  overviewLinks: MegaOverviewLink[];
  featureLinks: MegaFeatureLink[];
  whoHeading?: string;
  whoLinks?: MegaSimpleLink[];
  integrationsHeading?: string;
  integrationsLinks?: MegaSimpleLink[];
}

const MEGA_MENUS: Record<string, MegaMenuData> = {
  'Finance Desk': {
    label: 'Finance',
    eyebrow: 'Automate Finance Operations',
    overviewHref: '/finance-desk/',
    exploreLabel: 'Explore Finance Desk',
    overviewLinks: [],
    featureLinks: [
      {
        sno: '01',
        title: 'Invoice Automation',
        description: 'Supplier invoices into TallyPrime, without typing.',
        href: '/finance-desk/invoice-automation/',
      },
      {
        sno: '02',
        title: 'Banking & Reconciliation',
        description: 'Statements categorised and reconciled.',
        href: '/finance-desk/banking-reconciliation/',
      },
      {
        sno: '03',
        title: 'Payment Reminders',
        description: 'Follow-ups your team approves.',
        href: '/finance-desk/payment-reminders/',
      },
      {
        sno: '04',
        title: 'Docsynecx Intelligence',
        description: 'Six views of your Tally numbers.',
        href: '/finance-desk/docsynecx-intelligence/',
      },
      {
        sno: '05',
        title: 'Accounts Payable (Upcoming)',
        description: 'Supplier payments, planned and approved.',
        href: '/finance-desk/accounts-payable/',
      },
    ],
    whoHeading: "By Role",
    whoLinks: [
      { title: 'Business Owners', href: '/finance-desk/business-owners/' },
      { title: 'Finance Teams', href: '/finance-desk/finance-teams/' },
      { title: 'Accounts Teams', href: '/finance-desk/accounts-teams/' },
      { title: 'CA firms', href: '/finance-desk/ca-firms/' },
    ],
    integrationsHeading: 'Integrations',
    integrationsLinks: [
      { title: 'TallyPrime', href: '/finance-desk/#integration-tally' },
      { title: 'Zoho Books', href: '/finance-desk/#integration-zoho' },
      { title: 'Custom ERP', href: '/finance-desk/#integration-erp' },
    ],
  },
  'Logistics Desk': {
    label: 'Logistics',
    eyebrow: 'Automate Freight Operations',
    overviewHref: '/logistics-desk/',
    exploreLabel: 'Explore Logistics Desk',
    overviewLinks: [],
    featureLinks: [
      {
        sno: '01',
        title: 'RFQ-to-Booking',
        description: 'Connect customer enquiries, quotes and freight bookings.',
        href: '/logistics-desk/RFQ-to-booking/',
      },
      {
        sno: '02',
        title: 'Shipment Operations',
        description: 'Bring shipment operations into one connected workspace.',
        href: '/logistics-desk/shipment-operations/',
      },
      {
        sno: '03',
        title: 'Shipment Tracking',
        description: 'Keep shipment milestones and status updates in view.',
        href: '/logistics-desk/shipment-tracking/',
      },
      {
        sno: '04',
        title: 'Freight Intelligence',
        description: 'Build a clearer view of shipment costs, margins and performance.',
        href: '/logistics-desk/freight-intelligence/',
      },
    ],
    // whoHeading: "By Role",
    // whoLinks: [
    //   { title: 'Freight Forwarders', href: '/logistics-desk/RFQ-to-booking/' },
    //   { title: 'Operations Teams', href: '/logistics-desk/shipment-operations/' },
    //   { title: 'Pricing & Sourcing', href: '/logistics-desk/freight-intelligence/' },
    //   { title: 'Logistics Leadership', href: '/logistics-desk/shipment-operations/' },
    // ],
    integrationsHeading: 'Integrations',
    integrationsLinks: [
      { title: 'CargoWise & Custom ERP/TMS', href: '/logistics-desk/integrations/' },
    ],
  },
  'Resources': {
    label: 'Resources',
    eyebrow: 'TOOLS & GUIDES',
    overviewHref: '/#faq',
    exploreLabel: 'Explore resources',
    overviewLinks: [],
    featureLinks: [
      {
        sno: '01',
        title: 'Blogs',
        description: 'Calculate monthly hours, error reduction and financial savings.',
        href: '/blogs',
      },
      // {
      //   sno: '02',
      //   title: 'Case Studies',
      //   description: 'Answers about GST validation, security rules and human approvals.',
      //   href: '/#customers',
      // },
      {
        sno: '03',
        title: 'About Us',
        description: 'End-to-end bill ingestion, validation and automated voucher posting.',
        href: '/about',
      },
      {
        sno: '04',
        title: 'Events',
        description: 'Meet Docsynecx at India International Cargo Show 2026 (Booth Q53).',
        href: '/events/iics-2026/',
      },
    ],
  },
};

type NavItem =
  | { type: 'menu'; key: 'Finance Desk' | 'Logistics Desk' | 'Resources' }
  | { type: 'link'; label: string; href: string };

const NAV_ITEMS: NavItem[] = [
  { type: 'menu', key: 'Finance Desk' },
  { type: 'menu', key: 'Logistics Desk' },
  { type: 'link', label: 'Solutions', href: '/solutions' },
  { type: 'link', label: 'Pricing', href: '/pricing' },
  { type: 'menu', key: 'Resources' },
];

function NavbarMenuCard({ menu, onNavigate }: { menu: MegaMenuData; onNavigate: () => void }) {
  const groups: Array<{ label: string; links: MegaOverviewLink[] }> = [
    { label: menu.whoLinks ? 'Capabilities' : menu.label === 'Solutions' ? 'By industry' : 'Explore resources', links: [...menu.overviewLinks, ...menu.featureLinks] },
    ...(menu.whoLinks ? [{ label: menu.whoHeading || "Who it's for", links: menu.whoLinks }] : []),
    ...(menu.integrationsLinks ? [{ label: menu.integrationsHeading || 'Integrations', links: menu.integrationsLinks }] : []),
  ];
  const [selected, setSelected] = useState(0);
  const current = groups[selected];

  return <div className={cardStyles.card} data-has-rail={groups.length > 1}>
    {groups.length > 1 && <div className={cardStyles.rail} role="group" aria-label={`${menu.label} categories`}>
      <p className={cardStyles.railLabel}>{menu.label}</p>
      {groups.map((group, index) => <button
        type="button" key={group.label} aria-pressed={selected === index}
        aria-controls="navbar-card-panel"
        onMouseEnter={() => setSelected(index)} onFocus={() => setSelected(index)} onClick={() => setSelected(index)}
      ><span>{group.label}</span><ArrowRight size={15} aria-hidden="true" /></button>)}
      <Link href={menu.overviewHref} className={cardStyles.overview} onClick={onNavigate}>{menu.exploreLabel}<ArrowUpRight size={14} aria-hidden="true" /></Link>
    </div>}
    <div className={cardStyles.content} id="navbar-card-panel" role="region" aria-label={current.label}>
      <p className={cardStyles.groupLabel}>{selected === 0 ? menu.eyebrow : current.label}</p>
      <div className={cardStyles.links}>
        {current.links.map((item) => <Link href={item.href} key={item.title} className={cardStyles.link} onClick={onNavigate}>
          <span className={cardStyles.linkTitle}>{item.title}<ArrowUpRight size={14} aria-hidden="true" /></span>
          {'description' in item && item.description && <span className={cardStyles.description}>{item.description}</span>}
        </Link>)}
      </div>
    </div>
    <aside className={cardStyles.aside}>
      <Link href={menu.overviewHref} className={cardStyles.promo} onClick={onNavigate}>
        <Workflow size={24} aria-hidden="true" />
        <span className={cardStyles.promoEyebrow}>THE DOCSYNECX PLATFORM</span>
        <strong>Less manual work.<br />More forward motion.</strong>
        <span className={cardStyles.promoDescription}>Bring your documents, approvals and connected systems into one workflow.</span>
        <span className={cardStyles.promoLink}>{menu.exploreLabel}<ArrowRight size={15} aria-hidden="true" /></span>
      </Link>
      <div className={cardStyles.contact}>
        <span>See it on your own documents.</span>
        <Link href="/demo/" className={cardStyles.demoButton} onClick={onNavigate}>
          Book a demo<ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </aside>
  </div>;
}

export function LandingNavigation({ variant = 'horizon' }: { variant?: 'default' | 'horizon' | 'compact' }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const mobileTrigger = useRef<HTMLButtonElement>(null);
  const menuTriggers = useRef<Record<string, HTMLButtonElement | null>>({});
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [openMenu, mobileOpen]);

  const close = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenMenu(null);
    setMobileOpen(false);
  };

  const handleMouseEnter = (label: string) => {
    if (typeof window !== 'undefined' && window.innerWidth <= 1024) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenMenu(label);
  };

  const handleMouseLeave = () => {
    if (typeof window !== 'undefined' && window.innerWidth <= 1024) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 180);
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    let frame = 0;
    const updateNavigation = () => {
      frame = 0;
      const scrollY = window.scrollY;
      // Smooth contraction when scrolling begins
      setIsCompact((compact) => scrollY > (compact ? 8 : 32));
      setIsScrolled(scrollY > 8);
    };
    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateNavigation);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    updateNavigation();
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [pathname]);

  const activeMega = openMenu ? MEGA_MENUS[openMenu] : null;
  const headerVariant = variant === 'default' ? 'default' : 'horizon';

  const navigation = (
    <header
      ref={headerRef}
      className={styles.header}
      data-variant={headerVariant}
      data-theme={isHomePage ? 'dark' : 'light'}
      data-scrolled={isScrolled ? 'true' : 'false'}
      data-compact={isCompact ? 'true' : 'false'}
      data-past-hero={isScrolled ? 'true' : 'false'}
      data-static="false"
      onMouseLeave={handleMouseLeave}
    >
      <div className={`site-shell ${styles.navbar}`}>
        <Link href="/" className={styles.brand} aria-label="Docsynecx home" onClick={close}>
          <DocsynecxLogo variant={isHomePage && !isScrolled ? 'footer' : 'header'} className={styles.logo} />
          {/* <span>Intelligent workflows</span> */}
        </Link>

        <button
          ref={mobileTrigger}
          type="button"
          className={styles.mobileToggle}
          aria-expanded={mobileOpen}
          aria-controls="landing-navigation"
          aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
          onClick={() => {
            setMobileOpen(!mobileOpen);
            setOpenMenu(null);
          }}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav
          id="landing-navigation"
          className={styles.navigation}
          data-open={mobileOpen}
          data-finance-open={mobileOpen && openMenu === 'Finance Desk'}
          aria-label="Main navigation"
        >
          {NAV_ITEMS.map((item) => {
            if (item.type === 'link') {
              return (
                <Link
                  key={item.label}
                  className={mobileOpen ? styles.mobileNavLink : styles.customersLink}
                  href={item.href}
                  onClick={close}
                >
                  {item.label}
                </Link>
              );
            }

            const isClickableDesk = item.key === 'Finance Desk' || item.key === 'Logistics Desk';
            const deskHref = item.key === 'Finance Desk' ? '/finance-desk/' : '/logistics-desk/';
            const menuData = MEGA_MENUS[item.key];
            const isMenuOpen = openMenu === item.key;
            const menuId = `mobile-dropdown-${item.key.replace(/\s+/g, '-').toLowerCase()}`;

            return (
              <div
                key={item.key}
                className={styles.dropdown}
                onMouseEnter={() => handleMouseEnter(item.key)}
              >
                {!mobileOpen ? (
                  isClickableDesk ? (
                    <Link
                      href={deskHref}
                      ref={(node) => {
                        menuTriggers.current[item.key] = node as unknown as HTMLButtonElement;
                      }}
                      className={styles.dropdownTrigger}
                      aria-expanded={openMenu === item.key}
                      aria-controls="landing-mega-menu"
                      onClick={close}
                    >
                      {MEGA_MENUS[item.key]?.label || item.key}
                      <ChevronDown
                        size={13}
                        aria-hidden="true"
                        className={`transition-transform duration-200 ${openMenu === item.key ? 'rotate-180' : ''
                          }`}
                      />
                    </Link>
                  ) : (
                    <button
                      ref={(node) => {
                        menuTriggers.current[item.key] = node;
                      }}
                      type="button"
                      aria-expanded={openMenu === item.key}
                      aria-controls="landing-mega-menu"
                      onClick={() => setOpenMenu(openMenu === item.key ? null : item.key)}
                    >
                      {MEGA_MENUS[item.key]?.label || item.key}
                      <ChevronDown
                        size={13}
                        aria-hidden="true"
                        className={`transition-transform duration-200 ${openMenu === item.key ? 'rotate-180' : ''
                          }`}
                      />
                    </button>
                  )
                ) : (
                  <button
                    ref={(node) => {
                      menuTriggers.current[item.key] = node;
                    }}
                    type="button"
                    className={styles.dropdownTriggerMobile}
                    aria-expanded={isMenuOpen}
                    aria-controls={menuId}
                    onClick={() => setOpenMenu(isMenuOpen ? null : item.key)}
                  >
                    <span>{menuData?.label || item.key}</span>
                    <ChevronDown
                      size={16}
                      aria-hidden="true"
                      className={`transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''
                        }`}
                    />
                  </button>
                )}

                {/* Mobile Drawer Accordion ONLY rendered on mobile */}
                {mobileOpen && openMenu === item.key && (
                  <ul className={`${styles.mobileDropdownList} ${item.key === 'Finance Desk' ? styles.financeMobileList : ''}`}>
                    {MEGA_MENUS[item.key]?.overviewLinks.map((link) => (
                      <li key={link.title}>
                        <Link href={link.href} onClick={close}>
                          <strong>{link.title}</strong>
                          {link.description && <span>{link.description}</span>}
                        </Link>
                      </li>
                    ))}
                    {MEGA_MENUS[item.key]?.featureLinks.map((link) => (
                      <li key={link.title}>
                        <Link href={link.href} onClick={close}>
                          {link.sno && (
                            <span className={styles.megaItemNumber}>{link.sno}</span>
                          )}
                          {item.key === 'Finance Desk' ? (
                            <div className={styles.financeMobileCopy}>
                              <strong>{link.title}</strong>
                              {link.description && <span>{link.description}</span>}
                            </div>
                          ) : (
                            <>
                              <strong>{link.title}</strong>
                              {link.description && <span>{link.description}</span>}
                            </>
                          )}
                        </Link>
                      </li>
                    ))}
                    {MEGA_MENUS[item.key]?.whoLinks && (
                      <li className={styles.mobileSectionHeading}>
                        <span>{MEGA_MENUS[item.key]?.whoHeading || "Who it's for"}</span>
                      </li>
                    )}
                    {MEGA_MENUS[item.key]?.whoLinks?.map((link) => (
                      <li key={link.title}>
                        <Link href={link.href} onClick={close}>
                          <strong>{link.title}</strong>
                        </Link>
                      </li>
                    ))}
                    {MEGA_MENUS[item.key]?.integrationsLinks && (
                      <li className={styles.mobileSectionHeading}>
                        <span>{MEGA_MENUS[item.key]?.integrationsHeading || 'Integrations'}</span>
                      </li>
                    )}
                    {MEGA_MENUS[item.key]?.integrationsLinks?.map((link) => (
                      <li key={link.title}>
                        <Link href={link.href} onClick={close}>
                          <strong>{link.title}</strong>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}

          <Link
            href="/demo/#demo-form"
            className={`${styles.demoButton} ${styles.navDemo} ${styles.mobileDemo} ${styles.mobileDemoCta}`}
            data-track="cta_click"
            data-track-name="nav_book_demo_mobile"
            data-track-location="header"
            onClick={close}
          >
            <span>Book a demo</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </nav>

        <Link
          href="/demo/#demo-form"
          className={`${styles.demoButton} ${styles.navDemo} ${styles.desktopDemo}`}
          data-track="cta_click"
          data-track-name="nav_book_demo_desktop"
          data-track-location="header"
          onClick={close}
        >
          <span>Book a demo</span>
          <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </div>

      {/* ==================================================================== */}
      {/* DESKTOP MEGA DROPDOWN (Matches Image 2, floats below header)         */}
      {/* ==================================================================== */}
      {activeMega && !mobileOpen && (
        <div
          id="landing-mega-menu"
          role="region"
          aria-label={`${activeMega.label} menu`}
          className={styles.megaDropdown}
          onMouseEnter={() => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
          }}
          onMouseLeave={handleMouseLeave}
        >
          <NavbarMenuCard key={openMenu} menu={activeMega} onNavigate={close} />
        </div>
      )}
    </header>
  );

  return (
    <>
      {variant === 'default' && <AnnouncementBarV2 />}
      {variant === 'horizon' || variant === 'compact'
        ? <div className={styles.horizonNavFrame}>{navigation}</div>
        : navigation}
    </>
  );
}
