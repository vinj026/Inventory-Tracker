<script setup>
const props = defineProps({
  data: Array
})
</script>

<template>
  <div class="overflow-x-auto  border border-white-400 rounded-xl">
    <table class="min-w-full text-sm text-left">
      <thead class="bg-white-400 text-black-300 font-bold uppercase">
        <tr>
          <th class="p-3">Date</th>
          <th class="p-3">SKU</th>
          <th class="p-3">Type</th>
          <th class="p-3">Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in props.data" :key="index" class="border-t border-white-400 text-black-400">
          <td class="p-3">{{ new Date(item.date).toLocaleDateString() }}</td>
          <td class="p-3">{{ item.SKU }}</td>
          <td class="p-3 capitalize">{{ item.type }}</td>
          <td class="p-3">{{ item.quantity }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
