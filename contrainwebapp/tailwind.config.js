/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}", 
      "./components/**/*.{js,ts,jsx,tsx}",
      "./reusableComponents/**/*.{js,ts,jsx,tsx}",
    ],
    safelist: [
      'text-white/90',
      'bg-white/20',
      'bg-white/30',
      'bg-emerald-500/10',
      'text-emerald-500/90',
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require('tailwindcss-animate'),
    ],
  }
  