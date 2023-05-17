<template>
  <div class="tool-bar py-12 text-center">
    <h2 class="mb-8">แพ็คเกจทัวร์</h2>
    <div class="grid grid-cols-3">
      <div class="justify-self-end">
        <Dropdown
          v-model="selectedCountry"
          :options="countries"
          optionLabel="name"
          placeholder="ประเทศ"
          class="country-dropdown min-w-[225px] text-start pl-2"
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
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
          <InputText v-model="value1" placeholder="ค้นหา..." class="w-full" />
        </span>
      </div>
      <div class="justify-self-start">
        <Dropdown
          v-model="selectedSort"
          :options="sort"
          optionLabel="name"
          placeholder="เรียงตาม"
          class="sort-dropdown min-w-[225px] text-start pl-2"
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
import { ref } from "vue";

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

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.tool-bar {
  background-color: #dfe9f0;
}

.p-dropdown {
  border: 1px solid $secondary-font-color;
  border-radius: 10rem;

  &:not(.p-disabled) {
    &:hover {
      border-color: $secondary-color;
    }
    &.p-focus {
      box-shadow: 0 0 0 0.2rem rgb(191 219 254);
      border-color: $secondary-color;
    }
  }
}

.p-input-icon-right {
  .p-inputtext {
    border: 1px solid $secondary-font-color;
    border-radius: 10rem;
    padding-left: 1.25rem;

    &::placeholder {
      color: $secondary-font-color;
    }

    &:enabled {
      &:hover {
        border-color: $secondary-color;
      }

      &:focus {
        box-shadow: 0 0 0 0.2rem rgb(191 219 254);
        border-color: $secondary-color;
      }
    }
  }

  svg:last-of-type {
    right: 1.25rem;
  }
}
</style>
