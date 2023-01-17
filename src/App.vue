<template>
  <div class="header-app">
    <Header />
  </div>

  <router-view></router-view>

  <!-- Player -->
  <AppPlayer />

  <!-- Auth Modal -->
  <Auth />
</template>

<script>
import Header from "./components/Header.vue";
import Auth from "./components/Auth.vue";

import { mapWritableState } from "pinia";
import useUSerStore from "./stores/user";
import { auth } from "./includes/firebase";
import AppPlayer from "./components/Player.vue";

export default {
  name: "App",
  components: {
    Header,
    Auth,
    AppPlayer,
  },
  computed: {
    ...mapWritableState(useUSerStore, ["userLoggedIn"]),
  },
  created() {
    if (auth.currentUser) {
      this.userLoggedIn = true;
    }
  },
};
</script>

<style>
.header-app {
  background-color: #2778f2;
  height: 100%;
  padding: 0.1px;
}
</style>
