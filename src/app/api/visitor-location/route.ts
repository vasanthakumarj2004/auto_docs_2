import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { COOKIE_NAME } from '@/src/lib/consent/consent-config';

interface UpstreamIpApiResponse {
  city?: string;
  region?: string;
  country_name?: string;
  country?: string;
  country_code?: string;
  timezone?: string;
  currency?: string;
  error?: boolean;
  reason?: string;
}

export async function GET() {
  try {
    // 1. Check server-side cookies for cookie_preferences
    const cookieStore = await cookies();
    const consentCookie = cookieStore.get(COOKIE_NAME);

    if (!consentCookie || !consentCookie.value) {
      return NextResponse.json(
        { error: 'Functional consent required for geolocation personalization', consentVerified: false },
        { status: 403 }
      );
    }

    let parsedPreferences;
    try {
      parsedPreferences = JSON.parse(decodeURIComponent(consentCookie.value));
    } catch {
      try {
        parsedPreferences = JSON.parse(consentCookie.value);
      } catch {
        return NextResponse.json(
          { error: 'Invalid consent cookie', consentVerified: false },
          { status: 403 }
        );
      }
    }

    // 2. Enforce strict functional consent & check expiration
    if (parsedPreferences.essential !== true || !parsedPreferences.functional) {
      return NextResponse.json(
        { error: 'Functional consent is not granted', consentVerified: false },
        { status: 403 }
      );
    }

    if (parsedPreferences.expiresAt) {
      const expiry = Date.parse(parsedPreferences.expiresAt);
      if (!isNaN(expiry) && Date.now() >= expiry) {
        return NextResponse.json(
          { error: 'Consent expired', consentVerified: false },
          { status: 403 }
        );
      }
    }

    // 3. Make server-side call to ipapi safely
    const apiKey = process.env.IPAPI_KEY;
    const ipApiUrl = apiKey
      ? `https://ipapi.co/json/?key=${encodeURIComponent(apiKey)}`
      : 'https://ipapi.co/json/';

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    let upstreamData: UpstreamIpApiResponse | null = null;
    try {
      const response = await fetch(ipApiUrl, {
        headers: {
          'User-Agent': 'Docsynecx-CCMS-Proxy/1.0',
          'Accept': 'application/json',
        },
        signal: controller.signal,
        cache: 'no-store',
      });

      if (response.ok) {
        upstreamData = await response.json();
      }
    } catch {
      // Upstream failed or timed out
    } finally {
      clearTimeout(timeoutId);
    }

    if (!upstreamData || upstreamData.error) {
      return NextResponse.json({
        consentVerified: true,
        status: 'unavailable',
        message: 'Geolocation provider temporarily unavailable',
      });
    }

    // 4. Return strictly minimal, non-confidential personalization fields
    return NextResponse.json({
      city: upstreamData.city || null,
      region: upstreamData.region || null,
      country: upstreamData.country_name || upstreamData.country || null,
      countryCode: upstreamData.country_code || null,
      timezone: upstreamData.timezone || null,
      currency: upstreamData.currency || null,
      consentVerified: true,
      cachedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error processing visitor location', consentVerified: false },
      { status: 500 }
    );
  }
}
