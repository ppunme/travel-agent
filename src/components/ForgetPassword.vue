<template>
  <div class="flex flex-col items-center">
    <p class="font-light w-3/4">
      กรุณากรอกอีเมลของคุณ
      เราจะทำการส่งลิ้งค์เพื่อตั้งรหัสผ่านใหม่ไปยังอีเมลของคุณ
    </p>
    <InputText
      v-model="email"
      placeholder="อีเมล"
      class="all-input !rounded-full w-3/4 !mt-6"
    />
    <Button
      @click="resetPassword"
      label="รีเซ็ตรหัสผ่าน"
      rounded
      class="!bg-primary-blue !border-none !text-[1.25rem] w-3/4 !mt-6"
      :loading="loading"
    />
  </div>
</template>
<script setup>
import { ref, defineEmits } from "vue";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const email = ref("");
const loading = ref(false);

const emit = defineEmits(["update:visible", "showSuccess"]);

const resetPassword = () => {
  loading.value = true;

  const auth = getAuth();
  sendPasswordResetEmail(auth, email.value)
    .then(() => {
      console.log("password reset email sent!");
      emit("update:visible", false);
      emit("showConfirm", true);
      loading.value = false;
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
      loading.value = false;
    });
};
</script>
