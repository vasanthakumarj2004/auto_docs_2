'use client';
import React, { useEffect, useRef, useState } from 'react';

export interface CountUpProps {
  end: number;
  start?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  end,
  start = 0,
  duration = 1200,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
}) => {
  // Initialize with end so SSR and SSG static HTML pre-renders the real numbers!
  const [value, setValue] = useState<number>(end);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef<boolean>(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setValue(end);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          observer.disconnect();

          setValue(start);
          let startTime: number | null = null;
          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Mercury-style quartic ease-out approximating cubic-bezier(0.16, 1, 0.3, 1)
            const easeOut = 1 - Math.pow(1 - progress, 4);
            const current = start + (end - start) * easeOut;

            setValue(current);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setValue(end);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [end, start, duration]);

  const formatted =
    prefix +
    (decimals > 0
      ? value.toFixed(decimals)
      : Math.round(value).toLocaleString()) +
    suffix;

  return (
    <span ref={elementRef} className={`tabular-nums ${className}`}>
      {formatted}
    </span>
  );
};
