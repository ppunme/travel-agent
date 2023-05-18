<template>
  <Tours
    :selectedCountry="selectedCountry"
    :countries="countries"
    :selectedSort="selectedSort"
    :sort="sort"
    :value1="value1"
  />
</template>

<script setup>
import { ref } from "vue";
import Tours from "@/components/Toolbar.vue";

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

const value1 = ref(null);

// watch(selectedCountry, (newValue, oldValue) => {
//   console.log(oldValue);
//   console.log(newValue);
// });
</script>

<style lang="scss" scoped></style>
