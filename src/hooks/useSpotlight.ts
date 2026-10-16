'use client';
import { useCallback, useRef } from 'react';

export function useSpotlight<T extends HTMLElement = HTMLDivElement>() {
  const containerRef = useRef<T | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<T>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty('--mouse-x', `${x}px`);
    el.style.setProperty('--mouse-y', `${y}px`);
  }, []);

  return { containerRef, handleMouseMove };
}
