<template>
  <div class="xl:px-56 2xl:px-72">
    <div
      v-if="isLoggedIn"
      class="text-end pb-6">
      <Button
        rounded
        class="w-32 !bg-amber-500 !border-none"
        @click="openEditTourModal">
        <font-awesome-icon :icon="['fas', 'pen']" />
        <span class="mx-auto">แก้ไข</span>
      </Button>
    </div>
    <Modal
      header="แก้ไขการแสดงผลแพ็คเกจทัวร์หน้าโฮมเพจ"
      :visible="visibleTour"
      :tourGrid="true"
      :loading="tourLoading"
      @update:visible="onTourDialogUpdate"
      @onSubmit="onTourSubmit">
      <EditTourGrid
        :tours="tours"
        :selectedTours="selectedToursEdit"
        @onAddRow="onAddRow"
        @updateSelectedTours="updateSelectedTours"
        @handleDelete="handleTourDelete"
        @handleDrop="handleDrop" />
    </Modal>
    <div
      v-if="dataLength > 0"
      class="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-12">
      <div
        v-for="(item, index) in selectedTours"
        :key="index"
        class="flex justify-center cursor-pointer hover:opacity-80 rounded-xl shadow-md square-image"
        @click="viewPackage(item.id)">
        <img
          :src="item.image"
          :alt="item.name"
          class="rounded-xl shadow-md" />
      </div>
    </div>
    <div
      v-if="dataLength === 0"
      class="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-12">
      <div
        v-for="index in 3"
        :key="index"
        class="square-image"
        :class="index === 3 && 'hidden md:block'">
        <Skeleton class="!h-full !rounded-xl shadow-md"></Skeleton>
      </div>
    </div>
  </div>
  <ConfirmModal
    header="Delete"
    :visible="visibleTourDelete"
    @handleCancel="handleTourCancel"
    @confirmAction="confirmTourAction" />
  <Toast />
</template>

<script setup>
import Modal from "@/components/Modal.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";
import EditTourGrid from "@/components/EditTourGrid.vue";
import Button from "primevue/button";
import Skeleton from "primevue/skeleton";
import Toast from "primevue/toast";

defineProps([
  "isLoggedIn",
  "openEditTourModal",
  "visibleTour",
  "tourLoading",
  "onTourDialogUpdate",
  "onTourSubmit",
  "tours",
  "selectedToursEdit",
  "onAddRow",
  "updateSelectedTours",
  "handleTourDelete",
  "handleDrop",
  "dataLength",
  "selectedTours",
  "viewPackage",
  "visibleTourDelete",
  "handleTourCancel",
  "confirmTourAction",
]);
</script>

<style scoped>
.square-image {
  aspect-ratio: 1/1;
}

.square-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
