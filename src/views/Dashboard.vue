<script setup>
import PageTitle from "../components/layout/PageTitle.vue";
import Card from "@/components/layout/Card.vue";
import Form from "@/components/layout/Form.vue";
import { useInventoryStore } from "@/stores/useInventoryStore.js";
import { useUIStore } from "@/stores/useUiStore.js";
import { watch, onMounted, ref } from "vue";

const inventoryStore = useInventoryStore();
const ui = useUIStore();

watch(
  () => ui.formToggle,
  (newVal) => {
    console.log(newVal);
  },
);
</script>
<template>
  <div class="flex flex-col gap-6 bg-white-300 p-8">
    <PageTitle />
    <hr class="border-white-600" />

    <div class="grid grid-cols-4 gap-4">
      <Card
        v-for="(items, key) in inventoryStore.productsStats"
        :Title="key"
        :Quantity="items.quantity"
        :Icon="items.icon"
      />

      <Form
        class="absolute right- top-1/2 -translate-y-1/2 right-10"
        v-show="ui.formToggle"
      />
    </div>
  </div>
</template>
