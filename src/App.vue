<!-- <template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script> -->
<template>
  <section>
    <router-view class="app-main" />
    <!-- your routes will load inside of these tags -->
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
// import { useUserStore } from "./store/user.js";
import { useUserStore } from "./stores/user.js";

const router = useRouter();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

onMounted(async () => {
  try {
    await userStore.fetchUser(); // here we call fetch user
    if (!user.value) {
      // redirect them to logout if the user is not there
      router.push({ path: "/auth" });
    } else {
      // continue to dashboard
      router.push({ path: "/" });
    }
  } catch (e) {
    console.log(e);
  }
});
</script>
