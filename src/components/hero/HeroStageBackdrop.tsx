'use client';

import React, { useEffect, useRef } from 'react';
import { drawHeroStageFrame } from './heroStageMotion';
import styles from './HeroStageBackdrop.module.css';

/** Decorative motion is confined to the existing left-hand image container. */
export const HeroStageBackdrop: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: true });
    if (!container || !canvas || !context) return;

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let elapsed = 0;
    let previous = 0;
    let lastPaint = 0;
    let width = 0;
    let height = 0;
    let visible = false;
    let disposed = false;

    const paint = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      drawHeroStageFrame(context, width, height, elapsed);
    };

    const tick = (now: number) => {
      if (disposed) return;
      if (previous) elapsed += Math.min((now - previous) / 1000, 0.1);
      previous = now;
      // A 30 fps ambient layer matches the reference and avoids unnecessary work.
      if (now - lastPaint >= 1000 / 30) {
        paint();
        lastPaint = now;
      }
      frame = window.requestAnimationFrame(tick);
    };

    const syncPlayback = () => {
      window.cancelAnimationFrame(frame);
      previous = 0;
      const running = visible && !document.hidden && !preference.matches;
      container.dataset.running = String(running);
      if (running) frame = window.requestAnimationFrame(tick);
      else paint();
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      paint();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    }, { threshold: 0 });
    observer.observe(container);
    preference.addEventListener('change', syncPlayback);
    document.addEventListener('visibilitychange', syncPlayback);
    resize();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      observer.disconnect();
      preference.removeEventListener('change', syncPlayback);
      document.removeEventListener('visibilitychange', syncPlayback);
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.backdrop} data-running="false" aria-hidden="true">
      <div className={styles.base} />
      <img
        src="/images/hero-data-reference-v2.png"
        alt=""
        width={1536}
        height={1024}
        draggable={false}
        className={styles.plate}
      />
      <canvas ref={canvasRef} className={styles.motion} />
      <div className={styles.atmosphere} />
      <div className={styles.vignette} />
    </div>
  );
};
