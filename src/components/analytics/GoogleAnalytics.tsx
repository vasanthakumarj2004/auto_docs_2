'use client';

import React, { useEffect, useRef, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initGA, resetAnalytics, trackPageView, isGAInitialized } from '@/src/lib/analytics';
import { getAnalyticsConsent, onConsentChange } from '@/src/lib/consent';

/**
 * Enhanced Measurement Note:
 * Enhanced Measurement is assumed ON in GA4, but 'Page changes based on browser history events' is OFF.
 * Route navigation in this SPA is explicitly tracked below to prevent duplicate page_view events
 * and ensure document.title and sanitized URL paths are strictly validated.
 */
function GoogleAnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstMount = useRef(true);
  const lastTrackedPath = useRef<string | null>(null);

  // 1. Consent synchronization and listener
  useEffect(() => {
    // Initial check on mount
    if (getAnalyticsConsent()) {
      initGA();
    }

    // Subscribe to runtime consent changes across components and browser tabs
    const unsubscribe = onConsentChange((granted) => {
      if (granted) {
        initGA();
      } else {
        resetAnalytics();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // 2. SPA Route change page_view tracking
  useEffect(() => {
    // Construct full path with query string
    const query = searchParams?.toString();
    const currentPath = query ? `${pathname}?${query}` : pathname;

    // Guard against React StrictMode double invocation on first render
    if (isFirstMount.current) {
      isFirstMount.current = false;
      lastTrackedPath.current = currentPath;

      // Note: initGA() already sends the initial page_view on consent.
      // If already initialized prior to this effect, do not double-fire.
      if (!isGAInitialized() && getAnalyticsConsent()) {
        initGA();
      }
      return;
    }

    // Skip if path has not changed
    if (lastTrackedPath.current === currentPath) {
      return;
    }
    lastTrackedPath.current = currentPath;

    // Defer slightly to ensure document.title has updated after route transition
    const timer = setTimeout(() => {
      if (getAnalyticsConsent()) {
        trackPageView(currentPath, document.title);
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return null;
}

export const GoogleAnalytics: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsTracker />
    </Suspense>
  );
};

export default GoogleAnalytics;
