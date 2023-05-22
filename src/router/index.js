import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/App/Home.vue";
import Tours from "@/views/App/Tours.vue";
import TourDetails from "@/views/App/TourDetails.vue";
import Contact from "@/views/App/Contact.vue";
import TourManagement from "@/views/App/TourManagement.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/tours",
    name: "Tours",
    component: Tours,
  },
  {
    path: "/tours/:tourId",
    name: "Tour Detail",
    component: TourDetails,
  },
  {
    path: "/tours/create",
    name: "Create Tour",
    component: TourManagement,
  },
  {
    path: "/tours/edit/:tourId",
    name: "Edit Tour",
    component: TourManagement,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
