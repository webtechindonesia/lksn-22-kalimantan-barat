import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views";
import ManageForm from "@/views/manage-forms.vue";
const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/home",
    name: "manageForm",
    component: ManageForm,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !localStorage.token) {
    next({ name: "login" });
  } else if (to.name == "login" && localStorage.token) {
    next({ name: "manageForm" });
  } else {
    next();
  }
});

export default router;
