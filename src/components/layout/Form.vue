<script setup>
import FormField from "@/components/common/FormField.vue";
import { Plus, Minus } from "lucide-vue-next";
import AutoSuggest from "../spesific/AutoSuggestCategory.vue";
import { onMounted, onBeforeUnmount, reactive, ref, watch } from "vue";
import { useInventoryStore } from "../../stores/useInventoryStore";
import DropdownUnit from "../spesific/DropdownUnit.vue";
import Button from "../common/Button.vue";
import { useUIStore } from "@/stores/useUiStore";

const inventoryStore = useInventoryStore();
const inputFocus = reactive({
  isCategoryFocus: false,
  isUnitFocus: false,
});
const ui = useUIStore();
const categoryInput = ref("");
let ignoreNextClick = false;

function handleClickOutside(event) {
  const formEl = document.getElementById("form");

  if (ignoreNextClick) {
    ignoreNextClick = false;
    return;
  }

  if (formEl && !formEl.contains(event.target)) {
    ui.formToggle = false;
    console.log("Klik di luar form → tutup");
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

watch(
  () => ui.formToggle,
  (val) => {
    if (val === true) {
      ignoreNextClick = true;
    }
  },
);
</script>

<template>
  <div
    id="form"
    class="flex flex-col gap-6 bg-white-300 w-1/3 border border-white-500 p-6 rounded-2xl"
  >
    <div class="flex justify-between text-black-400 items-center gap-4">
      <h1 class="text-black-400 flex font-bold text-xl">Add Product</h1>
      <button
        class="hover:cursor-pointer"
        @click="ui.formToggle = !ui.formToggle"
      >
        <Minus />
      </button>
    </div>

    <hr class="border-white-600" />
    <form class="flex flex-col gap-4" action="">
      <FormField
        FieldName="Product Name"
        Type="text"
        Placeholder="e.g. Blue T-Shirt"
      />
      <FormField
        FieldName="SKU"
        Type="text"
        Placeholder="e.g. BLU-TSHIRT-001"
      />
      <div>
        <FormField
          FieldName="Category"
          Placeholder="e.g. Clothing"
          v-model="categoryInput"
          @focus="inputFocus.isCategoryFocus = true"
          @blur="inputFocus.isCategoryFocus = false"
        >
          <template #append>
            <div
              class="absolute top-1/2 right-2 -translate-y-1/2 bg-white-400 text-black-300 rounded-md cursor-pointer"
              @click="
                inventoryStore.productInventory.addCategory(categoryInput)
              "
            >
              <Plus class="p-1" />
            </div>
          </template>
        </FormField>

        <AutoSuggest
          v-model="categoryInput"
          :isInputFocus="inputFocus.isCategoryFocus"
        />
      </div>
      <div class="flex gap-2">
        <FormField
          FieldName="Cost Price"
          Type="number"
          Placeholder="e.g. 50000"
        />
        <FormField
          FieldName="Selling Price"
          Type="number"
          Placeholder="e.g. 75000"
        />
      </div>

      <div class="flex w-full gap-2 justify-center items-center">
        <FormField FieldName="Quantity" Type="Number" Placeholder="e.g. 1000" />
        <div class="flex flex-col gap-1">
          <h1 class="font-bold text-black-400 text-md">Unit Type</h1>
          <div class="border border-white-400 p-2 rounded-lg">
            <DropdownUnit />
          </div>
        </div>
      </div>
    </form>

    <Button Name="Submit" class="hover:cursor-pointer" />
  </div>
</template>
