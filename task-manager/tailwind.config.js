/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#000080",
        darkBlue: "	#00008b",
        grey: "#add8e6",
        blue: "#6495ed",
      },
    },
  },
  plugins: [],
};
