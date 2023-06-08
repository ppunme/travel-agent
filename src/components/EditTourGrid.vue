<template>
  <div>
    <div class="w-80 mx-auto">
      <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div
          v-for="(item, index) in Array.from(
            { length: 6 },
            (_, i) => selectedTours[i] || i
          )"
          :key="item.id"
          :draggable="true"
          @dragstart="handleDragStart($event, index)"
          @dragover="handleDragOver($event)"
          @drop="handleDrop($event, index)"
          class="draggable-img rounded-lg hover:opacity-80"
        >
          <div class="square-image">
            <img
              v-if="item.image"
              :src="item.image"
              :alt="item.name"
              class="rounded-xl"
            />
            <img
              v-else
              :src="require('@/assets/images/no-img.png')"
              alt="no image"
              class="object-cover h-[525px] w-full"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex justify-center">
    <div class="w-3/4">
      <div
        v-for="(item, idx) in selectedTours"
        :key="item.id"
        class="flex items-center mt-4"
      >
        <label class="w-32 pr-4">ภาพที่ {{ idx + 1 }}</label>
        <div class="w-full flex items-center">
          <Dropdown
            :modelValue="item"
            :options="tours2"
            filter
            optionLabel="name"
            placeholder="Select a tour"
            class="p-dropdown-sm w-full sm:w-14rem"
            @change="updateTour(idx, $event)"
          >
            <template #option="slotProps">
              <div class="flex align-items-center">
                {{ slotProps.option.name }}
              </div>
            </template>
          </Dropdown>
          <button
            @click="onDelete(idx, item)"
            type="button"
            class="btn-delete ml-2"
          >
            <font-awesome-icon :icon="['fas', 'times']" class="text-red-500" />
          </button>
        </div>
      </div>
      <div class="mt-6">
        <Button
          @click="addRow"
          label="เพิ่ม"
          class="w-32 !bg-green-400 !border-none"
          rounded
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps(["selectedTours", "tours2"]);
const emit = defineEmits([
  "onAddRow",
  "updateSelectedTours",
  "handleDelete",
  "handleDrop",
]);

const addRow = () => {
  emit("onAddRow");
};

const updateTour = (index, e) => {
  // console.log("updateTour", index, e.value.id);
  emit("updateSelectedTours", index, e.value);
};

const onDelete = (index, item) => {
  //e.preventDefault();
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
