<template>
  <div
    class="grid grid-cols-1 grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-16"
  >
    <div v-for="item in props.tours" :key="item.id">
      <TourPackageCard :item="item" />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import TourPackageCard from "./TourPackageCard.vue";

const props = defineProps(["tours"]);
</script>
