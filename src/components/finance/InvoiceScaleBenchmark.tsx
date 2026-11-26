"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./InvoiceScaleBenchmark.module.css";

interface MetricCard {
  label: string;
  stat: string;
  delta: string;
}

const metrics: MetricCard[] = [
  {
    label: "Daily Invoice Volume",
    stat: "+125%",
    delta: "~150 → 350+ per day",
  },
  {
    label: "Extraction Accuracy",
    stat: "99.2%",
    delta: "GST, HSN & line-items",
  },
  {
    label: "Median Invoice Cycle",
    stat: "28 s",
    delta: "Down from 15+ min",
  },
  {
    label: "Touchless Posting",
    stat: "84%",
    delta: "Direct to TallyPrime",
  },
];

export function InvoiceScaleBenchmark() {
  return (
    <section
      id="scale-benchmark"
      className={styles.section}
      aria-labelledby="scale-benchmark-title"
    >
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.shell}>
        {/* Context / Credibility Eyebrow */}
        <div>
          <span className={styles.eyebrow}>
            Same Workflow · 12 Months · Enterprise Vendor Intake · India
          </span>
        </div>

        {/* Main Two-Tone Headline */}
        <h2 id="scale-benchmark-title" className={styles.title}>
          Apex Electricals is one of{" "}
          <span className={styles.accent}>350 invoices</span> posting out per
          day.
        </h2>

        {/* Operational Narrative Description */}
        <p className={styles.description}>
          This same loop — messy PDFs in, GST &amp; HSN verified, ledger
          classified — posts directly into TallyPrime on every bill, not a
          curated few.
        </p>

        {/* 4-Card ROI Metrics Grid */}
        <div className={styles.grid}>
          {metrics.map((item) => (
            <article key={item.label} className={styles.card}>
              <span className={styles.cardLabel}>{item.label}</span>
              <strong className={styles.cardStat}>{item.stat}</strong>
              <span className={styles.cardDelta}>{item.delta}</span>
            </article>
          ))}
        </div>

        {/* Low-Friction Value / Cost Inquiry Link */}
        <div className={styles.ctaWrapper}>
          <Link href="/demo-form" className={styles.ctaLink}>
            See what this loop would save your finance team{" "}
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
