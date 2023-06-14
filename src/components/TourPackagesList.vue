<template>
  <div
    v-if="props.tours.length > 0"
    class="grid grid-cols-1 grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-8 md:gap-10">
    <div
      v-for="item in props.tours"
      :key="item.id">
      <TourPackageCard :item="item" />
    </div>
  </div>
  <div
    v-if="props.tours.length === 0"
    class="grid grid-cols-1 grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-8 md:gap-10">
    <Skeleton
      width="100%"
      height="32.5rem"
      class="!rounded-[20px]"></Skeleton>
    <Skeleton
      width="100%"
      height="32.5rem"
      class="!rounded-[20px] hidden md:block"></Skeleton>
    <Skeleton
      width="100%"
      height="32.5rem"
      class="!rounded-[20px] hidden lg:block"></Skeleton>
    <Skeleton
      width="100%"
      height="32.5rem"
      class="!rounded-[20px] hidden 2xl:block"></Skeleton>
  </div>
</template>

<script setup>
import TourPackageCard from "./TourPackageCard.vue";

const props = defineProps(["tours"]);
console.log(props.tours);
</script>
