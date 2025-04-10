/** @type {import('tailwindcss').Config} */

module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#1C1E20",
        primary : "#EEEEEE",
        secondary: "#999999"
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};