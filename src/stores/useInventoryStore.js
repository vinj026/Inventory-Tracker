import { defineStore } from "pinia";
import { reactive, watch } from "vue";

export const useInventoryStore = defineStore("inventory", () => {
  const productsStats = reactive({
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

  const productInventory = reactive({
    productList: [],
    savedCategory: [],
    addCategory(newCategory) {
      this.savedCategory.push(newCategory);
    },
    addProduct(addProduct_) {
      this.productList.push(addProduct_);
    },
  });

  watch(productInventory.productList, (newVal) => {
    console.log("Product List:", newVal);
  });

  return { productsStats, productInventory };
});
