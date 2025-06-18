<script setup>
import { useUnitOptStore } from "../../stores/useUnitOptions";
import { ref } from "vue";
const props = defineProps({
  FieldName: String,
});
const _unitOptions = useUnitOptStore();

console.log(_unitOptions.unitOptions);

const selectedUnit = ref();
</script>
<template>
  <div class="">
    <select v-model="selectedUnit" class="outline-none">
      <optgroup v-for="group in _unitOptions.unitOptions" :key="group.category">
        <option v-for="unit in group.units" :key="unit.value">
          {{ unit.label }}
        </option>
      </optgroup>
    </select>
  </div>
</template>

<style lang="scss" scoped></style>
