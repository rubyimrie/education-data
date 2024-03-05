/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
   darkMode: false, // or 'media' or 'class'
   theme: {
     extend: {
      colors: {
        'cutty-sark': {
          '50': '#f5f8f7',
          '100': '#dee9e8',
          '200': '#bdd2d0',
          '300': '#94b4b3',
          '400': '#6d9493',
          '500': '#598282',
          '600': '#416060',
          '700': '#374c4e',
          '800': '#2f3f40',
          '900': '#2a3737',
          '950': '#141f1f',
        },
     },
   },
  },
   variants: {
     extend: {},
   },
   plugins: [],
 }
