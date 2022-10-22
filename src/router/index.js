import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";

// import { useUserStore } from "../stores/user";
// import { storeToRefs } from "pinia";
// import { useRouter } from "vue-router";
// import { useQuasar } from "quasar";

// // const userStore = useUserStore();
// const router = useRouter();
// // const { user } = storeToRefs(userStore);
// const $q = useQuasar();
// const pinia = createPinia();

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function ({ store, ssrContext }) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;
  const router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  // const isValid = async () => {
  //   // await userStore.fetchUser(); // here we call fetch user

  //   if (!store.state.value.user.value) {
  //     console.log("no estás logeado");
  //     router.push({ path: "/auth" });
  //     // await userStore.signUp("boris@randebrock.com", "password");
  //     // console.log(user.value);
  //   } else {
  //     console.log("estás logeado");
  //     $q.notify({
  //       color: "green-8",
  //       textColor: "white",
  //       icon: "done_all",
  //       message: "you are logged in!",
  //     });
  //   }
  // };

  // router.beforeEach(async (to) => {
  //   // redirect to login page if not logged in and trying to access a restricted page
  //   const loginUrl = "/auth";
  //   const publicPages = [loginUrl];
  //   const authRequired = !publicPages.includes(to.path);

  //   if (authRequired) {
  //     if (isValid()) return;
  //     // if (isValid($store.user)) return;
  //     return loginUrl;
  //   }
  // });

  return router;
});
