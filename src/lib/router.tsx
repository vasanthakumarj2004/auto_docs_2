'use client';

import React, { createContext, useContext } from 'react';
import { usePathname, useRouter as useNextRouter } from 'next/navigation';

interface RouterContextType {
  currentPath: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextType>({
  currentPath: '/',
  navigate: () => {},
});

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname() || '/';
  const nextRouter = useNextRouter();

  const navigate = (to: string) => {
    if (to.startsWith('#')) {
      if (pathname !== '/') {
        nextRouter.push('/' + to);
      } else {
        const el = document.getElementById(to.slice(1));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    nextRouter.push(to);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <RouterContext.Provider value={{ currentPath: pathname, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => useContext(RouterContext);
