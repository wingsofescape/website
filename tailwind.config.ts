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
        "theme-primary": "#1e293b", // bg-slate-800 color
        "theme-slate": "#1e293b", // Updated to match bg-slate-800
      },
      fontFamily: {
       
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
