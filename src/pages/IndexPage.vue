<template>
  <q-page class="flex flex-center">
    <h1>hello world</h1>
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
});
</script>

<style scoped>
q-page {
  display: flex;
  flex-direction: column;
}
</style>
