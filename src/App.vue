<template>
  <header>
    <!-- Navigation links -->
    <Navbar />
  </header>
  <!-- Router view for each route -->
  <router-view />
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
</script>
