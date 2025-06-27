import MainLayout from "@/views/MainLayout.vue";
import Products from "@/views/Products.vue";
import Transaction from "@/views/Transaction.vue";
import Analytics from "@/views/Analytics.vue";
import Dashboard from "@/views/Dashboard.vue";
const routes = [
  { path: "/", name: "home", component: Dashboard, redirect: "/dashboard" },
  { path: "/dashboard", name: "dashboard", component: Dashboard },
  { path: "/product", name: "products", component: Products },
  { path: "/transaction", name: "transaction", component: Transaction },
  { path: "/analytics", name: "analytics", component: Analytics },
];

export default routes;
