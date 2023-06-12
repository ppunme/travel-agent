module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        "primary-blue": "#176AA1",
        "primary-border-color": "#9d9d9d",
        "primary-icon-color": "rgba(51,51,51,0.6)",
        "green-line-app": "#00B900",
        "green-add": "#06C755",
      },
      width: {
        100: "25rem",
        104: "26rem",
        108: "27rem",
        112: "28rem",
        116: "29rem",
        120: "30rem",
        124: "31rem",
        128: "32rem",
        132: "33rem",
        136: "34rem",
        140: "35rem",
        144: "36rem",
      },
      height: {
        120: "30rem",
        128: "32rem",
        132: "33rem",
        144: "36rem",
        148: "37rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
