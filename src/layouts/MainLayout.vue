<template>
  <q-layout view="hHr lpR fFf">
    <q-header elevated class="bg-light-blue text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <!-- <q-avatar class="avatar-container">
            <img src="../../public/" class="avatar" />
          </q-avatar> -->
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" class="draw-toggler" />
      </q-toolbar>

      <section class="q-px-lg q-pt-l q-mb-md">
        <div class="text-h3">Todo</div>
        <div class="text-subtitle1">{{ todaysDate() }}</div>
      </section>
      <q-img src="../../public/blueSky.jpg" class="header-img absolute-top" />
      <!-- <q-tabs align="left">
        <q-route-tab to="/IndexPage" label="Page One" />
        <q-route-tab to="/page2" label="Page Two" />
        <q-route-tab to="/page3" label="Page Three" />
      </q-tabs> -->
    </q-header>

    <q-drawer :width="250" class="q-pa-md smaller-drawer" v-model="rightDrawerOpen" side="right" overlay
      behavior="desktop" elevated style="display: flex; flex-direction: column">
      <div class="q-img q-img--menu absolute-top" role="img" style="height: 148px">
        <!-- <div style="padding-bottom: 82.5195%"></div> -->
        <div class="q-img__container absolute-full">
          <img class="q-img__image q-img__image--with-transition q-img__image--loaded background-img" loading="lazy"
            fetchpriority="auto" aria-hidden="true" draggable="false" src="/blueSky.jpg" />
        </div>
        <div class="q-img__content absolute-full q-anchor--skip">
          <div class="absolute-bottom bg-transparent">
            <div class="q-avatar q-mb-sm">
              <div class="q-avatar__content row flex-center overflow-hidden">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </div>
            </div>
            <div class="text-weight-bold">{{ userMail }}</div>
          </div>
        </div>
      </div>

      <q-btn v-if="userMail" @click="goToSignOut()" color="purple-6" glossy="" label="Sign out"
        class="sign-out-button" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal elevated class="bg-grey-4 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="/list.png" />
          </q-avatar>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { date } from "quasar";
import { ref } from "vue";
import { useUserStore } from "src/stores/user";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { computed } from "vue";

const $q = useQuasar();
const $userStore = useUserStore();
const { user } = storeToRefs($userStore);
const router = useRouter();

const todaysDate = () => {
  const timeStamp = Date.now();
  return date.formatDate(timeStamp, "dddd D MMMM YYYY");
};

const userMail = computed(() => {
  if (user.value) {
    return user.value.email;
  } else {
    return "";
  }
  return user.value.email;
});

// const todoUser = () => ref(user.value.displayName);

async function goToSignOut() {
  console.log($userStore);
  $userStore.signOut();
  console.log("you are signed out", user.value);
  $q.notify({
    color: "purple-6",
    textColor: "white",
    icon: "waving_hand",
    message: "you are logged out!",
  });
  router.push({ path: "/auth" });
}

const rightDrawerOpen = ref(false);

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
};
</script>

<style scoped>
.avatar-container {
  width: 40px;
  height: 40px;
  padding: 2px;
  position: relative;
  top: -2px;
  right: 3px;
  z-index: 100;
}

.background-img {
  object-fit: cover;
  object-position: 50% 50%;
  z-index: 99;
}

.q-avatar .q-mb-sm {
  font-size: 56px;
}

/* .smaller-drawer {
  width: 250px;
  display: flex;
  flex-direction: column;
} */
/* img.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: lightgrey;
} */
/* .avatar {
  width: 30px;
  height: 30px;
} */
.q-drawer__content.fit.scroll {
  display: flex;
  flex-direction: column;
}

.header-img {
  height: 100%;
  z-index: -1;
}

header.q-header.q-layout__section--marginal.fixed-top.bg-deep-purple.text-white {
  height: 150px;
  display: grid;
}

.q-page-container {
  padding: 0 !important;
  height: 100vh;
  margin: 0;
}

.q-img__container.absolute-full {
  height: 146px;
}

.sign-out-button {
  top: 85vh;
}

.draw-toggler {
  position: relative;
  top: 0px;
  right: 96%;
  margin-left: 10px;
}

/* aside.q-drawer.q-drawer--right.q-drawer--standard.fixed.q-drawer--on-top.q-drawer--top-padding {
  width: 250px !important;
} */


@media (max-width: 600px) {
  .draw-toggler {
    position: relative;
    top: 0px;
    right: 89%;
    margin-left: 10px;
  }

}
</style>
