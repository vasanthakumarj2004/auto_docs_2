import React, { useEffect, useRef, useState } from 'react';

interface MetricTransitionProps {
  from: string;
  to: string;
  arrow?: string;
  className?: string;
  accentClassName?: string;
}

export const MetricTransition: React.FC<MetricTransitionProps> = ({
  from,
  to,
  arrow = '→',
  className = '',
  accentClassName = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    // If user prefers reduced motion, reveal immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '120px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={containerRef}
      className={`inline-flex items-baseline gap-1.5 select-none ${className}`}
    >
      <span
        className={`transition-all duration-300 ${
          isRevealed ? 'opacity-90' : 'opacity-70'
        }`}
      >
        {from}
      </span>
      <span
        className={`text-slate-400 font-normal transition-all duration-300 ${
          isRevealed ? 'opacity-100 scale-100' : 'opacity-60 scale-95'
        }`}
        aria-hidden="true"
      >
        {arrow}
      </span>
      <span
        className={`font-black tracking-tight transition-all duration-500 ${
          accentClassName || ''
        } ${
          isRevealed
            ? 'opacity-100 scale-100'
            : 'opacity-80 scale-95'
        }`}
      >
        {to}
      </span>
    </span>
  );
};

