<template>
  <div class="container mx-auto px-4 sm:px-8 md:px-10 py-12">
    <h2 class="text-center mb-8">เพิ่มแพ็คเกจใหม่</h2>
    <div
      class="grid lg:grid-cols-5 xl:grid-cols-9 2xl:grid-cols-7 lg:gap-[3.5rem] xl:gap-16 2xl:gap-20">
      <div
        class="lg:col-span-2 xl:col-span-3 2xl:col-span-2 px-0 sm:px-[7.5rem] md:px-44 lg:px-0">
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
          :image="uploadedFile?.objectURL" />
      </div>
      <div class="lg:col-span-3 xl:col-span-6 2xl:col-span-5">
        <form @submit="onSubmit">
          <div
            class="grid grid-cols-12 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-3 sm:gap-6 2xl:gap-8 mb-6 xl:mb-8 2xl:mb-10 items-center mt-10 lg:mt-0">
            <div class="col-start-1 col-span-3 sm:col-span-1">รูปภาพ</div>
            <div
              class="col-span-9 sm:col-span-5 md:col-span-6 lg:col-span-5 xl:col-span-7 2xl:col-span-9">
              <div class="flex">
                <Chip
                  v-if="clearButton"
                  :label="fileName"
                  class="mr-2" />
                <FileUpload
                  ref="fileUpload"
                  class="upload-package-image-button p-button-rounded !bg-primary-blue"
                  :class="fileName && '!hidden'"
                  mode="basic"
                  name="image[]"
                  accept="image/*"
                  @select="onSelectedFiles" />

                <button
                  v-if="clearButton"
                  @click="clearFile">
                  <font-awesome-icon
                    :icon="['far', 'circle-xmark']"
                    size="xl"
                    style="color: #d42e35" />
                </button>
              </div>
              <InputText
                v-model="fileName"
                class="hidden" />
              <small
                v-if="fileNameError"
                class="block p-error">
                {{ fileNameError }}
              </small>
            </div>

            <div class="col-start-1 col-span-3 sm:col-span-1">หัวข้อ</div>
            <div
              class="col-span-9 sm:col-span-5 md:col-span-6 lg:col-span-5 xl:col-span-7 2xl:col-span-9">
              <InputText
                v-model="name"
                placeholder="หัวข้อ"
                class="all-input !rounded-full w-full"
                :class="nameError && 'p-invalid'" />
              <small
                v-if="nameError"
                class="block p-error">
                {{ nameError }}
              </small>
            </div>

            <div class="col-start-1 col-span-3 sm:col-span-1">ประเทศ</div>
            <div
              class="col-span-9 sm:col-span-5 md:col-span-6 lg:col-span-5 xl:col-span-7 2xl:col-span-9">
              <MultiSelect
                v-model="countries"
                :options="data.countriesForm"
                optionLabel="name"
                placeholder="เลือกประเทศ"
                display="chip"
                class="pl-2 w-full !rounded-full col-span-7"
                :class="countriesError && 'p-invalid'"
                filter>
                <template #option="slotProps">
                  <div class="flex align-items-center">
                    <div>
                      {{ slotProps.option.name }}
                    </div>
                  </div>
                </template>
                <template #footer>
                  <div class="py-2 px-3">
                    <b> {{ countries ? countries.length : 0 }} </b>
                    ประเทศ
                  </div>
                </template>
              </MultiSelect>
              <small
                v-if="countriesError"
                class="block p-error">
                {{ countriesError }}
              </small>
            </div>

            <div class="col-start-1 col-span-3 sm:col-span-1">ระยะเวลา</div>
            <div class="col-span-3 sm:col-span-1 xl:col-span-2">
              <InputNumber
                v-model="days"
                placeholder="วัน"
                :class="`input-number ${daysError && 'p-invalid'}`" />
              <small
                v-if="daysError"
                class="block p-error">
                {{ daysError }}
              </small>
            </div>
            <div>วัน</div>
            <div class="col-span-3 sm:col-span-1 xl:col-span-2">
              <InputNumber
                v-model="nights"
                placeholder="คืน"
                :class="`input-number ${nightsError && 'p-invalid'}`" />
              <small
                v-if="nightsError"
                class="block p-error">
                {{ nightsError }}
              </small>
            </div>
            <div>คืน</div>

            <div class="!col-start-1 col-span-3 sm:col-span-1">ราคา</div>
            <div class="col-span-7 sm:col-span-2 xl:col-span-3">
              <InputNumber
                v-model="price"
                placeholder="ราคา"
                :class="`input-price ${priceError && 'p-invalid'}`" />
              <small
                v-if="priceError"
                class="block p-error">
                {{ priceError }}
              </small>
            </div>

            <div>บาท</div>

            <div class="!col-start-1 col-span-3 sm:col-span-1">สายการบิน</div>
            <div
              class="col-span-9 sm:col-span-5 md:col-span-6 lg:col-span-5 xl:col-span-7 2xl:col-span-9">
              <InputText
                v-model="airline"
                placeholder="สายการบิน"
                class="all-input !rounded-full w-full"
                :class="airlineError && 'p-invalid'" />
              <small
                v-if="airlineError"
                class="ิblock p-error">
                {{ airlineError }}
              </small>
            </div>
          </div>

          <div class="mb-4">รายละเอียดการเดินทาง</div>
          <Editor
            v-model="details"
            editorStyle="height: 320px"
            :class="detailsError && 'p-invalid'" />
          <small
            v-if="detailsError"
            class="block p-error">
            {{ detailsError }}
          </small>

          <div class="flex justify-end pt-12">
            <Button
              class="w-36 !text-[#9d9d9d] !mr-6 cancel-button"
              text
              rounded
              @click="onCancel">
              <font-awesome-icon
                :icon="['fas', 'xmark']"
                size="xl" /><span class="mx-auto">ยกเลิก</span>
            </Button>
            <Button
              type="submit"
              class="w-36 !bg-green-add !border-green-add"
              :loading="loading"
              rounded>
              <font-awesome-icon
                v-if="!loading"
                :icon="['fas', 'check']"
                size="xl" />
              <span class="mx-auto">บันทึก</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { watch, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref as storageRef, uploadBytes } from "firebase/storage";
