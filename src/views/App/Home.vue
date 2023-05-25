<template>
  <div class="text-end pb-6 pr-6">
    <Button
      @click="visible = true"
      rounded
      class="w-32 !bg-amber-500 !border-none"
    >
      <font-awesome-icon :icon="['fas', 'pen']" size="xl" />
      <span class="mx-auto">แก้ไข</span>
    </Button>
  </div>
  <Modal
    header="แก้ไขภาพหน้าโฮมเพจ"
    :visible="visible"
    @update:visible="onDialogUpdate"
  >
    <EditCarousel />
  </Modal>
  <Carousel
    :value="items"
    :numVisible="1"
    :numScroll="1"
    :autoplayInterval="5000"
    circular
    class="home-carousel"
  >
    <template #item="slotProps">
      <div class="relative">
        <img
          :src="require(`@/assets/images/${slotProps.data.image}`)"
          :alt="slotProps.data.name"
          class="object-cover h-[300] lg:h-[525px] xl:h-[700] w-full"
        />
        <!-- <div
          class="absolute inset-0 flex items-center pl-32 w-1/2 lg:w-1/3 xl:w-1/2"
        >
          <p
            class="text-white text-5xl lg:text-7xl font-semibold opacity-80 tracking-wide"
          >
            {{ slotProps.data.text }}
          </p>
        </div> -->
      </div>
    </template>
  </Carousel>

  <div class="flex justify-center items-center py-12">
    <font-awesome-icon
      :icon="['fas', 'bus']"
      size="2xl"
      class="text-primary-blue self-center pr-2"
    />
    <p class="text-primary-blue">รับจัดทัวร์ในประเทศและต่างประเทศ</p>
  </div>
  <TourGrid :tours="tours" />
  <div class="text-center py-12">
    <Button
      @click="$router.push('/tours')"
      label="ดูทั้งหมด"
      rounded
      class="w-32 !bg-primary-blue !border-none"
    />
  </div>
  <ContactCard :contacts="data.contacts" :line="data.line" />
</template>

<script setup>
import { ref } from "vue";
import TourGrid from "@/components/TourGrid.vue";
import ContactCard from "@/components/ContactCard.vue";
import Modal from "@/components/Modal.vue";
import EditCarousel from "@/components/EditCarousel.vue";
import { data } from "@/services/ContactList";

const visible = ref(false);

const items = ref([
  {
    image: "image1.png",
    name: "Image 1",
    text: "Wellness Life Travel",
  },
  {
    image: "image2.png",
    name: "Image 2",
    text: "Discover your favourite tour with us",
  },
  {
    image: "image3.png",
    name: "Image 3",
    text: "Let our travel experts plan your next gateway",
  },
]);

const tours = ref([
  {
    id: 1,
    image: "tour1.jpg",
    name: "Tour 1",
  },
  {
    id: 2,
    image: "tour2.jpg",
    name: "Tour 2",
  },
  {
    id: 3,
    image: "tour3.jpg",
    name: "Tour 3",
  },
  {
    id: 4,
    image: "tour4.jpg",
    name: "Tour 4",
  },
  {
    id: 5,
    image: "tour5.jpg",
    name: "Tour 5",
  },
  {
    id: 6,
    image: "tour6.jpg",
    name: "Tour 6",
  },
]);

const onDialogUpdate = (value) => {
  visible.value = value;
};
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
    z-index: 999;
  }

  .p-carousel-next {
    right: 0.5rem;
  }

  .p-carousel-indicator.p-highlight button {
    background-color: $secondary-color !important;
  }
}
</style>
