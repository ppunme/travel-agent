import { createApp } from "vue";
import { createHead } from "@vueuse/head";

import App from "./App.vue";
import router from "./router/index.js";
import PrimeVue from "primevue/config";

const store = () => import("./store");
const { VueFire, VueFireAuth } = await import("vuefire");
const { firebaseApp } = await import("./firebase");
const VueGtag = await import("vue-gtag");
const { gconfig } = await import("./utils/VueGtag");
const { primeVueServices } = await import("./utils/PrimeVue");
const { FontAwesomeIcon } = await import("@fortawesome/vue-fontawesome");

import "default-passive-events";
import "./assets/scss/main.scss";
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "./utils/FontAwesome";

const app = createApp(App);

const head = createHead();

primeVueServices.forEach((item) => app.use(item));

app
  .use(router)
  .use(() => store)
  .use(() => head)
  .use(() => VueFire, {
    firebaseApp,
    modules: [VueFireAuth()],
  })
  .use(VueGtag, gconfig)
  .use(PrimeVue, { ripple: true })
  .component("font-awesome-icon", FontAwesomeIcon);

router.isReady().then(() => {
  app.mount("#app");
});
