/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: '#FAFAFA',
        violet: {
          50: 'var(--color-brand-50, #F8F3FF)',
          100: 'var(--color-brand-100, #F0E5FF)',
          200: 'var(--color-brand-200, #E0CAFE)',
          300: '#D2AFFD',
          400: 'var(--color-brand-400, #C192FB)',
          500: 'var(--color-brand-500, #9F55FA)',
          600: 'var(--color-brand, #8B32F7)',
          700: 'var(--color-brand-strong, #7022D1)',
          800: 'var(--color-brand-800, #592099)',
          900: 'var(--color-brand-900, #411974)',
          950: '#231134',
        },
        brand: {
          violet: 'var(--color-brand, #8B32F7)',
          'violet-hover': 'var(--color-brand-strong, #7022D1)',
          ink: '#231134',
          'ink-light': '#352044',
          paper: '#FAFAFA',
          lavender: 'var(--color-brand-soft, #F0E5FF)',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
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
