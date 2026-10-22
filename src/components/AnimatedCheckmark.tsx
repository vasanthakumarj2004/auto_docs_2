'use client';
import React, { useEffect, useRef, useState } from 'react';

interface AnimatedCheckmarkProps {
  size?: number;
  badgeClassName?: string;
  delayMs?: number;
}

export const AnimatedCheckmark: React.FC<AnimatedCheckmarkProps> = ({
  size = 14,
  badgeClassName = 'bg-violet-50 text-violet-600 border border-violet-200',
  delayMs = 0,
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [isDrawn, setIsDrawn] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsDrawn(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsDrawn(true);
          }, delayMs);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '120px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [delayMs]);

  return (
    <span
      ref={containerRef}
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${
        isDrawn ? 'scale-100' : 'scale-75 opacity-70'
      } ${badgeClassName}`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path
          d="M20 6L9 17L4 12"
          style={{
            strokeDasharray: 24,
            strokeDashoffset: isDrawn ? 0 : 24,
            transition: 'stroke-dashoffset 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </svg>
    </span>
  );
};
