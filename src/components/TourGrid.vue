<template>
  <div class="xl:px-56 2xl:px-72">
    <div class="text-end pb-6">
      <Button
        @click="visible = true"
        rounded
        class="w-32 !bg-amber-500 !border-none"
      >
        <font-awesome-icon :icon="['fas', 'pen']" size="xl" />
        <span class="mx-auto">แก้ไข</span>
      </Button>
    </div>
    <Modal
      header="แก้ไขการแสดงผลแพ็คเกจทัวร์หน้าโฮมเพจ"
      :visible="visible"
      @update:visible="onDialogUpdate"
      :tourGrid="true"
    >
      <EditTourGrid
        :tours="tours"
        :selectedTours="selectedTours"
        @onAddRow="onAddRow"
        @updateSelectedTours="updateSelectedTours"
        @handleDelete="handleDelete"
        @handleDrop="handleDrop"
      />
    </Modal>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-12">
      <div
        v-for="item in tours"
        :key="item.index"
        class="flex justify-center cursor-pointer hover:opacity-80"
        @click="viewPackage(item.id)"
      >
        <img
          :src="require(`@/assets/images/${item.image}`)"
          :alt="item.name"
          class="rounded-xl shadow-lg shadow-neutral-500"
        />
      </div>
    </div>
  </div>
  <ConfirmModal
    header="Delete"
    :visible="visibleDelete"
    @handleCancel="handleCancel"
    @confirmAction="confirmAction"
  />
  <Toast />
</template>

<script setup>
/* eslint-disable */
import { ref } from "vue";
import Modal from "@/components/Modal.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";
import EditTourGrid from "@/components/EditTourGrid.vue";
//import { data } from "@/services/TourPackageService";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const visible = ref(false);
const visibleDelete = ref(false);
const deleteIndex = ref(null);
const deleteItem = ref(null);

const selectedTours = ref([
  {
    id: 4,
    image: "tour4.jpg",
    name: "Tour 4",
    label: "Tour 4",
    value: 24,
  },
  {
    id: 5,
    image: "tour5.jpg",
    name: "Tour 5",
    label: "Tour 5",
    value: 5,
  },
]);

const tours = ref([
  {
    id: 1,
    image: "tour1.jpg",
    name: "Tour 1",
    label: "Tour 1",
    value: 1,
  },
  {
    id: 2,
    image: "tour2.jpg",
    name: "Tour 2",
    label: "Tour 2",
    value: 2,
  },
  {
    id: 3,
    image: "tour3.jpg",
    name: "Tour 3",
    label: "Tour 3",
    value: 3,
  },
  {
    id: 4,
    image: "tour4.jpg",
    name: "Tour 4",
    label: "Tour 4",
    value: 24,
  },
  {
    id: 5,
    image: "tour5.jpg",
    name: "Tour 5",
    label: "Tour 5",
    value: 5,
  },
  {
    id: 6,
    image: "tour6.jpg",
    name: "Tour 6",
    label: "Tour 6",
    value: 6,
  },
]);

const viewPackage = (id) => {
  console.log("view::", id);
};

const onDialogUpdate = (value) => {
  visible.value = value;
};

const onAddRow = () => {
  console.log("onadd", selectedTours.value);
  selectedTours.value.push({
    id: null,
    image: null,
    name: null,
    label: null,
    value: null,
  });
};

const updateSelectedTours = (index, tour) => {
  selectedTours.value.splice(index, 1, tour);
};

const handleCancel = (value) => {
  visibleDelete.value = value;
};

const handleDelete = (index, item) => {
  if (item.id) {
    visibleDelete.value = true;
    deleteIndex.value = index;
    deleteItem.value = item.id;
  } else {
    selectedTours.value.splice(index, 1);
  }
};

const confirmAction = () => {
  visibleDelete.value = false;

  if (deleteItem.value) {
    selectedTours.value = selectedTours.value.filter(
      (tour) => tour.id !== deleteItem.value
    );
    toast.add({ severity: "error", summary: "Item deleted", life: 2000 });
  }
};

const handleDrop = (e, newIndex) => {
  e.preventDefault();
  const oldIndex = e.dataTransfer.getData("text/plain");
  const item = selectedTours.value.splice(oldIndex, 1)[0];
  selectedTours.value.splice(newIndex, 0, item);
  toast.add({ severity: "success", summary: "Rows Reordered", life: 2000 });
};
</script>
