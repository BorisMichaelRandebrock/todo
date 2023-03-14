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
    await userStore.fetchUser();
    if (!user.value) {
      router.push({ path: "/auth" });
    } else {
      $q.notify({
        color: "green-8",
        textColor: "white",
        icon: "done_all",
        message: "you are logged in!",
      });
      router.push({ path: "/home" });
    }
  } catch (e) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: `An error occurred: ${e}`,
    });
  }
});

let previousTitle = document.title;

window.addEventListener("blur", () => {
  document.title = "You`ve got nothing else to-do? 🤔 😮";
})

window.addEventListener("focus", () => {
  document.title = previousTitle;
})
</script>
