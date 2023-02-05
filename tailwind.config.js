/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");
module.exports = {
  mode: "jit",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["var(--font-outfit)", ...fontFamily.sans],
      },
      colors: {
        navy: "#273043",
        honey: "#F39237",
        magenta: "#BF1263",
        azure: "#0E79B2",
        parchment: "#FBFFF1",
      },
      gridTemplateColumns: {
        "1-2": "1fr 2fr",
      },
    },
  },
  plugins: [],
};
