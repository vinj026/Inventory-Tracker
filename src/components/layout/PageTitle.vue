<script setup>
import { useRoute } from "vue-router";
import Button from "@/components/common/Button.vue";
import { useUIStore } from "@/stores/useUiStore.js";

const ui = useUIStore();
const route = useRoute();
const currentPage =
  route.path.replace(/^\//, "").charAt(0).toUpperCase() +
  route.path.replace(/^\//, "").slice(1);
</script>
<template>
  <div class="flex justify-between items-center w-full text-black-400">
    <h1 class="font-black text-3xl">{{ currentPage }}</h1>
    <Button Name="Add Item" Icon="Plus" @click="ui.formToggle = !ui.formToggle" class="hover:cursor-pointer" />
  </div>
</template>
