<script setup>
import Sidebar from "@/components/layout/Sidebar.vue";
</script>
<template>
  <div class="grid grid-cols-2 min-w-full min-h-screen bg-white-100">
    <Sidebar />
    <RouterView />
  </div>
</template>
