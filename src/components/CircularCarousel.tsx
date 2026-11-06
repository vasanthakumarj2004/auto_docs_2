'use client';

import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';

export interface CustomerStoryItem {
  tag: string;
  name: string;
  metric: string;
  summary: string;
  copy: string;
  href?: string;
}

export type CircularCarouselPreset = 'cylinder' | 'orbit' | 'wheel' | 'panorama';
export type CircularCarouselIntro = 'assemble' | 'rise' | 'spin' | 'none';
export type CircularCarouselAutoplay = 'drift' | 'step' | 'off';

export interface CircularCarouselProps {
  stories?: CustomerStoryItem[];
  preset?: CircularCarouselPreset;
  intro?: CircularCarouselIntro;
  cardWidth?: number;
  aspectRatio?: number;
  gap?: number;
  curve?: number;
  tilt?: number;
  perspective?: number;
  autoplay?: CircularCarouselAutoplay;
  speed?: number;
  interval?: number;
  direction?: 'left' | 'right';
  draggable?: boolean;
  momentum?: number;
  snap?: boolean;
  pauseOnHover?: boolean;
  focusOnClick?: boolean;
  parallax?: number;
  stretch?: number;
  depthFade?: number;
  fadeColor?: string;
  innerShade?: number;
  cornerRadius?: number;
  captions?: boolean;
  onChange?: (index: number) => void;
  onItemClick?: (item: CustomerStoryItem, index: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

type Vec3 = [number, number, number];

interface Layout {
  axis: 'x' | 'y';
  tilt: number;
  perspective: number;
  curve: number;
  spread: number;
  inward: boolean;
  billboard: boolean;
  backfaces: boolean;
  window: number;
}

interface Sample {
  time: number;
  angle: number;
}

interface Press {
  id: number;
  x: number;
  y: number;
  angle: number;
  moved: boolean;
  origin: number;
  samples: Sample[];
}

interface CarouselState {
  angle: number;
  velocity: number;
  target: number | null;
  dir: number;
  press: Press | null;
  drag: boolean;
  hover: boolean;
  pointer: { inside: boolean; x: number; y: number };
  yaw: number;
  pitch: number;
  intro: { type: CircularCarouselIntro; start: number } | null;
  introDone: boolean;
  holdUntil: number;
  stepAt: number;
  suppressClick: boolean;
  wheelTimer: ReturnType<typeof setTimeout> | undefined;
  fit: number;
  shift: number;
  drop: number;
  last: number;
}

interface Settings {
  count: number;
  step: number;
  radius: number;
  layout: Layout;
  axis: 'x' | 'y';
  tilt: number;
  perspective: number;
  cardW: number;
  cardH: number;
  intro: CircularCarouselIntro;
  autoplay: CircularCarouselAutoplay;
  speed: number;
  interval: number;
  draggable: boolean;
  momentum: number;
  snap: boolean;
  pauseOnHover: boolean;
  parallax: number;
  stretch: number;
  depthFade: number;
  captions: boolean;
  reduced: boolean;
}

interface IntroPose {
  radius: number;
  lift: number;
}

const DEFAULT_STORIES: CustomerStoryItem[] = [
  {
    tag: 'Logistics',
    name: 'FreightForwarders',
    metric: '2 hrs → 2 min',
    summary: 'email to CargoWise',
    copy: 'A specific email-to-CargoWise document workflow reduced from around two hours to approximately two minutes.',
    href: '/customers/ft-logistics/',
  },
  {
    tag: 'Automotive & EV',
    name: 'Automotive Industries',
    metric: 'Days → hours',
    summary: 'document workflow',
    copy: 'Manual document workload reduced from days to hours through an AI-assisted workflow.',
    href: '/customers/rajadurai/',
  },
  {
    tag: 'Business operations',
    name: 'Manufacturing',
    metric: 'In daily use',
    summary: 'assets & purchase bills',
    copy: 'Regular operational use for asset and purchase bill workflows with zero manual re-entry.',
  },
  {
    tag: 'Retail & Distribution',
    name: 'OmniRetail Networks',
    metric: '94% automated',
    summary: 'multi-vendor invoicing',
    copy: 'High-volume invoice auditing and trade documents posted directly without error delays.',
  },
  {
    tag: 'Textile & Garments',
    name: 'Global Fabrics Ltd',
    metric: '3x faster sync',
    summary: 'supplier & export manifests',
    copy: 'Complex supplier bills and export manifests reconciled in minutes instead of days.',
  },
];

const PRESETS: Record<CircularCarouselPreset, Layout> = {
  cylinder: {
    axis: 'y',
    tilt: -5,
    perspective: 2200,
    curve: 0,
    spread: 1.15,
    inward: false,
    billboard: false,
    backfaces: true,
    window: 0,
  },
  orbit: {
    axis: 'y',
    tilt: -10,
    perspective: 1600,
    curve: 0,
    spread: 1.35,
    inward: false,
    billboard: true,
    backfaces: false,
    window: 0,
  },
  wheel: {
    axis: 'x',
    tilt: 0,
    perspective: 1800,
    curve: 0,
    spread: 1,
    inward: false,
    billboard: false,
    backfaces: true,
    window: 1.7,
  },
  panorama: {
    axis: 'y',
    tilt: 0,
    perspective: 0,
    curve: 0,
    spread: 1,
    inward: true,
    billboard: false,
    backfaces: false,
    window: 0,
  },
};

const INTRO_LENGTH: Record<CircularCarouselIntro, number> = { assemble: 1500, rise: 1400, spin: 1800, none: 0 };
const DRAG_THRESHOLD = 5;
const SPRING = 118;
const SETTLE_SPEED = 9;
const TO_RAD = Math.PI / 180;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const wrap = (degrees: number) => ((((degrees + 180) % 360) + 360) % 360) - 180;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);
const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

const rotateX = (p: Vec3, degrees: number): Vec3 => {
  const r = degrees * TO_RAD;
  const c = Math.cos(r);
  const s = Math.sin(r);
  return [p[0], p[1] * c - p[2] * s, p[1] * s + p[2] * c];
};

const rotateY = (p: Vec3, degrees: number): Vec3 => {
  const r = degrees * TO_RAD;
  const c = Math.cos(r);
  const s = Math.sin(r);
  return [p[0] * c + p[2] * s, p[1], -p[0] * s + p[2] * c];
};

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!query) return undefined;
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener?.('change', update);
    return () => query.removeEventListener?.('change', update);
  }, []);
  return reduced;
};

