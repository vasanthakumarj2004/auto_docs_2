'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type LandingLayout = 'v1' | 'v2';
export type LandingAppearance = 'light' | 'dark';
export type NavbarTheme = 'light' | 'dark';

const storageKey = 'autodocs-landing-layout';
const appearanceKey = 'autodocs-v2-appearance';
const navbarThemeKey = 'autodocs-navbar-theme';

const LayoutContext = createContext<{
  layout: LandingLayout;
  setLayout: (layout: LandingLayout) => void;
  appearance: LandingAppearance;
  setAppearance: (appearance: LandingAppearance) => void;
  navbarTheme: NavbarTheme;
  setNavbarTheme: (theme: NavbarTheme) => void;
}>({
  layout: 'v2',
  setLayout: () => {},
  appearance: 'dark',
  setAppearance: () => {},
  navbarTheme: 'dark',
  setNavbarTheme: () => {},
});

export function LandingLayoutProvider({ children }: { children: React.ReactNode }) {
  const [layout, updateLayout] = useState<LandingLayout>('v2');
  const [appearance, updateAppearance] = useState<LandingAppearance>('dark');
  const [navbarTheme, updateNavbarTheme] = useState<NavbarTheme>('dark');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved === 'v1' || saved === 'v2') updateLayout(saved);
      const savedAppearance = localStorage.getItem(appearanceKey);
      if (savedAppearance === 'light' || savedAppearance === 'dark') updateAppearance(savedAppearance);
      const savedNavbarTheme = localStorage.getItem(navbarThemeKey);
      if (savedNavbarTheme === 'light' || savedNavbarTheme === 'dark') {
        updateNavbarTheme(savedNavbarTheme);
      } else if (savedAppearance === 'light') {
        updateNavbarTheme('dark');
      }
    } catch { /* Layout switching also works when storage is unavailable. */ }
    const sync = (event: StorageEvent) => {
      if (event.key === storageKey) updateLayout(event.newValue === 'v1' ? 'v1' : 'v2');
      if (event.key === appearanceKey) updateAppearance(event.newValue === 'light' ? 'light' : 'dark');
      if (event.key === navbarThemeKey) updateNavbarTheme(event.newValue === 'light' ? 'light' : 'dark');
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  const setLayout = (value: LandingLayout) => {
    updateLayout(value);
    try { localStorage.setItem(storageKey, value); } catch {}
  };

  const setAppearance = (value: LandingAppearance) => {
    updateAppearance(value);
    try { localStorage.setItem(appearanceKey, value); } catch {}
  };

  const setNavbarTheme = (value: NavbarTheme) => {
    updateNavbarTheme(value);
    try { localStorage.setItem(navbarThemeKey, value); } catch {}
  };

  return (
    <LayoutContext.Provider value={{ layout, setLayout, appearance, setAppearance, navbarTheme, setNavbarTheme }}>
      {children}
    </LayoutContext.Provider>
  );
}

export const useLandingLayout = () => useContext(LayoutContext);
