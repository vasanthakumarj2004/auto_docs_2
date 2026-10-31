'use client';

import React, { useState, useEffect, useRef, useTransition } from 'react';
import { Palette, Check, X, RotateCcw, Sun, Moon, Droplet } from 'lucide-react';
import { applyDarkTheme, DARK_THEME_KEY, DEFAULT_DARK_THEME, LOGO_DARK_THEME, LOGO_GREEN, parseDarkTheme, type DarkTheme } from '../lib/darkTheme';

export interface ThemeOption {
  id: string;
  name: string;
  color: string;
  hue: number;
  description: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  { id: 'current', name: 'Current Theme (Royal Violet / Teal)', color: '#8B32F7', hue: 267, description: 'Original Royal Violet & Teal' },
  { id: 'logo', name: 'Logo theme', color: LOGO_GREEN, hue: LOGO_DARK_THEME.hue, description: `Docsynecx logo green (${LOGO_GREEN})` },
  { id: 'green', name: 'Green', color: '#059669', hue: 160, description: 'Enterprise Emerald' },
  { id: 'light-green', name: 'Light Green', color: '#16A34A', hue: 142, description: 'Fresh Lime & Mint' },
  { id: 'red', name: 'Red', color: '#DC2626', hue: 0, description: 'Bold Crimson Red' },
  { id: 'blue', name: 'Blue', color: '#2563EB', hue: 221, description: 'Classic Enterprise Blue' },
  { id: 'yellow', name: 'Yellow', color: '#D97706', hue: 36, description: 'Warm Amber & Gold' },
  { id: 'orange', name: 'Orange', color: '#EA580C', hue: 21, description: 'Vibrant Sunset Orange' },
];

const DARK_THEME_OPTIONS: ThemeOption[] = THEME_OPTIONS;

const BRAND_STYLE_PROPERTIES = [
  '--color-brand',
  '--color-brand-strong',
  '--color-brand-soft',
  '--color-brand-border',
  '--color-brand-text',
  '--color-brand-50',
  '--color-brand-100',
  '--color-brand-200',
  '--color-brand-400',
  '--color-brand-500',
  '--color-brand-800',
  '--color-brand-900',
  '--color-paper',
  '--color-ink',
];

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length === 6) {
    return {
      r: parseInt(cleanHex.slice(0, 2), 16),
      g: parseInt(cleanHex.slice(2, 4), 16),
      b: parseInt(cleanHex.slice(4, 6), 16),
    };
  }
  return null;
}

function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function getPaletteFromHue(hue: number, opacity: number = 100) {
  const isYellow = hue >= 35 && hue <= 75;
  const brandLightness = isYellow ? 45 : 54;
  const strongLightness = isYellow ? 38 : 45;
  const textLightness = isYellow ? 25 : 32;
  const alpha = Math.max(0.05, Math.min(1, opacity / 100));

  return {
    brand: `hsla(${hue}, 92%, ${brandLightness}%, ${alpha})`,
    strong: `hsla(${hue}, 94%, ${strongLightness}%, ${alpha})`,
    soft: `hsla(${hue}, 90%, 97%, ${Math.min(1, alpha + 0.1)})`,
    border: `hsla(${hue}, 80%, 86%, ${alpha})`,
    text: `hsl(${hue}, 92%, ${textLightness}%)`,
    c50: `hsla(${hue}, 90%, 97%, ${alpha})`,
    c100: `hsla(${hue}, 85%, 93%, ${alpha})`,
    c200: `hsla(${hue}, 80%, 86%, ${alpha})`,
    c400: `hsla(${hue}, 80%, 70%, ${alpha})`,
    c500: `hsla(${hue}, 92%, ${brandLightness}%, ${alpha})`,
    c800: `hsl(${hue}, 92%, ${textLightness}%)`,
    c900: `hsl(${hue}, 95%, 22%)`,
    solidHex: hslToHex(hue, 92, brandLightness),
  };
}

