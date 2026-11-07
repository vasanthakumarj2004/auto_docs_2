import { VisitorLocation } from '@/src/types/consent';
import { getSessionLocation, saveSessionLocation } from '../consent/consent-storage';

/**
 * Service to retrieve visitor location through the secure Next.js backend proxy.
 * Strict privacy rule: Only executes if functional consent is active.
 */
export async function fetchVisitorLocation(functionalConsentActive: boolean): Promise<VisitorLocation | null> {
  if (!functionalConsentActive) {
    return null;
  }

  // 1. Check if temporary visitor location is already cached in sessionStorage
  const cached = getSessionLocation();
  if (cached && cached.consentVerified) {
    return cached;
  }

  // 2. Fetch from our secure backend route which verifies server-side consent cookie
  try {
    const res = await fetch('/api/visitor-location', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      if (res.status === 403) {
        // Backend rejected due to missing functional consent
        return null;
      }
      return null;
    }

    const data: VisitorLocation = await res.json();
    if (data && data.consentVerified) {
      saveSessionLocation(data);
      return data;
    }
  } catch (err) {
    console.debug('Notice: Optional geolocation lookup bypassed.', err);
  }

  return null;
}
