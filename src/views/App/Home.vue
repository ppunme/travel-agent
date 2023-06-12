<template>
  <div
    v-if="isLoggedIn"
    class="text-end pb-6 px-6">
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
    header="แก้ไขภาพหน้าโฮมเพจ"
    :visible="visible"
    :loading="loading"
    @update:visible="onDialogUpdate"
    @onSubmit="onSubmit">
    <EditCarousel
      :items="items"
      @handleAddImg="handleAddImg"
      @handleDelete="handleDelete"
      @moveItemUp="moveItemUp"
      @moveItemDown="moveItemDown" />
  </Modal>
  <Carousel
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

  <div class="container mx-auto px-4 sm:px-8 md:px-10">
    <div class="flex justify-center items-center py-12">
      <font-awesome-icon
        :icon="['fas', 'bus']"
        size="2xl"
        class="text-primary-blue self-center pr-2" />
      <p class="text-primary-blue">รับจัดทัวร์ในประเทศและต่างประเทศ</p>
    </div>
    <TourGrid />
    <div class="text-center py-12">
      <Button
        label="ดูทั้งหมด"
        rounded
        class="w-32 !bg-primary-blue !border-none"
        @click="$router.push('/tours')" />
    </div>
  </div>
  <ContactCard
    :contacts="data.contacts"
    :line="data.line" />
  <ConfirmModal
    header="Delete"
    :visible="visibleDelete"
    @handleCancel="handleCancel"
    @confirmAction="confirmAction" />
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue";
import TourGrid from "@/components/TourGrid.vue";
import ContactCard from "@/components/ContactCard.vue";
import Modal from "@/components/Modal.vue";
import EditCarousel from "@/components/EditCarousel.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";
import { data } from "@/services/ContactList";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/firebase";
import store from "@/store";

const items = ref([]);
const visible = ref(false);
const visibleDelete = ref(false);
const deleteIndex = ref(null);
const deleteItem = ref(null);

const loading = ref(false);

const isLoggedIn = computed(() => store.state.isLoggedIn);

const handleCancel = (value) => {
  visibleDelete.value = value;
};

const handleDelete = (index, item) => {
  if (item.id) {
    visibleDelete.value = true;
    deleteIndex.value = index;
    deleteItem.value = item.id;
  } else {
    items.value.splice(index, 1);
  }
};

const handleAddImg = async (file, base64data) => {
  items.value.push({ name: file.name, img: base64data });
};

const clearCollection = async () => {
  const collectionRef = collection(db, "carousel");
  const snapshot = await getDocs(collectionRef);

  snapshot.forEach((item) => {
    deleteDoc(item.ref);
  });
};

const onSubmit = async () => {
  loading.value = true;
  try {
    await clearCollection();
    items.value.forEach(async (item, index) => {
      const submitData = { ...item, seq: index };
      console.log("submitData2", submitData);

      const docRef = await addDoc(collection(db, "carousel"), submitData);
      //console.log(docRef);
      console.log("Document written with ID: ", docRef.id);
    });
    loading.value = false;
    visible.value = false;
  } catch (e) {
    console.log(e);
  }
};

const onDialogUpdate = (value) => {
  visible.value = value;
};

// const confirmDelete = () => {
//   visibleDelete.value = false;

//   if (deleteItem.value) {
//     items.value = items.value.filter((tour) => tour.id !== deleteItem.value);
//     toast.add({
//       severity: "error",
//       summary: "Confirmed",
//       detail: "รูปถูกลบแล้ว",
//       life: 3000,
//     });
//   }
// };

const moveItemUp = (index) => {
  if (index > 0) {
    const item = items.value.splice(index, 1)[0];
    items.value.splice(index - 1, 0, item);
  }
};

const moveItemDown = (index) => {
  if (index < items.value.length - 1) {
    const item = items.value.splice(index, 1)[0];
    items.value.splice(index + 1, 0, item);
  }
};

watch(items.value, (newValue, oldValue) => {
  console.log("watch:", oldValue);
  console.log("upload file name", newValue);
});

onMounted(async () => {
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
    items.value = carouselList.sort((a, b) => a.seq - b.seq);
  });
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
