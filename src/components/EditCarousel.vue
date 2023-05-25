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
      invalid-file-size-message="file size should be smaller than 3.14 MB."
    >
    </FileUpload>
  </div>
  <div class="bg-neutral-100 rounded-lg p-2 mt-2 min-h-[220px]">
    <transition-group name="item-animation" tag="div">
      <div
        v-for="(item, index) in uploadedFile"
        :key="item.id"
        :class="['file-item', { 'mb-2': index !== uploadedFile.length - 1 }]"
      >
        <div class="flex flex-wrap items-center gap-5">
          <img
            v-if="item"
            :src="item.objectURL"
            :alt="item.name"
            class="w-24 shadow-2 flex-shrink-0 border-round"
          />
          <div class="flex-1 flex flex-col gap-2">
            <span>{{ item.name }}</span>
          </div>
          <button @click="moveItemUp(index)" type="button" class="btn-move-up">
            up
          </button>
          <button
            @click="moveItemDown(index)"
            type="button"
            class="btn-move-down"
          >
            down
          </button>
          <button @click="deleteItem" type="button" class="btn-delete">
            <font-awesome-icon :icon="['fas', 'times']" class="text-red-500" />
          </button>
        </div>
      </div>
    </transition-group>
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

const moveItemUp = (index) => {
  if (index > 0) {
    const item = uploadedFile.value.splice(index, 1)[0];
    uploadedFile.value.splice(index - 1, 0, item);
  }
};

const moveItemDown = (index) => {
  if (index < uploadedFile.value.length - 1) {
    const item = uploadedFile.value.splice(index, 1)[0];
    uploadedFile.value.splice(index + 1, 0, item);
  }
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
        detail: "รูปถูกลบแล้ว",
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

<style>
.item-animation-enter-active,
.item-animation-leave-active {
  transition: all 0.3s;
}

.item-animation-enter,
.item-animation-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.item-animation-move {
  transition: transform 0.3s;
}
</style>
