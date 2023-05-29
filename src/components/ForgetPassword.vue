<template>
  <div class="flex flex-col items-center">
    <p>กรุณากรอกอีเมล</p>
    <InputText
      v-model="email"
      placeholder="อีเมล"
      class="all-input !rounded-full w-3/4 !mt-4"
    />
    <Button
      label="รีเซ็ตรหัสผ่าน"
      rounded
      class="!bg-primary-blue !border-none !text-[1.25rem] w-3/4 !mt-4"
    />
  </div>
</template>
<script setup></script>
