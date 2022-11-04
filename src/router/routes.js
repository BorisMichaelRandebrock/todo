const routes = [
  {
    path: "/",
    name: "/home",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/home", component: () => import("src/pages/TodoPage.vue") },
      { path: "/shopping", component: () => import("pages/ShoppingPage.vue") },
      {
        path: "/drugstore",
        component: () => import("pages/DrugstorePage.vue"),
      },

      { path: "/auth", component: () => import("pages/AuthPage.vue") },
      { path: "/help", component: () => import("pages/HelpPage.vue") },
      { path: "/profile", component: () => import("pages/ProfilePage.vue") },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
