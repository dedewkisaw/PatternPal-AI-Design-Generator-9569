/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neugray: {
          50: '#f2f3f7',
          100: '#e6e7eb',
          200: '#d5d7db',
          300: '#b4b6bc',
          400: '#888a91',
          500: '#6e7077',
          600: '#5c5e64',
          700: '#4a4c51',
          800: '#3d3e42',
          900: '#27282b',
        },
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        }
      },
      boxShadow: {
        'neu-flat': '-8px -8px 16px 0 rgba(255,255,255,0.6), 8px 8px 16px 0 rgba(0,0,0,0.1)',
        'neu-pressed': 'inset -8px -8px 16px 0 rgba(255,255,255,0.6), inset 8px 8px 16px 0 rgba(0,0,0,0.1)',
        'neu-flat-sm': '-4px -4px 8px 0 rgba(255,255,255,0.6), 4px 4px 8px 0 rgba(0,0,0,0.1)',
        'neu-pressed-sm': 'inset -4px -4px 8px 0 rgba(255,255,255,0.6), inset 4px 4px 8px 0 rgba(0,0,0,0.1)',
      },
      backgroundImage: {
        'neu-gradient': 'linear-gradient(145deg, #e6e7eb, #ffffff)',
        'neu-gradient-pressed': 'linear-gradient(145deg, #d5d7db, #e6e7eb)',
      }
    },
  },
  plugins: [],
}