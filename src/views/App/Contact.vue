<template>
  <div class="container mx-auto px-4 sm:px-8 md:px-10">
    <div class="flex flex-col lg:flex-row py-6">
      <!-- h-[calc(100vh - navbar - content margin top - content margin bottom - footer )] -->
      <div class="lg:w-5/12 lg:min-h-[calc(100vh_-_16rem)]">
        <p class="text-primary-blue text-3xl lg:text-4xl">ติดต่อเรา</p>

        <h4 class="pt-4 text-gray-800">บริษัท เวลเนส ไลฟ์ ทราเวล จำกัด</h4>
        <h5 class="pt-2 text-gray-800">รับจัดทัวร์ในประเทศและต่างประเทศ</h5>

        <div class="pt-12">
          <Button class="w-48 !bg-green-line-app" rounded @click="addLineID">
            <font-awesome-icon :icon="['fab', 'line']" size="2xl" /><span
              class="mx-auto"
              >แอดไลน์</span
            >
          </Button>
        </div>
        <div class="pt-3">
          <Button
            class="w-48 !bg-[#1492DE]"
            rounded
            target="_blank"
            @click="goToMessenger"
          >
            <font-awesome-icon
              :icon="['fab', 'facebook-messenger']"
              size="2xl"
            /><span class="mx-auto">ส่งข้อความ</span>
          </Button>
        </div>
        <div class="pt-3 xl:hidden">
          <Button
            class="w-48 !bg-[#F77174] !mr-8"
            rounded
            @click="makePhoneCall"
          >
            <font-awesome-icon :icon="['fas', 'phone']" size="2xl" />
            <span class="mx-auto">โทรจอง</span>
          </Button>
        </div>
        <div class="pt-3">
          <Button
            class="w-48 !bg-[#D42E35]"
            rounded
            target="_blank"
            @click="sendEmail"
          >
            <font-awesome-icon
              :icon="['fas', 'envelope']"
              size="2xl"
            /><span class="mx-auto">ส่งอีเมล</span>
          </Button>
        </div>
      </div>

      <div class="lg:w-7/12 pt-7 my-12 lg:my-0">
        <div
          class="bg-[#2890E3] xl:pl-20 h-96 md:h-120 lg:h-148 xl:h-128 rounded-xl flex justify-center md:justify-normal items-center relative"
        >
          <div
            class="bg-[#F1C31E] w-24 md:w-28 h-16 md:h-20 absolute -top-7 left-10 xl:left-20 rounded-xl shadow-md"
          ></div>
          <div class="hidden md:block absolute -bottom-10 right-0 w-96">
            <img :src="vector" class="w-140" />
          </div>
          <div class="sm:pl-10 sm:pr-2">
            <div class="text-white py-3">
              <font-awesome-icon :icon="data.line.icon" class="contact-icon" />
              <span class="contact-text">{{ data.line.link }}</span>
            </div>
            <div
              v-for="item in data.contacts"
              :key="item.id"
              class="text-white py-3"
            >
              <font-awesome-icon :icon="item.icon" class="contact-icon" />
              <span class="contact-text">{{ item.link }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { data } from "@/services/ContactList";
import vector from "@/assets/images/vector-buildings.png";

const goToMessenger = () => {
  window.open(
    "https://www.facebook.com/messages/t/poonnamee.ngamrayab",
    "_blank"
  );
};

const sendEmail = () => {
  // window.open("mailto:example@example.com?subject=Inquiry", "_blank");
  window.open("mailto:example@example.com?subject=Inquiry", "_blank");
};

const addLineID = () => {
  window.open("line://ti/p/ppunme", "_blank");
};

const makePhoneCall = () => {
  window.location.href = "tel:0932392359";
};
</script>
