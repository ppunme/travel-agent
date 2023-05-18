<template>
  <input />
  <div>
    <h2>Title</h2>
    <input type="text" :value="title" @input="updateTitle" />
    <h2>Content</h2>
    <input type="text" :value="modelValue" @input="updateContent" />
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";

const props = defineProps({
  title: String,
  modelValue: String,
});

console.log("props", props);

const emit = defineEmits(["update:title", "update:modelValue"]);

const updateTitle = (event) => {
  emit("update:title", event.target.value);
};

const updateContent = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>
