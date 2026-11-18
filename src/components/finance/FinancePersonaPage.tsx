'use client';

import React from 'react';
import { LandingNavigation } from '../LandingNavigation';
import { ShipsyFooter } from '../ShipsyFooter';
import type { PersonaData } from '../../content/financePersonas';
import layoutStyles from '../LandingPage.module.css';
import s from './FinancePersonaPage.module.css';
import { BusinessOwnersPage } from './BusinessOwnersPage';
import { FinanceTeamsPage } from './FinanceTeamsPage';
import { CaFirmsPage } from './CaFirmsPage';
import { AccountsTeamsPage } from './AccountsTeamsPage';

interface FinancePersonaPageProps {
  persona: PersonaData['slug'];
}

export function FinancePersonaPage({ persona }: FinancePersonaPageProps) {
  let ContentComponent = BusinessOwnersPage;
  if (persona === 'finance-teams') {
    ContentComponent = FinanceTeamsPage;
  } else if (persona === 'ca-firms') {
    ContentComponent = CaFirmsPage;
  } else if (persona === 'accounts-teams') {
    ContentComponent = AccountsTeamsPage;
  } else {
    ContentComponent = BusinessOwnersPage;
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
