<template>
  <div class="xl:px-36">
    <div class="grid grid-cols-2 md:grid-cols-3 gap-12">
      <div
        v-for="item in tours"
        :key="item.index"
        class="flex justify-center cursor-pointer hover:opacity-80"
        @click="viewPackage(item.id)"
      >
        <img
          :src="require(`@/assets/images/${item.image}`)"
          :alt="item.name"
          class="rounded-xl shadow-lg shadow-neutral-500"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps(["tours"]);

const viewPackage = (id) => {
  console.log("view::", id);
};
</script>
