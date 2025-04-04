
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
        'ghibli-yellow': '#FFD700',
        'ghibli-pink': '#F687B3',
        'neoxr-dark': '#0f172a',
        'neoxr-darker': '#0a1120',
        'neoxr-card': '#1e293b',
      },
      fontFamily: {
        'fantasy': ['Nunito', 'sans-serif'],
        'mono': ['Roboto Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
