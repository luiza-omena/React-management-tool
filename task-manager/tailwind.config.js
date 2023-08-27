/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightWhite: "#79B4B7",
        darkBlue: "	#79B4B7",
        blueWhite: "#9D9D9D",
        blue: "#FEFBF3",
        lightWhite: "#F2F5F8",
        darkPurple: "#160F29",
        darkGreen: "#006C67",
        blueWhite: "#EDF7FC",
      },
    },
  },
  plugins: [],
};
