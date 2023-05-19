<template>
  <div class="relative mt-12 mb-20">
    <div class="container mx-auto">
      <!-- h-[calc(100vh - navbar - content margin top - content margin bottom - footer )] -->
      <div
        class="w-full md:w-5/12 min-h-[calc(100vh-9rem-3rem-5rem-4rem)] contact-form"
      >
        <h1 class="text-primary-blue">ติดต่อเรา</h1>

        <h4 class="pt-4">บริษัท เวลเนส ไลฟ์ ทราเวล จำกัด</h4>
        <h5 class="pt-2">รับจัดทัวร์ในประเทศและต่างประเทศ</h5>

        <div class="pt-12">
          <Button
            class="w-48 !bg-[#1492DE]"
            rounded
            @click="goToMessenger"
            target="_blank"
          >
            <font-awesome-icon
              :icon="['fab', 'facebook-messenger']"
              size="2xl"
            /><span class="mx-auto">ส่งข้อความ</span>
          </Button>
        </div>
        <div class="pt-3">
          <Button
            class="w-48 !bg-[#D42E35]"
            rounded
            @click="sendEmail"
            target="_blank"
          >
            <font-awesome-icon :icon="['fas', 'envelope']" size="2xl" /><span
              class="mx-auto"
              >ส่งอีเมล</span
            >
          </Button>
        </div>
        <div class="pt-3">
          <Button class="w-48 !bg-[#06C755]" rounded @click="addLineID">
            <font-awesome-icon :icon="['fab', 'line']" size="2xl" /><span
              class="mx-auto"
              >แอดไลน์</span
            >
          </Button>
        </div>
        <div class="pt-3">
          <Button
            class="w-48 !bg-[#F77174] !mr-8"
            rounded
            @click="makePhoneCall"
          >
            <font-awesome-icon :icon="['fas', 'phone']" size="2xl" />
            <span class="mx-auto">โทรจอง</span>
          </Button>
        </div>
      </div>

      <div class="w-full sm:w-7/12 absolute right-0 top-0">
        <div
          class="bg-[#2890E3] h-144 px-20 rounded-s-xl relative flex items-center"
        >
          <div
            class="bg-[#F1C31E] w-28 h-20 absolute -top-7 rounded-xl shadow-md"
          ></div>
          <div>
            <div class="text-white py-3">
              <font-awesome-icon
                :icon="data.line.icon"
                size="2xl"
                class="self-center pr-2"
              />
              <span class="pl-3 text-lg">{{ data.line.link }}</span>
            </div>
            <div
              v-for="item in data.contacts"
              :key="item.id"
              class="text-white py-3"
            >
              <font-awesome-icon
                :icon="item.icon"
                size="2xl"
                class="self-center pr-2"
              />
              <span class="pl-3 text-lg">{{ item.link }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="absolute right-0 top-64">
        <img :src="vector" class="w-140" />
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
