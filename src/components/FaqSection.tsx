import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { faqList } from '../data/featuresData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="border-b border-slate-200 bg-white py-16 sm:py-24">
      <div className="site-shell">
        <div className="mx-auto max-w-3xl text-center">
          <div className="eyebrow mb-4">
            <HelpCircle size={13} className="text-blue-600" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-[-0.04em] text-slate-950 sm:text-4xl">
            Everything you need to know about Docsynecx.
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Have questions about how native connectors work, deployment security, or handling legacy formats?
            Find detailed answers below.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          {faqList.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="transition-colors">
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-slate-50/70"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-extrabold text-slate-900 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs leading-6 text-slate-600 border-t border-slate-100 bg-slate-50/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center text-xs text-slate-500">
          Have an unlisted custom system or integration question?{' '}
          <a href="#demo" className="font-bold text-blue-600 hover:underline">
            Talk directly with our integration engineers →
          </a>
        </div>
      </div>
    </section>
  );
};
