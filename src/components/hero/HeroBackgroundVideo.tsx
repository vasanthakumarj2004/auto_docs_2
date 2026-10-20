'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Pause, Play } from 'lucide-react';

// Feature Flag for 1-line rollback
export const HERO_BG_VIDEO_ENABLED = true;

interface HeroBackgroundVideoProps {
  className?: string;
}

export const HeroBackgroundVideo: React.FC<HeroBackgroundVideoProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // States
  const [isClient, setIsClient] = useState<boolean>(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState<boolean>(false);
  const [isUserPaused, setIsUserPaused] = useState<boolean>(false);
  const [isHeroIntersecting, setIsHeroIntersecting] = useState<boolean>(false);
  const [isHoveringPanel, setIsHoveringPanel] = useState<boolean>(false);
  const [isScrollbarPressed, setIsScrollbarPressed] = useState<boolean>(false);
  const [disabledReason, setDisabledReason] = useState<string | null>(null);

  // Check URL parameters and system preferences on mount
  useEffect(() => {
    setIsClient(true);

    if (!HERO_BG_VIDEO_ENABLED) {
      setDisabledReason('HERO_BG_VIDEO_ENABLED is false');
      return;
    }

    // Check debug URL search params
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('bg') === 'off') {
      setDisabledReason('Debug param ?bg=off');
      return;
    }
    if (searchParams.get('bg') === 'poster') {
      setDisabledReason('Debug param ?bg=poster');
      return;
    }

    // Check saved user pause state
    try {
      const savedPaused = localStorage.getItem('docsynecx_hero_bg_paused');
      if (savedPaused === 'true') {
        setIsUserPaused(true);
      }
    } catch {
      // localStorage may be restricted in private/sandbox modes
    }

    // Check reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisabledReason('prefers-reduced-motion: reduce');
      if (process.env.NODE_ENV !== 'production') {
        console.info('[HeroBackgroundVideo] Poster-only mode active: prefers-reduced-motion');
      }
      return;
    }

    // Check Save-Data preference
    const connection = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (connection?.saveData) {
      setDisabledReason('Save-Data header is on');
      if (process.env.NODE_ENV !== 'production') {
        console.info('[HeroBackgroundVideo] Poster-only mode active: Save-Data enabled');
      }
      return;
    }

    // Check slow connection (2g / 3g)
    if (connection?.effectiveType && ['slow-2g', '2g', '3g'].includes(connection.effectiveType)) {
      setDisabledReason(`Slow connection (${connection.effectiveType})`);
      if (process.env.NODE_ENV !== 'production') {
        console.info(`[HeroBackgroundVideo] Poster-only mode active: slow network (${connection.effectiveType})`);
      }
      return;
    }

    // Check screen size (< 1024px)
    if (window.innerWidth < 1024) {
      setDisabledReason('Viewport width < 1024px (mobile/tablet)');
      if (process.env.NODE_ENV !== 'production') {
        console.info('[HeroBackgroundVideo] Poster-only mode active: screen under 1024px');
      }
      return;
    }

    // Defer video loading until requestIdleCallback after LCP
    const loadVideo = () => {
      setShouldLoadVideo(true);
    };

    if ('requestIdleCallback' in window) {
      const handle = (window as Window & { requestIdleCallback: (cb: () => void, opts: { timeout: number }) => number }).requestIdleCallback(
        loadVideo,
        { timeout: 2500 }
      );
      return () => {
        if ('cancelIdleCallback' in window) {
          (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(handle);
        }
      };
    } else {
      const timer = setTimeout(loadVideo, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  // IntersectionObserver: Play only while hero is at least 40% visible
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroIntersecting(entry.isIntersecting);
      },
      { threshold: 0.4 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isClient]);

  // Tab visibility listener
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
      } else if (!document.hidden && isHeroIntersecting && !isUserPaused && !isHoveringPanel && !isScrollbarPressed) {
        videoRef.current?.play().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [isHeroIntersecting, isUserPaused, isHoveringPanel, isScrollbarPressed]);

  // Listen for hover / focus on Right Product Panel
  useEffect(() => {
    const panel = document.getElementById('hero-product-panel');
    if (!panel) return;

    const handleEnter = () => setIsHoveringPanel(true);
    const handleLeave = () => setIsHoveringPanel(false);

    panel.addEventListener('mouseenter', handleEnter);
    panel.addEventListener('mouseleave', handleLeave);
    panel.addEventListener('focusin', handleEnter);
    panel.addEventListener('focusout', handleLeave);

    return () => {
      panel.removeEventListener('mouseenter', handleEnter);
      panel.removeEventListener('mouseleave', handleLeave);
      panel.removeEventListener('focusin', handleEnter);
      panel.removeEventListener('focusout', handleLeave);
    };
  }, [isClient]);

  // Listen for scrollbar pressing (mousedown on scrollbar)
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (e.clientX >= document.documentElement.clientWidth) {
        setIsScrollbarPressed(true);
      }
    };
    const handleMouseUp = () => {
      setIsScrollbarPressed(false);
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Master playback controller
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoadVideo) return;

    const canPlay =
      isHeroIntersecting &&
      !isUserPaused &&
      !isHoveringPanel &&
      !isScrollbarPressed &&
      !document.hidden;

    if (canPlay) {
      if (video.paused) {
        video.play().catch(() => {
          // Autoplay policy prevented playback, keep poster showing
        });
      }
    } else {
      if (!video.paused) {
        video.pause();
      }
    }
  }, [shouldLoadVideo, isHeroIntersecting, isUserPaused, isHoveringPanel, isScrollbarPressed]);

  // Toggle Pause (WCAG 2.2.2)
  const toggleUserPause = useCallback(() => {
    setIsUserPaused((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('docsynecx_hero_bg_paused', String(next));
      } catch {
        // Ignore storage exceptions
      }
      return next;
    });
  }, []);

  if (!HERO_BG_VIDEO_ENABLED) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`absolute inset-x-0 top-0 bottom-0 pointer-events-none z-[5] overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Sticky Viewport-Height Stage */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        
        {/* Poster Image (Always rendered first for CLS = 0 and fallback) */}
        <img
          src="/videos/hero-bg-poster.webp"
          alt=""
          width={1920}
          height={1080}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out"
          style={{
            mixBlendMode: 'multiply',
            opacity: 'var(--hero-bg-opacity, 0.85)',
            maskImage:
              'radial-gradient(ellipse 90% 80% at 50% 50%, black 45%, transparent 95%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 90% 80% at 50% 50%, black 45%, transparent 95%)',
          }}
        />

        {/* Video Element (Loaded on demand, blends via multiply on pure white) */}
        {shouldLoadVideo && !disabledReason && (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            poster="/videos/hero-bg-poster.webp"
            width={1920}
            height={1080}
            aria-hidden="true"
            tabIndex={-1}
            onError={() => {
              setDisabledReason('Video decode error');
            }}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in"
            style={{
              mixBlendMode: 'multiply',
              opacity: 'var(--hero-bg-opacity, 0.85)',
              maskImage:
                'radial-gradient(ellipse 90% 80% at 50% 50%, black 45%, transparent 95%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 90% 80% at 50% 50%, black 45%, transparent 95%)',
            }}
          >
            <source src="/videos/hero-bg.webm" type="video/webm" />
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
        )}

        {/* Quiet WCAG 2.2.2 Pause/Play Button (Pointer-events enabled on button only) */}
        {shouldLoadVideo && !disabledReason && (
          <div className="absolute bottom-4 left-4 pointer-events-auto z-20">
            <button
              type="button"
              onClick={toggleUserPause}
              aria-label={isUserPaused ? 'Play ambient background video' : 'Pause ambient background video'}
              aria-pressed={isUserPaused}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200/90 bg-white/80 text-slate-500 shadow-xs backdrop-blur-xs transition-all duration-200 hover:bg-white hover:text-slate-900 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-blue-500 opacity-0 hover:opacity-100 focus:opacity-100 cursor-pointer"
              title={isUserPaused ? 'Play ambient animation' : 'Pause ambient animation'}
            >
              {isUserPaused ? (
                <Play size={15} className="ml-0.5 fill-current text-slate-700" />
              ) : (
                <Pause size={15} className="text-slate-700" />
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
