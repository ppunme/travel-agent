<template>
  <Dialog
    v-model:visible="visibleValue"
    modal
    :header="header"
    :style="{ width: '50vw' }"
    :breakpoints="{ '1200px': '75vw', '641px': '95vw' }"
  >
    <slot></slot>
    <template #footer>
      <Button
        @click="onCancel"
        class="!w-28 custom-button"
        label="ยกเลิก"
        severity="secondary"
        rounded
        outlined
      />
      <Button
        @click="onSave"
        label="บันทึก"
        rounded
        class="!w-28 !bg-primary-blue !border-primary-blue"
      />
    </template>
  </Dialog>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";

const props = defineProps(["visible", "header"]);
const visibleValue = ref(props.visible);

const emit = defineEmits(["update:visible"]);

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

<style lang="scss" scoped>
.custom-button {
  box-shadow: inset 0px 0px 0px 1px #64748b;
}

.button-text {
  font-size: 14px;
}
</style>
