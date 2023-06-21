import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store";

import { gtag } from "./utils/VueGtag";
import PrimeVue from "primevue/config";
import { usePrimeVue, componentPrimeVue } from "./utils/PrimeVue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "./assets/scss/main.scss";
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "./utils/FontAwesome";

export const app = createApp(App);

gtag.forEach(([tag, config]) => app.use(tag, config));

usePrimeVue.forEach((item) => app.use(item));
componentPrimeVue.forEach(([name, component]) =>
  app.component(name, component)
);

app
  .use(router)
  .use(store)
  .use(PrimeVue, { ripple: true })
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
