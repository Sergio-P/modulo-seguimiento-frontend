/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5E5384",
        secondary: "#225497",
        error: "#EB5757",
        accent: "#FB7A08",
        body: "#4E4B66",
        title: "#2C2948",
      },
    },
  },
  plugins: [],
};
