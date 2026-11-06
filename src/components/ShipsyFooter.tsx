'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, CheckCircle2, Activity, Linkedin, Mail, Youtube, ArrowUpRight } from 'lucide-react';
import { DocsynecxLogo } from './DocsynecxLogo';
import { financeCapabilities, financeRoot } from '../content/finance';
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
              The AI execution engine for finance &amp; logistics teams. Built for Tally, ERPs, and CargoWise.
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

            {/* Enterprise Certifications & Compliance Strip (Shipsy Signature) */}
            <div className={styles.certsStrip}>
              <span className={styles.certsTitle}>Enterprise Standards</span>
              <div className={styles.certBadges}>
                <div className={styles.certBadge} title="SOC 2 Type II Certified">
                  <ShieldCheck size={12} aria-hidden="true" />
                  <span>SOC 2 Type II</span>
                </div>
                <div className={styles.certBadge} title="ISO 27001 Compliant">
                  <Lock size={12} aria-hidden="true" />
                  <span>ISO 27001</span>
                </div>
                <div className={styles.certBadge} title="GDPR Ready">
                  <CheckCircle2 size={12} aria-hidden="true" />
                  <span>GDPR Ready</span>
                </div>
                <div className={styles.certBadge} title="99.9% Uptime Guarantee">
                  <Activity size={12} aria-hidden="true" />
                  <span>99.9% SLA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Solutions */}
          <div className={styles.navCol}>
            <span className={styles.colHeader}>Solutions</span>
            <ul className={styles.linkList}>
              <li>
                <Link href="/finance-desk/invoice-automation/" className={styles.footerLink}>
                  Invoice Automation
                </Link>
              </li>
              <li>
                <Link href="/finance-desk/docsynecx-intelligence/" className={styles.footerLink}>
                  Docsynecx Intelligence
                </Link>
              </li>
              <li>
                <Link href="/finance-desk/banking-reconciliation/" className={styles.footerLink}>
                  Banking &amp; Reconciliation
                </Link>
              </li>
              <li>
                <Link href="/finance-desk/payment-reminders/" className={styles.footerLink}>
                  Payment Reminders
                </Link>
              </li>
              <li>
                <Link href="/finance-desk/accounts-payable/" className={styles.footerLink}>
                  Accounts Payable
                  <span className={styles.upcomingBadge}>Upcoming</span>
                </Link>
              </li>
              <li>
                <Link href="/logistics/" className={styles.footerLink}>
                  Shipment Desk
                </Link>
              </li>
              <li>
                <Link href="/logistics-trade/" className={styles.footerLink}>
                  Freight Operations
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className={styles.footerLink}>
                  Document Processing
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Industries & Platform */}
          <div className={styles.navCol}>
            <span className={styles.colHeader}>Industries</span>
            <ul className={styles.linkList}>
              <li>
                <Link href="/#automotive-industry" className={styles.footerLink}>
                  Automotive &amp; EV
                </Link>
              </li>
              <li>
                <Link href="/#manufacturing-industry" className={styles.footerLink}>
                  Manufacturing
                </Link>
              </li>
              <li>
                <Link href="/#retail-industry" className={styles.footerLink}>
                  Retail &amp; Distribution
                </Link>
              </li>
              <li>
                <Link href="/logistics-trade/" className={styles.footerLink}>
                  Freight Forwarders &amp; 3PLs
                </Link>
              </li>
            </ul>

            <span className={styles.subColHeader}>Platform</span>
            <ul className={styles.linkList}>
              <li>
                <Link href="/finance-desk/invoice-automation/" className={styles.footerLink}>
                  TallyPrime Integration
                </Link>
              </li>
              <li>
                <Link href="/logistics/" className={styles.footerLink}>
                  CargoWise Integration
                </Link>
              </li>
              <li>
                <Link href="/#faq" className={styles.footerLink}>
                  Zoho Books Integration
                </Link>
              </li>
              <li>
                <Link href="/demo/" className={styles.footerLink}>
                  REST API &amp; Webhooks
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company & Resources */}
          <div className={styles.navCol}>
            <span className={styles.colHeader}>Company</span>
            <ul className={styles.linkList}>
              <li>
                <Link href="/#why-docsynecx" className={styles.footerLink}>
                  About Docsynecx
                </Link>
              </li>
              <li>
                <Link href="/customers/ft-logistics/" className={styles.footerLink}>
                  FT Logistics Story
                </Link>
              </li>
              <li>
                <Link href="/customers/rajadurai/" className={styles.footerLink}>
                  Rajadurai E-Vehicles
                </Link>
              </li>
              <li>
                <Link href="/#customers" className={styles.footerLink}>
                  All Customer Outcomes
                </Link>
              </li>
              <li>
                <Link href="/calculator/" className={styles.footerLink}>
                  Free ROI Calculator
                </Link>
              </li>
              <li>
                <Link href="/free-trial/" className={styles.footerLink}>
                  Start Free Trial
                </Link>
              </li>
              <li>
                <Link href="/demo/" className={styles.footerLink}>
                  Book a Demo
                </Link>
              </li>
              <li>
                <Link href="/#faq" className={styles.footerLink}>
                  Help Center / FAQ
                </Link>
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
            <span className={styles.brandLocation}>
              SynecX AI Labs Private Limited &middot; Coimbatore, Tamil Nadu, India
            </span>

            <div className={styles.bottomRight}>
              <Link href="/#faq" className={styles.bottomLink}>
                Privacy Policy
              </Link>
              <Link href="/#faq" className={styles.bottomLink}>
                Terms of Service
              </Link>
              <button
                type="button"
                className={styles.bottomLink}
                onClick={() => alert('All cookie preferences are active.')}
              >
                Cookie Settings
              </button>
              <span className={styles.copyright}>
                &copy; {currentYear} SynecX AI Labs Private Limited. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default ShipsyFooter;
