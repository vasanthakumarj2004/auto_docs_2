'use client';

import { ArrowUpRight, Check, CheckCircle2, FileText, Mail, Navigation, Ship, Sparkles, TrendingUp, Truck } from 'lucide-react';
import s from './LogisticsWorkspacePreview.module.css';

export function LogisticsWorkspacePreview() {
  return (
    <div className={s.container}>
      <div className={s.floatingTagOne}>
        <Sparkles size={12} aria-hidden="true" />
        <span>AI-assisted workflows</span>
      </div>
      <div className={s.floatingTagTwo}>
        <CheckCircle2 size={12} color="#18cb96" aria-hidden="true" />
        <span>Human review when needed</span>
      </div>

      <div className={s.preview} aria-label="Docsynecx Freight operations overview live workspace">
        {/* Top Header */}
        <div className={s.header}>
          <div className={s.headerLeft}>
            <Ship size={16} aria-hidden="true" />
            <span>Docsynecx · Freight operations overview</span>
          </div>
          <span className={s.livePill}>
            <span className={s.liveDot} />
            Live workspace
          </span>
        </div>

        {/* Metric Grid */}
        <div className={s.metricGrid}>
          <div className={s.metricCard}>
            <span className={s.metricValue}>148</span>
            <span className={s.metricLabel}>Enquiries</span>
            <span className={s.metricSub}>+24 received today</span>
          </div>
          <div className={s.metricCard}>
            <span className={s.metricValue}>92</span>
            <span className={s.metricLabel}>Quotes sent</span>
            <span className={s.metricSub}>Avg 12m turnaround</span>
          </div>
          <div className={s.metricCard}>
            <span className={s.metricValue}>37</span>
            <span className={s.metricLabel}>Bookings</span>
            <span className={s.metricSub}>Synced to CargoWise</span>
          </div>
        </div>

        {/* Live Operations Feed */}
        <div className={s.feed}>
          <div className={s.feedHeading}>
            <span>Active Shipments &amp; Quotes</span>
            <span>Real-time</span>
          </div>

          <div className={s.feedRow}>
            <div className={s.feedLeft}>
              <span className={s.feedIcon}><Mail size={13} /></span>
              <div className={s.feedDetails}>
                <span className={s.feedTitle}>RFQ-4821 · 2x40&apos; HC</span>
                <span className={s.feedRoute}>Shanghai → Nhava Sheva · Electronics</span>
              </div>
            </div>
            <span className={s.feedBadge}><Check size={10} />Ready to quote</span>
          </div>

          <div className={s.feedRow}>
            <div className={s.feedLeft}>
              <span className={s.feedIcon}><Ship size={13} /></span>
              <div className={s.feedDetails}>
                <span className={s.feedTitle}>JOB-1082 · Ocean FCL</span>
                <span className={s.feedRoute}>Mundra → Rotterdam · B/L Verified</span>
              </div>
            </div>
            <span className={s.feedBadge}><Check size={10} />CargoWise synced</span>
          </div>

          <div className={s.feedRow}>
            <div className={s.feedLeft}>
              <span className={s.feedIcon}><Truck size={13} /></span>
              <div className={s.feedDetails}>
                <span className={s.feedTitle}>TRK-0941 · Road Trailer</span>
                <span className={s.feedRoute}>Chennai → Bengaluru · Gate-in completed</span>
              </div>
            </div>
            <span className={s.feedBadge}><Navigation size={9} />In transit</span>
          </div>
        </div>

        {/* Performance Chart */}
        <div className={s.chartArea}>
          <div className={s.chartHead}>
            <span>Workflow performance</span>
            <span className={s.chartTrend}>
              <TrendingUp size={12} />
              ↑ Improving (+34% faster)
            </span>
          </div>
          <svg className={s.chartSvg} viewBox="0 0 500 130" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="logisticsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#18cb96" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#18cb96" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M0 105 C55 95 75 80 120 86 S190 40 240 65 S315 22 360 43 S430 15 500 8"
              fill="none"
              stroke="#18cb96"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M0 105 C55 95 75 80 120 86 S190 40 240 65 S315 22 360 43 S430 15 500 8 L500 130 L0 130Z"
              fill="url(#logisticsGradient)"
            />
          </svg>
        </div>

        {/* Sync Status Bar */}
        <div className={s.syncBar}>
          <div className={s.syncStatus}>
            <span className={s.syncDot} />
            <span>CARGOWISE CONNECTED</span>
          </div>
          <ul className={s.syncSteps}>
            <li><Check size={11} /><span>Enquiries parsed</span></li>
            <li><Check size={11} /><span>Rates matched</span></li>
            <li><Check size={11} /><span>Jobs synced</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
