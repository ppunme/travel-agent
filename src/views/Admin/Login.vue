<template>
  <div class="flex justify-center items-center h-screen">
    <div class="w-120 px-6">
      <div class="flex justify-center mb-6">
        <div
          class="bg-primary-blue rounded-full w-[100px] h-[100px] flex justify-center items-center">
          <font-awesome-icon
            :icon="['fas', 'lock']"
            style="color: #ffffff"
            class="text-[3rem]" />
        </div>
      </div>
      <h2 class="text-center mb-6">Admin Login</h2>
      <form @submit="onSubmit">
        <InputText
          v-model="email"
          placeholder="อีเมล"
          :class="{ 'p-invalid': errorEmail }"
          class="all-input !rounded-full w-full !mb-4" />
        <Password
          v-model="password"
          placeholder="รหัสผ่าน"
          :class="{ 'p-invalid': errorPassword }"
          class="all-input !rounded-full w-full"
          :feedback="false"
          toggleMask />
        <small class="p-error">{{
          errorEmail || errorPassword || errorLogin || "&nbsp;"
        }}</small>
        <Button
          label="เข้าสู่ระบบ"
          rounded
          class="!bg-primary-blue !border-none !text-[1.25rem] w-full !mt-3"
          type="submit"
          :loading="loading" />
      </form>
      <h5
        class="text-end font-light mt-4 text-primary-blue cursor-pointer hover:opacity-70"
        @click="visible = true">
        ลืมรหัสผ่าน?
      </h5>
    </div>
    <Modal
      header="ลืมรหัสผ่าน"
      :hideButton="true"
      width="30vw"
      :visible="visible"
      @update:visible="onDialogUpdate">
      <ForgetPassword
        @update:visible="onDialogUpdate"
        @showSuccess="showSuccess" />
    </Modal>
    <Modal
      header="ลืมรหัสผ่าน"
      :hideButton="true"
      width="30vw"
      :visible="visibleSuccess"
      @update:visible="visibleSuccess = false">
      <SuccessReset />
    </Modal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import store from "@/store";
import Modal from "@/components/Modal.vue";
import ForgetPassword from "@/components/ForgetPassword.vue";
import SuccessReset from "@/components/SuccessReset.vue";
import { useField, useForm } from "vee-validate";

const errorLogin = ref("");

const loading = ref(false);
const visible = ref(false);
const visibleSuccess = ref(false);
const router = useRouter();

const { handleSubmit, resetForm } = useForm();

const { value: email, errorMessage: errorEmail } = useField(
  "email",
  validateEmail
);

const { value: password, errorMessage: errorPassword } = useField(
  "name",
  validatePassword
);

function validateEmail(value) {
  if (!value) {
    return "กรุณากรอกอีเมล";
  }
  errorLogin.value = "";
  return true;
}

function validatePassword(value) {
  if (!value) {
    return "กรุณากรอกรหัสผ่าน";
  }
  errorLogin.value = "";
  return true;
}

const onSubmit = handleSubmit(() => {
  login();
});

const login = () => {
  loading.value = true;
  store.dispatch("login", { email: email.value });

  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      localStorage.setItem("token", auth.currentUser.accessToken);
      router.push("/travel-agent");
      resetForm();
      loading.value = false;
    })
    .catch(() => {
      errorLogin.value = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
      loading.value = false;
    });
};

const onDialogUpdate = (value) => {
  visible.value = value;
};

const showSuccess = (value) => {
  visibleSuccess.value = value;
};
</script>
