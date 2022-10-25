<script setup>
import SignUp from "src/components/SignUp.vue";
import SignIn from "src/components/SignIn.vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

const SignedUp = ref(true);
</script>

<template>
  <SignIn v-if="SignedUp" />
  <SignUp v-else />
  <div v-if="SignedUp" class="already">
    Don't have an account?
    <q-btn @click="SignedUp = !SignedUp" class="signed-up-button" color="purple-6" glossy="">
      Sign Up
    </q-btn>
  </div>
  <div v-else class="already">
    Already have an account?
    <q-btn @click="SignedUp = !SignedUp" color="purple-6" glossy="" class="signed-up-button">
      Sign In
    </q-btn>
  </div>
</template>

<style scoped>
.signed-up-button {
  padding: 10px;
  border-radius: 5px;
  border: none;
  margin: 10px;
  height: 25px;
  justify-content: center;
}

.already {
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
  top: -200px;
}
</style>
