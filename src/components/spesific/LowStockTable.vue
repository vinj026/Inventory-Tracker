<script setup>
const props = defineProps({
  data: Array
})
</script>

<template>
  <div class="flex w-full h-full justify-center items-center">
    <div v-if="data.length !== 0" class="w-full h-full overflow-x-auto border border-white-400 rounded-xl">
      <table class="min-w-full text-sm text-left">
        <thead class="bg-black-400 text-white-300 font-bold uppercase">
          <tr>
            <th class="p-3">Product</th>
            <th class="p-3">SKU</th>
            <th class="p-3">Category</th>
            <th class="p-3">Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in props.data" :key="index" class="border-t border-white-400 text-black-400">
            <td class="p-3">{{ item.productName }}</td>
            <td class="p-3">{{ item.SKU }}</td>
            <td class="p-3">{{ item.category }}</td>
            <td class="p-3 text-orange-900 font-bold">{{ item.quantity }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else class="text-black-50">No Transaction yet</p>
  </div>

</template>
