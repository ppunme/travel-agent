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
          v-if="slotProps.data.id"
          :src="slotProps.data.imgUrl"
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
import { db, storage } from "@/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const items = ref([]);
const itemsEdit = ref([]);

const visible = ref(false);
const visibleDelete = ref(false);
const deleteIndex = ref(null);
const deleteItem = ref(null);

const uploadedFiles = ref([]);

const loading = ref(false);

const isLoggedIn = computed(() => store.state.isLoggedIn);

const openEditModal = () => {
  visible.value = true;
  //fetchData();
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
      (carousel) => carousel.id !== deleteItem.value
    );
    store.dispatch("showToast", {
      severity: "success",
      summary: "ลบข้อมูลเรียบร้อยแล้ว",
    });
  }
};

const handleAddImg = async (file, base64data) => {
  itemsEdit.value.push({ name: file.name, img: base64data });
  uploadedFiles.value.push(file);
};

const onDialogUpdate = (value) => {
  visible.value = value;
};

// Upload file to Firebase Storage
const upload = async () => {
  if (!uploadedFiles.value) {
    return;
  }

  uploadedFiles.value.forEach(async (file) => {
    const fileRef = storageRef(storage, file.name);
    await uploadBytes(fileRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!", snapshot);
    });
  });
};

const onSubmit = async () => {
  loading.value = true;
  try {
    upload();
    await clearCollection();
    itemsEdit.value.forEach(async (item, index) => {
      const submitData = { name: item.name, seq: index };
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

const clearCollection = async () => {
  const collectionRef = collection(db, "carousel");
  const snapshot = await getDocs(collectionRef);

  snapshot.forEach((item) => {
    deleteDoc(item.ref);
  });
};

// const fetch1 = () => {
//   return new Promise((resolve) => {
//     onSnapshot(collection(db, "carousel"), (querySnapshot) => {
//       let carouselList = [];
//       querySnapshot.forEach((doc) => {
//         const list = {
//           id: doc.id,
//           name: doc.data().name,
//           seq: doc.data().seq,
//         };
//         carouselList.push(list);
//       });
//       resolve(carouselList);
//     });
//   });
// };

// const aa = ref([]);

// const sortedAA = computed(() => {
//   let sorted = aa.value;
//   sorted = sorted.slice().sort((a, b) => a.seq - b.seq);
//   return sorted;
// });

// const fetch2 = (carouselList) => {
//   let count = 0;
//   for (let i = 0; i < carouselList.length; i++) {
//     count++;
//     getDownloadURL(storageRef(storage, carouselList[i].name))
//       .then((url) => {
//         carouselList[i] = { ...carouselList[i], imgUrl: url };
//         aa.value.push({ ...carouselList[i], imgUrl: url });
//       })
//       .catch((error) => {
//         console.log(error.message);
//         // Handle any errors
//       });
//   }

//   if (count === carouselList.length) {
//     console.log("aa", aa.value);
//     let sorted = aa.value;
//     console.log(
//       "sorted",
//       sorted.slice().sort((a, b) => a.seq - b.seq)
//     );
//     sorted = sorted.slice().sort((a, b) => a.seq - b.seq);

//     items.value = sorted;
//     itemsEdit.value = sorted;
//   }
// };

// const fetchData = () => {
//   onSnapshot(collection(db, "carousel"), (querySnapshot) => {
//     let carouselList = [];
//     querySnapshot.forEach((doc) => {
//       const list = {
//         id: doc.id,
//         name: doc.data().name,
//         seq: doc.data().seq,
//       };
//       carouselList.push(list);
//     });

//     for (let i = 0; i < carouselList.length; i++) {
//       getDownloadURL(storageRef(storage, carouselList[i].name))
//         .then((url) => {
//           carouselList[i] = { ...carouselList[i], imgUrl: url };
//         })
//         .catch((error) => {
//           console.log(error.message);
//           // Handle any errors
//         });
//     }

//     //console.log("carousel", carouselList);

//     const sortedList = carouselList.sort((a, b) => a.seq - b.seq);
//     //console.log("sortedList", sortedList);

//     items.value = sortedList;
//     //console.log("items", items.value);

//     itemsEdit.value = sortedList;
//   });
// };

const fetchData = () => {
  onSnapshot(collection(db, "carousel"), async (querySnapshot) => {
    let carouselList = [];
    querySnapshot.forEach((doc) => {
      const list = {
        id: doc.id,
        name: doc.data().name,
        seq: doc.data().seq,
      };
      carouselList.push(list);
    });

    try {
      const promises = carouselList.map((carouselItem) => {
        return getDownloadURL(storageRef(storage, carouselItem.name))
          .then((url) => {
            carouselItem.imgUrl = url;
          })
          .catch((error) => {
            console.log(error.message);
            // Handle any errors
          });
      });

      await Promise.all(promises);

      const sortedList = carouselList.sort((a, b) => a.seq - b.seq);
      items.value = sortedList;
      itemsEdit.value = sortedList;
    } catch (error) {
      console.log(error.message);
      // Handle any errors
    }
  });
};

onMounted(() => {
  fetchData();
  // fetch1().then((res) => {
  //   fetch2(res);
  // });
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
