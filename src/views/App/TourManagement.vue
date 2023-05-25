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
        <TourPackageCard
          :item="tour"
          :management="true"
          :nameValidate="nameValidate"
          :airlineValidate="airlineValidate"
          :daysValidate="daysValidate"
          :nightsValidate="nightsValidate"
          :priceValidate="priceValidate"
          :countriesValidate="countriesValidate"
          :detailsValidate="detailsValidate"
          :fileNameValidate="fileNameValidate"
        />
      </div>
      <div class="col-span-2">
        <form @submit="onSubmit">
          <div class="grid grid-cols-8 gap-8 mb-12 items-center">
            <div class="col-start-1">รูปภาพ</div>

            <div class="col-span-7">
              <div class="flex">
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
              <Input
                inputType="fileUpload"
                v-model:value="fileName"
                v-model:error="fileNameError"
              />
            </div>

            <div class="col-start-1">หัวข้อ</div>
            <div class="col-span-7">
              <Input
                inputType="inputText"
                v-model:value="name"
                placeholder="หัวข้อ"
                v-model:error="nameError"
              />
            </div>

            <div class="col-start-1">ประเทศ</div>
            <Input
              inputType="multiSelect"
              v-model:value="countries"
              placeholder="เลือกประเทศ"
              v-model:error="countriesError"
            />

            <div class="col-start-1">ระยะเวลา</div>
            <Input
              inputType="inputNumber"
              v-model:value="days"
              v-model:error="daysError"
              placeholder="วัน"
            />
            <div>วัน</div>
            <Input
              inputType="inputNumber"
              v-model:value="nights"
              v-model:error="nightsError"
              placeholder="คืน"
            />
            <div>คืน</div>

            <div class="col-start-1">ราคา</div>
            <Input
              inputType="inputNumber"
              :price="true"
              v-model:value="price"
              placeholder="ราคา"
              v-model:error="priceError"
            />

            <div>บาท</div>

            <div class="col-start-1">สายการบิน</div>
            <div class="col-span-7">
              <Input
                inputType="inputText"
                v-model:value="airline"
                placeholder="สายการบิน"
                v-model:error="airlineError"
              />
            </div>
          </div>

          <div class="mb-4">รายละเอียดการเดินทาง</div>
          <Input
            inputType="editor"
            v-model:value="details"
            v-model:error="detailsError"
          />

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
import Input from "@/components/Input.vue";

const route = useRoute();
const { handleSubmit } = useForm();

const fileUpload = ref(null);
const clearButton = ref(false);

const tour = ref({
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
  fileName.value = file.name;
};

const clearFile = async () => {
  fileUpload.value.clear();
  tour.value.image = null;
  tour.value.fileName = null;
  fileName.value = null;
  const aa = await fileNameValidate();
  console.log(aa);
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

const {
  value: name,
  errorMessage: nameError,
  validate: nameValidate,
} = useField("name", validateName);

watch(name, (newValue) => {
  tour.value.name = newValue;
});

const validateAirline = (value) => {
  if (!value) return "Airline is required.";
  return true;
};

const {
  value: airline,
  errorMessage: airlineError,
  validate: airlineValidate,
} = useField("airline", validateAirline);

watch(airline, (newValue) => {
  tour.value.airline = newValue;
});

const validateDays = (value) => {
  if (!value) return "Days is required.";
  return true;
};

const {
  value: days,
  errorMessage: daysError,
  validate: daysValidate,
} = useField("days", validateDays);

watch(days, (newValue) => {
  tour.value.days = newValue;
});

const validateNights = (value) => {
  if (!value) return "Nights is required.";
  return true;
};

const {
  value: nights,
  errorMessage: nightsError,
  validate: nightsValidate,
} = useField("nights", validateNights);

watch(nights, (newValue) => {
  tour.value.nights = newValue;
});

const validatePrice = (value) => {
  if (!value) return "Price is required.";
  return true;
};

const {
  value: price,
  errorMessage: priceError,
  validate: priceValidate,
} = useField("price", validatePrice);

watch(price, (newValue) => {
  tour.value.price = newValue;
});

const validateCountries = (value) => {
  if (!value || value.length < 1) return "Countries is required.";
  return true;
};

const {
  value: countries,
  errorMessage: countriesError,
  validate: countriesValidate,
} = useField("countries", validateCountries);

watch(countries, (newValue) => {
  tour.value.countries = newValue;
});

const validateDetails = (value) => {
  if (!value || value.length < 1) return "Details is required.";
  return true;
};

const {
  value: details,
  errorMessage: detailsError,
  validate: detailsValidate,
} = useField("details", validateDetails);

watch(details, (newValue) => {
  tour.value.details = newValue;
});

const validateFileName = (value) => {
  if (!value || value.length < 1) return "File is required.";
  return true;
};

const {
  value: fileName,
  errorMessage: fileNameError,
  validate: fileNameValidate,
} = useField("fileName", validateFileName);

watch(fileName, (newValue) => {
  tour.value.fileName = newValue;
});

const onSubmit = handleSubmit((values) => {
  console.log(values);
  console.log(tour.value);
});

onMounted(async () => {
  if (route.path.includes("edit")) {
    const mountedData = data.tours.find((item) => {
      return item.id === parseInt(route.params.tourId);
    });

    mountedData.countries = mountedData.countries.map((item) => {
      return { name: item };
    });

    const response = await fetch(mountedData.image);
    const fileBlob = await response.blob();
    const image = URL.createObjectURL(fileBlob);
    const imageName = new URL(response.url).pathname.split("/").pop();

    tour.value = mountedData;
    tour.value.image = image;
    tour.value.fileName = imageName;

    name.value = mountedData.name;
    countries.value = mountedData.countries;
    days.value = mountedData.days;
    nights.value = mountedData.nights;
    price.value = mountedData.price;
    airline.value = mountedData.airline;
    details.value = mountedData.details;
    fileName.value = mountedData.fileName;

    console.log(mountedData);
  }
});
</script>
