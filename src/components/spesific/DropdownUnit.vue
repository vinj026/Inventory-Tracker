<script setup>
import { useUnitOptStore } from "../../stores/useUnitOptions";
const props = defineProps({
  FieldName: String,
  modelValue: String,
  HasError: Boolean,
  ErrorMessage: String,
});
defineEmits(["update:modelValue"]);
const _unitOptions = useUnitOptStore();
</script>
<template>
  <div>
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      class="outline-none"
    >
      <optgroup v-for="group in _unitOptions.unitOptions" :key="group.category">
        <option v-for="unit in group.units" :key="unit.value">
          {{ unit.label }}
        </option>
      </optgroup>
    </select>
  </div>
</template>

<style lang="scss" scoped></style>
