/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {colors: {
      accent: {
        DEFAULT: '#003B7A',
        strong: '#001733',
        medium: '#005ABA',
        weak: '#8AB3FF',
      },
      neutral: {
        DEFAULT: '#ffffff',
        strong: '#ffffff',
        medium: '#ffffff',
        weak: '#ffffff',
      },
      section: '#ffffff',
      background: '#ffffff',
      success: {
        DEFAULT: '#58FF00',
        weak: '#8FFF70',
      },
      danger: {
        DEFAULT: '#FF2401',
        strong: '#9C1500',
        medium: '#ffffff',
        weak: '#C25C57',
      },
      warning: {
        DEFAULT: '#C2BB00',
        weak: '#FFF776',
      },
      info: {
        DEFAULT: '#00F3FF',
        weak: '#7BDCFF',
      },
      special: {
        black: '#000000',
        white: '#ffffff',
      },
    },
  },
  fontFamily: {
    roobert: ['Roobert', 'sans-serif'],
    inter: ['Inter', 'sans-serif'],
  },
  },
  plugins: [],
};

module.exports = config;
