'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { financeIntegrations } from '../../content/finance';
import base from '../LandingPage.module.css';
import styles from './FinanceIntegrations.module.css';

export function FinanceIntegrations() {
  const [selectedKey, setSelectedKey] = useState<string>('tally');

  const normalizeKey = useCallback((hashOrKey: string): string | null => {
    const clean = hashOrKey.replace(/^[#?]/, '').toLowerCase();
    if (clean.includes('zoho')) return 'zoho';
    if (clean.includes('erp')) return 'erp';
    if (clean.includes('tally')) return 'tally';
    return null;
  }, []);

  useEffect(() => {
    const handleUrlHash = (shouldScroll = false) => {
      if (typeof window === 'undefined') return;
      const matched = normalizeKey(window.location.hash);
      if (matched) {
        setSelectedKey(matched);
        if (shouldScroll) {
          const el = document.getElementById(`integration-${matched}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }
      }
    };

    const timer = setTimeout(() => {
      handleUrlHash(true);
    }, 100);

    const onHashChange = () => handleUrlHash(true);
    const onPopState = () => handleUrlHash(true);

    const onDocumentClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest('a');
      if (link && link.hash) {
        const matched = normalizeKey(link.hash);
        if (matched) {
          setSelectedKey(matched);
          const el = document.getElementById(`integration-${matched}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }
      }
    };

    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('popstate', onPopState);
    document.addEventListener('click', onDocumentClick);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('popstate', onPopState);
      document.removeEventListener('click', onDocumentClick);
    };
  }, [normalizeKey]);

  const handleSelect = (key: string) => {
    setSelectedKey(key);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#integration-${key}`);
    }
  };

  return (
    <section
      id="integrations"
      className={`${base.section} ${styles.section}`}
      aria-labelledby="integrations-title"
    >
      <div className="site-shell">
        <div className={styles.header}>
          <p className={styles.eyebrow}>{financeIntegrations.eyebrow}</p>
          <h2 id="integrations-title" className={styles.headline}>
            {financeIntegrations.headline}
            {'accent' in financeIntegrations && (
              <>
                <br />
                <span>{financeIntegrations.accent}</span>
              </>
            )}
          </h2>
          <p className={styles.subtitle}>{financeIntegrations.description}</p>
        </div>

        <div className={styles.grid}>
          {financeIntegrations.items.map((item) => {
            const isSelected = selectedKey === item.key;
            return (
              <article
                key={item.key}
                id={`integration-${item.key}`}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                onClick={() => handleSelect(item.key)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelect(item.key);
                  }
                }}
                className={`${styles.card} ${isSelected ? styles.cardSelected : ''}`}
              >
                <div className={styles.topRow}>
                  <span className={styles.mark} aria-hidden="true">
                    {item.mark === 'code' ? (
                      <svg
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m8 16-4-4 4-4M16 8l4 4-4 4M14 4l-4 16" />
                      </svg>
                    ) : (
                      item.mark
                    )}
                  </span>
                  {item.badge ? <span className={styles.badge}>{item.badge}</span> : null}
                </div>

                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.description}</p>

                <ul className={styles.bulletList}>
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <p className={styles.note}>
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
            <circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
            <path
              d="M6 10.5l2.5 2.5L14 7.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {financeIntegrations.note}
        </p>
      </div>
    </section>
  );
}
