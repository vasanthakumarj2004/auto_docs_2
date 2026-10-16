'use client';
import { useEffect, useRef, useState } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  rootMargin = '0px 0px -40px 0px',
  triggerOnce = true,
}: UseScrollRevealOptions = {}) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      element.classList.add('reveal-visible');
      element.querySelectorAll('.reveal-init').forEach((child) => child.classList.add('reveal-visible'));
      return;
    }

    // If already in viewport on mount, reveal immediately
    if (typeof window !== 'undefined') {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setIsVisible(true);
        element.classList.add('reveal-visible');
        element.querySelectorAll('.reveal-init').forEach((child) => child.classList.add('reveal-visible'));
        if (triggerOnce) return;
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          element.classList.add('reveal-visible');
          element.querySelectorAll('.reveal-init').forEach((child) => {
            child.classList.add('reveal-visible');
          });
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
          element.classList.remove('reveal-visible');
          element.querySelectorAll('.reveal-init').forEach((child) => {
            child.classList.remove('reveal-visible');
          });
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}
