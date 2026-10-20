'use client';
import React, { useState } from 'react';
import { Play } from 'lucide-react';

export interface VideoFacadeProps {
  provider?: 'youtube' | 'vimeo';
  videoId: string;
  title: string;
  posterUrl?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1' | string;
  className?: string;
  onPlay?: () => void;
}

export const VideoFacade: React.FC<VideoFacadeProps> = ({
  provider = 'youtube',
  videoId,
  title,
  posterUrl,
  aspectRatio = '16/9',
  className = '',
  onPlay,
}) => {
  const [isActivated, setIsActivated] = useState<boolean>(false);

  // Derive poster URL if none provided
  const resolvedPoster =
    posterUrl ||
    (provider === 'youtube'
      ? `https://i.ytimg.com/vi_webp/${videoId}/hqdefault.webp`
      : undefined);

  // Derive embed URL with privacy flags
  const embedUrl =
    provider === 'youtube'
      ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
      : `https://player.vimeo.com/video/${videoId}?autoplay=1&dnt=1`;

  const handleActivate = () => {
    setIsActivated(true);
    onPlay?.();
  };

  const getAspectClass = () => {
    switch (aspectRatio) {
      case '16/9':
        return 'aspect-video';
      case '4/3':
        return 'aspect-[4/3]';
      case '1/1':
        return 'aspect-square';
      default:
        return 'aspect-video';
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-xl ${getAspectClass()} ${className}`}
    >
      {isActivated ? (
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={handleActivate}
          aria-label={`Play video: ${title}`}
          className="group relative flex h-full w-full items-center justify-center cursor-pointer overflow-hidden text-left outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          {/* Poster or dark fallback backdrop */}
          {resolvedPoster ? (
            <img
              src={resolvedPoster}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-950" />
          )}

          {/* Vignette / dark overlay */}
          <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors duration-300" />

          {/* Centered Play Button Facade */}
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-blue-600/90 text-white shadow-2xl backdrop-blur-md ring-1 ring-white/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-active:scale-95">
              <Play size={28} className="translate-x-0.5 fill-white text-white sm:h-8 sm:w-8" />
            </div>

            <div className="rounded-full bg-slate-900/80 px-3.5 py-1 text-center backdrop-blur-md border border-slate-700/60 shadow-md">
              <p className="font-mono text-[11px] font-bold text-slate-200">
                {title}
              </p>
            </div>
          </div>

          {/* Privacy badge */}
          <div className="absolute bottom-3 right-3 z-10 hidden sm:flex items-center gap-1 rounded bg-black/60 px-2 py-0.5 font-mono text-[10px] text-slate-400 backdrop-blur-sm">
            <span>Privacy mode</span>
          </div>
        </button>
      )}
    </div>
  );
};
