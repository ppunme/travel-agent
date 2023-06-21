<template>
  <div class="bg-gray-100 min-h-[calc(100vh_-_13rem)] grid">
    <div class="flex flex-col items-center justify-center py-12">
      <img
        :src="vector3d"
        class="self-center w-120" />
      <h1 class="text-6xl font-bold mt-4">404</h1>
      <p class="text-2xl font-semibold mt-4">Page not found</p>
      <p class="mt-2 text-gray-600">
        The page you are looking for does not exist.
      </p>
      <router-link
        to="/"
        class="mt-8 px-6 py-3 text-lg text-white bg-primary-blue hover:opacity-90 rounded-full"
        >กลับสู่หน้าหลัก</router-link
      >
    </div>
    <div class="flex items-end justify-end">
      <small class="text-gray-400 pr-1">
        <a href="https://www.vecteezy.com/free-png/3d-location"
          >3d Location PNGs by Vecteezy</a
        ></small
      >
    </div>
  </div>
</template>

<script setup>
import vector3d from "@/assets/images/vecteezy_3d-online.png";
</script>
