<template>
  <div class="container mx-auto py-12">
    <h2 class="text-center mb-8">เพิ่มแพ็คเกจใหม่</h2>
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
                <Chip v-if="clearButton" :label="fileName" class="mr-2" />
                <FileUpload
                  ref="fileUpload"
                  class="upload-package-image-button p-button-rounded !bg-primary-blue"
                  :class="fileName && '!hidden'"
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
              <InputText v-model="fileName" class="hidden" />
              <small v-if="fileNameError" class="p-error">{{
                fileNameError
              }}</small>
            </div>

            <div class="col-start-1">หัวข้อ</div>
            <div class="col-span-7">
              <InputText
                v-model="name"
                placeholder="หัวข้อ"
                class="all-input !rounded-full w-full"
                :class="nameError && 'p-invalid'"
              />
              <small v-if="nameError" class="p-error">{{ nameError }}</small>
            </div>

            <div class="col-start-1">ประเทศ</div>
            <div class="col-span-7">
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

            <div class="col-start-1">ระยะเวลา</div>
            <div>
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
            <div>
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

            <div class="col-start-1">ราคา</div>
            <div class="col-span-2">
              <InputNumber
                v-model="price"
                placeholder="ราคา"
                :class="`input-price ${priceError && 'p-invalid'}`"
              />
              <small v-if="priceError" class="block w-28 p-error">{{
                priceError
              }}</small>
            </div>

            <div>บาท</div>

            <div class="col-start-1">สายการบิน</div>
            <div class="col-span-7">
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
import { watch, ref, watchEffect } from "vue";
import { useField, useForm } from "vee-validate";

import TourPackageCard from "@/components/TourPackageCard.vue";

const { handleSubmit } = useForm();

const fileUpload = ref(null);
const clearButton = ref(false);

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

const onSubmit = handleSubmit((values) => {
  console.log(values);
  console.log(tour.value);
});
</script>
