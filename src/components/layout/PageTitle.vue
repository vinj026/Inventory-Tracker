<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
const currentPage =
  route.path.replace(/^\//, "").charAt(0).toUpperCase() +
  route.path.replace(/^\//, "").slice(1);
</script>
<template>
  <div class="w-full text-black-400">
    <h1 class="font-black text-3xl">{{ currentPage }}</h1>
  </div>
</template>
