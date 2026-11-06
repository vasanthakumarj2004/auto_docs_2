'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import { DocsynecxLogo } from './DocsynecxLogo';
import { AnnouncementBarV2 } from './AnnouncementBar';
import { useLandingLayout } from './LandingLayoutProvider';
import { LandingLayoutThreeNavigation } from './LandingLayoutThree';
import styles from './LandingPage.module.css';

interface MegaOverviewLink {
  title: string;
  description?: string;
  href: string;
}

interface MegaFeatureLink {
  sno?: string | number;
  title: string;
  description: string;
  href: string;
}

interface MegaMenuData {
  label: string;
  eyebrow: string;
  overviewHref: string;
  exploreLabel: string;
  overviewLinks: MegaOverviewLink[];
  featureLinks: MegaFeatureLink[];
}

const MEGA_MENUS: Record<string, MegaMenuData> = {
  'Finance Desk': {
    label: 'Finance Desk',
    eyebrow: 'Automate Finance Operations',
    overviewHref: '/finance/',
    exploreLabel: 'Explore Finance Desk',
    overviewLinks: [],
    featureLinks: [
      {
        sno: '01',
        title: 'Invoice Automation',
        description: 'Split, extract and validate supplier invoices with 3-way match against accruals.',
        href: '/finance/',
      },
      {
        sno: '02',
        title: 'Financial Intelligence',
        description: 'Move vendor documents into cashflow, ledger and tax visibility.',
        href: '/finance/',
      },
      {
        sno: '03',
        title: 'Business Intelligence',
        description: 'Continuous line-item audit, variance detection and GST 2B reconciliation.',
        href: '/finance/',
      },
      {
        sno: '04',
        title: 'AI Insights',
        description: 'Automated exception handling and instant voucher creation.',
        href: '/finance/',
      },
      {
        sno: '05',
        title: 'Docsynecx Intelligence',
        description: 'Automated exception handling and instant voucher creation.',
        href: '/finance/',
      },
    ],
  },
  'Shipment Desk': {
    label: 'Shipment Desk',
    eyebrow: 'Automate Freight Operations',
    overviewHref: '/logistics/',
    exploreLabel: 'Explore Shipment Desk',
    overviewLinks: [],
    featureLinks: [
      {
        sno: '01',
        title: 'RFQ to Booking',
        description: 'Automated quotation comparison and instant freight rate confirmation.',
        href: '/logistics/',
      },
      {
        sno: '02',
        title: 'Shipment Management',
        description: 'Consolidate bills of lading, airway bills and custom manifests.',
        href: '/logistics/',
      },
      {
        sno: '03',
        title: 'Shipment Tracking',
        description: 'Real-time milestones, container tracking and carrier status updates.',
        href: '/logistics/',
      },
      {
        sno: '04',
        title: 'Document Automation',
        description: 'Extract and validate multi-page logistics docs and origin certificates.',
        href: '/logistics/',
      },
    ],
  },
  'Solutions': {
    label: 'Solutions',
    eyebrow: 'INDUSTRIES',
    overviewHref: '/#platform',
    exploreLabel: 'Explore all solutions',
    overviewLinks: [],
    featureLinks: [
      {
        sno: '01',
        title: 'Logistics & Freight Forwarding',
        description: 'RFQ, shipments, container tracking and trade documents.',
        href: '/#logistics-industry',
      },
      {
        sno: '02',
        title: 'Automotive & EV',
        description: 'Purchase invoices, spare parts and service documentation.',
        href: '/#automotive-industry',
      },
      {
        sno: '03',
        title: 'Manufacturing',
        description: 'Supplier invoices, material receipts and operational records.',
        href: '/#manufacturing-industry',
      },
      {
        sno: '04',
        title: 'Retail & Distribution',
        description: 'High-volume invoice auditing and multi-vendor document workflows.',
        href: '/#retail-industry',
      },
      {
        sno: '05',
        title: 'Textile & Garments',
        description: 'Supplier and purchase documentation with rapid ledger posting.',
        href: '/#textile-industry',
      },
    ],
  },
  'Resources': {
    label: 'Resources',
    eyebrow: 'TOOLS & GUIDES',
    overviewHref: '/#how-it-works',
    exploreLabel: 'Explore resources',
    overviewLinks: [
      {
        title: 'How it works',
        href: '/#how-it-works',
      },
      {
        title: 'Integrations',
        href: '/#integrations',
      },
    ],
    featureLinks: [
      {
        sno: '01',
        title: 'Free ROI Calculator',
        description: 'Calculate monthly hours, error reduction and financial savings.',
        href: '/calculator/',
      },
      {
        sno: '02',
        title: 'Frequently asked questions',
        description: 'Answers about GST validation, security rules and human approvals.',
        href: '/#faq',
      },
      {
        sno: '03',
        title: 'Accounts Payable Automation',
        description: 'End-to-end bill ingestion, validation and automated voucher posting.',
        href: '/accounts-payable/',
      },
      {
        sno: '04',
        title: 'Logistics & Trade Documents',
        description: 'Automate bills of lading, shipping orders and customs manifests.',
        href: '/logistics-trade/',
      },
    ],
  },
};

type NavItem =
  | { type: 'menu'; key: 'Finance Desk' | 'Shipment Desk' | 'Solutions' | 'Resources' }
  | { type: 'link'; label: string; href: string };

