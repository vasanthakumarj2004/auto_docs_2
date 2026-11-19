'use client';

import React, { useState } from 'react';
import { Check, CheckCircle2, RotateCcw, ShieldCheck } from 'lucide-react';
import styles from './LogisticsHeroVisual.module.css';

interface LogisticsHeroVisualProps {
  className?: string;
}

export function LogisticsHeroVisual({ className = '' }: LogisticsHeroVisualProps) {
  const [isApproved, setIsApproved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleApprove = () => {
    setIsApproved((prev) => !prev);
  };

  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div
      className={`${styles.heroVisualContainer} ${className}`}
      aria-label="Docsynecx freight quote extraction and approval visual"
    >
      {/* Layered 3D Depth Backdrop Glow & Ghost Card */}
      <div className={styles.ambientGlow} aria-hidden="true" />
      <div className={styles.ghostCardBehind} aria-hidden="true" />

      {/* Main Dark Quote Review Card */}
      <div className={styles.mainCard}>
        {/* Top Header Row */}
        <div className={styles.topRow}>
          <div className={styles.topTitleGroup}>
            <span className={styles.typeEyebrow}>Quote draft</span>
            <span className={styles.metaDot} aria-hidden="true">·</span>
            <span className={styles.shipperName}>Kaveri Textiles Pvt Ltd</span>
          </div>

          <div
            className={`${styles.statusBadge} ${isApproved ? styles.statusBadgeApproved : ''}`}
            role="status"
          >
            <span>{isApproved ? 'APPROVED & SENT' : 'WAITING FOR YOU'}</span>
          </div>
        </div>

        {/* Port Lane & Voyage Meta */}
        <div className={styles.quoteMetaSection}>
          <div className={styles.laneRow}>
            <h3 className={styles.laneCode}>INNSA</h3>
            <span className={styles.laneArrow} aria-hidden="true">→</span>
            <h3 className={styles.laneCode}>AEJEA</h3>
          </div>
          <p className={styles.laneSubtext}>
            Nhava Sheva to Jebel Ali · 1 × 40&apos; HC · 18,200 kg · Ready 22 Nov · FOB
          </p>
        </div>

        {/* Rates Table */}
        <div className={styles.tableWrapper} role="region" aria-label="Vendor rates comparison">
          <table className={styles.ratesTable}>
            <thead>
              <tr>
                <th scope="col" className={styles.colVendor}>VENDOR</th>
                <th scope="col" className={styles.colTransit}>TRANSIT</th>
                <th scope="col" className={styles.colBuyRate}>BUY RATE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className={styles.vendorName}>Carrier A</span>
                  <span className={styles.bestBadge}>BEST</span>
                </td>
                <td className={styles.transitCell}>5 days</td>
                <td className={`${styles.buyRateCell} ${styles.bestRateCell}`}>$640</td>
              </tr>
              <tr>
                <td>
                  <span className={styles.vendorName}>Agent B</span>
                </td>
                <td className={styles.transitCell}>6 days</td>
                <td className={styles.buyRateCell}>$690</td>
              </tr>
              <tr>
                <td>
                  <span className={styles.vendorName}>Carrier C</span>
                </td>
                <td className={styles.transitCell}>4 days</td>
                <td className={styles.buyRateCell}>$735</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Sell Rate Margin Total Callout Box */}
        <div className={styles.totalBox}>
          <div className={styles.totalLabelGroup}>
            <ShieldCheck size={16} className={styles.shieldIcon} aria-hidden="true" />
            <span>Sell rate with your margin</span>
          </div>
          <div className={styles.totalAmount}>$785</div>
        </div>

        {/* Action Buttons Row */}
        <div className={styles.actionRow}>
          <button
            type="button"
            onClick={handleApprove}
            className={`${styles.approveButton} ${isApproved ? styles.approvedState : ''}`}
            aria-pressed={isApproved}
          >
            {isApproved ? (
              <>
                <CheckCircle2 size={16} aria-hidden="true" />
                <span>Approved · Quote Sent</span>
              </>
            ) : (
              <>
                <Check size={16} aria-hidden="true" />
                <span>Approve &amp; send</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleEdit}
            className={`${styles.editButton} ${isEditing ? styles.editingState : ''}`}
            aria-pressed={isEditing}
          >
            {isEditing ? (
              <>
                <RotateCcw size={14} aria-hidden="true" />
                <span>Reset</span>
              </>
            ) : (
              <span>Edit</span>
            )}
          </button>
        </div>

        {/* Micro-line Footer */}
        <div className={styles.cardFooter}>
          <span>SAMPLE DATA</span>
          <span className={styles.metaDot} aria-hidden="true">·</span>
          <span className={styles.highlightBadge}>DRAFTED IN 21 SECONDS</span>
        </div>
      </div>
    </div>
  );
}
