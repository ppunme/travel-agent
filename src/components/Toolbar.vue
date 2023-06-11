<template>
  <div class="tool-bar">
    <div class="py-12 text-center container mx-auto px-4 sm:px-8 md:px-10">
      <h2 class="mb-8">
        แพ็คเกจทัวร์
      </h2>
      <div class="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-0">
        <div class="lg:justify-self-end lg:order-1 order-2 lg:pr-4 xl:pr-8">
          <Dropdown
            v-model="selectedCountryValue"
            filter
            :options="countries"
            optionLabel="name"
            placeholder="ประเทศ"
            class="w-full lg:w-[225px] text-start pl-2 !rounded-full"
          >
            <template #value="slotProps">
              <div
                v-if="slotProps.value"
                class="flex align-items-center"
              >
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
        <div class="lg:order-2 order-1 col-span-2 lg:col-span-1">
          <span class="p-input-icon-right w-full search">
            <font-awesome-icon
              v-if="!searchValue"
              class="pointer-events-none"
              :icon="['fas', 'magnifying-glass']"
            />
            <font-awesome-icon
              v-if="searchValue"
              class="!top-[45%] cursor-pointer"
              :icon="['fas', 'circle-xmark']"
              size="lg"
              @click="clearSearch"
            />
            <InputText
              v-model="searchValue"
              placeholder="ค้นหา..."
              class="all-input w-full !rounded-full"
            />
          </span>
        </div>
        <div class="lg:justify-self-start lg:order-3 order-3 lg:pl-4 xl:pl-8">
          <Dropdown
            v-model="selectedSortValue"
            :options="sort"
            optionLabel="name"
            placeholder="เรียงตาม"
            class="w-full lg:w-[225px] text-start pl-2 !rounded-full"
          >
            <template #value="slotProps">
              <div
                v-if="slotProps.value"
                class="flex align-items-center"
              >
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
  </div>
</template>

<script setup>
  import { ref, watch } from "vue";

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
