<template>
  <div
    class="grid grid-cols-1 grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-16"
  >
    <div v-for="item in tours" :key="item.id">
      <TourPackageCard :item="item" />
    </div>
    <!-- <div v-for="item in data.tours" :key="item.id">
      <TourPackageCard :item="item" />
    </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";
// import { data } from "@/services/TourPackageService";
import TourPackageCard from "./TourPackageCard.vue";

const tours = ref([]);
onMounted(() => {
  onSnapshot(collection(db, "tours"), (querySnapshot) => {
    const tourData = [];

    querySnapshot.forEach((doc) => {
      const tour = {
        id: doc.id,
        ...doc.data(),
      };
      tourData.push(tour);
    });

    tours.value = tourData;
  });
});
</script>
