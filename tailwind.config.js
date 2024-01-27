/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        standard: ['League Spartan', 'sans-serif']
      },
      colors: {
        vLight: '#f4f1de',
        vOrange: '#e07a5f',
        vBlue: '#3d405b',
        vGreen: '#81b29a',
        vYellow: '#f2cc8f',
        vPurple: '#b264cd',
        vRed: '#7a2c2a',
        vBg: '#bfbbae'
      },
      boxShadow: {
        'custom': '0px 3px 3px rgba(0, 0, 0, 0.2), 0px 0.85px 3px rgba(0, 0, 0, 0.19)'
      },
      placeholderColor: {
        'custom': 'rgba(61, 64, 92, 0.5)'
      }
    }
  },
  output: './dist/output.css',
};