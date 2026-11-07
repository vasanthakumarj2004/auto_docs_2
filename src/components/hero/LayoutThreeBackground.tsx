'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import styles from '../LandingLayoutThree.module.css';

type Background = 'streaks' | 'clip4' | 'clip5';
const storageKey = 'docsynecx-layout-three-background';
const options = [
  { id: 'streaks', label: 'Light streaks' },
  { id: 'clip4', label: 'Clip 4' },
  { id: 'clip5', label: 'Clip 5' },
] as const;
const parseBackground = (value: string | null): Background =>
  value === 'clip4' || value === 'clip5' ? value : 'streaks';

export function LayoutThreeBackground() {
  const surface = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [background, setBackground] = useState<Background>('streaks');
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState(false);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failedBackground, setFailedBackground] = useState<Background | null>(null);
  const isVideo = background !== 'streaks';
  const failed = failedBackground === background;
  const moving = isVideo ? playing : !paused;
  const poster = `/videos/layout-three-${background}-poster.webp`;

  useEffect(() => {
    try { setBackground(parseBackground(localStorage.getItem(storageKey))); } catch {}
    const sync = (event: StorageEvent) => {
      if (event.key === storageKey || event.key === null) setBackground(parseBackground(event.newValue));
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & {
      connection?: EventTarget & { saveData?: boolean; effectiveType?: string };
    }).connection;
    const update = () => setMotionAllowed(!motion.matches && !connection?.saveData &&
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
    let visible = false;
    const update = () => setActive(visible && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    }, { threshold: 0.05 });
    if (surface.current) observer.observe(surface.current);
    document.addEventListener('visibilitychange', update);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  useEffect(() => {
    const player = video.current;
    if (!player) return;
    if (motionAllowed && active && !paused && !failed) {
      player.play().catch(() => { /* The poster and play button remain available if autoplay is blocked. */ });
    } else {
      player.pause();
    }
    return () => player.pause();
  }, [background, motionAllowed, active, paused, failed]);

  const chooseBackground = (value: Background) => {
    if (value !== background) setPlaying(false);
    setBackground(value);
    setFailedBackground(null);
    try { localStorage.setItem(storageKey, value); } catch {}
  };

  const toggleMotion = () => {
    if (isVideo) {
      setPaused(playing);
      if (playing) video.current?.pause();
      else video.current?.play().catch(() => {});
    } else {
      setPaused(value => !value);
    }
  };

  return <>
    <div ref={surface} id="layout-three-background" className={styles.ambientBackdrop}
      data-background={background} data-motion={paused || !active || !motionAllowed || (isVideo && (!playing || failed)) ? 'paused' : 'running'} aria-hidden="true">
      {isVideo ? <>
        <img key={poster} src={poster} alt="" width={768} height={432} className={styles.backgroundMedia} />
        <video key={background} ref={video} className={styles.backgroundMedia} data-failed={failed}
          src={motionAllowed && !failed ? `/videos/layout-three-${background}.mp4` : undefined}
          poster={poster} width={768} height={432} muted loop playsInline preload="none"
          tabIndex={-1} disablePictureInPicture onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
          onError={() => { setFailedBackground(background); setPlaying(false); }} />
      </> : <>
        <div className={styles.lightCeiling}><span /><span /><span /><span /></div>
        <div className={styles.tealReflection} />
        <div className={styles.reflectionFloor} />
      </>}
      {background === 'clip4' && <div className={styles.clipFourLighting}>
        <div className={styles.clipFourGlow} />
        <div className={styles.clipFourBeams}><span /><span /><span /></div>
        <div className={styles.clipFourReflection} />
      </div>}
      <div className={styles.backdropShade} />
    </div>
    <div className={styles.backgroundControls}>
      <div className={styles.backgroundPicker}>
        <span id="layout-three-background-label" className={styles.backgroundLabel}>Background</span>
        <div className={styles.backgroundChoices} role="group" aria-labelledby="layout-three-background-label">
          {options.map(option => <button key={option.id} type="button" aria-pressed={background === option.id}
            aria-controls="layout-three-background" onClick={() => chooseBackground(option.id)}>{option.label}</button>)}
        </div>
      </div>
      {motionAllowed && !failed && <button type="button" className={styles.motionToggle} onClick={toggleMotion}
        aria-label={moving ? 'Pause background motion' : 'Play background motion'}>
        {moving ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
        <span>{moving ? 'Pause motion' : 'Play motion'}</span>
      </button>}
    </div>
  </>;
}
