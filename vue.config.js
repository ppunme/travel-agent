const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const PrerendererWebpackPlugin = require("@prerenderer/webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

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
      plugins: [
        new CopyPlugin({
          patterns: [{ from: "robots.txt", to: "" }],
        }),
      ],
    };
  },
  chainWebpack: async (config) => {
    config.plugin("prerender").use(PrerendererWebpackPlugin, [
      {
        routes: ["/", "/contact", "/tours"],
        renderer: "@prerenderer/renderer-puppeteer",
        rendererOptions: {
          renderAfterDocumentEvent: "render-complete",
        },
      },
    ]);
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
