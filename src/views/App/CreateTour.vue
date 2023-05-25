<template>
  <div class="container mx-auto py-12">
    <h2 class="text-center mb-8">เพิ่มแพ็คเกจใหม่</h2>
    <h5 class="font-medium mb-6">Preview</h5>
    <div class="grid grid-cols-3 gap-40">
      <div>
        <TourPackageCard :item="data" />
      </div>
      <div class="col-span-2">
        <div class="grid grid-cols-8 gap-8 mb-12 items-center">
          <div class="col-start-1">รูปภาพ</div>

          <div class="col-span-7 flex">
            <FileUpload
              ref="fileUpload"
              class="upload-package-image-button p-button-rounded !bg-primary-blue !mr-6"
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
          <InputText
            v-model="data.name"
            placeholder="หัวข้อ"
            class="all-input col-span-7 !rounded-full"
          />

          <div class="col-start-1">ประเทศ</div>
          <!-- <Dropdown
            v-model="data.countries"
            :options="countries"
            optionLabel="name"
            placeholder="เลือกประเทศ"
            class="col-span-3 text-start pl-2 !rounded-full"
          >
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex align-items-center">
                <div>{{ slotProps.value.name }}</div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="flex align-items-center">
                <div>{{ slotProps.option.name }}</div>
              </div>
            </template>
          </Dropdown> -->
          <MultiSelect
            v-model="data.countries"
            :options="countries"
            optionLabel="name"
            placeholder="เลือกประเทศ"
            display="chip"
            class="col-start-2 col-span-7 pl-2 !rounded-full"
            filter
          >
            <template #option="slotProps">
              <div class="flex align-items-center">
                <img
                  :alt="slotProps.option.name"
                  src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                  :class="`flag flag-${slotProps.option.code.toLowerCase()} mr-2`"
                  style="width: 18px"
                />
                <div>{{ slotProps.option.name }}</div>
              </div>
            </template>
            <template #footer>
              <div class="py-2 px-3">
                <b>{{ data.countries ? data.countries.length : 0 }}</b>
                ประเทศ
              </div>
            </template>
          </MultiSelect>

          <div class="col-start-1">ระยะเวลา</div>
          <InputText
            v-model="data.days"
            placeholder="5"
            class="all-input text-center !rounded-full"
          />
          <div>วัน</div>
          <InputText
            v-model="data.nights"
            placeholder="5"
            class="all-input text-center !rounded-full"
          />
          <div>คืน</div>

          <div class="col-start-1">ราคา</div>
          <InputText
            v-model="data.price"
            placeholder="10000"
            class="all-input col-span-2 !rounded-full"
          />
          <div>บาท</div>

          <div class="col-start-1">สายการบิน</div>
          <InputText
            v-model="data.airline"
            placeholder="สายการบิน"
            class="all-input col-span-7 !rounded-full"
          />
        </div>
        <div class="mb-4">รายละเอียดการเดินทาง</div>
        <Editor v-model="data.details" editorStyle="height: 320px" />
        <div class="flex justify-end">
          <Button class="w-48 !bg-[#06C755] !mt-12" rounded>
            <font-awesome-icon :icon="['fas', 'plus']" size="2xl" /><span
              class="mx-auto"
              >เพิ่มแพ็คเกจใหม่</span
            >
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watchEffect, watch } from "vue";

import TourPackageCard from "@/components/TourPackageCard.vue";

const fileUpload = ref(null);
const clearButton = ref(false);

const countries = ref([
  { name: "ออสเตรเลีย", code: "AU" },
  { name: "บราซิล", code: "BR" },
  { name: "จีน", code: "CN" },
]);

const data = ref({
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
  data.value.image = file;
};

const clearFile = () => {
  fileUpload.value.clear();
  data.value.image = null;
};

watchEffect(() => {
  if (data.value.image) {
    clearButton.value = true;
  } else {
    clearButton.value = false;
  }
});

watch(data.value, (newValue) => {
  console.log(newValue);
});
</script>
