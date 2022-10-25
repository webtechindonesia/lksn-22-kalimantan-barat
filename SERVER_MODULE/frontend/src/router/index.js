import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views";
import ManageForm from "@/views/manage-forms.vue";
import CreateForm from "@/views/create-form.vue";
import DetailForm from "@/views/detail-form.vue";
import Responses from "@/views/responses.vue";
import SubmitForm from "@/views/submit-form.vue";
import NotFoundPage from "@/views/404.vue";

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
    meta: {
      auth: true,
    },
  },
  {
    path: "/detail-form/responses",
    name: "responses",
    component: Responses,
    meta: {
      auth: true,
    },
  },
  {
    path: "/forms/:slug",
    name: "submitForm",
    component: SubmitForm,
    meta: {
      auth: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: NotFoundPage,
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
