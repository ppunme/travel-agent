<template>
  <div class="flex justify-center items-center h-screen">
    <div class="w-120 px-6">
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
      <form @submit="onSubmit">
        <InputText
          id="value"
          v-model="value"
          type="text"
          :class="{ 'p-invalid': errorMessage }"
          aria-describedby="text-error"
        />
        <InputText
          v-model="email"
          placeholder="อีเมล"
          class="all-input !rounded-full w-full !mb-4"
        />
        <Password
          v-model="password"
          placeholder="รหัสผ่าน"
          class="all-input !rounded-full w-full"
          :feedback="false"
          toggleMask
        />
        <p v-if="errMessage">{{ errMessage }}</p>
        <small class="p-error" id="text-error">{{
          errorMessage || "&nbsp;"
        }}</small>
        <Button
          label="เข้าสู่ระบบ"
          rounded
          class="!bg-primary-blue !border-none !text-[1.25rem] w-full !mt-4"
          type="submit"
          :loading="loading"
          @click="login"
        />
      </form>
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
      <ForgetPassword
        @update:visible="onDialogUpdate"
        @showSuccess="showSuccess"
      />
    </Modal>
    <Modal
      header="ลืมรหัสผ่าน"
      :hideButton="true"
      width="30vw"
      :visible="visibleSuccess"
      @update:visible="visibleSuccess = false"
    >
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

const email = ref();
const password = ref();
const errMessage = ref("");

const loading = ref(false);
const visible = ref(false);
const visibleSuccess = ref(false);
const router = useRouter();

const { handleSubmit, resetForm } = useForm();
const { value, errorMessage } = useField("value", validateField);

function validateField(value) {
  if (!value) {
    return "Name - Surname is required.";
  }

  return true;
}

const onSubmit = handleSubmit((values) => {
  if (values.value && values.value.length > 0) {
    resetForm();
  }
});

const login = () => {
  loading.value = true;
  store.dispatch("login", { email: email.value });

  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      localStorage.setItem("token", auth.currentUser.accessToken);
      router.push("/");
      loading.value = false;
    })
    .catch((error) => {
      console.log(error.code);
      errMessage.value = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
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
