'use client';
import React from 'react';
import { Video, Sparkles, Clock, Play } from 'lucide-react';
import { VideoConfig } from '@/src/content/videos';

interface VideoSlotProps {
  config?: VideoConfig;
  title?: string;
  label?: string;
  badgeText?: string;
  aspectRatio?: '16:9' | '16/9' | '4:3' | '4/3' | '1.3:1' | '1:1' | 'auto';
  className?: string;
  badgeType?: 'soon' | 'demo';
  mode?: 'soon' | 'demo' | 'coming-soon' | string;
}

export const VideoSlot: React.FC<VideoSlotProps> = ({
  config,
  title,
  label,
  badgeText,
  aspectRatio = '16:9',
  className = '',
  badgeType = 'soon',
  mode,
}) => {
  const displayTitle = title || config?.title || 'Production Video';
  const effectiveBadgeType = mode === 'demo' ? 'demo' : badgeType;
  const displayLabel = badgeText || label || config?.placeholderText || (effectiveBadgeType === 'soon' ? 'Customer video coming soon' : 'Illustrative demo');
  const ratioClass =
    aspectRatio === '16:9' || aspectRatio === '16/9'
      ? 'aspect-video'
      : aspectRatio === '4:3' || aspectRatio === '4/3'
      ? 'aspect-[4/3]'
      : aspectRatio === '1:1'
      ? 'aspect-square'
      : aspectRatio === '1.3:1'
      ? 'aspect-[1.3/1]'
      : 'min-h-[220px]';

  return (
    <div
      role="region"
      aria-label={config?.ariaLabel || `${displayTitle} placeholder`}
      className={`relative w-full ${ratioClass} rounded-2xl border border-slate-200/90 bg-gradient-to-b from-slate-50/90 via-slate-100/60 to-slate-100 p-5 sm:p-6 shadow-xs flex flex-col justify-between overflow-hidden select-none group ${className}`}
    >
      {/* Subtle Dot Grid Background */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px]" 
        aria-hidden="true" 
      />

      {/* Top Bar with Badge */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-300/80 bg-white/95 px-2.5 py-0.5 text-[10.5px] font-mono font-bold text-slate-700 shadow-2xs">
          {badgeType === 'soon' ? (
            <Clock size={11} className="text-amber-600" />
          ) : (
            <Sparkles size={11} className="text-violet-600" />
          )}
          <span>{displayLabel}</span>
        </span>

        <span className="font-mono text-[10px] text-slate-400">
          AutoDocs Production Slot
        </span>
      </div>

      {/* Center Camera & Title Area */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto py-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:text-violet-600 group-hover:border-violet-300">
          <Video size={22} />
        </div>
        <h4 className="mt-3 text-sm font-extrabold text-slate-900 tracking-tight max-w-sm">
          {displayTitle}
        </h4>
        <p className="mt-1 text-xs text-slate-500 max-w-xs font-medium">
          {config?.description || 'Authentic customer workflow recording currently in production.'}
        </p>
      </div>

      {/* Bottom Status Strip */}
      <div className="relative z-10 flex items-center justify-between border-t border-slate-200/80 pt-2 text-[10px] font-mono text-slate-400">
        <span>Slot ID: {config?.id || 'doc-video-slot'}</span>
        <span className="text-slate-500 font-semibold">1080p HD · No stock footage</span>
      </div>
    </div>
  );
};
