import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';

interface FlowConnectorProps {
  stepIndex: number;
  activeStep: number;
}

export const FlowConnector: React.FC<FlowConnectorProps> = ({
  stepIndex,
  activeStep,
}) => {
  const isPast = activeStep >= stepIndex;
  const isCurrent = activeStep === stepIndex;

  return (
    <div className="flex items-center justify-center py-2 md:py-0" aria-hidden="true">
      {/* Desktop Horizontal Connector */}
      <div className="hidden md:flex items-center gap-1 w-8 lg:w-10 relative">
        <div className="h-[2px] w-full bg-slate-200 relative overflow-hidden rounded-full">
          <div
            className={`absolute inset-0 bg-gradient-to-r from-violet-400 to-violet-500 transition-all duration-500 ${
              isPast ? 'w-full opacity-100' : 'w-0 opacity-0'
            }`}
          />
          {isCurrent && (
            <div className="absolute top-0 bottom-0 w-3 bg-white/80 blur-[1px] animate-pulse" />
          )}
        </div>
        <ArrowRight
          size={14}
          className={`shrink-0 transition-colors duration-300 ${
            isPast ? 'text-brand-violet' : 'text-slate-300'
          }`}
        />
      </div>

      {/* Mobile Vertical Stepper Connector */}
      <div className="flex md:hidden flex-col items-center my-1 relative">
        <div className="w-[2px] h-6 bg-slate-200 relative overflow-hidden rounded-full">
          <div
            className={`absolute inset-0 bg-gradient-to-b from-violet-400 to-violet-500 transition-all duration-500 ${
              isPast ? 'h-full opacity-100' : 'h-0 opacity-0'
            }`}
          />
        </div>
        <ArrowDown
          size={13}
          className={`shrink-0 transition-colors duration-300 ${
            isPast ? 'text-brand-violet' : 'text-slate-300'
          }`}
        />
      </div>
    </div>
  );
};
