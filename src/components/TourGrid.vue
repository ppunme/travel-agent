<template>
  <div class="grid grid-cols-4">
    <div>1</div>
    <div>2</div>
    <div>3</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ProductService } from "@/service/ProductService";

onMounted(() => {
  ProductService.getProducts().then(
    (data) => (products.value = data.slice(0, 12))
  );
});

const products = ref();
</script>
