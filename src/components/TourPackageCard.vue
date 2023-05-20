<template>
  <div class="tour-card border rounded-[20px]">
    <img :src="item.image" alt="" class="w-full" />
    <div class="px-6 py-4 font-medium">
      <h3 class="pb-1">{{ item.name }}</h3>
      <h6>{{ item.days }} วัน {{ item.nights }} คืน</h6>
      <h5 class="py-4 text-primary-blue font-semibold">
        ฿{{ parseFloat(item.price).toLocaleString() }}
      </h5>
      <Button
        @click="openNewRoute(item.id)"
        label="ดูรายละเอียด"
        rounded
        class="!bg-primary-blue !border-none !font-normal"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";

defineProps(["item"]);

const router = useRouter();

const openNewRoute = (id) => {
  if (id) {
    router.push(`/tours/${id}`);
  } else {
    const newTab = window.open("/tours/preview", "_blank");
    newTab.focus();
  }
};
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
