<template>
  <div class="container mx-auto px-4 sm:px-8 md:px-10 py-12">
    <div class="flex justify-end">
      <Button
        v-if="route.params.tourId !== 'preview' && tour"
        class="w-18 md:w-32 !bg-[#F5A327] !mb-12"
        rounded
        @click="$router.push(`/tours/edit/${$route.params.tourId}`)">
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
        v-if="route.params.tourId === 'preview'"
        :src="route.query.image"
        alt=""
        class="lg:col-span-2 w-full rounded-[20px]" />
      <img
        v-if="route.params.tourId !== 'preview' && tour"
        :src="tour.image"
        alt=""
        class="lg:col-span-2 w-full rounded-[20px]" />
      <div class="col-span-3 flex flex-col font-medium">
        <h1 class="pb-8 mt-8 lg:mt-0">
          {{
            route.params.tourId !== "preview" && tour
              ? tour.name
              : route.query.name
          }}
        </h1>
        <div
          class="h-full border border-y-primary-border-color border-x-0 py-10 flex flex-col justify-between">
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
                    class="text-primary-icon-color" />
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
                    class="text-primary-icon-color" />
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
            <div class="mb-8 sm:mb-10">
              <div class="inline-block w-10">
                <div class="w-6 text-center">
                  <font-awesome-icon
                    :icon="['fas', 'plane']"
                    size="xl"
                    class="text-primary-icon-color" />
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
          <di class="flex flex-col justify-between sm:flex-row xl:block">
            <Button
              class="w-40 sm:w-44 md:w-48 lg:w-[10.5rem] xl:w-48 !bg-[#1492DE] xl:!mr-8"
              rounded
              target="_blank">
              <font-awesome-icon
                :icon="['fab', 'facebook-messenger']"
                size="2xl" />
              <span class="mx-auto">ส่งข้อความ</span>
            </Button>
            <Button
              class="w-40 sm:w-44 md:w-48 lg:w-[10.5rem] xl:w-48 !bg-green-line-app xl:!mr-8 !my-4 sm:!my-0"
              rounded>
              <font-awesome-icon
                :icon="['fab', 'line']"
                size="2xl" />
              <span class="mx-auto">แอดไลน์</span>
            </Button>
            <Button
              class="w-40 sm:w-44 md:w-48 lg:w-[10.5rem] xl:w-48 !bg-[#F77174]"
              rounded
              target="_blank">
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
      class="py-14 border border-y-primary-border-color border-x-0 border-t-0 font-medium">
      <h1 class="mb-8 text-[1.75rem] sm:text-[2.5rem]">รายละเอียดการเดินทาง</h1>
      <div
        v-html="
          route.params.tourId !== 'preview' && tour
            ? tour.details
            : route.query.details
        " />
    </div>
  </div>
  <ConfirmModal
    header="Delete"
    :visible="visibleDelete"
    @handleCancel="handleCancel"
    @confirmAction="confirmAction" />
</template>
<script setup>
  import { ref, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { doc, onSnapshot, deleteDoc } from "firebase/firestore";
  import { db } from "@/firebase";
  import ConfirmModal from "@/components/ConfirmModal.vue";

  const route = useRoute();
  const router = useRouter();

  const tour = ref();
  const visibleDelete = ref(false);

  const handleCancel = (value) => {
    visibleDelete.value = value;
  };

  const handleDelete = () => {
    visibleDelete.value = true;
  };

  const confirmAction = async () => {
    await deleteDoc(doc(db, "tours", route.params.tourId));
    visibleDelete.value = false;
    router.push("/tours");
  };

  onMounted(async () => {
    const docRef = doc(db, "tours", route.params.tourId);

    onSnapshot(docRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        tour.value = docSnapshot.data();
      } else {
        console.log("Document does not exist");
      }
    });
  });
</script>
