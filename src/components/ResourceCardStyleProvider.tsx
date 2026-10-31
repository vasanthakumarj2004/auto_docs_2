'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export const RESOURCE_CARD_STYLES = [
  { id: 'original', name: 'Original', description: 'Your current menu and rotating desk card' },
  { id: 'editorial', name: 'Editorial', description: 'Clean text links with a dark feature panel' },
  { id: 'icons', name: 'Icon grid', description: 'Six spacious tiles with clear visual cues' },
  { id: 'directory', name: 'Directory', description: 'A compact, organized three-column menu' },
  { id: 'spotlight', name: 'Spotlight', description: 'A product image with a focused call to action' },
  { id: 'dark', name: 'Dark columns', description: 'Dark surfaces and understated dividers' },
] as const;
export type ResourceCardStyle = typeof RESOURCE_CARD_STYLES[number]['id'];
export const RESOURCE_CARD_STORAGE_KEY = 'docsynecx-resource-card-style';
export const RESOURCE_PREVIEW_EVENT = 'docsynecx:preview-resources';
export const isResourceCardStyle = (value: unknown): value is ResourceCardStyle => RESOURCE_CARD_STYLES.some(style => style.id === value);
const Context = createContext<{ cardStyle: ResourceCardStyle; setCardStyle: (value: ResourceCardStyle) => void }>({ cardStyle: 'original', setCardStyle: () => {} });

export function ResourceCardStyleProvider({ children }: { children: React.ReactNode }) {
  const [cardStyle, updateStyle] = useState<ResourceCardStyle>('original');
  useEffect(() => {
    try {
      const saved = localStorage.getItem(RESOURCE_CARD_STORAGE_KEY);
      if (isResourceCardStyle(saved)) updateStyle(saved);
    } catch {}
    const sync = (event: StorageEvent) => {
      if (event.key === RESOURCE_CARD_STORAGE_KEY || event.key === null) updateStyle(isResourceCardStyle(event.newValue) ? event.newValue : 'original');
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);
  const setCardStyle = (value: ResourceCardStyle) => {
    updateStyle(value);
    try { localStorage.setItem(RESOURCE_CARD_STORAGE_KEY, value); } catch {}
  };
  return <Context.Provider value={{ cardStyle, setCardStyle }}>{children}</Context.Provider>;
}
export const useResourceCardStyle = () => useContext(Context);
