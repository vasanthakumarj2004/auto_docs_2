'use client';

import React from 'react';
import { Clock, FileCheck2, ShieldCheck, ArrowUpRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import styles from './FinanceStatStrip.module.css';

interface FinanceStatItem {
  metric: string;
  copy: string;
  icon: LucideIcon;
  href?: string;
}

const financeStats: FinanceStatItem[] = [
  {
    metric: 'Minutes',
    copy: 'from connecting Tally to your first approved invoice',
    icon: Clock,
    href: '/finance-desk/invoice-automation/',
  },
  {
    metric: 'GSTIN · HSN · tax',
    copy: 'captured from PDFs, scans and email',
    icon: FileCheck2,
    href: '/finance-desk/invoice-automation/',
  },
  {
    metric: 'Your approval',
    copy: 'before anything posts to TallyPrime',
    icon: ShieldCheck,
    href: '/finance-desk/invoice-automation/',
  },
];

export function FinanceStatStrip() {
  return (
    <section className={styles.statStrip} aria-labelledby="finance-stats-title">
      <div className="site-shell">
        <h2 id="finance-stats-title" className={styles.eyebrow}>
          Finance Desk at a glance
        </h2>
        <div className={styles.stats}>
          {financeStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.metric} className={styles.outcomeCard}>
                <div className={styles.outcomeCardTop}>
                  <p className={styles.statValue}>{stat.metric}</p>
                  <span className={styles.outcomeIconBadge} aria-hidden="true">
                    <Icon size={16} className="stroke-[2.2]" />
                  </span>
                </div>
                <div className={styles.outcomeCardBody}>
                  <p className={styles.outcomeCopy}>{stat.copy}</p>
                </div>
                {stat.href && (
                  <Link href={stat.href} className={styles.outcomeLink}>
                    <span>Explore invoice automation</span>
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