export default function CircularCarousel({
  stories = DEFAULT_STORIES,
  preset = 'cylinder',
  intro = 'rise',
  cardWidth = 380,
  aspectRatio = 1.2,
  gap = 35,
  curve,
  tilt,
  perspective,
  autoplay = 'drift',
  speed = 10,
  interval = 3.5,
  direction = 'left',
  draggable = true,
  momentum = 0.65,
  snap = true,
  pauseOnHover = true,
  focusOnClick = true,
  parallax = 0.25,
  stretch = 0.35,
  depthFade = 0.55,
  fadeColor = '#f6f5f9',
  cornerRadius = 0,
  onChange,
  onItemClick,
  className = '',
  style,
}: CircularCarouselProps) {
  const list = stories && stories.length ? stories : DEFAULT_STORIES;
  const count = list.length;
  const shape: CircularCarouselPreset = PRESETS[preset] ? preset : 'cylinder';
  const layout = PRESETS[shape];
  const axis = layout.axis;
  const tiltValue = tilt ?? layout.tilt;
  const reduced = usePrefersReducedMotion();

  const cardW = Math.max(260, cardWidth);
  const cardH = cardW / clamp(aspectRatio, 0.5, 3);
  const along = axis === 'x' ? cardH : cardW;
  const step = 360 / count;

  const radius = useMemo(() => {
    const n = Math.max(count, 3);
    const pitch = (along + gap) * layout.spread;
    const chord = pitch / (2 * Math.sin(Math.PI / n));
    const arc = (n * pitch) / (2 * Math.PI);
    return Math.max(chord + (arc - chord) * 0.2, along * 0.7);
  }, [count, along, gap, layout.spread]);

  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wakeRef = useRef<() => void>(() => {});
  const measureRef = useRef<() => void>(() => {});
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const [dragging, setDragging] = useState(false);
  const readyRef = useRef(false);
  readyRef.current = ready;

  const stateRef = useRef<CarouselState>({
    angle: 0,
    velocity: 0,
    target: null,
    dir: 0,
    press: null,
    drag: false,
    hover: false,
    pointer: { inside: false, x: 0, y: 0 },
    yaw: 0,
    pitch: 0,
    intro: null,
    introDone: false,
    holdUntil: 0,
    stepAt: 0,
    suppressClick: false,
    wheelTimer: undefined,
    fit: 1,
    shift: 0,
    drop: 0,
    last: 0,
  });

  const settings: Settings = {
    count,
    step,
    radius,
    layout,
    axis,
    tilt: tiltValue,
    perspective: layout.inward ? radius : (perspective ?? layout.perspective),
    cardW,
    cardH,
    intro: reduced ? 'none' : intro in INTRO_LENGTH ? intro : 'rise',
    autoplay: reduced ? 'off' : autoplay,
    speed,
    interval: Math.max(0.5, interval),
    draggable,
    momentum: clamp(momentum, 0, 1),
    snap,
    pauseOnHover,
    parallax: reduced ? 0 : clamp(parallax, 0, 1),
    stretch: reduced ? 0 : clamp(stretch, 0, 1),
    depthFade: clamp(depthFade, 0, 1),
    captions: false,
    reduced,
  };
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const dragSign = layout.inward ? -1 : 1;
  const directionSign = (direction === 'right' ? 1 : -1) * dragSign;

  useEffect(() => {
    stateRef.current.dir = directionSign;
    wakeRef.current();
  }, [directionSign]);

  useEffect(() => {
    setReady(true);
    wakeRef.current();
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const camera = cameraRef.current;
    const ring = ringRef.current;
    if (!root || !stage || !camera || !ring) return undefined;
    const state = stateRef.current;
    let raf = 0;
    let visible = true;

    const nearest = (angle: number) => Math.round(angle / settingsRef.current.step) * settingsRef.current.step;

    const measure = () => {
      const s = settingsRef.current;
      const rect = root.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const width = rect.width * 0.96;
      const height = rect.height * 0.94;
      const P = s.perspective;
      let minX = Infinity;
      let maxX = -Infinity;
      let minY = Infinity;
      let maxY = -Infinity;

      const corners: [number, number][] = [
        [-s.cardW / 2, -s.cardH / 2],
        [s.cardW / 2, -s.cardH / 2],
        [-s.cardW / 2, s.cardH / 2],
        [s.cardW / 2, s.cardH / 2],
      ];
      const limit = 180;
      for (let a = -limit; a <= limit; a += limit / 18) {
        for (const [cx, cy] of corners) {
          let p: Vec3;
          if (s.axis === 'x') {
            p = rotateY(rotateX([cx, cy, s.radius], -a), s.tilt);
          } else if (s.layout.billboard) {
            const c = rotateY([0, 0, s.radius], a);
            p = rotateX([c[0] + cx, cy, c[2]], s.tilt);
          } else {
            p = rotateX(rotateY([cx, cy, s.radius], a), s.tilt);
          }
          p = [p[0], p[1], p[2] - s.radius];
          if (p[2] >= P * 0.95) continue;
          const k = P / (P - p[2]);
          minX = Math.min(minX, p[0] * k);
          maxX = Math.max(maxX, p[0] * k);
          minY = Math.min(minY, p[1] * k);
          maxY = Math.max(maxY, p[1] * k);
        }
      }
      const spanX = Math.max(maxX - minX, 1);
      const spanY = Math.max(maxY - minY, 1);
      const fit = Math.min(1, width / spanX, height / spanY);
      state.fit = fit;
      state.shift = -((minY + maxY) / 2) * fit;
      state.drop = s.axis === 'x' ? (rect.width / fit) * 0.55 + s.cardW : (rect.height / fit) * 0.55 + s.cardH;
      stage.style.perspective = `${P}px`;
      stage.style.transform = `translate3d(0, ${state.shift}px, 0) scale(${fit})`;
    };
    measureRef.current = measure;

    const introCard = (elapsed: number, landing: number): IntroPose => {
      if (!state.intro) return { radius: 1, lift: 0 };
      const type = state.intro.type;
      const reach = Math.abs(wrap(landing + state.angle));
      if (type === 'assemble') {
        const delay = (reach / 180) * 420;
        const p = easeOut(clamp((elapsed - delay) / 1080, 0, 1));
        return { radius: 1 + 0.6 * (1 - p), lift: 0 };
      }
      if (type === 'rise') {
        const delay = (reach / 180) * 480;
        const p = easeOutQuint(clamp((elapsed - delay) / 900, 0, 1));
        return { radius: 1, lift: (1 - p) * state.drop };
      }
      if (type === 'spin') {
        const p = easeOut(clamp(elapsed / INTRO_LENGTH.spin, 0, 1));
        return { radius: 1 + 0.28 * (1 - p), lift: 0 };
      }
      return { radius: 1, lift: 0 };
    };

    const advance = (s: Settings, dt: number, now: number) => {
      if (!state.introDone && readyRef.current) {
        if (!state.intro) {
          if (s.intro === 'none') state.introDone = true;
          else state.intro = { type: s.intro, start: now };
        }
        if (state.intro && now - state.intro.start >= INTRO_LENGTH[state.intro.type]) {
          state.intro = null;
          state.introDone = true;
        }
      }

      const paused = (s.pauseOnHover && state.hover) || state.drag || now < state.holdUntil;
      const cruise = s.autoplay === 'drift' && !paused && !state.intro ? s.speed * state.dir : 0;
      let busy = Boolean(state.intro) || state.drag;

      if (state.drag || state.intro) {
        state.velocity = state.drag ? state.velocity : 0;
      } else if (state.target !== null) {
        let remaining = dt;
        const damping = 2 * Math.sqrt(SPRING);
        while (remaining > 0) {
          const h = Math.min(remaining, 1 / 240);
          const accel = SPRING * (state.target - state.angle) - damping * state.velocity;
          state.velocity += accel * h;
          state.angle += state.velocity * h;
          remaining -= h;
        }
        if (Math.abs(state.target - state.angle) < 0.004 && Math.abs(state.velocity) < 0.03) {
          state.angle = state.target;
          state.velocity = 0;
          state.target = null;
        }
        busy = true;
      } else {
        const tau = 0.18 + s.momentum * 1.5;
        state.velocity += (cruise - state.velocity) * (1 - Math.exp(-dt / tau));
        state.angle += state.velocity * dt;
        if (cruise === 0 && s.snap && Math.abs(state.velocity) < SETTLE_SPEED) {
          state.target = nearest(state.angle);
        }
        busy = busy || cruise !== 0 || Math.abs(state.velocity) > 0.01 || state.target !== null;
      }

      if (s.autoplay === 'step' && !paused && !state.intro && state.introDone) {
        if (!state.stepAt) state.stepAt = now + s.interval * 1000;
        if (now >= state.stepAt) {
          state.target = (state.target ?? nearest(state.angle)) + s.step * state.dir;
          state.stepAt = now + s.interval * 1000;
        }
        busy = true;
      } else {
        state.stepAt = 0;
      }

      if (now < state.holdUntil) busy = true;

      const ease = 1 - Math.exp(-dt / 0.35);
      const aimYaw = state.pointer.inside ? state.pointer.x * s.parallax * 9 : 0;
      const aimPitch = state.pointer.inside ? -state.pointer.y * s.parallax * 6 : 0;
      state.yaw += (aimYaw - state.yaw) * ease;
      state.pitch += (aimPitch - state.pitch) * ease;
      if (Math.abs(aimYaw - state.yaw) > 0.01 || Math.abs(aimPitch - state.pitch) > 0.01) busy = true;

      return busy;
    };

    const render = (s: Settings, now: number) => {
      const elapsed = state.intro ? now - state.intro.start : 0;
      const swell = 1 + s.stretch * 0.12 * Math.min(1, Math.abs(state.velocity) / 420);
      let spinOffset = 0;
      if (state.intro?.type === 'spin') {
        const p = easeOut(clamp(elapsed / INTRO_LENGTH.spin, 0, 1));
        spinOffset = -300 * state.dir * (1 - p);
      } else if (state.intro?.type === 'assemble') {
        const p = easeOut(clamp(elapsed / INTRO_LENGTH.assemble, 0, 1));
        spinOffset = -32 * state.dir * (1 - p);
      }
      const angle = state.angle + spinOffset;
      const R = s.radius * swell;

      if (s.axis === 'x') {
        camera.style.transform = `translate3d(0, 0, ${-R}px) rotateY(${s.tilt + state.yaw}deg) rotateX(${state.pitch}deg)`;
        ring.style.transform = `rotateX(${-angle}deg)`;
      } else {
        camera.style.transform = `translate3d(0, 0, ${-R}px) rotateX(${s.tilt + state.pitch}deg) rotateY(${state.yaw}deg)`;
        ring.style.transform = `rotateY(${angle}deg)`;
      }

      for (let index = 0; index < s.count; index++) {
        const card = cardRefs.current[index];
        if (!card) continue;
        const base = index * s.step;
        const mod = introCard(elapsed, base);
        const r = R * mod.radius;
        let transform: string;
        if (s.axis === 'x') {
          transform = `rotateX(${-base}deg) translateZ(${r}px)`;
        } else {
          transform = `rotateY(${base}deg) translateZ(${r}px)`;
          if (s.layout.billboard) transform += ` rotateY(${-(base + angle)}deg)`;
        }
        if (mod.lift) transform += s.axis === 'x' ? ` translateX(${mod.lift}px)` : ` translateY(${mod.lift}px)`;
        card.style.transform = transform;

        const world = wrap(base + angle);
        const facing = Math.cos(world * TO_RAD);
        const fade = s.depthFade * Math.pow((1 - facing) / 2, 1.25);
        card.style.setProperty('--cc-depth', fade.toFixed(3));
      }

      const index = ((Math.round(-state.angle / s.step) % s.count) + s.count) % s.count || 0;
      if (index !== activeRef.current) {
        activeRef.current = index;
        setActive(index);
        onChangeRef.current?.(index);
      }
    };

    const frame = (now: number) => {
      raf = 0;
      const s = settingsRef.current;
      const dt = state.last ? Math.min((now - state.last) / 1000, 0.05) : 1 / 60;
      state.last = now;
      const busy = advance(s, dt, now);
      render(s, now);
      if (busy && visible && !document.hidden) raf = requestAnimationFrame(frame);
      else state.last = 0;
    };

    const wake = () => {
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frame);
    };
    wakeRef.current = wake;

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
        state.last = 0;
      } else wake();
    };

    const resize = new ResizeObserver(() => {
      measure();
      wake();
    });
    resize.observe(root);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
      else {
        cancelAnimationFrame(raf);
        raf = 0;
        state.last = 0;
      }
    });
    io.observe(root);

    const onWheel = (event: WheelEvent) => {
      const s = settingsRef.current;
      if (!s.draggable) return;
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : 0;
      if (!delta) return;
      event.preventDefault();
      const perPixel = 180 / (Math.PI * s.radius * state.fit);
      state.target = null;
      state.angle -= delta * perPixel * (s.layout.inward ? -1 : 1);
      state.velocity = -delta * perPixel * (s.layout.inward ? -1 : 1) * 30;
      state.holdUntil = performance.now() + 1600;
      clearTimeout(state.wheelTimer);
      state.wheelTimer = setTimeout(() => {
        if (settingsRef.current.snap) state.target = nearest(state.angle + state.velocity * 0.12);
        wake();
      }, 140);
      wake();
    };
    root.addEventListener('wheel', onWheel, { passive: false });
    document.addEventListener('visibilitychange', onVisibility);

    measure();
    render(settingsRef.current, performance.now());
    wake();

    return () => {
      cancelAnimationFrame(raf);
      resize.disconnect();
      io.disconnect();
      clearTimeout(state.wheelTimer);
      root.removeEventListener('wheel', onWheel);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  useLayoutEffect(() => {
    measureRef.current();
    wakeRef.current();
  }, [radius, cardW, cardH, tiltValue, perspective, preset, count]);

  useEffect(() => {
    wakeRef.current();
  });

  const focusIndex = useCallback((index: number) => {
    const state = stateRef.current;
    const s = settingsRef.current;
    let target = -index * s.step;
    target += 360 * Math.round((state.angle - target) / 360);
    state.target = target;
    state.holdUntil = performance.now() + 2800;
    wakeRef.current();
  }, []);

  const stepBy = useCallback((delta: number) => {
    const state = stateRef.current;
    const s = settingsRef.current;
    const base = state.target ?? Math.round(state.angle / s.step) * s.step;
    state.target = base - delta * s.step * (s.layout.inward ? -1 : 1);
    state.holdUntil = performance.now() + 2800;
    wakeRef.current();
  }, []);

  const updatePointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const root = rootRef.current;
    if (!root) return;
    const rect = root.getBoundingClientRect();
    const pointer = stateRef.current.pointer;
    pointer.x = clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
    pointer.y = clamp(((event.clientY - rect.top) / rect.height) * 2 - 1, -1, 1);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const state = stateRef.current;
    state.suppressClick = false;
    if (!draggable || event.button !== 0) return;
    state.press = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      angle: state.angle,
      moved: false,
      origin: 0,
      samples: [{ time: performance.now(), angle: state.angle }],
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const state = stateRef.current;
    if (event.pointerType === 'mouse') {
      state.pointer.inside = true;
      updatePointer(event);
    }
    const press = state.press;
    if (!press || press.id !== event.pointerId) {
      wakeRef.current();
      return;
    }
    const s = settingsRef.current;
    const delta = s.axis === 'x' ? event.clientY - press.y : event.clientX - press.x;
    const cross = s.axis === 'x' ? event.clientX - press.x : event.clientY - press.y;
    if (!press.moved) {
      if (Math.abs(delta) < DRAG_THRESHOLD) return;
      if (Math.abs(cross) > Math.abs(delta) * 1.2 && event.pointerType !== 'mouse') {
        state.press = null;
        return;
      }
      press.moved = true;
      press.origin = delta;
      state.drag = true;
      state.target = null;
      state.velocity = 0;
      setDragging(true);
      try {
        rootRef.current?.setPointerCapture(event.pointerId);
      } catch {}
    }
    const perPixel = 180 / (Math.PI * s.radius * state.fit);
    state.angle = press.angle + (delta - press.origin) * perPixel * (s.layout.inward ? -1 : 1);
    const now = performance.now();
    press.samples.push({ time: now, angle: state.angle });
    while (press.samples.length > 2 && now - press.samples[0].time > 110) press.samples.shift();
    wakeRef.current();
  };

  const releasePointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const state = stateRef.current;
    const press = state.press;
    if (!press || press.id !== event.pointerId) return;
    state.press = null;
    if (!press.moved) return;
    state.drag = false;
    setDragging(false);
    state.suppressClick = true;
    const s = settingsRef.current;
    const first = press.samples[0];
    const last = press.samples[press.samples.length - 1];
    const span = (last.time - first.time) / 1000;
    const velocity = span > 0.008 ? clamp((last.angle - first.angle) / span, -1400, 1400) : 0;
    state.velocity = velocity;
    if (Math.abs(velocity) > 60) state.dir = Math.sign(velocity);
    const coasting = s.autoplay === 'drift' && !(s.pauseOnHover && state.hover && event.pointerType === 'mouse');
    if (s.snap && !coasting) {
      const tau = 0.18 + s.momentum * 1.5;
      state.target = Math.round((state.angle + velocity * tau * 0.55) / s.step) * s.step;
    }
    wakeRef.current();
  };

  const handlePointerEnter = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;
    stateRef.current.hover = true;
    wakeRef.current();
  };

  const handlePointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    const state = stateRef.current;
    if (event.pointerType === 'mouse') {
      state.hover = false;
      state.pointer.inside = false;
    }
    wakeRef.current();
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const state = stateRef.current;
    if (state.suppressClick) {
      state.suppressClick = false;
      return;
    }
    const card = (event.target as HTMLElement).closest?.('[data-cc-index]');
    if (!card) return;
    const index = Number(card.getAttribute('data-cc-index'));
    if (focusOnClick) focusIndex(index);
    onItemClick?.(list[index], index);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const forward = axis === 'x' ? 'ArrowDown' : 'ArrowRight';
    const backward = axis === 'x' ? 'ArrowUp' : 'ArrowLeft';
    if (event.key === forward) stepBy(1);
    else if (event.key === backward) stepBy(-1);
    else if (event.key === 'Home') focusIndex(0);
    else if (event.key === 'End') focusIndex(count - 1);
    else if (event.key === 'Enter' || event.key === ' ') onItemClick?.(list[activeRef.current], activeRef.current);
    else return;
    event.preventDefault();
  };

  return (
    <div
      ref={rootRef}
      className={`group/cc relative flex flex-col items-center justify-between h-full w-full touch-pan-y select-none overflow-hidden outline-none ${className}`.trim()}
      style={
        {
          ...style,
          '--cc-fade': fadeColor,
        } as React.CSSProperties
      }
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer reviews 3D carousel"
      tabIndex={0}
      data-axis={axis}
      data-shape={shape}
      data-ready={ready ? '' : undefined}
      data-draggable={draggable ? '' : undefined}
      data-dragging={dragging ? '' : undefined}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={releasePointer}
      onPointerCancel={releasePointer}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {/* 3D Ring Viewport Stage */}
      <div className="relative w-full flex-1 overflow-hidden" style={{ minHeight: '440px' }}>
        <div
          ref={stageRef}
          className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-[450ms] ease-out group-data-[ready]/cc:opacity-100 motion-reduce:transition-none"
        >
          <div ref={cameraRef} className="relative h-0 w-0 [transform-style:preserve-3d]">
            <div ref={ringRef} className="absolute left-0 top-0 h-0 w-0 [transform-style:preserve-3d]">
              {list.map((story, index) => {
                const isActive = index === active;
                return (
                  <div
                    key={story.name}
                    ref={(element) => {
                      cardRefs.current[index] = element;
                    }}
                    className="absolute left-0 top-0 h-0 w-0 [transform-style:preserve-3d]"
                    data-cc-index={index}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${story.name}, story ${index + 1} of ${count}`}
                  >
                    <div
                      className="absolute [backface-visibility:hidden] [-webkit-backface-visibility:hidden]"
                      style={{
                        left: -cardW / 2,
                        top: -cardH / 2,
                        width: cardW,
                        height: cardH,
                      }}
                    >
                      {/* Thought Card with Frosted Blurred Background and strictly non-rounded elements */}
                      <article
                        className="relative flex h-full w-full flex-col justify-between overflow-hidden p-6 transition-all duration-300"
                        style={{
                          borderRadius: `${cornerRadius}px`,
                          backdropFilter: 'blur(20px)',
                          WebkitBackdropFilter: 'blur(20px)',
                          background: isActive
                            ? 'rgba(255, 255, 255, 0.94)'
                            : 'rgba(255, 255, 255, 0.82)',
                          border: isActive
                            ? '1.5px solid rgba(24, 203, 150, 0.45)'
                            : '1px solid rgba(226, 232, 240, 0.9)',
                          boxShadow: isActive
                            ? '0 12px 35px -8px rgba(15, 23, 42, 0.12), 0 25px 60px -15px rgba(24, 203, 150, 0.22)'
                            : '0 4px 18px -4px rgba(15, 23, 42, 0.06)',
                          cursor: isActive ? 'default' : 'pointer',
                        }}
                      >
                        {/* Ambient Glow Accent on Active Card */}
                        <div
                          className="pointer-events-none absolute -right-8 -top-8 h-28 w-28"
                          style={{
                            background: 'radial-gradient(circle, rgba(24, 203, 150, 0.18) 0%, transparent 70%)',
                          }}
                        />

                        {/* Top Meta Bar: Non-rounded tag badge + non-rounded metric badge */}
                        <div className="relative z-10 flex items-center justify-between gap-2.5">
                          {/* Tag: Sharp Rectangular Badge */}
                          <div
                            className="inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[10.5px] font-bold uppercase tracking-wider"
                            style={{
                              borderRadius: '0px',
                              background: 'rgba(24, 203, 150, 0.1)',
                              border: '1px solid rgba(24, 203, 150, 0.35)',
                              color: '#15b886',
                            }}
                          >
                            <span
                              className="inline-block h-1.5 w-1.5"
                              style={{ borderRadius: '0px', background: '#18cb96' }}
                            />
                            <span>{story.tag}</span>
                          </div>

                          {/* Metric: Sharp Rectangular Badge */}
                          <div
                            className="inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[11px] font-bold"
                            style={{
                              borderRadius: '0px',
                              background: '#f8fafc',
                              border: '1px solid #cbd5e1',
                              color: '#0f172a',
                            }}
                          >
                            <TrendingUp size={11} className="text-[#18cb96]" aria-hidden="true" />
                            <span>{story.metric}</span>
                          </div>
                        </div>

                        {/* Customer Thoughts Message in Distinctive Literary/Thought Style Typography */}
                        <div className="relative z-10 my-auto py-2.5">
                          <span
                            className="pointer-events-none block select-none text-2xl font-normal leading-none"
                            style={{
                              color: 'rgba(24, 203, 150, 0.45)',
                              fontFamily: 'Georgia, serif',
                              marginBottom: '-4px',
                            }}
                          >
                            &ldquo;
                          </span>
                          <p
                            className="m-0 text-[15.5px] italic leading-[1.65] text-slate-800"
                            style={{
                              fontFamily: 'Georgia, "Playfair Display", "Newsreader", Cambria, serif',
                              letterSpacing: '0.01em',
                            }}
                          >
                            {story.copy}
                          </p>
                        </div>

                        {/* Bottom Row: Company Info & Non-Rounded Action Button */}
                        <div
                          className="relative z-10 border-t pt-3"
                          style={{ borderColor: 'rgba(226, 232, 240, 0.8)' }}
                        >
                          <div className="flex items-end justify-between gap-3">
                            <div>
                              <h4 className="m-0 text-[17px] font-extrabold tracking-tight text-slate-900">
                                {story.name}
                              </h4>
                              <p className="m-0 mt-0.5 text-[12px] font-semibold text-[#18cb96]">
                                {story.summary}
                              </p>
                            </div>

                            {/* Non-rounded Action Button */}
                            {story.href ? (
                              <Link
                                href={story.href}
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[11.5px] font-bold tracking-tight text-slate-900 transition-all hover:bg-[#18cb96] hover:text-white"
                                style={{
                                  borderRadius: '0px',
                                  border: '1px solid rgba(24, 203, 150, 0.45)',
                                  background: 'rgba(24, 203, 150, 0.08)',
                                }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <span>Story</span>
                                <ArrowUpRight size={13} aria-hidden="true" />
                              </Link>
                            ) : (
                              <Link
                                href="/demo/"
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[11.5px] font-bold tracking-tight text-slate-900 transition-all hover:bg-[#18cb96] hover:text-white"
                                style={{
                                  borderRadius: '0px',
                                  border: '1px solid rgba(24, 203, 150, 0.45)',
                                  background: 'rgba(24, 203, 150, 0.08)',
                                }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <span>Explore</span>
                                <ArrowRight size={13} aria-hidden="true" />
                              </Link>
                            )}
                          </div>
                        </div>

                        {/* 3D Depth Fade and Blur Overlay as cards face away */}
                        <div
                          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                          style={{
                            background: 'var(--cc-fade)',
                            opacity: 'var(--cc-depth, 0)',
                            borderRadius: `${cornerRadius}px`,
                            backdropFilter: 'blur(calc(var(--cc-depth, 0) * 10px))',
                            WebkitBackdropFilter: 'blur(calc(var(--cc-depth, 0) * 10px))',
                          }}
                        />
                      </article>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Navigation Bar (Non-rounded navigation controls) */}
      <div className="relative z-20 mt-3 flex items-center justify-center gap-4 py-2">
        {/* Previous Button (Sharp square) */}
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center bg-white border border-slate-300 text-slate-700 shadow-sm transition-all hover:border-[#18cb96] hover:text-[#18cb96] active:scale-95"
          style={{ borderRadius: '0px' }}
          onClick={() => stepBy(-1)}
          aria-label="Previous story"
        >
          <ChevronLeft size={17} aria-hidden="true" />
        </button>

        {/* Story Selector Indicators (Sharp square indicators) */}
        <div className="flex items-center gap-2" role="tablist" aria-label="Customer review cards">
          {list.map((item, index) => {
            const isCurrent = active === index;
            return (
              <button
                key={item.name}
                type="button"
                role="tab"
                aria-selected={isCurrent}
                aria-label={`View story ${index + 1}: ${item.name}`}
                className="transition-all duration-300 cursor-pointer"
                style={{
                  width: isCurrent ? '26px' : '9px',
                  height: '9px',
                  borderRadius: '0px',
                  background: isCurrent ? '#18cb96' : '#cbd5e1',
                  border: isCurrent ? '1px solid #15b886' : 'none',
                }}
                onClick={() => focusIndex(index)}
              />
            );
          })}
        </div>

        {/* Next Button (Sharp square) */}
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center bg-white border border-slate-300 text-slate-700 shadow-sm transition-all hover:border-[#18cb96] hover:text-[#18cb96] active:scale-95"
          style={{ borderRadius: '0px' }}
          onClick={() => stepBy(1)}
          aria-label="Next story"
        >
          <ChevronRight size={17} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

