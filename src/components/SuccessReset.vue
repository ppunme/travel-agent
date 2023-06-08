<template>
  <div class="flex flex-col items-center">
    <div
      class="bg-green-500 rounded-full w-20 h-20 flex items-center justify-center"
    >
      <font-awesome-icon :icon="['fas', 'check']" class="text-4xl text-white" />
    </div>
    <h5 class="pt-3">อีเมลได้ถูกส่งแล้ว</h5>
    <p class="font-light w-1/2 pt-3 text-center text-gray-500">
      ลิ้งค์สำหรับตั้งรหัสผ่านใหม่ได้ถูกส่งไปยังอีเมลของคุณแล้ว
      กรุณาตรวจสอบอีเมล
    </p>
  </div>
</template>
<script setup></script>
