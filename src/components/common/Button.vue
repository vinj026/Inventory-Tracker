<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  Name: String,
  Icon: String,
});

const iconComponent = ref(null);

onMounted(async () => {
  const module = await import("lucide-vue-next");
  iconComponent.value = module[props.Icon];
  console.log(iconComponent);
});
</script>
<template>
  <div
    class="flex items-center justify-center gap-4 bg-white-400 py-2 px-3 rounded-xl"
  >
    <component :is="iconComponent" />
    <h1 class="font-bold text-lg text-black-400">
      {{ Name }}
    </h1>
  </div>
</template>
