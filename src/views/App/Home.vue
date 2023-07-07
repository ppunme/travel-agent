<template>
  <CarouselComp
    :isLoggedIn="isLoggedIn"
    :visible="visible"
    :loading="loading"
    :itemsEdit="itemsEdit"
    :items="items"
    :visibleDelete="visibleDelete"
    :openEditModal="openEditModal"
    :handleCancel="handleCancel"
    :moveItemUp="moveItemUp"
    :moveItemDown="moveItemDown"
    :handleDelete="handleDelete"
    :confirmAction="confirmAction"
    :handleAddImg="handleAddImg"
    :onSubmit="onSubmit"
    :onDialogUpdate="onDialogUpdate" />
  <div class="container mx-auto px-4 sm:px-8 md:px-10">
    <div class="flex justify-center items-center py-8 sm:py-12">
      <font-awesome-icon
        :icon="['fas', 'bus']"
        size="2xl"
        class="text-primary-blue self-center pr-2" />
      <p class="text-primary-blue">รับจัดทัวร์ในประเทศและต่างประเทศ</p>
    </div>
    <TourGrid
      :isLoggedIn="isLoggedIn"
      :openEditTourModal="openEditTourModal"
      :visibleTour="visibleTour"
      :tourLoading="tourLoading"
      :onTourDialogUpdate="onTourDialogUpdate"
      :onTourSubmit="onTourSubmit"
      :tours="tours"
      :selectedToursEdit="selectedToursEdit"
      :onAddRow="onAddRow"
      :updateSelectedTours="updateSelectedTours"
      :handleTourDelete="handleTourDelete"
      :handleDrop="handleDrop"
      :dataLength="dataLength"
      :selectedTours="selectedTours"
      :viewPackage="viewPackage"
      :visibleTourDelete="visibleTourDelete"
      :handleTourCancel="handleTourCancel"
      :confirmTourAction="confirmTourAction" />
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
    :line="data.contacts[0]" />
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import { pageview } from "vue-gtag";
import { useHead } from "@vueuse/head";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import store from "@/store";
import { db, storage } from "@/firebase";
import { data } from "@/services/ContactList";
import CarouselComp from "@/components/Carousel.vue";
import TourGrid from "@/components/TourGrid.vue";
import ContactCard from "@/components/ContactCard.vue";
import Button from "primevue/button";

const router = useRouter();

const isLoggedIn = computed(() => store.state.isLoggedIn);

// Carousel
const items = ref([]);
const itemsEdit = ref([]);

const visible = ref(false);
const visibleDelete = ref(false);
const deleteIndex = ref(null);
const deleteItem = ref(null);

const uploadedFiles = ref([]);

const loading = ref(false);

