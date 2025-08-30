module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx,html}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "theme-primary": "#1e293b", // bg-slate-800 color
        "theme-slate": "#1e293b", // Updated to match bg-slate-800
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
