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
          50: 'var(--color-brand-50, #E8FAF4)',
          100: 'var(--color-brand-100, #D0F6E9)',
          200: 'var(--color-brand-200, #99EBD1)',
          300: 'var(--color-brand-border, #99EBD1)',
          400: 'var(--color-brand-400, #42E2B2)',
          500: 'var(--color-brand-500, #18CB96)',
          600: 'var(--color-brand, #18CB96)',
          700: 'var(--color-brand-strong, #0FA879)',
          800: 'var(--color-brand-800, #0A5C43)',
          900: 'var(--color-brand-900, #063D2C)',
          950: 'var(--color-ink, #063D2C)',
        },
        brand: {
          violet: 'var(--color-brand, #18CB96)',
          'violet-hover': 'var(--color-brand-strong, #0FA879)',
          ink: '#231134',
          'ink-light': '#352044',
          paper: '#FAFAFA',
          lavender: 'var(--color-brand-soft, #D0F6E9)',
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
