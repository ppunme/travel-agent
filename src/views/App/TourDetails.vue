<template>
  <div class="container mx-auto py-12">
    <div class="flex justify-end">
      <Button
        v-if="route.params.tourId !== 'preview' && tour"
        class="w-32 !bg-[#F5A327] !mb-12"
        rounded
        @click="$router.push(`/tours/edit/${tour.id}`)"
      >
        <font-awesome-icon :icon="['fas', 'pen']" size="lg" /><span
          class="mx-auto"
          >แก้ไข</span
        >
      </Button>
    </div>
    <div class="grid grid-cols-5 gap-16">
      <img
        v-if="route.params.tourId === 'preview'"
        :src="route.query.image"
        alt=""
        class="col-span-2 w-full rounded-[20px]"
      />
      <img
        v-if="route.params.tourId !== 'preview' && tour"
        :src="tour.image"
        alt=""
        class="col-span-2 w-full rounded-[20px]"
      />
      <div class="col-span-3 flex flex-col font-medium">
        <h1 class="pb-8">
          {{
            route.params.tourId !== "preview" && tour
              ? tour.name
              : route.query.name
          }}
        </h1>
        <div
          class="h-full border border-y-primary-border-color border-x-0 py-10 flex flex-col justify-between"
        >
          <div>
            <h2 class="text-primary-blue mb-10">
              ฿{{
                route.params.tourId !== "preview" && tour
                  ? parseFloat(tour.price).toLocaleString()
                  : parseFloat(route.query.price).toLocaleString()
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
                  route.params.tourId !== "preview" && tour
                    ? tour.countries.join(", ")
                    : route.query.countries
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
                  route.params.tourId !== "preview" && tour
                    ? tour.airline
                    : route.query.airline
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
      <h1 class="mb-8">รายละเอียดการเดินทาง</h1>
      <div
        v-html="
          route.params.tourId !== 'preview' && tour
            ? tour.details
            : route.query.details
        "
      ></div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { data } from "@/services/TourPackageService";

const tour = ref();
const route = useRoute();

onMounted(() => {
  tour.value = data.tours.find((item) => {
    return item.id === parseInt(route.params.tourId);
  });
});
</script>
