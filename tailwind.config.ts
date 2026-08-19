import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // System font stack tuned for an Apple-like aesthetic.
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Display',
          'Inter',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        display: [
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Display',
          'Inter',
          'sans-serif',
        ],
      },
      colors: {
        ink: {
          50: '#f5f5f7',
          100: '#e8e8ed',
          400: '#86868b',
          600: '#424245',
          900: '#1d1d1f',
          950: '#000000',
        },
        accent: {
          // Cinematic deep blue used in the hero gradient.
          500: '#0a84ff',
        },
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 22s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;