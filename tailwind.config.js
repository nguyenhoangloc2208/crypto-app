import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        primary: 'var(--color-bg-primary)',
        secondary: 'var(--color-bg-secondary)',
        button: 'var(--color-bg-button)'
      },
      textColor: {
        accent: 'var(--color-text-accent)',
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        btnText: 'var(--color-bg-secondary)'
      },
      borderColor: {
        secondary: 'var(--color-bg-secondary)'
      },
      fill: {
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-bg-secondary)'
      }
    }
  },
  plugins: [require('daisyui')]
}
