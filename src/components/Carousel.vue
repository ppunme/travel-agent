<template>
  <div
    v-if="isLoggedIn"
    class="text-end pb-6 px-6">
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
    header="แก้ไขภาพหน้าโฮมเพจ"
    :visible="visible"
    :loading="loading"
    @update:visible="onDialogUpdate"
    @onSubmit="onSubmit">
    <EditCarousel
      :items="itemsEdit"
      @handleAddImg="handleAddImg"
      @handleDelete="handleDelete"
      @moveItemUp="moveItemUp"
      @moveItemDown="moveItemDown" />
  </Modal>
  <Carousel
    v-if="items.length > 0"
    :value="items"
    :numVisible="1"
    :numScroll="1"
    :autoplayInterval="5000"
    circular
    class="home-carousel">
    <template #item="slotProps">
      <div class="img-container w-full">
        <img
          :src="slotProps.data.img"
          :alt="slotProps.data.name" />
      </div>
    </template>
  </Carousel>
  <Skeleton
    v-if="items.length === 0"
    width="100%"
    class="!rounded-none !h-[60vw] md:!h-[35vw]"></Skeleton>

  <ConfirmModal
    header="Delete"
    :visible="visibleDelete"
    @handleCancel="handleCancel"
    @confirmAction="confirmAction" />
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Modal from "@/components/Modal.vue";
import EditCarousel from "@/components/EditCarousel.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";
import store from "@/store";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/firebase";

const items = ref([]);
const itemsEdit = ref([]);

const visible = ref(false);
const visibleDelete = ref(false);
const deleteIndex = ref(null);
const deleteItem = ref(null);

const loading = ref(false);

const isLoggedIn = computed(() => store.state.isLoggedIn);

const openEditModal = () => {
  visible.value = true;
  fetchData();
};

const handleCancel = (value) => {
  visibleDelete.value = value;
};

const moveItemUp = (index) => {
  if (index > 0) {
    const item = itemsEdit.value.splice(index, 1)[0];
    itemsEdit.value.splice(index - 1, 0, item);
  }
};

const moveItemDown = (index) => {
  if (index < itemsEdit.value.length - 1) {
    const item = itemsEdit.value.splice(index, 1)[0];
    itemsEdit.value.splice(index + 1, 0, item);
  }
};

const handleDelete = (index, item) => {
  if (item.id) {
    visibleDelete.value = true;
    deleteIndex.value = index;
    deleteItem.value = item.id;
  } else {
    itemsEdit.value.splice(index, 1);
  }
};

const confirmAction = () => {
  visibleDelete.value = false;

  if (deleteItem.value) {
    itemsEdit.value = itemsEdit.value.filter(
      (tour) => tour.id !== deleteItem.value
    );
    store.dispatch("showToast", {
      severity: "success",
      summary: "ลบข้อมูลเรียบร้อยแล้ว",
    });
  }
};

const handleAddImg = async (file, base64data) => {
  itemsEdit.value.push({ name: file.name, img: base64data });
};

const onSubmit = async () => {
  loading.value = true;
  try {
    await clearCollection();
    itemsEdit.value.forEach(async (item, index) => {
      const submitData = { ...item, seq: index };
      await addDoc(collection(db, "carousel"), submitData);
    });
    loading.value = false;
    visible.value = false;
  } catch (e) {
    store.dispatch("showToast", {
      severity: "error",
      summary: e.message,
    });
  }
};

const onDialogUpdate = (value) => {
  visible.value = value;
};

const clearCollection = async () => {
  const collectionRef = collection(db, "carousel");
  const snapshot = await getDocs(collectionRef);

  snapshot.forEach((item) => {
    deleteDoc(item.ref);
  });
};

const fetchData = () => {
  onSnapshot(collection(db, "carousel"), (querySnapshot) => {
    const carouselList = [];
    querySnapshot.forEach((doc) => {
      const list = {
        id: doc.id,
        name: doc.data().name,
        img: doc.data().img,
        seq: doc.data().seq,
      };
      carouselList.push(list);
    });

    const sortedList = carouselList.sort((a, b) => a.seq - b.seq);
    items.value = [...sortedList];
    itemsEdit.value = [...sortedList];
  });
};

onMounted(() => {
  fetchData();
});
</script>

<style lang="scss">
@import "@/assets/scss/variables.scss";

.home-carousel {
  .p-carousel-container {
    position: relative;
  }

  .p-carousel-prev,
  .p-carousel-next {
    width: 3rem !important;
    height: 3rem !important;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: none !important;

    &:hover {
      background: rgba(255, 255, 255, 0.7) !important;
    }

    .p-icon {
      color: rgba(255, 255, 255, 0.8);
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  .p-carousel-prev {
    left: 0.5rem;
    z-index: 1;
  }

  .p-carousel-next {
    right: 0.5rem;
  }

  .p-carousel-indicator.p-highlight button {
    background-color: $secondary-color !important;
  }
}
</style>
