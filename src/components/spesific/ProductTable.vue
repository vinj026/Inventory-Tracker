<script setup>
import { computed } from 'vue'
import { Trash2 } from 'lucide-vue-next';
import { useInventoryStore } from '@/stores/useInventoryStore'
const inventoryStore = useInventoryStore()
//
// onMounted(() => {
//   inventoryStore.fetchProducts()
// })
//
const products = computed(() => inventoryStore.productInventory.productList)

defineEmits(['delete'])
</script>

<template>
  <div v-if="products.length > 0" class="h-full flex flex-col w-full ">
    <div class="flex-1 border border-white-400 rounded-xl h-full overflow-hidden">
      <div class="overflow-y-auto h-full">
        <table class=" min-w-full text-sm text-left">
          <thead class="bg-black-400 text-white-400 font-bold uppercase sticky top-0 z-10">
            <tr>
              <th class="p-3">Product</th>
              <th class="p-3">SKU</th>
              <th class="p-3">Category</th>
              <th class="p-3">Quantity</th>
              <th class="p-3">Cost Price</th>
              <th class="p-3">Selling Price</th>
              <th class="p-3"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in products" :key="index"
              class="border-t border-white-400 text-black-400 hover:bg-white-400">
              <td class="p-3">{{ item.productName }}</td>
              <td class="p-3">{{ item.SKU }}</td>
              <td class="p-3">{{ item.category }}</td>
              <td class="p-3 font-bold" :class="item.quantity < 50 ? 'text-orange-900' : 'text-black-400'">
                {{ item.quantity }}
              </td>
              <td class="p-3">{{ item.costPrice }}</td>
              <td class="p-3">{{ item.sellingPrice }}</td>
              <td class="p-3">
                <button @click="$emit('delete', item.SKU)"
                  class="flex justify-center items-center gap-2 text-red-700/60 font-bold hover:underline">
                  <Trash2 class="w-5" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>


    </div>

  </div>
  <div v-else class="flex items-center justify-center h-full text-black-50 ">
    No products have been added yet.
  </div>
</template>
