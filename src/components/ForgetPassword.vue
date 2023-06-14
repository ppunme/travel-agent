<template>
  <div class="flex flex-col w-full md:w-3/4 mx-auto">
    <p class="font-light">
      กรุณากรอกอีเมลของคุณ
      เราจะทำการส่งลิ้งค์เพื่อตั้งรหัสผ่านใหม่ไปยังอีเมลของคุณ
    </p>
    <InputText
      v-model="email"
      placeholder="อีเมล"
      class="all-input !rounded-full w-full !mt-6" />
    <small class="p-error w-full flex justify-start">{{
      errorEmail || errorLogin || "&nbsp;"
    }}</small>
    <Button
      label="รีเซ็ตรหัสผ่าน"
      rounded
      class="!bg-primary-blue !border-none !text-[1.25rem] w-full !mt-6"
      :loading="loading"
      @click="resetPassword" />
  </div>
</template>
<script setup>
import { ref } from "vue";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useField, useForm } from "vee-validate";

const loading = ref(false);
const errorLogin = ref("");

const emit = defineEmits(["update:visible", "showSuccess"]);

const { handleSubmit } = useForm();

const { value: email, errorMessage: errorEmail } = useField(
  "email",
  validateEmail
);

function validateEmail(value) {
  if (!value) {
    return "กรุณากรอกอีเมล";
  }
  errorLogin.value = "";

  return true;
}

const resetPassword = handleSubmit(() => {
  loading.value = true;

  const auth = getAuth();
  sendPasswordResetEmail(auth, email.value)
    .then(() => {
      emit("update:visible", false);
      emit("showSuccess", true);
      loading.value = false;
    })
    .catch(() => {
      errorLogin.value = "ชื่อผู้ใช้ไม่ถูกต้อง";
      loading.value = false;
    });
});
</script>
