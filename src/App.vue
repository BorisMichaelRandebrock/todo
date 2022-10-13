<template>
  <section>
    <router-view class="app-main" />
    <!-- your routes will load inside of these tags -->
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "./stores/user";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

onMounted(async () => {
  try {
    await userStore.fetchUser(); // here we call fetch user
    if (!user.value) {
      console.log("no estás logeado");
      await userStore.signUp("boris@randebrock.com", "password");
      console.log(user.value);
    } else {
      console.log("estás logeado");
      console.log(user.value);
    }
  } catch (e) {
    console.log(e);
  }
});
</script>
