<template>
  <div class="container mx-auto px-4 sm:px-8 md:px-10 py-12">
    <h2 class="text-center mb-8">แก้ไขแพ็คเกจ</h2>
    <div
      class="grid lg:grid-cols-5 xl:grid-cols-9 2xl:grid-cols-7 lg:gap-[3.5rem] xl:gap-16 2xl:gap-20"
    >
      <div
        class="lg:col-span-2 xl:col-span-3 2xl:col-span-2 px-0 sm:px-[7.5rem] md:px-44 lg:px-0"
      >
        <h5 class="font-medium mb-6">Preview</h5>
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
      <div class="lg:col-span-3 xl:col-span-6 2xl:col-span-5">
        <form @submit="onSubmit">
          <div
            class="grid grid-cols-12 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-3 sm:gap-6 2xl:gap-8 mb-6 xl:mb-8 2xl:mb-10 items-center mt-10 lg:mt-0"
          >
            <div class="col-start-1 col-span-3 sm:col-span-1">รูปภาพ</div>
            <div
              class="col-span-9 sm:col-span-5 md:col-span-6 lg:col-span-5 xl:col-span-7 2xl:col-span-9"
            >
              <div class="flex">
                <Chip v-if="clearButton" :label="fileName" class="mr-2" />
                <FileUpload
                  ref="fileUpload"
                  class="upload-package-image-button p-button-rounded !bg-primary-blue"
                  :class="fileName && '!hidden'"
                  mode="basic"
                  name="image[]"
                  accept="image/*"
                  :maxFileSize="10000000"
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
              <InputText v-model="fileName" class="hidden" />
              <small v-if="fileNameError" class="p-error">{{
                fileNameError
              }}</small>
            </div>

            <div class="col-start-1 col-span-3 sm:col-span-1">หัวข้อ</div>
            <div
              class="col-span-9 sm:col-span-5 md:col-span-6 lg:col-span-5 xl:col-span-7 2xl:col-span-9"
            >
              <InputText
                v-model="name"
                placeholder="หัวข้อ"
                class="all-input !rounded-full w-full"
                :class="nameError && 'p-invalid'"
              />
              <small v-if="nameError" class="p-error">{{ nameError }}</small>
            </div>

            <div class="col-start-1 col-span-3 sm:col-span-1">ประเทศ</div>
            <div
              class="col-span-9 sm:col-span-5 md:col-span-6 lg:col-span-5 xl:col-span-7 2xl:col-span-9"
            >
              <MultiSelect
                v-model="countries"
                :options="options"
                optionLabel="name"
                placeholder="เลือกประเทศ"
                display="chip"
                class="pl-2 w-full !rounded-full col-span-7"
                :class="countriesError && 'p-invalid'"
                filter
              >
                <template #option="slotProps">
                  <div class="flex align-items-center">
                    <div>{{ slotProps.option.name }}</div>
                  </div>
                </template>
                <template #footer>
                  <div class="py-2 px-3">
                    <b>{{ countries ? countries.length : 0 }}</b>
                    ประเทศ
                  </div>
                </template>
              </MultiSelect>
              <small v-if="countriesError" class="p-error">{{
                countriesError
              }}</small>
            </div>

            <div class="col-start-1 col-span-3 sm:col-span-1">ระยะเวลา</div>
            <div class="col-span-3 sm:col-span-1 xl:col-span-2">
              <InputNumber
                v-model="days"
                placeholder="วัน"
                :class="`input-number ${daysError && 'p-invalid'}`"
              />
              <small v-if="daysError" class="block w-28 p-error">{{
                daysError
              }}</small>
            </div>
            <div>วัน</div>
            <div class="col-span-3 sm:col-span-1 xl:col-span-2">
              <InputNumber
                v-model="nights"
                placeholder="คืน"
                :class="`input-number ${nightsError && 'p-invalid'}`"
              />
              <small v-if="nightsError" class="block w-28 p-error">{{
                nightsError
              }}</small>
            </div>
            <div>คืน</div>

            <div class="!col-start-1 col-span-3 sm:col-span-1">ราคา</div>
            <div class="col-span-7 sm:col-span-2 xl:col-span-3">
              <InputNumber
                v-model="price"
                placeholder="ราคา"
                :class="`input-price w-full ${priceError && 'p-invalid'}`"
              />
              <small v-if="priceError" class="block w-28 p-error">{{
                priceError
              }}</small>
            </div>

            <div>บาท</div>

            <div class="!col-start-1 col-span-3 sm:col-span-1">สายการบิน</div>
            <div
              class="col-span-9 sm:col-span-5 md:col-span-6 lg:col-span-5 xl:col-span-7 2xl:col-span-9"
            >
              <InputText
                v-model="airline"
                placeholder="สายการบิน"
                class="all-input !rounded-full w-full"
                :class="airlineError && 'p-invalid'"
              />
              <small v-if="airlineError" class="p-error">{{
                airlineError
              }}</small>
            </div>
          </div>

          <div class="mb-4">รายละเอียดการเดินทาง</div>
          <Editor
            v-model="details"
            editorStyle="height: 320px"
            :class="detailsError && 'p-invalid'"
          />
          <small v-if="detailsError" class="block w-28 p-error">{{
            detailsError
          }}</small>

          <div class="flex justify-end pt-12">
            <Button
              @click="onCancel"
              class="w-36 !bg-[#FFFFFF] !text-[#D42E35] !border-[#D42E35] !mr-6"
              rounded
            >
              <font-awesome-icon :icon="['fas', 'xmark']" size="xl" /><span
                class="mx-auto"
                >ยกเลิก</span
              >
            </Button>
            <Button
              @click="handleEdit"
              class="w-36 !bg-[#06C755] !border-[#06C755]"
              rounded
            >
              <font-awesome-icon :icon="['fas', 'check']" size="xl" /><span
                class="mx-auto"
                >บันทึก</span
              >
            </Button>
          </div>
          <ConfirmModal
            header="Edit"
            :visible="visibleEdit"
            @handleCancel="handleCancel"
            @confirmAction="onSubmit"
          />
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { watch, ref, watchEffect, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

import TourPackageCard from "@/components/TourPackageCard.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";

const route = useRoute();
const router = useRouter();
const { handleSubmit, resetForm } = useForm();

const fileUpload = ref(null);
const clearButton = ref(false);
const visibleEdit = ref(false);

const options = ref([
  { name: "ออสเตรเลีย" },
  { name: "บราซิล" },
  { name: "จีน" },
  { name: "เชค" },
  { name: "สโลวัก" },
  { name: "ฮังการี" },
]);

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

const handleCancel = (value) => {
  visibleEdit.value = value;
};

const handleEdit = () => {
  visibleEdit.value = true;
};

const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const onSelectedFiles = async (event) => {
  const file = event.files[0];

  const blobImage = new Blob([file]);
  const base64Image = await blobToBase64(blobImage);

  tour.value.image = base64Image;
  tour.value.fileName = file.name;
  fileName.value = file.name;
};

const clearFile = async () => {
  fileUpload.value.clear();
  tour.value.image = null;
  tour.value.fileName = null;
  fileName.value = null;
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
  if (!value) return "Details is required.";

  const htmlToString = (html) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || "";
  };

  const plainString = htmlToString(value);
  if (!plainString) return "Details is required.";

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
  if (!value) return "File is required.";
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

const onSubmit = handleSubmit(async (values) => {
  values.countries = values.countries.map((item) => item.name);
  values.image = tour.value.image;

  await updateDoc(doc(db, "tours", route.params.tourId), values);

  tour.value = {
    image: null,
    name: null,
    countries: null,
    days: null,
    nights: null,
    price: null,
    airline: null,
    details: null,
  };
  resetForm();

  router.push(`/tours/${route.params.tourId}`);
});

const onCancel = () => {
  router.push(`/tours/${route.params.tourId}`);
};

onMounted(async () => {
  const docRef = doc(db, "tours", route.params.tourId);

  onSnapshot(docRef, (docSnapshot) => {
    if (docSnapshot.exists()) {
      const tourData = docSnapshot.data();
      tourData.countries = tourData.countries.map((item) => {
        return { name: item };
      });

      tour.value = tourData;
      name.value = tourData.name;
      countries.value = tourData.countries;
      days.value = tourData.days;
      nights.value = tourData.nights;
      price.value = tourData.price;
      airline.value = tourData.airline;
      details.value = tourData.details;
      fileName.value = tourData.fileName;
    } else {
      console.log("Document does not exist");
    }
  });
});
</script>
