'use client';

import React from 'react';
import { Cookie } from 'lucide-react';
import { useConsent } from '@/src/context/ConsentContext';
import styles from './CookieConsent.module.css';

interface CookieSettingsButtonProps {
  className?: string;
  showIcon?: boolean;
  label?: string;
}

export const CookieSettingsButton: React.FC<CookieSettingsButtonProps> = ({
  className,
  showIcon = true,
  label = 'Cookie Settings',
}) => {
  const { openSettings } = useConsent();

  return (
    <button
      type="button"
      onClick={openSettings}
      className={className || styles.cookieFooterButton}
      aria-label="Open cookie and privacy settings"
    >
      {showIcon && <Cookie size={13} className={styles.footerButtonIcon} aria-hidden="true" />}
      <span>{label}</span>
    </button>
  );
};
