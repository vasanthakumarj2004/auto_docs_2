import React from 'react';

interface AutoDocsLogoProps {
  className?: string;
  variant?: 'header' | 'footer';
}

export const AutoDocsLogo: React.FC<AutoDocsLogoProps> = ({
  className = 'h-8 sm:h-9 w-auto',
  variant = 'header',
}) => {
  const isFooter = variant === 'footer';

  if (isFooter) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 340 80"
        fill="none"
        className={className}
        aria-label="AutoDocs Logo"
      >
        <defs>
          <linearGradient id="adVioletGradDark" x1="10" y1="14" x2="62" y2="66" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#818CF8" />
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>

          <linearGradient id="adTealGradDark" x1="18" y1="58" x2="62" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2DD4BF" />
            <stop offset="100%" stopColor="#0D9488" />
          </linearGradient>

          <linearGradient id="adFoldGradDark" x1="44" y1="14" x2="58" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#99F6E4" />
            <stop offset="100%" stopColor="#14B8A6" />
          </linearGradient>

          <linearGradient id="adDocsGradDark" x1="154" y1="20" x2="246" y2="52" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#A5B4FC" />
            <stop offset="55%" stopColor="#818CF8" />
            <stop offset="100%" stopColor="#2DD4BF" />
          </linearGradient>

          <filter id="adMarkGlowDark" x="4" y="6" width="70" height="70" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#818CF8" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Modern Icon Mark */}
        <g filter="url(#adMarkGlowDark)">
          <path
            d="M 20 16 C 16.5 16, 14 18.5, 14 22 L 14 58 C 14 61.5, 16.5 64, 20 64 L 52 64 C 55.5 64, 58 61.5, 58 58 L 58 28 L 46 16 Z"
            fill="url(#adVioletGradDark)"
          />
          <path
            d="M 46 16 L 46 25 C 46 26.6, 47.4 28, 49 28 L 58 28 Z"
            fill="url(#adFoldGradDark)"
            opacity="0.95"
          />
          <path
            d="M 22 47 C 22 36, 32 30, 42 34 C 47 36, 49 41, 51 46 C 52 48.5, 54 50, 56 50 C 58 50, 59 48.5, 59 46"
            stroke="url(#adTealGradDark)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 20 34 C 23 34, 25 35.5, 26 38 C 28 43, 33 48, 41 48 C 47 48, 51 43, 51 38"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <circle cx="36" cy="41" r="3.2" fill="#FFFFFF" />
          <circle cx="36" cy="41" r="1.6" fill="#0D9488" />
        </g>

        {/* Typography */}
        <g>
          <text
            x="74"
            y="47"
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif"
            fontSize="34"
            fontWeight="900"
            letterSpacing="-0.04em"
            fill="#FFFFFF"
          >
            Auto
          </text>
          <text
            x="156"
            y="47"
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif"
            fontSize="34"
            fontWeight="900"
            letterSpacing="-0.04em"
            fill="url(#adDocsGradDark)"
          >
            Docs
          </text>
          <text
            x="75"
            y="63"
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif"
            fontSize="8"
            fontWeight="700"
            letterSpacing="0.22em"
            fill="#94A3B8"
          >
            INTELLIGENT DOCUMENT AUTOMATION
          </text>
          <circle cx="248" cy="28" r="3" fill="#2DD4BF" />
          <circle cx="248" cy="28" r="1.5" fill="#FFFFFF" />
        </g>
      </svg>
    );
  }

  // Header variant (light background)
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 340 80"
      fill="none"
      className={className}
      aria-label="AutoDocs Logo"
    >
      <defs>
        <linearGradient id="adVioletGradHdr" x1="10" y1="14" x2="62" y2="66" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#4338CA" />
        </linearGradient>

        <linearGradient id="adTealGradHdr" x1="18" y1="58" x2="62" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#14B8A6" />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>

        <linearGradient id="adFoldGradHdr" x1="44" y1="14" x2="58" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#5EEAD4" />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>

        <linearGradient id="adDocsGradHdr" x1="154" y1="20" x2="246" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="65%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>

        <filter id="adMarkGlowHdr" x="4" y="6" width="70" height="70" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#4F46E5" floodOpacity="0.22" />
        </filter>
      </defs>

      {/* Modern Icon Mark */}
      <g filter="url(#adMarkGlowHdr)">
        <path
          d="M 20 16 C 16.5 16, 14 18.5, 14 22 L 14 58 C 14 61.5, 16.5 64, 20 64 L 52 64 C 55.5 64, 58 61.5, 58 58 L 58 28 L 46 16 Z"
          fill="url(#adVioletGradHdr)"
        />
        <path
          d="M 46 16 L 46 25 C 46 26.6, 47.4 28, 49 28 L 58 28 Z"
          fill="url(#adFoldGradHdr)"
          opacity="0.95"
        />
        <path
          d="M 22 47 C 22 36, 32 30, 42 34 C 47 36, 49 41, 51 46 C 52 48.5, 54 50, 56 50 C 58 50, 59 48.5, 59 46"
          stroke="url(#adTealGradHdr)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M 20 34 C 23 34, 25 35.5, 26 38 C 28 43, 33 48, 41 48 C 47 48, 51 43, 51 38"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="36" cy="41" r="3.2" fill="#FFFFFF" />
        <circle cx="36" cy="41" r="1.6" fill="#0D9488" />
      </g>

      {/* Typography */}
      <g>
        <text
          x="74"
          y="47"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif"
          fontSize="34"
          fontWeight="900"
          letterSpacing="-0.04em"
          fill="#0F172A"
        >
          Auto
        </text>
        <text
          x="156"
          y="47"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif"
          fontSize="34"
          fontWeight="900"
          letterSpacing="-0.04em"
          fill="url(#adDocsGradHdr)"
        >
          Docs
        </text>
        <text
          x="75"
          y="63"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif"
          fontSize="8"
          fontWeight="700"
          letterSpacing="0.22em"
          fill="#64748B"
        >
          INTELLIGENT DOCUMENT AUTOMATION
        </text>
        <circle cx="248" cy="28" r="3" fill="#0D9488" />
        <circle cx="248" cy="14" r="0" fill="none" />
        <circle cx="248" cy="28" r="1.5" fill="#FFFFFF" />
      </g>
    </svg>
  );
};
