
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ghibli: {
          blue: '#6698cb',
          green: '#8bc9a6',
          yellow: '#f9db79',
          pink: '#e8a3bf',
          red: '#e47a7a',
        }
      },
      fontFamily: {
        fantasy: ['Segoe UI', 'Arial', 'sans-serif']
      }
    },
  },
  plugins: [],
}
