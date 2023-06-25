<template>
  <div class="xl:px-56 2xl:px-72">
    <div
      v-if="isLoggedIn"
      class="text-end pb-6">
      <Button
        rounded
        class="w-32 !bg-amber-500 !border-none"
        @click="openEditModal">
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
        :selectedTours="selectedToursEdit"
        @onAddRow="onAddRow"
        @updateSelectedTours="updateSelectedTours"
        @handleDelete="handleDelete"
        @handleDrop="handleDrop" />
    </Modal>
    <div
      v-if="dataLength > 0"
      class="grid grid-cols-2 md:grid-cols-3 gap-12">
      <div
        v-for="(item, index) in selectedTours"
        :key="index"
        class="flex justify-center cursor-pointer hover:opacity-80 rounded-xl shadow-md square-image"
        @click="viewPackage(item.id)">
        <img
          :src="item.image"
          :alt="item.name"
          class="rounded-xl shadow-md" />
      </div>
    </div>
    <div
      v-if="dataLength === 0"
      class="grid grid-cols-2 md:grid-cols-3 gap-12">
      <div
        v-for="index in 3"
        :key="index"
        class="square-image"
        :class="index === 3 && 'hidden md:block'">
        <Skeleton class="!h-full !rounded-xl shadow-md"></Skeleton>
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

const tours = ref();
const visible = ref(false);
const visibleDelete = ref(false);
const deleteIndex = ref(null);
const deleteItems = ref([]);
const dataLength = ref(0);
const changedItem = ref([]);

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

const selectedToursEdit = ref([
  {
    id: "",
    image: "",
    name: "",
    label: "",
    value: "",
  },
]);

const openEditModal = () => {
  visible.value = true;
  deleteItems.value = [];
  fetchData();
};

const viewPackage = (id) => {
  router.push(`/tours/${id}`);
};

const onDialogUpdate = (value) => {
  visible.value = value;
};

const onAddRow = () => {
  selectedToursEdit.value.push({
    id: null,
    image: null,
    name: null,
    label: null,
    value: null,
  });
};

const updateSelectedTours = async (index, tour) => {
  if (tour.id) {
    changedItem.value.push(selectedToursEdit.value[index].id);
  }
  selectedToursEdit.value.splice(index, 1, tour);
};

const handleCancel = (value) => {
  visibleDelete.value = value;
};

const handleDelete = (index, item) => {
  if (item.id) {
    visibleDelete.value = true;
    deleteIndex.value = index;

    if (!deleteItems.value.includes(item.id)) {
      deleteItems.value.push(item.id);
    }
  } else {
    selectedToursEdit.value.splice(index, 1);
  }
};

const confirmAction = async () => {
  visibleDelete.value = false;

  if (deleteItems.value.length > 0) {
    selectedToursEdit.value.splice(deleteIndex.value, 1);

    store.dispatch("showToast", {
      severity: "success",
      summary: "ลบข้อมูลเรียบร้อยแล้ว",
    });
  }
};

const handleDrop = (e, newIndex) => {
  e.preventDefault();
  const oldIndex = e.dataTransfer.getData("text/plain");
  const item = selectedToursEdit.value.splice(oldIndex, 1)[0];
  selectedToursEdit.value.splice(newIndex, 0, item);
  store.dispatch("showToast", {
    severity: "success",
    summary: "จัดเรียงข้อมูลใหม่เรียบร้อยแล้ว",
  });
};

const onSubmit = () => {
  loading.value = true;

  if (deleteItems.value.length > 0) {
    deleteItems.value.forEach(async (item) => {
      await updateDoc(doc(db, "tours", item), {
        selected: deleteField(),
        seq: deleteField(),
      });
    });
  }

  changedItem.value.forEach(async (item) => {
    if (item?.selected && item?.seq) {
      await updateDoc(doc(db, "tours", item), {
        selected: deleteField(),
        seq: deleteField(),
      });
    }
  });

  selectedToursEdit.value.forEach(async (item, index) => {
    await updateDoc(doc(db, "tours", item.id), {
      selected: true,
      seq: index,
    });
    loading.value = false;
    visible.value = false;
  });
};

const fetchData = () => {
  onSnapshot(collection(db, "tours"), (querySnapshot) => {
    const tourData = [];

    querySnapshot.forEach((doc) => {
      const tour = {
        id: doc.id,
        name: doc.data().fileName,
        image: doc.data().image,
        label: doc.data().fileName,
        selected: doc.data().selected,
        seq: doc.data().seq,
        value: doc.id,
      };

      tourData.push(tour);
    });
    tours.value = tourData;

    const selected = tourData.filter((tour) => tour.selected);
    const sortedSelected = selected.sort((a, b) => a.seq - b.seq);

    selectedTours.value = [...sortedSelected];
    selectedToursEdit.value = [...sortedSelected];
    dataLength.value = sortedSelected.length;
  });
};

onMounted(() => {
  fetchData();
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
