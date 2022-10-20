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

const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const isPwd = ref(true);
const isConfirmPwd = ref(true);

async function onSubmit() {
  if (password.value !== confirmPassword.value) {
    $q.notify({
      color: "red-6",
      textColor: "white",
      icon: "warning",
      message: "Passwords do not match.",
    });
  } else {
    try {
      await userStore.signUp(email.value, password.value);
      if (user.value) {
        $q.notify({
          color: "green-6",
          textColor: "white",
          icon: "cloud_done",
          message: "Submitted. Please check your inbox.",
        });

        onReset;
        console.log(`user ${user.value} LOGGED IN`);
        router.push({ path: "/auth" });
      }
    } catch (error) {
      console.log(error);

      $q.notify({
        color: "red-6",
        textColor: "white",
        icon: "warning",
        message: `An error occurred: ${error}`,
      });
    }
  }
}

function onReset() {
  email.value = null;
  password.value = null;
  confirmPassword.value = null;
  isPwd.value = true;
  isConfirmPwd.value = true;
}
</script>

<template>
  <div class="sign-up">
    <div class="q-pa-md">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          label="please enter your email address"
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
          label="create password"
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

        <q-input
          label="confirm password"
          v-model="confirmPassword"
          filled
          :type="isConfirmPwd ? 'password' : 'text'"
          hint=""
        >
          <template v-slot:append>
            <q-icon
              :name="isConfirmPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isConfirmPwd = !isConfirmPwd"
            />
          </template>
        </q-input>

        <div class="form-buttons">
          <q-btn
            class="first-form-button"
            label="Create account"
            type="submit"
            color="purple-6"
            glossy=""
          />

          <q-btn outline label="Reset" type="reset" />
        </div>
      </q-form>
      <q-space></q-space>
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
  justify-content: space-between;
}

/* .first-form-button {
  background-color: blueviolet;
  color: white;
} */
.q-pa-md {
  padding: 16px 16px;
  width: 50vw;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

button.q-btn.q-btn-item.non-selectable.no-outline.q-btn--outline.q-btn--rectangle.q-btn--actionable.q-focusable.q-hoverable {
  margin-top: 10px;
}

.q-space {
  margin-top: 20px;
}

.already {
  text-align: center;
}
</style>
