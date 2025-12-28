const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gumroad: {
          bg: "#f4f4f0",
          cream: "#FDFBF7",
          charcoal: "#1a1a1a",
          black: "#000000",
          pink: "#ff90e8",
          yellow: "#ffc900",
          blue: "#90e0ff",
          green: "#00d084",
        },
        brand: {
          black: "#000000",
          dark: "#0a0a0a",
          green: "#00ff41", // Matrix/Cyber green
          "green-dim": "#008F11",
        }
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};