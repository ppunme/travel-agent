import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes.js";

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  }
};

const router = createRouter({
  history: createWebHistory(),
  base: "/",
  routes,
  scrollBehavior,
});

// Navigation guard to check if the route requires authentication
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth && token === null) {
    router.push("/unauthorized"); // Redirect to the forbidden page if not authenticated
  } else {
    next(); // Continue navigation
  }
});

export default router;
