'use client';

import React from 'react';
import { Cookie, SlidersHorizontal, X } from 'lucide-react';
import { useConsent } from '@/src/context/ConsentContext';
import { CookiePreferences } from './CookiePreferences';
import styles from './CookieConsent.module.css';

export const CookieConsentBanner: React.FC = () => {
  const {
    isBannerOpen,
    isCustomizing,
    hasHydrated,
    acceptAll,
    rejectAll,
    openCustomizing,
    closeBanner,
  } = useConsent();

  if (!hasHydrated || !isBannerOpen) {
    return null;
  }

  // If preferences customization is open, display the small div box
  if (isCustomizing) {
    return (
      <div className={styles.overlayContainer}>
        <CookiePreferences />
      </div>
    );
  }

  return (
    <aside
      className={styles.bannerContainer}
      role="region"
      aria-label="Cookie consent banner"
    >
      <div className={styles.slimBanner}>
        <div className={styles.bannerMessage}>
          <Cookie size={16} className={styles.cookieIcon} aria-hidden="true" />
          <span className={styles.bannerText}>
            We use cookies to improve your experience.
          </span>
        </div>

        <div className={styles.bannerControls}>
          <button
            type="button"
            onClick={openCustomizing}
            className={styles.btnPreferences}
            aria-label="Cookie preferences"
          >
            <SlidersHorizontal size={12} aria-hidden="true" />
            <span>Preferences</span>
          </button>

          <button
            type="button"
            onClick={rejectAll}
            className={styles.btnReject}
          >
            Reject All
          </button>

          <button
            type="button"
            onClick={acceptAll}
            className={styles.btnAccept}
          >
            Accept All
          </button>

          <button
            type="button"
            onClick={closeBanner}
            className={styles.dismissBtn}
            aria-label="Dismiss banner"
          >
            <X size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </aside>
  );
};
