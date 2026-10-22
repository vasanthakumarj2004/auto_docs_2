'use client';
import React, { useEffect, useState } from 'react';
import { 
  ArrowRight, 
  ChevronDown,
  Check,
  ShieldCheck,
  FileCheck,
  Building2,
  AlertCircle,
  CreditCard,
  Database,
  Layers,
  Sparkles
} from 'lucide-react';
import { useRouter } from '../lib/router';

// Config constant for bank partners label as required by spec
export const BANK_PARTNERS_LABEL = 'via your bank';

interface FaqItem {
  question: string;
  answer: string;
}

const faqList: FaqItem[] = [
  {
    question: 'Which banks can I pay vendors through?',
    answer:
      'Integration details for approved banking partners will be announced shortly prior to general availability. No proprietary bank portal changes will be required.',
  },
  {
    question: 'Does the payment show up in Tally automatically?',
    answer:
      'Yes. Once a vendor payment is authorized, both the purchase bill voucher and the corresponding bank payment voucher are created and reconciled automatically in Tally Prime.',
  },
  {
    question: 'Can the MD approve from his phone?',
    answer:
      'Yes. Decision makers can review invoice line items, tax breakdowns, and vendor bank details via secure mobile links with one-tap approval.',
  },
];

export const FinancePage: React.FC = () => {
  const { navigate } = useRouter();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Manage SEO Document Title and Meta Description
  useEffect(() => {
    const originalTitle = document.title;
    document.title = 'Finance Desk — AutoDocs | Approve the bill. Pay the vendor. The entry posts itself.';

    const metaDescription = document.querySelector('meta[name="description"]');
    const originalDescription = metaDescription?.getAttribute('content') || '';
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'From vendor bill to paid and posted in Tally — without retyping a line. Built for businesses that run on Tally, not on spreadsheets.'
      );
    }

    window.scrollTo({ top: 0, behavior: 'instant' });

    return () => {
      document.title = originalTitle;
      if (metaDescription) {
        metaDescription.setAttribute('content', originalDescription);
      }
    };
  }, []);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx));
  };

  const workbenchMeta = [
    {
      badge: 'Ready to post · 99.9% Match',
      badgeClass: 'bg-violet-50 text-violet-700 border-violet-200',
      actionText: 'Posted to Tally voucher #829',
      actionClass: 'bg-violet-600 text-white',
    },
    {
      badge: 'Integrity Pass · 0 Duplicates',
      badgeClass: 'bg-violet-50 text-violet-800 border-violet-200',
      actionText: 'Vendor & Invoice History Cleared',
      actionClass: 'bg-violet-700 text-white',
    },
    {
      badge: 'Rule Matched · Tier-2 Sign-off',
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
      actionText: 'Disbursement Approved · Ready for Bank',
      actionClass: 'bg-amber-600 text-white',
    },
    {
      badge: 'Synchronized · Native XML',
      badgeClass: 'bg-violet-50 text-violet-700 border-violet-200',
      actionText: 'Posted to Tally voucher #829',
      actionClass: 'bg-violet-600 text-white',
    },
  ];

  const currentWorkbench = workbenchMeta[activeTab] || workbenchMeta[0];

  return (
    <div className="bg-white text-slate-800">

      {/* =========================================================================
          SECTION 1: SPLIT HERO (Light Surface #FAFAFA)
          ========================================================================= */}
      <section className="bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column (lg:col-span-7) */}
          <div className="lg:col-span-7 text-left">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 text-xs font-mono uppercase font-semibold">
              <span>NEW · FINANCE DESK</span>
            </div>

            {/* Headline */}
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-slate-950 leading-[1.08]">
              Approve the bill. Pay the vendor.
              <br className="hidden sm:inline" />
              {' '}The entry posts itself.
            </h1>

            {/* Subtitle */}
            <p className="mt-6 max-w-xl text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              From vendor bill to paid and posted in Tally — without retyping a line. Built for businesses that run on Tally, not on spreadsheets.
            </p>

            {/* Dual CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => navigate('/#demo')}
                className="button-primary font-semibold px-6 py-3 rounded-xl inline-flex items-center gap-2 cursor-pointer shadow-sm text-sm sm:text-base"
              >
                <span>Book a demo</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('dual-module-section');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    navigate('/#demo');
                  }
                }}
                className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-medium px-6 py-3 rounded-xl inline-flex items-center gap-2 cursor-pointer transition-colors text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400"
              >
                <span>Already on invoice? Switch on payments</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Right Column (lg:col-span-5) — Static Verified Outcome Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-[#592099] text-white p-7 border border-violet-500/30 shadow-sm">
              {/* Top Row: Customer & Pill */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-mono uppercase text-violet-200 font-bold tracking-wider">
                  RAJADURAI E-VEHICLES
                </span>
                <span className="bg-violet-500/20 text-violet-300 border border-violet-400/30 px-2.5 py-1 rounded-full text-xs font-mono font-medium">
                  ✓ VERIFIED OUTCOME
                </span>
              </div>

              {/* Main KPI */}
              <div className="mt-6">
                <div className="text-4xl sm:text-5xl font-bold tracking-tight font-mono text-white">
                  Days → hours
                </div>
                <p className="text-sm text-violet-100 mt-2 font-normal">
                  purchase, spares and service entry into TallyPrime
                </p>
              </div>

              {/* Static 3-Step Summary Bar */}
              <div className="my-6 rounded-xl bg-black/20 border border-white/10 p-2.5 sm:p-3 text-[11px] sm:text-xs font-mono text-violet-100 flex items-center justify-between gap-1 overflow-hidden">
                <span className="font-semibold text-white shrink-0">[1. Bill &amp; GST Check]</span>
                <span className="text-violet-400 font-bold shrink-0">→</span>
                <span className="font-semibold text-white shrink-0">[2. Approved &amp; Paid]</span>
                <span className="text-violet-400 font-bold shrink-0">→</span>
                <span className="font-semibold text-white shrink-0">[3. Tally Voucher]</span>
              </div>

              {/* Bottom Link */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('customer-story-rajadurai');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      navigate('/customers/rajadurai');
                    }
                  }}
                  className="text-sm font-medium text-white underline underline-offset-4 inline-flex items-center gap-1.5 cursor-pointer hover:text-violet-200 transition-colors"
                >
                  <span>Read the story</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: THE CHALLENGE & DUAL MODULE SPLIT (Dark Navy #231134)
          ========================================================================= */}
      <section id="dual-module-section" className="bg-[#231134] text-white py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column (lg:col-span-5 — 3 Stacked Problem Rows) */}
          <div className="lg:col-span-5 text-left">
            <span className="text-xs font-mono uppercase tracking-wider text-violet-400 font-bold block">
              THE CHALLENGE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3 leading-tight">
              Why finance desks lose control as vendor bills scale
            </h2>

            <div className="divide-y divide-white/10 border-y border-white/10 mt-8">
              {/* Problem Row 1 */}
              <div className="border-l-2 border-violet-500 pl-4 py-4">
                <h3 className="text-sm sm:text-base font-bold text-white">Manual voucher retyping</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Accounts teams spend hours keying PDF line items, party ledgers, and tax splits into Tally by hand.
                </p>
              </div>

              {/* Problem Row 2 */}
              <div className="pl-4 py-4">
                <h3 className="text-sm sm:text-base font-bold text-white">GSTIN & HSN tax mismatches</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Manual typos create GSTR-2B discrepancies, wrong tax rates, and rejected voucher postings.
                </p>
              </div>

              {/* Problem Row 3 */}
              <div className="pl-4 py-4">
                <h3 className="text-sm sm:text-base font-bold text-white">Disconnected approvals & payouts</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Approvals sit in WhatsApp or email threads while bank payments require manual re-entry.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (lg:col-span-7 — Dual-Module Bento Card) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white text-slate-900 p-6 md:p-8 border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6 shadow-md">
              {/* Left Sub-Card: INVOICE AUTOMATION · START HERE */}
              <div className="p-6 rounded-2xl border border-slate-200 flex flex-col justify-between bg-white text-left">
                <div>
                  <span className="text-xs font-mono uppercase text-violet-700 font-semibold block mb-4">
                    INVOICE AUTOMATION · START HERE
                  </span>
                  <div className="space-y-3 font-medium text-slate-800 text-sm">
                    <div className="flex items-start gap-2.5">
                      <span className="text-violet-600 font-bold">✓</span>
                      <span>Bills read and GST-checked</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="text-violet-600 font-bold">✓</span>
                      <span>Duplicates held</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="text-violet-600 font-bold">✓</span>
                      <span>Posted to Tally, Zoho Books or ERP</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => navigate('/free-trial')}
                    className="text-sm font-semibold text-violet-700 hover:text-violet-800 inline-flex items-center gap-1.5 cursor-pointer hover:underline"
                  >
                    <span>Free trial</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* Right Sub-Card: ACCOUNTS PAYABLE · ADD ON */}
              <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex flex-col justify-between text-left">
                <div>
                  <span className="text-xs font-mono uppercase text-amber-800 font-semibold block mb-4">
                    ACCOUNTS PAYABLE · ADD ON
                  </span>
                  <div className="space-y-3 font-medium text-slate-800 text-sm">
                    <div className="flex items-start gap-2.5">
                      <span className="text-amber-700 font-bold">✓</span>
                      <span>Approval rules by amount and vendor</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="text-amber-700 font-bold">✓</span>
                      <span>Pay vendors from the same screen</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="text-amber-700 font-bold">✓</span>
                      <span>Payment entry posts itself</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-amber-200/60">
                  <button
                    type="button"
                    onClick={() => navigate('/#demo')}
                    className="text-sm font-semibold text-amber-900 hover:text-amber-950 inline-flex items-center gap-1.5 cursor-pointer hover:underline"
                  >
                    <span>Book a demo</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: END-TO-END COVERAGE MAP + CROSS-STAGE BAR (Light Surface #FAFAFA)
          ========================================================================= */}
      <section className="bg-white py-20 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          {/* Header */}
          <span className="text-xs font-mono uppercase tracking-wider text-violet-600 font-bold block">
            END-TO-END COVERAGE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
            The Entire Bill-to-Ledger Journey, on One Platform
          </h2>

          {/* Top Axis: 4 Horizontal Stage Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10">
            {/* Stage 1 */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 flex flex-col justify-between min-h-[140px]">
              <div>
                <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                  STAGE 01 · INTAKE
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mt-2">
                  Vendor Bill Comes In
                </h3>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-3">
                Email PDF · Scan · Direct Upload
              </p>
            </div>

            {/* Stage 2 */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 flex flex-col justify-between min-h-[140px]">
              <div>
                <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                  STAGE 02 · VALIDATION
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mt-2">
                  Read &amp; GST-Check
                </h3>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-3">
                Line items · HSN · 3-Way PO · Duplicate hold
              </p>
            </div>

            {/* Stage 3 */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 flex flex-col justify-between min-h-[140px]">
              <div>
                <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                  STAGE 03 · PAYOUT
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mt-2">
                  Approve &amp; Pay Vendor
                </h3>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-3">
                Role rules · MD phone approval · Same-screen pay
              </p>
            </div>

            {/* Stage 4 */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 flex flex-col justify-between min-h-[140px]">
              <div>
                <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                  STAGE 04 · LEDGER
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mt-2">
                  Posted to Tally
                </h3>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-3">
                Auto-voucher created via Native XML
              </p>
            </div>
          </div>

          {/* Bottom Axis: RUNS ACROSS EVERY STAGE Dashed Container */}
          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 p-6">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-4 text-center block font-bold">
              RUNS ACROSS EVERY STAGE
            </span>
            <div className="space-y-3">
              {/* Row 1 */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-wrap items-center gap-3">
                <span className="rounded px-2.5 py-1 text-xs font-mono font-bold bg-violet-50 text-violet-800 border border-violet-200 shrink-0">
                  EXTRACTION ENGINE
                </span>
                <div className="text-xs text-slate-600 font-medium flex flex-wrap items-center gap-2">
                  <span>Line-Item OCR</span>
                  <span className="text-slate-300">·</span>
                  <span>HSN/SAC Rates</span>
                  <span className="text-slate-300">·</span>
                  <span>IGST/CGST/SGST Split</span>
                  <span className="text-slate-300">·</span>
                  <span>Party Ledger Mapping</span>
                </div>
              </div>

              {/* Row 2 */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-wrap items-center gap-3">
                <span className="rounded px-2.5 py-1 text-xs font-mono font-bold bg-violet-50 text-violet-700 border border-violet-200 shrink-0">
                  COMPLIANCE GUARD
                </span>
                <div className="text-xs text-slate-600 font-medium flex flex-wrap items-center gap-2">
                  <span>GSTIN Portal Check</span>
                  <span className="text-slate-300">·</span>
                  <span>3-Way PO Matching</span>
                  <span className="text-slate-300">·</span>
                  <span>Historical Duplicate Hold</span>
                  <span className="text-slate-300">·</span>
                  <span>Role-Based Approvals</span>
                </div>
              </div>

              {/* Row 3 */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-wrap items-center gap-3">
                <span className="rounded px-2.5 py-1 text-xs font-mono font-bold bg-violet-50 text-violet-700 border border-violet-200 shrink-0">
                  ERP &amp; BANK SYNC
                </span>
                <div className="text-xs text-slate-600 font-medium flex flex-wrap items-center gap-2">
                  <span>Native TallyPrime XML</span>
                  <span className="text-slate-300">·</span>
                  <span>Zoho Books</span>
                  <span className="text-slate-300">·</span>
                  <span>Auto Payment Voucher</span>
                  <span className="text-slate-300">·</span>
                  <span>Complete Audit Trail</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: FINANCE DESK WORKBENCH (Soft Light #F8FAFC | Click-Only Tabs)
          ========================================================================= */}
      <section className="bg-[#F8FAFC] py-20 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          {/* Header */}
          <span className="text-xs font-mono uppercase tracking-wider text-violet-600 font-bold block">
            FINANCE DESK WORKBENCH
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
            Every Bill Read, Checked, Approved and Posted
          </h2>

          {/* Click-Only Pill Tabs */}
          <div className="flex flex-wrap gap-2 mt-6">
            {[
              '01. Invoice & GST Check',
              '02. Duplicate Guardrails',
              '03. Approval Matrix',
              '04. Tally & Bank Sync',
            ].map((tabLabel, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`rounded-lg px-4 py-2 text-xs sm:text-sm font-mono font-semibold cursor-pointer transition-colors ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {tabLabel}
                </button>
              );
            })}
          </div>

          {/* 2-Column Split: 5 / 7 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8 items-start">
            {/* Left Column (lg:col-span-5 — 3 Static Selectable Cards) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Card 1 */}
              <div
                onClick={() => setActiveTab(0)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                  activeTab === 0
                    ? 'border-violet-600 bg-white shadow-sm ring-1 ring-violet-600'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-violet-600">01</span>
                  <h3 className="text-base font-bold text-slate-900">
                    Read and GST-check every bill
                  </h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Capture line items and validate GSTIN, HSN, and tax rates before posting.
                </p>
              </div>

              {/* Card 2 */}
              <div
                onClick={() => setActiveTab(1)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                  activeTab === 1
                    ? 'border-violet-600 bg-white shadow-sm ring-1 ring-violet-600'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-violet-600">02</span>
                  <h3 className="text-base font-bold text-slate-900">
                    Hold duplicates, never pay twice
                  </h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Flag a repeated vendor bill before it reaches your payment queue.
                </p>
              </div>

              {/* Card 3 */}
              <div
                onClick={() => setActiveTab(2)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                  activeTab === 2 || activeTab === 3
                    ? 'border-violet-600 bg-white shadow-sm ring-1 ring-violet-600'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-violet-600">03</span>
                  <h3 className="text-base font-bold text-slate-900">
                    Approve, pay, post to Tally
                  </h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Move approved bills forward, disburse via your bank, and post the voucher.
                </p>
              </div>
            </div>

            {/* Right Column (lg:col-span-7 — Static Software Workbench Preview Card) */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                {/* Window Top Bar */}
                <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-violet-400 inline-block" />
                    <span className="ml-2 font-mono text-xs text-slate-600 font-medium">
                      Bill review · Prime Components
                    </span>
                  </div>
                  <span className={`${currentWorkbench.badgeClass} rounded-full px-2.5 py-0.5 text-xs font-mono font-semibold transition-colors`}>
                    {currentWorkbench.badge}
                  </span>
                </div>

                {/* Workbench Body */}
                <div className="p-6">
                  {/* Vendor Details Header */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                        TAX INVOICE · INV-4821
                      </span>
                      <h4 className="text-lg font-bold text-slate-900 mt-0.5">
                        Prime Components Pvt Ltd
                      </h4>
                      <span className="text-xs text-slate-500 font-mono">
                        GSTIN: 33AABCP1234F1Z5 · Active ✓
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                        Net Amount
                      </span>
                      <div className="text-2xl font-mono font-extrabold text-slate-900 mt-0.5">
                        ₹74,095.00
                      </div>
                    </div>
                  </div>

                  {/* Validated Line Items Table */}
                  <div className="mt-5 overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                          <th className="py-2 font-semibold">Item</th>
                          <th className="py-2 font-semibold">HSN</th>
                          <th className="py-2 font-semibold text-right">Taxable</th>
                          <th className="py-2 font-semibold text-right">IGST 18%</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        <tr>
                          <td className="py-2.5 font-medium text-slate-900">Lithium Cell 21700 Grade A</td>
                          <td className="py-2.5">850760</td>
                          <td className="py-2.5 text-right">₹52,000.00</td>
                          <td className="py-2.5 text-right font-medium text-slate-900">₹9,360.00</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 font-medium text-slate-900">BMS Controller 48V 30A</td>
                          <td className="py-2.5">850440</td>
                          <td className="py-2.5 text-right">₹10,750.00</td>
                          <td className="py-2.5 text-right font-medium text-slate-900">₹1,935.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Check Status Pills */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap gap-2 text-[11px] font-mono">
                    <span className={`inline-flex items-center gap-1 border px-2.5 py-1 rounded-md font-medium transition-colors ${
                      activeTab === 0
                        ? 'bg-violet-100 text-violet-900 border-violet-400 font-bold'
                        : 'bg-violet-50 text-violet-800 border-violet-200'
                    }`}>
                      ✓ 3-Way PO Match (PO-8821)
                    </span>
                    <span className={`inline-flex items-center gap-1 border px-2.5 py-1 rounded-md font-medium transition-colors ${
                      activeTab === 0
                        ? 'bg-violet-100 text-violet-900 border-violet-400 font-bold'
                        : 'bg-violet-50 text-violet-800 border-violet-200'
                    }`}>
                      ✓ GSTR-2B Active
                    </span>
                    <span className={`inline-flex items-center gap-1 border px-2.5 py-1 rounded-md font-medium transition-colors ${
                      activeTab === 1
                        ? 'bg-violet-100 text-violet-900 border-violet-400 font-bold ring-1 ring-violet-400'
                        : 'bg-violet-50 text-violet-800 border-violet-200'
                    }`}>
                      ✓ No Duplicate Found
                    </span>
                    <span className={`inline-flex items-center gap-1 border px-2.5 py-1 rounded-md font-medium transition-colors ${
                      activeTab >= 2
                        ? 'bg-violet-100 text-violet-900 border-violet-400 font-bold'
                        : 'bg-slate-50 text-slate-700 border border-slate-200'
                    }`}>
                      ✓ Ledger: Spares &amp; Raw Materials
                    </span>
                  </div>

                  {/* Simulated Action Button */}
                  <div className="mt-6">
                    <div className={`w-full py-3 rounded-xl ${currentWorkbench.actionClass} font-mono font-semibold text-sm text-center flex items-center justify-center gap-2 shadow-2xs transition-colors`}>
                      <span>{currentWorkbench.actionText}</span>
                      <Check size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: 6-CARD CAPABILITY BENTO MATRIX (Dark Navy #231134)
          ========================================================================= */}
      <section className="bg-[#231134] text-white py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          {/* Header */}
          <span className="text-violet-400 font-mono text-xs uppercase font-bold tracking-wider block">
            PLATFORM CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
            Engineered for enterprise accounts teams running on Tally
          </h2>

          {/* 6 Bento Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {/* Card 1 */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 flex flex-col justify-between hover:border-white/20 transition-colors">
              <div>
                <span className="text-xs font-mono font-bold text-violet-400 uppercase tracking-wider block mb-3">
                  01 · EXTRACTION
                </span>
                <h3 className="text-lg font-bold text-white">
                  Line-Item &amp; HSN Precision
                </h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  Extract every line, HSN/SAC code, quantity, and unit price with zero manual typing.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 flex flex-col justify-between hover:border-white/20 transition-colors">
              <div>
                <span className="text-xs font-mono font-bold text-violet-400 uppercase tracking-wider block mb-3">
                  02 · COMPLIANCE
                </span>
                <h3 className="text-lg font-bold text-white">
                  GSTIN &amp; Tax Rule Validation
                </h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  Verify vendor GST status against master data and ensure correct CGST/SGST or IGST treatment.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 flex flex-col justify-between hover:border-white/20 transition-colors">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block mb-3">
                  03 · INTEGRITY
                </span>
                <h3 className="text-lg font-bold text-white">
                  Duplicate &amp; Fraud Protection
                </h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  Catch identical invoice numbers, amounts, or vendor bank changes before payments release.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 flex flex-col justify-between hover:border-white/20 transition-colors">
              <div>
                <span className="text-xs font-mono font-bold text-violet-400 uppercase tracking-wider block mb-3">
                  04 · GOVERNANCE
                </span>
                <h3 className="text-lg font-bold text-white">
                  Role &amp; Amount Approvals
                </h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  Route bills automatically based on department, threshold, or vendor category with mobile approvals.
                </p>
              </div>
            </div>

            {/* Card 5 */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 flex flex-col justify-between hover:border-white/20 transition-colors">
              <div>
                <span className="text-xs font-mono font-bold text-violet-400 uppercase tracking-wider block mb-3">
                  05 · SETTLEMENT
                </span>
                <h3 className="text-lg font-bold text-white">
                  Same-Screen Bank Payouts
                </h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  Disburse verified vendor payments via your bank directly from the approval console.
                </p>
              </div>
            </div>

            {/* Card 6 */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 flex flex-col justify-between hover:border-white/20 transition-colors">
              <div>
                <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider block mb-3">
                  06 · ERP POSTING
                </span>
                <h3 className="text-lg font-bold text-white">
                  Native TallyPrime XML Sync
                </h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  Push purchase and payment vouchers directly into Tally with complete ledger fidelity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: 3-STAGE VALUE STAIRCASE (Light Surface #FAFAFA)
          ========================================================================= */}
      <section className="bg-white py-20 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column (lg:col-span-5 — 3 Ascending Vertical Bars) */}
            <div className="lg:col-span-5">
              <div className="flex items-end gap-3 sm:gap-4 h-64 justify-center lg:justify-start">
                {/* Step 1: h-32 */}
                <div className="h-32 w-1/3 rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:p-4 flex flex-col justify-between shadow-2xs">
                  <span className="text-[10px] font-mono font-bold text-slate-600 bg-white border border-slate-200 rounded px-1.5 py-0.5 self-start">
                    99.9% OCR
                  </span>
                  <div>
                    <div className="text-xs font-mono font-bold text-slate-400">01</div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                      Capture Bills
                    </div>
                  </div>
                </div>

                {/* Step 2: h-44 */}
                <div className="h-44 w-1/3 rounded-2xl border border-violet-200 bg-violet-50/60 p-3 sm:p-4 flex flex-col justify-between shadow-2xs">
                  <span className="text-[10px] font-mono font-bold text-violet-700 bg-white border border-violet-200 rounded px-1.5 py-0.5 self-start">
                    1-Click
                  </span>
                  <div>
                    <div className="text-xs font-mono font-bold text-violet-600">02</div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                      Approve &amp; Pay
                    </div>
                  </div>
                </div>

                {/* Step 3: h-56 */}
                <div className="h-56 w-1/3 rounded-2xl border border-violet-300 bg-violet-50/80 p-3 sm:p-4 flex flex-col justify-between shadow-2xs">
                  <span className="text-[10px] font-mono font-bold text-violet-800 bg-white border border-violet-300 rounded px-1.5 py-0.5 self-start">
                    Native XML
                  </span>
                  <div>
                    <div className="text-xs font-mono font-bold text-violet-600">03</div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                      Auto-Ledger
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (lg:col-span-7 — 3 Value Rows with Metrics) */}
            <div className="lg:col-span-7 text-left">
              <span className="text-xs font-mono uppercase tracking-wider text-violet-600 font-bold block">
                PROVEN ROI
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
                Eliminate the friction between vendor bills and your general ledger
              </h2>

              <div className="divide-y divide-slate-200 border-y border-slate-200 mt-8">
                {/* Metric Row 1 */}
                <div className="py-4 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      Cycle Time Reduction
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      From vendor bill intake to approved payment voucher posted in TallyPrime.
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xl sm:text-2xl font-mono font-bold text-violet-700 bg-violet-50 border border-violet-200 px-3 py-1.5 rounded-xl block">
                      Days → hours
                    </span>
                  </div>
                </div>

                {/* Metric Row 2 */}
                <div className="py-4 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      Payment Accuracy &amp; Guardrails
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Strict historical duplicate hold flags repeated bills before funds release.
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xl sm:text-2xl font-mono font-bold text-violet-700 bg-violet-50 border border-violet-200 px-3 py-1.5 rounded-xl block">
                      0 duplicate payouts
                    </span>
                  </div>
                </div>

                {/* Metric Row 3 */}
                <div className="py-4 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      Finance Team Throughput
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Complete elimination of repetitive line-item typing, ledger lookups, and manual vouchers.
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xl sm:text-2xl font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl block">
                      ~98% less typing
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: CUSTOMER STORY, BUYER FAQS & STICKY CONVERSION BAR (Soft Light #F8FAFC)
          ========================================================================= */}
      <section className="bg-[#F8FAFC] py-20 pb-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start text-left">
            {/* Left Column (lg:col-span-5 — Customer Story Card) */}
            <div
              id="customer-story-rajadurai"
              className="lg:col-span-5 rounded-2xl border border-slate-200 border-l-[6px] border-l-violet-600 bg-white p-7 sm:p-8 shadow-sm flex flex-col justify-between min-h-[380px] scroll-mt-24"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-violet-700">
                    CUSTOMER STORY
                  </span>
                  <span className="font-mono text-[10px] rounded-md px-2 py-0.5 border border-violet-200 bg-violet-50 text-violet-800 font-bold">
                    TallyPrime Native Integration
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold text-slate-950 tracking-tight">
                  Rajadurai E-Vehicles
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-slate-700 font-medium">
                  Purchase, spares and service entry:{' '}
                  <span className="text-violet-700 font-extrabold font-mono text-base">Days → hours.</span>
                </p>

                {/* 3-Pill Verified Impact Strip */}
                <div className="grid grid-cols-3 gap-2 pt-6 mt-6 border-t border-slate-100 font-mono text-center">
                  <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-2.5">
                    <div className="text-base font-extrabold text-slate-900">100%</div>
                    <div className="text-[9px] text-slate-500 font-medium mt-0.5 leading-tight">
                      Line-item GST check
                    </div>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-2.5">
                    <div className="text-base font-extrabold text-violet-700">0</div>
                    <div className="text-[9px] text-slate-500 font-medium mt-0.5 leading-tight">
                      Duplicate payouts
                    </div>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-2.5">
                    <div className="text-base font-extrabold text-slate-900">3 Categories</div>
                    <div className="text-[9px] text-slate-500 font-medium mt-0.5 leading-tight">
                      Purchase · Spares · Service
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => navigate('/customers/rajadurai')}
                  className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-violet-700 hover:text-violet-800 cursor-pointer"
                >
                  <span>Read the story</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Right Column (lg:col-span-7 — Questions Buyers Ask) */}
            <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-7 sm:p-8 shadow-sm">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 block mb-5">
                QUESTIONS BUYERS ASK
              </span>

              <div className="space-y-3" role="region" aria-label="Frequently Asked Questions">
                {faqList.map((item, idx) => {
                  const isOpen = openFaqIndex === idx;
                  const answerId = `faq-answer-${idx}`;
                  const buttonId = `faq-button-${idx}`;
                  const numStr = String(idx + 1).padStart(2, '0');

                  return (
                    <div
                      key={idx}
                      className={`rounded-xl border transition-colors ${
                        isOpen
                          ? 'border-violet-500/30 bg-violet-50/20'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <button
                        id={buttonId}
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        aria-expanded={isOpen}
                        aria-controls={answerId}
                        className="flex w-full items-center justify-between gap-3 p-4 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded ${
                              isOpen ? 'bg-[#8B32F7] text-white' : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            {numStr}
                          </span>
                          <span
                            className={`text-sm font-bold ${
                              isOpen ? 'text-slate-950 font-extrabold' : 'text-slate-800'
                            }`}
                          >
                            {item.question}
                          </span>
                        </div>

                        <span
                          className={`shrink-0 transition-transform ${
                            isOpen ? 'rotate-180 text-violet-600' : 'text-slate-400'
                          }`}
                        >
                          <ChevronDown size={17} />
                        </span>
                      </button>

                      {/* Always mounted in DOM for zero CLS & SSG search crawlers */}
                      <div
                        id={answerId}
                        role="region"
                        aria-labelledby={buttonId}
                        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="px-4 pb-4 pt-1">
                            <div className="border-l-2 border-violet-500 pl-3 text-xs sm:text-[13px] leading-relaxed text-slate-600">
                              {item.answer}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          STICKY BOTTOM CONVERSION BAR
          ========================================================================= */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-3 px-4 sm:px-6 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="bg-amber-50 text-amber-800 border border-amber-200 text-xs font-mono uppercase px-2.5 py-0.5 rounded-full font-bold shrink-0">
              FINANCE DESK
            </span>
            <div className="hidden sm:block">
              <span className="text-sm font-extrabold text-slate-900">
                Approve the bill. Pay the vendor.
              </span>
              <span className="text-xs text-slate-500 ml-2 hidden md:inline">
                The entry posts itself in Tally Prime.
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate('/#demo')}
            className="button-primary font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl cursor-pointer inline-flex items-center gap-2 shrink-0 shadow-sm"
          >
            <span>Book a demo</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