const NAV_ITEMS: NavItem[] = [
  { type: 'menu', key: 'Finance Desk' },
  { type: 'menu', key: 'Shipment Desk' },
  { type: 'menu', key: 'Solutions' },
  { type: 'link', label: 'Customers', href: '/#customers' },
  { type: 'menu', key: 'Resources' },
];

export function LandingNavigation() {
  const { layout } = useLandingLayout();
  return layout === 'v3' ? <LandingLayoutThreeNavigation /> : <StandardLandingNavigation />;
}

function StandardLandingNavigation() {
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
    if (typeof window !== 'undefined' && window.innerWidth <= 900) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenMenu(label);
  };

  const handleMouseLeave = () => {
    if (typeof window !== 'undefined' && window.innerWidth <= 900) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 180);
  };

  const activeMega = openMenu ? MEGA_MENUS[openMenu] : null;

  return (
    <>
      <AnnouncementBarV2 />
      <header ref={headerRef} className={styles.header} onMouseLeave={handleMouseLeave}>
        <div className={`site-shell ${styles.navbar}`}>
          <Link href="/" className={styles.brand} aria-label="Docsynecx home" onClick={close}>
            <DocsynecxLogo className={styles.logo} />
            <span>Intelligent workflows</span>
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
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map((item) => {
              if (item.type === 'link') {
                return (
                  <Link
                    key={item.label}
                    className={styles.customersLink}
                    href={item.href}
                    onClick={close}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <div
                  key={item.key}
                  className={styles.dropdown}
                  onMouseEnter={() => handleMouseEnter(item.key)}
                >
                  <button
                    ref={(node) => {
                      menuTriggers.current[item.key] = node;
                    }}
                    type="button"
                    aria-expanded={openMenu === item.key}
                    aria-controls="landing-mega-menu"
                    onClick={() => setOpenMenu(openMenu === item.key ? null : item.key)}
                  >
                    {item.key}
                    <ChevronDown
                      size={13}
                      aria-hidden="true"
                      className={`transition-transform duration-200 ${
                        openMenu === item.key ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Mobile Drawer Accordion ONLY rendered on mobile */}
                  {mobileOpen && openMenu === item.key && (
                    <ul className={styles.mobileDropdownList}>
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
                            <strong>{link.title}</strong>
                            {link.description && <span>{link.description}</span>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}

            <Link
              href="/demo/"
              className={`${styles.demoButton} ${styles.navDemo} ${styles.mobileDemo}`}
              onClick={close}
            >
              Book a Demo
            </Link>
          </nav>

          <Link
            href="/demo/"
            className={`${styles.demoButton} ${styles.navDemo} ${styles.desktopDemo}`}
            onClick={close}
          >
            Book a Demo
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
            <div className="site-shell">
              <div className={styles.megaDropdownContent}>
                {/* Left Column: Light Capabilities Grid */}
                <div className={styles.megaLeft}>
                  <div className={styles.megaEyebrow}>{activeMega.eyebrow}</div>

                  {/* Top Overview / Primary Links (if configured) */}
                  {activeMega.overviewLinks.length > 0 && (
                    <>
                      <div className={styles.megaTopGrid}>
                        {activeMega.overviewLinks.map((linkItem) => (
                          <Link
                            key={linkItem.title}
                            href={linkItem.href}
                            onClick={close}
                            className={styles.megaOverviewItem}
                          >
                            <div className={styles.megaItemTitle}>
                              <span>{linkItem.title}</span>
                              <ArrowRight
                                size={13}
                                className={styles.megaArrow}
                                aria-hidden="true"
                              />
                            </div>
                            {linkItem.description && (
                              <p className={styles.megaItemDesc}>{linkItem.description}</p>
                            )}
                          </Link>
                        ))}
                      </div>
                      <div className={styles.megaDivider} />
                    </>
                  )}

                  {/* Feature / Capabilities Grid (2 columns) */}
                  <div className={styles.megaFeatureGrid}>
                    {activeMega.featureLinks.map((linkItem) => (
                      <Link
                        key={linkItem.title}
                        href={linkItem.href}
                        onClick={close}
                        className={styles.megaFeatureItem}
                      >
                        <div className={styles.megaItemTitle}>
                          {linkItem.sno && (
                            <span className={styles.megaItemNumber}>{linkItem.sno}</span>
                          )}
                          <span>{linkItem.title}</span>
                        </div>
                        {linkItem.description && (
                          <p className={styles.megaItemDesc}>{linkItem.description}</p>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Right Column: Signature Hero Callout (Green Div) */}
                <div className={styles.megaRight}>
                  <div className={styles.megaRightTop}>
                    <span className={styles.megaRightEyebrow}>THE DOCSYNECX PLATFORM</span>
                    <h3 className={styles.megaRightTitle}>
                      Every document, email and invoice. One platform.
                    </h3>
                    <Link
                      href={activeMega.overviewHref}
                      onClick={close}
                      className={styles.megaRightExplore}
                    >
                      <span>{activeMega.exploreLabel}</span>
                      <ArrowRight size={13} aria-hidden="true" />
                    </Link>
                  </div>

                  <div className={styles.megaRightBottom}>
                    <p className={styles.megaRightCaption}>See it on your own documents.</p>
                    <Link href="/demo/" onClick={close} className={styles.megaRightCta}>
                      <span>Book a demo</span>
                      <ArrowRight size={13} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
