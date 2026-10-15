import React, { ReactNode } from 'react';

interface FeatureSectionProps {
  id: string;
  label: string;
  title: string;
  copy: string;
  steps: [string, string, string][];
  visual: ReactNode;
  reverse?: boolean;
}

export const FeatureSection: React.FC<FeatureSectionProps> = ({
  id,
  label,
  title,
  copy,
  steps,
  visual,
  reverse = false,
}) => {
  return (
    <section id={id} className="border-b border-slate-200 bg-[#fafcff] py-16 sm:py-20">
      <div
        className={`site-shell grid items-center gap-12 lg:grid-cols-12 ${
          reverse ? 'lg:[&>*:first-child]:order-2' : ''
        }`}
      >
        <div className="lg:col-span-6">
          <span className={`section-label ${reverse ? 'text-teal-700' : 'text-blue-600'}`}>{label}</span>
          <h2 className="mt-2 max-w-xl text-3xl font-extrabold leading-[1.15] tracking-[-0.05em] text-slate-950">
            {title}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">{copy}</p>

          <div className="mt-8 space-y-5">
            {steps.map(([num, stepTitle, stepDesc]) => (
              <div key={num} className="flex gap-3.5">
                <span className={`step-number ${reverse ? 'step-teal' : ''}`}>{num}</span>
                <div>
                  <h3 className="text-xs font-extrabold text-slate-950">{stepTitle}</h3>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{stepDesc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6">{visual}</div>
      </div>
    </section>
  );
};
