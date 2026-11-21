'use client';

/**
 * useAnalyticsPageView
 * React hook that fires page_view on every SPA route change, after the route
 * renders and document.title has updated. Guards against StrictMode double-fire
 * and deduplicates repeated transitions to the same path.
 *
 * Usage: This hook is consumed internally by GoogleAnalytics component.
 * You can also call it from individual layouts if you need fine-grained control.
 *
 * Example:
 *   const pathname = usePathname();
 *   const searchParams = useSearchParams();
 *   const path = searchParams?.toString() ? `${pathname}?${searchParams}` : pathname;
 *   useAnalyticsPageView({ path });
 */

import { useEffect, useRef } from 'react';
import { trackPageView, getAnalyticsConsent, isGAInitialized } from '@/src/lib/analytics';
import { resetPerPageTrackingState } from '@/src/lib/marketing-analytics';

interface UseAnalyticsPageViewOptions {
  /** Current route path (e.g. from usePathname()). Include query string if desired. */
  path: string;
  /** Current page title. If omitted, document.title is used after a 50ms defer. */
  title?: string;
}

export function useAnalyticsPageView({ path, title }: UseAnalyticsPageViewOptions): void {
  const isFirstMount = useRef(true);
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    // Guard: React StrictMode double-invoke on first mount.
    // The first execution sets refs and returns early.
    // initGA (called by GoogleAnalytics component) already fired the initial page_view.
    if (isFirstMount.current) {
      isFirstMount.current = false;
      lastTrackedPath.current = path;
      return;
    }

    // Deduplicate: skip if path hasn't changed (handles searchParams updates that don't change pathname)
    if (lastTrackedPath.current === path) return;
    lastTrackedPath.current = path;

    // Reset per-page-view deduplication state (faq_expand, video_play)
    resetPerPageTrackingState();

    // Defer 50ms so document.title has updated after the route transition
    const timer = setTimeout(() => {
      if (getAnalyticsConsent() && isGAInitialized()) {
        trackPageView(path, title || document.title);
      }
    }, 50);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);
}
