'use client';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FaqItem {
  question: string;
  answer?: string;
}

interface SharedFaqAccordionProps {
  items: FaqItem[];
  theme?: 'blue' | 'teal';
}

export const SharedFaqAccordion: React.FC<SharedFaqAccordionProps> = ({
  items,
  theme = 'blue',
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  const activeColor = theme === 'teal' ? 'text-teal-700' : 'text-brand-blue';
  const borderActive = theme === 'teal' ? 'border-teal-500/40' : 'border-brand-blue/30';

  return (
    <div
      className="space-y-2"
      role="region"
      aria-label="Frequently Asked Questions"
    >
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        const answerId = `faq-answer-${idx}`;
        const buttonId = `faq-button-${idx}`;

        return (
          <div
            key={idx}
            className={`rounded-xl border transition-all duration-200 ${
              isOpen
                ? 'border-slate-300 bg-slate-50/70 shadow-2xs'
                : 'border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/40'
            }`}
          >
            <button
              id={buttonId}
              type="button"
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              aria-controls={answerId}
              className="flex w-full items-center justify-between gap-4 p-4 text-left cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-brand-blue rounded-xl"
            >
              <span
                className={`text-sm font-bold transition-colors ${
                  isOpen
                    ? 'text-slate-950 font-extrabold'
                    : 'text-slate-800 group-hover:text-slate-950'
                }`}
              >
                {item.question}
              </span>
              <span
                className={`shrink-0 transition-transform duration-200 ${
                  isOpen
                    ? `rotate-180 ${activeColor}`
                    : 'text-slate-400 group-hover:text-slate-600'
                }`}
              >
                <ChevronDown size={17} />
              </span>
            </button>

            <div
              id={answerId}
              role="region"
              aria-labelledby={buttonId}
              className="grid transition-all duration-200 ease-out"
              style={{
                gridTemplateRows: isOpen ? '1fr' : '0fr',
              }}
            >
              <div className="overflow-hidden">
                <div className="px-4 pb-4 pt-1">
                  <div
                    className={`border-l-2 pl-3 text-xs sm:text-[13px] leading-relaxed text-slate-600 ${borderActive}`}
                  >
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
