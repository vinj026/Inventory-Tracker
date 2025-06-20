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

    addProduct(addProduct_) {
      this.productList.push(addProduct_);
      this.savedCategory.push(addProduct_.category);
    },
  });

  function loadFromLocalStorage() {
    const categories = localStorage.getItem("savedCategory");
    if (categories) {
      productInventory.savedCategory = JSON.parse(categories);
    }

    const products = localStorage.getItem("productList");
    if (products) {
      productInventory.productList = JSON.parse(products);
    }
  }
  watch(
    () => productInventory.productList,
    (val) => {
      localStorage.setItem("productList", JSON.stringify(val));
    },
    { deep: true },
  );
  watch(
    () => productInventory.savedCategory,
    (val) => {
      localStorage.setItem("savedCategory", JSON.stringify(val));
    },
    { deep: true },
  );
  return { productsStats, productInventory, loadFromLocalStorage };
});
