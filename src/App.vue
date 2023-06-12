<template>
  <header v-if="!admin">
    <!-- Navigation links -->
    <Navbar />
  </header>
  <!-- Router view for each route -->
  <router-view />
  <Toast />
  <Footer v-if="!admin" />
</template>

<script setup>
  import { watch, ref, onMounted, computed } from "vue";
  import { useRoute } from "vue-router";
  import store from "@/store";
  import { useToast } from "primevue/usetoast";

  import Navbar from "@/layout/Navbar.vue";
  import Footer from "./layout/Footer.vue";

  const route = useRoute();
  const toast = useToast();

  const admin = ref(false);

  const toastMessage = computed(() => store.state.toast);

  const isTokenExpired = (token) => {
    try {
      const JWT = token;
      const jwtPayload = JSON.parse(window.atob(JWT.split(".")[1]));
      const exp = jwtPayload.exp;
      const now = parseInt(String(Date.now() / 1000));

      if (exp - now < 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      // Failed to decode token
      return true;
    }
  };

  const getEmail = (token) => {
    try {
      const tokenPayload = token.split(".")[1];
      const decodedPayload = window.atob(tokenPayload);
      const payloadObj = JSON.parse(decodedPayload);
      return payloadObj.email;
    } catch (error) {
      return null;
    }
  };

  watch(toastMessage, (newRoute) => {
    toast.add(newRoute);
  });

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
      } else {
        //localStorage.removeItem("token");
      }
    }
  });
</script>
