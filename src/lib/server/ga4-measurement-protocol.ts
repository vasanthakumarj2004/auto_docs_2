/**
 * Server-Side Google Analytics 4 (Measurement Protocol)
 *
 * Mandate:
 * Server events must respect consent: the client passes analytics_consent=true,
 * client_id, and session_id ONLY when consent is granted. If analytics_consent
 * is absent or false, the backend must NOT send anything to GA4.
 *
 * GA_API_SECRET is loaded from server-only environment variables and must NEVER
 * be exposed to the browser.
 */

export interface ServerEventPayload {
  eventName: string;
  params?: Record<string, unknown>;
  clientId: string;
  sessionId?: string | number;
  analyticsConsent: boolean;
  userId?: string;
  debug?: boolean;
}

export interface ServerEventResult {
  success: boolean;
  reason?: string;
  statusCode?: number;
}

const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
const GA_API_SECRET = process.env.GA_API_SECRET || '';
const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV || process.env.NODE_ENV || 'production';

/**
 * Dispatches a server-side event to GA4 via the Measurement Protocol.
 * Used for backend completion events (e.g. invoice_processed, processing_failed, export_completed).
 */
export async function sendServerEvent(payload: ServerEventPayload): Promise<ServerEventResult> {
  const { eventName, params = {}, clientId, sessionId, analyticsConsent, userId, debug } = payload;

  // 1. Strict Consent Check
  if (analyticsConsent !== true) {
    if (process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_GA_DEBUG_MODE === 'true') {
      console.log(`[GA4 MP] Event "${eventName}" dropped: analytics_consent is false or missing.`);
    }
    return { success: false, reason: 'consent_not_granted' };
  }

  // 2. Validate Credentials
  if (!MEASUREMENT_ID || !GA_API_SECRET) {
    console.warn(
      `[GA4 MP Warning] Missing credentials. NEXT_PUBLIC_GA_MEASUREMENT_ID (${MEASUREMENT_ID ? 'set' : 'missing'}) or GA_API_SECRET (${GA_API_SECRET ? 'set' : 'missing'}).`
    );
    return { success: false, reason: 'missing_credentials' };
  }

  // 3. Validate Client ID
  if (!clientId || typeof clientId !== 'string') {
    console.warn(`[GA4 MP Warning] Event "${eventName}" omitted: missing or invalid client_id.`);
    return { success: false, reason: 'invalid_client_id' };
  }

  // 4. Assemble Measurement Protocol payload
  const endpoint = debug
    ? `https://www.google-analytics.com/debug/mp/collect?measurement_id=${encodeURIComponent(
        MEASUREMENT_ID
      )}&api_secret=${encodeURIComponent(GA_API_SECRET)}`
    : `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(
        MEASUREMENT_ID
      )}&api_secret=${encodeURIComponent(GA_API_SECRET)}`;

  const eventParams: Record<string, unknown> = {
    ...params,
    engagement_time_msec: 100,
    app_env: APP_ENV,
  };

  if (sessionId) {
    eventParams.session_id = sessionId;
  }

  const body = {
    client_id: clientId,
    user_id: userId || undefined,
    events: [
      {
        name: eventName,
        params: eventParams,
      },
    ],
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (debug) {
      const debugData = await response.json();
      console.log(`[GA4 MP Debug Validation] Response:`, debugData);
    }

    if (!response.ok) {
      console.warn(`[GA4 MP Error] Request failed with HTTP status ${response.status}`);
      return { success: false, reason: 'http_error', statusCode: response.status };
    }

    return { success: true, statusCode: response.status };
  } catch (error) {
    // Log failures, never crash the host request
    console.error(`[GA4 MP Exception] Failed to send event "${eventName}":`, error);
    return { success: false, reason: 'network_exception' };
  }
}
