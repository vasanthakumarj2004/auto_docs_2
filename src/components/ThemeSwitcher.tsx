'use client';

import React, { useState, useEffect, useRef, useTransition } from 'react';
import { Palette, Check, X, RotateCcw, Sun, Moon, Droplet, Plus, Trash2, Paintbrush } from 'lucide-react';
import {
  applyDarkTheme,
  DARK_THEME_KEY,
  DEFAULT_DARK_THEME,
  LOGO_DARK_THEME,
  LOGO_GREEN,
  parseDarkTheme,
  type DarkTheme,
} from '../lib/darkTheme';

export interface ThemeOption {
  id: string;
  name: string;
  color: string;
  hue: number;
  description: string;
  isCustom?: boolean;
}

export interface BgOption {
  id: string;
  name: string;
  color: string;
  description?: string;
  isCustom?: boolean;
}

export const THEME_OPTIONS: ThemeOption[] = [
  { id: 'violet', name: 'Royal Violet', color: '#8B32F7', hue: 267, description: 'Optional Royal Violet palette' },
  { id: 'logo', name: 'Logo theme', color: LOGO_GREEN, hue: LOGO_DARK_THEME.hue, description: `Docsynecx logo green (${LOGO_GREEN})` },
  { id: 'green', name: 'Green', color: '#18CB96', hue: 162, description: 'Fresh Mint (#18CB96)' },
  { id: 'light-green', name: 'Light Green', color: '#18CB96', hue: 162, description: 'Mint Pastel (#18CB96)' },
  { id: 'red', name: 'Red', color: '#DC2626', hue: 0, description: 'Bold Crimson Red' },
  { id: 'blue', name: 'Blue', color: '#2563EB', hue: 221, description: 'Classic Enterprise Blue' },
  { id: 'yellow', name: 'Yellow', color: '#D97706', hue: 36, description: 'Warm Amber & Gold' },
  { id: 'orange', name: 'Orange', color: '#EA580C', hue: 21, description: 'Vibrant Sunset Orange' },
];

export const DEFAULT_BG_OPTIONS: BgOption[] = [
  { id: 'alabaster', name: 'Warm Alabaster', color: '#F7F5F0', description: 'Hero section default warm background' },
  { id: 'paper', name: 'Clean Paper', color: '#FAFAFA', description: 'Subtle clean off-white' },
  { id: 'white', name: 'Pure White', color: '#FFFFFF', description: 'Crisp bright modern white' },
  { id: 'cream', name: 'Soft Cream', color: '#FDFBF7', description: 'Gentle warm cream surface' },
  { id: 'slate', name: 'Slate Frost', color: '#F1F5F9', description: 'Cool contemporary slate' },
  { id: 'ice', name: 'Mint Ice', color: '#F0FDF4', description: 'Subtle fresh mint tint' },
];

const DARK_THEME_OPTIONS: ThemeOption[] = THEME_OPTIONS.map((theme) =>
  theme.id === 'violet' ? { ...theme, id: 'current', name: 'Original purple' } : theme
);

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
  '--landing-green',
];

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const cleanHex = hex.replace('#', '').trim();
  if (cleanHex.length === 3) {
    return {
      r: parseInt(cleanHex[0] + cleanHex[0], 16),
      g: parseInt(cleanHex[1] + cleanHex[1], 16),
      b: parseInt(cleanHex[2] + cleanHex[2], 16),
    };
  }
  if (cleanHex.length === 6) {
    return {
      r: parseInt(cleanHex.slice(0, 2), 16),
      g: parseInt(cleanHex.slice(2, 4), 16),
      b: parseInt(cleanHex.slice(4, 6), 16),
    };
  }
  return null;
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) =>
    Math.round(Math.max(0, Math.min(255, n)))
      .toString(16)
      .padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
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

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h = Math.round(h * 60);
  }
  return { h, s: Math.round(s * 100), l: Math.round(l * 100) };
}

