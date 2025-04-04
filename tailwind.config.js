/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ghibli-blue': '#4C9EEB',
        'ghibli-green': '#48BB78',
        'ghibli-purple': '#9F7AEA',
        'ghibli-yellow': '#ECC94B'
      }
    },
  },
  plugins: [],
}