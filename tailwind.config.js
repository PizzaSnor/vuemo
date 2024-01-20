/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  // other configurations...
  purge: {
    content: [
      './src/**/*.html',
      './src/**/*.vue',
      './src/**/*.js',
    ],
  },
  // Specify the output path for the compiled CSS
  output: './dist/output.css',
};