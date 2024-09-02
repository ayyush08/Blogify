/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        permanent_marker: ["Permanent Marker", 'cursive'],
        motserrat:["Montserrat Alternates", 'sans-serif']
      }
    },
  },
  plugins: [],
}