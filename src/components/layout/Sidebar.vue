<script setup>
import { reactive, h } from "vue";
import {
  LayoutDashboard,
  Package,
  ArrowDownUp,
  FileChartLine,
  PanelLeftClose,
} from "lucide-vue-next";

const navIcon = (iconComponent) => {
  return h(iconComponent, { class: "text-black-600 w-5" });
};

const nav = reactive([
  { name: "Dashboard", icon: navIcon(LayoutDashboard), path: "/dashboard" },
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
</script>

<template>
  <div
    :class="[
      'flex flex-col text-black-400 p-7 gap-10 justify-between border-r border-white-500 duration-300 ease-out origin-left',
      sideBar.isExpanded ? 'w-70' : 'w-25',
    ]"
  >
    <div class="flex justify-center items-center h-10 w-full gap-6">
      <img
        src="@/assets/logoipsum-263.svg"
        alt="logo"
        v-show="sideBar.isExpanded"
      />
      <PanelLeftClose
        class="text-black-200 hover:text-black-400 hover:cursor-pointer"
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
            class="flex items-center h-10 gap-3 rounded-xl px-3 hover:bg-gray-200 transition-all"
          >
            <component :is="item.icon" class="w-5 h-5 shrink-0" />
            <span
              class="text-sm font-medium text-gray-800 transition-all duration-300"
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
