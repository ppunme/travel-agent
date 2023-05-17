<template>
  <nav class="h-28 grid grid-cols-3 content-center">
    <div class="flex justify-start">Logo</div>
    <div class="flex gap-28 justify-center">
      <router-link to="/">หน้าแรก</router-link>
      <router-link to="/tours">แพ็คเกจทัวร์</router-link>
      <router-link to="/contact">ติดต่อเรา</router-link>
    </div>
    <div class="flex justify-end">Socail Media</div>
  </nav>
</template>

<script setup></script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";

a {
  color: $primary-color;
}
</style>
