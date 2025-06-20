<script setup>
const props = defineProps({
  FieldName: String,
  Placeholder: String,
  Type: String,
  HasError: Boolean,
  ErrorMessage: String,
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
        :class="[InputClass, HasError && '!border-orange-900']"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <slot name="append" />
    </div>

    <p class="text-xs font-medium text-orange-900" v-show="ErrorMessage">
      {{ ErrorMessage }}
    </p>
  </div>
</template>