const openEditModal = () => {
  visible.value = true;
  fetchCarouselData();
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

const onDialogUpdate = (value) => {
  visible.value = value;
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

const handleAddImg = async (file, base64data) => {
  itemsEdit.value.push({ name: file.name, img: base64data });
  uploadedFiles.value.push(file);
};

const clearCollection = async () => {
  const collectionRef = collection(db, "carousel");
  const snapshot = await getDocs(collectionRef);

  snapshot.forEach((item) => {
    deleteDoc(item.ref);
  });
};

// Upload file to Firebase Storage
const upload = async () => {
  if (!uploadedFiles.value) {
    return;
  }

  uploadedFiles.value.forEach(async (file) => {
    console.log(file);
    const fileRef = storageRef(storage, file.name);
    await uploadBytes(fileRef, file);
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
      fetchCarouselData();
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
// Carousel

// Tour
const tours = ref();
const visibleTour = ref(false);
const visibleTourDelete = ref(false);
const deleteTourIndex = ref(null);
const deleteTourItem = ref([]);
const dataLength = ref(0);
const changedItem = ref([]);

const tourLoading = ref(false);

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

const openEditTourModal = () => {
  visibleTour.value = true;
  deleteTourItem.value = [];
};

const handleTourCancel = (value) => {
  visibleTourDelete.value = value;
};

const handleTourDelete = (index, item) => {
  if (item.id) {
    visibleTourDelete.value = true;
    deleteTourIndex.value = index;

    if (!deleteTourItem.value.includes(item.id)) {
      deleteTourItem.value.push(item.id);
    }
  } else {
    selectedToursEdit.value.splice(index, 1);
  }
};

const confirmTourAction = async () => {
  visibleTourDelete.value = false;

  if (deleteTourItem.value.length > 0) {
    selectedToursEdit.value.splice(deleteTourIndex.value, 1);

    store.dispatch("showToast", {
      severity: "success",
      summary: "ลบข้อมูลเรียบร้อยแล้ว",
    });
  }
};

const onTourDialogUpdate = (value) => {
  visibleTour.value = value;
};

const viewPackage = (id) => {
  router.push(`/tours/${id}`);
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

const onTourSubmit = () => {
  tourLoading.value = true;

  if (deleteTourItem.value.length > 0) {
    deleteTourItem.value.forEach(async (item) => {
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
    tourLoading.value = false;
    visibleTour.value = false;
  });
};
// Tour

const fetchCarouselData = () => {
  return new Promise((resolve) => {
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

      const promises = carouselList.map((carouselItem) => {
        return getDownloadURL(storageRef(storage, carouselItem.name))
          .then((url) => {
            carouselItem.imgUrl = url;
          })
          .catch((error) => {
            console.log(error.message);
          });
      });

      await Promise.all(promises);

      const sortedList = carouselList.sort((a, b) => a.seq - b.seq);
      items.value = sortedList;
      itemsEdit.value = sortedList;

      resolve();
    });
  });
};

const fetchTourData = () => {
  return new Promise((resolve) => {
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
      resolve();
    });
  });
};

pageview({
  page_title: "Home",
});

useHead({
  title: "Wellness Life Travel",
  meta: [
    // default
    {
      name: "description",
      content: "รับจัดทัวร์ ในประเทศ และ ต่างประเทศ",
    },
    {
      name: "keywords",
      content:
        "ทัวร์,การเดินทาง,ทัวร์นำเที่ยว,การผจญภัย,สถานที่ท่องเที่ยว,การสำรวจ,วันหยุดพักผ่อน,วันหยุด,การเดินทางชมสถานที่,ทัวร์ราคาถูก,ทัวร์คุณภาพ",
    },

    // facebook
    { property: "og:title", content: "Wellness Life Travel" },
    {
      property: "og:image",
      content: "https://www.wellnesslifetravelth.com/logo.png",
    },
    {
      property: "og:description",
      content: "รับจัดทัวร์ ในประเทศ และ ต่างประเทศ",
    },
    { property: "og:url", content: "https://www.wellnesslifetravelth.com" },
    { property: "og:site_name", content: "wellnesslifetravelth.com" },
    { property: "og:type", content: "website" },

    // twitter
    { name: "twitter:title", content: "Wellness Life Travel" },
    {
      name: "twitter:image",
      content: "https://www.wellnesslifetravelth.com/logo.png",
    },
    {
      name: "twitter:description",
      content: "รับจัดทัวร์ ในประเทศ และ ต่างประเทศ",
    },
    {
      name: "twitter:domain",
      content: "https://www.wellnesslifetravelth.com",
    },
    { name: "twitter:site", content: "wellnesslifetravelth.com" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
});

onMounted(() => {
  Promise.all([fetchCarouselData(), fetchTourData()])
    .then(() => {
      nextTick(() => {
        document.dispatchEvent(new Event("render-complete"));
      });
    })
    .catch(() => {
      store.dispatch("showToast", {
        severity: "error",
        summary: "พบข้อผิดพลาดในการแสดงข้อมูล",
        detail: "กรุณาลองใหม่อีกครั้ง",
      });
    });
});
</script>
