<template>
  <div class="w-full flex flex-col m-5 items-center mx-auto space-y-10">
    <h1 class="text-center pt-10 text-2xl md:text-3xl font-bold text-blue-500">
      Asignación de costos por tarea
    </h1>
    <div
      class="flex flex-col px-5 text-xs space-y-3 items-center text-justify md:px-0 md:text-base md:w-3/4 md:text-center"
    >
      <span>
        A continuación deberás asignar costos para cada persona por tarea 🙊️
      </span>
      <span>
        Mientras más alto sea el número que asignes, más costosa será esa tarea
        para la persona. El programa tratará de minimizar los costos de la gente
        en base a esta asignación.
      </span>
      <span>
        Debes tener en cuenta la siguiente
        <b>regla</b> o el programa no te permitirá continuar:
      </span>
      <span class="font-semibold text-red-300">
        La suma de los costos para una persona debe ser de exactamente
        {{ tasks.length }}
      </span>
      <span class="text-xs">
        Espera unos segundos mientras se cargan las opciones 😁️</span
      >
    </div>
    <div
      class="w-3/4 divide-y-4 md:divide-y md:divide-x grid md:grid-flow-col gap-2 rounded md:border-1 border-2 shadow-md md:shadow-md"
    >
      <div v-for="name in names" :key="name" class="md:px-3 md:py-3">
        <div
          v-for="task in tasks"
          :key="task"
          class="px-2 md:px-0 py-3 flex flex-row items-center justify-between font-mono text-sm"
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
    <transition name="alert">
      <pop-box
        v-if="continueMessage"
        message="Espera unos segundos mientras te redirijo a la siguiente página..."
        :warning="false"
      />
    </transition>
  </div>
  <the-footer />
</template>

<script>
import axios from "axios";
import TheFooter from "../components/TheFooter.vue";
import popBox from "../components/popBox.vue";

export default {
  components: { TheFooter, popBox },
  props: {
    names: Array,
    tasks: Array,
    days: Array,
    eqRestrictions: Boolean,
    assignCosts: Boolean,
  },
  data() {
    return {
      continueMessage: false,
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
        "https://8sdgtp.deta.dev/checkCosts/",
        post
      );
      this.canContinue = response.data;
    },
    async nextPage() {
      this.continueMessage = true;
      if (this.canContinue) {
        if (this.eqRestrictions) {
          // Esto debería ser una función. Llamemosla function1()
          let post = {
            d: this.days.length,
            t: this.tasks.length,
            p: this.names.length,
          };
          const response = await axios.post(
            "https://8sdgtp.deta.dev/get_restriction_options",
            post
          );

          this.$router.push({
            name: "RestrictionAssigner",
            params: {
              names: this.names,
              tasks: this.tasks,
              days: this.days,
              eqRestrictions: this.eqRestrictions,
              assignCosts: this.assignCosts,
              costs: JSON.stringify(this.costs),
              restrictionsOptions: JSON.stringify(response.data),
            },
          });
        } else {
          // Aquí debería guiar directo al problema de optimización:
          let problemParams = {
            names: this.names,
            tasks: this.tasks,
            days: this.days,
            costs: this.costs,
            min_assign_task: 1,
            max_assign_task: 10000,
            max_total_assign: 10000,
            min_total_assign: 1,
          };

          // Esto debería ser una función. Llamémosla function2()
          const response = await axios.post(
            "https://8sdgtp.deta.dev/resolve/",
            problemParams
          );
          if (response.data.status == "Optimal") {
            this.$router.push({
              name: "Optimizer",
              params: {
                problemSettings: JSON.stringify(response.data),
              },
            });
          } else {
            console.log(
              "El problema es infactible con los valores que acabas de asignar. Prueba con otros e intentalo de nuevo :("
            );
          }
        }
      }
    },
  },
  async created() {
    let post = { tasks: this.tasks };
    const response = await axios.post(
      "https://8sdgtp.deta.dev/getOptions/",
      post
    );
    this.options = response.data;
  },
};
</script>

<style scoped></style>
