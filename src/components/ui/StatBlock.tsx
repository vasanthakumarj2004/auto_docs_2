'use client';
import React, { useEffect, useState, useRef } from 'react';
import { MetricTransition } from '../MetricTransition';

export interface StatBlockProps {
  label: string;
  value?: number;
  prefix?: string;
  suffix?: string;
  fromValue?: string;
  toValue?: string;
  subtext?: string;
  verifiedBadge?: string;
  theme?: 'blue' | 'teal' | 'emerald' | 'orange' | 'dark';
  className?: string;
}

export const StatBlock: React.FC<StatBlockProps> = ({
  label,
  value,
  prefix = '',
  suffix = '',
  fromValue,
  toValue,
  subtext,
  verifiedBadge,
  theme = 'blue',
  className = '',
}) => {
  const [displayValue, setDisplayValue] = useState<number>(0);
  const blockRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  const themeColors = {
    blue: 'text-brand-blue',
    teal: 'text-brand-teal',
    emerald: 'text-emerald-700',
    orange: 'text-brand-orange',
    dark: 'text-white',
  };

  useEffect(() => {
    if (value === undefined) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayValue(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          const duration = 900;
          const start = 0;
          const startTime = performance.now();

          const update = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayValue(Math.floor(start + (value - start) * eased));

            if (progress < 1) {
              requestAnimationFrame(update);
            } else {
              setDisplayValue(value);
            }
          };

          requestAnimationFrame(update);
        }
      },
      { threshold: 0.3 }
    );

    if (blockRef.current) {
      observer.observe(blockRef.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={blockRef} className={`flex flex-col ${className}`}>
      {/* Eyebrow Label & Optional Verified Pill */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
          {label}
        </span>
        {verifiedBadge && (
          <span className="inline-flex items-center gap-1 rounded bg-slate-100 border border-slate-200 px-1.5 py-0.5 text-[10px] font-mono font-bold text-slate-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{verifiedBadge}</span>
          </span>
        )}
      </div>

      {/* Main Metric Display */}
      {fromValue && toValue ? (
        <MetricTransition
          from={fromValue}
          to={toValue}
          className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight text-slate-950 tabular-nums"
          accentClassName={themeColors[theme]}
        />
      ) : value !== undefined ? (
        <div className={`text-3xl sm:text-4xl font-extrabold font-mono tracking-tight text-slate-950 tabular-nums ${themeColors[theme]}`}>
          {prefix}
          {displayValue.toLocaleString('en-IN')}
          {suffix}
        </div>
      ) : null}

      {/* Subtext description */}
      {subtext && (
        <p className="mt-2 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
          {subtext}
        </p>
      )}
    </div>
  );
};
