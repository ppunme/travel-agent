<template>
  <div class="flex justify-end pt-2">
    <!-- <FileUpload
      chooseLabel="เพิ่มรูป"
      name="image[]"
      mode="basic"
      accept="image/*"
      @select="onSelectedFiles" />
  </div> -->

    <FileUpload
      mode="basic"
      name="demo[]"
      accept="image/*"
      :auto="true"
      chooseLabel="เพิ่มรูป"
      @select="onSelectedFiles" />
  </div>

  <div class="bg-neutral-100 rounded-lg p-2 mt-2 min-h-[220px]">
    <div
      v-for="(item, idx) in items"
      :key="item.id"
      :class="['file-item', { 'mb-2': idx !== items.length - 1 }]">
      <div class="grid grid-cols-10 sm:grid-rows-3 md:grid-rows-1 gap-4">
        <div
          class="col-span-10 sm:col-span-5 sm:row-span-3 md:col-span-2 md:row-span-1">
          <div class="img-container md:w-full">
            <img
              v-if="item.id"
              :id="item.name"
              :alt="item.name" />
            <img
              v-if="!item.id"
              :src="item.img"
              :alt="item.name" />
          </div>
        </div>
        <div
          class="col-span-5 sm:col-span-5 sm:row-span-2 md:col-span-6 md:row-span-1">
          <div class="flex xl:items-center h-full">
            <span class="ellipsis">{{ item.name }}</span>
          </div>
        </div>
        <div
          class="col-span-5 sm:col-span-5 sm:row-span-1 md:col-span-2 md:row-span-1">
          <div class="flex justify-end items-center h-full">
            <button
              type="button"
              class="hover:opacity-90 pr-2"
              @click="moveItemUp(idx)">
              <font-awesome-icon
                :icon="['fas', 'chevron-circle-up']"
                size="xl"
                class="text-primary-blue" />
            </button>
            <button
              type="button"
              class="hover:opacity-90 pr-6"
              @click="moveItemDown(idx)">
              <font-awesome-icon
                :icon="['fas', 'chevron-circle-down']"
                size="xl"
                class="text-primary-blue" />
            </button>
            <button
              type="button"
              class="btn-delete"
              @click="onDelete(idx, item)">
              <font-awesome-icon
                :icon="['fas', 'xmark']"
                size="lg"
                class="text-red-500" />
            </button>
          </div>
        </div>
      </div>
      <!-- <div class="flex flex-col md:flex-row gap-2 lg:gap-6">
        <div class="md:w-1/5">
          <div class="img-container w-1/2 md:w-full">
            <img
              v-if="item.id"
              :id="item.name"
              :alt="item.name" />
            <img
              v-if="!item.id"
              :src="item.img"
              :alt="item.name" />
          </div>
        </div>
        <div class="md:w-3/5 flex items-center">
          <span class="ellipsis">{{ item.name }}</span>
        </div>
        <div class="md:w-1/5 flex items-center justify-end">
          <button
            type="button"
            class="hover:opacity-90 pr-2"
            @click="moveItemUp(idx)">
            <font-awesome-icon
              :icon="['fas', 'chevron-circle-up']"
              size="xl"
              class="text-primary-blue" />
          </button>
          <button
            type="button"
            class="hover:opacity-90 pr-6"
            @click="moveItemDown(idx)">
            <font-awesome-icon
              :icon="['fas', 'chevron-circle-down']"
              size="xl"
              class="text-primary-blue" />
          </button>
          <button
            type="button"
            class="btn-delete"
            @click="onDelete(idx, item)">
            <font-awesome-icon
              :icon="['fas', 'xmark']"
              size="lg"
              class="text-red-500" />
          </button>
        </div>
      </div> -->
    </div>
  </div>
  <!-- <ConfirmDialog /> -->
</template>

<script setup>
/* eslint-disable */ 
import { onMounted } from "vue";
import {
  isValidImageFileType,
  isValidImageFileSize,
} from "@/utils/GlobalFunction";
import store from "@/store";
// import ConfirmDialog from "primevue/confirmdialog";
import FileUpload from "primevue/fileupload";
import { ref as storageRef, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase";

const props = defineProps(["items"]);
const emit = defineEmits([
  "handleAddImg",
  "handleDelete",
  "moveItemUp",
  "moveItemDown",
]);

// const uploadedFile = ref([]);

const onSelectedFiles = async (event) => {
  const file = event.files[0];

  if (!isValidImageFileType(file)) {
    store.dispatch("showToast", {
      severity: "error",
      summary: "ไม่สามารถอัพโหลดได้เนื่องจาก",
      detail: "ประเภทของไฟล์ไม่ถูกต้อง ไฟล์ต้องเป็น png, jpg, jpeg เท่านั้น",
    });

    // uploadedFile.value.clear();

    return;
  }

  if (!isValidImageFileSize(file)) {
    store.dispatch("showToast", {
      severity: "error",
      summary: "ไม่สามารถอัพโหลดได้เนื่องจาก",
      detail: "ขนาดของไฟล์ไม่ถูกต้อง ไฟล์ต้องมีขนาดไม่เกิน 2 MB",
    });

    //uploadedFile.value.clear();

    return;
  }

  emit("handleAddImg", file);
};

const moveItemUp = (index) => {
  if (index > 0) {
    emit("moveItemUp", index);
  }
};

const moveItemDown = (index) => {
  if (index < props.items.length - 1) {
    emit("moveItemDown", index);
  }
};

const onDelete = (index, item) => {
  emit("handleDelete", index, item);
};

onMounted(() => {
  props.items.forEach((item) => {
    getDownloadURL(
      storageRef(storage, `images/carousel/${item.id}/${item.name}`)
    )
      .then((url) => {
        const img = document.getElementById(item.name);
        img.setAttribute("src", url);
      })
      .catch((error) => {
        console.log(error.message);
        // Handle any errors
      });
  });
});
</script>
