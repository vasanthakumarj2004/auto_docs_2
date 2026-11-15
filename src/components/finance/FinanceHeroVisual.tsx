'use client';

import React from 'react';
import styles from './FinanceHeroVisual.module.css';

interface FinanceHeroVisualProps {
  className?: string;
  showCaption?: boolean;
  captionText?: string;
}

export function FinanceHeroVisual({
  className = '',
  showCaption = true,
  captionText = 'Docsynecx financial operations · Connected ledger, intelligence & analytics',
}: FinanceHeroVisualProps) {
  return (
    <div
      className={`${styles.heroImageCard} ${className}`}
      aria-label="Docsynecx connected ledger and financial analytics visual"
    >
      {/* Clipped container with exact pencil-sketch shape */}
      <div className={styles.visualFrame}>
        <img
          src="/images/finance-desk-hero.jpg"
          alt="Financial growth chart, coins and glowing digital market trends"
          className={styles.singleImg}
          loading="eager"
        />
        <div className={styles.imageOverlay} aria-hidden="true" />
      </div>

      {/* SVG Outline matching the exact pencil sketch shape */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className={styles.shapeOutlineSvg}
        aria-hidden="true"
      >
        <path
          d="M 28, 2 L 95, 2 Q 99, 2 99, 6 L 99, 94 Q 99, 98 95, 98 L 8, 98 Q 3, 98 4, 93 L 23, 6 Q 24, 2 28, 2 Z"
          fill="none"
          stroke="rgba(24, 203, 150, 0.55)"
          strokeWidth="1.8"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* SVG Clip Path Definition for the Pencil-Sketched Hero Shape */}
      <svg width="0" height="0" className={styles.clipSvgDef} aria-hidden="true">
        <defs>
          <clipPath id="financeSketchHeroShape" clipPathUnits="objectBoundingBox">
            <path d="M 0.28, 0.02 L 0.95, 0.02 Q 0.99, 0.02 0.99, 0.06 L 0.99, 0.94 Q 0.99, 0.98 0.95, 0.98 L 0.08, 0.98 Q 0.03, 0.98 0.04, 0.93 L 0.23, 0.06 Q 0.24, 0.02 0.28, 0.02 Z" />
          </clipPath>
        </defs>
      </svg>

      {showCaption && (
        <p className={styles.caption}>{captionText}</p>
      )}
    </div>
  );
}
