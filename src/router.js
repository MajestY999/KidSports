import { createRouter, createWebHistory } from "vue-router";
import CatalogView from "./views/CatalogView.vue";
import DetailView from "./views/DetailView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "catalog", component: CatalogView },
    {
      path: "/section/:id",
      name: "section",
      component: DetailView,
      props: true,
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
