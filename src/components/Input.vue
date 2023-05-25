<template>
  <div v-if="inputType === 'fileUpload'">
    <InputText
      v-model="nameValue"
      :placeholder="placeholder"
      class="all-input !rounded-full w-full"
      :class="[error && 'p-invalid', inputType === 'fileUpload' && 'hidden']"
    />
    <small v-if="error" class="p-error">{{ error }}</small>
  </div>

  <div v-if="inputType === 'inputText'">
    <InputText
      v-model="nameValue"
      :placeholder="placeholder"
      class="all-input !rounded-full w-full"
      :class="error && 'p-invalid'"
    />
    <small v-if="error" class="p-error">{{ error }}</small>
  </div>

  <div v-if="inputType === 'inputNumber'" :class="price && 'col-span-2'">
    <InputNumber
      v-model="nameValue"
      :placeholder="placeholder"
      :useGrouping="price ? true : false"
      :class="[error && 'p-invalid', price ? 'input-price' : 'input-number']"
    />
    <small v-if="error" class="block w-28 p-error">{{ error }}</small>
  </div>

  <div v-if="inputType === 'multiSelect'" class="col-span-7">
    <MultiSelect
      v-model="nameValue"
      :options="options"
      optionLabel="name"
      :placeholder="placeholder"
      display="chip"
      class="pl-2 w-full !rounded-full"
      :class="error && 'p-invalid'"
      filter
    >
      <template #option="slotProps">
        <div class="flex align-items-center">
          <div>{{ slotProps.option.name }}</div>
        </div>
      </template>
      <template #footer>
        <div class="py-2 px-3">
          <b>{{ nameValue ? nameValue.length : 0 }}</b>
          ประเทศ
        </div>
      </template>
    </MultiSelect>
    <small v-if="error" class="p-error">{{ error }}</small>
  </div>

  <div v-if="inputType === 'editor'">
    <Editor
      v-model="nameValue"
      editorStyle="height: 320px"
      :class="error && 'p-invalid'"
    />
    <small v-if="error" class="block w-28 p-error">{{ error }}</small>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch, onMounted } from "vue";
// import { useRoute } from "vue-router";

// const route = useRoute();

const props = defineProps([
  "inputType",
  "value",
  "placeholder",
  "error",
  "price",
]);

const options = ref([
  { name: "ออสเตรเลีย" },
  { name: "บราซิล" },
  { name: "จีน" },
  { name: "เชค" },
  { name: "สโลวัก" },
  { name: "ฮังการี" },
]);

const nameValue = ref(props.value);
const errorValue = ref(props.error);

onMounted(async () => {
  console.log(props.value);
});

const emit = defineEmits(["update:name", "update:error"]);

watch(nameValue, (newValue) => {
  emit("update:value", newValue);
});

watch(errorValue, (newValue) => {
  emit("update:error", newValue);
});
</script>

<style lang="scss" scoped></style>

v-if=" (route.path.includes('edit') && nameValue) ||
route.path.includes('create') "
