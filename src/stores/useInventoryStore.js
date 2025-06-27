import { defineStore } from "pinia";
import { reactive, watch } from "vue";

export const useInventoryStore = defineStore("inventory", () => {


  const productInventory = reactive({
    productList: [],
    savedCategory: [],

    addProduct(addProduct_) {
      const isCategoryDuplicate = this.savedCategory.includes(addProduct_.category)
      this.productList.push(addProduct_);

      if (!isCategoryDuplicate) {
        this.savedCategory.push(addProduct_.category);
      }
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
  return { productInventory, loadFromLocalStorage };
});
