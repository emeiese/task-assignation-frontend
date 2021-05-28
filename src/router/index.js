import { createRouter, createWebHistory } from "vue-router";
import Landing from "../views/landing";
import Assigner from "../views/assigner";
import CostAssigner from "../views/costAssigner.vue";
import RestrictionAssigner from "../views/restrictionAssigner.vue";
import Optimizer from "../views/optimizer.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Landing,
  },
  {
    path: "/assigner",
    name: "Assigner",
    component: Assigner,
  },
  {
    path: "/assigner/costs",
    name: "CostAssigner",
    component: CostAssigner,
    props(route) {
      return {
        names: route.query.names,
        shores: route.query.shores,
        days: route.query.days,
        eqRestrictions: route.query.eqRestrictions,
        assignCosts: route.query.assignCosts,
      };
    },
  },
  {
    path: "/assigner/costs/restrictions",
    name: "RestrictionAssigner",
    component: RestrictionAssigner,
    props(route) {
      return {
        names: route.query.names,
        shores: route.query.shores,
        days: route.query.days,
        eqRestrictions: route.query.eqRestrictions,
        assignCosts: route.query.assignCosts,
      };
    },
  },
  {
    path: "/optimize",
    name: "Optimizer",
    component: Optimizer,
    props(route) {
      return {
        names: route.query.names,
        shores: route.query.shores,
        days: route.query.days,
      };
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
