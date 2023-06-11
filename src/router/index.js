import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/App/Home.vue";
import Tours from "@/views/App/Tours.vue";
import TourDetails from "@/views/App/TourDetails.vue";
import Contact from "@/views/App/Contact.vue";
import CreateTour from "@/views/App/CreateTour.vue";
import EditTour from "@/views/App/EditTour.vue";
import Login from "@/views/Admin/Login.vue";
import Register from "@/views/Admin/Register.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/contact",
    name: "contact",
    component: Contact,
  },
  {
    path: "/tours",
    name: "tours",
    component: Tours,
  },
  {
    path: "/tours/:tourId",
    name: "tour-detail",
    component: TourDetails,
  },
  {
    path: "/tours/create",
    name: "create-tour",
    component: CreateTour,
  },
  {
    path: "/tours/edit/:tourId",
    name: "edit-tour",
    component: EditTour,
  },
  {
    path: "/admin",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
];

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  }
};

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior,
});

export default router;
