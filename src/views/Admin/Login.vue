<template>
  <div class="flex justify-center items-center h-screen">
    <div class="w-120">
      <div class="flex justify-center mb-6">
        <div
          class="bg-primary-blue rounded-full w-[100px] h-[100px] flex justify-center items-center"
        >
          <font-awesome-icon
            :icon="['fas', 'lock']"
            style="color: #ffffff"
            class="text-[3rem]"
          />
        </div>
      </div>
      <h2 class="text-center mb-6">Admin Login</h2>
      <InputText
        v-model="email"
        placeholder="อีเมล"
        class="all-input !rounded-full w-full !mb-4"
      />
      <InputText
        v-model="password"
        placeholder="รหัสผ่าน"
        class="all-input !rounded-full w-full"
      />
      <Button
        label="เข้าสู่ระบบ"
        rounded
        class="!bg-primary-blue !border-none !text-[1.25rem] w-full !mt-4"
      />
      <h5
        class="text-end font-light mt-4 text-primary-blue cursor-pointer hover:opacity-70"
        @click="visible = true"
      >
        ลืมรหัสผ่าน?
      </h5>
    </div>
    <Modal
      header="ลืมรหัสผ่าน"
      :hideButton="true"
      width="30vw"
      :visible="visible"
      @update:visible="onDialogUpdate"
    >
      <ForgetPassword />
    </Modal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Modal from "@/components/Modal.vue";
import ForgetPassword from "@/components/ForgetPassword.vue";

const email = ref();
const password = ref();

const visible = ref(false);

const onDialogUpdate = (value) => {
  visible.value = value;
};
</script>
