'use client';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  Subtitles, 
  RotateCcw,
  Gauge
} from 'lucide-react';
import { VideoConfig, VideoChapter } from '@/src/content/videos';
import { useVideoSystem } from './VideoContext';
import { VideoTranscript } from './VideoTranscript';

export interface VideoPlayerProps {
  config: VideoConfig;
  className?: string;
  autoPlayMuted?: boolean;
  showTranscript?: boolean;
  onFallbackToStoryboard?: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  config,
  className = '',
  autoPlayMuted = false,
  showTranscript = false,
  onFallbackToStoryboard,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const { activeVideoId, registerPlay, registerPause, prefersReducedMotion } = useVideoSystem();

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(config.durationSec || 120);
  const [isMuted, setIsMuted] = useState<boolean>(autoPlayMuted);
  const [volume, setVolume] = useState<number>(1);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [captionsEnabled, setCaptionsEnabled] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [ariaAnnouncement, setAriaAnnouncement] = useState<string>('');

  const speeds = [0.75, 1, 1.25];

  // Pause if another video starts
  useEffect(() => {
    if (activeVideoId && activeVideoId !== config.id && isPlaying) {
      if (videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [activeVideoId, config.id, isPlaying]);

  const announce = (msg: string) => {
    setAriaAnnouncement(msg);
  };

  // Play / Pause
  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => {
        setIsPlaying(true);
        setHasStarted(true);
        registerPlay(config.id);
        announce(`Playing ${config.title}`);
      }).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
      registerPause(config.id);
      announce('Paused');
    }
  }, [config.id, config.title, registerPlay, registerPause]);

  // Seek
  const seekRelative = useCallback((seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    const target = Math.max(0, Math.min(duration, video.currentTime + seconds));
    video.currentTime = target;
    setCurrentTime(target);
    announce(`Seeked to ${formatTime(target)}`);
  }, [duration]);

  // Jump to Chapter
  const jumpToChapter = (chapter: VideoChapter) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = chapter.timeSec;
    setCurrentTime(chapter.timeSec);
    if (video.paused) {
      togglePlay();
    }
    announce(`Jumped to chapter ${chapter.label}: ${chapter.title}`);
  };

  // Toggle Mute
  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    setIsMuted(next);
    announce(next ? 'Audio muted' : 'Audio unmuted');
  }, []);

  // Toggle Captions (WebVTT)
  const toggleCaptions = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const tracks = video.textTracks;
    if (tracks && tracks.length > 0) {
      const track = tracks[0];
      const nextMode = track.mode === 'showing' ? 'hidden' : 'showing';
      track.mode = nextMode;
      setCaptionsEnabled(nextMode === 'showing');
      announce(nextMode === 'showing' ? 'Subtitles on' : 'Subtitles off');
    } else {
      setCaptionsEnabled((prev) => !prev);
      announce('Subtitles toggled');
    }
  }, []);

  // Cycle Speed
  const cycleSpeed = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    video.playbackRate = nextSpeed;
    setPlaybackSpeed(nextSpeed);
    announce(`Playback speed ${nextSpeed}x`);
  };

  // Fullscreen
  const toggleFullscreen = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
      announce('Entered fullscreen');
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
      announce('Exited fullscreen');
    }
  }, []);

  // Keyboard Navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Only capture if focused inside player
    switch (e.key) {
      case ' ':
      case 'k':
      case 'K':
        e.preventDefault();
        togglePlay();
        break;
      case 'j':
      case 'J':
        e.preventDefault();
        seekRelative(-10);
        break;
      case 'l':
      case 'L':
        e.preventDefault();
        seekRelative(10);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        seekRelative(-5);
        break;
      case 'ArrowRight':
        e.preventDefault();
        seekRelative(5);
        break;
      case 'm':
      case 'M':
        e.preventDefault();
        toggleMute();
        break;
      case 'c':
      case 'C':
        e.preventDefault();
        toggleCaptions();
        break;
      case 'f':
      case 'F':
        e.preventDefault();
        toggleFullscreen();
        break;
      case 'Escape':
        if (isFullscreen) {
          toggleFullscreen();
        }
        break;
    }
  }, [togglePlay, seekRelative, toggleMute, toggleCaptions, toggleFullscreen, isFullscreen]);

  // Track Time & Duration
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && videoRef.current.duration) {
      setDuration(videoRef.current.duration);
    }
  };

  // Format mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Handle Scrub Click
  const handleScrubClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !videoRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const target = ratio * duration;
    videoRef.current.currentTime = target;
    setCurrentTime(target);
  };

  // JSON-LD Schema for crawlers
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: config.title,
    description: config.description,
    thumbnailUrl: [config.poster],
    uploadDate: '2024-10-15T08:00:00+05:30',
    duration: `PT${Math.floor(duration)}S`,
    contentUrl: config.sources?.mp4 || config.sources?.webm,
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Schema.org VideoObject for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Screen Reader ARIA Live Region for State Announcements */}
      <div className="sr-only" role="status" aria-live="polite">
        {ariaAnnouncement}
      </div>

      {/* Outer Player Frame */}
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="group/player relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 select-none"
        aria-label={config.ariaLabel || `${config.title} video player`}
      >
        {/* Fixed Dimension Poster (Shown until user presses play or buffers) */}
        <img
          src={config.poster}
          alt={config.title}
          width={config.posterWidth || 1280}
          height={config.posterHeight || 720}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            hasStarted ? 'opacity-0 pointer-events-none' : 'opacity-100 z-10'
          }`}
          loading="lazy"
        />

        {/* Video Element */}
        <video
          ref={videoRef}
          playsInline
          muted={isMuted}
          preload="none"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onError={() => setHasError(true)}
          onEnded={() => {
            setIsPlaying(false);
            registerPause(config.id);
            announce('Video finished playing');
          }}
          className="h-full w-full object-cover"
        >
          {config.sources?.webm && <source src={config.sources.webm} type="video/webm" onError={() => setHasError(true)} />}
          {config.sources?.mp4 && <source src={config.sources.mp4} type="video/mp4" onError={() => setHasError(true)} />}
          {config.captionsVtt && (
            <track
              kind="subtitles"
              src={config.captionsVtt}
              srcLang="en"
              label="English"
              default={captionsEnabled}
            />
          )}
        </video>

        {/* Missing or Pending Footage Fallback Overlay */}
        {hasError && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-950/90 p-6 text-center backdrop-blur-xs">
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-violet-400 mb-1">
              Illustrative Demo Mode
            </span>
            <p className="text-sm font-bold text-white mb-2">
              Production recording pending release
            </p>
            <p className="text-xs text-slate-400 max-w-sm mb-4">
              Explore the fully interactive 4-step walkthrough simulator.
            </p>
            {onFallbackToStoryboard && (
              <button
                type="button"
                onClick={onFallbackToStoryboard}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#8B32F7] px-3.5 py-2 font-mono text-xs font-bold text-white hover:bg-violet-600 transition-colors cursor-pointer shadow-md"
              >
                <span>Launch Interactive Storyboard</span>
                <span>→</span>
              </button>
            )}
          </div>
        )}

        {/* Initial Large Play Button Overlay */}
        {!hasStarted && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/40 backdrop-blur-2xs transition-opacity">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={`Play ${config.title}`}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-[#8B32F7] text-white shadow-xl transition-transform duration-300 hover:scale-110 hover:bg-violet-600 cursor-pointer focus-visible:ring-4 focus-visible:ring-violet-400"
            >
              <Play size={24} className="ml-1 fill-white" />
            </button>
            <span className="mt-3 font-mono text-xs font-bold text-slate-200 uppercase tracking-wider drop-shadow-md">
              {config.title}
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              {formatTime(duration)} · Click or press Space
            </span>
          </div>
        )}

        {/* Chapter Markers Strip on Top */}
        {config.chapters && config.chapters.length > 0 && (
          <div className="absolute top-3 inset-x-4 z-30 flex items-center justify-between pointer-events-none opacity-0 group-hover/player:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
            <div className="flex items-center gap-1.5 font-mono text-[9px] pointer-events-auto">
              {config.chapters.map((ch) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => jumpToChapter(ch)}
                  className={`rounded px-2 py-0.5 border transition-all cursor-pointer ${
                    currentTime >= ch.timeSec && currentTime < (ch.timeSec + 30)
                      ? 'bg-[#8B32F7]/90 border-violet-400 text-white font-bold'
                      : 'bg-slate-900/80 border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {ch.label}
                </button>
              ))}
            </div>

            <span className="rounded bg-slate-900/80 border border-slate-700/80 px-2 py-0.5 font-mono text-[9px] text-slate-400">
              1080p HD
            </span>
          </div>
        )}

        {/* Bottom Custom Control Bar */}
        <div 
          className={`absolute bottom-0 inset-x-0 z-30 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent p-3 sm:p-4 space-y-2 transition-opacity duration-200 ${
            hasStarted ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Interactive Scrub Bar with Chapter Ticks */}
          <div
            ref={progressBarRef}
            role="slider"
            aria-label="Video timeline scrubber"
            aria-valuemin={0}
            aria-valuemax={Math.floor(duration)}
            aria-valuenow={Math.floor(currentTime)}
            onClick={handleScrubClick}
            className="group/scrub relative h-2.5 w-full rounded-full bg-slate-800/80 cursor-pointer flex items-center"
          >
            {/* Progress Fill */}
            <div
              className="h-1.5 rounded-full bg-violet-500 group-hover/scrub:h-2 transition-all duration-100"
              style={{ width: `${progressPercent}%` }}
            />

            {/* Chapter Marker Ticks on Scrub Bar */}
            {config.chapters && config.chapters.map((ch) => {
              const tickLeft = (ch.timeSec / duration) * 100;
              return (
                <div
                  key={ch.id}
                  title={`${ch.label} · ${ch.title}`}
                  className="absolute top-0 bottom-0 w-0.5 bg-slate-400/80 hover:bg-white z-10"
                  style={{ left: `${tickLeft}%` }}
                />
              );
            })}
          </div>

          {/* Controls Bottom Row */}
          <div className="flex items-center justify-between text-white font-mono text-[11px]">
            {/* Left Controls: Play, Time */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="flex h-7 w-7 items-center justify-center rounded hover:bg-white/10 transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause size={14} className="fill-white" /> : <Play size={14} className="ml-0.5 fill-white" />}
              </button>

              <span className="tabular-nums text-slate-300">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Right Controls: Captions, Mute, Speed, Fullscreen */}
            <div className="flex items-center gap-2">
              {/* Captions Toggle */}
              <button
                type="button"
                onClick={toggleCaptions}
                title="Subtitles / Captions (C)"
                aria-pressed={captionsEnabled}
                className={`p-1.5 rounded hover:bg-white/10 transition-colors cursor-pointer ${
                  captionsEnabled ? 'text-violet-400 font-bold' : 'text-slate-400'
                }`}
              >
                <Subtitles size={14} />
              </button>

              {/* Mute Toggle */}
              <button
                type="button"
                onClick={toggleMute}
                title="Mute / Unmute (M)"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                className="p-1.5 rounded hover:bg-white/10 transition-colors text-slate-300 hover:text-white cursor-pointer"
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>

              {/* Speed Selector */}
              <button
                type="button"
                onClick={cycleSpeed}
                title="Playback Speed"
                className="px-1.5 py-0.5 rounded border border-slate-700 bg-slate-900/80 text-[10px] text-slate-300 hover:text-white hover:border-slate-500 transition-all cursor-pointer"
              >
                {playbackSpeed}x
              </button>

              {/* Fullscreen */}
              <button
                type="button"
                onClick={toggleFullscreen}
                title="Fullscreen (F)"
                aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                className="p-1.5 rounded hover:bg-white/10 transition-colors text-slate-300 hover:text-white cursor-pointer"
              >
                {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SEO & Accessibility Transcript Accordion */}
      {showTranscript && config.transcript && (
        <VideoTranscript transcript={config.transcript} title={config.title} />
      )}
    </div>
  );
};
