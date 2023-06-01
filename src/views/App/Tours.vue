<template>
  <Toolbar
    v-model:selectedCountry="selectedCountry"
    :countries="countries"
    v-model:selectedSort="selectedSort"
    :sort="sort"
    v-model:search="search"
  />
  <div class="container mx-auto">
    <div class="flex justify-end">
      <Button
        class="w-48 !bg-[#06C755] !my-8"
        rounded
        @click="$router.push(`/tours/create`)"
      >
        <font-awesome-icon :icon="['fas', 'plus']" size="xl" /><span
          class="mx-auto"
          >เพิ่มแพ็คเกจใหม่</span
        >
      </Button>
    </div>

    <TourPackagesList :tours="paginatedTours" />
    <Paginator
      :rows="pageSize"
      :totalRecords="dataLength"
      :rowsPerPageOptions="pageSizeOptions"
      class="pb-16"
      @page="handlePageChange"
    ></Paginator>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "@/firebase";

import Toolbar from "@/components/Toolbar.vue";
import TourPackagesList from "@/components/TourPackagesList.vue";

const tours = ref([]);
const search = ref("");
const pageSizeOptions = ref([2, 4, 6]);
const pageSize = ref(2);
const dataLength = ref();
const page = ref(0);

const selectedCountry = ref();
const countries = ref([
  { name: "ทั้งหมด", country: null },
  { name: "ออสเตรเลีย", country: "ออสเตรเลีย" },
  { name: "บราซิล", country: "บราซิล" },
  { name: "จีน", country: "จีน" },
  { name: "เชค", country: "เชค" },
  { name: "สโลวัก", country: "สโลวัก" },
  { name: "ฮังการี", country: "ฮังการี" },
]);

const selectedSort = ref();
const sort = ref([
  { name: "ราคา ต่ำ-สูง", field: "price", order: "asc" },
  { name: "ราคา สูง-ต่ำ", field: "price", order: "desc" },
  { name: "ตัวอักษร (ก-ฮ)", field: "name", order: "asc" },
  { name: "ตัวอักษร (ฮ-ก)", field: "name", order: "desc" },
]);

watch(selectedCountry, (newValue) => {
  if (newValue?.country === null) {
    selectedCountry.value = null;
  }
});

const handlePageChange = (e) => {
  pageSize.value = e.rows;
  page.value = e.page;
};

const filteredTours = computed(() => {
  let filtered = tours.value;

  if (search.value) {
    filtered = filtered.filter((tour) =>
      tour.name.toLowerCase().includes(search.value.toLowerCase())
    );
  }

  if (selectedCountry.value) {
    filtered = filtered.filter((tour) =>
      tour.countries.includes(selectedCountry.value.name)
    );
  }

  return filtered;
});

const sortedTours = computed(() => {
  let sorted = filteredTours.value;

  if (selectedSort.value) {
    sorted = sorted.slice().sort((a, b) => {
      const fieldA = a[selectedSort.value.field];
      const fieldB = b[selectedSort.value.field];

      if (fieldA < fieldB) {
        return selectedSort.value.order === "asc" ? -1 : 1;
      }
      if (fieldA > fieldB) {
        return selectedSort.value.order === "asc" ? 1 : -1;
      }
      return 0;
    });
  }

  return sorted;
});

const paginatedTours = computed(() => {
  const startIndex = page.value * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  return sortedTours.value.slice(startIndex, endIndex);
});

const loadData = async () => {
  const collectionRef = collection(db, "tours");

  let q = query(collectionRef);

  onSnapshot(q, (querySnapshot) => {
    const tourData = [];

    querySnapshot.forEach((doc) => {
      const tour = {
        id: doc.id,
        ...doc.data(),
      };
      tourData.push(tour);
    });

    tours.value = tourData;
    dataLength.value = tourData.length;
  });
};

onMounted(() => {
  loadData();
});
</script>

<style lang="scss" scoped></style>
