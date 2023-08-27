/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#79B4B7",
        darkBlue: "	#79B4B7",
        grey: "#9D9D9D",
        blue: "#FEFBF3",
      },
    },
  },
  plugins: [],
};
