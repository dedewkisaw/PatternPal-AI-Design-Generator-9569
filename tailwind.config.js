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
        'neu-flat': '-8px -8px 16px 0 rgba(255,255,255,0.8), 8px 8px 16px 0 rgba(0,0,0,0.15)',
        'neu-pressed': 'inset -4px -4px 8px 0 rgba(255,255,255,0.7), inset 4px 4px 8px 0 rgba(0,0,0,0.15)',
        'neu-flat-sm': '-4px -4px 8px 0 rgba(255,255,255,0.8), 4px 4px 8px 0 rgba(0,0,0,0.15)',
        'neu-pressed-sm': 'inset -2px -2px 5px 0 rgba(255,255,255,0.7), inset 2px 2px 5px 0 rgba(0,0,0,0.15)',
        'neu-ring': '0 0 0 3px rgba(226, 232, 240, 0.5), -3px -3px 6px 0 rgba(255,255,255,0.8), 3px 3px 6px 0 rgba(0,0,0,0.15)',
        'neu-button': '-5px -5px 10px 0 rgba(255,255,255,0.8), 5px 5px 10px 0 rgba(0,0,0,0.15)',
        'neu-button-pressed': 'inset -3px -3px 6px 0 rgba(255,255,255,0.7), inset 3px 3px 6px 0 rgba(0,0,0,0.15)',
        'neu-card': '-10px -10px 20px 0 rgba(255,255,255,0.8), 10px 10px 20px 0 rgba(0,0,0,0.15)',
      },
      backgroundImage: {
        'neu-gradient': 'linear-gradient(145deg, #e6e7eb, #ffffff)',
        'neu-gradient-pressed': 'linear-gradient(145deg, #d5d7db, #e6e7eb)',
        'neu-primary': 'linear-gradient(145deg, #0284c7, #38bdf8)',
        'neu-primary-pressed': 'linear-gradient(145deg, #0369a1, #0284c7)',
      },
      borderRadius: {
        'neu': '16px',
        'neu-sm': '12px',
        'neu-lg': '24px',
      }
    },
  },
  plugins: [],
}