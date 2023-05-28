<template>
  <Dialog
    v-model:visible="visibleValue"
    modal
    :style="{ width: '20vw' }"
    :breakpoints="{ '1200px': '75vw', '641px': '95vw' }"
    :draggable="false"
    :pt="{
      closeButton: { class: '!hidden' },
    }"
    class="text-center"
  >
    <template #header>
      <h5 class="mr-auto text-red-500 font-bold">
        <font-awesome-icon :icon="['fas', 'exclamation-circle']" /> {{ header }}
      </h5>
      <Button @click="onCancel" text class="!p-0 !text-neutral-400"
        ><font-awesome-icon :icon="['fas', 'times']" size="lg"
      /></Button>
    </template>
    <p>ยืนยันการลบข้อมูล?</p>
    <template #footer>
      <div class="text-center">
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
          label="ยืนยัน"
          rounded
          class="!w-28 !bg-primary-blue !border-primary-blue"
          :loading="loading"
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";

const props = defineProps(["visible", "header"]);
const emit = defineEmits(["handleCancel", "confirmDelete"]);

const visibleValue = ref(props.visible);
const loading = ref(false);

const onSave = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    emit("confirmDelete");
  }, 1000);
};

const onCancel = () => {
  emit("handleCancel", false);
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
