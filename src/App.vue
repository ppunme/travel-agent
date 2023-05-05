<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <header>
    <!-- Navigation links -->
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/contact">Contact</router-link>
    </nav>
  </header>
  <!-- Router view for each route -->
  <router-view />
</template>

<script setup></script>

<style></style>
