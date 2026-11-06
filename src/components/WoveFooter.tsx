'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Linkedin } from 'lucide-react';
import { DocsynecxLogo } from './DocsynecxLogo';
import { financeCapabilities, financeRoot } from '../content/finance';
import styles from './WoveFooter.module.css';

export interface WoveFooterProps {
  variant?: 'light' | 'dark';
}

export function WoveFooter({ variant = 'dark' }: WoveFooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer id="resources" className={styles.footer} data-variant={variant} aria-label="Site footer">
      {/* Tier 1: Newsletter / Updates Strip */}
      <div className={styles.newsletterBar}>
        <div className={styles.shell}>
          <div className={styles.newsletterContent}>
            <div className={styles.newsletterText}>
              <h2 className={styles.newsletterTitle}>Get product updates and workflow news.</h2>
              <p className={styles.newsletterSubtitle}>
                What we&apos;re shipping and what&apos;s changing in document automation. No spam.
              </p>
            </div>
            <form className={styles.newsletterForm} onSubmit={handleSubscribe}>
              <div className={styles.inputWrapper}>
                <label htmlFor="wove-footer-email" className="sr-only">
                  Work email
                </label>
                <input
                  id="wove-footer-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  className={styles.newsletterInput}
                />
              </div>
              <button
                type="submit"
                className={styles.subscribeButton}
                data-status={subscribed ? 'success' : undefined}
                disabled={subscribed}
              >
                {subscribed ? (
                  <>
                    <Check size={14} aria-hidden="true" />
                    <span>Subscribed</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Tier 2: 6-Column Navigation Grid */}
      <div className={styles.shell}>
        <div className={styles.navigationGrid}>
          {/* Column 1: Brand & Contact */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logoLink} aria-label="Docsynecx home">
              <DocsynecxLogo
                variant={variant === 'dark' ? 'footer' : 'header'}
                className={styles.logo}
              />
            </Link>
            <p className={styles.brandDescription}>
              The AI execution engine for finance and logistics teams. Built for Tally, ERPs and CargoWise.
            </p>
            <div className={styles.socialList} aria-label="Docsynecx social channels">
              <a
                href="https://www.linkedin.com/company/autodocs"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn"
              >
                <Linkedin size={14} aria-hidden="true" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://twitter.com/autodocs"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="X (formerly Twitter)"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l7.3-8.5L1.6 2h6.5l4.5 6.8L18.9 2Zm-1.1 18h1.7L7.2 3.9H5.4L17.8 20Z" />
                </svg>
                <span>X</span>
              </a>
              <a href="mailto:info@docsynecx.com" className={styles.socialLink}>
                <span>Contact</span>
              </a>
            </div>
          </div>

          {/* Column 2: Platform */}
          <div className={styles.navCol}>
            <span className={styles.colHeader}>Platform</span>
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
                  Shipment Registration
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className={styles.footerLink}>
                  Document Processing
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Integrations */}
          <div className={styles.navCol}>
            <span className={styles.colHeader}>Integrations</span>
            <ul className={styles.linkList}>
              <li>
                <Link href="/finance-desk/invoice-automation/" className={styles.footerLink}>
                  TallyPrime
                </Link>
              </li>
              <li>
                <Link href="/logistics/" className={styles.footerLink}>
                  CargoWise
                </Link>
              </li>
              <li>
                <Link href="/#faq" className={styles.footerLink}>
                  Zoho Books
                </Link>
              </li>
              <li>
                <Link href="/#integrations" className={styles.footerLink}>
                  SAP ERP
                </Link>
              </li>
              <li>
                <Link href="/#integrations" className={styles.footerLink}>
                  Oracle NetSuite
                </Link>
              </li>
              <li>
                <Link href="/demo/" className={styles.footerLink}>
                  REST API &amp; Webhooks
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Solutions */}
          <div className={styles.navCol}>
            <span className={styles.colHeader}>Solutions</span>
            <ul className={styles.linkList}>
              <li>
                <Link href={financeRoot} className={styles.footerLink}>
                  Finance Desk
                </Link>
              </li>
              <li>
                <Link href="/logistics/" className={styles.footerLink}>
                  Shipment Desk
                </Link>
              </li>
              <li>
                <Link href="/logistics-trade/" className={styles.footerLink}>
                  Freight Forwarders &amp; 3PLs
                </Link>
              </li>
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
            </ul>
          </div>

          {/* Column 5: Customers & Compare */}
          <div className={styles.navCol}>
            <span className={styles.colHeader}>Compare</span>
            <ul className={styles.linkList}>
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
                <Link href="/#how-it-works" className={styles.footerLink}>
                  Docsynecx vs. OCR
                </Link>
              </li>
              <li>
                <Link href="/#outcomes-title" className={styles.footerLink}>
                  Docsynecx vs. Manual
                </Link>
              </li>
              <li>
                <Link href="/#customers" className={styles.footerLink}>
                  All Customer Outcomes
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 6: Resources */}
          <div className={styles.navCol}>
            <span className={styles.colHeader}>Resources</span>
            <ul className={styles.linkList}>
              <li>
                <Link href="/calculator/" className={styles.footerLink}>
                  Free ROI Calculator
                </Link>
              </li>
              <li>
                <Link href="/demo/" className={styles.footerLink}>
                  Book a Demo
                </Link>
              </li>
              <li>
                <Link href="/free-trial/" className={styles.footerLink}>
                  Start Free Trial
                </Link>
              </li>
              <li>
                <Link href="/#faq" className={styles.footerLink}>
                  Help Center / FAQ
                </Link>
              </li>
              <li>
                <Link href="/#why-docsynecx" className={styles.footerLink}>
                  About Docsynecx
                </Link>
              </li>
              <li>
                <Link href="/#control" className={styles.footerLink}>
                  Security &amp; Trust
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tier 3: Bottom Legal & Operational Strip */}
      <div className={styles.bottomStrip}>
        <div className={styles.shell}>
          <div className={styles.bottomContent}>
            <span className={styles.brandTagline}>
              The document execution engine for finance &amp; logistics
            </span>
            <div className={styles.bottomLinks}>
              <Link href="/#faq" className={styles.bottomLink}>
                Privacy
              </Link>
              <Link href="/#faq" className={styles.bottomLink}>
                Terms
              </Link>
              <button type="button" className={styles.bottomLink} onClick={() => alert('All cookies accepted.')}>
                Cookie Settings
              </button>
              <span className={styles.copyright}>
                &copy; {new Date().getFullYear()} SynecX AI Labs Private Limited. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default WoveFooter;
