module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "primary-blue": "#176AA1",
        "line-green": "#00B900",
        "primary-border-color": "#9d9d9d",
        "primary-icon-color": "rgba(51,51,51,0.6)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
