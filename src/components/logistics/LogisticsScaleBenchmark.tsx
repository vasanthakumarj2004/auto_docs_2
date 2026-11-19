'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { LogisticsModuleSlug } from '../../content/logistics';
import styles from './LogisticsScaleBenchmark.module.css';

interface MetricCard {
  label: string;
  stat: string;
  delta: string;
}

interface BenchmarkData {
  eyebrow: string;
  headlinePrefix: string;
  headlineAccent: string;
  headlineSuffix: string;
  description: string;
  metrics: MetricCard[];
  ctaText: string;
}

const benchmarkContent: Record<LogisticsModuleSlug, BenchmarkData> = {
  'email-to-booking': {
    eyebrow: 'Same Loop · 12 Months · Freight Rate & RFQ Desk · UAE & India',
    headlinePrefix: 'Cascadia is one of ',
    headlineAccent: '225 quotes',
    headlineSuffix: ' going out per day.',
    description:
      'This same loop — customer RFQ in, vendor rates compared, margin rules applied — runs on every enquiry forwarders take, not a curated few.',
    metrics: [
      {
        label: 'Daily Quote Volume',
        stat: '+88%',
        delta: '~120 → 225+ per day',
      },
      {
        label: 'Win Rate',
        stat: '73%',
        delta: 'Up from 35%',
      },
      {
        label: 'Quote Response',
        stat: '15 min',
        delta: 'Down from 60+ min',
      },
      {
        label: 'Median Draft',
        stat: '21 s',
        delta: 'Down from 1 hour',
      },
    ],
    ctaText: 'See what this quoting workflow would save your team',
  },

  'shipment-operations': {
    eyebrow: 'Same Workflow · 12 Months · Ocean & Air Operations · Trade Lanes',
    headlinePrefix: 'Pacific Horizon is one of ',
    headlineAccent: '420 shipment jobs',
    headlineSuffix: ' dispatched per day.',
    description:
      'This same loop — B/L & packing list in, 3-way discrepancy checked, job created — synchronizes directly with CargoWise on every shipment, not a curated few.',
    metrics: [
      {
        label: 'Daily Job Creation',
        stat: '+140%',
        delta: '~175 → 420+ jobs/day',
      },
      {
        label: 'Extraction Accuracy',
        stat: '99.4%',
        delta: 'B/L, packing list & invoice',
      },
      {
        label: 'Discrepancy Detection',
        stat: '100%',
        delta: 'Flagged before customs',
      },
      {
        label: 'Median Job Intake',
        stat: '35 s',
        delta: 'Down from 25+ min',
      },
    ],
    ctaText: 'See what this operations loop would save your team',
  },

  'shipment-tracking': {
    eyebrow: 'Active Monitoring · 24/7 AIS & Carrier Feeds · Multi-Carrier',
    headlinePrefix: 'Maersk Denver is one of ',
    headlineAccent: '1,850 live containers',
    headlineSuffix: ' tracked per day.',
    description:
      'This same loop — carrier APIs queried, AIS position pinged, delay risk computed — updates ETAs and notifies shippers automatically, not a curated few.',
    metrics: [
      {
        label: 'Containers Monitored',
        stat: '1,850+',
        delta: 'Real-time ocean & road',
      },
      {
        label: 'Exception Detection',
        stat: '4.2 hrs',
        delta: 'Earlier than carrier notice',
      },
      {
        label: 'Customer Inquiries',
        stat: '-65%',
        delta: '"Where is my cargo" emails',
      },
      {
        label: 'ETA Refresh Rate',
        stat: '15 min',
        delta: 'Automated milestone logs',
      },
    ],
    ctaText: 'See what live shipment visibility can do for your customers',
  },

  'freight-intelligence': {
    eyebrow: 'Connected Intelligence · Multi-Lane Benchmark · Enterprise Forwarders',
    headlinePrefix: 'Jebel Ali to Nhava Sheva is one of ',
    headlineAccent: '65 trade corridors',
    headlineSuffix: ' analyzed per day.',
    description:
      'This same loop — quoted vs actual costs reconciled, carrier margins audited, rate leakages caught — provides management-ready analytics on every lane, not a curated few.',
    metrics: [
      {
        label: 'Margin Visibility',
        stat: '100%',
        delta: 'Profitability by lane & job',
      },
      {
        label: 'Cost Leakage Prevented',
        stat: '4.8%',
        delta: 'Reconciled carrier variances',
      },
      {
        label: 'Reporting Time',
        stat: 'Real-time',
        delta: 'Down from 5 days post-month',
      },
      {
        label: 'Carrier Performance',
        stat: '18+ KPI',
        delta: 'On-time & detention metrics',
      },
    ],
    ctaText: 'See what freight intelligence reveals about your lanes',
  },
};

interface LogisticsScaleBenchmarkProps {
  slug: LogisticsModuleSlug;
}

export function LogisticsScaleBenchmark({ slug }: LogisticsScaleBenchmarkProps) {
  const data = benchmarkContent[slug] || benchmarkContent['email-to-booking'];

  return (
    <section
      id="scale-benchmark"
      className={styles.section}
      aria-labelledby="logistics-scale-benchmark-title"
    >
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.shell}>
        {/* Context / Credibility Eyebrow */}
        <div>
          <span className={styles.eyebrow}>{data.eyebrow}</span>
        </div>

        {/* Main Two-Tone Headline */}
        <h2 id="logistics-scale-benchmark-title" className={styles.title}>
          {data.headlinePrefix}
          <span className={styles.accent}>{data.headlineAccent}</span>
          {data.headlineSuffix}
        </h2>

        {/* Operational Narrative Description */}
        <p className={styles.description}>{data.description}</p>

        {/* 4-Card ROI Metrics Grid */}
        <div className={styles.grid}>
          {data.metrics.map((item) => (
            <article key={item.label} className={styles.card}>
              <span className={styles.cardLabel}>{item.label}</span>
              <strong className={styles.cardStat}>{item.stat}</strong>
              <span className={styles.cardDelta}>{item.delta}</span>
            </article>
          ))}
        </div>

        {/* Low-Friction Value / Cost Inquiry Link */}
        <div className={styles.ctaWrapper}>
          <Link href="/demo/#demo-form" className={styles.ctaLink}>
            {data.ctaText} <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
