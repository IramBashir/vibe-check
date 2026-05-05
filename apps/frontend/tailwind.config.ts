import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          50: '#fff5f9',
          100: '#ffe6f0',
          200: '#ffb6e1',
          300: '#ff8fd1',
          400: '#ff69b4',
          500: '#ff1493',
          600: '#db0075',
          700: '#b3005f',
          800: '#8b0052',
          900: '#66003f',
        },
        purple: {
          50: '#f8f6fc',
          100: '#ede6fa',
          200: '#dccdf5',
          300: '#c8a8ee',
          400: '#b088e8',
          500: '#9370db',
          600: '#7e5dc8',
          700: '#6d4dab',
          800: '#5a3a8f',
          900: '#46286f',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        display: ['var(--font-poppins)'],
      },
    },
  },
  plugins: [],
}

export default config