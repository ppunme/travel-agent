<template>
  <div class="container mx-auto px-4 sm:px-8 md:px-10 py-12">
    <div
      v-if="isLoggedIn"
      class="flex justify-end">
      <Button
        v-if="route.params.tourId !== 'preview' && tour"
        class="w-18 md:w-32 !bg-[#F5A327] !mb-12"
        rounded
        @click="
          $router.push(`/tours/edit/${$route.params.tourId}`)
        ">
        <font-awesome-icon
          :icon="['fas', 'pen']"
          size="lg" /><span class="mx-auto"
          ><p class="hidden md:block">แก้ไข</p></span
        >
      </Button>
      <Button
        v-if="route.params.tourId !== 'preview' && tour"
        class="w-18 md:w-32 !bg-[#D42E35] !mb-12 !ml-4"
        rounded
        @click="handleDelete($route.params.tourId)">
        <font-awesome-icon
          :icon="['fas', 'trash']"
          size="lg" /><span class="mx-auto"
          ><p class="hidden md:block">ลบ</p></span
        >
      </Button>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-5 lg:gap-10">
      <img
        v-if="route.params.tourId === 'preview' && route.query.image"
        :src="route.query.image"
        alt=""
        class="lg:col-span-2 w-full rounded-[20px]" />

      <img
        v-if="route.params.tourId !== 'preview' && tour"
        :src="tour.image"
        alt=""
        class="lg:col-span-2 w-full rounded-[20px]" />
      <Skeleton
        v-if="route.params.tourId !== 'preview' && !tour"
        class="lg:col-span-2 !h-[85vw] sm:!h-[75vw] md:!h-[70vw] lg:!h-full !rounded-[20px]"></Skeleton>

      <div class="col-span-3 flex flex-col font-medium">
        <h1
          v-if="(route.params.tourId !== 'preview' && tour) || route.query.name"
          class="pb-8 mt-8 lg:mt-0">
          {{
            route.params.tourId !== "preview" && tour
              ? tour.name
              : route.query.name
          }}
        </h1>
        <Skeleton
          v-if="route.params.tourId !== 'preview' && !tour"
          class="!rounded-[20px] mb-8 mt-8 lg:mt-0"
          width="100%"
          height="4rem"></Skeleton>

        <div
          class="h-full border border-y-primary-border-color border-x-0 py-10 flex flex-col justify-between">
          <div>
            <h2
              v-if="
                (route.params.tourId !== 'preview' && tour) || route.query.name
              "
              class="text-primary-blue mb-10">
              ฿{{
                route.params.tourId !== "preview" && tour
                  ? parseFloat(tour.price).toLocaleString()
                  : parseFloat(route.query.price).toLocaleString()
              }}
            </h2>
            <Skeleton
              v-if="route.params.tourId !== 'preview' && !tour"
              class="!rounded-[20px] mb-10 !w-[85%] sm:!w-[80%] lg:!w-[75%] ]"
              height="2.75rem"></Skeleton>

            <div class="flex items-center mb-4">
              <div class="w-10">
                <div class="w-6 text-center">
                  <font-awesome-icon
                    :icon="['fas', 'location-dot']"
                    size="xl"
                    class="text-primary-icon-color" />
                </div>
              </div>
              <h5
                v-if="
                  (route.params.tourId !== 'preview' && tour) ||
                  route.query.name
                ">
                {{
                  route.params.tourId !== "preview" && tour
                    ? tour.countries.join(", ")
                    : route.query.countries
                }}
              </h5>
              <Skeleton
                v-if="route.params.tourId !== 'preview' && !tour"
                class="!rounded-[20px] !w-[60%] sm:!w-[45%] md:!w-[50%] lg:!w-[45%] xl:!w-[40%]"
                height="1.5rem"></Skeleton>
            </div>
            <div class="flex items-center mb-10">
              <div class="w-10">
                <div class="w-6 text-center">
                  <font-awesome-icon
                    :icon="['fas', 'clock']"
                    size="xl"
                    class="text-primary-icon-color" />
                </div>
              </div>
              <h5
                v-if="
                  (route.params.tourId !== 'preview' && tour) ||
                  route.query.name
                ">
                {{
                  route.params.tourId !== "preview" && tour
                    ? tour.days
                    : route.query.days
                }}
                วัน
                {{
                  route.params.tourId !== "preview" && tour
                    ? tour.nights
                    : route.query.nights
                }}
                คืน
              </h5>
              <Skeleton
                v-if="route.params.tourId !== 'preview' && !tour"
                class="!rounded-[20px] !w-[60%] sm:!w-[45%] md:!w-[50%] lg:!w-[45%] xl:!w-[40%]"
                height="1.5rem"></Skeleton>
            </div>
            <div class="flex items-center mb-8 sm:mb-10">
              <div class="w-10">
                <div class="w-6 text-center">
                  <font-awesome-icon
                    :icon="['fas', 'plane']"
                    size="xl"
                    class="text-primary-icon-color" />
                </div>
              </div>
              <h5
                v-if="
                  (route.params.tourId !== 'preview' && tour) ||
                  route.query.name
                ">
                {{
                  route.params.tourId !== "preview" && tour
                    ? tour.airline
                    : route.query.airline
                }}
              </h5>
              <Skeleton
                v-if="route.params.tourId !== 'preview' && !tour"
                class="!rounded-[20px] !w-[60%] sm:!w-[45%] md:!w-[50%] lg:!w-[45%] xl:!w-[40%]"
                height="1.5rem"></Skeleton>
            </div>
          </div>
          <di class="flex flex-col justify-between sm:flex-row xl:block">
            <Button
              class="w-40 sm:w-44 md:w-48 lg:w-[10.5rem] xl:w-48 !bg-[#1492DE] xl:!mr-8"
              rounded
              target="_blank"
              @click="handleMessenger">
              <font-awesome-icon
                :icon="['fab', 'facebook-messenger']"
                size="2xl" />
              <span class="mx-auto">ส่งข้อความ</span>
            </Button>
            <Button
              class="w-40 sm:w-44 md:w-48 lg:w-[10.5rem] xl:w-48 !bg-green-line-app xl:!mr-8 !my-4 sm:!my-0"
              rounded
              @click="handleLine">
              <font-awesome-icon
                :icon="['fab', 'line']"
                size="2xl" />
              <span class="mx-auto">แอดไลน์</span>
            </Button>
            <Button
              class="w-40 sm:w-44 md:w-48 lg:w-[10.5rem] xl:w-48 !bg-[#F77174]"
              rounded
              @click="handlePhone">
              <font-awesome-icon
                :icon="['fas', 'phone']"
                size="2xl" />
              <span class="mx-auto">โทรจอง</span>
            </Button>
          </di>
        </div>
      </div>
    </div>
    <div
      class="py-6 lg:py-14 border border-y-primary-border-color border-x-0 border-t-0 font-medium">
      <h1
        v-if="(route.params.tourId !== 'preview' && tour) || route.query.name"
        class="mb-8 text-[1.75rem] sm:text-[2.5rem]">
        รายละเอียดการเดินทาง
      </h1>
      <Skeleton
        v-if="route.params.tourId !== 'preview' && !tour"
        class="!rounded-[20px] mb-8 !w-[79%] sm:!w-[70%] md:!w-[60%] lg:!w-[45%] xl:!w-[35%] 2xl:!w-[30%]"
        height="2.75rem"></Skeleton>
      <div
        v-if="(route.params.tourId !== 'preview' && tour) || route.query.name"
        v-html="
          route.params.tourId !== 'preview' && tour
            ? tour.details
            : route.query.details
        " />
      <div v-if="route.params.tourId !== 'preview' && !tour">
        <Skeleton
          v-for="index in 5"
          :key="index"
          class="!rounded-[20px] mb-4"
          :class="index === 5 && '!w-1/2'"
          height="1.25rem"></Skeleton>
      </div>
    </div>
  </div>
  <ConfirmModal
    header="Delete"
    :visible="visibleDelete"
    @handleCancel="handleCancel"
    @confirmAction="confirmAction" />
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { doc, onSnapshot, deleteDoc } from "firebase/firestore";
import { pageview } from "vue-gtag";
import { useHead } from "@vueuse/head";

