'use client';
import React, { useEffect, useState, useRef } from 'react';
import { FlowConnector } from '../FlowConnector';

export interface StepItem {
  number: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  isHighlight?: boolean;
  highlightVariant?: 'amber' | 'blue' | 'teal';
}

export interface StepperProps {
  label: string;
  steps: StepItem[];
  theme?: 'blue' | 'teal';
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  label,
  steps,
  theme = 'blue',
  className = '',
}) => {
  const stepperRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState<number>(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActiveStep(steps.length);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let current = 1;
          setActiveStep(1);
          const interval = setInterval(() => {
            current += 1;
            setActiveStep(current);
            if (current >= steps.length) {
              clearInterval(interval);
            }
          }, 450);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (stepperRef.current) {
      observer.observe(stepperRef.current);
    }

    return () => observer.disconnect();
  }, [steps.length]);

  return (
    <section ref={stepperRef} className={`border-b border-[#ede8de] bg-[#F8F6F1] py-16 sm:py-24 ${className}`}>
      <div className="site-shell">
        {/* Section Header Label */}
        <div className="text-left mb-8 sm:mb-10">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-slate-500">
            {label}
          </span>
        </div>

        {/* 5 Step Cards with Flow Connectors */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-2 sm:gap-2 lg:gap-3">
          {steps.map((step, index) => {
            const stepNum = index + 1;
            const isActive = activeStep >= stepNum;

            // Highlight styling logic
            let cardClasses =
              'flex flex-col items-center justify-center rounded-xl border bg-white p-5 text-center transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 min-h-[148px]';

            if (step.isHighlight) {
              if (step.highlightVariant === 'amber') {
                cardClasses = `relative flex flex-col items-center justify-center rounded-xl border-2 border-amber-300/90 bg-gradient-to-b from-[#fef7ee] to-[#fdeddb] p-5 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 min-h-[148px] ${
                  isActive ? 'pulse-step-amber' : 'opacity-85 shadow-xs'
                }`;
              } else if (step.highlightVariant === 'blue') {
                cardClasses = `relative flex flex-col items-center justify-center rounded-xl border-2 border-blue-200 bg-gradient-to-b from-[#f0f2fe] to-[#e4e7fd] p-5 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 min-h-[148px] ${
                  isActive ? 'pulse-step-blue' : 'opacity-85 shadow-xs'
                }`;
              } else if (step.highlightVariant === 'teal') {
                cardClasses = `relative flex flex-col items-center justify-center rounded-xl border-2 border-teal-300/90 bg-gradient-to-b from-[#e1f3ee] to-[#d2ede5] p-5 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 min-h-[148px] ${
                  isActive ? 'pulse-step-teal' : 'opacity-85 shadow-xs'
                }`;
              }
            } else {
              cardClasses += isActive
                ? ' border-slate-300 shadow-xs'
                : ' border-slate-200/90 shadow-2xs opacity-80';
            }

            return (
              <React.Fragment key={index}>
                <div className={cardClasses}>
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl mb-3 shadow-2xs ${
                      step.isHighlight
                        ? 'bg-white border border-slate-200 text-slate-900 shadow-xs'
                        : 'bg-slate-100 border border-slate-200/90 text-slate-700'
                    }`}
                  >
                    {step.icon}
                  </div>
                  <h3
                    className={`text-sm font-extrabold leading-tight ${
                      step.isHighlight && step.highlightVariant === 'amber'
                        ? 'text-amber-950'
                        : 'text-slate-900'
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`mt-1 text-xs font-medium ${
                      step.isHighlight && step.highlightVariant === 'amber'
                        ? 'text-amber-800/90'
                        : 'text-slate-500'
                    }`}
                  >
                    {step.subtitle}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <FlowConnector stepIndex={stepNum} activeStep={activeStep} theme={theme} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};
