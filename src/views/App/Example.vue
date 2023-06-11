<template>
  <div>Home 3</div>
  <HelloWorld msg="hello test props" msg2="test 2" />
  <Button label="Submit" />

  <div>
    <button @click="increment1">click1</button>
    {{ count }}
  </div>
  <div>
    <button @click="increment2">click2</button>
    {{ state2.count }}
  </div>
  <div>computed double::{{ double }}</div>
</template>

<script setup>
  import { ref, reactive, watch, onMounted, computed } from "vue";
  import HelloWorld from "@/components/HelloWorld.vue";
  import Button from "primevue/button";

  const count = ref(0);
  const state2 = reactive({ count: 0 });

  const increment1 = () => {
    count.value++;
  };

  const increment2 = () => {
    state2.count++;
  };

  const double = computed(() => {
    return count.value * 2;
  });

  onMounted(async () => {
    console.log("on mounted!");
  });

  watch(count, (newValue, oldValue) => {
    console.log(`Count changed from ${oldValue} to ${newValue}`);
  });
</script>
