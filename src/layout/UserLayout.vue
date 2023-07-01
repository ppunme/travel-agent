<template>
  <Navbar />
  <router-view />
  <Footer />
</template>

<script setup>
import Navbar from "@/layout/Navbar.vue";
import Footer from "@/layout/Footer.vue";
</script>
