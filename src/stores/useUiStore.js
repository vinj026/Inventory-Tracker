import { defineStore } from "pinia";
import { ref } from "vue";
export const useUIStore = defineStore("ui", () => {
  const formToggle = ref(false);
  return { formToggle };
});
