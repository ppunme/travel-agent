const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  publicPath: "/",
  transpileDependencies: true,
  configureWebpack: () => {
    return {
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "src"),
        },
      },
    };
  },
  chainWebpack: async (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Wellness Life Travel";
      return args;
    });
  },
  css: {
    loaderOptions: {
      sass: {
        implementation: require("sass"),
      },
    },
  },
  pluginOptions: {
    sitemap: {
      baseURL: "https://wellnesslifetravelth.com",
      routes: [
        {
          path: "/",
        },
        {
          path: "/contact",
        },
        {
          path: "/tours",
        },
      ],
    },
  },
});