function normalizeHex(input: string): string | null {
  let clean = input.trim();
  if (!clean.startsWith('#')) clean = `#${clean}`;
  if (/^#[0-9A-Fa-f]{6}$/.test(clean)) return clean.toUpperCase();
  if (/^#[0-9A-Fa-f]{3}$/.test(clean)) {
    const r = clean[1];
    const g = clean[2];
    const b = clean[3];
    return `#${r}${r}${g}${g}${b}${b}`.toUpperCase();
  }
  return null;
}

export const ThemeSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [colorTarget, setColorTarget] = useState<'brand' | 'bg' | 'dark'>('brand');
  const [activeTab, setActiveTab] = useState<'color' | 'opacity'>('color');

  // Brand color state
  const [currentTheme, setCurrentTheme] = useState('logo');
  const [brandHex, setBrandHex] = useState<string>(LOGO_GREEN);
  const [sliderHue, setSliderHue] = useState<number>(LOGO_DARK_THEME.hue);
  const [opacity, setOpacity] = useState<number>(100);
  const [isCustom, setIsCustom] = useState(false);
  const [customBrandOptions, setCustomBrandOptions] = useState<ThemeOption[]>([]);
  const [showAddBrandForm, setShowAddBrandForm] = useState(false);
  const [newBrandHex, setNewBrandHex] = useState('#18CB96');
  const [newBrandName, setNewBrandName] = useState('');

  // Background color state
  const [currentBgId, setCurrentBgId] = useState<string>('alabaster');
  const [currentBgHex, setCurrentBgHex] = useState<string>('#F7F5F0');
  const [customBgOptions, setCustomBgOptions] = useState<BgOption[]>([]);
  const [showAddBgForm, setShowAddBgForm] = useState(false);
  const [newBgHex, setNewBgHex] = useState('#F7F5F0');
  const [newBgName, setNewBgName] = useState('');

  // Dark surface state
  const [darkTheme, setDarkTheme] = useState<DarkTheme>(DEFAULT_DARK_THEME);

  const [, startTransition] = useTransition();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Load custom saved colors from localStorage
  useEffect(() => {
    try {
      const savedCustomBrands = localStorage.getItem('autodocs-custom-brand-list');
      if (savedCustomBrands) {
        setCustomBrandOptions(JSON.parse(savedCustomBrands));
      }
    } catch {}

    try {
      const savedCustomBgs = localStorage.getItem('autodocs-custom-bg-list');
      if (savedCustomBgs) {
        setCustomBgOptions(JSON.parse(savedCustomBgs));
      }
    } catch {}

    try {
      const savedBgHex = localStorage.getItem('autodocs-bg-color');
      const savedBgId = localStorage.getItem('autodocs-bg-id');
      if (savedBgHex) {
        setCurrentBgHex(savedBgHex);
        setCurrentBgId(savedBgId || 'custom-bg');
        applyBackgroundColor(savedBgHex);
      }
    } catch {}
  }, []);

  // Sync dark theme
  useEffect(() => {
    let saved = DEFAULT_DARK_THEME;
    try {
      saved = parseDarkTheme(localStorage.getItem(DARK_THEME_KEY));
    } catch {}
    setDarkTheme(saved);
    applyDarkTheme(saved);

    const sync = (event: StorageEvent) => {
      if (event.key === DARK_THEME_KEY && event.newValue) {
        const next = parseDarkTheme(event.newValue);
        setDarkTheme(next);
        applyDarkTheme(next);
      }
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  // Live apply Brand Color
  const applyBrandStyle = (
    themeId: string,
    hex: string,
    alphaPercent: number,
    isCustomMode: boolean
  ) => {
    if (typeof document === 'undefined') return;
    const rootStyle = document.documentElement.style;
    const rgb = hexToRgb(hex);
    if (!rgb) return;

    const alpha = Math.max(0.05, Math.min(1, alphaPercent / 100));
    const brandRgba = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;

    // Compute strong (darker) shade
    const strongR = Math.max(0, Math.round(rgb.r * 0.85));
    const strongG = Math.max(0, Math.round(rgb.g * 0.85));
    const strongB = Math.max(0, Math.round(rgb.b * 0.85));
    const strongRgba = `rgba(${strongR}, ${strongG}, ${strongB}, ${alpha})`;

    // Compute soft tint (background highlight)
    const softRgba = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${Math.min(1, alpha * 0.12)})`;
    const borderRgba = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${Math.min(1, alpha * 0.35 + 0.1)})`;

    // Set attributes & CSS variables
    if (isCustomMode) {
      document.documentElement.setAttribute('data-theme', 'custom');
    } else {
      document.documentElement.setAttribute('data-theme', themeId);
    }

    rootStyle.setProperty('--color-brand', brandRgba);
    rootStyle.setProperty('--color-brand-500', brandRgba);
    rootStyle.setProperty('--color-brand-strong', strongRgba);
    rootStyle.setProperty('--color-brand-soft', softRgba);
    rootStyle.setProperty('--color-brand-border', borderRgba);
    rootStyle.setProperty('--color-brand-text', hex);
    rootStyle.setProperty('--color-brand-50', softRgba);
    rootStyle.setProperty('--color-brand-100', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.18)`);
    rootStyle.setProperty('--color-brand-200', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.32)`);
    rootStyle.setProperty('--color-brand-400', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.70)`);
    rootStyle.setProperty('--color-brand-800', strongRgba);
    rootStyle.setProperty(
      '--color-brand-900',
      `rgba(${Math.max(0, Math.round(rgb.r * 0.6))}, ${Math.max(0, Math.round(rgb.g * 0.6))}, ${Math.max(0, Math.round(rgb.b * 0.6))}, ${alpha})`
    );
    rootStyle.setProperty('--landing-green', brandRgba);

    try {
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      if (themeId.startsWith('custom-brand-')) {
        localStorage.setItem('autodocs-theme', themeId);
      } else if (isCustomMode) {
        localStorage.setItem('autodocs-theme', `custom:${hsl.h}`);
      } else {
        localStorage.setItem('autodocs-theme', themeId);
      }
      localStorage.setItem('autodocs-theme-opacity', String(alphaPercent));
      localStorage.setItem('autodocs-brand-hex', hex);
    } catch {}
  };

  // Live apply Background Color
  const applyBackgroundColor = (hex: string) => {
    if (typeof document === 'undefined') return;
    const rootStyle = document.documentElement.style;
    rootStyle.setProperty('--color-hero-bg', hex);
    rootStyle.setProperty('--landing-bg', hex);
    rootStyle.setProperty('--color-paper', hex);
    if (document.body) {
      document.body.style.backgroundColor = hex;
    }
  };

  // Initialize theme on mount
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem('autodocs-theme');
      const savedTheme = !storedTheme || storedTheme === 'current' ? 'logo' : storedTheme;
      const savedOpacity = localStorage.getItem('autodocs-theme-opacity');
      const parsedOpacity = Number(savedOpacity ?? 100);
      const initialOpacity = Number.isFinite(parsedOpacity)
        ? Math.max(15, Math.min(100, parsedOpacity))
        : 100;
      setOpacity(initialOpacity);

      let customBrands: ThemeOption[] = [];
      try {
        const rawBrands = localStorage.getItem('autodocs-custom-brand-list');
        if (rawBrands) customBrands = JSON.parse(rawBrands);
      } catch {}

      const allBrands = [...THEME_OPTIONS, ...customBrands];
      const match = allBrands.find((t) => t.id === savedTheme);
      const savedBrandHex = localStorage.getItem('autodocs-brand-hex');

      if (match) {
        setBrandHex(match.color);
        setSliderHue(match.hue);
        setCurrentTheme(match.id);
        setIsCustom(!!match.isCustom);
        applyBrandStyle(match.id, match.color, initialOpacity, !!match.isCustom);
      } else if (savedBrandHex && savedBrandHex.startsWith('#')) {
        const rgb = hexToRgb(savedBrandHex);
        const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : { h: 162, s: 70, l: 50 };
        setBrandHex(savedBrandHex);
        setSliderHue(hsl.h);
        setIsCustom(true);
        setCurrentTheme(savedTheme && savedTheme.startsWith('custom') ? savedTheme : 'custom');
        applyBrandStyle(
          savedTheme && savedTheme.startsWith('custom') ? savedTheme : 'custom',
          savedBrandHex,
          initialOpacity,
          true
        );
      } else if (savedTheme && savedTheme.startsWith('custom:')) {
        const hueVal = parseInt(savedTheme.split(':')[1], 10);
        if (Number.isFinite(hueVal) && hueVal >= 0 && hueVal <= 360) {
          const hex = hslToHex(hueVal, 92, 54);
          setSliderHue(hueVal);
          setBrandHex(hex);
          setIsCustom(true);
          setCurrentTheme('custom');
          applyBrandStyle('custom', hex, initialOpacity, true);
        } else {
          applyBrandStyle('logo', LOGO_GREEN, initialOpacity, false);
        }
      } else {
        applyBrandStyle('logo', LOGO_GREEN, initialOpacity, false);
      }
    } catch {
      applyBrandStyle('logo', LOGO_GREEN, 100, false);
    }
  }, []);

  // Update dark theme
  const updateDarkTheme = (theme: DarkTheme) => {
    setDarkTheme(theme);
    applyDarkTheme(theme);
    try {
      localStorage.setItem(DARK_THEME_KEY, JSON.stringify(theme));
    } catch {}
  };

  // Handle hue slider change
  const handleHueChange = (newHue: number) => {
    if (colorTarget === 'dark') {
      updateDarkTheme({ id: 'custom', hue: newHue });
      return;
    }
    const hex = hslToHex(newHue, 92, 54);
    setSliderHue(newHue);
    setBrandHex(hex);
    setIsCustom(true);
    setCurrentTheme('custom');
    applyBrandStyle('custom', hex, opacity, true);
  };

  // Handle opacity slider change
  const handleOpacityChange = (newOpacity: number) => {
    if (colorTarget === 'dark') return;
    setOpacity(newOpacity);
    applyBrandStyle(currentTheme, brandHex, newOpacity, isCustom);
  };

  // Select brand preset
  const handleBrandSelect = (theme: ThemeOption) => {
    setCurrentTheme(theme.id);
    setBrandHex(theme.color);
    setSliderHue(theme.hue);
    setIsCustom(!!theme.isCustom);
    applyBrandStyle(theme.id, theme.color, opacity, !!theme.isCustom);
  };

  // Add new custom brand color
  const handleAddBrandColor = () => {
    const validHex = normalizeHex(newBrandHex);
    if (!validHex) return;

    const rgb = hexToRgb(validHex);
    const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : { h: 162, s: 70, l: 50 };
    const name = newBrandName.trim() || `Custom ${validHex}`;
    const newOption: ThemeOption = {
      id: `custom-brand-${Date.now()}`,
      name,
      color: validHex,
      hue: hsl.h,
      description: `Custom color ${validHex}`,
      isCustom: true,
    };

    const updated = [newOption, ...customBrandOptions];
    setCustomBrandOptions(updated);
    try {
      localStorage.setItem('autodocs-custom-brand-list', JSON.stringify(updated));
    } catch {}

    // Immediately select and apply it
    handleBrandSelect(newOption);
    setShowAddBrandForm(false);
    setNewBrandName('');
  };

  // Delete custom brand color
  const handleDeleteBrandColor = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = customBrandOptions.filter((o) => o.id !== id);
    setCustomBrandOptions(updated);
    try {
      localStorage.setItem('autodocs-custom-brand-list', JSON.stringify(updated));
    } catch {}

    if (currentTheme === id) {
      handleBrandSelect(THEME_OPTIONS[1]); // fallback to logo
    }
  };

  // Select background preset
  const handleBgSelect = (bg: BgOption) => {
    setCurrentBgId(bg.id);
    setCurrentBgHex(bg.color);
    applyBackgroundColor(bg.color);
    try {
      localStorage.setItem('autodocs-bg-color', bg.color);
      localStorage.setItem('autodocs-bg-id', bg.id);
    } catch {}
  };

  // Add new custom background color
  const handleAddBgColor = () => {
    const validHex = normalizeHex(newBgHex);
    if (!validHex) return;

    const name = newBgName.trim() || `Custom ${validHex}`;
    const newOption: BgOption = {
      id: `custom-bg-${Date.now()}`,
      name,
      color: validHex,
      description: `Custom background ${validHex}`,
      isCustom: true,
    };

    const updated = [newOption, ...customBgOptions];
    setCustomBgOptions(updated);
    try {
      localStorage.setItem('autodocs-custom-bg-list', JSON.stringify(updated));
    } catch {}

    // Immediately select and apply it
    handleBgSelect(newOption);
    setShowAddBgForm(false);
    setNewBgName('');
  };

  // Delete custom background color
  const handleDeleteBgColor = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = customBgOptions.filter((o) => o.id !== id);
    setCustomBgOptions(updated);
    try {
      localStorage.setItem('autodocs-custom-bg-list', JSON.stringify(updated));
    } catch {}

    if (currentBgId === id) {
      handleBgSelect(DEFAULT_BG_OPTIONS[0]); // fallback to alabaster
    }
  };

  // Close popup on click outside
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

  const activeColorPreview =
    colorTarget === 'bg'
      ? currentBgHex
      : colorTarget === 'dark'
      ? darkTheme.id === 'current'
        ? '#100A21'
        : hslToHex(darkTheme.hue, 53, 8.4)
      : brandHex;

  return (
    <div ref={panelRef} className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-50 select-none">
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

      {/* Floating launcher button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Theme & color switcher"
        aria-expanded={isOpen}
        aria-controls="theme-studio"
        title="Theme & Colors"
        className="h-8 w-8 sm:h-9 sm:w-9 rounded-full border border-slate-300/80 bg-white/80 backdrop-blur-md shadow-md opacity-70 hover:opacity-100 hover:border-slate-500 hover:shadow-lg transition-all flex items-center justify-center text-slate-700 hover:text-slate-900 cursor-pointer"
      >
        <Palette size={16} className="stroke-[2.2]" />
      </button>

      {/* Flyout panel */}
      {isOpen && (
        <div
          id="theme-studio"
          role="dialog"
          aria-label="Theme options"
          className="absolute bottom-10 right-0 sm:bottom-11 sm:right-0 w-[340px] max-w-[calc(100vw-24px)] max-h-[calc(100svh-72px)] overflow-y-auto rounded-2xl border border-slate-200/90 bg-white text-slate-800 shadow-2xl p-4 animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase font-bold text-slate-600 tracking-wider">
                Theme Studio
              </span>
              <span
                className="h-3.5 w-3.5 rounded-full border border-black/15 shrink-0 transition-all shadow-xs"
                style={{
                  backgroundColor: activeColorPreview,
                  opacity: colorTarget === 'brand' ? opacity / 100 : 1,
                }}
              />
            </div>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                triggerRef.current?.focus();
              }}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-md cursor-pointer transition-colors"
              aria-label="Close theme menu"
            >
              <X size={15} />
            </button>
          </div>

          {/* 3 Main Modes: Brand Color / Background / Dark Surface */}
          <div className="grid grid-cols-3 gap-1.5 p-1 mb-2.5 rounded-xl bg-slate-100 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setColorTarget('brand');
                setActiveTab('color');
              }}
              className={`py-1.5 px-2 rounded-lg transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 ${
                colorTarget === 'brand'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Paintbrush size={12} />
              <span>Brand</span>
            </button>

            <button
              type="button"
              onClick={() => setColorTarget('bg')}
              className={`py-1.5 px-2 rounded-lg transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 ${
                colorTarget === 'bg'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sun size={12} />
              <span>Background</span>
            </button>

            <button
              type="button"
              onClick={() => setColorTarget('dark')}
              className={`py-1.5 px-2 rounded-lg transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 ${
                colorTarget === 'dark'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Moon size={12} />
              <span>Dark Surface</span>
            </button>
          </div>

          {/* ========================================================= */}
          {/* 1. BRAND COLOR TARGET                                     */}
          {/* ========================================================= */}
          {colorTarget === 'brand' && (
            <div>
              {/* Sub-tab: Color vs Opacity */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <p className="text-[11px] leading-tight text-slate-500">
                  Custom accents, badges, highlights & brand glows.
                </p>
                <div className="flex rounded-md bg-slate-100 p-0.5 text-[11px] font-semibold shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveTab('color')}
                    className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                      activeTab === 'color' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                    }`}
                  >
                    Color
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('opacity')}
                    className={`px-2 py-0.5 rounded transition-all cursor-pointer flex items-center gap-1 ${
                      activeTab === 'opacity' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                    }`}
                  >
                    <span>{opacity}%</span>
                  </button>
                </div>
              </div>

              {activeTab === 'color' && (
                <div>
                  {/* Spectrum Slider Box */}
                  <div className="mb-3 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Color Spectrum
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span
                          className="h-3.5 w-3.5 rounded-full border border-black/15 shadow-2xs"
                          style={{ backgroundColor: brandHex, opacity: opacity / 100 }}
                          aria-hidden="true"
                        />
                        <span className="text-[11px] font-mono font-bold text-slate-700">
                          {brandHex}
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
                        aria-label="Brand color hue spectrum"
                        className="theme-control-slider w-full h-3 rounded-full appearance-none cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-500 shadow-inner"
                        style={{
                          background:
                            'linear-gradient(to right, #ff0000 0%, #ff8000 14%, #ffff00 28%, #00ff00 42%, #00ffff 57%, #0077ff 71%, #8800ff 85%, #ff0080 93%, #ff0000 100%)',
                        }}
                      />
                    </div>
                  </div>

                  {/* Header with "+ Add New Color" and "Reset" */}
                  <div className="flex items-center justify-between px-0.5 pb-1 mb-1.5">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Brand Colors ({THEME_OPTIONS.length + customBrandOptions.length})
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setShowAddBrandForm((prev) => !prev)}
                        className="text-[11px] text-brand hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                      >
                        <Plus size={12} /> Add New Color
                      </button>
                      {(isCustom || currentTheme !== 'logo') && (
                        <button
                          type="button"
                          onClick={() => handleBrandSelect(THEME_OPTIONS[1])}
                          className="text-[10px] text-slate-400 hover:text-slate-700 flex items-center gap-1 font-medium cursor-pointer"
                          title="Reset to Docsynecx Logo Green (#18CB96)"
                        >
                          <RotateCcw size={10} /> Reset
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Add New Color Form Drawer */}
                  {showAddBrandForm && (
                    <div className="mb-3 p-3 rounded-xl bg-slate-50 border border-slate-200 animate-in fade-in zoom-in-95 duration-100">
                      <div className="text-xs font-bold text-slate-800 mb-2 flex items-center justify-between">
                        <span>Add Custom Brand Color</span>
                        <button
                          type="button"
                          onClick={() => setShowAddBrandForm(false)}
                          className="text-slate-400 hover:text-slate-600"
                        >
                          <X size={13} />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="color"
                          value={newBrandHex}
                          onChange={(e) => setNewBrandHex(e.target.value.toUpperCase())}
                          className="h-8 w-8 rounded-lg cursor-pointer border border-slate-300 p-0.5 bg-white"
                          title="Choose custom color"
                        />
                        <input
                          type="text"
                          value={newBrandHex}
                          onChange={(e) => setNewBrandHex(e.target.value.toUpperCase())}
                          placeholder="#18CB96"
                          maxLength={7}
                          className="w-24 text-xs font-mono font-semibold px-2 py-1.5 rounded-lg border border-slate-300 bg-white"
                        />
                        <input
                          type="text"
                          value={newBrandName}
                          onChange={(e) => setNewBrandName(e.target.value)}
                          placeholder="Color name (optional)"
                          className="flex-1 text-xs px-2 py-1.5 rounded-lg border border-slate-300 bg-white"
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setShowAddBrandForm(false)}
                          className="px-2.5 py-1 text-xs rounded-md text-slate-600 hover:bg-slate-200 cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleAddBrandColor}
                          className="px-3 py-1 text-xs rounded-md bg-slate-900 text-white font-medium hover:bg-black cursor-pointer shadow-xs"
                        >
                          Add & Apply
                        </button>
                      </div>
                    </div>
                  )}

                  {/* List of Custom Added Brand Colors (if any) */}
                  {customBrandOptions.length > 0 && (
                    <div className="mb-2">
                      <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider block mb-1 px-1">
                        Your Custom Colors
                      </span>
                      <div className="flex flex-col gap-1">
                        {customBrandOptions.map((theme) => {
                          const isSelected = currentTheme === theme.id;
                          return (
                            <div
                              key={theme.id}
                              onClick={() => handleBrandSelect(theme)}
                              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                                isSelected
                                  ? 'bg-slate-100 text-slate-900 font-semibold'
                                  : 'text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span
                                  className="h-3.5 w-3.5 rounded-full border border-black/10 shrink-0 shadow-2xs"
                                  style={{ backgroundColor: theme.color }}
                                  aria-hidden="true"
                                />
                                <span className="truncate">{theme.name}</span>
                                <span className="text-[10px] font-mono text-slate-500">
                                  {theme.color}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                {isSelected && (
                                  <Check
                                    size={13}
                                    className="stroke-[3] shrink-0"
                                    style={{ color: theme.color }}
                                  />
                                )}
                                <button
                                  type="button"
                                  onClick={(e) => handleDeleteBrandColor(theme.id, e)}
                                  className="p-1 text-slate-400 hover:text-red-500 rounded transition-colors"
                                  title="Delete color"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Presets List */}
                  <div className="flex flex-col gap-1">
                    {THEME_OPTIONS.map((theme) => {
                      const isSelected = !isCustom && currentTheme === theme.id;
                      return (
                        <button
                          key={theme.id}
                          type="button"
                          aria-pressed={isSelected}
                          title={theme.description}
                          onClick={() => handleBrandSelect(theme)}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
                            isSelected
                              ? 'bg-slate-100 text-slate-900 font-semibold'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className="h-3.5 w-3.5 rounded-full border border-black/10 shrink-0 shadow-2xs"
                              style={{ backgroundColor: theme.color }}
                              aria-hidden="true"
                            />
                            <span className="truncate">{theme.name}</span>
                            {theme.id === 'logo' && (
                              <span className="text-[9px] font-mono text-slate-500">
                                {LOGO_GREEN}
                              </span>
                            )}
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

              {/* Opacity Tab */}
              {activeTab === 'opacity' && (
                <div>
                  <div className="mb-3 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-4 w-4 rounded-full border border-black/15 shadow-2xs shrink-0"
                          style={{ backgroundColor: brandHex, opacity: opacity / 100 }}
                        />
                        <span className="text-xs font-semibold text-slate-800">
                          Accent Transparency
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {opacity}%
                      </span>
                    </div>

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
                          background: `linear-gradient(to right, rgba(255,255,255,0.15), ${brandHex})`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { label: '100% Solid', val: 100 },
                      { label: '85% Crisp', val: 85 },
                      { label: '70% Vibrant', val: 70 },
                      { label: '50% Medium', val: 50 },
                      { label: '35% Soft', val: 35 },
                      { label: '20% Tint', val: 20 },
                    ].map((preset) => (
                      <button
                        key={preset.val}
                        type="button"
                        onClick={() => handleOpacityChange(preset.val)}
                        className={`px-2 py-1.5 rounded-md text-[11px] font-medium transition-colors text-center cursor-pointer border ${
                          opacity === preset.val
                            ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* 2. BACKGROUND COLOR TARGET                                */}
          {/* ========================================================= */}
          {colorTarget === 'bg' && (
            <div>
              <p className="mb-2 text-[11px] leading-tight text-slate-500">
                Change hero section background and page surface.
              </p>

              {/* Active Background Info */}
              <div className="mb-3 px-3 py-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="h-4 w-4 rounded-full border border-black/15 shadow-2xs shrink-0"
                    style={{ backgroundColor: currentBgHex }}
                  />
                  <span className="text-xs font-semibold text-slate-800">
                    Current Background
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {currentBgHex}
                </span>
              </div>

              {/* Header with "+ Add New Color" and Reset */}
              <div className="flex items-center justify-between px-0.5 pb-1 mb-1.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Background Colors ({DEFAULT_BG_OPTIONS.length + customBgOptions.length})
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddBgForm((prev) => !prev)}
                    className="text-[11px] text-brand hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    <Plus size={12} /> Add New Color
                  </button>
                  {currentBgHex !== '#F7F5F0' && (
                    <button
                      type="button"
                      onClick={() => handleBgSelect(DEFAULT_BG_OPTIONS[0])}
                      className="text-[10px] text-slate-400 hover:text-slate-700 flex items-center gap-1 font-medium cursor-pointer"
                      title="Reset to Warm Alabaster (#F7F5F0)"
                    >
                      <RotateCcw size={10} /> Reset
                    </button>
                  )}
                </div>
              </div>

              {/* Add New Background Color Form */}
              {showAddBgForm && (
                <div className="mb-3 p-3 rounded-xl bg-slate-50 border border-slate-200 animate-in fade-in zoom-in-95 duration-100">
                  <div className="text-xs font-bold text-slate-800 mb-2 flex items-center justify-between">
                    <span>Add Custom Background Color</span>
                    <button
                      type="button"
                      onClick={() => setShowAddBgForm(false)}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <X size={13} />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="color"
                      value={newBgHex}
                      onChange={(e) => setNewBgHex(e.target.value.toUpperCase())}
                      className="h-8 w-8 rounded-lg cursor-pointer border border-slate-300 p-0.5 bg-white"
                      title="Choose background color"
                    />
                    <input
                      type="text"
                      value={newBgHex}
                      onChange={(e) => setNewBgHex(e.target.value.toUpperCase())}
                      placeholder="#F7F5F0"
                      maxLength={7}
                      className="w-24 text-xs font-mono font-semibold px-2 py-1.5 rounded-lg border border-slate-300 bg-white"
                    />
                    <input
                      type="text"
                      value={newBgName}
                      onChange={(e) => setNewBgName(e.target.value)}
                      placeholder="Color name (optional)"
                      className="flex-1 text-xs px-2 py-1.5 rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddBgForm(false)}
                      className="px-2.5 py-1 text-xs rounded-md text-slate-600 hover:bg-slate-200 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleAddBgColor}
                      className="px-3 py-1 text-xs rounded-md bg-slate-900 text-white font-medium hover:bg-black cursor-pointer shadow-xs"
                    >
                      Add & Apply
                    </button>
                  </div>
                </div>
              )}

              {/* List of Custom Added Background Colors (if any) */}
              {customBgOptions.length > 0 && (
                <div className="mb-2">
                  <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider block mb-1 px-1">
                    Your Custom Backgrounds
                  </span>
                  <div className="flex flex-col gap-1">
                    {customBgOptions.map((bg) => {
                      const isSelected = currentBgId === bg.id || currentBgHex === bg.color;
                      return (
                        <div
                          key={bg.id}
                          onClick={() => handleBgSelect(bg)}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-slate-100 text-slate-900 font-semibold'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className="h-3.5 w-3.5 rounded-full border border-black/15 shrink-0 shadow-2xs"
                              style={{ backgroundColor: bg.color }}
                              aria-hidden="true"
                            />
                            <span className="truncate">{bg.name}</span>
                            <span className="text-[10px] font-mono text-slate-500">
                              {bg.color}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {isSelected && (
                              <Check size={13} className="stroke-[3] text-brand shrink-0" />
                            )}
                            <button
                              type="button"
                              onClick={(e) => handleDeleteBgColor(bg.id, e)}
                              className="p-1 text-slate-400 hover:text-red-500 rounded transition-colors"
                              title="Delete background"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Default Presets List */}
              <div className="flex flex-col gap-1">
                {DEFAULT_BG_OPTIONS.map((bg) => {
                  const isSelected = currentBgHex === bg.color;
                  return (
                    <button
                      key={bg.id}
                      type="button"
                      aria-pressed={isSelected}
                      title={bg.description}
                      onClick={() => handleBgSelect(bg)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
                        isSelected
                          ? 'bg-slate-100 text-slate-900 font-semibold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="h-3.5 w-3.5 rounded-full border border-black/15 shrink-0 shadow-2xs"
                          style={{ backgroundColor: bg.color }}
                          aria-hidden="true"
                        />
                        <span className="truncate">{bg.name}</span>
                        <span className="text-[9px] font-mono text-slate-500">{bg.color}</span>
                      </div>
                      {isSelected && (
                        <Check size={13} className="stroke-[3] text-brand shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 3. DARK SURFACE TARGET                                    */}
          {/* ========================================================= */}
          {colorTarget === 'dark' && (
            <div>
              <p className="mb-2 text-[11px] leading-tight text-slate-500">
                Change dark mode hero background and deep surface tones.
              </p>

              {/* Spectrum Slider */}
              <div className="mb-3 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Dark Surface Hue
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="h-3.5 w-3.5 rounded-full border border-black/15 shadow-2xs"
                      style={{ backgroundColor: hslToHex(darkTheme.hue, 53, 8.4) }}
                      aria-hidden="true"
                    />
                    <span className="text-[11px] font-mono font-bold text-slate-700">
                      {darkTheme.id === 'current' ? '#100A21' : hslToHex(darkTheme.hue, 53, 8.4)}
                    </span>
                  </div>
                </div>

                <div className="relative flex items-center py-1">
                  <input
                    type="range"
                    min={0}
                    max={360}
                    value={darkTheme.hue}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      startTransition(() => handleHueChange(val));
                    }}
                    aria-label="Dark background hue slider"
                    className="theme-control-slider w-full h-3 rounded-full appearance-none cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-500 shadow-inner"
                    style={{
                      background:
                        'linear-gradient(to right, #ff0000 0%, #ff8000 14%, #ffff00 28%, #00ff00 42%, #00ffff 57%, #0077ff 71%, #8800ff 85%, #ff0080 93%, #ff0000 100%)',
                    }}
                  />
                </div>
              </div>

              {/* Presets */}
              <div className="flex items-center justify-between px-0.5 pb-1 mb-1.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Presets ({DARK_THEME_OPTIONS.length})
                </span>
                {darkTheme.id !== 'current' && (
                  <button
                    type="button"
                    onClick={() => updateDarkTheme(DEFAULT_DARK_THEME)}
                    className="text-[10px] text-brand hover:underline flex items-center gap-1 font-medium cursor-pointer"
                  >
                    <RotateCcw size={10} /> Reset
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-1">
                {DARK_THEME_OPTIONS.map((theme) => {
                  const isSelected = darkTheme.id === theme.id;
                  const surfaceHex =
                    theme.id === 'current' ? '#100A21' : hslToHex(theme.hue, 53, 8.4);
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => updateDarkTheme({ id: theme.id, hue: theme.hue })}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
                        isSelected
                          ? 'bg-slate-100 text-slate-900 font-semibold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="h-3.5 w-3.5 rounded-full border border-black/10 shrink-0 shadow-2xs"
                          style={{ backgroundColor: surfaceHex }}
                          aria-hidden="true"
                        />
                        <span className="truncate">{theme.name}</span>
                        <span className="text-[9px] font-mono text-slate-500">{surfaceHex}</span>
                      </div>
                      {isSelected && (
                        <Check size={13} className="stroke-[3] text-brand shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
