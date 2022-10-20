<template>
  <q-drawer
    v-model="rightDrawerOpen"
    side="right"
    overlay
    behavior="mobile"
    elevated
    style="display: flex; flex-direction: column"
  >
    <q-btn
      @click="goToSignOut"
      style="background: #738580; color: white"
      label="Sign out"
    />
  </q-drawer>
</template>

<script setup></script>
