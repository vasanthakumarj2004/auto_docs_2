'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import styles from '../LandingPage.module.css';

const videoSource = '/videos/gemini-layout-two.mp4';
const posterSource = '/videos/gemini-layout-two-poster.webp';

export function LayoutTwoBackgroundVideo() {
  const container = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & {
      connection?: EventTarget & { saveData?: boolean; effectiveType?: string };
    }).connection;
    const update = () => setEnabled(!motion.matches && !connection?.saveData &&
      !['slow-2g', '2g'].includes(connection?.effectiveType ?? ''));
    update();
    motion.addEventListener('change', update);
    connection?.addEventListener('change', update);
    return () => {
      motion.removeEventListener('change', update);
      connection?.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    const player = video.current;
    const surface = container.current;
    if (!player || !surface) return;
    let visible = false;
    let disposed = false;
    const sync = () => {
      if (enabled && !paused && !failed && visible && !document.hidden) {
        player.play().then(() => {
          if (disposed) player.pause();
        }).catch(() => { /* Keep the poster and manual play control if autoplay is blocked. */ });
      } else {
        player.pause();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { threshold: 0.05 });
    observer.observe(surface);
    document.addEventListener('visibilitychange', sync);
    return () => {
      disposed = true;
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
      player.pause();
    };
  }, [enabled, paused, failed]);

  const togglePlayback = () => {
    if (playing) {
      setPaused(true);
      video.current?.pause();
    } else {
      setPaused(false);
      video.current?.play().catch(() => {});
    }
  };

  return <>
    <div ref={container} className={styles.heroVideoBackdrop} aria-hidden="true">
      <img src={posterSource} alt="" width={1280} height={720} className={styles.heroVideoMedia} loading="eager" />
      <video ref={video} src={enabled && !failed ? videoSource : undefined}
        className={styles.heroVideoMedia} data-failed={failed} muted loop playsInline
        preload="none" poster={posterSource} width={1280} height={720} tabIndex={-1}
        disablePictureInPicture onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
        onError={() => { setFailed(true); setPlaying(false); }} />
      <div className={styles.heroVideoScrim} />
    </div>
    {enabled && !failed && <button type="button" className={styles.heroVideoToggle}
      onClick={togglePlayback} aria-label={playing ? 'Pause background video' : 'Play background video'}>
      {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
      <span>{playing ? 'Pause motion' : 'Play motion'}</span>
    </button>}
  </>;
}
