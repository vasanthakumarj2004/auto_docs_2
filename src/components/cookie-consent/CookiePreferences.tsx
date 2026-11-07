'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, X } from 'lucide-react';
import { useConsent } from '@/src/context/ConsentContext';
import { CookieCategory } from './CookieCategory';
import styles from './CookieConsent.module.css';

export const CookiePreferences: React.FC = () => {
  const { preferences, saveCustom, acceptAll, rejectAll, closeCustomizing, closeBanner } = useConsent();

  const [functional, setFunctional] = useState(preferences ? preferences.functional : false);
  const [analytics, setAnalytics] = useState(preferences ? preferences.analytics : false);
  const [marketing, setMarketing] = useState(preferences ? preferences.marketing : false);

  useEffect(() => {
    if (preferences) {
      setFunctional(preferences.functional);
      setAnalytics(preferences.analytics);
      setMarketing(preferences.marketing);
    }
  }, [preferences]);

  const handleSave = () => {
    saveCustom({
      functional,
      analytics,
      marketing,
    });
  };

  return (
    <div
      className={styles.preferencesFloatingBox}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-preferences-title"
    >
      <div className={styles.preferencesHeader}>
        <div className={styles.headerTitleGroup}>
          <button
            type="button"
            onClick={closeCustomizing}
            className={styles.backBtn}
            aria-label="Back to consent banner"
          >
            <ArrowLeft size={14} aria-hidden="true" />
          </button>
          <h2 id="cookie-preferences-title" className={styles.preferencesTitle}>
            Cookie Preferences
          </h2>
        </div>

        <button
          type="button"
          onClick={closeBanner}
          className={styles.closeBtn}
          aria-label="Close preferences"
        >
          <X size={15} aria-hidden="true" />
        </button>
      </div>

      <div className={styles.checkboxList}>
        <CookieCategory
          id="essential"
          name="Essential"
          checked={true}
          disabled={true}
          onChange={() => {}}
        />

        <CookieCategory
          id="functional"
          name="Functional"
          checked={functional}
          onChange={setFunctional}
        />

        <CookieCategory
          id="analytics"
          name="Analytics"
          checked={analytics}
          onChange={setAnalytics}
        />

        <CookieCategory
          id="marketing"
          name="Marketing"
          checked={marketing}
          onChange={setMarketing}
        />
      </div>

      <div className={styles.preferencesFooter}>
        <div className={styles.footerLeftActions}>
          <button
            type="button"
            onClick={rejectAll}
            className={styles.btnSmallGhost}
          >
            Reject All
          </button>
          <button
            type="button"
            onClick={acceptAll}
            className={styles.btnSmallOutline}
          >
            Accept All
          </button>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className={styles.btnSmallPrimary}
        >
          <Check size={13} aria-hidden="true" />
          <span>Save</span>
        </button>
      </div>
    </div>
  );
};
