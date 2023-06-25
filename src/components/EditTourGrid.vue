<template>
  <div>
    <div class="w-80 mx-auto">
      <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div
          v-for="(item, index) in Array.from(
            { length: selectedTours <= 6 ? 6 : selectedTours.length },
            (_, i) => selectedTours[i] || i
          )"
          :key="item.id"
          :draggable="true"
          class="draggable-img rounded-lg hover:opacity-80"
          @dragstart="handleDragStart($event, index)"
          @dragover="handleDragOver($event)"
          @drop="handleDrop($event, index)">
          <div class="square-image">
            <img
              v-if="item.image"
              :src="item.image"
              :alt="item.name"
              class="rounded-xl" />
            <img
              v-else
              :src="require('@/assets/images/no-img.png')"
              alt="no image"
              class="object-cover h-[525px] w-full" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="lg:w-3/4 mx-auto mt-6">
    <div class="grid grid-cols-12 gap-3 items-center">
      <template
        v-for="(item, idx) in selectedTours"
        :key="item.id">
        <div class="flex col-span-1 sm:col-span-2">
          <span class="hidden sm:block">ภาพที่&nbsp;</span>{{ idx + 1 }}
        </div>
        <div class="col-span-9 sm:col-span-9">
          <Dropdown
            :modelValue="item"
            :options="filteredOptions(item)"
            filtered
            optionLabel="name"
            placeholder="Select a tour"
            class="p-dropdown-sm w-full"
            @change="updateTour(idx, $event)">
            <template #option="slotProps">
              <div class="flex align-items-center">
                {{ slotProps.option.name }}
              </div>
            </template>
          </Dropdown>
        </div>
        <button
          type="button"
          class="btn-delete justify-self-end col-span-2 sm:col-span-1"
          @click="onDelete(idx, item)">
          <font-awesome-icon
            :icon="['fas', 'times']"
            class="text-red-500" />
        </button>
      </template>
    </div>
    <div class="mt-6">
      <Button
        class="w-28 !bg-green-add !border-none"
        rounded
        @click="addRow">
        <font-awesome-icon
          :icon="['fas', 'plus']"
          size="xl" /><span class="mx-auto">เพิ่ม</span>
      </Button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps(["selectedTours", "tours"]);
const emit = defineEmits([
  "onAddRow",
  "updateSelectedTours",
  "handleDelete",
  "handleDrop",
]);

const filteredOptions = computed(() => {
  return (item) => {
    const filteredItems = props.tours.filter(
      (tour) => !props.selectedTours.some((selected) => selected.id === tour.id)
    );
    const newFilteredItems = [item].concat(filteredItems);

    return newFilteredItems;
  };
});

console.log("filter", filteredOptions);

const addRow = () => {
  emit("onAddRow");
};

const updateTour = (index, e) => {
  emit("updateSelectedTours", index, e.value);
};

const onDelete = (index, item) => {
  emit("handleDelete", index, item);
};

const handleDragStart = (e, index) => {
  e.dataTransfer.setData("text/plain", index);
};

const handleDragOver = (e) => {
  e.preventDefault();
};

const handleDrop = (e, newIndex) => {
  e.preventDefault();
  emit("handleDrop", e, newIndex);
};
</script>

<style scoped>
.draggable-item {
  cursor: move;
}

.draggable-img {
  cursor: move;
}

.square-image {
  aspect-ratio: 1/1; /* Creates a square aspect ratio */
  overflow: hidden;
}

.square-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