export const ThemeSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'color' | 'opacity'>('color');
  const [colorTarget, setColorTarget] = useState<'light' | 'dark'>('light');
  const [lightTheme, setCurrentTheme] = useState('current');
  const [lightHue, setSliderHue] = useState<number>(267);
  const [lightOpacity, setOpacity] = useState<number>(100);
  const [lightIsCustom, setIsCustom] = useState(false);
  const [darkTheme, setDarkTheme] = useState<DarkTheme>(DEFAULT_DARK_THEME);
  const currentTheme = colorTarget === 'dark' ? darkTheme.id : lightTheme;
  const sliderHue = colorTarget === 'dark' ? darkTheme.hue : lightHue;
  const opacity = colorTarget === 'dark' ? 100 : lightOpacity;
  const isCustom = colorTarget === 'dark' ? darkTheme.id === 'custom' : lightIsCustom;
  const themeOptions = colorTarget === 'dark' ? DARK_THEME_OPTIONS : THEME_OPTIONS;
  const [, startTransition] = useTransition();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const updateDarkTheme = (theme: DarkTheme) => {
    setDarkTheme(theme);
    applyDarkTheme(theme);
    try { localStorage.setItem(DARK_THEME_KEY, JSON.stringify(theme)); } catch {}
  };

  const selectTarget = (target: 'light' | 'dark') => {
    setColorTarget(target);
    setActiveTab('color');
  };

  // Apply theme and opacity in tandem across the DOM
  const applyThemeStyle = (
    themeId: string,
    hue: number,
    currentOpacity: number,
    customMode: boolean
  ) => {
    if (typeof document === 'undefined') return;
    const rootStyle = document.documentElement.style;
    const alpha = Math.max(0.05, Math.min(1, currentOpacity / 100));

    if (customMode) {
      document.documentElement.setAttribute('data-theme', 'custom');
      const p = getPaletteFromHue(hue, currentOpacity);
      rootStyle.setProperty('--color-brand', p.brand);
      rootStyle.setProperty('--color-brand-strong', p.strong);
      rootStyle.setProperty('--color-brand-soft', p.soft);
      rootStyle.setProperty('--color-brand-border', p.border);
      rootStyle.setProperty('--color-brand-text', p.text);
      rootStyle.setProperty('--color-brand-50', p.c50);
      rootStyle.setProperty('--color-brand-100', p.c100);
      rootStyle.setProperty('--color-brand-200', p.c200);
      rootStyle.setProperty('--color-brand-400', p.c400);
      rootStyle.setProperty('--color-brand-500', p.c500);
      rootStyle.setProperty('--color-brand-800', p.c800);
      rootStyle.setProperty('--color-brand-900', p.c900);

      try {
        localStorage.setItem('autodocs-theme', `custom:${hue}`);
        localStorage.setItem('autodocs-theme-opacity', String(currentOpacity));
      } catch {}
    } else {
      document.documentElement.setAttribute('data-theme', themeId);
      // Clear the previous custom palette before applying a preset at any opacity.
      BRAND_STYLE_PROPERTIES.forEach((prop) => rootStyle.removeProperty(prop));
      const preset = THEME_OPTIONS.find((t) => t.id === themeId);

      if (preset) {
        const rgb = hexToRgb(preset.color);
        if (rgb && currentOpacity < 100) {
          rootStyle.setProperty('--color-brand', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`);
          rootStyle.setProperty('--color-brand-500', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`);
          rootStyle.setProperty(
            '--color-brand-strong',
            `rgba(${Math.max(0, rgb.r - 25)}, ${Math.max(0, rgb.g - 25)}, ${Math.max(0, rgb.b - 25)}, ${alpha})`
          );
          rootStyle.setProperty(
            '--color-brand-border',
            `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${Math.min(1, alpha * 0.45 + 0.15)})`
          );
        } else {
          // If solid 100%, remove custom inline styles so native stylesheet rules apply cleanly
          BRAND_STYLE_PROPERTIES.forEach((prop) => rootStyle.removeProperty(prop));
        }
      }

      try {
        localStorage.setItem('autodocs-theme', themeId);
        localStorage.setItem('autodocs-theme-opacity', String(currentOpacity));
      } catch {}
    }
  };

  const handleHueChange = (newHue: number) => {
    if (colorTarget === 'dark') {
      updateDarkTheme({ id: 'custom', hue: newHue });
      return;
    }
    setSliderHue(newHue);
    setIsCustom(true);
    setCurrentTheme('custom');
    applyThemeStyle('custom', newHue, opacity, true);
  };

  const handleOpacityChange = (newOpacity: number) => {
    if (colorTarget === 'dark') return;
    setOpacity(newOpacity);
    applyThemeStyle(currentTheme, sliderHue, newOpacity, isCustom);
  };

  const handlePresetSelect = (themeId: string) => {
    const preset = themeOptions.find((t) => t.id === themeId);
    if (colorTarget === 'dark') {
      updateDarkTheme({ id: themeId, hue: preset?.hue ?? 267 });
      return;
    }
    setCurrentTheme(themeId);
    setIsCustom(false);
    if (preset) {
      setSliderHue(preset.hue);
    }
    applyThemeStyle(themeId, preset?.hue ?? sliderHue, opacity, false);
  };

  useEffect(() => {
    let saved = DEFAULT_DARK_THEME;
    try { saved = parseDarkTheme(localStorage.getItem(DARK_THEME_KEY)); } catch {}
    setDarkTheme(saved);
    applyDarkTheme(saved);
    const sync = (event: StorageEvent) => {
      if (event.key !== DARK_THEME_KEY && event.key !== null) return;
      const next = parseDarkTheme(event.newValue);
      setDarkTheme(next);
      applyDarkTheme(next);
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('autodocs-theme');
      const savedOpacity = localStorage.getItem('autodocs-theme-opacity');
      const parsedOpacity = Number(savedOpacity ?? 100);
      const initialOpacity = Number.isFinite(parsedOpacity) ? Math.max(15, Math.min(100, parsedOpacity)) : 100;
      setOpacity(initialOpacity);

      if (savedTheme && savedTheme.startsWith('custom:')) {
        const hueVal = parseInt(savedTheme.split(':')[1], 10);
        if (Number.isFinite(hueVal) && hueVal >= 0 && hueVal <= 360) {
          setSliderHue(hueVal);
          setIsCustom(true);
          setCurrentTheme('custom');
          applyThemeStyle('custom', hueVal, initialOpacity, true);
          return;
        }
      }

      if (savedTheme && THEME_OPTIONS.some((t) => t.id === savedTheme)) {
        const preset = THEME_OPTIONS.find((t) => t.id === savedTheme);
        if (preset) setSliderHue(preset.hue);
        setCurrentTheme(savedTheme);
        setIsCustom(false);
        applyThemeStyle(savedTheme, preset?.hue ?? 267, initialOpacity, false);
      } else {
        applyThemeStyle('current', 267, initialOpacity, false);
      }
    } catch {
      applyThemeStyle('current', 267, 100, false);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setIsOpen(false); triggerRef.current?.focus(); }
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

  const activePreset = themeOptions.find((t) => t.id === currentTheme);
  const activeColorHex = colorTarget === 'dark'
    ? (currentTheme === 'current' ? '#100A21' : hslToHex(sliderHue, 53, 8.4))
    : isCustom
    ? getPaletteFromHue(sliderHue).solidHex
    : activePreset?.color || '#8B32F7';

  return (
    <div
      ref={panelRef}
      className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-50 select-none"
    >
      <style>{`
        .theme-control-slider::-webkit-slider-thumb {
          appearance: none;
          width: 17px;
          height: 17px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #0f172a;
          box-shadow: 0 1px 4px rgba(0,0,0,0.35);
          cursor: pointer;
          transition: transform 0.1s ease;
        }
        .theme-control-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        .theme-control-slider::-moz-range-thumb {
          width: 17px;
          height: 17px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #0f172a;
          box-shadow: 0 1px 4px rgba(0,0,0,0.35);
          cursor: pointer;
        }
      `}</style>

      {/* Discreet, unnoticeable trigger button: faint 35% opacity until hovered */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Theme & opacity switcher"
        aria-expanded={isOpen}
        aria-controls="theme-studio"
        title="Theme Switcher"
        className="h-7 w-7 sm:h-8 sm:w-8 rounded-full border border-slate-300/60 bg-white/70 backdrop-blur-md shadow-2xs opacity-35 hover:opacity-100 hover:border-slate-400 hover:shadow-md transition-all flex items-center justify-center text-slate-500 hover:text-slate-900 cursor-pointer"
      >
        <Palette size={13} className="stroke-[2.2]" />
      </button>

      {/* Flyout popup card */}
      {isOpen && (
        <div
          id="theme-studio"
          role="dialog"
          aria-label="Theme options"
          className="absolute bottom-9 right-0 sm:bottom-10 sm:right-0 w-80 max-w-[calc(100vw-24px)] max-h-[calc(100svh-72px)] overflow-y-auto rounded-xl border border-slate-200/90 bg-white text-slate-800 shadow-2xl p-3.5 animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase font-bold text-slate-500 tracking-wider">
                Theme Studio
              </span>
              <span
                className="h-3 w-3 rounded-full border border-black/15 shrink-0 transition-all shadow-2xs"
                style={{
                  backgroundColor: activeColorHex,
                  opacity: opacity / 100,
                }}
              />
            </div>
            <button
              type="button"
              onClick={() => { setIsOpen(false); triggerRef.current?.focus(); }}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-md cursor-pointer transition-colors"
              aria-label="Close theme menu"
            >
              <X size={14} />
            </button>
          </div>

          <div role="group" aria-label="Choose which colors to change" className="grid grid-cols-2 gap-2 mb-2">
            {(['light', 'dark'] as const).map(target => (
              <button key={target} type="button" aria-pressed={colorTarget === target} onClick={() => selectTarget(target)}
                className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-semibold cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500 ${colorTarget === target ? 'border-slate-800 bg-slate-800 text-white' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`}>
                {target === 'light' ? <Sun size={15} /> : <Moon size={15} />}
                {target === 'light' ? 'Light color' : 'Dark color'}
              </button>
            ))}
          </div>
          <p className="mb-3 text-[10px] leading-relaxed text-slate-500">
            {colorTarget === 'light' ? 'Change the lighter glow, buttons and accents.' : 'Change the dark background. Your light color stays the same.'}
          </p>

          {/* Opacity applies only to accents; dark backgrounds stay opaque. */}
          {colorTarget === 'light' && <>
          <div className="grid grid-cols-2 p-1 mb-3 rounded-lg bg-slate-100 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('color')}
              className={`py-1.5 rounded-md transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 ${
                activeTab === 'color'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Palette size={13} />
              <span>Color</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('opacity')}
              className={`py-1.5 rounded-md transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 ${
                activeTab === 'opacity'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Droplet size={13} />
              <span>Opacity</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700 font-mono">
                {opacity}%
              </span>
            </button>
          </div>
          </>}

          {/* TAB 1: COLOR (SPECTRUM SLIDER + PRESETS) */}
          {activeTab === 'color' && (
            <div>
              {/* Color Slider Box */}
              <div className="mb-3 px-2.5 py-2 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider">
                    Color Spectrum
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="h-3.5 w-3.5 rounded-full border border-black/15 shadow-2xs"
                      style={{
                        backgroundColor: activeColorHex,
                        opacity: opacity / 100,
                      }}
                      aria-hidden="true"
                    />
                    <span className="text-[11px] font-mono font-bold text-slate-700">
                      {activeColorHex}
                    </span>
                  </div>
                </div>

                <div className="relative flex items-center py-1">
                  <input
                    type="range"
                    min={0}
                    max={360}
                    value={sliderHue}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      startTransition(() => handleHueChange(val));
                    }}
                    aria-label={`${colorTarget === 'dark' ? 'Dark background' : 'Light accent'} color hue`}
                    className="theme-control-slider w-full h-3 rounded-full appearance-none cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-500 shadow-inner"
                    style={{
                      background:
                        'linear-gradient(to right, #ff0000 0%, #ff8000 14%, #ffff00 28%, #00ff00 42%, #00ffff 57%, #0077ff 71%, #8800ff 85%, #ff0080 93%, #ff0000 100%)',
                    }}
                  />
                </div>

                <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono mt-1 px-0.5">
                  <span>0° Red</span>
                  <span>120° Green</span>
                  <span>240° Blue</span>
                  <span>360° Red</span>
                </div>
              </div>

              {/* Presets Header */}
              <div className="flex items-center justify-between px-0.5 pb-1 mb-1.5">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                  Presets ({themeOptions.length})
                </span>
                {(isCustom || currentTheme !== 'current') && (
                  <button
                    type="button"
                    onClick={() => handlePresetSelect('current')}
                    className="text-[10px] text-brand hover:underline flex items-center gap-1 font-medium cursor-pointer"
                    title={`Reset ${colorTarget} color to original purple`}
                  >
                    <RotateCcw size={10} /> Reset
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-1" role="group" aria-label={`${colorTarget} color presets`}>
                {themeOptions.map((theme) => {
                  const isSelected = !isCustom && currentTheme === theme.id;
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      aria-pressed={isSelected}
                      title={theme.description}
                      onClick={() => handlePresetSelect(theme.id)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
                        isSelected
                          ? 'bg-slate-100 text-slate-900 font-semibold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="h-3.5 w-3.5 rounded-full border border-black/10 shrink-0 shadow-2xs"
                          style={{ backgroundColor: colorTarget === 'dark' && theme.id !== 'logo' ? (theme.id === 'current' ? '#100a21' : hslToHex(theme.hue, 53, 8.4)) : theme.color }}
                          aria-hidden="true"
                        />
                        <span className="truncate">{theme.id === 'current' ? 'Original purple' : theme.name}</span>
                        {theme.id === 'logo' && <span className="text-[9px] font-mono text-slate-500">{LOGO_GREEN}</span>}
                      </div>
                      {isSelected && (
                        <Check
                          size={13}
                          className="stroke-[3] shrink-0"
                          style={{ color: theme.color }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: OPACITY SLIDER & QUICK PRESETS */}
          {activeTab === 'opacity' && (
            <div>
              {/* Active Color Info Box */}
              <div className="mb-3 px-2.5 py-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-4 w-4 rounded-full border border-black/15 shadow-2xs shrink-0"
                      style={{
                        backgroundColor: activeColorHex,
                        opacity: opacity / 100,
                      }}
                    />
                    <span className="text-xs font-semibold text-slate-800">
                      {isCustom ? 'Custom Hue' : activePreset?.name || 'Theme Color'}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {opacity}%
                  </span>
                </div>

                {/* Transparency Slider with Gradient Track */}
                <div className="relative flex items-center py-1.5">
                  <input
                    type="range"
                    min={15}
                    max={100}
                    value={opacity}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      startTransition(() => handleOpacityChange(val));
                    }}
                    aria-label="Theme opacity slider"
                    className="theme-control-slider w-full h-3.5 rounded-full appearance-none cursor-pointer outline-none shadow-inner"
                    style={{
                      background: `linear-gradient(to right, rgba(255,255,255,0.15), ${activeColorHex})`,
                    }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mt-1 px-0.5">
                  <span>15% Soft</span>
                  <span>50% Medium</span>
                  <span>100% Solid</span>
                </div>
              </div>

              {/* Quick Opacity Presets */}
              <div className="mb-2">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-0.5 block mb-1.5">
                  Quick Opacity Presets
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { label: '100% Solid', val: 100 },
                    { label: '85% Crisp', val: 85 },
                    { label: '70% Vibrant', val: 70 },
                    { label: '50% Medium', val: 50 },
                    { label: '35% Soft', val: 35 },
                    { label: '20% Tint', val: 20 },
                  ].map((preset) => {
                    const isSelected = opacity === preset.val;
                    return (
                      <button
                        key={preset.val}
                        type="button"
                        onClick={() => handleOpacityChange(preset.val)}
                        className={`px-2 py-1.5 rounded-md text-[11px] font-medium transition-colors text-center cursor-pointer border ${
                          isSelected
                            ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                <span>Zero page reload</span>
                <button
                  type="button"
                  onClick={() => handleOpacityChange(100)}
                  className="text-slate-500 hover:text-slate-800 font-semibold cursor-pointer underline"
                >
                  Reset to 100%
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
