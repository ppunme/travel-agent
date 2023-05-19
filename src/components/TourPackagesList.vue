<template>
  <div
    class="px-24 py-16 grid grid-cols-1 grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-16"
  >
    <div
      v-for="item in data.tours"
      :key="item.id"
      class="tour-card border rounded-[20px]"
    >
      <img src="@/assets/img/image_11.png" alt="" class="w-full" />
      <div class="px-6 py-4 font-medium">
        <h3 class="pb-1">{{ item.name }}</h3>
        <h6>{{ item.days }} วัน {{ item.nights }} คืน</h6>
        <h5 class="py-4 text-primary-blue font-semibold">
          ฿{{ parseFloat(item.price).toLocaleString() }}
        </h5>
        <Button
          @click="$router.push('/tours')"
          label="ดูรายละเอียด"
          rounded
          class="!bg-primary-blue !border-none !font-normal"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { data } from "@/service/TourPackageService";
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.tour-card {
  border-color: $primary-border-color;
}

.p-button {
  padding: 0.55rem 1rem;
}
</style>
