/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0F1A",
        energy: "#0F6B5F",
        ember: "#FF7A2F",
        mist: "#F5F7FA",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "system-ui", "sans-serif"],
        body: ["'Work Sans'", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
