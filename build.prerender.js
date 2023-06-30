module.exports = (api) => {
  api.registerCommand("build:prerender", async (args) => {
    const PrerendererWebpackPlugin = require("@prerenderer/webpack-plugin");
    const { initializeApp } = require("firebase/app");
    const {
      getFirestore,
      collection,
      query,
      getDocs,
    } = require("firebase/firestore");
    const firebaseConfig = {
      apiKey: process.env.VUE_APP_API_KEY,
      authDomain: process.env.VUE_APP_AUTH_DOMAIN,
      projectId: process.env.VUE_APP_PROJECT_ID,
      storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
      appId: process.env.VUE_APP_APP_ID,
    };
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const q = query(collection(db, "tours"));

    const tour = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      tour.push(doc.id);
    });

    api.chainWebpack((config) => {
      config.plugin("prerender").use(PrerendererWebpackPlugin, [
        {
          routes: ["/", "/contact", "/tours"].concat(
            tour.map((item) => `/tours/${item}`)
          ),
          renderer: "@prerenderer/renderer-puppeteer",
          rendererOptions: {
            renderAfterDocumentEvent: "render-complete",
          },
        },
      ]);
    });

    await api.service.run("build", args);
  });
};

module.exports.defaultModes = {
  "build:prerender": "production",
};
