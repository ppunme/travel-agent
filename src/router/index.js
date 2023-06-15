import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/App/Home.vue";
import Tours from "@/views/App/Tours.vue";
import TourDetails from "@/views/App/TourDetails.vue";
import Contact from "@/views/App/Contact.vue";
import CreateTour from "@/views/App/CreateTour.vue";
import EditTour from "@/views/App/EditTour.vue";
import Login from "@/views/Admin/Login.vue";
import Register from "@/views/Admin/Register.vue";
import NotFound from "@/layout/NotFound.vue";
import Unauthorized from "@/layout/Unauthorized.vue";

const routes = [
  {
    path: "/travel-agent/",
    name: "home",
    component: Home,
  },
  {
    path: "/travel-agent/contact",
    name: "contact",
    component: Contact,
  },
  {
    path: "/travel-agent/tours",
    name: "tours",
    component: Tours,
  },
  {
    path: "/travel-agent/tours/:tourId",
    name: "tour-detail",
    component: TourDetails,
  },
  {
    path: "/travel-agent/tours/create",
    name: "create-tour",
    component: CreateTour,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/travel-agent/tours/edit/:tourId",
    name: "edit-tour",
    component: EditTour,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/travel-agent/admin",
    name: "login",
    component: Login,
  },
  {
    path: "/travel-agent/register",
    name: "register",
    component: Register,
  },
  { path: "/travel-agent/:pathMatch(.*)", component: NotFound },
  { path: "/travel-agent/unauthorized", component: Unauthorized },
];

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  }
};

const router = createRouter({
  history: createWebHistory(),
  base: "/travel-agent/",
  routes,
  scrollBehavior,
});

// Navigation guard to check if the route requires authentication
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth && token === null) {
    router.push("/travel-agent/unauthorized"); // Redirect to the forbidden page if not authenticated
  } else {
    next(); // Continue navigation
  }
});

export default router;
