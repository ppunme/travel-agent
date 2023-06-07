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
import { watch, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Navbar from "@/layout/Navbar.vue";
import Footer from "./layout/Footer.vue";
//import jwt from "jsonwebtoken";
import store from "@/store";

const route = useRoute();
const admin = ref(false);

const isTokenExpired = (token) => {
  try {
    console.log(token);
    //const decoded = jwt.decode(token);
    //console.log(decoded);
    // if (!decoded || typeof decoded.exp === "undefined") {
    //   // Invalid token or expiration time missing
    //   return true;
    // }

    // const currentTime = Math.floor(Date.now() / 1000);
    // return decoded.exp < currentTime;
  } catch (error) {
    // Failed to decode token
    return true;
  }
};

const getEmail = (token) => {
  try {
    console.log(token);
    // const decoded = jwt.decode(token);

    // if (!decoded || typeof decoded.email === "undefined") {
    //   // Invalid token or email missing
    //   return null;
    // }

    // return decoded.email;
  } catch (error) {
    return null;
  }
};

watch(route, (newRoute) => {
  if (newRoute.path.includes("admin")) {
    admin.value = true;
  } else {
    admin.value = false;
  }
});

onMounted(() => {
  const token = localStorage.getItem("token");

  if (token) {
    const email = getEmail(token);
    const expired = isTokenExpired(token);

    if (!expired) {
      store.dispatch("login", { email: email });
    }
  }
});
</script>
