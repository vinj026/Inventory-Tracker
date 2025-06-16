<script setup>
import Sidebar from "@/components/layout/Sidebar.vue";
</script>
<template>
  <div class="grid grid-cols-[auto_1fr] w-full min-h-screen bg-white-100">
    <Sidebar />

    <RouterView />
  </div>
</template>
