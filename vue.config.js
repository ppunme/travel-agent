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
});
