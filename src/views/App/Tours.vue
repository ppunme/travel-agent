<template>
  <Tours
    v-model:selectedCountry="selectedCountry"
    :countries="countries"
    v-model:selectedSort="selectedSort"
    :sort="sort"
    v-model:search="search"
  />
  <TourPackagesList />
</template>

<script setup>
import { ref, watch } from "vue";
import Tours from "@/components/Toolbar.vue";
import TourPackagesList from "@/components/TourPackagesList.vue";

const selectedCountry = ref();
const countries = ref([
  { name: "ออสเตรเลีย", code: "AU" },
  { name: "บราซิล", code: "BR" },
  { name: "จีน", code: "CN" },
]);

const selectedSort = ref();
const sort = ref([
  { name: "ราคา ต่ำ-สูง", code: "PRICE" },
  { name: "ราคา สูง-ต่ำ", code: "PRICE" },
  { name: "ตัวอักษร (ก-ฮ)", code: "ALPHABET" },
  { name: "ตัวอักษร (ฮ-ก)", code: "ALPHABET" },
]);

const search = ref("");

watch(selectedCountry, (newValue, oldValue) => {
  console.log(oldValue);
  console.log(newValue);
});

watch(selectedSort, (newValue, oldValue) => {
  console.log(oldValue);
  console.log(newValue);
});

watch(search, (newValue, oldValue) => {
  console.log(oldValue);
  console.log(newValue);
});
</script>

<style lang="scss" scoped></style>
