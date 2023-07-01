<template>
  <router-view />
  <Toast />
</template>

<script setup>
import { watch, onMounted, computed } from "vue";
import { useToast } from "primevue/usetoast";
import { useHead } from "@vueuse/head";

import store from "@/store";

import Toast from "primevue/toast";

const toast = useToast();

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

useHead({ htmlAttrs: { lang: "th" } });

onMounted(() => {
  const token = localStorage.getItem("token");

  if (token) {
    const email = getEmail(token);
    const expired = isTokenExpired(token);

    if (!expired) {
      store.dispatch("login", { email: email });
    } else {
      localStorage.removeItem("token");
    }
  }
});
</script>
