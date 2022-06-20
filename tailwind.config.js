module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "light": "var(--light-colour)",
        "dark": "var(--dark-colour)",
      },
      backgroundSize: {
        "double-x": "200% 100%",
        "double-y": "100% 200%",
      },
      backgroundImage: {
        "light-dark-right": "linear-gradient(to right, var(--light-colour) 50%, var(--dark-colour) 50%)",
        "dark-light-right": "linear-gradient(to right, var(--dark-colour) 50%, var(--light-colour) 50%)",
        "light-dark-bottom": "linear-gradient(to bottom, var(--light-colour) 50%, var(--dark-colour) 50%)",
        "dark-light-bottom": "linear-gradient(to bottom, var(--dark-colour) 50%, var(--light-colour) 50%)",
      },
      keyframes: {
        "wiggle-right-left": {
          "0, 100%": { transform: "rotate(-90deg)" },
          "50%": { transform: "rotate(45deg)" },
        },
        "wiggle-left-right": {
          "0, 100%": { transform: "rotate(90deg)" },
          "50%": { transform: "rotate(-45deg)" },
        },
        "grow-fade-in": {
          "0%": { opacity: 0, height: "0%" },
          "100%": { opacity: 1, height: "100%" },
        }
      },
      animation: {
        "wiggle-right-left": "wiggle-right-left 600ms ease-in-out",
        "wiggle-left-right": "wiggle-left-right 600ms ease-in-out",
        "grow-fade-in": "grow-fade-in 1600ms ease-in",
      },
      boxShadow: {
        "slide": "inset 15rem 0 0 0"
      },
      borderColor: {
        DEFAULT: "dark",
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
