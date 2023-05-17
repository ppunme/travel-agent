<template>
  <nav class="h-36 grid grid-cols-3 content-center">
    <div class="flex justify-start pl-24">
      <img src="@/assets/img/logo.png" alt="" />
      <h4 class="ml-4 self-center font-semibold w-40 logo-text">
        Wellness Life Travel
      </h4>
    </div>
    <div class="flex gap-28 justify-center">
      <router-link class="self-center" to="/">หน้าแรก</router-link>
      <router-link class="self-center" to="/tours">แพ็คเกจทัวร์</router-link>
      <router-link class="self-center" to="/contact">ติดต่อเรา</router-link>
    </div>
    <div class="flex justify-end">
      <div
        class="social-media-bg w-60 h-20 pl-6 pr-2 self-center rounded-l-[5rem] flex justify-around"
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
  </nav>
</template>

<script setup></script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

a,
.logo-text {
  color: $primary-color;
}

.social-media-bg {
  background-color: $secondary-color;
}
</style>
