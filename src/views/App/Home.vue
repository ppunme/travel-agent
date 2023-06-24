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
        @click="$router.push({ path: '/tours', query: { page: 1 } })" />
    </div>
  </div>
  <ContactCard
    :contacts="data.contacts"
    :line="data.contacts[0]" />
</template>

<script setup>
import { pageview } from "vue-gtag";
import { useHead } from "@vueuse/head";

import { data } from "@/services/ContactList";
import Carousel from "@/components/Carousel.vue";
import TourGrid from "@/components/TourGrid.vue";
import ContactCard from "@/components/ContactCard.vue";

pageview({
  page_title: "Home",
});

useHead({
  title: "Wellness Life Travel",
  meta: [
    // default
    {
      name: "description",
      content: "รับจัดทัวร์ ในประเทศ และ ต่างประเทศ",
    },
    {
      name: "keywords",
      content:
        "ทัวร์,การเดินทาง,ทัวร์นำเที่ยว,การผจญภัย,สถานที่ท่องเที่ยว,การสำรวจ,วันหยุดพักผ่อน,วันหยุด,การเดินทางชมสถานที่,ทัวร์ราคาถูก,ทัวร์คุณภาพ",
    },

    // facebook
    { property: "og:title", content: "Wellness Life Travel" },
    {
      property: "og:image",
      content: "https://www.wellnesslifetravelth.com/logo.png",
    },
    {
      property: "og:description",
      content: "รับจัดทัวร์ ในประเทศ และ ต่างประเทศ",
    },
    { property: "og:url", content: "https://www.wellnesslifetravelth.com" },
    { property: "og:site_name", content: "wellnesslifetravelth.com" },
    { property: "og:type", content: "website" },

    // twitter
    { name: "twitter:title", content: "Wellness Life Travel" },
    {
      name: "twitter:image",
      content: "https://www.wellnesslifetravelth.com/logo.png",
    },
    {
      name: "twitter:description",
      content: "รับจัดทัวร์ ในประเทศ และ ต่างประเทศ",
    },
    {
      name: "twitter:domain",
      content: "https://www.wellnesslifetravelth.com",
    },
    { name: "twitter:site", content: "wellnesslifetravelth.com" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
});
</script>
