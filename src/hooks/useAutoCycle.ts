'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseAutoCycleOptions {
  /** Total number of items in the cycle */
  itemCount: number;
  /** Duration in milliseconds for each slide before advancing (default: 4000ms) */
  interval?: number;
  /** Inactivity delay in ms before auto-cycle resumes after manual interaction (default: 5000ms) */
  resumeDelay?: number;
  /** Initial active index (default: 0) */
  initialIndex?: number;
  /** Whether auto-rotation is enabled initially (default: true) */
  enabled?: boolean;
}

export function useAutoCycle({
  itemCount,
  interval = 4000,
  resumeDelay = 5000,
  initialIndex = 0,
  enabled = true,
}: UseAutoCycleOptions) {
  const [active, setActive] = useState(initialIndex);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isManuallyInteracted, setIsManuallyInteracted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const activeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Check user prefers-reduced-motion
  const prefersReducedMotionRef = useRef(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotionRef.current = mediaQuery.matches;

    const listener = (event: MediaQueryListEvent) => {
      prefersReducedMotionRef.current = event.matches;
    };
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Pause when the browser tab is hidden (saves CPU, avoids timer drift)
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Viewport intersection: only run timer when component is visible on screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Determines if auto-cycling is currently running
  const isAutoPlaying =
    enabled &&
    !prefersReducedMotionRef.current &&
    isVisible &&
    !isHovered &&
    !isFocused &&
    !isManuallyInteracted &&
    itemCount > 1;

  // Clear all pending timeouts safely
  const clearTimers = useCallback(() => {
    if (activeTimerRef.current) {
      clearInterval(activeTimerRef.current);
      activeTimerRef.current = null;
    }
  }, []);

  // Core auto-advance timer
  useEffect(() => {
    if (!isAutoPlaying) {
      clearTimers();
      return;
    }

    activeTimerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % itemCount);
    }, interval);

    return clearTimers;
  }, [isAutoPlaying, itemCount, interval, active, clearTimers]);

  // Clean up resume timer on unmount
  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
        resumeTimerRef.current = null;
      }
    };
  }, []);

  // Manual select: switch immediately and schedule resume
  const goTo = useCallback(
    (index: number) => {
      setActive(index);
      setIsManuallyInteracted(true);

      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
      }

      // Resume auto-cycle after inactivity period
      resumeTimerRef.current = setTimeout(() => {
        setIsManuallyInteracted(false);
      }, resumeDelay);
    },
    [resumeDelay]
  );

  const next = useCallback(() => {
    goTo((active + 1) % itemCount);
  }, [active, itemCount, goTo]);

  const prev = useCallback(() => {
    goTo((active - 1 + itemCount) % itemCount);
  }, [active, itemCount, goTo]);

  const pause = useCallback(() => {
    setIsHovered(true);
  }, []);

  const resume = useCallback(() => {
    setIsHovered(false);
    setIsManuallyInteracted(false);
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  }, []);

  // Container props bundle for easy, bulletproof integration
  const containerProps = {
    ref: containerRef,
    onMouseEnter: pause,
    onMouseLeave: resume,
    onTouchStart: pause,
    onTouchEnd: () => {
      // Small debounce on touch release before resuming
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = setTimeout(resume, 3000);
    },
    onFocusCapture: () => setIsFocused(true),
    onBlurCapture: (event: React.FocusEvent) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node)) {
        setIsFocused(false);
        resume();
      }
    },
  };

  return {
    active,
    setActive,
    goTo,
    next,
    prev,
    pause,
    resume,
    isAutoPlaying,
    containerProps,
  };
}
