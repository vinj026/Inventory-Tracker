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
let ignoreNextClick = false;
const formInput = reactive({
  productName: "",
  SKU: "",
  category: "",
  costPrice: "",
  sellingPrice: "",
  quantity: "",
  unitType: "",
});

const formInputError = reactive({
  productName: {
    error: false,
    errorMsg: "",
  },
  SKU: {
    error: false,
    errorMsg: "",
  },
  category: {
    error: false,
    errorMsg: "",
  },
  costPrice: {
    error: false,
    errorMsg: "",
  },
  sellingPrice: {
    error: false,
    errorMsg: "",
  },
  quantity: {
    error: false,
    errorMsg: "",
  },
  unitType: {
    error: false,
    errorMsg: "",
  },
});

const formFields = [
  {
    name: "Product Name",
    model: "productName",
    type: "text",
    placeholder: "e.g. Blue T-Shirt",
  },
  {
    name: "SKU",
    model: "SKU",
    type: "text",
    placeholder: "e.g. BLU-TSHIRT-001",
  },
  {
    name: "Cost Price",
    model: "costPrice",
    type: "number",
    placeholder: "e.g. 50000",
  },
  {
    name: "Selling Price",
    model: "sellingPrice",
    type: "number",
    placeholder: "e.g. 75000",
  },
];

function isFormValid() {
  let isValid = true;

  Object.entries(formInput).forEach(([key, value]) => {
    if (!value || value.trim() === "") {
      formInputError[key].error = true;
      formInputError[key].errorMsg =
        ` ${key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())} is required`;
      console.log("Form has errors.");
      isValid = false;
    } else {
      formInputError[key].error = false;
    }
  });

  return isValid;
}
function isDuplicate() {
  return inventoryStore.productInventory.productList.some(
    (item) => item.SKU === formInput.SKU,
  );
}

function handleSubmitForm() {
  if (!isFormValid()) {
    console.log("Form has errors.");
    return;
  }

  if (!isDuplicate()) {
    const newProduct = { ...formInput };
    inventoryStore.productInventory.addProduct(newProduct);
  } else {
    console.log("Data Duplicate");
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

watch(inventoryStore.productInventory.productList, (newVal) => {
  console.log("Product List:", newVal);
});
function handleClickOutside(event) {
  const formEl = document.getElementById("form");

  if (ignoreNextClick) {
    ignoreNextClick = false;
    return;
  }

  if (formEl && !formEl.contains(event.target)) {
    ui.formToggle = false;
  }
}
watch(
  () => ui.formToggle,
  (val) => {
    if (val === true) {
      ignoreNextClick = true;
    }
  },
);

watch(
  () => inventoryStore.productInventory.savedCategory,
  (newVal) => {
    console.log("Saved Category updated:", newVal);
  },
  { deep: true },
);
</script>

<template>
  <div
    id="form"
    class="flex flex-col gap-6 bg-white-300 w-1/3 border border-white-500 p-6 rounded-2xl max-h-[calc(100vh-80px)] overflow-y-auto"
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
      <!-- Dynamic Fields -->
      <FormField
        v-for="field in formFields"
        :key="field.model"
        :FieldName="field.name"
        v-model="formInput[field.model]"
        :Type="field.type"
        :Placeholder="field.placeholder"
        :HasError="formInputError[field.model].error"
        :ErrorMessage="formInputError[field.model].errorMsg"
      />

      <div class="relative">
        <FormField
          FieldName="Category"
          v-model="formInput.category"
          Placeholder="e.g. Clothing"
          @focus="inputFocus.isCategoryFocus = true"
          @blur="inputFocus.isCategoryFocus = false"
          :HasError="formInputError.category.error"
          :ErrorMessage="formInputError.category.errorMsg"
        />

        <AutoSuggest
          v-model="formInput.category"
          :isInputFocus="inputFocus.isCategoryFocus"
        />
      </div>

      <div class="flex w-full gap-2 justify-center">
        <FormField
          FieldName="Quantity"
          v-model="formInput.quantity"
          Type="number"
          Placeholder="e.g. 1000"
          :HasError="formInputError.quantity.error"
          :ErrorMessage="formInputError.quantity.errorMsg"
        />
        <div class="flex flex-col gap-1">
          <h1 class="font-bold text-black-400 text-md">Unit Type</h1>
          <div
            :class="[
              'border border-white-400 p-2 rounded-lg',
              formInputError.unitType.error && '!border-orange-900',
            ]"
          >
            <DropdownUnit
              data-testid="dropdown-unit"
              v-model="formInput.unitType"
            />
          </div>
          <p
            v-show="formInputError.unitType.error"
            class="text-xs font-medium text-orange-900"
          >
            {{ formInputError.unitType.errorMsg }}
          </p>
        </div>
      </div>
    </form>

    <Button
      Name="Submit"
      @click="handleSubmitForm"
      class="hover:cursor-pointer"
    />
  </div>
</template>
