<template>
  <div class="relative">
    <img
      :src="bgImage"
      class="absolute top-0 object-cover h-[550px] lg:h-[480px] w-full" />
    <div class="overlay h-[550px] lg:h-[480px]" />

    <div
      class="flex flex-col lg:flex-row text-center lg:text-left text items-center h-[550px] lg:h-[480px]">
      <div class="basis-1/2">
        <div class="flex flex-col items-center lg:items-start pt-8">
          <img
            :src="lineQrCode"
            class="self-center w-36 sm:w-auto" />
          <p class="self-center pt-8 lg:pt-3">
            <font-awesome-icon
              :icon="line.icon"
              size="2xl"
              class="text-green-line-app bg-white rounded-xl" />
            <span class="pl-3 text-lg text-[0.875rem] sm:text-[1.125rem]">
              Line id: {{ line.link }}
            </span>
          </p>
        </div>
      </div>

      <div class="basis-1/2 flex flex-col justify-center">
        <div
          v-for="item in contacts"
          :key="item.id"
          class="contact-item hover:cursor-pointer hover:opacity-90 py-3"
          @click="handleClick(item.name, item.link)">
          <font-awesome-icon
            :icon="item.icon"
            size="2xl"
            class="contact-icon sm:w-8" />
          <span class="contact-text">
            {{ item.link }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import lineQrCode from "@/assets/images/line-qr-code.png";
import bgImage from "@/assets/images/home-contact-bg.png";

defineProps(["contacts", "line"]);

const sendEmail = () => {
  window.open("mailto:wellnesslifetravel@gmail.com?subject=Inquiry", "_blank");
};

const makePhoneCall = () => {
  window.location.href = "tel:0932392359";
};

const handleClick = (name, link) => {
  switch (name) {
    case "facebook":
      window.open(link, "_blank");
      break;
    case "instagram":
      window.open(link, "_blank");
      break;
    case "phone":
      makePhoneCall();
      break;
    case "email":
      sendEmail();
      break;
    default:
      break;
  }
};
</script>

<style>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* Adjust the opacity as needed */
  z-index: 1;
}

.text {
  position: relative;
  z-index: 2;
  color: white;
}
</style>
