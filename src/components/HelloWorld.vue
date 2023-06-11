<template>
  <h1 className="text-3xl font-bold underline text-red-500">{{ msg }}</h1>
  <h2>props 2 ::{{ msg2 }}</h2>
</template>

<script setup>
defineProps(["msg", "msg2"]);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
