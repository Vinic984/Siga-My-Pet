/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'pastel-blue': '#E6F3FF',
        'pastel-pink': '#FFE6F0',
        'pastel-yellow': '#FFF9E6',
        'pastel-green': '#E6FFE6',
        'pastel-purple': '#F0E6FF',
        'pastel-orange': '#FFE6CC'
      }
    },
  },
  plugins: [],
}
