'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight, X } from 'lucide-react';
import { getSecureSessionItem, setSecureSessionItem } from '@/src/lib/storage/secure-session-storage';
import s from './LandingAnnouncementBar.module.css';

const STORAGE_KEY = 'docsynecx-iics-2026-announcement-dismissed';

export function LandingAnnouncementBar() {
  const [dismissed, setDismissed] = useState(true); // default true for SSR to avoid layout shift
  const barRef = useRef<HTMLElement>(null);

  useEffect(() => {
    try {
      const isDismissed = getSecureSessionItem(STORAGE_KEY);
      if (isDismissed !== 'true') {
        setDismissed(false);
      } else {
        document.documentElement.style.setProperty('--announcement-bar-height', '0px');
      }
    } catch {
      setDismissed(false);
    }
  }, []);

  useEffect(() => {
    if (dismissed) {
      document.documentElement.style.setProperty('--announcement-bar-height', '0px');
      return;
    }

    const updateHeight = () => {
      if (barRef.current) {
        const rect = barRef.current.getBoundingClientRect();
        document.documentElement.style.setProperty('--announcement-bar-height', `${Math.ceil(rect.height)}px`);
      }
    };

    updateHeight();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && barRef.current) {
      ro = new ResizeObserver(updateHeight);
      ro.observe(barRef.current);
    }
    window.addEventListener('resize', updateHeight);

    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, [dismissed]);

  function handleDismiss(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDismissed(true);
    document.documentElement.style.setProperty('--announcement-bar-height', '0px');
    try {
      setSecureSessionItem(STORAGE_KEY, 'true');
    } catch {}
  }

  if (dismissed) return null;

  return (
    <aside
      ref={barRef}
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
