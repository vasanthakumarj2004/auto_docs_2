'use client';

import React from 'react';
import { Clock, FileCheck2, ShieldCheck, type LucideIcon } from 'lucide-react';
import { financeStats } from '../../content/finance';
import styles from './FinanceStatStrip.module.css';

const statIcons: LucideIcon[] = [Clock, FileCheck2, ShieldCheck];

export function FinanceStatStrip() {
  return (
    <section className={styles.statStrip} aria-labelledby="finance-stats-title">
      <div className="site-shell">
        <h2 id="finance-stats-title" className={styles.eyebrow}>
          Finance Desk at a glance
        </h2>
        <div className={styles.stats}>
          {financeStats.map((stat, idx) => {
            const Icon = statIcons[idx % statIcons.length];
            return (
              <div key={stat.metric} className={styles.outcomeCard}>
                <span className={styles.outcomeIconBadge} aria-hidden="true">
                  <Icon size={20} className="stroke-[2.2]" />
                </span>
                <div className={styles.outcomeCardContent}>
                  <p className={styles.statValue}>{stat.metric}</p>
                  <p className={styles.outcomeCopy}>{stat.copy}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
