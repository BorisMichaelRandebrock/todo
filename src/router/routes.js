const routes = [
  {
    path: "/",
    name: "/home",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/home", component: () => import("pages/IndexPage.vue") },
    ],
  },
  {
    path: "/auth",
    name: "auth",
    // component: () => import("layouts/AuthLayout.vue"),
    // children: [{ path: "", component: () => import("pages/AuthPage.vue") }],
    component: () => import("src/pages/AuthPage.vue"),
  },

  {
    path: "/signIn",
    name: "signin",
    component: () => import("src/components/SignIn.vue"),
    // component: () => import("layouts/MainLayout.vue"),
    // children: [
    //   { path: "", component: () => import("components/SignInPage.vue") },
    // ],
  },

  // {
  //   path: "/",
  //   name: "index",
  //   component: () => import("src/pages/IndexPage.vue"),
  // },

  // {
  //   path: "/signIn",
  //   name: "signIn",
  //   component: () => import("components/SignInPage.vue"),
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
