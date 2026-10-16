'use client';
import React, { useRef, useEffect, useState } from 'react';
import { Play } from 'lucide-react';

export interface VideoScrubProps {
  src: string;
  startPoster: string;
  endPoster?: string;
  alt?: string;
  className?: string;
}

export const VideoScrub: React.FC<VideoScrubProps> = ({
  src,
  startPoster,
  endPoster,
  alt = 'Product demonstration',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobileOrReduced, setIsMobileOrReduced] = useState(false);
  const [isPlayingMobile, setIsPlayingMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Detect mobile touch or prefers-reduced-motion
    const checkMode = () => {
      const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;
      const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsMobileOrReduced(isMobile || isReduced);
    };

    checkMode();
    window.addEventListener('resize', checkMode);
    return () => window.removeEventListener('resize', checkMode);
  }, []);

  useEffect(() => {
    if (isMobileOrReduced) return;

    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let targetTime = 0;
    let isVisible = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1.0] }
    );
    observer.observe(container);

    const updateScrub = () => {
      if (isVisible && video.duration) {
        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Calculate progress through viewport
        const start = windowHeight;
        const end = -rect.height;
        const current = rect.top;
        const progress = Math.max(0, Math.min(1, (start - current) / (start - end)));

        targetTime = progress * video.duration;

        // Apply threshold damping to avoid micro-stalls
        if (Math.abs(video.currentTime - targetTime) > 0.04) {
          video.currentTime += (targetTime - video.currentTime) * 0.15;
        }
      }

      rafId.current = requestAnimationFrame(updateScrub);
    };

    rafId.current = requestAnimationFrame(updateScrub);

    return () => {
      observer.disconnect();
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isMobileOrReduced]);

  const handleMobilePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlayingMobile(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlayingMobile(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-xl bg-slate-950 aspect-video ${className}`}
    >
      <video
        ref={videoRef}
        src={src}
        poster={startPoster}
        preload="metadata"
        muted
        playsInline
        onLoadedMetadata={() => setIsLoaded(true)}
        className="w-full h-full object-cover"
        aria-label={alt}
      />

      {/* Mobile / Reduced Motion tap-to-play overlay */}
      {isMobileOrReduced && (
        <button
          type="button"
          onClick={handleMobilePlay}
          aria-label={isPlayingMobile ? 'Pause video' : 'Play product video'}
          className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity ${
            isPlayingMobile ? 'opacity-0 hover:opacity-100' : 'opacity-100'
          }`}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg backdrop-blur-xs transition-transform hover:scale-105 active:scale-95">
            <Play size={20} className="ml-1 fill-current" />
          </div>
        </button>
      )}

      {/* Feathered vertical gradient mask for subtle blend */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-slate-950/20"
        aria-hidden="true"
      />
    </div>
  );
};
