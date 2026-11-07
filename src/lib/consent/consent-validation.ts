import { ConsentCategories, ConsentPreferences, ConsentStatus } from '@/src/types/consent';
import { calculateConsentExpiryDays, CONSENT_VERSION } from './consent-config';

/**
 * Validates and sanitizes a raw consent object from cookies or client input.
 * Ensures essential is strictly true, and checks expiration.
 * Returns null if the consent is malformed or expired.
 */
export function validateConsentPreferences(input: unknown): ConsentPreferences | null {
  if (!input || typeof input !== 'object') {
    return null;
  }

  const obj = input as Record<string, unknown>;

  // Check essential (always enforced as true for valid preferences)
  if (obj.essential !== true) {
    return null;
  }

  const functional = Boolean(obj.functional);
  const analytics = Boolean(obj.analytics);
  const marketing = Boolean(obj.marketing);

  const validStatuses: ConsentStatus[] = ['accepted', 'rejected', 'custom', 'unset'];
  const consentStatus =
    typeof obj.consentStatus === 'string' && validStatuses.includes(obj.consentStatus as ConsentStatus)
      ? (obj.consentStatus as ConsentStatus)
      : 'custom';

  const consentVersion = typeof obj.consentVersion === 'string' ? obj.consentVersion : CONSENT_VERSION;
  // If version doesn't match current consent version, invalidate so user is re-prompted
  if (consentVersion !== CONSENT_VERSION) {
    return null;
  }

  const consentUpdatedAt =
    typeof obj.consentUpdatedAt === 'string' && !isNaN(Date.parse(obj.consentUpdatedAt))
      ? obj.consentUpdatedAt
      : new Date().toISOString();

  // Validate expiration
  if (typeof obj.expiresAt === 'string') {
    const expiryTime = Date.parse(obj.expiresAt);
    if (!isNaN(expiryTime) && Date.now() >= expiryTime) {
      // Consent has expired!
      return null;
    }
  }

  const expiryDays =
    typeof obj.expiryDays === 'number' && obj.expiryDays > 0
      ? obj.expiryDays
      : calculateConsentExpiryDays({ functional, analytics, marketing });

  const expiresAt =
    typeof obj.expiresAt === 'string' && !isNaN(Date.parse(obj.expiresAt))
      ? obj.expiresAt
      : new Date(Date.now() + expiryDays * 864e5).toISOString();

  return {
    essential: true,
    functional,
    analytics,
    marketing,
    consentStatus,
    consentVersion,
    consentUpdatedAt,
    expiresAt,
    expiryDays,
  };
}

/**
 * Builds a standardized ConsentPreferences object with calculated expiry
 */
export function createConsentPreferences(
  categories: Omit<ConsentCategories, 'essential'>,
  status: ConsentStatus = 'custom'
): ConsentPreferences {
  const expiryDays = calculateConsentExpiryDays(categories);
  const now = new Date();
  const expiresAt = new Date(now.getTime() + expiryDays * 864e5).toISOString();

  return {
    essential: true,
    functional: Boolean(categories.functional),
    analytics: Boolean(categories.analytics),
    marketing: Boolean(categories.marketing),
    consentStatus: status,
    consentVersion: CONSENT_VERSION,
    consentUpdatedAt: now.toISOString(),
    expiresAt,
    expiryDays,
  };
}

/**
 * Generate predefined configurations
 */
export function getPresetPreferences(status: 'accept_all' | 'reject_all'): ConsentPreferences {
  if (status === 'accept_all') {
    return createConsentPreferences(
      {
        functional: true,
        analytics: true,
        marketing: true,
      },
      'accepted'
    );
  }

  return createConsentPreferences(
    {
      functional: false,
      analytics: false,
      marketing: false,
    },
    'rejected'
  );
}
