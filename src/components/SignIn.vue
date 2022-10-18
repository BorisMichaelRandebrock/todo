<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted } from "vue";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const $q = useQuasar();

const router = useRouter();
const userStore = useUserStore();
const { user, session } = storeToRefs(userStore);

const name = ref(null);
const email = ref(null);
const password = ref(null);
const isPwd = ref(true);
const loading = ref(false);

function onReset() {
  name.value = null;
  email.value = null;
  password.value = null;

  isPwd.value = true;
}

async function signIn() {
  if (!password.value) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: `Please sign in with your email and password.`,
    });
  } else {
    try {
      loading.value = true;
      await userStore.signIn(email.value, password.value);

      onReset(); // Reset the form
      router.push({ path: "/home" });
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  }
}
</script>

<template>
  <div class="sign-up" style="margin: 0">
    <div class="q-pa-md">
      <q-form @submit="signIn" @reset="onReset" class="q-gutter-md">
        <q-input
          label="e-mail"
          standout
          v-model="email"
          filled
          type="email"
          hint=""
        >
          <template v-slot:prepend>
            <q-icon name="mail" />
          </template>
        </q-input>

        <q-input
          label="password"
          v-model="password"
          filled
          :type="isPwd ? 'password' : 'text'"
          hint=""
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <div class="form-buttons">
          <q-btn class="first-form-button" label="Login" type="submit" />

          <q-btn outline label="Reset" type="reset" />
        </div>
      </q-form>
      <q-space></q-space>
      <div class="already">
        Don't have an account? <a href="/auth">Sign Up</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sign-up {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form-buttons {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.first-form-button {
  background-color: blueviolet;
  color: white;
}
.q-pa-md {
  padding: 16px 16px;
  width: 50vw;
}

button.q-btn.q-btn-item.non-selectable.no-outline.q-btn--outline.q-btn--rectangle.q-btn--actionable.q-focusable.q-hoverable {
  margin: 10px 0 25px;
}

.already {
  text-align: center;
}
</style>
