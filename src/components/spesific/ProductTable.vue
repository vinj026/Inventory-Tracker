<script setup>
import { computed, ref, watch } from 'vue'
import { Trash2 } from 'lucide-vue-next';
import { useInventoryStore } from '@/stores/useInventoryStore'
const inventoryStore = useInventoryStore()

const products = computed(() => inventoryStore.productInventory.productList)

function formatCurrency(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value)
}


const selectedSkus = ref([])

function isChecked(sku) {
  return selectedSkus.value.includes(sku)
}

function toggleItem(sku, event) {
  const checked = event.target.checked
  if (checked) {
    selectedSkus.value = [...selectedSkus.value, sku]
  } else {
    selectedSkus.value = selectedSkus.value.filter(id => id !== sku)
  }

}

function toggleSelectAll(e) {
  if (e.target.checked) {
    selectedSkus.value = products.value.map(p => p.SKU)
  } else {
    selectedSkus.value = []
  }
}

function deleteAllSelected() {
  selectedSkus.value.forEach(sku => {
    inventoryStore.productInventory.deleteProductBySKU(sku)
  })
  selectedSkus.value = []
}

watch(selectedSkus, (newVal) => {
  console.log('Selected SKUs:', newVal)
})
</script>

<template>

  <div v-if="products.length > 0" class="h-full flex gap-2 flex-col w-full ">
    <div class="self-end">

      <button :disabled="selectedSkus.length === 0" @click="deleteAllSelected"
        class=" bg-error-container text-onerror-container px-3 py-1 rounded text-sm font-semibold hover:bg-error-container/90 hover:text-onerror-container/70 hover:cursor-pointer disabled:opacity-50">
        Delete Selected
      </button>
    </div>
    <div class="flex-1 border border-white-400 rounded-xl h-full overflow-hidden">
      <div class="overflow-y-auto h-full">
        <table class=" min-w-full text-sm text-left">
          <thead class="bg-black-400 text-white-400 font-bold uppercase sticky top-0 z-10">
            <tr>
              <th class="p-3">
                <div class="flex justify-center">
                  <label class="flex items-center cursor-pointer relative">
                    <input type="checkbox" :checked="selectedSkus.length === products.length" @change="toggleSelectAll"
                      class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-white-800 checked:border-white-700" />
                    <span
                      class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20"
                        fill="currentColor" stroke="currentColor" stroke-width="1">
                        <path fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"></path>
                      </svg>
                    </span>
                  </label>
                </div>
              </th>
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
              class=" border-t border-white-400 text-black-400 hover:bg-white-400">
              <td>
                <div class="flex justify-center">
                  <label class="flex items-center cursor-pointer relative">
                    <input type="checkbox" :checked="isChecked(item.SKU)" @change="(e) => toggleItem(item.SKU, e)"
                      class="form-checkbox peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800" />
                    <span
                      class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20"
                        fill="currentColor" stroke="currentColor" stroke-width="1">
                        <path fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"></path>
                      </svg>
                    </span>
                  </label>
                </div>
              </td>
              <td class="p-3">{{ item.productName }}</td>
              <td class="p-3">{{ item.SKU }}</td>
              <td class="p-3">{{ item.category }}</td>
              <td class="p-3 font-bold" :class="item.quantity < 50 ? 'text-orange-900' : 'text-black-400'">
                {{ item.quantity }}
              </td>
              <td class="p-3">{{ formatCurrency(item.costPrice) }}</td>
              <td class="p-3">{{ formatCurrency(item.sellingPrice) }}</td>
              <td class="p-3">
                <button @click="inventoryStore.productInventory.deleteProductBySKU(item.SKU)"
                  class="flex justify-center items-center gap-2 text-error font-bold hover:underline">
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