import { db } from "@/firebase";
import store from "@/store";
import {
  goToMessenger,
  addLineID,
  makePhoneCall,
} from "@/utils/GlobalFunction";
import { line, messenger, phone } from "@/utils/VueGtag";
import ConfirmModal from "@/components/ConfirmModal.vue";

const route = useRoute();
const router = useRouter();

const tour = ref();
const visibleDelete = ref(false);

const isLoggedIn = computed(() => store.state.isLoggedIn);

const handleLine = () => {
  line(`Tour Detail - ${tour.value.name}`);
  addLineID();
};

const handleMessenger = () => {
  messenger(`Tour Detail - ${tour.value.name}`);
  goToMessenger();
};

const handlePhone = () => {
  phone(`Tour Detail - ${tour.value.name}`);
  makePhoneCall();
};

const handleCancel = (value) => {
  visibleDelete.value = value;
};

const handleDelete = () => {
  visibleDelete.value = true;
};

const confirmAction = async () => {
  try {
    await deleteDoc(doc(db, "tours", route.params.tourId));
    visibleDelete.value = false;

    store.dispatch("showToast", {
      severity: "success",
      summary: "ลบข้อมูลเรียบร้อยแล้ว",
    });

    router.push({ path: "/tours", query: { page: 1 } });
  } catch (error) {
    if (error) {
      store.dispatch("showToast", {
        severity: "error",
        summary: "เกิดข้อผิดพลาดระหว่างการลบข้อมูล",
        detail: "กรุณาลองใหม่อีกครั้ง",
      });
    }
  }
};

