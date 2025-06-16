<script setup>
import { reactive } from "vue";
import PageTitle from "../components/layout/PageTitle.vue";
import Card from "@/components/layout/Card.vue";

import { useInventoryStore } from "@/stores/useInventoryStore.js";
const inventoryStore = useInventoryStore();

const cardTitle = reactive([
  "Total Product in Inventorry",
  "Low Stock Items",
  "Items In",
  "Items Out",
]);

console.log(inventoryStore.products);
</script>
<template>
  <div class="flex flex-col gap-6 bg-white-300 p-8">
    <PageTitle />
    <hr class="border-white-600" />

    <div class="grid grid-cols-4 gap-4">
      <Card
        v-for="(items, key) in inventoryStore.products"
        :Title="key"
        :Quantity="items.quantity"
        :Icon="items.icon"
      />
    </div>
  </div>
</template>
