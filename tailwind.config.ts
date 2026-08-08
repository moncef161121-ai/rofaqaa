import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7f4',
          100: '#d9ebe6',
          200: '#acd4ce',
          300: '#7fbab2',
          400: '#579f96',
          500: '#1B4332',
          600: '#164d2c',
          700: '#0e3a23',
          800: '#0a2818',
          900: '#051510',
        },
        accent: {
          50: '#fffbf0',
          100: '#fef5db',
          200: '#fde9b3',
          300: '#fcd87a',
          400: '#fac847',
          500: '#D4AF37',
          600: '#c69a2a',
          700: '#a87b1f',
          800: '#8a6318',
          900: '#6b4f12',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { transform: 'translateY(10px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-in-out',
        'slide-up': 'slide-up 0.3s ease-in-out',
      },
    },
  },
  plugins: [require('tailwindcss/plugin')],
} satisfies Config

export default config
