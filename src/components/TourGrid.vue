<template>
  <div class="xl:px-56 2xl:px-72">
    <div class="text-end pb-6">
      <Button
        @click="visible = true"
        rounded
        class="w-32 !bg-amber-500 !border-none"
      >
        <font-awesome-icon :icon="['fas', 'pen']" size="xl" />
        <span class="mx-auto">แก้ไข</span>
      </Button>
    </div>
    <Modal
      header="แก้ไขการแสดงผลแพ็คเกจทัวร์หน้าโฮมเพจ"
      :visible="visible"
      @update:visible="onDialogUpdate"
    >
      <EditTourGrid />
    </Modal>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-12">
      <div
        v-for="item in tours"
        :key="item.index"
        class="flex justify-center cursor-pointer hover:opacity-80"
        @click="viewPackage(item.id)"
      >
        <img
          :src="require(`@/assets/images/${item.image}`)"
          :alt="item.name"
          class="rounded-xl shadow-lg shadow-neutral-500"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import Modal from "@/components/Modal.vue";
import EditTourGrid from "@/components/EditTourGrid.vue";

defineProps(["tours"]);

const visible = ref(false);

const viewPackage = (id) => {
  console.log("view::", id);
};

const onDialogUpdate = (value) => {
  visible.value = value;
};
</script>
