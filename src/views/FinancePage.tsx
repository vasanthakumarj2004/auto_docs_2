'use client';
import React from 'react';
import { DeskPage } from '../components/desk/DeskPage';

export const BANK_PARTNERS_LABEL = 'via your bank';

export const FinancePage: React.FC = () => {
  return <DeskPage desk="finance" />;
};
