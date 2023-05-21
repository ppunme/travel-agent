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
          <FileUpload
            class="upload-package-image-button p-button-rounded !bg-primary-blue"
            mode="basic"
            name="image[]"
            accept="image/*"
            :maxFileSize="1000000"
            @select="onSelectedFiles"
          />

          <div class="col-start-1">หัวข้อ</div>
          <InputText
            v-model="data.name"
            placeholder="หัวข้อ"
            class="all-input col-span-7 !rounded-full"
          />

          <div class="col-start-1">ประเทศ</div>
          <Dropdown
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
          </Dropdown>
          <div class="col-start-2 col-span-7 bg-red-500">
            <div class="inline mr-4">ออสเตรเลีย</div>
            <div class="inline mr-4">เชค</div>
          </div>

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
import { ref, watch } from "vue";

import TourPackageCard from "@/components/TourPackageCard.vue";

const countries = ref([
  { name: "ออสเตรเลีย", code: "AU" },
  { name: "บราซิล", code: "BR" },
  { name: "จีน", code: "CN" },
]);

const data = ref({
  image: "",
  name: "",
  countries: null,
  days: null,
  nights: null,
  price: null,
  airline: "",
  details: "",
});

const onSelectedFiles = (event) => {
  const file = event.files[0];
  data.value.image = file;
};

watch(data.value, (newValue, oldValue) => {
  console.log(oldValue);
  console.log(newValue);
});
</script>
