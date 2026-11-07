'use client';

import React from 'react';
import { Check, Lock } from 'lucide-react';
import styles from './CookieConsent.module.css';

interface CookieCategoryProps {
  id: string;
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  note?: string;
}

export const CookieCategory: React.FC<CookieCategoryProps> = ({
  id,
  name,
  checked,
  onChange,
  disabled = false,
  note,
}) => {
  return (
    <label
      htmlFor={`cookie-cat-${id}`}
      className={`${styles.checkboxRow} ${disabled ? styles.checkboxRowDisabled : ''}`}
    >
      <div className={styles.checkboxControl}>
        <input
          type="checkbox"
          id={`cookie-cat-${id}`}
          checked={checked}
          disabled={disabled}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          className={styles.realCheckbox}
        />
        <span
          className={`${styles.customCheckbox} ${checked ? styles.customCheckboxChecked : ''} ${
            disabled ? styles.customCheckboxDisabled : ''
          }`}
          aria-hidden="true"
        >
          {checked && <Check size={12} strokeWidth={3} className={styles.checkIcon} />}
        </span>
      </div>

      <div className={styles.checkboxLabelGroup}>
        <span className={styles.categoryName}>{name}</span>
        {note && <span className={styles.categoryNote}>{note}</span>}
      </div>

      {disabled && (
        <span className={styles.alwaysOnBadge} title="Essential cookies cannot be disabled">
          <Lock size={10} aria-hidden="true" />
          Always on
        </span>
      )}
    </label>
  );
};
