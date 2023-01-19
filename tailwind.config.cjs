const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: colors.zinc,
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    // ...
  ],
};
