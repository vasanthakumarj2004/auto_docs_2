'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, X } from 'lucide-react';
import s from './LandingAnnouncementBar.module.css';

const STORAGE_KEY = 'docsynecx-iics-2026-announcement-dismissed';

export function LandingAnnouncementBar() {
  const [dismissed, setDismissed] = useState(true); // default true for SSR to avoid layout shift

  useEffect(() => {
    try {
      const isDismissed = sessionStorage.getItem(STORAGE_KEY);
      if (isDismissed !== 'true') {
        setDismissed(false);
      }
    } catch {
      setDismissed(false);
    }
  }, []);

  function handleDismiss(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDismissed(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch {}
  }

  if (dismissed) return null;

  return (
    <aside
      role="banner"
      aria-label="IICS 2026 Event Announcement"
      className={s.announcementBar}
    >
      <div className={s.shell}>
        {/* Full Clickable Area to Event Page */}
        <Link
          href="/events/iics-2026/"
          className={s.linkWrapper}
          title="Meet Docsynecx at IICS 2026 — Booth Q53"
        >
          {/* Event Badge */}
          <span className={s.badge}>
            <span className={s.pulseDot} aria-hidden="true" />
            IICS 2026
          </span>

          {/* Announcement Copy */}
          <span className={s.announcementText}>
            <span className={s.strongText}>Meet Docsynecx</span> at{' '}
            <span className={s.extraCopy}>India International Cargo Show 2026 — Exhibiting at</span>
            <span className={s.boothHighlight}>Booth Q53</span>
          </span>

          {/* Call to Action */}
          <span className={s.ctaGroup}>
            <span className={s.ctaText}>View Event Pass</span>
            <ArrowUpRight size={12} className={s.arrowIcon} aria-hidden="true" />
          </span>
        </Link>

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss event announcement"
          className={s.dismissBtn}
        >
          <X size={12} aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}

export default LandingAnnouncementBar;
