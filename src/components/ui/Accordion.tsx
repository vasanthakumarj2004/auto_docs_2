'use client';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultOpenIndex?: number;
  theme?: 'blue' | 'teal' | 'neutral';
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultOpenIndex,
  theme = 'blue',
  className = '',
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(
    defaultOpenIndex !== undefined ? defaultOpenIndex : null
  );

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const activeFocusRings = {
    blue: 'focus-visible:ring-brand-blue',
    teal: 'focus-visible:ring-brand-teal',
    neutral: 'focus-visible:ring-slate-400',
  };

  return (
    <div className={`divide-y divide-slate-100 ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.id} className="py-3.5 first:pt-0 last:pb-0">
            <button
              type="button"
              id={`accordion-btn-${item.id}`}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
              onClick={() => toggle(index)}
              className={`flex w-full items-center justify-between gap-4 text-left font-bold text-slate-900 transition-colors hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-lg p-1 -m-1 ${activeFocusRings[theme]}`}
            >
              <span className="text-sm sm:text-[15px] leading-snug">{item.title}</span>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                  isOpen ? 'rotate-180 text-slate-700' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            {/* Smooth CSS Grid Height Transition */}
            <div
              id={`accordion-content-${item.id}`}
              role="region"
              aria-labelledby={`accordion-btn-${item.id}`}
              className="grid transition-all duration-200 ease-out"
              style={{
                gridTemplateRows: isOpen ? '1fr' : '0fr',
              }}
            >
              <div className="overflow-hidden">
                <div className="pt-2.5 pb-1 text-xs sm:text-sm leading-relaxed text-slate-600 font-medium">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
