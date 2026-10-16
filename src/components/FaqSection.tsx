'use client';
import React from 'react';

export const FaqSection: React.FC = () => {
  const faqs = [
    {
      question: 'What systems does Docsynecx integrate with natively?',
      answer:
        'Docsynecx integrates directly with Tally Prime (via XML server and ODBC), CargoWise One (via native eAdaptor XML), Zoho Books, and major enterprise ERPs including SAP and Oracle NetSuite. We also provide secure REST and webhook APIs for proprietary TMS and custom accounting software.',
    },
    {
      question: 'How does Docsynecx connect without disrupting our existing setup?',
      answer:
        'There is zero downtime and no rip-and-replace required. Docsynecx connects via official application APIs and shared inboxes. Your team continues working in Tally or CargoWise as usual, while Docsynecx handles data ingestion and voucher/job creation in the background.',
    },
    {
      question: 'How are duplicate invoices and GST mismatches prevented?',
      answer:
        'Every incoming vendor bill undergoes a multi-layer verification check against your database and government GST portal APIs before posting. If an invoice number, vendor GSTIN, or total matches an existing record, Docsynecx flags a Duplicate Hold and halts payment progression.',
    },
    {
      question: 'Can Docsynecx process low-resolution scans and non-standard vendor formats?',
      answer:
        'Yes. Unlike template-based OCR engines that break when columns move, Docsynecx uses document vision models trained specifically on trade manifests, tax invoices, and packing lists. It extracts line items accurately regardless of layout variations or skewed scans.',
    },
    {
      question: 'How long does implementation and onboarding take?',
      answer:
        'Most forwarding branches and finance desks are fully operational within 48 to 72 hours. Our onboarding team maps your ledger rules, configures your inbox connectors, and sets up approval thresholds with zero IT overhead for your team.',
    },
    {
      question: 'Is our trade or financial data used to train AI models?',
      answer:
        'Never. We maintain a strict zero-data-retention training policy. Your vendor invoices, shipping manifests, and pricing data are encrypted with AES-256 at rest and TLS 1.3 in transit, and are never shared with or used to train third-party or foundational AI models.',
    },
  ];

  return (
    <section id="faq" className="border-b border-slate-200/80 bg-[#f8f9fc] py-16 sm:py-24 scroll-mt-16">
      <div className="site-shell max-w-[760px]">
        <div className="text-center mb-12">
          <div className="eyebrow mb-4">
            Answers & Clarifications
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-[-0.04em] text-slate-950 sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            Everything you need to know about integrations, security, and setup.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group rounded-xl border border-slate-200/90 bg-white shadow-xs transition-all"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-5 text-[15px] font-bold text-slate-950 [&::-webkit-details-marker]:hidden">
                <span>{faq.question}</span>
                <span className="ml-4 shrink-0 text-xl font-light text-slate-400 transition-transform duration-200 group-open:rotate-45 leading-none">
                  +
                </span>
              </summary>
              <div className="px-6 pb-5 text-xs sm:text-sm leading-relaxed text-slate-600 border-t border-slate-100 pt-3">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
