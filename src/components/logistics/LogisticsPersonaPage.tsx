'use client';

import React from 'react';
import { LandingNavigation } from '../LandingNavigation';
import { ShipsyFooter } from '../ShipsyFooter';
import type { LogisticsPersonaSlug } from '../../content/logisticsPersonas';
import layoutStyles from '../LandingPage.module.css';
import s from '../finance/FinancePersonaPage.module.css';
import { FreightForwardersPage } from './FreightForwardersPage';
import { PricingSourcingPage } from './PricingSourcingPage';
import { OperationsTeamPage } from './OperationsTeamPage';

interface LogisticsPersonaPageProps {
  persona: LogisticsPersonaSlug;
}

export function LogisticsPersonaPage({ persona }: LogisticsPersonaPageProps) {
  let ContentComponent = FreightForwardersPage;
  if (persona === 'pricing-sourcing') {
    ContentComponent = PricingSourcingPage;
  } else if (persona === 'operations-team') {
    ContentComponent = OperationsTeamPage;
  } else {
    ContentComponent = FreightForwardersPage;
  }

  return (
    <div className={`${layoutStyles.page} ${s.page}`}>
      <a href="#main-content" className={s.skipLink}>
        Skip to content
      </a>
      <LandingNavigation />

      <main id="main-content">
        <ContentComponent />
      </main>

      <ShipsyFooter />
    </div>
  );
}
