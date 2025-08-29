import { createRouter, createMemoryHistory } from "vue-router";
import Login from "../views/login/index.vue";
import PersonalInfo from "../views/personalInfo/index.vue";
import ResetInfo from "../views/resetInfo/index.vue";
import Register from "../views/register/index.vue";
import FunNav from "../views/funNav/index.vue";

const routes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/personalInfo",
    component: PersonalInfo,
  },
  {
    path: "/resetInfo",
    component: ResetInfo,
  },
  {
    path: "/funNav",
    component: FunNav,
  },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
