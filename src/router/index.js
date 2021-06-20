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
        names: route.params.names,
        tasks: route.params.tasks,
        days: route.params.days,
        eqRestrictions: JSON.parse(route.params.eqRestrictions),
        assignCosts: JSON.parse(route.params.assignCosts),
      };
    },
  },
  {
    path: "/assigner/restrictions",
    name: "RestrictionAssigner",
    component: RestrictionAssigner,
    props(route) {
      return {
        names: route.params.names,
        tasks: route.params.tasks,
        days: route.params.days,
        eqRestrictions: JSON.parse(route.params.eqRestrictions),
        assignCosts: JSON.parse(route.params.assignCosts),
        costs: JSON.parse(route.params.costs),
        restrictionsOptions: JSON.parse(route.params.restrictionsOptions)
      };
    },
  },
  {
    path: "/assigner/optimize",
    name: "Optimizer",
    component: Optimizer,
    props(route) {
      return {
        problemSettings: JSON.parse(route.params.problemSettings)
      };
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
