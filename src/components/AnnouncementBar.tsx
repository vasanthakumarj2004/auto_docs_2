'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, X, Sparkles } from 'lucide-react';

export function AnnouncementBarV2() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      const isDismissed = sessionStorage.getItem('docsynecx-announcement-dismissed');
      if (!isDismissed) {
        setDismissed(false);
      }
    } catch {
      setDismissed(false);
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem('docsynecx-announcement-dismissed', 'true');
    } catch {}
  };

  if (dismissed) return null;

  return (
    <aside
      role="banner"
      aria-label="New Release Announcement"
      className="relative z-50 text-white text-xs py-2 px-4 transition-all duration-200"
      style={{
        backgroundColor: 'var(--color-brand, #18cb96)',
        color: '#ffffff',
      }}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center gap-2 text-center flex-wrap sm:flex-nowrap">
          <span className="inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded-full bg-white/20 text-[11px] uppercase tracking-wider text-white shrink-0">
            <Sparkles className="w-3 h-3 text-white" aria-hidden="true" />
            <span>New Release</span>
          </span>
          <span className="font-medium text-white/95 truncate">
            Docsynecx 2.0: Direct TallyPrime XML &amp; CargoWise eAdaptor live synchronization launched.
          </span>
          <Link
            href="/#integrations"
            className="inline-flex items-center gap-1 font-bold underline underline-offset-2 hover:text-white/80 transition-colors shrink-0 ml-1 text-white"
          >
            <span>See live connectors</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss announcement"
          className="p-1 rounded-md hover:bg-white/20 text-white/90 hover:text-white transition-colors cursor-pointer shrink-0"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}

