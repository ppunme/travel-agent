<template>
  <header v-if="!admin">
    <!-- Navigation links -->
    <Navbar />
  </header>
  {{ user }}
  <!-- Router view for each route -->
  <router-view />

  <Footer v-if="!admin" />
</template>

<script setup>
import { watch, ref, computed } from "vue";
import { useRoute } from "vue-router";
import store from "./store";

import Navbar from "@/layout/Navbar.vue";
import Footer from "./layout/Footer.vue";

const route = useRoute();

const admin = ref(false);

const user = computed(() => store.state.user);

watch(route, (newRoute) => {
  if (newRoute.path.includes("admin")) {
    admin.value = true;
  } else {
    admin.value = false;
  }
});
</script>
