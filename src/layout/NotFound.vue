<template>
  <div class="bg-gray-100 min-h-[calc(100vh_-_13rem)] grid">
    <div class="flex justify-center">
      <img
        :src="vector3d"
        class="self-center w-120" />
      <div class="flex flex-col justify-center pl-6">
        <h1 class="text-8xl font-bold text-primary-blue font-mono">404</h1>
        <p class="text-gray-600 text-lg">Page not found</p>
        <small class="text-gray-500">
          The page you are looking for does not exist.
        </small>
        <div class="mt-6">
          <Button
            label="กลับสู่หน้าหลัก"
            rounded
            class="!bg-primary-blue !border-none"
            @click="$router.push('/')" />
        </div>
      </div>
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
// import { onMounted } from "vue";
// import { useRouter } from "vue-router";
import vector3d from "@/assets/images/vecteezy_3d-online.png";

// const router = useRouter();

// onMounted(() => {
//   setTimeout(() => {
//     router.push("/");
//   }, 3000);
// });
</script>