import { db, storage } from "@/firebase";
import store from "@/store";

import { data } from "@/services/CountryList";
import {
  isValidImageFileType,
  isValidImageFileSize,
} from "@/utils/GlobalFunction";
import TourPackageCard from "@/components/TourPackageCard.vue";
import Button from "primevue/button";
import Chip from "primevue/chip";
import Editor from "primevue/editor";
import FileUpload from "primevue/fileupload";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import MultiSelect from "primevue/multiselect";

const router = useRouter();
const { handleSubmit, resetForm } = useForm();

const fileUpload = ref(null);
const clearButton = ref(false);
const uploadedFile = ref(null);
const loading = ref(false);

const tour = ref({
  name: null,
  countries: null,
  days: null,
  nights: null,
  price: null,
  airline: null,
  details: null,
});

const onSelectedFiles = async (event) => {
  const file = event.files[0];

  if (!isValidImageFileType(file)) {
    store.dispatch("showToast", {
      severity: "error",
      summary: "ไม่สามารถอัพโหลดได้เนื่องจาก",
      detail: "ประเภทของไฟล์ไม่ถูกต้อง ไฟล์ต้องเป็น png, jpg, jpeg เท่านั้น",
    });

    fileUpload.value.clear();

    return;
  }

  if (!isValidImageFileSize(file)) {
    store.dispatch("showToast", {
      severity: "error",
      summary: "ไม่สามารถอัพโหลดได้เนื่องจาก",
      detail: "ขนาดของไฟล์ไม่ถูกต้อง ไฟล์ต้องมีขนาดไม่เกิน 2 MB",
    });

    fileUpload.value.clear();

    return;
  }

  const reader = new FileReader();
  let blob = await fetch(file.objectURL).then((r) => r.blob());

  reader.readAsDataURL(blob);

  reader.onloadend = function () {
    uploadedFile.value = file;
    tour.value.fileName = file.name;
    fileName.value = file.name;
  };
};

const clearFile = async () => {
  fileUpload.value.clear();
  uploadedFile.value = null;
  tour.value.fileName = null;
  fileName.value = null;
};

watchEffect(() => {
  if (uploadedFile.value) {
    clearButton.value = true;
  } else {
    clearButton.value = false;
  }
});

const validateName = (value) => {
  if (!value) return "กรุณากรอกหัวข้อ";
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
  if (!value) return "กรุณากรอกสายการบิน";
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
  if (!value) return "กรุณากรอกจำนวนวัน";
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
  if (!value) return "กรุณากรอกจำนวนคืน";
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
  if (!value) return "กรุณากรอกราคา";
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
  if (!value || value.length < 1) return "กรุณาเลือกประเทศ";
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
  if (!value) return "กรุณากรอกรายละเอียดการเดินทาง";

  const htmlToString = (html) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || "";
  };

  const plainString = htmlToString(value);
  if (!plainString) return "กรุณากรอกรายละเอียดการเดินทาง";

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
  if (!value) return "กรุณาอัพโหลดรูปภาพ";
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
  loading.value = true;

  try {
    values.countries = values.countries.map((item) => item.name);
    values.createdAt = serverTimestamp();

    const docRef = await addDoc(collection(db, "tours"), values);

    await uploadBytes(
      storageRef(
        storage,
        `images/tours/${docRef.id}/${fileUpload.value.files[0].name}`
      ),
      fileUpload.value.files[0]
    );

    tour.value = {
      name: null,
      countries: null,
      days: null,
      nights: null,
      price: null,
      airline: null,
      details: null,
    };

    fileUpload.value.clear();
    uploadedFile.value = null;
    tour.value.fileName = null;

    resetForm();

    store.dispatch("showToast", {
      severity: "success",
      summary: "บันทึกข้อมูลเรียบร้อยแล้ว",
    });

    loading.value = false;

    router.push("/tours");
  } catch (error) {
    store.dispatch("showToast", {
      severity: "error",
      summary: "เกิดข้อผิดพลาดระหว่างการบันทึกข้อมูล",
      detail: "กรุณาลองใหม่อีกครั้ง",
    });

    loading.value = false;
  }
});

const onCancel = () => {
  tour.value = {
    name: null,
    countries: null,
    days: null,
    nights: null,
    price: null,
    airline: null,
    details: null,
  };
  clearFile();
  resetForm();
  router.push("/tours");
};
</script>
