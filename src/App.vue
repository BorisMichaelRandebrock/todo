<template>
  <section>
    <router-view class="app-main" />
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useUserStore } from "./stores/user";
import { useQuasar } from "quasar";

const userStore = useUserStore();
const router = useRouter();
const { user } = storeToRefs(userStore);
const $q = useQuasar();

onMounted(async () => {
  try {
    await userStore.fetchUser(); // here we call fetch user
    if (!user.value) {
      console.log("no estás logeado");
      router.push({ path: "/auth" });
      await userStore.signUp("boris@randebrock.com", "password");
      // console.log(user.value);
    } else {
      console.log("estás logeado");
      $q.notify({
        color: "bg-deep-purple",
        textColor: "white",
        icon: "done_all",
        message: "you are logged in!",
      });
      //   console.log(user.value);
      router.push({ path: "/" });
    }
  } catch (e) {
    console.log(e);
  }
});
</script>
