'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, X } from 'lucide-react';

export interface AnnouncementItem {
  id: string;
  tag: string;
  text: string;
  cta: string;
  href: string;
}

const ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'features',
    tag: 'New Release',
    text: 'Check out for new features',
    cta: 'Explore updates',
    href: '/#platform',
  },
  {
    id: 'connectors',
    tag: 'Docsynecx 2.0',
    text: 'Live TallyPrime XML & CargoWise eAdaptor connectors are live',
    cta: 'See live connectors',
    href: '/#integrations',
  },
  {
    id: 'finance',
    tag: 'Finance Desk',
    text: '3-way automated invoice matching with zero data re-entry',
    cta: 'Explore Finance Desk',
    href: '/finance-desk/',
  },
  {
    id: 'logistics',
    tag: 'Logistics Desk',
    text: 'Real-time milestones, container tracking and carrier status updates',
    cta: 'Explore Logistics Desk',
    href: '/logistics/',
  },
];

export function AnnouncementBarV2() {
  const [dismissed, setDismissed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    try {
      const isDismissed = sessionStorage.getItem('docsynecx-announcement-v3-dismissed');
      if (isDismissed === 'true') {
        setDismissed(true);
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--announcement-bar-height', dismissed ? '0px' : '37px');
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.documentElement.style.removeProperty('--announcement-bar-height');
      }
    };
  }, [dismissed]);

  // Automatic 5-second content cycle
  useEffect(() => {
    if (dismissed || isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [dismissed, isPaused]);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem('docsynecx-announcement-v3-dismissed', 'true');
    } catch {}
  };

  if (dismissed) return null;

  const current = ANNOUNCEMENTS[currentIndex];

  return (
    <aside
      role="banner"
      aria-label="New Release Announcement"
      className="relative z-50 text-white text-xs py-2 px-4 select-none transition-all duration-300"
      style={{
        background: 'rgba(104, 85, 134, 0.45)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.14)',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <style>{`
        @keyframes iosAnnouncementFade {
          0% {
            opacity: 0;
            transform: translateY(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .ios-announcement-animate {
          animation: iosAnnouncementFade 320ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="w-full max-w-[1440px] mx-auto px-2 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        {/* Center Content Group */}
        <div className="flex-1 flex items-center justify-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap min-w-0">
          {/* icon.svg as iOS Style Release Button */}
          <Link
            href={current.href}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 hover:bg-white/25 text-white text-[11px] font-bold tracking-tight shadow-xs border border-white/20 transition-all hover:scale-105 active:scale-95 shrink-0"
            title="View new release features"
          >
            <img src="/icon.svg" alt="Docsynecx icon" className="w-3.5 h-3.5 object-contain" />
            <span>{current.tag}</span>
          </Link>

          {/* Rotating Text Content + Right Arrow Link */}
          <div
            key={current.id}
            className="ios-announcement-animate flex items-center gap-2 truncate text-center sm:text-left"
          >
            <span className="font-semibold text-slate-100 text-[12px] truncate tracking-tight">
              {current.text}
            </span>

            <Link
              href={current.href}
              className="inline-flex items-center gap-1 font-bold text-[11.5px] text-white hover:text-[var(--color-brand-400,#34d399)] transition-all shrink-0 group/link ml-0.5"
            >
              <span className="underline underline-offset-3 decoration-white/40 hover:decoration-[var(--color-brand-400,#34d399)]">
                {current.cta}
              </span>
              <ArrowRight
                className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 text-[var(--color-brand-400,#34d399)]"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss announcement"
          className="h-6 w-6 rounded-full hover:bg-white/15 text-slate-300 hover:text-white transition-colors flex items-center justify-center cursor-pointer shrink-0"
        >
          <X className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}
