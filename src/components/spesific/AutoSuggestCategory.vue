<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useInventoryStore } from "../../stores/useInventoryStore";

const props = defineProps({
  modelValue: String,
  isInputFocus: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const inventoryStore = useInventoryStore();

const showSuggestions = ref(false);

const filtCategory = computed(() => {
  return props.modelValue
    ? inventoryStore.productInventory.savedCategory.filter((option) =>
        option.toLowerCase().includes(props.modelValue.toLowerCase()),
      )
    : inventoryStore.productInventory.category;
});

const selectCategory = (option) => {
  emit("update:modelValue", option);
  showSuggestions.value = false;
};

watch(
  () => props.modelValue,
  (val) => {
    showSuggestions.value = val && filtCategory.value.length > 0;
  },
);

watch(
  () => [props.modelValue, props.isInputFocus],
  ([val, isFocus]) => {
    showSuggestions.value = isFocus && val && filtCategory.value.length > 0;
  },
);
</script>

<template>
  <div class="relative z-2 w-full text-black-400 autocomplete-wrapper">
    <ul
      v-if="showSuggestions"
      class="absolute w-full p-2 shadow-[-6px_8px_36px_-25px_rgba(0,_0,_0,_0.1)] shadow-black-300 bg-white-300 rounded-lg border border-white-500"
    >
      <li
        v-for="(option, index) in filtCategory"
        :key="index"
        @click="selectCategory(option)"
        class="cursor-pointer hover:bg-white-400 p-2 rounded"
        v-if="inventoryStore.productInventory.savedCategory.length > 0"
      >
        {{ option }}
      </li>
      <li v-else class="text-black-100 w-full flex items-center justify-center">
        No Category Found
      </li>
    </ul>
  </div>
</template>
