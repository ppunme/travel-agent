<template>
  <Dialog
    v-model:visible="visibleValue"
    modal
    :style="{ width: '22.5vw' }"
    :breakpoints="{
      '1280px': '32.5vw',
      '1024px': '42.5vw',
      '768px': '52.5vw',
      '640px': '90vw',
    }"
    :draggable="false"
    :pt="{
      closeButton: { class: '!hidden' },
    }"
    class="text-center"
  >
    <template #header>
      <h5
        class="mr-auto font-bold"
        :class="header === 'Delete' ? 'text-[#D42E35]' : 'text-[#F5A327]'"
      >
        <font-awesome-icon :icon="['fas', 'exclamation-circle']" /> {{ header }}
      </h5>
      <Button
        text
        class="!p-0 !text-neutral-400"
        @click="onCancel"
      >
        <font-awesome-icon
          :icon="['fas', 'times']"
          size="lg"
        />
      </Button>
    </template>
    <p>{{ `ยืนยันการ${header === "Delete" ? "ลบ" : "แก้ไข"}ข้อมูล?` }}</p>
    <template #footer>
      <div class="text-center">
        <Button
          class="!w-28 cancel-button"
          label="ยกเลิก"
          severity="secondary"
          rounded
          outlined
          @click="onCancel"
        />
        <Button
          :type="header === 'Delete' ? 'button' : 'submit'"
          label="ยืนยัน"
          rounded
          class="!w-28 !bg-primary-blue !border-primary-blue"
          :loading="loading"
          @click="onSave"
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup>
  import { ref, watch } from "vue";

  const props = defineProps(["visible", "header"]);
  const emit = defineEmits(["handleCancel", "confirmAction"]);

  const visibleValue = ref(props.visible);
  const loading = ref(false);

  const onSave = () => {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      emit("confirmAction");
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
.button-text {
  font-size: 14px;
}
</style>
