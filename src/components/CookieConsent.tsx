'use client';

import React from 'react';
import { CookieConsentBanner } from './cookie-consent/CookieConsentBanner';

/**
 * Production Cookie Consent Management System Component
 * Delegated to modular CookieConsentBanner under src/components/cookie-consent/
 */
export const CookieConsent: React.FC = () => {
  return <CookieConsentBanner />;
};

export default CookieConsent;
