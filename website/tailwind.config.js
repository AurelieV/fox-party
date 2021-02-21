const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: false,
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      indigo: colors.indigo,
      amber: colors.amber,
      neutral: colors.coolGray,
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      black: colors.coolGray['900'],

      primary: {
        dark: 'var(--fp-color-primary-dark)',
        DEFAULT: 'var(--fp-color-primary)',
        light: 'var(--fp-color-primary-light)',
      },
      secondary: {
        dark: 'var(--fp-color-secondary-dark)',
        DEFAULT: 'var(--fp-color-secondary)',
        light: 'var(--fp-color-secondary-light)',
      },
      background: 'var(--fp-color-background)',
      text: {
        DEFAULT: 'var(--fp-color-text)',
        'on-primary': 'var(--fp-color-text_on-primary)',
        'on-secondary': 'var(--fp-color-text_on-secondary)',
      },
    },
  },
}
