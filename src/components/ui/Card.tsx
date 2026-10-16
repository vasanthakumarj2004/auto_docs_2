'use client';
import React, { useRef, useState, useEffect } from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  withGhostLayers?: boolean;
  withSpotlight?: boolean;
  spotlightColor?: string;
  accentBorder?: 'blue' | 'teal' | 'orange' | 'green' | 'neutral' | 'none';
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  withGhostLayers = false,
  withSpotlight = false,
  spotlightColor = 'rgba(47, 61, 224, 0.08)',
  accentBorder = 'none',
  className = '',
  children,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const borderStyles = {
    none: 'border border-slate-200/90',
    neutral: 'border border-slate-200/90',
    blue: 'border border-slate-200/90 border-t-2 border-t-brand-blue',
    teal: 'border border-slate-200/90 border-t-2 border-t-brand-teal',
    orange: 'border border-slate-200/90 border-t-2 border-t-brand-orange',
    green: 'border border-slate-200/90 border-l-[5px] border-l-brand-green',
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!withSpotlight || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos(null);
      }}
      onMouseMove={handleMouseMove}
      className={`relative rounded-2xl bg-white p-7 sm:p-9 shadow-xs transition-all duration-300 hover:shadow-md ${
        withGhostLayers ? 'card-3d-layered' : ''
      } ${borderStyles[accentBorder]} ${className}`.trim()}
      {...props}
    >
      {/* 3D Physical Ghost Layers */}
      {withGhostLayers && (
        <>
          <div className="card-3d-ghost card-3d-ghost-1" aria-hidden="true" />
          <div className="card-3d-ghost card-3d-ghost-2" aria-hidden="true" />
        </>
      )}

      {/* Subtle Cursor Spotlight (Desktop only, GPU composited) */}
      {withSpotlight && mousePos && isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-0 rounded-2xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(380px circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor}, transparent 80%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Content wrapper ensuring z-index above spotlight and ghost layers */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
