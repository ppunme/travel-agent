<template>
  <div
    class="flex flex-col items-center justify-center bg-red-500 min-h-[calc(100vh_-_13rem)]">
    <h1 class="text-6xl font-bold text-white">403</h1>
    <p class="text-2xl font-semibold text-white mt-4">Forbidden</p>
    <p class="text-white mt-2">You are not authorized to access this page.</p>
    <router-link
      to="/"
      class="mt-8 px-6 py-3 text-lg font-semibold text-white bg-red-700 rounded hover:bg-red-800"
      >Go back to Home</router-link
    >
  </div>
</template>

<script>
export default {
  name: "Forbidden",
};
</script>

<style>
/* Add additional styles or Tailwind CSS classes here */
</style>
