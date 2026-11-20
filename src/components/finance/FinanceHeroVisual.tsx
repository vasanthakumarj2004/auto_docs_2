'use client';

import React from 'react';
import { Check, ShieldCheck } from 'lucide-react';
import styles from './FinanceHeroVisual.module.css';

interface FinanceHeroVisualProps {
  className?: string;
  showCaption?: boolean;
  captionText?: string;
}

export function FinanceHeroVisual({
  className = '',
  showCaption = false,
  captionText = 'Docsynecx financial operations · Connected ledger, intelligence & analytics',
}: FinanceHeroVisualProps) {

  return (
    <div
      className={`${styles.heroVisualContainer} ${className}`}
      aria-label="Docsynecx purchase invoice extraction and approval visual"
    >
      {/* Layered 3D Depth Backdrop Glow & Ghost Card */}
      <div className={styles.ambientGlow} aria-hidden="true" />
      <div className={styles.ghostCardBehind} aria-hidden="true" />

      {/* Main Dark Invoice Review Card */}
      <div className={styles.mainCard}>
        {/* Top Header Row */}
        <div className={styles.topRow}>
          <div className={styles.topTitleGroup}>
            <span className={styles.typeEyebrow}>Purchase invoice</span>
            <span className={styles.metaDot} aria-hidden="true">·</span>
            <span className={styles.supplierName}>Prime Components</span>
          </div>

          <div
            className={styles.statusBadge}
            role="status"
          >
            <span>READY TO APPROVE</span>
          </div>
        </div>

        {/* Invoice ID and Date */}
        <div className={styles.invoiceMetaSection}>
          <div className={styles.invoiceIdRow}>
            <h3 className={styles.invoiceId}>INV-4821</h3>
            <span className={styles.metaDot} aria-hidden="true">·</span>
            <span className={styles.invoiceDate}>12 Nov 2026</span>
          </div>
          <p className={styles.gstinSubtext}>
            <span>GSTIN 33AABCP1234F1Z5</span>
            <span className={styles.metaDot} aria-hidden="true">·</span>
            <span>Coimbatore, Tamil Nadu</span>
          </p>
        </div>

        {/* Line Items Table */}
        <div className={styles.tableWrapper} role="region" aria-label="Invoice line items">
          <table className={styles.itemsTable}>
            <thead>
              <tr>
                <th scope="col" className={styles.colItem}>ITEM · HSN</th>
                <th scope="col" className={styles.colQty}>QTY × RATE</th>
                <th scope="col" className={styles.colAmount}>AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.cellItem}>
                  <span className={styles.itemName}>Ball bearings</span>
                  <span className={styles.itemHsn}>· 8482</span>
                </td>
                <td className={styles.cellQty}>250 × ₹170</td>
                <td className={styles.cellAmount}>₹42,500</td>
              </tr>
              <tr>
                <td className={styles.cellItem}>
                  <span className={styles.itemName}>Rubber seals</span>
                  <span className={styles.itemHsn}>· 4016</span>
                </td>
                <td className={styles.cellQty}>450 × ₹45</td>
                <td className={styles.cellAmount}>₹20,250</td>
              </tr>
              <tr className={styles.taxRow}>
                <td className={styles.cellItem}>
                  <span className={styles.taxName}>CGST 9% + SGST 9%</span>
                </td>
                <td className={styles.cellQty} />
                <td className={styles.cellAmount}>₹11,295</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Invoice Total Callout Box */}
        <div className={styles.totalBox}>
          <div className={styles.totalLabelGroup}>
            <ShieldCheck size={16} className={styles.shieldIcon} aria-hidden="true" />
            <span>Invoice total · tax checked</span>
          </div>
          <div className={styles.totalAmount}>₹74,045</div>
        </div>

        {/* Action Row - Static UI Preview (Non-clickable) */}
        <div className={styles.actionRow} aria-hidden="true">
          <div className={styles.approveButton}>
            <Check size={16} aria-hidden="true" />
            <span>Approve &amp; post to Tally</span>
          </div>

          <div className={styles.editButton}>
            <span>Edit</span>
          </div>
        </div>

        {/* Micro-line Footer */}
        <div className={styles.cardFooter}>
          <span>SAMPLE DATA</span>
          <span className={styles.metaDot} aria-hidden="true">·</span>
          <span className={styles.highlightBadge}>NO DUPLICATES FOUND</span>
        </div>
      </div>

      {showCaption && captionText && (
        <p className={styles.captionText}>{captionText}</p>
      )}
    </div>
  );
}
