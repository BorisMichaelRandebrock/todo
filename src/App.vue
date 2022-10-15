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

const userStore = useUserStore();
const router = useRouter();
const { user } = storeToRefs(userStore);

onMounted(async () => {
  try {
    await userStore.fetchUser(); // here we call fetch user
    if (!user.value) {
      console.log("no estás logeado");
      router.push({ path: "/signIn" });
      await userStore.signUp("boris@randebrock.com", "password");
      console.log(user.value);
    } else {
      console.log("estás logeado");
      console.log(user.value);
      router.push({ path: "/" });
    }
  } catch (e) {
    console.log(e);
  }
});
</script>
