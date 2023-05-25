<template>
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
    >
    </FileUpload>
  </div>

  <div class="flex flex-col lg:flex-row p-3">
    <div class="basis-1/3">
      <h5 class="font-bold text-primary-blue text-center">Preview</h5>
      <div class="w-80 mx-auto pr-4">
        <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div
            v-for="(item, index) in Array.from(
              { length: 6 },
              (_, i) => uploadedFile[i] || i
            )"
            :key="item.id"
            :draggable="true"
            @dragstart="handleDragStart($event, index)"
            @dragover="handleDragOver($event)"
            @drop="handleDrop($event, index)"
            class="draggable-img rounded-lg hover:opacity-80"
          >
            <div class="square-image">
              <img
                v-if="index < uploadedFile.length"
                :src="item.objectURL"
                :alt="item.name"
                class="rounded-xl"
              />
              <img
                v-else
                :src="require('@/assets/images/no-img.png')"
                alt="no image"
                class="object-cover h-[525px] w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="basis-2/3 bg-neutral-100 rounded-lg p-2">
      <div
        v-for="(item, index) in uploadedFile"
        :key="item.id"
        :draggable="true"
        @dragstart="handleDragStart($event, index)"
        @dragover="handleDragOver($event)"
        @drop="handleDrop($event, index)"
        :class="[
          'draggable-item file-item',
          { 'mb-2': index !== uploadedFile.length - 1 },
        ]"
      >
        <div class="flex flex-wrap items-center gap-5">
          <div class="flex-1 flex flex-col gap-2">
            <span>{{ item.name }}</span>
          </div>
          <button @click="deleteItem" type="button" class="btn-delete">
            <font-awesome-icon :icon="['fas', 'times']" class="text-red-500" />
          </button>
        </div>
      </div>
    </div>
  </div>
  <Toast />
  <ConfirmDialog></ConfirmDialog>
</template>

<script setup>
import { ref, watch } from "vue";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";

const toast = useToast();
const confirm = useConfirm();
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

const handleDragStart = (event, index) => {
  event.dataTransfer.setData("text/plain", index);
};

const handleDragOver = (event) => {
  event.preventDefault();
};

const handleDrop = (event, newIndex) => {
  event.preventDefault();
  const oldIndex = event.dataTransfer.getData("text/plain");
  const item = uploadedFile.value.splice(oldIndex, 1)[0];
  uploadedFile.value.splice(newIndex, 0, item);
  toast.add({ severity: "success", summary: "Rows Reordered", life: 3000 });
};

const deleteItem = () => {
  console.log("delete");
  confirm.require({
    message: "ยืนยันการลบข้อมูล",
    header: "Delete",
    acceptClass: "p-button-danger",
    accept: () => {
      toast.add({
        severity: "error",
        summary: "Confirmed",
        detail: "Record deleted",
        life: 3000,
      });
    },
  });
};

watch(uploadedFile.value, (newValue, oldValue) => {
  console.log(oldValue);
  console.log("upload file name", newValue);
});
</script>

<style scoped>
.draggable-item {
  cursor: move;
}

.draggable-img {
  cursor: move;
}

.square-image {
  aspect-ratio: 1/1; /* Creates a square aspect ratio */
  overflow: hidden;
}

.square-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
