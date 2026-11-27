'use client';

import dynamic from 'next/dynamic';

const CookieConsent = dynamic(
  () =>
    import('./CookieConsent').then((module) => ({
      default: module.CookieConsent,
    })),
  { ssr: false },
);

const GoogleAnalytics = dynamic(
  () =>
    import('./analytics/GoogleAnalytics').then((module) => ({
      default: module.GoogleAnalytics,
    })),
  { ssr: false },
);

export function DeferredGlobalFeatures() {
  return (
    <>
      <GoogleAnalytics />
      <CookieConsent />
    </>
  );
}
