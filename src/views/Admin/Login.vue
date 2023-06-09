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
      <InputText
        v-model="email"
        placeholder="อีเมล"
        class="all-input !rounded-full w-full !mb-4"
      />
      <Password
        v-model="password"
        placeholder="รหัสผ่าน"
        class="all-input !rounded-full w-full"
        toggleMask
      />
      <Button
        label="เข้าสู่ระบบ"
        rounded
        class="!bg-primary-blue !border-none !text-[1.25rem] w-full !mt-4"
        @click="login"
        :loading="loading"
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
import store from "@/store";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import Modal from "@/components/Modal.vue";
import ForgetPassword from "@/components/ForgetPassword.vue";
import SuccessReset from "@/components/SuccessReset.vue";

const email = ref();
const password = ref();

const loading = ref(false);
const visible = ref(false);
const visibleSuccess = ref(false);
const router = useRouter();

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
      alert(error.message);
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
