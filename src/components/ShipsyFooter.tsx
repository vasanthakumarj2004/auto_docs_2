'use client';

import React from 'react';
import Link from 'next/link';
import { Linkedin, Mail, Youtube, Instagram, ArrowUpRight, Facebook } from 'lucide-react';
import { DocsynecxLogo } from './DocsynecxLogo';
import { financeCapabilities, financeRoot } from '../content/finance';
import { CookieSettingsButton } from './cookie-consent/CookieSettingsButton';
import styles from './ShipsyFooter.module.css';
import { FacebookLogoIcon } from '@phosphor-icons/react';

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
                  <span>Book a demo</span>
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
              AI-powered platforms that simplify complex workflows across Finance and Freight Forwarders.
            </p>

            <div className={styles.socialRow} aria-label="Docsynecx social channels">
              <a
                href="https://www.linkedin.com/showcase/docsynecx/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="Docsynecx on LinkedIn"
              >
                <Linkedin size={15} aria-hidden="true" />
              </a>
              <a
                href="https://www.instagram.com/docsynecx?hvrq=Z2V0bDEzYWgzcnpi"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="Docsynecx on Instagram"
              >
                <Instagram size={15} aria-hidden="true" />
              </a>
              <a
                href="https://youtube.com/@docsynecx?si=qR9Ynj-SsqG1bvwk"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="Docsynecx on YouTube"
              >
                <Youtube size={15} aria-hidden="true" />
              </a>
              
              <a
                href="https://www.facebook.com/people/Docsynecx/61590633128745/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="Docsynecx on YouTube"
              >
                <Facebook size={15} aria-hidden="true" />
              </a>
            </div>

          </div>

          {/* Column 2: Platforms */}
          <div className={styles.navCol}>
            <h4 className={styles.colHeader}>Platforms</h4>
            <ul className={styles.linkList}>
              <li>
                <Link href="/finance-desk/" className={styles.footerLink}>
                  Docsynecx  Finance
                </Link>
              </li>
              <li>
                <Link href="/#platform" className={styles.footerLink}>
                  Docsynecx  Freight Forwarders
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Solutions by Use Case */}
          <div className={styles.navCol}>
            <h4 className={styles.colHeader}>Solutions by Use Case</h4>
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
            <h4 className={styles.colHeader}>Finance</h4>
            <ul className={styles.linkList}>
              <li>
                <Link href="/finance-desk/invoice-automation/" className={styles.footerLink}>
                  Invoice Automation
                </Link>
              </li>
              <li>
                <Link href="/finance-desk/banking-reconciliation/" className={styles.footerLink}>
                  Banking & Reconciliation
                </Link>
              </li>
              <li>
                <Link href="/finance-desk/accounts-payable/" className={styles.footerLink}>
                  Accounts Payable
                </Link>
              </li>
              <li>
                <Link href="/finance-desk/docsynecx-intelligence/" className={styles.footerLink}>
                  Docsynecx Intelligence
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Logistics Modules */}
          <div className={styles.navCol}>
            <h4 className={styles.colHeader}>Logistics</h4>
            <ul className={styles.linkList}>
              <li>
                <Link href="/logistics-desk/RFQ-to-booking/" className={styles.footerLink}>
                  RFQ-to-Booking
                </Link>
              </li>
              <li>
                <Link href="/logistics-desk/shipment-operations/" className={styles.footerLink}>
                  Shipment Operations
                </Link>
              </li>
              <li>
                <Link href="/logistics-desk/shipment-tracking/" className={styles.footerLink}>
                  Shipment Tracking
                </Link>
              </li>
              <li>
                <Link href="/logistics-desk/freight-intelligence/" className={styles.footerLink}>
                  Freight Intelligence
                </Link>
              </li>
              <li>
                <Link href="/logistics-desk/integrations/" className={styles.footerLink}>
                  Integrations
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 6: Resources */}
          <div className={styles.navCol}>
            <h4 className={styles.colHeader}>Resources</h4>
            <ul className={styles.linkList}>
              <li>
                <Link href="/blogs" className={styles.footerLink}>
                  Blogs
                </Link>
              </li>
              {/* <li>
                <Link href="/#customers" className={styles.footerLink}>
                  Case Studies
                </Link>
              </li> */}
              <li>
                <Link href="/about" className={styles.footerLink}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/events/iics-2026/" className={styles.footerLink}>
                  Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 7: Company */}
          <div className={styles.navCol}>
            <h4 className={styles.colHeader}>Company</h4>
            <ul className={styles.linkList}>
              <li>
                <Link href="/privacy-policy" className={styles.footerLink}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className={styles.footerLink}>
                  Terms of Service
                </Link>
              </li>
              
              <li>
                <Link href="/contact" className={styles.footerLink}>
                  Contact Us
                </Link>
              </li>
              <li>
               
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
                Built by SynecX AI Labs Private Limited &middot; Coimbatore, Tamil Nadu, India
              </span>
            </div>
            <span className={styles.copyright}>
              &copy; Powered by SynecX AI Labs Private Limited. All rights reserved. 
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default ShipsyFooter;
