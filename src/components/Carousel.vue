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
import Modal from "@/components/Modal.vue";
import EditCarousel from "@/components/EditCarousel.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";
import Button from "primevue/button";
import Carousel from "primevue/carousel";
import Skeleton from "primevue/skeleton";

defineProps([
  "isLoggedIn",
  "visible",
  "loading",
  "itemsEdit",
  "items",
  "visibleDelete",
  "openEditModal",
  "handleCancel",
  "moveItemUp",
  "moveItemDown",
  "handleDelete",
  "confirmAction",
  "handleAddImg",
  "onSubmit",
  "onDialogUpdate",
]);
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
