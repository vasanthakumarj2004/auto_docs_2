'use client';
import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { X, Play } from 'lucide-react';
import { VideoConfig } from '@/src/content/videos';
import { VideoPlayer } from './VideoPlayer';

interface VideoModalProps {
  config: VideoConfig;
  trigger?: ReactNode;
  triggerLabel?: string;
  className?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  config,
  trigger,
  triggerLabel = 'Watch 2-Min Demo',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const triggerRef = useRef<HTMLButtonElement | HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Open modal
  const handleOpen = () => {
    setIsOpen(true);
  };

  // Close modal
  const handleClose = () => {
    setIsOpen(false);
    // Return focus to triggering element
    setTimeout(() => {
      triggerRef.current?.focus();
    }, 50);
  };

  // Scroll lock & Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button on open
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      } else if (e.key === 'Tab') {
        // Focus trap inside modal
        if (!modalRef.current) return;
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      {/* Trigger */}
      {trigger ? (
        <div
          ref={triggerRef as React.RefObject<HTMLDivElement>}
          tabIndex={0}
          role="button"
          onClick={handleOpen}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleOpen();
            }
          }}
          className={`cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded-xl ${className}`}
          aria-label={`Open video modal: ${config.title}`}
        >
          {trigger}
        </div>
      ) : (
        <button
          ref={triggerRef as React.RefObject<HTMLButtonElement>}
          type="button"
          onClick={handleOpen}
          className={`inline-flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-700 px-4 py-2 text-xs font-mono font-bold text-white shadow-md hover:bg-slate-800 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-violet-500 ${className}`}
        >
          <Play size={13} className="fill-white text-white" />
          <span>{triggerLabel}</span>
        </button>
      )}

      {/* Modal Backdrop & Dialog */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <div
            ref={modalRef}
            className="relative w-full max-w-4xl rounded-2xl bg-slate-900 border border-slate-800 p-4 sm:p-6 shadow-2xl animate-scaleIn overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div>
                <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-violet-400">
                  Product Demonstration
                </span>
                <h3 id="video-modal-title" className="text-sm sm:text-base font-extrabold text-white">
                  {config.title}
                </h3>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={handleClose}
                aria-label="Close video dialog (Escape)"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
              >
                <X size={16} />
              </button>
            </div>

            {/* Embedded Accessible VideoPlayer */}
            <div className="w-full">
              <VideoPlayer config={config} autoPlayMuted={false} showTranscript={true} />
            </div>

            {/* Modal Footer */}
            <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800/80">
              <span>Press <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-300">Esc</kbd> to close</span>
              <span>1080p HD · WebVTT Captions Available</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
