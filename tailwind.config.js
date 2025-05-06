/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hv': {
          dark: {
            DEFAULT: '#000000',
            100: 'rgba(0, 0, 0, 0.1)',
            200: 'rgba(0, 0, 0, 0.2)',
            300: 'rgba(0, 0, 0, 0.3)',
            400: 'rgba(0, 0, 0, 0.4)',
            500: 'rgba(0, 0, 0, 0.5)',
            600: 'rgba(0, 0, 0, 0.6)',
            700: 'rgba(0, 0, 0, 0.7)',
            800: 'rgba(0, 0, 0, 0.8)',
            900: 'rgba(0, 0, 0, 0.9)',
          },
          white: {
            DEFAULT: '#FFFFFF',
            100: 'rgba(255, 255, 255, 0.1)',
            200: 'rgba(255, 255, 255, 0.2)',
            300: 'rgba(255, 255, 255, 0.3)',
            400: 'rgba(255, 255, 255, 0.4)',
            500: 'rgba(255, 255, 255, 0.5)',
            600: 'rgba(255, 255, 255, 0.6)',
            700: 'rgba(255, 255, 255, 0.7)',
            800: 'rgba(255, 255, 255, 0.8)',
            900: 'rgba(255, 255, 255, 0.9)',
          },
          blue: {
            DEFAULT: '#00A4F9',
            light: '#33B5FA',
            dark: '#0083C7',
          },
          turquoise: {
            DEFAULT: '#63FDFD',
            light: '#85FDFD',
            dark: '#4FB3B3',
          }
        }
      },
      container: {
        center: true,
        padding: '1rem',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(90deg, var(--hv-blue) 0%, var(--hv-turquoise) 100%)',
        'gradient-dark': 'linear-gradient(180deg, var(--hv-dark) 0%, rgba(0, 0, 0, 0.8) 100%)',
      },
    },
  },
  plugins: [],
}