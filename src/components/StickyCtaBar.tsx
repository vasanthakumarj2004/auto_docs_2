'use client';
import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface StickyCtaBarProps {
  theme?: 'blue' | 'teal';
  badge?: string;
  title: string;
  subtext?: string;
  buttonText: string;
  onButtonClick: () => void;
}

export const StickyCtaBar: React.FC<StickyCtaBarProps> = ({
  theme = 'blue',
  badge,
  title,
  subtext,
  buttonText,
  onButtonClick,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;

      // Show after scrolling past hero (~380px) and hide near footer (~420px before bottom)
      const pastHero = scrollY > 380;
      const nearFooter = scrollY + winHeight > docHeight - 420;

      setIsVisible(pastHero && !nearFooter);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const buttonStyle =
    theme === 'teal'
      ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-[0_4px_14px_rgba(15,138,106,0.25)] focus-visible:ring-teal-500'
      : 'bg-brand-blue hover:bg-brand-blue-hover text-white shadow-[0_4px_14px_rgba(47,61,224,0.25)] focus-visible:ring-brand-blue';

  const badgeStyle =
    theme === 'teal'
      ? 'bg-teal-50 text-teal-800 border-teal-200'
      : 'bg-blue-50 text-brand-blue border-blue-200';

  return (
    <div
      aria-hidden={!isVisible}
      className={`fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200/90 bg-white/95 backdrop-blur-md transition-all duration-300 ease-out ${
        isVisible
          ? 'translate-y-0 opacity-100 shadow-[0_-8px_30px_rgba(15,23,42,0.08)]'
          : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="site-shell py-3 sm:py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Left Info: Badge & Title */}
          <div className="hidden sm:flex items-center gap-3 min-w-0">
            {badge && (
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider font-mono shrink-0 ${badgeStyle}`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {badge}
              </span>
            )}
            <div className="truncate">
              <span className="text-sm font-extrabold text-slate-900 tracking-tight block truncate">
                {title}
              </span>
              {subtext && (
                <span className="text-xs text-slate-500 hidden md:inline truncate">
                  {subtext}
                </span>
              )}
            </div>
          </div>

          {/* Right Action: Button */}
          <div className="w-full sm:w-auto flex items-center justify-end">
            <button
              type="button"
              onClick={onButtonClick}
              className={`group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${buttonStyle}`}
            >
              <span>{buttonText}</span>
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
