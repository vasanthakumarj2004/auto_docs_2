/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#2f3de0',
          'blue-hover': '#2430be',
          teal: '#0b7056', /* Calibrated for AA contrast (5.35:1) */
          'teal-legacy': '#0f8a6a',
          'teal-hover': '#085441',
          green: '#157a42', /* Calibrated for AA contrast (4.82:1) */
          'green-legacy': '#1f9d55',
          navy: '#0b1330',
          'navy-light': '#141e42',
          orange: '#b84805', /* Calibrated for AA contrast (5.08:1) */
          'orange-legacy': '#e8671c',
          'orange-hover': '#9a3c04',
          cream: '#f8f6f1',
          lavender: '#e8eafb',
          mint: '#e1f3ee',
        },
      },
      zIndex: {
        'deep': '-1',
        'ghost-2': '5',
        'ghost-1': '10',
        'card': '20',
        'dropdown': '40',
        'sticky-nav': '50',
        'sticky-cta': '60',
        'modal': '100',
      },
      boxShadow: {
        'navy-tint': '0 10px 25px -10px rgba(11, 19, 48, 0.08), 0 2px 6px rgba(11, 19, 48, 0.03)',
        'navy-lift': '0 16px 36px -12px rgba(11, 19, 48, 0.12), 0 4px 10px rgba(11, 19, 48, 0.04)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        brand: '10px',
      },
      maxWidth: {
        site: '1200px',
      },
    },
  },
  plugins: [],
}
