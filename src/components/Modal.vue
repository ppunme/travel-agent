<template>
  <Dialog
    v-model:visible="visibleValue"
    modal
    header="แก้ไขภาพหน้าโฮมเพจ"
    :style="{ width: '50vw' }"
    :breakpoints="{ '1200px': '75vw', '641px': '95vw' }"
  >
    <slot></slot>
    <template #footer>
      <Button
        @click="onCancel"
        label="ยกเลิก"
        severity="danger"
        rounded
        outlined
      />
      <Button
        @click="onSave"
        label="บันทึก"
        rounded
        class="!bg-primary-blue !border-primary-blue"
      />
    </template>
  </Dialog>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";

const props = defineProps(["visible"]);
const visibleValue = ref(props.visible);

const emit = defineEmits(["update:visible"]);

// const onUpload = () => {
//   console.log("upload!");
// };

const onSave = () => {
  emit("update:visible", false);
};

const onCancel = () => {
  emit("update:visible", false);
};

watch(
  () => props.visible,
  (newVisible) => {
    visibleValue.value = newVisible;
  }
);
</script>

<style lang="scss" scoped></style>
