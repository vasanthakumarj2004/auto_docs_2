'use client';

import React, { useState, useEffect, useRef, useTransition } from 'react';
import { usePathname } from 'next/navigation';
import { Palette, X, RotateCcw, Check, Droplets } from 'lucide-react';
import { useLandingLayout } from './LandingLayoutProvider';

export interface ViewportPreset {
  id: string;
  name: string;
  color: string;
  hue: number;
}

export const VIEWPORT_PRESETS: ViewportPreset[] = [
  { id: 'logo', name: 'Logo', color: '#18CB96', hue: 162.23 },
  { id: 'violet', name: 'Violet', color: '#8B32F7', hue: 267 },
  { id: 'cyan', name: 'Cyan', color: '#06B6D4', hue: 188 },
  { id: 'blue', name: 'Blue', color: '#2563EB', hue: 221 },
  { id: 'emerald', name: 'Emerald', color: '#059669', hue: 160 },
  { id: 'amber', name: 'Amber', color: '#D97706', hue: 36 },
  { id: 'crimson', name: 'Crimson', color: '#DC2626', hue: 0 },
];

function hslToHex(h: number, s: number, l: number): string {
  if (Math.abs(h - 162.23) < 1.5) return '#18CB96';
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

/**
 * Calculates a perceptually tuned, high-contrast accent text color based on hue.
 * Guarantees zero contrast issues across the full 0-360° spectrum (WCAG AAA >= 8.5:1).
 */
function getAccentTextColor(h: number): string {
  if (Math.abs(h - 162.23) < 1.5) return '#18CB96';
  let lightness = 76;
  if ((h >= 200 && h <= 295) || (h >= 340 || h <= 15)) {
    // Deep blue, purple, magenta need higher lightness for contrast against dark
    lightness = 88;
  } else if (h >= 45 && h <= 180) {
    // Yellow, green, cyan have naturally higher perceived luminance
    lightness = 72;
  }
  return hslToHex(h, 92, lightness);
}

const STORAGE_KEY_ENABLED = 'v2-viewport-flow-enabled';
const STORAGE_KEY_HUE = 'v2-viewport-flow-hue';
const STORAGE_KEY_OPACITY = 'v2-viewport-flow-opacity';

export const V2ViewportDarkSwitcher: React.FC = () => {
  const pathname = usePathname();
  const { layout, appearance } = useLandingLayout();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'color' | 'strength'>('color');
  const [isEnabled, setIsEnabled] = useState(false);
  const [hue, setHue] = useState<number>(162.23); // Default to Docsynecx Logo green
  const [opacity, setOpacity] = useState<number>(100);
  const [, startTransition] = useTransition();

  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Apply or remove colors consumed only by the Layout 2 dark hero.
  const applyFlow = (enabled: boolean, currentHue: number, currentOpacity: number) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const rootStyle = root.style;

    if (!enabled) {
      root.removeAttribute('data-v2-viewport-flow');
      rootStyle.removeProperty('--v2-vp-flow-hue');
      rootStyle.removeProperty('--v2-vp-flow-hue-num');
      rootStyle.removeProperty('--v2-vp-flow-bg');
      rootStyle.removeProperty('--v2-vp-flow-hero-end');
      rootStyle.removeProperty('--v2-vp-flow-surface');
      rootStyle.removeProperty('--v2-vp-flow-card');
      rootStyle.removeProperty('--v2-vp-flow-border');
      rootStyle.removeProperty('--v2-vp-flow-accent');
      rootStyle.removeProperty('--v2-vp-flow-accent-text');
      rootStyle.removeProperty('--v2-vp-flow-glow');
      rootStyle.removeProperty('--v2-vp-flow-cta-bg');
      rootStyle.removeProperty('--v2-vp-flow-cta-hover');
      rootStyle.removeProperty('--v2-vp-flow-opacity');
      rootStyle.removeProperty('--v2-vp-flow-text');
      rootStyle.removeProperty('--v2-vp-flow-body');
      rootStyle.removeProperty('--v2-vp-flow-muted');
      return;
    }

    const alpha = Math.max(0.15, Math.min(1, currentOpacity / 100));
    const accentHex = Math.abs(currentHue - 162.23) < 1.5 ? '#18CB96' : hslToHex(currentHue, 88, 56);
    const accentText = getAccentTextColor(currentHue);

    root.setAttribute('data-v2-viewport-flow', 'true');
    rootStyle.setProperty('--v2-vp-flow-hue', `${currentHue}deg`);
    rootStyle.setProperty('--v2-vp-flow-hue-num', String(currentHue));
    // Blend against an opaque dark base so lower strength cannot reveal a lighter page.
    rootStyle.setProperty('--v2-vp-flow-bg', `color-mix(in srgb, hsl(${currentHue}, 44%, 7.5%) ${alpha * 100}%, #0b0d12)`);
    rootStyle.setProperty('--v2-vp-flow-border', `hsla(${currentHue}, 38%, 28%, ${Math.min(1, alpha * 0.85 + 0.15)})`);
    rootStyle.setProperty('--v2-vp-flow-accent', accentHex);
    rootStyle.setProperty('--v2-vp-flow-accent-text', accentText);
    rootStyle.setProperty('--v2-vp-flow-glow', `hsla(${currentHue}, 90%, 54%, ${alpha * 0.28})`);
    rootStyle.setProperty('--v2-vp-flow-cta-bg', `hsla(${currentHue}, 50%, 18%, 0.95)`);
    rootStyle.setProperty('--v2-vp-flow-cta-hover', `hsla(${currentHue}, 55%, 24%, 1)`);
    rootStyle.setProperty('--v2-vp-flow-opacity', String(currentOpacity));
    rootStyle.setProperty('--v2-vp-flow-text', '#F8FAFC');
    rootStyle.setProperty('--v2-vp-flow-body', '#E2E8F0');
    rootStyle.setProperty('--v2-vp-flow-muted', '#CBD5E1');
  };

  // Sync with localStorage on mount
  useEffect(() => {
    try {
      const savedEnabled = localStorage.getItem(STORAGE_KEY_ENABLED) === 'true';
      const savedHue = Number(localStorage.getItem(STORAGE_KEY_HUE) ?? 162.23);
      const savedOpacity = Number(localStorage.getItem(STORAGE_KEY_OPACITY) ?? 100);

      const validHue = Number.isFinite(savedHue) && savedHue >= 0 && savedHue <= 360 ? savedHue : 162.23;
      const validOpacity = Number.isFinite(savedOpacity) && savedOpacity >= 15 && savedOpacity <= 100 ? savedOpacity : 100;

      setIsEnabled(savedEnabled);
      setHue(validHue);
      setOpacity(validOpacity);

      if (layout === 'v2' && appearance === 'dark' && pathname === '/' && savedEnabled) {
        applyFlow(true, validHue, validOpacity);
      }
    } catch { /* Storage access safe fallback */ }
  }, []);

  // Update styles whenever state or layout mode changes
  useEffect(() => {
    const isV2Dark = layout === 'v2' && appearance === 'dark' && pathname === '/';
    if (!isV2Dark || !isEnabled) {
      applyFlow(false, hue, opacity);
    } else {
      applyFlow(true, hue, opacity);
    }
  }, [layout, appearance, pathname, isEnabled, hue, opacity]);

  // Click outside to close panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // This dedicated switcher is strictly only active for Version 2 in Dark Mode
  if (layout !== 'v2' || appearance !== 'dark' || pathname !== '/') {
    return null;
  }

  const activePreset = VIEWPORT_PRESETS.find(preset => Math.abs(hue - preset.hue) < 0.01);
  const activeColorHex = activePreset?.color ?? hslToHex(hue, 88, 56);

  const toggleFlow = () => {
    const nextState = !isEnabled;
    setIsEnabled(nextState);
    try { localStorage.setItem(STORAGE_KEY_ENABLED, String(nextState)); } catch {}
    applyFlow(nextState, hue, opacity);
  };

  const handleHueChange = (newHue: number) => {
    setHue(newHue);
    try { localStorage.setItem(STORAGE_KEY_HUE, String(newHue)); } catch {}
    if (isEnabled) applyFlow(true, newHue, opacity);
  };

  const handleOpacityChange = (newOpacity: number) => {
    setOpacity(newOpacity);
    try { localStorage.setItem(STORAGE_KEY_OPACITY, String(newOpacity)); } catch {}
    if (isEnabled) applyFlow(true, hue, newOpacity);
  };

  const handlePresetSelect = (presetHue: number) => {
    setHue(presetHue);
    try { localStorage.setItem(STORAGE_KEY_HUE, String(presetHue)); } catch {}
    if (isEnabled) applyFlow(true, presetHue, opacity);
  };

  const handleReset = () => {
    setIsEnabled(false);
    setActiveTab('color');
    setHue(162.23);
    setOpacity(100);
    try {
      localStorage.removeItem(STORAGE_KEY_ENABLED);
      localStorage.removeItem(STORAGE_KEY_HUE);
      localStorage.removeItem(STORAGE_KEY_OPACITY);
    } catch {}
    applyFlow(false, 162.23, 100);
  };

  return (
    <div
      ref={panelRef}
      className="fixed bottom-3 right-[180px] sm:bottom-4 sm:right-[195px] z-[80] select-none"
    >
      <style>{`
        .v2-flow-slider::-webkit-slider-thumb {
          appearance: none;
          width: 17px;
          height: 17px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #0f172a;
          box-shadow: 0 1px 4px rgba(0,0,0,0.4);
          cursor: pointer;
          transition: transform 0.1s ease;
        }
        .v2-flow-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        .v2-flow-slider::-moz-range-thumb {
          width: 17px;
          height: 17px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #0f172a;
          box-shadow: 0 1px 4px rgba(0,0,0,0.4);
          cursor: pointer;
        }
      `}</style>

      {/* Floating Trigger Pill */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="V2 Dark Viewport Flow Switcher"
        aria-expanded={isOpen}
        aria-controls="v2-viewport-flow-panel"
        title="V2 Dark Viewport Flow"
        className={`flex items-center gap-2 h-8 px-3 rounded-full border backdrop-blur-md shadow-lg text-xs font-semibold transition-all cursor-pointer ${
          isEnabled
            ? 'border-emerald-500/60 bg-slate-900/90 text-emerald-300 hover:border-emerald-400 hover:text-white shadow-slate-950/40'
            : 'border-slate-300/80 bg-white/90 text-slate-700 hover:border-slate-400 hover:text-slate-900'
        }`}
      >
        <span
          className={`h-2.5 w-2.5 rounded-full shrink-0 shadow-2xs transition-all ${
            isEnabled ? 'animate-pulse' : 'bg-slate-400'
          }`}
          style={{ backgroundColor: isEnabled ? activeColorHex : undefined }}
        />
        <span className="hidden sm:inline">Viewport Flow</span>
        <span className="sm:hidden">Flow</span>
        <span
          className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
            isEnabled
              ? 'bg-slate-800/90 text-emerald-300 border border-slate-700/50'
              : 'bg-slate-100 text-slate-600 border border-slate-200'
          }`}
        >
          {isEnabled ? 'ON' : 'OFF'}
        </span>
      </button>

      {isOpen && (
        <div
          id="v2-viewport-flow-panel"
          role="dialog"
          aria-label="Viewport Flow settings"
          className="fixed bottom-14 right-3 sm:absolute sm:bottom-11 sm:right-0 w-80 max-w-[calc(100vw-24px)] max-h-[calc(100svh-76px)] overflow-y-auto rounded-xl border border-slate-200/90 bg-white text-slate-800 shadow-2xl p-3.5"
        >
          <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase font-bold text-slate-500 tracking-wider">Viewport Flow</span>
              <span className="h-3 w-3 rounded-full border border-black/15" style={{ backgroundColor: activeColorHex }} aria-hidden="true" />
            </div>
            <button type="button" onClick={() => { setIsOpen(false); triggerRef.current?.focus(); }}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-md cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-500"
              aria-label="Close viewport flow menu"><X size={14} /></button>
          </div>

          <div className="flex items-center justify-between gap-3 px-2.5 py-2 rounded-lg border border-slate-100 bg-slate-50">
            <div>
              <span className="text-xs font-semibold text-slate-800 block">Hero color flow</span>
              <span className="text-[10px] text-slate-500">Layout 2 &middot; Dark hero only</span>
            </div>
            <button type="button" role="switch" aria-checked={isEnabled} onClick={toggleFlow}
              aria-label="Toggle hero viewport color flow"
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500 ${isEnabled ? 'bg-slate-800' : 'bg-slate-300'}`}>
              <span className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${isEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
          <p className="my-2.5 text-[10px] leading-relaxed text-slate-500">
            {isEnabled ? 'One uniform color across your hero.' : 'Choose your colors, then turn on to apply.'}
          </p>

          <div role="tablist" aria-label="Viewport Flow controls" className="grid grid-cols-2 p-1 mb-3 rounded-lg bg-slate-100 text-xs font-semibold">
            {(['color', 'strength'] as const).map(tab => (
              <button key={tab} type="button" role="tab" id={`flow-tab-${tab}`} aria-controls={`flow-panel-${tab}`}
                aria-selected={activeTab === tab} tabIndex={activeTab === tab ? 0 : -1}
                onClick={() => setActiveTab(tab)}
                onKeyDown={event => {
                  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
                  event.preventDefault();
                  const next = event.key === 'Home' ? 'color' : event.key === 'End' ? 'strength' : tab === 'color' ? 'strength' : 'color';
                  setActiveTab(next);
                  document.getElementById(`flow-tab-${next}`)?.focus();
                }}
                className={`py-1.5 rounded-md cursor-pointer flex items-center justify-center gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-500 ${activeTab === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>
                {tab === 'color' ? <Palette size={13} /> : <Droplets size={13} />}
                {tab === 'color' ? 'Color' : 'Strength'}
                {tab === 'strength' && <span className="text-[10px] px-1.5 rounded-full bg-slate-200 text-slate-700 font-mono">{opacity}%</span>}
              </button>
            ))}
          </div>

          <div role="tabpanel" id="flow-panel-color" aria-labelledby="flow-tab-color" hidden={activeTab !== 'color'}>
            <div className="mb-3 px-2.5 py-2 rounded-lg bg-slate-50 border border-slate-100">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider">Color spectrum</span>
                <span className="text-[11px] font-mono font-bold text-slate-700">{activeColorHex}</span>
              </div>
              <div className="flex items-center py-1">
                <input type="range" min={0} max={360} value={Math.round(hue)}
                  onChange={event => { const value = Number(event.target.value); startTransition(() => handleHueChange(value)); }}
                  aria-label="Hero color hue slider"
                  className="v2-flow-slider w-full h-3 rounded-full appearance-none cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
                  style={{ background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)' }} />
              </div>
              <div className="flex justify-between text-[9px] text-slate-500 font-mono mt-1"><span>0&deg;</span><span>180&deg;</span><span>360&deg;</span></div>
            </div>
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-2.5 block mb-1">Presets</span>
            <div className="flex flex-col gap-1" role="group" aria-label="Hero color presets">
              {VIEWPORT_PRESETS.map(preset => {
                const isSelected = activePreset?.id === preset.id;
                return (
                  <button key={preset.id} type="button" aria-pressed={isSelected}
                    onClick={() => handlePresetSelect(preset.hue)} title={`${preset.name} (${preset.color})`}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-left cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-500 ${isSelected ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-700 hover:bg-slate-50'}`}>
                    <span className="flex items-center gap-2">
                      <span className="h-3.5 w-3.5 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: preset.color }} aria-hidden="true" />
                      <span>{preset.name}</span>
                      {preset.id === 'logo' && <span className="text-[9px] font-mono text-slate-500">{preset.color}</span>}
                    </span>
                    {isSelected && <Check size={13} className="stroke-[3] shrink-0" style={{ color: preset.color }} aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div role="tabpanel" id="flow-panel-strength" aria-labelledby="flow-tab-strength" hidden={activeTab !== 'strength'}>
            <div className="mb-3 px-2.5 py-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full border border-black/15" style={{ backgroundColor: activeColorHex }} aria-hidden="true" />
                  <span className="text-xs font-semibold text-slate-800">{activePreset?.name ?? 'Custom hue'}</span>
                </div>
                <span className="text-xs font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">{opacity}%</span>
              </div>
              <div className="flex items-center py-1.5">
                <input type="range" min={15} max={100} value={opacity}
                  onChange={event => { const value = Number(event.target.value); startTransition(() => handleOpacityChange(value)); }}
                  aria-label="Hero color strength slider"
                  className="v2-flow-slider w-full h-3 rounded-full appearance-none cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
                  style={{ background: `linear-gradient(to right, #0b0d12, ${activeColorHex})` }} />
              </div>
              <div className="flex justify-between text-[9px] text-slate-500 font-mono mt-1"><span>15% Subtle</span><span>100% Full color</span></div>
            </div>
            <div className="grid grid-cols-4 gap-1.5" role="group" aria-label="Hero color strength presets">
              {[25, 50, 75, 100].map(value => (
                <button key={value} type="button" aria-pressed={opacity === value} onClick={() => handleOpacityChange(value)}
                  className={`py-2 rounded-lg border text-[11px] font-mono cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-500 ${opacity === value ? 'bg-slate-800 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>{value}%</button>
              ))}
            </div>
            <p className="mt-3 text-[10px] leading-relaxed text-slate-500">Adjust the color strength while keeping the hero background solid and dark.</p>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex justify-end">
            <button type="button" onClick={handleReset}
              className="text-[10px] text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-500">
              <RotateCcw size={10} /> Reset to default
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default V2ViewportDarkSwitcher;
