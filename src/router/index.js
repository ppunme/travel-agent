import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/App/HomeView.vue";
import Tours from "../views/App/Tours.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/tours",
    name: "Tours",
    component: Tours,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
