'use client';

import React from 'react';
import Link from 'next/link';
import { Linkedin, Mail, Youtube, ArrowUpRight } from 'lucide-react';
import { DocsynecxLogo } from './DocsynecxLogo';
import { financeCapabilities, financeRoot } from '../content/finance';
import { CookieSettingsButton } from './cookie-consent/CookieSettingsButton';
import styles from './ShipsyFooter.module.css';

export interface ShipsyFooterProps {
  className?: string;
  showCta?: boolean;
}

export function ShipsyFooter({ className, showCta = false }: ShipsyFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="resources" className={`${styles.footer} ${className || ''}`} aria-label="Site footer">
      {/* Shipsy Integrated Pre-Footer CTA: Dark canvas outside, crisp light card inside */}
      {showCta && (
        <div className={styles.ctaStrip}>
          <div className={styles.shell}>
            <div className={styles.ctaCardLight}>
              <div className={styles.ctaEyebrow}>
                <span className={styles.ctaEyebrowDot} aria-hidden="true" />
                <span>Let’s make work flow</span>
              </div>
              <h2 className={styles.ctaHeadline}>
                What could your team do with less manual work?
              </h2>
              <p className={styles.ctaSub}>
                Finance and logistics are too critical for manual typing and data-entry errors. Docsynecx automates document checks, posting, and matching directly in Tally and CargoWise.
              </p>
              <div className={styles.ctaActions}>
                <Link href="/demo/" className={styles.ctaPrimaryBtn}>
                  <span>Book a Demo</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
                <Link href="/calculator/" className={styles.ctaSecondaryBtn}>
                  <span>Calculate ROI</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={styles.mainSection}>
        <div className={styles.shell}>
          <div className={styles.footerGrid}>
          {/* Column 1: Brand, Positioning, Socials & Shipsy Trust Badges */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logoLink} aria-label="Docsynecx home">
              <DocsynecxLogo variant="footer" className={styles.logo} />
            </Link>
            <p className={styles.brandTagline}>
              AI-powered platforms that simplify complex workflows across Finance and Logistics.
            </p>

            <div className={styles.socialRow} aria-label="Docsynecx social channels">
              <a
                href="https://www.linkedin.com/company/autodocs"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="Docsynecx on LinkedIn"
              >
                <Linkedin size={15} aria-hidden="true" />
              </a>
              <a
                href="https://twitter.com/autodocs"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="Docsynecx on X (formerly Twitter)"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l7.3-8.5L1.6 2h6.5l4.5 6.8L18.9 2Zm-1.1 18h1.7L7.2 3.9H5.4L17.8 20Z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@docsynecx"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="Docsynecx on YouTube"
              >
                <Youtube size={15} aria-hidden="true" />
              </a>
              <a
                href="mailto:info@docsynecx.com"
                className={styles.socialBtn}
                aria-label="Contact Docsynecx via Email"
              >
                <Mail size={15} aria-hidden="true" />
              </a>
            </div>

          </div>

          {/* Column 2: Platforms */}
          <div className={styles.navCol}>
            <span className={styles.colHeader}>Platforms</span>
            <ul className={styles.linkList}>
              <li>
                <Link href="/finance-desk/" className={styles.footerLink}>
                  Docsynecx Finance
                </Link>
              </li>
              <li>
                <Link href="/#platform" className={styles.footerLink}>
                  Docsynecx Logistics
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Solutions by Use Case */}
          <div className={styles.navCol}>
            <span className={styles.colHeader}>Solutions by Use Case</span>
            <ul className={styles.linkList}>
              <li>
                <Link href="/solutions#automotive" className={styles.footerLink}>
                  Automotive &amp; EV
                </Link>
              </li>
              <li>
                <Link href="/solutions#manufacturing" className={styles.footerLink}>
                  Industrial Manufacturing
                </Link>
              </li>
              <li>
                <Link href="/solutions#textile" className={styles.footerLink}>
                  Textile &amp; Garments
                </Link>
              </li>
              <li>
                <Link href="/solutions#retail" className={styles.footerLink}>
                  Retail &amp; Distribution
                </Link>
              </li>
              <li>
                <Link href="/solutions#logistics" className={styles.footerLink}>
                  Freight &amp; Logistics
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Finance Modules */}
          <div className={styles.navCol}>
            <span className={styles.colHeader}>Finance Modules</span>
            <ul className={styles.linkList}>
              <li>
                <Link href="/finance-desk/invoice-automation/" className={styles.footerLink}>
                  Invoice Automation
                </Link>
              </li>
              <li>
                <Link href="/finance-desk/banking-reconciliation/" className={styles.footerLink}>
                  Bank Reconciliation
                </Link>
              </li>
              <li>
                <Link href="/finance-desk/accounts-payable/" className={styles.footerLink}>
                  Accounts Payable
                </Link>
              </li>
              <li>
                <Link href="/finance-desk/docsynecx-intelligence/" className={styles.footerLink}>
                  Financial Intelligence
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Logistics Modules */}
          <div className={styles.navCol}>
            <span className={styles.colHeader}>Logistics Modules</span>
            <ul className={styles.linkList}>
              <li>
                <Link href="/logistics/email-to-booking/" className={styles.footerLink}>
                  Email-to-Booking
                </Link>
              </li>
              <li>
                <Link href="/logistics/shipment-operations/" className={styles.footerLink}>
                  Shipment Operations
                </Link>
              </li>
              <li>
                <Link href="/logistics/shipment-tracking/" className={styles.footerLink}>
                  Shipment Tracking
                </Link>
              </li>
              <li>
                <Link href="/logistics/freight-intelligence/" className={styles.footerLink}>
                  Freight Intelligence
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 6: Company */}
          <div className={styles.navCol}>
            <span className={styles.colHeader}>Company</span>
            <ul className={styles.linkList}>
              <li>
                <Link href="/#faq" className={styles.footerLink}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/#faq" className={styles.footerLink}>
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <CookieSettingsButton
                  className={styles.footerLink}
                  showIcon={false}
                  label="Cookie Settings"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

      {/* Bottom Legal & Operational Bar */}
      <div className={styles.bottomStrip}>
        <div className={styles.shell}>
          <div className={styles.bottomContent}>
            <div className={styles.bottomMeta}>
              <span className={styles.brandLocation}>
                SynecX AI Labs Private Limited &middot; Coimbatore, Tamil Nadu, India
              </span>
            </div>
            <span className={styles.copyright}>
              &copy; powered by Synecx AI Labs Private Limited. All rights reserved. 
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default ShipsyFooter;
