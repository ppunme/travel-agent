<template>
  <div class="container mx-auto py-12">
    <h2 class="text-center mb-8">
      {{
        route.path.includes("create")
          ? "เพิ่มแพ็คเกจใหม่"
          : route.path.includes("edit") && "แก้ไขแพ็คเกจ"
      }}
    </h2>
    <h5 class="font-medium mb-6">Preview</h5>
    <div class="grid grid-cols-3 gap-40">
      <div>
        <TourPackageCard :item="tour" :management="true" />
      </div>
      <div class="col-span-2">
        <form @submit="onSubmit">
          <div class="grid grid-cols-8 gap-8 mb-12 items-center">
            <div class="col-start-1">รูปภาพ</div>

            <div class="col-span-7 flex">
              <Chip v-if="clearButton" :label="tour.fileName" class="mr-2" />

              <FileUpload
                ref="fileUpload"
                class="upload-package-image-button p-button-rounded !bg-primary-blue"
                :class="tour.fileName && '!hidden'"
                mode="basic"
                name="image[]"
                accept="image/*"
                :maxFileSize="1000000"
                @select="onSelectedFiles"
              />

              <button v-if="clearButton" @click="clearFile">
                <font-awesome-icon
                  :icon="['far', 'circle-xmark']"
                  size="xl"
                  style="color: #d42e35"
                />
              </button>
            </div>

            <div class="col-start-1">หัวข้อ</div>
            <div class="col-span-7">
              <MyInputText
                v-model:name="name"
                placeholder="หัวข้อ"
                v-model:error="nameError"
              />
            </div>

            <div class="col-start-1">ประเทศ</div>
            <MultiSelect
              v-model="tour.countries"
              :options="countries"
              optionLabel="name"
              placeholder="เลือกประเทศ"
              display="chip"
              class="col-start-2 col-span-7 pl-2 !rounded-full"
              filter
            >
              <template #option="slotProps">
                <div class="flex align-items-center">
                  <div>{{ slotProps.option.name }}</div>
                </div>
              </template>
              <template #footer>
                <div class="py-2 px-3">
                  <b>{{ tour.countries ? tour.countries.length : 0 }}</b>
                  ประเทศ
                </div>
              </template>
            </MultiSelect>

            <div class="col-start-1">ระยะเวลา</div>
            <InputText
              v-model="tour.days"
              placeholder="5"
              class="all-input text-center !rounded-full"
            />
            <div>วัน</div>
            <InputText
              v-model="tour.nights"
              placeholder="5"
              class="all-input text-center !rounded-full"
            />
            <div>คืน</div>

            <div class="col-start-1">ราคา</div>
            <InputText
              v-model="tour.price"
              placeholder="10000"
              class="all-input col-span-2 !rounded-full"
            />
            <div>บาท</div>

            <div class="col-start-1">สายการบิน</div>
            <div class="col-span-7">
              <MyInputText
                v-model:name="airline"
                placeholder="สายการบิน"
                v-model:error="airlineError"
              />
            </div>
          </div>

          <div class="mb-4">รายละเอียดการเดินทาง</div>
          <Editor v-model="tour.details" editorStyle="height: 320px" />
          <div class="flex justify-end pt-12">
            <Button
              class="w-36 !bg-[#FFFFFF] !text-[#D42E35] !border-[#D42E35] !mr-6"
              rounded
            >
              <font-awesome-icon :icon="['fas', 'xmark']" size="xl" /><span
                class="mx-auto"
                >ยกเลิก</span
              >
            </Button>
            <Button
              type="submit"
              class="w-36 !bg-[#06C755] !border-[#06C755]"
              rounded
            >
              <font-awesome-icon :icon="['fas', 'check']" size="xl" /><span
                class="mx-auto"
                >บันทึก</span
              >
            </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { watch, ref, watchEffect, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useField, useForm } from "vee-validate";

import TourPackageCard from "@/components/TourPackageCard.vue";
import { data } from "@/services/TourPackageService";
import MyInputText from "@/components/MyInputText.vue";

const route = useRoute();
const { handleSubmit } = useForm();

const fileUpload = ref(null);
const clearButton = ref(false);

const countries = ref([
  { name: "ออสเตรเลีย" },
  { name: "บราซิล" },
  { name: "จีน" },
  { name: "เชค" },
  { name: "สโลวัก" },
  { name: "ฮังการี" },
]);

const tour = ref({
  id: null,
  image: null,
  name: null,
  countries: null,
  days: null,
  nights: null,
  price: null,
  airline: null,
  details: null,
});

const onSelectedFiles = (event) => {
  const file = event.files[0];
  tour.value.image = file.objectURL;
  tour.value.fileName = file.name;
};

const clearFile = () => {
  fileUpload.value.clear();
  tour.value.image = null;
  tour.value.fileName = null;
};

watchEffect(() => {
  if (tour.value.image) {
    clearButton.value = true;
  } else {
    clearButton.value = false;
  }
});

const validateName = (value) => {
  if (!value) return "Name is required.";
  return true;
};

const { value: name, errorMessage: nameError } = useField("name", validateName);

watch(name, (newValue) => {
  tour.value.name = newValue;
});

const validateAirline = (value) => {
  if (!value) return "Airline is required.";
  return true;
};

const { value: airline, errorMessage: airlineError } = useField(
  "airline",
  validateAirline
);

watch(airline, (newValue) => {
  tour.value.airline = newValue;
});

const onSubmit = handleSubmit(() => {
  console.log(tour.value);
});

onMounted(async () => {
  if (route.params.tourId) {
    const mountedData = data.tours.find((item) => {
      return item.id === parseInt(route.params.tourId);
    });

    mountedData.countries = mountedData.countries.map((item) => {
      return { name: item };
    });

    const response = await fetch(mountedData.image);
    const fileBlob = await response.blob();
    const fileName = new URL(response.url).pathname.split("/").pop();

    tour.value = mountedData;
    tour.value.image = URL.createObjectURL(fileBlob);
    tour.value.fileName = fileName;

    name.value = mountedData.name;
    airline.value = mountedData.airline;
  }
});
</script>
