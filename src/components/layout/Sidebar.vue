<script setup>
import { reactive, h, watch, computed } from "vue";
import {
  Package,
  ArrowDownUp,
  FileChartLine,
  PanelLeftClose,
  House,
} from "lucide-vue-next";

import { useRoute } from "vue-router";

const route = useRoute();

const navIcon = (iconComponent) => {
  return h(iconComponent, { class: "text-black-500 w-5" });
};

const nav = reactive([
  { name: "Dashboard", icon: navIcon(House), path: "/dashboard" },
  { name: "Products", icon: navIcon(Package), path: "/product" },
  { name: "Transaction", icon: navIcon(ArrowDownUp), path: "/transaction" },
  { name: "Analytics", icon: navIcon(FileChartLine), path: "/analytics" },
]);

const sideBar = reactive({
  isExpanded: true,

  handleClick() {
    sideBar.isExpanded = !sideBar.isExpanded;
  },
});

const currPage = computed(() => route.path.replace(/^\//, ""));

watch(route, () => {
  console.log(currPage.value);
});
</script>

<template>
  <div
    :class="[
      'flex flex-col text-black-500 p-7 gap-10 justify-between border-r border-white-500 duration-300 ease-out origin-left',
      sideBar.isExpanded ? 'w-70' : 'w-25',
    ]"
  >
    <div
      class="flex justify-center items-center h-10 w-full text-black-400 gap-6"
    >
      <img
        src="@/assets/logoipsum-263.svg"
        alt="logo"
        v-show="sideBar.isExpanded"
      />
      <PanelLeftClose
        class="hover:text-black-400 hover:cursor-pointer"
        :class="{ 'rotate-180': !sideBar.isExpanded }"
        @click="sideBar.handleClick"
      />
    </div>

    <hr class="border-white-600" />

    <nav class="w-full">
      <ul class="flex flex-col w-full">
        <li v-for="item in nav" :key="item.name">
          <RouterLink
            :to="item.path"
            class="flex items-center h-10 mt-4 gap-4 rounded-xl px-3 hover:bg-white-400 transition-all"
            :class="item.path === route.path ? 'bg-white-400' : ''"
          >
            <component
              :is="item.icon"
              class="w-5 h-5 shrink-0 text-black-200"
            />
            <span
              class="text-md font-medium transition-all duration-300"
              :class="
                sideBar.isExpanded
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-0 w-0 overflow-hidden'
              "
            >
              {{ item.name }}
            </span>
          </RouterLink>
        </li>
      </ul>
    </nav>

    <div class="flex-grow"></div>

    <hr class="border-white-400" />

    <div class="flex items-center w-full gap-3">
      <div v-if="sideBar.isExpanded" class="flex flex-col">
        <h1 class="text-lg font-medium">User Profile</h1>
        <p class="text-sm text-black-200">Admin</p>
      </div>
      <img
        src="@/assets/picture.png"
        alt="Profile"
        class="w-10 h-10 rounded-full ml-auto"
      />
    </div>
  </div>
</template>
