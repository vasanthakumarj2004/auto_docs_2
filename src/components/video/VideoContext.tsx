'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface VideoContextType {
  activeVideoId: string | null;
  registerPlay: (videoId: string) => void;
  registerPause: (videoId: string) => void;
  saveDataMode: boolean;
  prefersReducedMotion: boolean;
}

const VideoContext = createContext<VideoContextType>({
  activeVideoId: null,
  registerPlay: () => {},
  registerPause: () => {},
  saveDataMode: false,
  prefersReducedMotion: false,
});

export const VideoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [saveDataMode, setSaveDataMode] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    // 1. Check navigator.connection saveData & slow network
    if (typeof navigator !== 'undefined') {
      const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
      if (conn) {
        if (conn.saveData || conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g') {
          setSaveDataMode(true);
        }
      }
    }

    // 2. Check prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  // When a video starts playing, it registers itself here so all other instances pause
  const registerPlay = (videoId: string) => {
    setActiveVideoId(videoId);
  };

  const registerPause = (videoId: string) => {
    setActiveVideoId((current) => (current === videoId ? null : current));
  };

  return (
    <VideoContext.Provider
      value={{
        activeVideoId,
        registerPlay,
        registerPause,
        saveDataMode,
        prefersReducedMotion,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoSystem = () => useContext(VideoContext);
