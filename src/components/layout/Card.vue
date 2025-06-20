<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  Title: String,
  Quantity: Number,
  Icon: String,
});

const iconComponent = ref(null);

onMounted(async () => {
  const module = await import("lucide-vue-next");
  iconComponent.value = module[props.Icon];
});
</script>
<template>
  <div
    class="flex flex-col gap-4 w-full text-black-400 border border-white-500 p-6 rounded-2xl"
  >
    <div class="flex flex-col gap-3">
      <div class="flex p-2 bg-white-400 w-fit rounded-lg">
        <component :is="iconComponent" class="text-black-200" />
      </div>
      <p class="font-bold text-black-200">{{ Title }}</p>
    </div>

    <h1 class="flex text-4xl font-bold">{{ Quantity }}</h1>
  </div>
</template>
