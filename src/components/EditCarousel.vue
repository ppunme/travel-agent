<template>
  {{ items.length }}
  <div class="flex justify-end pt-2">
    <FileUpload
      chooseLabel="เพิ่มรูป"
      mode="basic"
      name="demo[]"
      url="./upload.php"
      accept="image/*"
      :maxFileSize="3140000"
      @select="customBase64Uploader"
      :auto="true"
      invalid-file-size-message="file size should be smaller than 3.14 MB."
    >
    </FileUpload>
  </div>
  <div class="bg-neutral-100 rounded-lg p-2 mt-2 min-h-[220px]">
    <div
      v-for="(item, idx) in items"
      :key="item.id"
      :class="['file-item', { 'mb-2': idx !== items.length - 1 }]"
    >
      <div class="flex gap-2 lg:gap-6">
        <div class="flex-none flex items-center">
          <img
            v-if="item"
            :src="item.objectURL"
            :alt="item.name"
            class="w-24 shadow-2 flex-shrink-0 border-round"
          />
        </div>
        <div class="grow flex items-center">
          <span class="ellipsis">{{ item.name }}</span>
        </div>
        <div class="flex-none flex items-center pr-6">
          <button
            @click="moveItemUp(idx)"
            type="button"
            class="hover:opacity-90 pr-2"
          >
            <font-awesome-icon
              :icon="['fas', 'chevron-circle-up']"
              size="xl"
              class="text-primary-blue"
            />
          </button>
          <button
            @click="moveItemDown(idx)"
            type="button"
            class="hover:opacity-90"
          >
            <font-awesome-icon
              :icon="['fas', 'chevron-circle-down']"
              size="xl"
              class="text-primary-blue"
            />
          </button>
        </div>
        <div class="flex-none flex items-center">
          <button @click="onDelete(idx, item)" type="button" class="btn-delete">
            <font-awesome-icon
              :icon="['fas', 'xmark']"
              size="lg"
              class="text-red-500"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
  <Toast />
  <ConfirmDialog></ConfirmDialog>
</template>

<script setup>
/* eslint-disable */
import { ref, watch, defineProps, defineEmits } from "vue";

const props = defineProps(["items"]);
const emit = defineEmits([
  "handleAddImg",
  "handleDelete",
  "moveItemUp",
  "moveItemDown",
]);

const uploadedFile = ref([]);

const customBase64Uploader = async (event) => {
  const file = event.files[0];
  //console.log("file", file);
  const reader = new FileReader();
  let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

  reader.readAsDataURL(blob);

  reader.onloadend = function () {
    //const base64data = reader.result;
    //console.log("base64data: " + base64data);
    console.log("file", file);
    //uploadedFile.value.push(file);
    emit("handleAddImg", file);
  };
};

const moveItemUp = (index) => {
  if (index > 0) {
    emit("moveItemUp", index);
  }
};

const moveItemDown = (index) => {
  console.log("props", props.items);
  if (index < props.items.length - 1) {
    emit("moveItemDown", index);
  }
};

const onDelete = (index, item) => {
  emit("handleDelete", index, item);
};

watch(props.items.length, (newValue, oldValue) => {
  console.log("watch:", oldValue);
  console.log("upload file name", newValue);
});
</script>

<style></style>
