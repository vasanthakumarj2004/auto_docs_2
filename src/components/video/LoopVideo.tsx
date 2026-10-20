'use client';
import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { VideoConfig } from '@/src/content/videos';
import { useVideoSystem } from './VideoContext';

interface LoopVideoProps {
  config?: VideoConfig;
  srcMp4?: string;
  srcWebm?: string;
  poster?: string;
  posterWidth?: number;
  posterHeight?: number;
  ariaLabel?: string;
  isDecorative?: boolean;
  aspectRatio?: '16:9' | '16/9' | '4:3' | '4/3' | '1.3:1' | '1:1' | 'auto';
  className?: string;
}

export const LoopVideo: React.FC<LoopVideoProps> = ({
  config,
  srcMp4,
  srcWebm,
  poster,
  posterWidth = 1280,
  posterHeight = 720,
  ariaLabel,
  isDecorative = false,
  aspectRatio = '16:9',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoId = config?.id || `loop-${poster || 'video'}`;
  const effectiveMp4 = srcMp4 || config?.sources?.mp4;
  const effectiveWebm = srcWebm || config?.sources?.webm;
  const effectivePoster = poster || config?.poster || '';
  const effectiveAriaLabel = ariaLabel || config?.ariaLabel || config?.title || 'Product demonstration video loop';

  const { activeVideoId, registerPlay, registerPause, saveDataMode, prefersReducedMotion } = useVideoSystem();

  const [isNearViewport, setIsNearViewport] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [manualPlayAllowed, setManualPlayAllowed] = useState<boolean>(false);

  // If another video becomes active in the global context, pause this one
  useEffect(() => {
    if (activeVideoId && activeVideoId !== videoId && isPlaying) {
      if (videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [activeVideoId, videoId, isPlaying]);

  // Viewport detection (Near viewport to load source; >= 50% visible to play)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // 1. Observer to pre-attach sources when 200px near viewport
    const loadObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsNearViewport(true);
          loadObserver.disconnect();
        }
      },
      { rootMargin: '200px 0px' }
    );
    loadObserver.observe(el);

    // 2. Observer to play ONLY when at least 50% visible
    const playObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const isFiftyPercentVisible = entry.isIntersecting && entry.intersectionRatio >= 0.5;

        // If user is on reduced motion or save-data mode, do not auto-play unless user clicked play
        if (saveDataMode || prefersReducedMotion) {
          return;
        }

        if (isFiftyPercentVisible) {
          if (videoRef.current && !document.hidden) {
            videoRef.current.play().then(() => {
              setIsPlaying(true);
              registerPlay(videoId);
            }).catch(() => {
              // Autoplay policy prevented playback, keep poster visible
            });
          }
        } else {
          if (videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
            setIsPlaying(false);
            registerPause(videoId);
          }
        }
      },
      { threshold: 0.5 }
    );
    playObserver.observe(el);

    // 3. Tab visibility listener (pause when user switches tabs)
    const handleVisibilityChange = () => {
      if (document.hidden && videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
        setIsPlaying(false);
        registerPause(videoId);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      loadObserver.disconnect();
      playObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [saveDataMode, prefersReducedMotion, videoId, registerPlay, registerPause]);

  const handleManualPlay = () => {
    setManualPlayAllowed(true);
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        registerPlay(videoId);
      }).catch(() => {});
    }
  };

  const ratioClass =
    aspectRatio === '16:9' || aspectRatio === '16/9'
      ? 'aspect-video'
      : aspectRatio === '4:3' || aspectRatio === '4/3'
      ? 'aspect-[4/3]'
      : aspectRatio === '1:1'
      ? 'aspect-square'
      : aspectRatio === '1.3:1'
      ? 'aspect-[1.3/1]'
      : 'h-full w-full';

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-xl bg-slate-950 ${ratioClass} ${className}`}
      role={isDecorative ? 'presentation' : 'region'}
      aria-hidden={isDecorative}
      aria-label={isDecorative ? undefined : effectiveAriaLabel}
    >
      {/* Fixed Dimension Poster Image to Guarantee CLS = 0 */}
      <img
        src={effectivePoster}
        alt={isDecorative ? '' : effectiveAriaLabel}
        width={posterWidth}
        height={posterHeight}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100 z-10'
        }`}
        loading="lazy"
      />

      {/* Video Element (Only attaches sources once near viewport, preload='none') */}
      {isNearViewport && (effectiveWebm || effectiveMp4) && (
        <video
          ref={videoRef}
          playsInline
          muted
          loop
          preload="none"
          onLoadedData={() => setIsLoaded(true)}
          className={`h-full w-full object-cover transition-opacity duration-500 ${
            isPlaying ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        >
          {effectiveWebm && <source src={effectiveWebm} type="video/webm" />}
          {effectiveMp4 && <source src={effectiveMp4} type="video/mp4" />}
        </video>
      )}

      {/* Save-Data / Reduced-Motion Manual Play Overlay */}
      {(saveDataMode || prefersReducedMotion) && !isPlaying && !manualPlayAllowed && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-950/40 backdrop-blur-2xs">
          <button
            type="button"
            onClick={handleManualPlay}
            aria-label={`Play ${effectiveAriaLabel}`}
            className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-mono font-bold text-slate-900 shadow-md hover:bg-white hover:scale-105 transition-all cursor-pointer"
          >
            <Play size={13} className="fill-slate-900" />
            <span>Play Video</span>
          </button>
        </div>
      )}
    </div>
  );
};
