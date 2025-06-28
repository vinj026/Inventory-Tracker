<script setup>
import Sidebar from "@/components/layout/Sidebar.vue";
import { onMounted } from "vue";
import { useInventoryStore } from "@/stores/useInventoryStore.js";
import { useTransactionStore } from "@/stores/useTransactionStore";

const inventoryStore = useInventoryStore();
const transactionStore = useTransactionStore()

onMounted(() => {
  inventoryStore.loadFromLocalStorage();
  transactionStore.loadFromLocalStorage();
  console.log(inventoryStore.productInventory.savedCategory);
  console.log(inventoryStore.productInventory.productList);
});
</script>
<template>
  <div class="grid grid-cols-[auto_1fr] w-full min-h-screen bg-white-100">
    <Sidebar />
    <RouterView />
  </div>
</template>
