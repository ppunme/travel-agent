<template>
  <div class="container mx-auto px-4 sm:px-8 md:px-10">
    <div class="flex flex-col lg:flex-row py-6">
      <!-- h-[calc(100vh - navbar - content margin top - content margin bottom - footer )] -->
      <div class="lg:w-5/12 lg:min-h-[calc(100vh_-_16rem)]">
        <p class="text-primary-blue text-3xl lg:text-4xl">ติดต่อเรา</p>

        <h4 class="pt-4 text-gray-800">บริษัท เวลเนส ไลฟ์ ทราเวล จำกัด</h4>
        <h5 class="pt-2 text-gray-800">รับจัดทัวร์ในประเทศและต่างประเทศ</h5>

        <div class="pt-12">
          <Button
            class="w-48 !bg-green-line-app"
            rounded
            @click="handleLine">
            <font-awesome-icon
              :icon="['fab', 'line']"
              size="2xl" /><span class="mx-auto">แอดไลน์</span>
          </Button>
        </div>
        <div class="pt-3">
          <Button
            class="w-48 !bg-[#1492DE]"
            rounded
            target="_blank"
            @click="handleMessenger">
            <font-awesome-icon
              :icon="['fab', 'facebook-messenger']"
              size="2xl" /><span class="mx-auto">ส่งข้อความ</span>
          </Button>
        </div>
        <div class="pt-3 xl:hidden">
          <Button
            class="w-48 !bg-[#F77174] !mr-8"
            rounded
            @click="handlePhone">
            <font-awesome-icon
              :icon="['fas', 'phone']"
              size="2xl" />
            <span class="mx-auto">โทรจอง</span>
          </Button>
        </div>
        <div class="pt-3">
          <Button
            class="w-48 !bg-[#D42E35]"
            rounded
            target="_blank"
            @click="handleEmail">
            <font-awesome-icon
              :icon="['fas', 'envelope']"
              size="2xl" /><span class="mx-auto">ส่งอีเมล</span>
          </Button>
        </div>
      </div>

      <div class="lg:w-7/12 pt-7 my-12 lg:my-0">
        <div
          class="bg-[#2890E3] md:pl-10 xl:pl-20 h-96 md:h-120 lg:h-148 xl:h-128 rounded-xl flex justify-center md:justify-normal items-center relative">
          <div
            class="bg-[#F1C31E] w-24 md:w-28 h-16 md:h-20 absolute -top-7 left-10 xl:left-20 rounded-xl shadow-md" />
          <div class="hidden md:block absolute -bottom-10 right-0 w-96">
            <img
              :src="vector"
              class="w-140" />
          </div>
          <div>
            <div
              v-for="item in data.contacts"
              :key="item.id"
              class="contact-item hover:cursor-pointer hover:opacity-90"
              @click="handleClick(item.name, item.link)">
              <font-awesome-icon
                :icon="item.icon"
                class="contact-icon sm:w-8" />
              <span class="contact-text">{{ item.link }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { pageview } from "vue-gtag";
import { useHead } from "@vueuse/head";

import { data } from "@/services/ContactList";
import vector from "@/assets/images/vector-buildings.png";
import {
  goToMessenger,
  sendEmail,
  addLineID,
  makePhoneCall,
} from "@/utils/GlobalFunction";
import {
  line,
  facebook,
  messenger,
  phone,
  email,
  instagram,
} from "@/utils/VueGtag";

useHead({
  title: "Contact - Wellness Life Travel",
  meta: [
    // default
    {
      name: "description",
      content: "Contact",
    },
    {
      name: "keywords",
      content: "Contact,ติดต่อ",
    },

    // facebook
    { property: "og:title", content: "Contact - Wellness Life Travel" },
    { property: "og:image", content: require("@/assets/images/logo.png") },
    {
      property: "og:description",
      content: "Contact",
    },
    {
      property: "og:url",
      content: "https://www.wellnesslifetravelth.com/contact",
    },
    { property: "og:site_name", content: "wellnesslifetravelth.com" },
    { property: "og:type", content: "website" },

    // twitter
    {
      property: "twitter:title",
      content: "Contact - Wellness Life Travel",
    },
    { property: "twitter:image", content: require("@/assets/images/logo.png") },
    {
      property: "twitter:description",
      content: "Contact",
    },
    {
      property: "twitter:domain",
      content: "https://www.wellnesslifetravelth.com/contact",
    },
    { property: "twitter:site", content: "wellnesslifetravelth.com" },
    { property: "twitter:card", content: "summary_large_image" },
  ],
});

const handleClick = (name, link) => {
  switch (name) {
    case "line":
      handleLine();
      break;
    case "facebook":
      facebook("contact");
      window.open(link, "_blank");
      break;
    case "instagram":
      instagram("contact");
      window.open(link, "_blank");
      break;
    case "phone":
      handlePhone();
      break;
    case "email":
      handleEmail();
      break;
    default:
      break;
  }
};

const handleLine = () => {
  line("contact");
  addLineID();
};

const handleMessenger = () => {
  messenger("contact");
  goToMessenger();
};

const handlePhone = () => {
  phone("contact");
  makePhoneCall();
};

const handleEmail = () => {
  email("contact");
  sendEmail();
};

onMounted(async () => {
  pageview({
    page_title: "Contact",
  });
});
</script>
