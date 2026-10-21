'use client';

import React from 'react';

export const HeroStageBackdrop: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none" aria-hidden="true">
      {/* 1. Base Gradient Canvas */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#061424] via-[#0d2a3a] to-[#14485c]" />

      {/* 2. Soft Ambient Radial Glows */}
      <div className="absolute -top-24 left-1/4 h-[480px] w-[480px] rounded-full bg-[#06b6d4]/15 blur-[120px]" />
      <div className="absolute bottom-0 left-12 h-[500px] w-[500px] rounded-full bg-[#10b981]/15 blur-[130px]" />
      <div className="absolute top-1/3 right-10 h-[420px] w-[420px] rounded-full bg-[#3b82f6]/15 blur-[110px]" />

      {/* 3. SVG Isometric Telemetry Landscape & Flowing Mint Curves */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1106 720"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="mintGrad1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="mintGrad2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.15" />
          </linearGradient>

          <linearGradient id="areaGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#061424" stopOpacity="0" />
          </linearGradient>

          {/* Flowing Pulse 1 */}
          <linearGradient id="pulseGlow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0" />
            <stop offset="70%" stopColor="#34d399" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Isometric Grid Mesh */}
        <g stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.12">
          <line x1="-50" y1="640" x2="1150" y2="350" />
          <line x1="-50" y1="540" x2="1150" y2="250" />
          <line x1="-50" y1="440" x2="1150" y2="150" />
          <line x1="180" y1="750" x2="180" y2="200" strokeDasharray="3 3" strokeOpacity="0.08" />
          <line x1="420" y1="750" x2="420" y2="150" strokeDasharray="3 3" strokeOpacity="0.08" />
          <line x1="680" y1="750" x2="680" y2="100" strokeDasharray="3 3" strokeOpacity="0.08" />
          <line x1="920" y1="750" x2="920" y2="50" strokeDasharray="3 3" strokeOpacity="0.08" />
        </g>

        {/* Ambient Area Chart Fill under main curve */}
        <path
          d="M -50 580 Q 280 480 540 560 T 1150 400 L 1150 740 L -50 740 Z"
          fill="url(#areaGlow)"
        />

        {/* 3 Main Mint Spline Curves */}
        {/* Curve 1 */}
        <path
          id="stageCurve1"
          d="M -50 580 Q 280 480 540 560 T 1150 400"
          stroke="url(#mintGrad1)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />

        {/* Curve 2 */}
        <path
          id="stageCurve2"
          d="M -50 470 Q 340 390 640 500 T 1150 310"
          stroke="url(#mintGrad2)"
          strokeWidth="2.0"
          strokeLinecap="round"
        />

        {/* Curve 3 */}
        <path
          d="M -50 670 Q 420 590 760 630 T 1150 520"
          stroke="url(#mintGrad1)"
          strokeWidth="1.6"
          strokeDasharray="4 4"
          strokeOpacity="0.4"
          strokeLinecap="round"
        />

        {/* Flowing packet along Curve 1 */}
        <circle r="4" fill="#ffffff">
          <animateMotion
            path="M -50 580 Q 280 480 540 560 T 1150 400"
            dur="9s"
            repeatCount="indefinite"
          />
        </circle>
        <circle r="10" fill="#2dd4bf" fillOpacity="0.4">
          <animateMotion
            path="M -50 580 Q 280 480 540 560 T 1150 400"
            dur="9s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Flowing packet along Curve 2 */}
        <circle r="3.5" fill="#ffffff">
          <animateMotion
            path="M -50 470 Q 340 390 640 500 T 1150 310"
            dur="12s"
            begin="3s"
            repeatCount="indefinite"
          />
        </circle>
        <circle r="8" fill="#34d399" fillOpacity="0.35">
          <animateMotion
            path="M -50 470 Q 340 390 640 500 T 1150 310"
            dur="12s"
            begin="3s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Telemetry Junction Nodes */}
        <g>
          {/* Node 1 */}
          <circle cx="260" cy="500" r="11" fill="#38bdf8" fillOpacity="0.15" />
          <circle cx="260" cy="500" r="3.5" fill="#38bdf8" />

          {/* Node 2 */}
          <circle cx="540" cy="560" r="14" fill="#34d399" fillOpacity="0.15" />
          <circle cx="540" cy="560" r="4" fill="#34d399" />

          {/* Node 3 */}
          <circle cx="820" cy="440" r="11" fill="#38bdf8" fillOpacity="0.15" />
          <circle cx="820" cy="440" r="3.5" fill="#38bdf8" />

          {/* Node 4 */}
          <circle cx="640" cy="500" r="9" fill="#2dd4bf" fillOpacity="0.18" />
          <circle cx="640" cy="500" r="3" fill="#2dd4bf" />
        </g>

        {/* 3D Isometric Financial Data Blocks */}
        <g transform="translate(700, 270) scale(0.9)" opacity="0.45">
          <polygon points="40,10 70,25 70,60 40,45" fill="#132c38" stroke="#38bdf8" strokeWidth="1" />
          <polygon points="10,25 40,10 40,45 10,60" fill="#0f232d" stroke="#38bdf8" strokeWidth="1" />
          <polygon points="40,10 70,25 40,40 10,25" fill="#1b3c4c" stroke="#38bdf8" strokeWidth="1" />
        </g>
        <g transform="translate(800, 220) scale(0.75)" opacity="0.35">
          <polygon points="40,10 70,25 70,75 40,60" fill="#132c38" stroke="#34d399" strokeWidth="1" />
          <polygon points="10,25 40,10 40,60 10,75" fill="#0f232d" stroke="#34d399" strokeWidth="1" />
          <polygon points="40,10 70,25 40,40 10,25" fill="#1b3c4c" stroke="#34d399" strokeWidth="1" />
        </g>

        {/* Floating Logistics Badge (Truck glyph) */}
        <g transform="translate(770, 500) scale(0.85)" opacity="0.75">
          <rect x="0" y="0" width="48" height="42" rx="10" fill="#0f2633" stroke="#38bdf8" strokeWidth="1.2" strokeOpacity="0.5" />
          <path d="M12 28h16M28 28V16H12v12zm0 0h5l4-5v-7h-9v12zm-11 3a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm17 0a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>

        {/* Monospace Abstract Floating Telemetry Numbers */}
        <text x="530" y="600" fill="#67e8f9" fontFamily="monospace" fontSize="16" fontWeight="bold" letterSpacing="0.05em">
          51,335
        </text>
        <text x="290" y="670" fill="#34d399" fillOpacity="0.85" fontFamily="monospace" fontSize="13" fontWeight="bold">
          189.545
        </text>
        <text x="830" y="465" fill="#38bdf8" fillOpacity="0.8" fontFamily="monospace" fontSize="11" fontWeight="600">
          8.73%
        </text>
        <text x="160" y="440" fill="#2dd4bf" fillOpacity="0.7" fontFamily="monospace" fontSize="11">
          -10,448
        </text>
        <text x="900" y="345" fill="#34d399" fillOpacity="0.75" fontFamily="monospace" fontSize="11">
          +99.8%
        </text>
        <text x="390" y="390" fill="#67e8f9" fillOpacity="0.7" fontFamily="monospace" fontSize="11">
          4.2s
        </text>
      </svg>

      {/* 4. Typographic Legibility Gradients */}
      {/* Horizontal contrast gradient */}
      <div className="absolute inset-y-0 left-0 w-[65%] bg-gradient-to-r from-[#061424]/92 via-[#061424]/75 to-transparent z-1" />
      {/* Bottom vignette */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#061424]/80 to-transparent z-1" />
    </div>
  );
};
