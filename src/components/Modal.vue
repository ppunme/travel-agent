<template>
  <Dialog
    v-model:visible="visibleValue"
    modal
    :style="{ width: width ? width : '50vw' }"
    :breakpoints="{ '1281px': '75vw', '641px': '95vw' }"
    :draggable="false"
    :pt="{
      closeButton: { class: '!hidden' },
    }"
    :class="[hideButton && 'reset-password']">
    <template #header>
      <h5 class="mx-auto">
        {{ header }}
      </h5>
      <Button
        text
        class="!p-0 !text-neutral-400 !absolute right-0 !mr-[1.5rem]"
        @click="onCancel">
        <font-awesome-icon
          :icon="['fas', 'times']"
          size="lg" />
      </Button>
    </template>
    <slot />
    <template
      v-if="!hideButton"
      #footer>
      <Button
        class="!w-28 cancel-button"
        label="ยกเลิก"
        severity="secondary"
        rounded
        outlined
        @click="onCancel" />
      <Button
        label="บันทึก"
        rounded
        class="!w-28 !bg-primary-blue !border-primary-blue"
        :loading="loading"
        @click="onSave" />
    </template>
  </Dialog>
</template>

<script setup>
import { ref, watch } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";

const props = defineProps([
  "visible",
  "header",
  "hideButton",
  "width",
  "tourGrid",
  "loading",
]);
const emit = defineEmits(["update:visible", "onSubmit"]);

const visibleValue = ref(props.visible);

const onSave = () => {
  emit("onSubmit");
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
.button-text {
  font-size: 14px;
}
</style>
