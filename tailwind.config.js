/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        brand: '#006c4f',
        'brand-light': '#009b71',
        'brand-dark': '#004d38',
        background: '#eaeaea',
      },
    },
  },
  plugins: [],
};
