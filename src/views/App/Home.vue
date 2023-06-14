<template>
  <Carousel />
  <div class="container mx-auto px-4 sm:px-8 md:px-10">
    <div class="flex justify-center items-center py-12">
      <font-awesome-icon
        :icon="['fas', 'bus']"
        size="2xl"
        class="text-primary-blue self-center pr-2" />
      <p class="text-primary-blue">รับจัดทัวร์ในประเทศและต่างประเทศ</p>
    </div>
    <TourGrid />
    <div class="text-center py-12">
      <Button
        label="ดูทั้งหมด"
        rounded
        class="w-32 !bg-primary-blue !border-none"
        @click="$router.push('/tours')" />
    </div>
  </div>
  <ContactCard
    :contacts="data.contacts"
    :line="data.line" />
</template>

<script setup>
import Carousel from "@/components/Carousel.vue";
import TourGrid from "@/components/TourGrid.vue";
import ContactCard from "@/components/ContactCard.vue";
import { data } from "@/services/ContactList";
</script>
