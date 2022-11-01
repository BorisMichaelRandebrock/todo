<template>
  <q-layout view="hHr lpR fFf">
    <q-header elevated class="bg-light-blue text-indigo-10" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" class="draw-toggler" />
      </q-toolbar>
      <span class="header-span">

        <section class="q-px-lg q-pt-l q-mb-md">
          <div class="text-h3">{{ headerTitle() }}</div>
          <div class="text-subtitle1">{{ todaysDate() }}</div>
        </section>

      </span>
      <q-img src="../../public/blueSky.jpg" class="header-img absolute-top" />

    </q-header>

    <q-drawer :width="250" class="q-pa-md smaller-drawer" v-model="rightDrawerOpen" side="right" overlay
      behavior="desktop" elevated style="display: flex; flex-direction: column" @click="toggleRightDrawer">
      <div class="q-img q-img--menu absolute-top" role="img" style="height: 148px">
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
            <div class="text-weight-bold text-indigo-10">{{ userMail }}</div>
          </div>
        </div>
      </div>


      <!-- <q-scroll-area style="height: calc(100% -150px); margin-top: 150px "> -->
      <h3>scroll</h3>
      <q-list v-if="userMail">
        <q-item to="/home" clickable v-ripple>
          <q-item-section>Todo
          </q-item-section>
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>
        </q-item>
        <q-item to="/shopping" clickable v-ripple>
          <q-item-section>Shopping
          </q-item-section>
          <q-item-section avatar>
            <q-icon name="shopping_cart" />
          </q-item-section>
        </q-item>
        <q-item to="/drugstore" clickable v-ripple>
          <q-item-section>Drugstore
          </q-item-section>
          <q-item-section avatar>
            <q-icon name="medication" />
          </q-item-section>
        </q-item>
        <q-item to="/help" clickable v-ripple>
          <q-item-section>Help
          </q-item-section>
          <q-item-section avatar>
            <q-icon name="help" />
          </q-item-section>
        </q-item>

      </q-list>
      <q-btn v-if="userMail" @click="goToSignOut()" color="purple-6" glossy="" label="Sign out"
        class="sign-out-button" />
      <div v-else class="not-logged-draw">
        <q-icon name="fingerprint" size="100px" color="blue-10" class="fingerprint-icon" />
        <div class="text-h6 text-blue-10">you are not logged in</div>


      </div>


    </q-drawer>

    <q-page-container>

      <router-view v-slot="{ Component }">
        <component :is="Component" />
        <keep-alive>
        </keep-alive>
      </router-view>
    </q-page-container>

    <q-footer reveal elevated class="bg-grey-4 text-white">
      <q-toolbar>
        <q-toolbar-title class="footer-layout">
          <q-avatar>
            <img src="/list.png" />
          </q-avatar>
        </q-toolbar-title>
        <section>
          <div class="text-weight-bold user-mail text-indigo-10">{{ userMail }}</div>
        </section>
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
  return date.formatDate(timeStamp, "dddd D MMMM");
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
  // console.log($userStore);
  $userStore.signOut();
  // console.log("you are signed out", user.value);
  $q.notify({
    color: "purple-6",
    textColor: "white",
    icon: "waving_hand",
    message: `See you soon, ${user.value.email}`,
  });
  router.push({ path: "/auth" });
}

const rightDrawerOpen = ref(false);

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
};

const headerTitle = () => {
  if (router.currentRoute.value.path === "/home") {
    return "Todo";
  } else if (router.currentRoute.value.path === "/shopping") {
    return "Shopping";
  } else if (router.currentRoute.value.path === "/help") {
    return "Help";
  } else if (router.currentRoute.value.path === "/drugstore") {
    return "Drugstore";
  } else {
    return "to-do list";
  }
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
  top: 55vh;
}

.draw-toggler {
  position: relative;
  top: 0px;
  right: 96%;
  margin-left: 10px;
}


.header-span {
  display: flex;
  justify-content: space-between;
}

.user-mail {
  opacity: 0.5;
}

.q-img__content>div {
  pointer-events: all;
  position: absolute;
  padding: 0 16px 32px;
  display: flex;
  background: rgba(0, 0, 0, 0.47);
  flex-direction: column;
  align-items: center;
}

.not-logged-draw {
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-around;
  align-items: center;
  height: 55%;
  font-weight: 500;
}

.fingerprint-icon {
  opacity: 0.5;
}

.sign-out-button {
  position: relative;
  top: 25px;
}



@media (max-width: 600px) {
  .draw-toggler {
    position: relative;
    top: 0px;
    right: 89%;
    margin-left: 10px;
  }
}
</style>
