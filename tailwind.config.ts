module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx,html}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "theme-primary": "#1e293b", // bg-slate-800 color
        "theme-slate": "#1e293b", // Updated to match bg-slate-800
      },
      boxShadow: {
        'neumorphic-light': '-6px -6px 12px #ffffff, 6px 6px 12px #a7a7a7',
        'neumorphic-dark': '6px 6px 12px #a7a7a7, -6px -6px 12px #ffffff',
        'neumorphic-inset-light': 'inset -6px -6px 12px #ffffff, inset 6px 6px 12px #a7a7a7',
        'neumorphic-inset-dark': 'inset 6px 6px 12px #a7a7a7, inset -6px -6px 12px #ffffff',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
