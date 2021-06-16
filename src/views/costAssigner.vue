<template>
  <div class="w-full flex flex-col m-5 items-center mx-auto space-y-10">
    <h1 class="pt-10 text-3xl font-bold text-blue-500">
      Asignación de costos por tarea
    </h1>
    <div class="flex flex-col space-y-3 w-3/4 items-center text-center">
      <span>
        A continuación deberás asignar costos para cada persona por tarea 🙊️
      </span>
      <span>
        Estos costos permitirán que el programa tome en cuenta que ciertas
        personas son más reacias a realizar algunas tareas 👀️, por lo que
        tratará de realizar la asignación minimizando esa molestia que puedan
        tener estas personas.
      </span>
      <span>
        Para poder realizar esta asignación debes tener en cuenta la siguiente
        <b>regla</b> o el programa no te permitirá continuar:
      </span>
      <span class="font-semibold text-red-300">
        La suma de los costos para una persona debe ser de exactamente
        {{ tasks.length }}
      </span>
    </div>
    <div
      class=" w-3/4 divide-x grid grid-flow-col gap-2 rounded border-0 shadow-md"
    >
      <div v-for="name in names" :key="name" class="px-3 py-3">
        <div
          v-for="task in tasks"
          :key="task"
          class="py-3 flex flex-row items-center justify-between font-mono text-sm"
        >
          Costo de {{ name }} por {{ task }}:
          <select
            v-model="costs[name][task]"
            @click="checkCosts()"
            class="bg-white flex w-12 h-8 text-xs border  border-gray-200 text-blue-500 rounded-md focus:ring"
          >
            <option
              class="text-blue-300"
              v-for="option in options"
              :key="option.value"
              v-bind:value="option.value"
              >{{ option.value }}</option
            >
          </select>
        </div>
      </div>
    </div>
    <!--
    <router-link
      class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      tag="button"
      :disabled="canContinue"
      :class="canContinue ? 'bg-green-500' : 'bg-red-500'"
      :to="{
        path: '/assigner/costs/restrictions',
        query: {
          names: names,
          tasks: tasks,
          days: days,
          eqRestrictions: eqRestrictions,
          assignCosts: assignCosts,
        },
      }"
    >
      Continuar
    </router-link> -->
    <button
      class="bg-transpareny font-semibold py-2 px-4 border rounded"
      :class="
        canContinue
          ? 'hover:bg-blue-500 text-blue-700 hover:text-white border-blue-500 hover:border-transparent '
          : 'text-gray-400 border-gray-400 cursor-not-allowed'
      "
      @click="nextPage()"
      :disabled="!canContinue"
    >
      Continuar
    </button>
  </div>
  <the-footer />
</template>

<script>
import axios from "axios";
import TheFooter from "../components/TheFooter.vue";
export default {
  components: { TheFooter },
  props: {
    names: Array,
    tasks: Array,
    days: Array,
    eqRestrictions: Boolean,
    assignCosts: Boolean,
  },
  data() {
    return {
      canContinue: true,
      options: [],
      costs: Object.fromEntries(
        this.names.map((x) => [
          x,
          Object.fromEntries(this.tasks.map((y) => [y, 1])),
        ])
      ),
    };
  },
  methods: {
    async checkCosts() {
      let post = { costs: this.costs };
      const response = await axios.post(
        "http://localhost:8000/checkCosts/",
        post
      );
      console.log(Object(this.costs));
      this.canContinue = response.data;
    },
    nextPage() {
      if (this.canContinue) {
        this.$router.push({
          name: "RestrictionAssigner",
          params: {
            names: this.names,
            tasks: this.tasks,
            days: this.days,
            eqRestrictions: this.eqRestrictions,
            assignCosts: this.assignCosts,
            costs: JSON.stringify(this.costs),
          },
        });
      }
    },
  },
  async created() {
    let post = { tasks: this.tasks };
    const response = await axios.post(
      "http://localhost:8000/getOptions/",
      post
    );
    this.options = response.data;
  },
};
</script>

<style scoped></style>
