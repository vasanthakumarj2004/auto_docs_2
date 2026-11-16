'use client';

import React from 'react';
import { LandingNavigation } from '../LandingNavigation';
import { ShipsyFooter } from '../ShipsyFooter';
import s from './LegalPage.module.css';

export interface LegalPageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function LegalPageLayout({ title, children }: LegalPageLayoutProps) {
  return (
    <div className={s.pageWrapper}>
      <LandingNavigation />

      <main className={s.mainContainer}>
        <div className={s.legalPage}>
          <h1 className={s.pageTitle}>{title}</h1>
          <div className={s.contentFlow}>
            {children}
          </div>
        </div>
      </main>

      <ShipsyFooter />
    </div>
  );
}
