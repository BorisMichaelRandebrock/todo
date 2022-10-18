<script setup>
import SignUp from "src/components/SignUp.vue";
import SignIn from "src/components/SignIn.vue";
import MainLayout from "../layouts/MainLayout.vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import HeaderPage from "../components/HeaderPage.vue";
import SideDrawer from "../components/SideDrawer.vue";
import FooterPage from "../components/FooterPage.vue";
</script>

<template>
  <SignIn />
  <SignUp />
  <MainLayout />
  <!-- <HeaderPage /> -->
  <!-- <SideDrawer /> -->
  <!-- <FooterPage /> -->
  <!--
  <SignIn /> -->
  <!-- <q-page class="flex flex-center">
</q-page> -->
  <!-- <q-page-container> </q-page-container> -->
  <!-- <router-view /> -->
</template>
