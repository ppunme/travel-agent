import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/App/Home.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("@/views/App/Contact.vue"),
  },
  {
    path: "/tours",
    name: "tours",
    component: () => import("@/views/App/Tours.vue"),
  },
  {
    path: "/tours/:tourId",
    name: "tour-detail",
    component: () => import("@/views/App/TourDetails.vue"),
  },
  {
    path: "/tours/create",
    name: "create-tour",
    component: () => import("@/views/App/CreateTour.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/tours/edit/:tourId",
    name: "edit-tour",
    component: () => import("@/views/App/EditTour.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/admin",
    name: "login",
    component: () => import("@/views/Admin/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Admin/Register.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    component: () => import("@/layout/NotFound.vue"),
  },
  {
    path: "/unauthorized",
    component: () => import("@/layout/Unauthorized.vue"),
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

// Navigation guard to check if the route requires authentication
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  console.log("token", token === null);

  if (to.meta.requiresAuth && token === null) {
    router.push("/unauthorized"); // Redirect to the forbidden page if not authenticated
  } else {
    next(); // Continue navigation
  }
});

export default router;
