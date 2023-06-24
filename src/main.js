import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store";

import { gtag, gconfig } from "./utils/VueGtag";
import PrimeVue from "primevue/config";
import { usePrimeVue, componentPrimeVue } from "./utils/PrimeVue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createHead } from "@vueuse/head";

import "./assets/scss/main.scss";
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "./utils/FontAwesome";

export const app = createApp(App);
const head = createHead();

usePrimeVue.forEach((item) => app.use(item));
componentPrimeVue.forEach(([name, component]) =>
  app.component(name, component)
);

app
  .use(router)
  .use(store)
  .use(PrimeVue, { ripple: true })
  .use(head)
  .use(gtag, gconfig)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
