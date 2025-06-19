<script setup>
import { Plus } from "lucide-vue-next";
const props = defineProps({
  FieldName: String,
  Placeholder: String,
  Type: String,
  HasError: Boolean,
  modelValue: String,
  InputClass: {
    type: String,
    default:
      "outline-none hover:border hover:border-white-600 focus:ring-white-600 focus:ring border border-white-400 p-2 w-full rounded-lg",
  },
});

defineEmits(["update:modelValue", "focus", "blur"]);
</script>

<template>
  <div class="flex flex-col text-black-400 w-full gap-1">
    <h1 class="font-bold text-md">{{ FieldName }}</h1>
    <div class="relative">
      <input
        :type="Type"
        :placeholder="Placeholder"
        :value="modelValue"
        :class="[InputClass, HasError && '!border-orange-700']"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <slot name="append" />
    </div>
  </div>
</template>