const base64ToBlob = async (base64String) => {
  return await fetch(base64String).then((response) => response.blob());
};

onMounted(async () => {
  const docRef = doc(db, "tours", route.params.tourId);
  console.log(route);
  onSnapshot(docRef, async (docSnapshot) => {
    if (docSnapshot.exists()) {
      tour.value = docSnapshot.data();

      const image = await base64ToBlob(tour.value.image).then((blob) => {
        return URL.createObjectURL(blob);
      });

      pageview({
        page_title: `Tour Detail - ${tour.value.name}`,
      });

      useHead({
        title: `${tour.value.name} ${tour.value.days} วัน ${tour.value.nights} คืน - Wellness Life Travel`,
        meta: [
          // default
          {
            name: "description",
            content: `${tour.value.name} ${tour.value.countries.join(" ")} ${
              tour.value.days
            } วัน ${tour.value.nights} คืน ${tour.value.airline}`,
          },
          {
            name: "keywords",
            content: `${tour.value.name},${tour.value.countries.join(",")},${
              tour.value.days
            }วัน,${tour.value.nights}คืน,${tour.value.airline}`,
          },

          // facebook
          {
            property: "og:title",
            content: `${tour.value.name} ${tour.value.days} วัน ${tour.value.nights} คืน - Wellness Life Travel`,
          },
          {
            property: "og:image",
            content: image,
          },
          {
            property: "og:description",
            content: `${tour.value.name} ${tour.value.countries.join(" ")} ${
              tour.value.days
            } วัน ${tour.value.nights} คืน ${tour.value.airline}`,
          },
          {
            property: "og:url",
            content: `https://www.wellnesslifetravelth.com${route.path}`,
          },
          { property: "og:site_name", content: "wellnesslifetravelth.com" },
          { property: "og:type", content: "product" },

          // twitter
          {
            property: "twitter:title",
            content: `${tour.value.name} ${tour.value.days} วัน ${tour.value.nights} คืน - Wellness Life Travel`,
          },
          {
            property: "twitter:image",
            content: image,
          },
          {
            property: "twitter:description",
            content: `${tour.value.name} ${tour.value.countries.join(" ")} ${
              tour.value.days
            } วัน ${tour.value.nights} คืน ${tour.value.airline}`,
          },
          {
            property: "twitter:domain",
            content: `https://www.wellnesslifetravelth.com${route.path}`,
          },
          { property: "twitter:site", content: "wellnesslifetravelth.com" },
          { property: "twitter:card", content: "summary_large_image" },
        ],
      });
    } else {
      store.dispatch("showToast", {
        severity: "error",
        summary: "ไม่พบข้อมูล",
        detail: "กรุณาลองใหม่อีกครั้ง",
      });
    }
  });
});
</script>
