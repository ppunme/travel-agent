<template>
  <div class="flex justify-end pt-2">
    <FileUpload
      chooseLabel="เพิ่มรูป"
      mode="basic"
      name="demo[]"
      url="./upload.php"
      accept="image/*"
      :maxFileSize="3140000"
      :auto="true"
      invalid-file-size-message="file size should be smaller than 3.14 MB."
      @select="customBase64Uploader" />
  </div>
  <div class="bg-neutral-100 rounded-lg p-2 mt-2 min-h-[220px]">
    <div
      v-for="(item, idx) in items"
      :key="item.id"
      :class="['file-item', { 'mb-2': idx !== items.length - 1 }]">
      <!-- <div class="flex flex-row gap-2 lg:gap-6">
        <div class="flex flex-col w-2/5 md:w-1/5">
          <div class="img-container md:w-full">
            <img
              v-if="item"
              :src="item.objectURL || item.img"
              :alt="item.name"
            />
          </div>
        </div>
        <div class="flex flex-col w-3/5 md:w-4/5">
          <div class="flex flex-col md:flex-row md:items-center md:h-full">
            <div class="md:w-3/4">
              <p class="ellipsis">{{ item.name }}</p>
            </div>
            <div class="md:w-1/4 flex justify-end items-end h-full">
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
                class="hover:opacity-90 pr-6"
              >
                <font-awesome-icon
                  :icon="['fas', 'chevron-circle-down']"
                  size="xl"
                  class="text-primary-blue"
                />
              </button>
              <button
                @click="onDelete(idx, item)"
                type="button"
                class="btn-delete"
              >
                <font-awesome-icon
                  :icon="['fas', 'xmark']"
                  size="lg"
                  class="text-red-500"
                />
              </button>
            </div>
          </div>
        </div>
      </div> -->

      <div class="flex flex-col md:flex-row gap-2 lg:gap-6">
        <div class="md:basis-1/5">
          <div class="img-container w-1/2 md:w-full">
            <img
              v-if="item"
              :src="item.objectURL || item.img"
              :alt="item.name" />
          </div>
        </div>
        <div class="md:basis-3/5 flex items-center">
          <span class="ellipsis">{{ item.name }}</span>
        </div>
        <div class="md:basis-1/5 flex items-center justify-end">
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
  </div>
  <ConfirmDialog />
</template>

<script setup>
/* eslint-disable */
  import { ref, watch, onMounted } from "vue";

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
    const reader = new FileReader();
    let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      const base64data = reader.result;
      uploadedFile.value.push(file);
      emit("handleAddImg", file, base64data);
    };
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

  watch(props.items.length, (newValue, oldValue) => {
    console.log("watch:", oldValue);
    console.log("upload file name", newValue);
  });
</script>

<style></style>
