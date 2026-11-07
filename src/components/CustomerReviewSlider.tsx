'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './CustomerReviewSlider.module.css';

interface CustomerReview {
  id: string;
  industry: string;
  company: string;
  copy: string;
}

const REVIEWS: CustomerReview[] = [
  {
    id: 'ft-logistics',
    industry: 'Logistics',
    company: 'FT Logistics',
    copy: 'A specific email-to-CargoWise document workflow reduced from around two hours to approximately two minutes.',
  },
  {
    id: 'rajadurai-ev',
    industry: 'Automotive & EV',
    company: 'Rajadurai E-Vehicles',
    copy: 'Manual document workload reduced from days to hours through an AI-assisted workflow.',
  },
  {
    id: 'arishfirma',
    industry: 'Business Operations',
    company: 'Arishfirma',
    copy: 'Regular operational use for asset and purchase bill workflows.',
  },
];

export const CustomerReviewSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const touchStartX = useRef<number | null>(null);

  const total = REVIEWS.length;

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  // Auto-play: advance cards right→left every 4 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(handleNext, 4000);
    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
    setIsPaused(false);
  };

  return (
    <div
      className={styles.reviewSectionWrapper}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div
        className={styles.sliderStage}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {REVIEWS.map((review, index) => {
          let offset = index - activeIndex;
          if (offset > total / 2) offset -= total;
          if (offset < -total / 2) offset += total;

          let cardClass = styles.cardHidden;
          if (offset === 0) cardClass = styles.cardActive;
          else if (offset === -1) cardClass = styles.cardLeft;
          else if (offset === 1) cardClass = styles.cardRight;

          return (
            <article
              key={review.id}
              className={`${styles.reviewCard} ${cardClass}`}
              onClick={() => {
                if (offset === -1) handlePrev();
                if (offset === 1) handleNext();
              }}
              aria-hidden={offset !== 0}
            >
              {/* Industry label */}
              <p className={styles.industryLabel}>{review.industry}</p>

              {/* Company name */}
              <h3 className={styles.companyName}>{review.company}</h3>

              {/* Divider */}
              <div className={styles.divider} aria-hidden="true" />

              {/* Copy */}
              <p className={styles.reviewCopy}>{review.copy}</p>

              {/* Bottom accent */}
              <div className={styles.cardAccent} aria-hidden="true">
                <span className={styles.accentDot} />
                <span className={styles.accentDot} />
                <span className={styles.accentDot} />
              </div>
            </article>
          );
        })}
      </div>

      {/* Description text */}
      <p className={styles.sliderDescription}>
        Discover the insights from teams regarding their experiences with Docsynecx automated workflows.
      </p>
    </div>
  );
};
