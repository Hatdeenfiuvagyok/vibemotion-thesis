/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: {
          purple: "#a855f7", // világos neon lila
          dark: "#2a0a4a",   // sötét lila háttér
          glow: "#c084fc",   // lilás fény
        },
      },
    },
  },
  plugins: [],
};
