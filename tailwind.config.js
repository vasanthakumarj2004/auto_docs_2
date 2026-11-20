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
          50: 'var(--color-brand-50, #EAF6F0)',
          100: 'var(--color-brand-100, #D0EBDD)',
          200: 'var(--color-brand-200, #A8D9BE)',
          300: 'var(--color-brand-border, #97CBAE)',
          400: 'var(--color-brand-400, #52AB77)',
          500: 'var(--color-brand-500, #2E8B57)',
          600: 'var(--color-brand, #2E8B57)',
          700: 'var(--color-brand-strong, #236B43)',
          800: 'var(--color-brand-800, #1B5334)',
          900: 'var(--color-brand-900, #123722)',
          950: 'var(--color-ink, #0F172A)',
        },
        brand: {
          violet: 'var(--color-brand, #2E8B57)',
          'violet-hover': 'var(--color-brand-strong, #236B43)',
          ink: '#0F172A',
          'ink-light': '#1E293B',
          paper: '#FAFAFA',
          lavender: 'var(--color-brand-soft, #EAF6F0)',
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
