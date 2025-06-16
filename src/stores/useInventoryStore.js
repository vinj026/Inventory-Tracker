import { defineStore } from "pinia";
import { reactive } from "vue";

export const useInventoryStore = defineStore("inventory", () => {
  const products = reactive({
    "Total Product in Inventory": {
      quantity: 2936,
      icon: "Warehouse",
    },
    "Low Stock Items": {
      quantity: 523,
      icon: "TriangleAlert",
    },
    "Items In": {
      quantity: 1523,
      icon: "PackagePlus",
    },
    "Items Out": {
      quantity: 2452,
      icon: "PackageMinus",
    },
  });

  return { products };
});
