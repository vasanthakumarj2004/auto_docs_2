import React from 'react';
import { FileText, Inbox } from 'lucide-react';
import styles from './FeatureSection.module.css';

export function DeskDocumentPreview({ type }: { type: 'finance' | 'logistics' }) {
  if (type === 'finance') {
    return <div className={styles.paper}>
      <div className={styles.paperHeading}>
        <div><strong className={styles.highlight}>Prime Components</strong><span>GSTIN: 33AABCP1234A1Z5</span></div>
        <div><h3>Tax invoice</h3><span>INV #829 · FY 2024-25</span></div>
      </div>
      <div className={styles.paperMeta}><span>4 line items · 18% GST</span><span className={styles.highlight}>AI Field Confidence: 99.9%</span></div>
      <div className={styles.invoiceLine}><span>Machined parts · 420 units</span><strong>₹62,792</strong></div>
      <div className={styles.documentLines} aria-hidden="true">{[0, 1, 2].map(line => <div key={line}><i /><i /><i /></div>)}</div>
      <div className={styles.invoiceTotal}><span>Total</span><strong className={styles.highlight}>₹74,095</strong></div>
    </div>;
  }

  return <div className={styles.paper}>
    <div className={styles.mailHeading}><span><Inbox size={17} aria-hidden="true" />Customer inbox</span><span>09:41 AM</span></div>
    <h3 className={styles.mailSubject}>New booking: Chennai → Singapore</h3>
    <span className={styles.parsingPill}>Parsing Active</span>
    <div className={styles.attachments}>{['Bill of lading.pdf', 'Packing list.pdf', 'Invoice.pdf'].map(name => <div key={name}><FileText size={24} aria-hidden="true" /><span>{name}</span></div>)}</div>
    <div className={styles.paperMeta}><span>Origin → destination</span><strong className={styles.highlight}>INMAA → SGSIN</strong></div>
    <div className={styles.invoiceLine}><span>Shipment</span><strong>1 x 40&apos; HC · Sea export</strong></div>
    <div className={styles.documentLines} aria-hidden="true">{[0, 1].map(line => <div key={line}><i /><i /><i /></div>)}</div>
    <div className={styles.invoiceTotal}><span>BL ↔ Packing List ↔ Invoice</span><strong>18,400 kg · 0 Discrepancies</strong></div>
  </div>;
}
