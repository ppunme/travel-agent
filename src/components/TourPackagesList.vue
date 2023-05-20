<template>
  <div
    class="grid grid-cols-1 grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-16"
  >
    <div v-for="item in data.tours" :key="item.id">
      <TourPackageCard :item="item" />
    </div>
  </div>
</template>

<script setup>
import { data } from "@/services/TourPackageService";
import TourPackageCard from "./TourPackageCard.vue";
</script>
