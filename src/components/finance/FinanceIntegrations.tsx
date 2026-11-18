'use client';

import React from 'react';
import { financeIntegrations } from '../../content/finance';
import base from '../LandingPage.module.css';
import styles from './FinanceIntegrations.module.css';

export function FinanceIntegrations() {
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
          {financeIntegrations.items.map((item) => (
            <article
              key={item.key}
              className={`${styles.card} ${item.isMain ? styles.cardMain : ''}`}
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
          ))}
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
