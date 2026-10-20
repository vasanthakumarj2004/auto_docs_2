'use client';
import React, { useState } from 'react';
import { ChevronDown, FileText } from 'lucide-react';

interface VideoTranscriptProps {
  transcript: string;
  title?: string;
  className?: string;
}

export const VideoTranscript: React.FC<VideoTranscriptProps> = ({
  transcript,
  title = 'Video Transcript',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={`mt-3 rounded-xl border border-slate-200/90 bg-slate-50/70 p-3 sm:p-4 text-xs ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between font-mono text-[11px] font-bold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
      >
        <span className="flex items-center gap-2">
          <FileText size={13} className="text-blue-600" />
          <span>Read the transcript ({title})</span>
        </span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 text-slate-400 ${
            isOpen ? 'rotate-180 text-blue-600' : ''
          }`}
        />
      </button>

      {/* Permanently present in HTML DOM for SEO crawlers */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100 mt-2.5 pt-2 border-t border-slate-200' : 'grid-rows-[0fr] opacity-0 overflow-hidden'
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-[12px] leading-relaxed text-slate-600 whitespace-pre-line font-sans">
            {transcript}
          </p>
        </div>
      </div>
    </div>
  );
};
