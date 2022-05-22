module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "wiggle-right-left": {
          "0, 100%": { transform: "rotate(-90deg)" },
          "50%": { transform: "rotate(45deg)" },
        },
        "wiggle-left-right": {
          "0, 100%": { transform: "rotate(90deg)" },
          "50%": { transform: "rotate(-45deg)" },
        },
      },
      animation: {
        "wiggle-right-left": "wiggle-right-left 600ms ease-in-out",
        "wiggle-left-right": "wiggle-left-right 600ms ease-in-out",
      },
      boxShadow: {
        "slide": "inset 7.5em 0 0 0"
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
