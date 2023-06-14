const { defineConfig } = require("@vue/cli-service");

const path = require("path");

module.exports = defineConfig({
  publicPath: "/travel-agent/",
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
});
