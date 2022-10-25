import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views";
import ManageForm from "@/views/manage-forms.vue";
import CreateForm from "@/views/create-form.vue";
import DetailForm from "@/views/detail-form.vue";
const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/manage-form",
    name: "manageForm",
    component: ManageForm,
    meta: {
      auth: true,
    },
  },
  {
    path: "/create-form",
    name: "createForm",
    component: CreateForm,
    meta: {
      auth: true,
    },
  },
  {
    path: "/detail-form",
    name: "detailForm",
    component: DetailForm,    
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
  if (to.meta.auth && !localStorage.user) {
    next({ name: "login" });
  } else if (to.name == "login" && localStorage.user) {
    next({ name: "manageForm" });
  } else {
    next();
  }
});

export default router;
