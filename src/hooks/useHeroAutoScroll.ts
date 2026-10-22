'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

interface UseHeroAutoScrollOptions {
  blockRefs: (React.RefObject<HTMLElement | null> | HTMLElement | null)[];
  initialDelay?: number; // default 2000ms (2s)
  moveDuration?: number; // default 1200ms (1.2s)
  pauseDuration?: number; // default 2500ms (2.5s)
}

interface UseHeroAutoScrollReturn {
  currentStep: number;
  isAutoScrolling: boolean;
  isCancelled: boolean;
  stopAutoScroll: () => void;
  jumpToStep: (step: number) => void;
}

export const useHeroAutoScroll = ({
  blockRefs,
  initialDelay = 2000,
  moveDuration = 1200,
  pauseDuration = 2500,
}: UseHeroAutoScrollOptions): UseHeroAutoScrollReturn => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState<boolean>(false);
  const [isCancelled, setIsCancelled] = useState<boolean>(false);

  // Keep a stable ref to blockRefs so effect does not re-run on array recreation
  const blockRefsRef = useRef(blockRefs);
  blockRefsRef.current = blockRefs;

  // References for animation and cancellation tracking
  const isProgrammaticScrollingRef = useRef<boolean>(false);
  const userInterruptedRef = useRef<boolean>(false);
  const timeoutIdRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);

  // Stop permanently on user intervention or tour finish
  const stopAutoScroll = useCallback(() => {
    if (userInterruptedRef.current) return;
    userInterruptedRef.current = true;
    setIsAutoScrolling(false);
    setIsCancelled(true);

    if (timeoutIdRef.current !== null) {
      window.clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  }, []);

  // Compute target scroll position to center block under 68px navbar
  const getTargetScrollY = useCallback((element: HTMLElement): number => {
    const navbarHeight = 68;
    const viewportHeight = window.innerHeight;
    const availableHeight = viewportHeight - navbarHeight;
    const rect = element.getBoundingClientRect();
    const elementTopFromPage = rect.top + window.scrollY;

    const verticalCenterOffset = Math.max(0, (availableHeight - rect.height) / 2);
    const target = elementTopFromPage - navbarHeight - verticalCenterOffset;
    return Math.max(0, target);
  }, []);

  // Animate scroll using requestAnimationFrame with cubic ease-in-out
  const animateScrollTo = useCallback(
    (targetY: number, duration: number, onComplete?: () => void) => {
      if (userInterruptedRef.current) return;

      const startY = window.scrollY;
      const distance = targetY - startY;

      // If already at or very close to target, finish immediately
      if (Math.abs(distance) < 2) {
        onComplete?.();
        return;
      }

      const startTime = performance.now();
      isProgrammaticScrollingRef.current = true;

      const easeInOutCubic = (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const stepAnimation = (currentTime: number) => {
        if (userInterruptedRef.current) {
          isProgrammaticScrollingRef.current = false;
          return;
        }

        const elapsed = currentTime - startTime;
        const progress = Math.min(1, elapsed / duration);
        const ease = easeInOutCubic(progress);

        isProgrammaticScrollingRef.current = true;
        window.scrollTo(0, startY + distance * ease);

        if (progress < 1) {
          rafIdRef.current = requestAnimationFrame(stepAnimation);
        } else {
          rafIdRef.current = null;
          // Protect against trailing scroll events
          window.setTimeout(() => {
            isProgrammaticScrollingRef.current = false;
          }, 80);
          onComplete?.();
        }
      };

      rafIdRef.current = requestAnimationFrame(stepAnimation);
    },
    []
  );

  // Jump to specific step (triggered manually by progress dot click)
  const jumpToStep = useCallback(
    (stepIndex: number) => {
      stopAutoScroll();
      setCurrentStep(stepIndex);

      const block = blockRefsRef.current[stepIndex];
      const el = block && 'current' in block ? block.current : block;
      if (!el) return;

      const targetY = getTargetScrollY(el);
      window.scrollTo({
        top: targetY,
        behavior: 'smooth',
      });
    },
    [getTargetScrollY, stopAutoScroll]
  );

  useEffect(() => {
    // 1. Guard Checks
    if (typeof window === 'undefined') return;
    if (userInterruptedRef.current) return;

    // Desktop only (>= 1024px)
    if (window.innerWidth < 1024) {
      userInterruptedRef.current = true;
      setIsCancelled(true);
      return;
    }

    // Must start near top of page (not scrolled down)
    if (window.scrollY > 40) {
      userInterruptedRef.current = true;
      setIsCancelled(true);
      return;
    }

    // Do not auto-scroll if there is a hash or tab is hidden
    if (window.location.hash && window.location.hash.length > 1) {
      userInterruptedRef.current = true;
      setIsCancelled(true);
      return;
    }
    if (document.hidden) {
      userInterruptedRef.current = true;
      setIsCancelled(true);
      return;
    }

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
      if (typeof console !== 'undefined' && console.info) {
        console.info('[AutoDocs] prefers-reduced-motion: reduce is active. Auto-scroll paused; static 3D depth preserved.');
      }
      userInterruptedRef.current = true;
      setIsCancelled(true);
      return;
    }

    // 2. User input interruption listeners
    const handleUserInterruption = (e?: Event) => {
      // If we are actively animating programmatic scroll and this is a native scroll event, ignore it
      if (e && e.type === 'scroll' && isProgrammaticScrollingRef.current) {
        return;
      }

      // Check key events for scroll-related keys
      if (e instanceof KeyboardEvent) {
        const scrollKeys = [
          'ArrowUp',
          'ArrowDown',
          'PageUp',
          'PageDown',
          'Home',
          'End',
          ' ',
        ];
        if (!scrollKeys.includes(e.key)) return;
      }

      stopAutoScroll();
    };

    // Attach passive listeners for all user gestures
    window.addEventListener('wheel', handleUserInterruption, { passive: true });
    window.addEventListener('touchstart', handleUserInterruption, { passive: true });
    window.addEventListener('touchmove', handleUserInterruption, { passive: true });
    window.addEventListener('pointerdown', handleUserInterruption, { passive: true });
    window.addEventListener('mousedown', handleUserInterruption, { passive: true });
    window.addEventListener('keydown', handleUserInterruption, { passive: true });
    window.addEventListener('focusin', handleUserInterruption, { passive: true });

    // 3. Start auto-scroll routine after initialDelay
    setIsAutoScrolling(true);

    const executeStep = (targetStep: number) => {
      if (userInterruptedRef.current) return;

      const refs = blockRefsRef.current;
      const block = refs[targetStep];
      const el = block && 'current' in block ? block.current : block;
      if (!el) {
        stopAutoScroll();
        return;
      }

      setCurrentStep(targetStep);
      const targetY = getTargetScrollY(el);

      animateScrollTo(targetY, moveDuration, () => {
        if (userInterruptedRef.current) return;

        // If we reached the last right block (index 2), stop permanently
        if (targetStep >= refs.length - 1) {
          stopAutoScroll();
          return;
        }

        // Otherwise pause for pauseDuration, then scroll to next block
        timeoutIdRef.current = window.setTimeout(() => {
          executeStep(targetStep + 1);
        }, pauseDuration);
      });
    };

    // Initial 2-second wait with no user input
    timeoutIdRef.current = window.setTimeout(() => {
      if (!userInterruptedRef.current) {
        // Begin progression to Block 1 (index 1)
        executeStep(1);
      }
    }, initialDelay);

    return () => {
      // Clear timers and rAF on unmount, but do NOT flag userInterruptedRef
      if (timeoutIdRef.current !== null) {
        window.clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      window.removeEventListener('wheel', handleUserInterruption);
      window.removeEventListener('touchstart', handleUserInterruption);
      window.removeEventListener('touchmove', handleUserInterruption);
      window.removeEventListener('pointerdown', handleUserInterruption);
      window.removeEventListener('mousedown', handleUserInterruption);
      window.removeEventListener('keydown', handleUserInterruption);
      window.removeEventListener('focusin', handleUserInterruption);
    };
  }, [
    animateScrollTo,
    getTargetScrollY,
    initialDelay,
    moveDuration,
    pauseDuration,
    stopAutoScroll,
  ]);

  return {
    currentStep,
    isAutoScrolling,
    isCancelled,
    stopAutoScroll,
    jumpToStep,
  };
};
