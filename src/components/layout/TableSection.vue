<script setup>
const props = defineProps(
  {
    title: String,
    data: Array,
  }
)
</script>

<template>
  <div class="flex flex-col gap-2 w-full border border-white-500 p-4 rounded-3xl ">
    <h1 class=" text-black-400 font-bold text-lg">{{ title }}</h1>
    <slot />
  </div>
</template>
