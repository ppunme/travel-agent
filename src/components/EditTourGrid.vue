<template>
  <div class="flex justify-end">
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
  <!-- <div class="w-80 mx-auto my-3">
    <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
      <div
        v-for="(item, index) in uploadedFile.slice(0, 6)"
        :key="item.id"
        :draggable="true"
        @dragstart="handleDragStart($event, index)"
        @dragover="handleDragOver($event)"
        @drop="handleDrop($event, index)"
        class="draggable-img rounded-lg hover:opacity-90"
      >
        {{ uploadedFile.length }}
        <div class="square-image">
          {{ index }}
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
  </div> -->
  <div class="w-80 mx-auto my-3">
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
        class="draggable-img rounded-lg hover:opacity-90"
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

  <div
    v-for="(item, index) in uploadedFile"
    :key="item.id"
    :draggable="true"
    @dragstart="handleDragStart($event, index)"
    @dragover="handleDragOver($event)"
    @drop="handleDrop($event, index)"
    class="draggable-item rounded-lg hover:bg-blue-100"
  >
    <div class="flex flex-wrap items-center gap-5">
      <div class="flex-1 flex flex-col gap-2">
        <span>{{ item.name }}</span>
      </div>
      <button @click="deleteItem" type="button" class="w-8">
        <font-awesome-icon :icon="['fas', 'times']" class="text-red-500" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useToast } from "primevue/usetoast";

const toast = useToast();
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

const deleteItem = () => {};

watch(uploadedFile.value, (newValue, oldValue) => {
  console.log(oldValue);
  console.log("upload file name", newValue);
});
</script>

<style scoped>
.draggable-item {
  padding: 10px;
  margin-bottom: 5px;
  background-color: #f5f5f5;
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

.p-button-sm {
}
</style>
