<script setup>
import SignUp from "src/components/SignUp.vue";
import SignIn from "src/components/SignIn.vue";
import MainLayout from "../layouts/MainLayout.vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import HeaderPage from "../components/HeaderPage.vue";
import SideDrawer from "../components/SideDrawer.vue";
import FooterPage from "../components/FooterPage.vue";
import { ref } from "vue";

const SignedUp = ref(true);
</script>

<template>
  <SignIn v-if="SignedUp" />
  <SignUp v-else />
  <div v-if="SignedUp" class="already">
    Don't have an account?
    <button @click="SignedUp = !SignedUp" class="signed-up-button">
      Sign Up
    </button>
  </div>
  <div v-else class="already">
    Already have an account?
    <button @click="SignedUp = !SignedUp" class="signed-up-button">
      Sign In
    </button>
  </div>
  <MainLayout />
</template>

<style scoped>
.signed-up-button {
  background: #4526a0;
  color: white;
  padding: 10px;
  border-radius: 5px;
  border: none;
  margin: 10px;
}

.already {
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
  top: -212px;
}
</style>
