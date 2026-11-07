import { ConsentPreferences, VisitorLocation } from '@/src/types/consent';
import {
  COOKIE_NAME,
  FUNCTIONAL_STORAGE_KEYS,
  STORAGE_KEY_SESSION_LOCATION,
  STORAGE_KEY_SECURE_SESSION,
} from './consent-config';
import { validateConsentPreferences } from './consent-validation';

/**
 * Cookie Reader for client-side execution
 */
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const prefix = encodeURIComponent(name) + '=';
  const cookies = document.cookie.split(';');
  for (let c of cookies) {
    c = c.trim();
    if (c.indexOf(prefix) === 0) {
      try {
        return decodeURIComponent(c.substring(prefix.length));
      } catch {
        return c.substring(prefix.length);
      }
    }
  }
  return null;
}

/**
 * Cookie Deleter
 */
export function deleteCookie(name: string): void {
  if (typeof document === 'undefined') return;
  // Overwrite with immediate expiry across standard domain paths
  document.cookie = `${encodeURIComponent(name)}=; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
}

/**
 * Reads and validates the consent preferences cookie from document.cookie
 */
export function getSavedConsentCookie(): ConsentPreferences | null {
  const raw = getCookie(COOKIE_NAME);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    const validated = validateConsentPreferences(parsed);
    if (!validated) {
      // Invalid or expired: delete corrupted/expired cookie
      deleteCookie(COOKIE_NAME);
      return null;
    }
    return validated;
  } catch {
    deleteCookie(COOKIE_NAME);
    return null;
  }
}

/**
 * Writes the validated consent preferences to the first-party cookie
 */
export function saveConsentCookie(preferences: ConsentPreferences): void {
  if (typeof document === 'undefined') return;

  const serialized = JSON.stringify(preferences);
  const maxAge = Math.floor(preferences.expiryDays * 86400); // Expiry in seconds
  const expiresUTC = new Date(preferences.expiresAt).toUTCString();

  const isSecureContext =
    typeof window !== 'undefined' &&
    (window.location.protocol === 'https:' ||
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1');

  const secureFlag = isSecureContext ? '; Secure' : '';

  document.cookie = `${encodeURIComponent(COOKIE_NAME)}=${encodeURIComponent(
    serialized
  )}; max-age=${maxAge}; expires=${expiresUTC}; path=/; SameSite=Lax${secureFlag}`;
}

/**
 * Saves a key-value pair to localStorage ONLY IF functional consent is granted
 */
export function saveFunctionalStorage(key: string, value: string): void {
  if (typeof window === 'undefined') return;
  const prefs = getSavedConsentCookie();
  if (!prefs || !prefs.functional) {
    return; // Blocked without functional consent
  }
  try {
    localStorage.setItem(key, value);
  } catch {}
}

/**
 * Purges all theme and personalization preferences from localStorage immediately
 */
export function purgeFunctionalLocalStorage(): void {
  if (typeof window === 'undefined') return;
  FUNCTIONAL_STORAGE_KEYS.forEach((key) => {
    try {
      localStorage.removeItem(key);
    } catch {}
  });
}

/**
 * Saves visitor location to sessionStorage ONLY IF functional consent is granted
 */
export function saveSessionLocation(data: VisitorLocation): void {
  if (typeof window === 'undefined') return;
  const prefs = getSavedConsentCookie();
  if (!prefs || !prefs.functional) {
    return;
  }
  try {
    sessionStorage.setItem(STORAGE_KEY_SESSION_LOCATION, JSON.stringify(data));
  } catch {}
}

/**
 * Retrieves visitor location from sessionStorage
 */
export function getSessionLocation(): VisitorLocation | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY_SESSION_LOCATION);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Purges temporary visitor location from sessionStorage
 */
export function purgeFunctionalSessionStorage(): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem(STORAGE_KEY_SESSION_LOCATION);
  } catch {}
}

/**
 * Purges confidential or marketing session details
 */
export function purgeMarketingData(): void {
  if (typeof window === 'undefined') return;
  deleteCookie(STORAGE_KEY_SECURE_SESSION);
}

/**
 * Purges all optional storage and identifiers across localStorage, sessionStorage, and cookies
 */
export function purgeAllOptionalStorage(): void {
  purgeFunctionalLocalStorage();
  purgeFunctionalSessionStorage();
  purgeMarketingData();
}
