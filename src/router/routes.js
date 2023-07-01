export const routes = [
  {
    path: "/",
    component: () => import("@/layout/UserLayout.vue"),
    children: [
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
    ],
  },
  {
    path: "/admin",
    name: "login",
    component: () => import("@/views/Admin/Login.vue"),
  },
];
