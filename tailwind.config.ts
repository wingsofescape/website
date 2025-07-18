module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx,html}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "boho-beige": "#f5f0e1",
        "boho-brown": "#8b5a2b",
        "boho-green": "#4caf50",
        "boho-blue": "#3f51b5",
      },
      fontFamily: {
        boho: ['"Poppins"', "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
