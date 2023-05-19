<template>
  <Carousel
    :value="products"
    :numVisible="1"
    :numScroll="1"
    :responsiveOptions="responsiveOptions"
  >
    <template #item="slotProps">
      <img
        :src="require(`@/assets/images/${slotProps.data.image}`)"
        :alt="slotProps.data.name"
        class="object-cover h-[625px] w-full"
      />
    </template>
  </Carousel>
  <div class="flex justify-center items-center py-12">
    <font-awesome-icon
      :icon="['fas', 'bus']"
      size="2xl"
      class="self-center pr-2"
    />
    <p>รับจัดทัวร์ในประเทศและต่างประเทศ</p>
  </div>
  <TourGrid :tours="tours" />
  <div class="text-center py-12">
    <Button
      @click="$router.push('/tours')"
      label="ดูทั้งหมด"
      rounded
      class="w-32 !bg-primary-blue !border-none"
    />
  </div>
  <ContactCard :contacts="data.contacts" />
</template>

<script setup>
import { ref } from "vue";
import TourGrid from "@/components/TourGrid.vue";
import ContactCard from "@/components/ContactCard.vue";
import { data } from "@/service/ContactList";

const products = ref([
  {
    image: "image1.png",
    name: "Image 1",
    text: "Wellness Life Travel",
  },
  {
    image: "image2.png",
    name: "Image 2",
    text: "Discover your favourite tour with us",
  },
  {
    image: "image3.png",
    name: "Image 3",
    text: "Let our travel experts plan your next gateway",
  },
]);

const tours = ref([
  {
    id: 1,
    image: "tour1.jpg",
    name: "Tour 1",
  },
  {
    id: 2,
    image: "tour2.jpg",
    name: "Tour 2",
  },
  {
    id: 3,
    image: "tour3.jpg",
    name: "Tour 3",
  },
  {
    id: 4,
    image: "tour4.jpg",
    name: "Tour 4",
  },
  {
    id: 5,
    image: "tour5.jpg",
    name: "Tour 5",
  },
  {
    id: 6,
    image: "tour6.jpg",
    name: "Tour 6",
  },
]);

//const imageSrc = require("@/assets/images/image1.png");
</script>
