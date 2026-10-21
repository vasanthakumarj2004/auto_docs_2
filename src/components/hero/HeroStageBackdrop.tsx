'use client';

import React from 'react';

export const HeroStageBackdrop: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none" aria-hidden="true">
      {/* 1. Base Oceanic Slate-Teal Gradient Canvas matching reference video */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0c222e] via-[#122e3d] to-[#1c4456]" />

      {/* 2. Soft Ambient Radial Glows (breathing slow-drift spotlights) */}
      <div className="absolute -top-20 left-1/4 h-[520px] w-[520px] rounded-full bg-[#06b6d4]/20 blur-[130px] animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-4 left-10 h-[520px] w-[520px] rounded-full bg-[#10b981]/18 blur-[140px] animate-pulse" style={{ animationDuration: '11s' }} />
      <div className="absolute top-1/4 right-8 h-[440px] w-[440px] rounded-full bg-[#3b82f6]/18 blur-[120px] animate-pulse" style={{ animationDuration: '9s' }} />

      {/* 3. High-Fidelity Photographic & 3D Render Plate Image with Slow Breathing Drift */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src="/images/hero-data-reference-v2.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-left opacity-[0.92] mix-blend-screen scale-[1.03] transition-transform duration-1000 ease-out"
          style={{
            animation: 'heroPlateDrift 20s ease-in-out infinite alternate',
          }}
        />
      </div>

      {/* 4. Interactive Animated SVG Telemetry Layer: Mint Splines, Flowing Pulses, and Glowing Radar Nodes */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1106 720"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="refMintGrad1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="refMintGrad2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="refAreaGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0c222e" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Ambient Area Chart Fill under main curve */}
        <path
          d="M -50 580 Q 280 480 540 560 T 1150 400 L 1150 740 L -50 740 Z"
          fill="url(#refAreaGlow)"
        />

        {/* Dynamic Curved Splines */}
        {/* Spline 1 */}
        <path
          id="spline1"
          d="M -50 580 Q 280 480 540 560 T 1150 400"
          stroke="url(#refMintGrad1)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />

        {/* Spline 2 */}
        <path
          id="spline2"
          d="M -50 470 Q 340 390 640 500 T 1150 310"
          stroke="url(#refMintGrad2)"
          strokeWidth="2.0"
          strokeLinecap="round"
        />

        {/* Spline 3 (Dotted lower track) */}
        <path
          d="M -50 670 Q 420 590 760 630 T 1150 520"
          stroke="url(#refMintGrad1)"
          strokeWidth="1.6"
          strokeDasharray="4 4"
          strokeOpacity="0.45"
          strokeLinecap="round"
        />

        {/* Flowing Pulse Packet on Spline 1 (White core + Cyan/Mint halo) */}
        <circle r="4.5" fill="#ffffff">
          <animateMotion
            path="M -50 580 Q 280 480 540 560 T 1150 400"
            dur="8s"
            repeatCount="indefinite"
          />
        </circle>
        <circle r="12" fill="#2dd4bf" fillOpacity="0.45">
          <animateMotion
            path="M -50 580 Q 280 480 540 560 T 1150 400"
            dur="8s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Flowing Pulse Packet on Spline 2 */}
        <circle r="3.5" fill="#ffffff">
          <animateMotion
            path="M -50 470 Q 340 390 640 500 T 1150 310"
            dur="11s"
            begin="2.5s"
            repeatCount="indefinite"
          />
        </circle>
        <circle r="10" fill="#34d399" fillOpacity="0.4">
          <animateMotion
            path="M -50 470 Q 340 390 640 500 T 1150 310"
            dur="11s"
            begin="2.5s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Telemetry Junction Nodes with Concentric Rings */}
        <g>
          {/* Node A (260, 500) */}
          <circle cx="260" cy="500" r="14" fill="#38bdf8" fillOpacity="0.2" />
          <circle cx="260" cy="500" r="4" fill="#38bdf8" />
          <circle cx="260" cy="500" r="24" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.25" strokeDasharray="2 3" />

          {/* Node B (540, 560) */}
          <circle cx="540" cy="560" r="16" fill="#34d399" fillOpacity="0.2" />
          <circle cx="540" cy="560" r="4.5" fill="#34d399" />
          <circle cx="540" cy="560" r="28" stroke="#34d399" strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="3 3" />

          {/* Node C (820, 440) */}
          <circle cx="820" cy="440" r="14" fill="#38bdf8" fillOpacity="0.2" />
          <circle cx="820" cy="440" r="4" fill="#38bdf8" />

          {/* Node D (640, 500) */}
          <circle cx="640" cy="500" r="11" fill="#2dd4bf" fillOpacity="0.22" />
          <circle cx="640" cy="500" r="3.5" fill="#2dd4bf" />
        </g>

        {/* Floating Telemetry Number Badges */}
        <g style={{ animation: 'heroFloat 6s ease-in-out infinite alternate' }}>
          <text x="530" y="605" fill="#67e8f9" fontFamily="monospace" fontSize="16" fontWeight="bold" letterSpacing="0.05em">
            51,335
          </text>
        </g>

        <g style={{ animation: 'heroFloat 7s ease-in-out 1s infinite alternate-reverse' }}>
          <text x="290" y="675" fill="#34d399" fillOpacity="0.9" fontFamily="monospace" fontSize="13" fontWeight="bold">
            189.545
          </text>
        </g>

        <g style={{ animation: 'heroFloat 8s ease-in-out 2s infinite alternate' }}>
          <text x="830" y="470" fill="#38bdf8" fillOpacity="0.85" fontFamily="monospace" fontSize="11" fontWeight="600">
            8.73%
          </text>
        </g>

        <g style={{ animation: 'heroFloat 6s ease-in-out 3s infinite alternate-reverse' }}>
          <text x="160" y="445" fill="#2dd4bf" fillOpacity="0.75" fontFamily="monospace" fontSize="11">
            -10,448
          </text>
        </g>

        <g style={{ animation: 'heroFloat 9s ease-in-out 1.5s infinite alternate' }}>
          <text x="900" y="350" fill="#34d399" fillOpacity="0.8" fontFamily="monospace" fontSize="11">
            +99.8%
          </text>
        </g>

        <g style={{ animation: 'heroFloat 5s ease-in-out 2.5s infinite alternate-reverse' }}>
          <text x="390" y="395" fill="#67e8f9" fillOpacity="0.75" fontFamily="monospace" fontSize="11">
            4.2s
          </text>
        </g>
      </svg>

      {/* 5. Precision Vignette: Focused on Left Text Column for WCAG AAA Contrast */}
      {/* Left side contrast gradient */}
      <div className="absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-[#0c222e]/92 via-[#0c222e]/68 to-transparent z-1" />
      {/* Bottom edge vignette */}
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#0c222e]/85 to-transparent z-1" />

      {/* 6. Embedded CSS Keyframe Animations for Natural Fluid Movement */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes heroPlateDrift {
          0% {
            transform: scale(1.02) translate(0px, 0px);
          }
          50% {
            transform: scale(1.04) translate(-10px, -6px);
          }
          100% {
            transform: scale(1.02) translate(8px, 4px);
          }
        }
        @keyframes heroFloat {
          0% {
            transform: translateY(0px);
          }
          100% {
            transform: translateY(-8px);
          }
        }
      `}} />
    </div>
  );
};
