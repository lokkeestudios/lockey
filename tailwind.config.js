const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html,astro,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["'Roboto Mono', monospace", ...defaultTheme.fontFamily.mono],
        display: [
          "'Roboto Condensed', sans-serif",
          ...defaultTheme.fontFamily.sans,
        ],
        body: ["'Roboto', sans-serif", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
