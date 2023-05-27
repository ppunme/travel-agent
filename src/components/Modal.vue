<template>
  <Dialog
    v-model:visible="visibleValue"
    modal
    :style="{ width: '50vw' }"
    :breakpoints="{ '1200px': '75vw', '641px': '95vw' }"
    :draggable="false"
  >
    <template #header>
      <h5 class="mx-auto">{{ header }}</h5>
    </template>
    <template #closeicon>
      <Button @click="onCancel" text class="!p-0 !text-neutral-400"
        ><font-awesome-icon :icon="['fas', 'times']" size="lg"
      /></Button>
    </template>
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
        :loading="loading"
      />
    </template>
  </Dialog>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";

const props = defineProps(["visible", "header"]);
const emit = defineEmits(["update:visible"]);

const visibleValue = ref(props.visible);
const loading = ref(false);

const onSave = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    emit("update:visible", false);
  }, 1000);
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
