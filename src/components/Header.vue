<template>
  <!-- Header -->
  <header id="header" class="header">
    <nav class="nav-bar">
      <!-- Navbar -->
      <ul class="flex flex-row mt-1">
        <li>
          <router-link class="px-2" :to="{ name: 'about' }">About</router-link>
        </li>
        <!-- Navigation Links -->
        <li v-if="!userStore.userLoggedIn">
          <a class="px-2" href="#" @click.prevent="toggleAuthModal"
            >Login / Register</a
          >
        </li>
        <template v-else>
          <li>
            <router-link class="px-2" :to="{ name: 'manage' }"
              >Manage</router-link
            >
          </li>
          <li>
            <a class="px-2" href="#" @click.prevent="signOut">Logout</a>
          </li>
        </template>
      </ul>

      <router-link
        class="font-bold uppercase text-2xl mr-4"
        :to="{ name: 'home' }"
        exact-active-class="no-active"
      >
        Partagé
      </router-link>

      <ul class="ml-auto">
        <label>
          <a
            href="#"
            class="px-2 text-white translate-button"
            @click.prevent="changeLocale"
          >
            {{ currentLocale }}
          </a>
        </label>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapStores } from "pinia";
import useModalStore from "../stores/modal";
import useUserStore from "../stores/user";

export default {
  name: "AppHeader",
  computed: {
    ...mapStores(useModalStore, useUserStore),
    currentLocale() {
      return this.$i18n.locale === "pt" ? "Português" : "Inglês";
    },
  },
  methods: {
    toggleAuthModal() {
      this.modalStore.isOpen = !this.modalStore.isOpen;
      console.log(this.modalStore.isOpen);
    },
    signOut() {
      this.userStore.signout();

      // console.log(this.$route);
      if (this.$route.meta.requiresAuth) {
        this.$router.push({ name: "home" });
      }
    },
    changeLocale() {
      this.$i18n.locale = this.$i18n.locale === "pt" ? "en" : "pt";
    },
  },
};
</script>

<style scoped>
.header {
  z-index: 2;

  margin: 30px auto;
  width: 874px;
  height: 90px;

  background: #c6ff7e;
  border: 3px solid #000000;
  border-radius: 13px;

  display: flex;
  align-items: center;
  justify-content: space-around;
}

.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 140px;
}

.translate-button {
  padding: 7px 16px;
  background: #2793f2;
  border: 3px solid #000000;
  box-shadow: 4px 4px 0px #000000;
  border-radius: 5px;
  color: white;
}

@media (max-width: 1040px) {
  .header {
    width: 600px;
  }

  .nav-bar {
    gap: 40px;
  }
}
</style>
