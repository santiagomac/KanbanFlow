/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        customFont: ["JetBrainsMono", "sans-serif"]
      },
      screens: {
        "2xsm": "300px",
        "xsm": "378px"
      }
    },
  },
  plugins: [],
}

