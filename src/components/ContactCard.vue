<template>
  <div class="relative">
    <img :src="bgImage" class="absolute top-0 object-cover h-[480px] w-full" />
    <div class="overlay"></div>

    <div
      class="flex flex-col lg:flex-row text-center lg:text-left text items-center"
    >
      <div class="basis-1/2">
        <div class="flex flex-col items-center lg:items-start">
          <img :src="lineQrCode" class="self-center" />
          <p class="self-center pt-3">
            <font-awesome-icon
              :icon="line.icon"
              size="2xl"
              class="text-line-green bg-white rounded-xl"
            />
            <span class="pl-3 text-lg">Line id: {{ line.link }}</span>
          </p>
        </div>
      </div>

      <div class="basis-1/2 flex flex-col justify-center">
        <div v-for="item in contacts" :key="item.id" class="py-3">
          <font-awesome-icon
            :icon="item.icon"
            size="2xl"
            class="self-center pr-2"
          />
          <span class="pl-3 lg:text-lg">{{ item.link }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import lineQrCode from "@/assets/images/line-qr-code.png";
import bgImage from "@/assets/images/home-contact-bg.png";

defineProps(["contacts", "line"]);
</script>

<style>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 480px;
  background-color: rgba(0, 0, 0, 0.7); /* Adjust the opacity as needed */
  z-index: 1;
}

.text {
  height: 480px;
  position: relative;
  z-index: 2;
  color: white;
}
</style>
