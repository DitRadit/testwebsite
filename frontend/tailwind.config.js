const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}', './lib/**/*.js'],
  theme: {
    extend: {
      // Ganti warna utama seluruh situs di sini (indigo, teal, emerald, rose, sky, ...)
      colors: { brand: colors.indigo },
    },
  },
  plugins: [],
};
