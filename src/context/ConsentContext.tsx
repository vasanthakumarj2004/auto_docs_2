'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { ConsentCategoryKey, ConsentContextValue, ConsentPreferences } from '@/src/types/consent';
import {
  acceptAllConsent,
  rejectAllConsent,
  saveCustomConsent,
  initializeConsentState,
} from '@/src/lib/consent/consent-manager';
import { getSavedConsentCookie } from '@/src/lib/consent/consent-storage';

const ConsentContext = createContext<ConsentContextValue | null>(null);

export interface ConsentProviderProps {
  children: React.ReactNode;
}

export const ConsentProvider: React.FC<ConsentProviderProps> = ({ children }) => {
  const [preferences, setPreferences] = useState<ConsentPreferences | null>(null);
  const [isBannerOpen, setIsBannerOpen] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);

  // Initialize consent on client hydration
  useEffect(() => {
    const saved = initializeConsentState();
    if (saved) {
      setPreferences(saved);
      setIsBannerOpen(false);
    } else {
      // No valid or unexpired consent found -> Display banner
      setPreferences(null);
      setIsBannerOpen(true);
    }
    setHasHydrated(true);

    // Event listener for opening settings from anywhere in the app (e.g. footer)
    const handleOpenSettings = () => {
      setIsCustomizing(true);
      setIsBannerOpen(true);
    };

    // Event listener for consent updates from other scripts or tabs
    const handleConsentChanged = (e: Event) => {
      const customEvent = e as CustomEvent<ConsentPreferences>;
      if (customEvent.detail) {
        setPreferences(customEvent.detail);
      } else {
        const fresh = getSavedConsentCookie();
        setPreferences(fresh);
      }
    };

    window.addEventListener('docsynecx:open-cookie-settings', handleOpenSettings);
    window.addEventListener('docsynecx:consent-changed', handleConsentChanged);

    return () => {
      window.removeEventListener('docsynecx:open-cookie-settings', handleOpenSettings);
      window.removeEventListener('docsynecx:consent-changed', handleConsentChanged);
    };
  }, []);

  const handleAcceptAll = useCallback(() => {
    const result = acceptAllConsent();
    setPreferences(result);
    setIsCustomizing(false);
    setIsBannerOpen(false);
  }, []);

  const handleRejectAll = useCallback(() => {
    const result = rejectAllConsent();
    setPreferences(result);
    setIsCustomizing(false);
    setIsBannerOpen(false);
  }, []);

  const handleSaveCustom = useCallback(
    (categories: { functional: boolean; analytics: boolean; marketing: boolean }) => {
      const result = saveCustomConsent(categories, 'custom');
      setPreferences(result);
      setIsCustomizing(false);
      setIsBannerOpen(false);
    },
    []
  );

  const openSettings = useCallback(() => {
    setIsCustomizing(true);
    setIsBannerOpen(true);
  }, []);

  const closeBanner = useCallback(() => {
    // If user has not yet consented, rejecting or closing should preserve essential only
    if (!preferences) {
      handleRejectAll();
    } else {
      setIsBannerOpen(false);
      setIsCustomizing(false);
    }
  }, [preferences, handleRejectAll]);

  const openCustomizing = useCallback(() => {
    setIsCustomizing(true);
  }, []);

  const closeCustomizing = useCallback(() => {
    setIsCustomizing(false);
  }, []);

  const isCategoryAllowed = useCallback(
    (category: ConsentCategoryKey): boolean => {
      if (category === 'essential') return true;
      if (!preferences) return false;
      return Boolean(preferences[category]);
    },
    [preferences]
  );

  const value = useMemo<ConsentContextValue>(
    () => ({
      preferences,
      isBannerOpen,
      isCustomizing,
      hasHydrated,
      acceptAll: handleAcceptAll,
      rejectAll: handleRejectAll,
      saveCustom: handleSaveCustom,
      openSettings,
      closeBanner,
      openCustomizing,
      closeCustomizing,
      isCategoryAllowed,
    }),
    [
      preferences,
      isBannerOpen,
      isCustomizing,
      hasHydrated,
      handleAcceptAll,
      handleRejectAll,
      handleSaveCustom,
      openSettings,
      closeBanner,
      openCustomizing,
      closeCustomizing,
      isCategoryAllowed,
    ]
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
};

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error('useConsent must be used within a ConsentProvider');
  }
  return ctx;
}
