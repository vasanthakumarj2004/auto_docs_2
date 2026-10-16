/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#2f3de0',
          'blue-hover': '#2430be',
          teal: '#0f8a6a',
          'teal-hover': '#0c6f55',
          green: '#1f9d55',
          navy: '#0b1330',
          'navy-light': '#141e42',
          orange: '#e8671c',
          'orange-hover': '#cf5713',
          cream: '#f8f6f1',
          lavender: '#e8eafb',
          mint: '#e1f3ee',
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
