/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#006d77',
        secondary: '#83c5be',
        accent: '#edf6f9',
        danger: '#e63946',
      },
    },
  },
  plugins: [],
}
