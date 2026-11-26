import React from "react";
import Link from "next/link";
import {
  Linkedin,
  Mail,
  Youtube,
  Instagram,
  ArrowUpRight,
  Facebook,
} from "lucide-react";
import { DocsynecxLogo } from "./DocsynecxLogo";
import { CookieSettingsButton } from "./cookie-consent/CookieSettingsButton";
import styles from "./ShipsyFooter.module.css";

export interface ShipsyFooterProps {
  className?: string;
  showCta?: boolean;
}

export function ShipsyFooter({
  className,
  showCta = false,
}: ShipsyFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="resources"
      className={`${styles.footer} ${className || ""}`}
      aria-label="Site footer"
    >
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
                Finance and logistics are too critical for manual typing and
                data-entry errors. Docsynecx automates document checks, posting,
                and matching directly in Tally and CargoWise.
              </p>
              <div className={styles.ctaActions}>
                <Link prefetch={false} href="/demo/" className={styles.ctaPrimaryBtn}>
                  <span>Book a demo</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
                <Link prefetch={false} href="/calculator/" className={styles.ctaSecondaryBtn}>
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
              <Link prefetch={false} href="/"
                className={styles.logoLink}
                aria-label="Docsynecx home"
              >
                <DocsynecxLogo variant="footer" className={styles.logo} />
              </Link>
              <p className={styles.brandTagline}>
                AI-powered platforms that simplify complex workflows across
                Finance and Logistics Forwarders.
              </p>

              <div
                className={styles.socialRow}
                aria-label="Docsynecx social channels"
              >
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
                  aria-label="Docsynecx on Facebook"
                >
                  <Facebook size={15} aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Column 2: Platforms */}
            <div className={styles.navCol}>
              <h3 className={styles.colHeader}>Platforms</h3>
              <ul className={styles.linkList}>
                <li>
                  <Link prefetch={false} href="/finance-desk/" className={styles.footerLink}>
                    Docsynecx Finance
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href="/logistics-desk" className={styles.footerLink}>
                    Docsynecx Logistics
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Solutions by Use Case */}
            <div className={styles.navCol}>
              <h3 className={styles.colHeader}>Solutions by Use Case</h3>
              <ul className={styles.linkList}>
                <li>
                  <Link prefetch={false} href="/solutions#automotive"
                    className={styles.footerLink}
                  >
                    Automotive &amp; EV
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href="/solutions#manufacturing"
                    className={styles.footerLink}
                  >
                    Industrial Manufacturing
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href="/solutions#textile" className={styles.footerLink}>
                    Textile &amp; Garments
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href="/solutions#retail" className={styles.footerLink}>
                    Retail &amp; Distribution
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href="/solutions#logistics"
                    className={styles.footerLink}
                  >
                    Freight &amp; Logistics
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Finance Modules */}
            <div className={styles.navCol}>
              <h3 className={styles.colHeader}>Finance</h3>
              <ul className={styles.linkList}>
                <li>
                  <Link prefetch={false} href="/finance-desk/invoice-processing/"
                    className={styles.footerLink}
                  >
                    Invoice Processing
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href="/finance-desk/banking-reconciliation/"
                    className={styles.footerLink}
                  >
                    Banking & Reconciliation
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href="/finance-desk/payment-reminders/"
                    className={styles.footerLink}
                  >
                    Payment Reminders
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href="/finance-desk/accounts-payable/"
                    className={styles.footerLink}
                  >
                    Accounts Payable
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href="/finance-desk/docsynecx-intelligence/"
                    className={styles.footerLink}
                  >
                    Docsynecx Intelligence
                  </Link>
                </li>

                <li>
                  <Link prefetch={false} href="/finance-desk/business-owners/"
                    className={styles.footerLink}
                  >
                    For Business Owners
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href="/finance-desk/finance-teams/"
                    className={styles.footerLink}
                  >
                    For Finance Teams
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href="/finance-desk/accounts-teams/"
                    className={styles.footerLink}
                  >
                    For Accounts Teams
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href="/finance-desk/ca-firms/"
                    className={styles.footerLink}
                  >
                    For CA Firms
                  </Link>
                </li>

                <li>
                  <Link prefetch={false} href="/finance-desk/integration-tally"
                    className={styles.footerLink}
                  >
                    TallyPrime Integration
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href="/finance-desk/integration-zoho"
                    className={styles.footerLink}
                  >
                    Zoho Books Integration
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href="/finance-desk/integration-erp"
                    className={styles.footerLink}
                  >
                    Custom ERP Integration
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 5: Logistics Modules */}
            <div className={styles.navCol}>
              <h3 className={styles.colHeader}>Logistics</h3>
              <ul className={styles.linkList}>
                <li>
                  <Link prefetch={false} href="/logistics-desk/rfq-to-booking/"
                    className={styles.footerLink}
                  >
                    RFQ-to-Booking
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href="/logistics-desk/shipment-operations/"
                    className={styles.footerLink}
                  >
                    Shipment Operations
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href="/logistics-desk/shipment-tracking/"
                    className={styles.footerLink}
                  >
                    Shipment Tracking
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href="/logistics-desk/freight-intelligence/"
                    className={styles.footerLink}
                  >
                    Freight Intelligence
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href="/logistics-desk/integrations/"
                    className={styles.footerLink}
                  >
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 6: Resources */}
            <div className={styles.navCol}>
              <h3 className={styles.colHeader}>Resources</h3>
              <ul className={styles.linkList}>
                <li>
                  <Link prefetch={false} href="/blogs" className={styles.footerLink}>
                    Blogs
                  </Link>
                </li>
                {/* <li>
                <Link prefetch={false} href="/customers" className={styles.footerLink}>
                  Case Studies
                </Link>
              </li> */}
                <li>
                  <Link prefetch={false} href="/about" className={styles.footerLink}>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href="/events/iics-2026/" className={styles.footerLink}>
                    Events
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 7: Company */}
            <div className={styles.navCol}>
              <h3 className={styles.colHeader}>Company</h3>
              <ul className={styles.linkList}>
                <li>
                  <Link prefetch={false} href="/privacy-policy" className={styles.footerLink}>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href="/terms-of-service" className={styles.footerLink}>
                    Terms of Service
                  </Link>
                </li>

                <li>
                  <Link prefetch={false} href="/contact" className={styles.footerLink}>
                    Contact Us
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
            {/* <div className={styles.bottomMeta}>
              <span className={styles.brandLocation}>
                Built by SynecX AI Labs Private Limited &middot; Coimbatore, Tamil Nadu, India
              </span>
            </div> */}
            <span className={styles.copyright}>
              &copy; Powered by SynecX AI Labs Private Limited. All rights
              reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default ShipsyFooter;
