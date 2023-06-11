<template>
  <Dialog
    v-model:visible="visibleValue"
    modal
    :style="{ width: width ? width : '50vw' }"
    :breakpoints="{ '1200px': '75vw', '641px': '95vw' }"
    :draggable="false"
    :pt="{
      closeButton: { class: '!hidden' },
    }"
    :class="[hideButton && 'reset-password', tourGrid && 'tour-grid']"
  >
    <template #header>
      <h5 class="mx-auto">
        {{ header }}
      </h5>
      <Button
        text
        class="!p-0 !text-neutral-400 !absolute right-0 !mr-[1.5rem]"
        @click="onCancel"
      >
        <font-awesome-icon
          :icon="['fas', 'times']"
          size="lg"
        />
      </Button>
    </template>
    <slot />
    <template
      v-if="!hideButton"
      #footer
    >
      <Button
        class="!w-28 custom-button"
        label="ยกเลิก"
        severity="secondary"
        rounded
        outlined
        @click="onCancel"
      />
      <Button
        label="บันทึก"
        rounded
        class="!w-28 !bg-primary-blue !border-primary-blue"
        :loading="loading"
        @click="onSave"
      />
    </template>
  </Dialog>
</template>

<script setup>
  import { ref, watch } from "vue";

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
  .custom-button {
    box-shadow: inset 0px 0px 0px 1px #64748b;
  }

  .button-text {
    font-size: 14px;
  }
</style>
