<template>
  <header v-if="!admin">
    <!-- Navigation links -->
    <Navbar />
  </header>
  <!-- Router view for each route -->
  <router-view />
  <Footer v-if="!admin" />
</template>

<script setup>
import { watch, ref } from "vue";
import { useRoute } from "vue-router";

import Navbar from "@/layout/Navbar.vue";
import Footer from "./layout/Footer.vue";

const route = useRoute();

const admin = ref(false);

watch(route, (newRoute) => {
  console.log(newRoute.path);
  if (newRoute.path.includes("admin")) {
    admin.value = true;
  } else {
    admin.value = false;
  }
});
</script>
