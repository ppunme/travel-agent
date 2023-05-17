import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import PrimeVue from "primevue/config";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "./assets/scss/main.scss";
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";

import {
  faSquareFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

library.add(faSquareFacebook, faInstagram, faTwitter);

const app = createApp(App);

app
  .use(router)
  .use(PrimeVue)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
