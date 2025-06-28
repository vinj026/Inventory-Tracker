<script setup>
import PageTitle from "@/components/layout/PageTitle.vue";
import Form from "@/components/layout/Form.vue";
import TableSection from "@/components/layout/TableSection.vue";
import ProductTable from "@/components/spesific/ProductTable.vue";
import { useUIStore } from "@/stores/useUiStore";
import { useInventoryStore } from "@/stores/useInventoryStore"

const ui = useUIStore();
const inventoryStore = useInventoryStore()

function handleDelete(sku) {
  inventoryStore.productInventory.deleteProductBySKU(sku)
}
</script>

<template>
  <div class="flex flex-col h-screen bg-white-300">
    <div class="p-8">
      <PageTitle />
      <hr class="border-white-500 my-4" />
    </div>

    <Form class="absolute top-1/2 -translate-y-1/2 right-10" v-show="ui.formToggle" />

    <div class="flex-1 overflow-hidden px-8 pb-8">
      <TableSection title="Product List">
        <div class="h-full overflow-y-auto">
          <ProductTable @delete="handleDelete" />
        </div>
      </TableSection>
    </div>
  </div>
</template>
