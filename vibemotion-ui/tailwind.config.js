/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: {
          purple: "#a855f7",
          dark: "#2a0a4a",
          glow: "#c084fc",
        },
      },
    },
  },
  plugins: [],
};
