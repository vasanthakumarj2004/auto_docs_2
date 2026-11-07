/**
 * Centralized Cookie Consent & Governance Types
 * Spec: Cookie Consent Management System (CCMS)
 */

export type ConsentCategoryKey = 'essential' | 'functional' | 'analytics' | 'marketing';

export type ConsentStatus = 'accepted' | 'rejected' | 'custom' | 'unset';

export interface ConsentCategories {
  essential: true;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

export interface ConsentPreferences extends ConsentCategories {
  consentStatus: ConsentStatus;
  consentVersion: string;
  consentUpdatedAt: string; // ISO 8601 string
  expiresAt: string;        // ISO 8601 string
  expiryDays: number;
}

export interface CategoryMetadata {
  id: ConsentCategoryKey;
  name: string;
  description: string;
  required: boolean;
  examples: string[];
}

export interface VisitorLocation {
  city?: string | null;
  region?: string | null;
  country?: string | null;
  countryCode?: string | null;
  timezone?: string | null;
  currency?: string | null;
  consentVerified: boolean;
  cachedAt?: string;
  status?: string;
  error?: string;
}

export interface ConsentContextValue {
  preferences: ConsentPreferences | null;
  isBannerOpen: boolean;
  isCustomizing: boolean;
  hasHydrated: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  saveCustom: (categories: { functional: boolean; analytics: boolean; marketing: boolean }) => void;
  openSettings: () => void;
  closeBanner: () => void;
  openCustomizing: () => void;
  closeCustomizing: () => void;
  isCategoryAllowed: (category: ConsentCategoryKey) => boolean;
}
