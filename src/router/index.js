import { createRouter, createWebHistory } from "vue-router";
function page(path) {
  return () =>
    import(/* webpackChunkName: '' */ `@/pages/${path}`).then(
      (m) => m.default || m
    );
}
const routes = [
  {
    path: "/edit",
    name: "Edit",
    component: page("Edit.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
