<template>
  <ChildComponent v-model="content" v-model:title="postTitle" />
  <p>content:: {{ content }}</p>
  <p>post title::{{ postTitle }}</p>
</template>

<script setup>
import { ref } from "vue";
import ChildComponent from "./ChildComponent.vue";

const content = ref("");
const postTitle = ref("test");
</script>
