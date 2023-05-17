module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "primary-blue": "#176AA1",
        "line-green": "#00B900",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
