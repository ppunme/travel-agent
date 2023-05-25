<template>
  <div class="tool-bar py-12 text-center">
    <h2 class="mb-8">แพ็คเกจทัวร์</h2>
    <div class="grid grid-cols-3">
      <div class="justify-self-end">
        <Dropdown
          filter
          v-model="selectedCountryValue"
          :options="countries"
          optionLabel="name"
          placeholder="ประเทศ"
          class="min-w-[225px] text-start pl-2 !rounded-full"
        >
          <template #value="slotProps">
            <div v-if="slotProps.value" class="flex align-items-center">
              <div>{{ slotProps.value.name }}</div>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div class="flex align-items-center">
              <div>{{ slotProps.option.name }}</div>
            </div>
          </template>
        </Dropdown>
      </div>
      <div>
        <span class="p-input-icon-right w-3/4 search">
          <font-awesome-icon
            class="pointer-events-none"
            :icon="['fas', 'magnifying-glass']"
            v-if="!searchValue"
          />
          <font-awesome-icon
            class="!top-[45%] cursor-pointer"
            :icon="['fas', 'circle-xmark']"
            size="lg"
            @click="clearSearch"
            v-if="searchValue"
          />
          <InputText
            v-model="searchValue"
            placeholder="ค้นหา..."
            class="all-input w-full !rounded-full"
          />
        </span>
      </div>
      <div class="justify-self-start">
        <Dropdown
          v-model="selectedSortValue"
          :options="sort"
          optionLabel="name"
          placeholder="เรียงตาม"
          class="min-w-[225px] text-start pl-2 !rounded-full"
        >
          <template #value="slotProps">
            <div v-if="slotProps.value" class="flex align-items-center">
              <div>{{ slotProps.value.name }}</div>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div class="flex align-items-center">
              <div>{{ slotProps.option.name }}</div>
            </div>
          </template>
        </Dropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";

const props = defineProps([
  "selectedCountry",
  "countries",
  "selectedSort",
  "sort",
  "search",
]);

const selectedCountryValue = ref(props.selectedCountry);
const selectedSortValue = ref(props.selectedSort);
const searchValue = ref(props.search);

const emit = defineEmits([
  "update:selectedCountry",
  "update:selectedSort",
  "update:search",
]);

watch(selectedCountryValue, (newValue) => {
  emit("update:selectedCountry", newValue);
});

watch(selectedSortValue, (newValue) => {
  emit("update:selectedSort", newValue);
});

watch(searchValue, (newValue) => {
  emit("update:search", newValue);
});

const clearSearch = () => {
  searchValue.value = "";
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.tool-bar {
  background-color: #dfe9f0;
}

.p-input-icon-right {
  svg:last-of-type {
    right: 1.25rem;
  }
}
</style>
