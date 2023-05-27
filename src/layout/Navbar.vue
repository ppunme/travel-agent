<template>
  <!-- <nav class="relative">
    <div class="container mx-auto h-36 grid grid-cols-3 content-center">
      <div class="flex">
        <img src="@/assets/images/logo.png" alt="" />
        <h4 class="ml-4 self-center font-semibold w-40 logo-text">
          Wellness Life Travel
        </h4>
      </div>
      <div class="flex gap-28 justify-center">
        <router-link class="self-center" to="/">หน้าแรก</router-link>
        <router-link class="self-center" to="/tours">แพ็คเกจทัวร์</router-link>
        <router-link class="self-center" to="/contact">ติดต่อเรา</router-link>
      </div>
      <div class="absolute right-0 top-1/2 translate-y-[-50%]">
        <div
          class="social-media-bg w-60 h-20 pl-4 pr-2 self-center rounded-l-[5rem] flex justify-around"
        >
          <font-awesome-icon
            :icon="['fab', 'square-facebook']"
            size="2xl"
            style="color: #ffffff"
            class="self-center"
          />
          <font-awesome-icon
            :icon="['fab', 'instagram']"
            size="2xl"
            style="color: #ffffff"
            class="self-center"
          />
          <font-awesome-icon
            :icon="['fab', 'twitter']"
            size="2xl"
            style="color: #ffffff"
            class="self-center"
          />
        </div>
      </div>
    </div>
  </nav> -->

  <nav class="navbar text-primary-blue relative z-10">
    <div class="flex justify-between items-center py-4">
      <div class="flex items-center">
        <img src="@/assets/images/logo.png" alt="" />
        <h4 class="ml-4 self-center font-semibold w-40 logo-text">
          Wellness Life Travel
        </h4>
      </div>
      <div class="hidden md:flex md:justify-center md:items-center gap-28">
        <router-link
          v-for="(menuItem, index) in menuItems"
          :key="index"
          :to="menuItem.route"
          class="px-4 py-2 mx-2 rounded hover:opacity-70"
        >
          {{ menuItem.label }}
        </router-link>
      </div>
      <div
        class="hidden md:flex items-center bg-primary-blue w-60 h-20 pl-4 pr-2 rounded-l-[5rem] justify-around"
      >
        <a
          v-for="(social, index) in socialLinks"
          :key="index"
          :href="social.url"
          class="text-white hover:text-gray-400 ml-4"
        >
          <font-awesome-icon
            :icon="social.icon"
            size="2xl"
            style="color: #ffffff"
            class="self-center"
          />
        </a>
      </div>
      <div class="md:hidden">
        <button @click="showMenu = !showMenu" class="focus:outline-none">
          <font-awesome-icon :icon="['fas', 'bars']" size="2xl" />
        </button>
      </div>
    </div>
    <transition name="fade">
      <div
        v-if="showMenu"
        class="md:hidden absolute inset-x-0 top-[129px] bg-[#333] z-20"
        style="height: calc(100vh - 50px)"
      >
        <div class="flex flex-col px-4">
          <div v-for="(item, index) in menuItems" :key="index" class="py-4">
            <a class="!text-white hover:text-gray-300" :href="item.route">{{
              item.label
            }}</a>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref } from "vue";
/* eslint-disable */
const showMenu = ref(false);
const menuItems = ref([
  {
    label: "หน้าแรก",
    route: "/",
  },
  {
    label: "แพ็คเกจทัวร์",
    route: "/tours",
  },
  {
    label: "ติดต่อเรา",
    route: "/contact",
  },
]);

const socialLinks = ref([
  { icon: ["fab", "square-facebook"], url: "www.facebook.com" },
  { icon: ["fab", "instagram"], url: "www.instagram.com" },
  { icon: ["fab", "twitter"], url: "www.twitter.com" },
]);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

a,
.logo-text {
  color: $primary-color;
}

.social-media-bg {
  background-color: $secondary-color;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.router-link-active {
  text-decoration: underline;
}
</style>
