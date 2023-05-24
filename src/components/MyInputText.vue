<template>
  <InputText
    v-model="nameValue"
    :placeholder="placeholder"
    class="all-input !rounded-full w-full"
    :class="error && 'p-invalid'"
  />
  <small v-if="error" class="p-error">{{ error }}</small>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";

const props = defineProps(["name", "placeholder", "error"]);

const nameValue = ref(props.name);
const errorValue = ref(props.error);

const emit = defineEmits(["update:name", "update:error"]);

watch(nameValue, (newValue) => {
  emit("update:name", newValue);
});

watch(errorValue, (newValue) => {
  emit("update:error", newValue);
});
</script>
