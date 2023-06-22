<template>
  <Toolbar
    v-model:selectedCountry="selectedCountry"
    v-model:selectedSort="selectedSort"
    v-model:search="search"
    :countries="countries"
    :sort="sort" />
  <div
    class="container mx-auto px-4 sm:px-8 md:px-10"
    :class="!isLoggedIn && 'pt-10'">
    <div
      v-if="isLoggedIn"
      class="flex justify-end">
      <Button
        class="w-48 !bg-green-add !my-8"
        rounded
        @click="$router.push(`/tours/create`)">
        <font-awesome-icon
          :icon="['fas', 'plus']"
          size="xl" />
        <span class="mx-auto"> เพิ่มแพ็คเกจใหม่ </span>
      </Button>
    </div>

    <TourPackagesList
      :tours="paginatedTours"
      :loading="loading" />

    <Paginator
      :template="{
        '639px': 'PrevPageLink CurrentPageReport NextPageLink',
        '767px':
          'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
        '1023px':
          'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
        default:
          'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
      }"
      :rows="pageSize"
      :totalRecords="dataLength"
      :rowsPerPageOptions="pageSizeOptions"
      :first="page * pageSize"
      class="py-8"
      @page="handlePageChange" />
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "@/firebase";
import { pageview } from "vue-gtag";
import { useHead } from "@vueuse/head";

import store from "@/store";
import Toolbar from "@/components/Toolbar.vue";
import TourPackagesList from "@/components/TourPackagesList.vue";
import router from "@/router";

const route = useRoute();

const loading = ref(false);
const tours = ref([]);
const search = ref("");
const pageSizeOptions = ref([12, 24, 36]);
const pageSize = ref(12);
const dataLength = ref();
const page = ref(route.query.page ? route.query.page - 1 : 0);

const selectedCountry = ref();
const countries = ref();

const selectedSort = ref();
const sort = ref([
  { name: "ราคา ต่ำ-สูง", field: "price", order: "asc" },
  { name: "ราคา สูง-ต่ำ", field: "price", order: "desc" },
  { name: "ตัวอักษร (ก-ฮ)", field: "name", order: "asc" },
  { name: "ตัวอักษร (ฮ-ก)", field: "name", order: "desc" },
]);

useHead({
  title: "All Tours - Wellness Life Travel",
  meta: [
    // default
    {
      name: "description",
      content: "All Tours",
    },
    {
      name: "keywords",
      content: "All Tours,ทัวร์ทั้งหมด,โปรแกรมทัวร์",
    },

    // facebook
    { property: "og:title", content: "All Tours - Wellness Life Travel" },
    {
      property: "og:image",
      content: `https://www.wellnesslifetravelth.com${require("@/assets/images/logo.png")}`,
    },
    {
      property: "og:description",
      content: "All Tours",
    },
    {
      property: "og:url",
      content: "https://www.wellnesslifetravelth.com/tours?page=1",
    },
    { property: "og:site_name", content: "wellnesslifetravelth.com" },
    { property: "og:type", content: "website" },

    // twitter
    {
      property: "twitter:title",
      content: "All Tours - Wellness Life Travel",
    },
    {
      property: "twitter:image",
      content: `https://www.wellnesslifetravelth.com${require("@/assets/images/logo.png")}`,
    },
    {
      property: "twitter:description",
      content: "All Tours",
    },
    {
      property: "twitter:domain",
      content: "https://www.wellnesslifetravelth.com/tours?page=1",
    },
    { property: "twitter:site", content: "wellnesslifetravelth.com" },
    { property: "twitter:card", content: "summary_large_image" },
  ],
});

const isLoggedIn = computed(() => store.state.isLoggedIn);

watch(selectedCountry, (newValue) => {
  if (newValue?.country === null) {
    selectedCountry.value = null;
  }
  dataLength.value = filteredTours.value.length;
});

watch(search, () => {
  dataLength.value = filteredTours.value.length;
});

const handlePageChange = (e) => {
  pageSize.value = e.rows;
  page.value = e.page;
  router.push({ path: "/tours", query: { page: e.page + 1 } });
};

watch(route, () => {
  page.value = route.query.page - 1;
});

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
  loading.value = true;
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

    tours.value = tourData.sort((a, b) => {
      const fieldA = a["createdAt"];
      const fieldB = b["createdAt"];

      if (fieldA < fieldB) {
        return -1;
      }

      if (fieldA > fieldB) {
        return 1;
      }
      return 0;
    });

    dataLength.value = tourData.length;

    let options = [];
    let filerOptions = [{ name: "ทั้งหมด", country: null }];

    tourData.forEach((item) => {
      item.countries.forEach((country) => {
        if (!options.includes(country)) {
          options.push(country);
        }
      });
    });

    options.forEach((opt) => {
      filerOptions.push({ name: opt, country: opt });
    });

    countries.value = filerOptions;
    loading.value = false;
  });
};

onMounted(() => {
  loadData();
  pageview({
    page_title: "All Tours",
  });
});
</script>

<style lang="scss" scoped></style>
