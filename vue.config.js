const { defineConfig } = require("@vue/cli-service");

const path = require("path");

module.exports = defineConfig({
  publicPath: "/",
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        implementation: require("sass"),
      },
    },
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Wellness Life Travel";
      return args;
    });
  },
  pluginOptions: {
    sitemap: {
      baseURL: "https://wellnesslifetravelth.com",
      routes: [
        {
          path: "/",
          name: "home",
        },
        {
          path: "/contact",
          name: "contact",
        },
        {
          path: "/tours",
          name: "tours",
        },
      ],
    },
  },
});
