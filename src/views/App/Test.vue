<template>
  <div>Home 3</div>
  <HelloWorld msg="hello" />
  <!-- <Button label="Submit" /> -->
  <p>Test::{{ test }}</p>

  <button @click="increment">
    {{ state.count }}
  </button>
</template>

<script setup>
import { ref, reactive, watch, onMounted, computed } from "vue";
import HelloWorld from "@/components/HelloWorld.vue";
// import Button from "primevue/button";
import { useRoute } from "vue-router";

const state1 = ref("");
const state2 = reactive({ count: 0 });

const route = useRoute();

const test = computed(() => {
  return "hello";
});

const increment = () => {
  state2.count++;
};

onMounted(async () => {
  console.log("on mounted!");
  state1.value = "pun test data";
});

watch(route, () => {
  console.log("route::", route.name);
});
</script>
