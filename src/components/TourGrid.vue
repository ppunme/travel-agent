<template>
  <div class="xl:px-56 2xl:px-72">
    <div
      v-if="isLoggedIn"
      class="text-end pb-6">
      <Button
        rounded
        class="w-32 !bg-amber-500 !border-none"
        @click="visible = true">
        <font-awesome-icon
          :icon="['fas', 'pen']"
          size="xl" />
        <span class="mx-auto">แก้ไข</span>
      </Button>
    </div>
    <Modal
      header="แก้ไขการแสดงผลแพ็คเกจทัวร์หน้าโฮมเพจ"
      :visible="visible"
      :tourGrid="true"
      :loading="loading"
      @update:visible="onDialogUpdate"
      @onSubmit="onSubmit">
      <EditTourGrid
        :tours="tours"
        :selectedTours="selectedTours"
        @onAddRow="onAddRow"
        @updateSelectedTours="updateSelectedTours"
        @handleDelete="handleDelete"
        @handleDrop="handleDrop" />
    </Modal>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-12">
      <div
        v-for="(item, index) in selectedTours"
        :key="index"
        class="flex justify-center cursor-pointer hover:opacity-80"
        @click="viewPackage(item.id)">
        <div class="square-image">
          <img
            :src="item.image"
            :alt="item.name"
            class="rounded-xl shadow-lg shadow-gray-300" />
        </div>
      </div>
    </div>
  </div>
  <ConfirmModal
    header="Delete"
    :visible="visibleDelete"
    @handleCancel="handleCancel"
    @confirmAction="confirmAction" />
  <Toast />
</template>

<script setup>
  import { ref, onMounted, computed } from "vue";
  import Modal from "@/components/Modal.vue";
  import ConfirmModal from "@/components/ConfirmModal.vue";
  import EditTourGrid from "@/components/EditTourGrid.vue";
  import { useToast } from "primevue/usetoast";
  import {
    doc,
    collection,
    onSnapshot,
    updateDoc,
    deleteField,
  } from "firebase/firestore";
  import { db } from "@/firebase";
  import { useRouter } from "vue-router";
  import store from "@/store";

  const router = useRouter();

  const toast = useToast();
  const visible = ref(false);
  const visibleDelete = ref(false);
  const deleteIndex = ref(null);
  const deleteItem = ref(null);

  const loading = ref(false);

  const isLoggedIn = computed(() => store.state.isLoggedIn);

  const selectedTours = ref([
    {
      id: "",
      image: "",
      name: "",
      label: "",
      value: "",
    },
  ]);

  const tours = ref();

  const viewPackage = (id) => {
    router.push(`/tours/${id}`);
  };

  const onDialogUpdate = (value) => {
    visible.value = value;
  };

  const onAddRow = () => {
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

  const confirmAction = async () => {
    visibleDelete.value = false;

    if (deleteItem.value) {
      await updateDoc(doc(db, "tours", deleteItem.value), {
        selected: deleteField(),
        seq: deleteField(),
      });

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

  const onSubmit = () => {
    loading.value = true;
    console.log("onSubmit", selectedTours.value);

    selectedTours.value.forEach(async (item, index) => {
      await updateDoc(doc(db, "tours", item.id), {
        selected: true,
        seq: index,
      });
      loading.value = false;
      visible.value = false;
    });
  };

  onMounted(() => {
    onSnapshot(collection(db, "tours"), (querySnapshot) => {
      const tourData = [];

      querySnapshot.forEach((doc) => {
        //console.log("doc", doc);
        const tour = {
          id: doc.id,
          name: doc.data().fileName,
          image: doc.data().image,
          label: doc.data().fileName,
          selected: doc.data().selected,
          seq: doc.data().seq,
          value: doc.id,
        };
        //console.log("tour", tour);
        tourData.push(tour);
      });

      const selected = tourData.filter((tour) => tour.selected);
      const sortedSelected = selected.sort((a, b) => a.seq - b.seq);

      tours.value = tourData;
      selectedTours.value = sortedSelected;
    });
  });
</script>

<style scoped>
  .square-image {
    aspect-ratio: 1/1;
  }

  .square-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
