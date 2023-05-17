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
        class="shadow-2"
      />
    </template>
  </Carousel>
  <div class="text-center"><p>รับจัดทัวร์ในประเทศและต่างประเทศ</p></div>
  <TourGrid />
</template>

<script setup>
import { ref } from "vue";
import TourGrid from "@/components/TourGrid.vue";

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

//const imageSrc = require("@/assets/images/image1.png");
</script>
