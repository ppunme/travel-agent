<template>
  <div class="container mx-auto py-12">
    <div class="grid grid-cols-5 gap-16">
      <img
        v-if="route.params.tourId === 'preview'"
        :src="route.query.image"
        alt=""
        class="col-span-2 w-full rounded-[20px]"
      />
      <img
        v-else
        src="@/assets/img/image_11.png"
        alt=""
        class="col-span-2 w-full rounded-[20px]"
      />
      <div class="col-span-3 flex flex-col font-medium">
        <h1 class="pb-8">
          {{
            route.params.tourId === "preview"
              ? route.query.name
              : "ทัวร์ยุโรป ตะวันออก 8 วัน 5 คืน บิน EVA Air สุวรรณภูมิ - เวียนนา"
          }}
        </h1>
        <div
          class="h-full border border-y-primary-border-color border-x-0 py-10 flex flex-col justify-between"
        >
          <div>
            <h2 class="text-primary-blue mb-10">
              ฿{{
                route.params.tourId === "preview"
                  ? parseFloat(route.query.price).toLocaleString()
                  : parseFloat("49888").toLocaleString()
              }}
            </h2>
            <div class="mb-4">
              <div class="inline-block w-10">
                <div class="w-6 text-center">
                  <font-awesome-icon
                    :icon="['fas', 'location-dot']"
                    size="xl"
                    class="text-primary-icon-color"
                  />
                </div>
              </div>
              <h5 class="inline">
                {{
                  route.params.tourId === "preview"
                    ? route.query.countries
                    : "ออสเตรีย, เชค, สโลวัก, ฮังการี"
                }}
              </h5>
            </div>
            <div class="mb-10">
              <div class="inline-block w-10">
                <div class="w-6 text-center">
                  <font-awesome-icon
                    :icon="['fas', 'clock']"
                    size="xl"
                    class="text-primary-icon-color"
                  />
                </div>
              </div>
              <h5 class="inline">
                {{ route.params.tourId === "preview" ? route.query.days : 5 }}
                วัน
                {{ route.params.tourId === "preview" ? route.query.nights : 5 }}
                คืน
              </h5>
            </div>
            <div class="mb-10">
              <div class="inline-block w-10">
                <div class="w-6 text-center">
                  <font-awesome-icon
                    :icon="['fas', 'plane']"
                    size="xl"
                    class="text-primary-icon-color"
                  />
                </div>
              </div>
              <h5 class="inline">
                {{
                  route.params.tourId === "preview"
                    ? route.query.airline
                    : "EVA Air"
                }}
              </h5>
            </div>
          </div>
          <div>
            <Button class="w-48 !bg-[#1492DE] !mr-8" rounded target="_blank">
              <font-awesome-icon
                :icon="['fab', 'facebook-messenger']"
                size="2xl"
              />
              <span class="mx-auto">ส่งข้อความ</span>
            </Button>
            <Button class="w-48 !bg-[#06C755] !mr-8" rounded>
              <font-awesome-icon :icon="['fab', 'line']" size="2xl" />
              <span class="mx-auto">แอดไลน์</span>
            </Button>
            <Button class="w-48 !bg-[#F77174] !mr-8" rounded target="_blank">
              <font-awesome-icon :icon="['fas', 'phone']" size="2xl" />
              <span class="mx-auto">โทรจอง</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="py-14 border border-y-primary-border-color border-x-0 border-t-0 font-medium"
    >
      <h2 class="mb-8">รายละเอียดการเดินทาง</h2>
      <h4>ไฮไลท์สถานที่ท่องเที่ยว</h4>
      <div
        v-if="route.params.tourId === 'preview'"
        v-html="route.query.details"
      ></div>
      <div v-else>Test</div>
    </div>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
console.log(route.params.tourId);
console.log(route.query);
</script>
