<template>
  <div class="layout-app-vue">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "./components/global/Header.vue";
export default {
  components: {
    Header,
  },
};
</script>

<style lang="scss">
.layout-app-vue {
  margin: 0;
  padding: 0;
  background: $color--bg;
  height: 100vh;
}
</style>
