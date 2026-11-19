'use client';

import React from 'react';
import { Clock, TrendingUp, MailCheck, type LucideIcon } from 'lucide-react';
import { logisticsStats, logisticsStatsSource } from '../../content/logisticsOverview';
import styles from './LogisticsStatStrip.module.css';

const statIcons: LucideIcon[] = [Clock, TrendingUp, MailCheck];

export function LogisticsStatStrip() {
  return (
    <section className={styles.statStrip} aria-label="Results">
      <div className="site-shell">
        <div className={styles.eyebrow}>
          <span>Rate desk results at a glance</span>
        </div>
        <div className={styles.stats}>
          {logisticsStats.map((stat, idx) => {
            const Icon = statIcons[idx % statIcons.length];
            return (
              <div key={stat.metric} className={styles.outcomeCard}>
                <span className={styles.outcomeIconBadge} aria-hidden="true">
                  <Icon size={20} className="stroke-[2.2]" />
                </span>
                <div className={styles.outcomeCardContent}>
                  <span className={styles.statValue}>{stat.metric}</span>
                  <p className={styles.outcomeCopy}>{stat.copy}</p>
                </div>
              </div>
            );
          })}
        </div>
        <p className={styles.source}>{logisticsStatsSource}</p>
      </div>
    </section>
  );
}
