/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5E5384",
        secondary: "#225497",
        background: {
          light: "#FCFCFC",
          DEFAULT: "#EFF0F6",
          dark: "#D9DBE9",
        },
        font: {
          DEFAULT: "#111111",
          title: "#2C2948",
          subtitle: "#6E7191",
        },
        error: "#EB5757",
        accent: "#FB7A08",
        body: "#4E4B66",
      },
    },
  },
  plugins: [],
};
