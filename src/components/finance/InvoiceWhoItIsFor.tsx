'use client';

import React from 'react';
import styles from './InvoiceWhoItIsFor.module.css';

export interface InvoiceIndustryItem {
  id: string;
  title: string;
  copy: string;
  image: string;
}

const invoiceIndustries: InvoiceIndustryItem[] = [
  {
    id: 'finance-teams',
    title: 'Finance and accounts teams',
    copy: 'Invoice processing, review workflows, and validated financial visibility.',
    image: '/images/finance-desk-card.jpg',
  },
  {
    id: 'recurring-invoices',
    title: 'Businesses processing recurring supplier invoices',
    copy: 'Automated intake and verification for recurring vendor documents and high-volume billing.',
    image: '/images/finance-recurring-invoices.jpg',
  },
  {
    id: 'automotive-dealerships',
    title: 'Automotive and EV dealerships',
    copy: 'Multi-line OEM parts invoices, job-card billing, and multi-tier tax splits.',
    image: '/images/industry-automotive.jpg',
  },
  {
    id: 'manufacturing-distribution',
    title: 'Manufacturing and distribution businesses',
    copy: 'Supplier invoices, raw material receipts, and operational purchase order matching.',
    image: '/images/industry-manufacturing.jpg',
  },
  {
    id: 'tallyprime-users',
    title: 'TallyPrime users',
    copy: 'Validated accounting information and automatic voucher creation direct to TallyPrime.',
    image: '/images/finance-tallyprime-users.jpg',
  },
];

const defaultWorkflowChips = [
  'Finance & Accounts Teams',
  'Recurring Supplier Invoices',
  'GST & HSN Tax Checks',
  'Line-Item Data Extraction',
  'TallyPrime Voucher Posting',
];

interface InvoiceWhoItIsForProps {
  eyebrow?: string;
  title?: string;
  copy?: string;
  industries?: InvoiceIndustryItem[];
  chips?: string[];
}

export function InvoiceWhoItIsFor({
  eyebrow = 'WHO IT IS FOR',
  title = 'Designed for teams that need better visibility.',
  copy = 'Finance Desk capabilities can support different business roles and information needs.',
  industries = invoiceIndustries,
  chips = defaultWorkflowChips,
}: InvoiceWhoItIsForProps) {
  return (
    <section id="who-it-is-for" className={styles.section} aria-labelledby="who-it-is-for-title">
      <div className="site-shell">
        <div className={styles.sectionHeading}>
          <div className={styles.headingGroup}>
            <div className={styles.eyebrow}>
              <span>{eyebrow}</span>
            </div>
            <h2 id="who-it-is-for-title" className={styles.title}>
              {title}
            </h2>
          </div>
          {copy && <p className={styles.sectionCopy}>{copy}</p>}
        </div>

        <div className={styles.industries}>
          {industries.map((industry) => (
            <article key={industry.id} id={industry.id} className={styles.industryCard}>
              <div className={styles.industryImageWrapper}>
                <img
                  src={industry.image}
                  alt={industry.title}
                  className={styles.industryImage}
                  loading="lazy"
                />
                <div className={styles.industryImageOverlay} aria-hidden="true" />
              </div>
              <h3 className={styles.industryTitle}>{industry.title}</h3>
              <p className={styles.industryCopy}>{industry.copy}</p>
            </article>
          ))}
        </div>

        {chips && chips.length > 0 && (
          <ul className={`${styles.chips} ${styles.workflowChips}`}>
            {chips.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
