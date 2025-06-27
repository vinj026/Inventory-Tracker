<script setup>
import PageTitle from "../components/layout/PageTitle.vue";
import Card from "@/components/layout/Card.vue";
import Form from "@/components/layout/Form.vue";
import { useInventoryStore } from "@/stores/useInventoryStore";
import { useUIStore } from "@/stores/useUiStore";
import { useTransactionStore } from "@/stores/useTransactionStore"
import { computed, ref } from "vue"
import TableSection from "@/components/layout/TableSection.vue";
import TransactionTable from "@/components/spesific/TransactionTable.vue";
import LowStockTable from "@/components/spesific/LowStockTable.vue";
import ChartSection from "../components/layout/ChartSection.vue";
const inventoryStore = useInventoryStore();
const transactionStore = useTransactionStore();


const ui = useUIStore();


const productsStats = {
  "Total Product in Inventory": {
    quantity: computed(() =>
      inventoryStore.productInventory.productList.reduce((sum, p) => sum + p.quantity, 0)
    ),
    icon: "Warehouse",
  },
  "Low Stock Items": {
    quantity: computed(() =>
      inventoryStore.productInventory.productList.filter(p => p.quantity < 50).length
    ),
    icon: "TriangleAlert",
  },
  "Items In": {
    quantity: computed(() =>
      transactionStore.productTransaction.transactionList
        .filter(p => p.type === 'in')
        .reduce((sum, p) => sum + p.quantity, 0)
    ),
    icon: "PackagePlus",
  },
  "Items Out": {
    quantity: computed(() =>
      transactionStore.productTransaction.transactionList
        .filter(p => p.type === 'out')
        .reduce((sum, p) => sum + p.quantity, 0)
    ),
    icon: "PackageMinus",
  },
}

const recentTransactions = computed(() =>
  transactionStore.productTransaction.transactionList
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)
)

const lowStockItems = computed(() =>
  inventoryStore.productInventory.productList
    .filter(p => p.quantity < 50)
    .sort((a, b) => a.quantity - b.quantity)
    .slice(0, 13)
)

</script>
<template>
  <div class="flex flex-col gap-6 bg-white-300 p-8">
    <PageTitle />
    <hr class="border-white-500" />

    <div class="grid grid-cols-4 gap-4 ">
      <Card v-for="(items, key) in productsStats" :Title="key" :Quantity="items.quantity.value" :Icon="items.icon" />
      <Form class="absolute top-1/2 -translate-y-1/2 right-10" v-show="ui.formToggle" />
    </div>
    <div class="grid grid-cols-2 gap-4 h-full w-full">
      <div>
        <TableSection title="Low Stock Items">
          <LowStockTable :data="lowStockItems" />
        </TableSection>
      </div>
      <div class="flex flex-col gap-4 ">
        <ChartSection />
        <TableSection title="Recent Transactions">
          <TransactionTable :data="recentTransactions" />
        </TableSection>
      </div>
    </div>
  </div>
</template>
