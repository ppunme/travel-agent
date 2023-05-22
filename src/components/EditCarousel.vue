<template>
  <OrderList
    v-model="uploadedFile"
    listStyle="height:auto"
    dataKey="id"
    class="pt-3"
    responsive="true"
    breakpoint="960px"
    :pt="{
      header: {
        root: { class: '!hidden' },
      },
      moveUpButton: {
        root: { class: '!bg-primary-blue !border-primary-blue !rounded-full' },
      },
      moveDownButton: {
        root: { class: '!bg-primary-blue !border-primary-blue !rounded-full' },
      },
      moveTopButton: {
        root: { class: '!hidden' },
      },
      moveBottomButton: {
        root: { class: '!hidden' },
      },
    }"
  >
    <template #item="slotProps">
      <div class="flex flex-wrap p-2 items-center gap-5">
        <img
          v-if="slotProps.item"
          :src="slotProps.item.objectURL"
          :alt="slotProps.item.name"
          class="w-24 shadow-2 flex-shrink-0 border-round"
        />
        <div class="flex-1 flex flex-col gap-2">
          <span>{{ slotProps.item.name }}</span>
          <InputText type="text" />
        </div>

        <Button icon="pi pi-times" severity="danger" rounded aria-label="Cancel"
          ><font-awesome-icon :icon="['fas', 'trash']" class="text-white" />
        </Button>
      </div>
    </template>
    <template #moveupicon>
      <font-awesome-icon
        :icon="['fas', 'chevron-up']"
        size="lg"
        class="text-white"
    /></template>
    <template #movedownicon>
      <font-awesome-icon
        :icon="['fas', 'chevron-down']"
        size="lg"
        class="text-white"
    /></template>
  </OrderList>
  <div class="flex justify-end pt-6">
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
</template>

<script setup>
import { ref, watch } from "vue";
const uploadedFile = ref([]);

const customBase64Uploader = async (event) => {
  const file = event.files[0];
  console.log("file", file);
  const reader = new FileReader();
  let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

  reader.readAsDataURL(blob);

  reader.onloadend = function () {
    //const base64data = reader.result;
    //console.log("base64data: " + base64data);
    console.log("file", file);
    uploadedFile.value.push(file);
  };
};

watch(uploadedFile.value, (newValue, oldValue) => {
  console.log(oldValue);
  console.log("upload file name", newValue);
});
</script>
