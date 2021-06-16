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
        eqRestrictions: Boolean(route.params.eqRestrictions),
        assignCosts: Boolean(route.params.assignCosts),
      };
    },
  },
  {
    path: "/assigner/costs/restrictions",
    name: "RestrictionAssigner",
    component: RestrictionAssigner,
    props(route) {
      return {
        names: route.params.names,
        tasks: route.params.tasks,
        days: route.params.days,
        eqRestrictions: Boolean(route.params.eqRestrictions),
        assignCosts: Boolean(route.params.assignCosts),
        costs: JSON.parse(route.params.costs),
      };
    },
  },
  /*
  {
    path: "/assigner/costs/restrictions",
    name: "RestrictionAssigner",
    component: RestrictionAssigner,
    props: true
  },
  */
  {
    path: "/optimize",
    name: "Optimizer",
    component: Optimizer,
    props(route) {
      return {
        names: route.query.names,
        tasks: route.query.tasks,
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
