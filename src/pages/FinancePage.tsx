import React, { useEffect, useState } from 'react';
import { 
  Mail, 
  Search, 
  Check, 
  IndianRupee, 
  Upload, 
  ArrowRight, 
  Plus, 
  ChevronDown, 
  ChevronUp,
  Sparkles
} from 'lucide-react';
import { useRouter } from '../lib/router';

// Config constant for bank partners label as required by spec
export const BANK_PARTNERS_LABEL = 'via your bank';

interface FaqItem {
  question: string;
  answer?: string;
}

const faqList: FaqItem[] = [
  {
    question: 'Which banks can I pay vendors through?',
    answer: 'Integration details for approved banking partners will be announced shortly prior to general availability. No proprietary bank portal changes will be required.',
  },
  {
    question: 'Does the payment show up in Tally automatically?',
    answer: 'Yes. Once a vendor payment is authorized, both the purchase bill voucher and the corresponding bank payment voucher are created and reconciled automatically in Tally Prime.',
  },
  {
    question: 'Can the MD approve from his phone?',
    answer: 'Yes. Decision makers can review invoice line items, tax breakdowns, and vendor bank details via secure mobile links with one-tap approval.',
  },
];

export const FinancePage: React.FC = () => {
  const { navigate } = useRouter();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Manage SEO Document Title and Meta Description
  useEffect(() => {
    const originalTitle = document.title;
    document.title = 'Finance Door — Docsynecx | Approve the bill. Pay the vendor. The entry posts itself.';

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

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="bg-white text-slate-800">
      {/* =========================================================================
          SECTION 1: HERO (left-aligned, light background)
          ========================================================================= */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-[#fdfdfd] pt-12 pb-16 sm:pt-20 sm:pb-24">
        {/* Subtle Ambient Background Lighting */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-60" aria-hidden="true">
          <div className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-orange-100/40 via-blue-100/30 to-transparent blur-3xl" />
        </div>

        <div className="site-shell relative z-10">
          <div className="max-w-3xl text-left">
            {/* Small Orange Tag: "NEW · FINANCE DOOR" */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-200/90 bg-orange-50/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-orange-700 shadow-2xs font-mono">
              <Sparkles size={11} className="text-orange-600" />
              <span>NEW · FINANCE DOOR</span>
            </div>

            {/* Headline */}
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-[-0.055em] text-slate-950 sm:text-5xl lg:text-[56px]">
              Approve the bill. Pay the vendor.
              <br className="hidden sm:inline" />
              {' '}The entry posts itself.
            </h1>

            {/* Subtext */}
            <p className="mt-6 max-w-2xl text-[15px] sm:text-base leading-relaxed text-slate-600">
              From vendor bill to paid and posted in Tally — without retyping a line. Built for businesses that run on Tally, not on spreadsheets.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={() => navigate('/#demo')}
                className="button-primary text-sm px-6 py-3 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
              >
                Book a demo
              </button>

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('accounts-payable');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    navigate('/#demo');
                  }
                }}
                className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-xs sm:text-sm font-bold text-slate-800 transition-all hover:border-slate-400 hover:bg-slate-50 cursor-pointer shadow-2xs"
              >
                Already on Invoice? Switch on payments →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: "ONE BILL'S JOURNEY" (cream background band)
          ========================================================================= */}
      <section className="border-b border-[#ede8de] bg-[#F8F6F1] py-14 sm:py-20">
        <div className="site-shell">
          {/* Small Uppercase Label */}
          <div className="text-left mb-6 sm:mb-8">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-slate-500">
              ONE BILL'S JOURNEY
            </span>
          </div>

          {/* 5 Step Cards in one row with arrows between them (stack vertically on mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-3 sm:gap-2 lg:gap-3">
            
            {/* 1. Bill arrives */}
            <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200/90 bg-white p-5 text-center shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 min-h-[140px]">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 border border-slate-200/80 text-slate-700 mb-3 shadow-2xs">
                <Mail size={18} />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 leading-tight">Bill arrives</h3>
              <p className="mt-1 text-xs text-slate-500 font-medium">email or upload</p>
            </div>

            {/* Arrow 1 */}
            <div className="flex justify-center text-slate-400 py-1 md:py-0" aria-hidden="true">
              <ArrowRight size={18} className="rotate-90 md:rotate-0" />
            </div>

            {/* 2. Read & checked */}
            <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200/90 bg-white p-5 text-center shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 min-h-[140px]">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 border border-slate-200/80 text-slate-700 mb-3 shadow-2xs">
                <Search size={18} />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 leading-tight">Read & checked</h3>
              <p className="mt-1 text-xs text-slate-500 font-medium">GST · duplicate · PO</p>
            </div>

            {/* Arrow 2 */}
            <div className="flex justify-center text-slate-400 py-1 md:py-0" aria-hidden="true">
              <ArrowRight size={18} className="rotate-90 md:rotate-0" />
            </div>

            {/* 3. Approved */}
            <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200/90 bg-white p-5 text-center shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 min-h-[140px]">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 border border-slate-200/80 text-slate-700 mb-3 shadow-2xs">
                <Check size={18} />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 leading-tight">Approved</h3>
              <p className="mt-1 text-xs text-slate-500 font-medium">from one screen</p>
            </div>

            {/* Arrow 3 */}
            <div className="flex justify-center text-slate-400 py-1 md:py-0" aria-hidden="true">
              <ArrowRight size={18} className="rotate-90 md:rotate-0" />
            </div>

            {/* 4. Vendor paid (HIGHLIGHT in amber/orange: new capability) */}
            <div className="relative flex flex-col items-center justify-center rounded-xl border-2 border-amber-300/90 bg-gradient-to-b from-[#fef7ee] to-[#fdeddb] p-5 text-center shadow-[0_4px_16px_-2px_rgba(234,88,12,0.15)] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 min-h-[140px]">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-amber-200 text-amber-700 mb-3 shadow-xs">
                <IndianRupee size={18} />
              </div>
              <h3 className="text-sm font-extrabold text-amber-950 leading-tight">Vendor paid</h3>
              <p className="mt-1 text-xs text-amber-800/90 font-medium">
                {BANK_PARTNERS_LABEL}
              </p>
            </div>

            {/* Arrow 4 */}
            <div className="flex justify-center text-slate-400 py-1 md:py-0" aria-hidden="true">
              <ArrowRight size={18} className="rotate-90 md:rotate-0" />
            </div>

            {/* 5. Posted to Tally (HIGHLIGHT in blue/lavender: where Tally gets updated) */}
            <div className="relative flex flex-col items-center justify-center rounded-xl border-2 border-blue-200 bg-gradient-to-b from-[#f0f2fe] to-[#e4e7fd] p-5 text-center shadow-[0_4px_16px_-2px_rgba(47,61,224,0.12)] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 min-h-[140px]">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-blue-200 text-brand-blue mb-3 shadow-xs">
                <Upload size={18} />
              </div>
              <h3 className="text-sm font-extrabold text-slate-950 leading-tight">Posted to Tally</h3>
              <p className="mt-1 text-xs text-brand-blue font-medium">bill + payment entry</p>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: TWO PRODUCT CARDS WITH A "+" BETWEEN THEM
          ========================================================================= */}
      <section id="accounts-payable" className="border-b border-slate-200/80 bg-white py-14 sm:py-20 scroll-mt-20">
        <div className="site-shell">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-6 lg:gap-8">
            
            {/* Left Card (neutral border): INVOICE AUTOMATION · START HERE */}
            <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 sm:p-9 shadow-xs transition-shadow duration-300 hover:shadow-md">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 block mb-5">
                  INVOICE AUTOMATION · START HERE
                </span>

                <div className="space-y-3.5">
                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span>Bills read and GST-checked</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span>Duplicates held</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span>Posted to Tally, Zoho Books or ERP</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100">
                <a
                  href="/free-trial"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/free-trial');
                  }}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-blue hover:underline cursor-pointer"
                >
                  Free trial →
                </a>
              </div>
            </div>

            {/* Centered Large "+" Separator */}
            <div className="flex items-center justify-center py-2 lg:py-0" aria-hidden="true">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-400 text-xl font-bold shadow-2xs">
                <Plus size={20} strokeWidth={2.5} />
              </span>
            </div>

            {/* Right Card (orange border): ACCOUNTS PAYABLE · ADD ON */}
            <div className="relative flex flex-col justify-between rounded-2xl border-2 border-orange-300 bg-gradient-to-b from-orange-50/20 via-white to-white p-7 sm:p-9 shadow-xs transition-shadow duration-300 hover:shadow-md">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-orange-600 block mb-5">
                  ACCOUNTS PAYABLE · ADD ON
                </span>

                <div className="space-y-3.5">
                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span>Approval rules by amount and vendor</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span>Pay vendors from the same screen</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span>Payment entry posts itself</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100">
                <a
                  href="/#demo"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/#demo');
                  }}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-600 hover:text-orange-700 hover:underline cursor-pointer"
                >
                  Book a demo →
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: TWO CARDS SIDE BY SIDE (Customer Story & Questions Buyers Ask)
          ========================================================================= */}
      <section className="bg-white py-14 sm:py-20">
        <div className="site-shell">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start">
            
            {/* Left Card (green left border): CUSTOMER STORY */}
            <div className="flex flex-col justify-between rounded-2xl border border-slate-200 border-l-[6px] border-l-emerald-500 bg-white p-7 sm:p-8 shadow-xs transition-shadow duration-300 hover:shadow-md min-h-[220px]">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-3">
                  CUSTOMER STORY
                </span>

                <h3 className="text-xl font-extrabold text-slate-950 tracking-tight">
                  Rajadurai E-Vehicles
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-600 font-medium">
                  Purchase, spares and service entry: days → hours.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <a
                  href="/customers/rajadurai"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/customers/rajadurai');
                  }}
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
                >
                  Read the story →
                </a>
              </div>
            </div>

            {/* Right Card: QUESTIONS BUYERS ASK (Accessible FAQ list) */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-8 shadow-xs transition-shadow duration-300 hover:shadow-md">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 block mb-4">
                QUESTIONS BUYERS ASK
              </span>

              <div className="divide-y divide-slate-100" role="region" aria-label="Frequently Asked Questions">
                {faqList.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={idx} className="py-3 first:pt-0 last:pb-0">
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between text-left text-sm font-semibold text-slate-800 hover:text-brand-blue transition-colors cursor-pointer group"
                      >
                        <span className="pr-4">{faq.question}</span>
                        <span className="text-slate-400 group-hover:text-brand-blue shrink-0">
                          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="mt-2 text-xs leading-relaxed text-slate-600 pl-1 border-l-2 border-brand-blue/30 pt-1">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
