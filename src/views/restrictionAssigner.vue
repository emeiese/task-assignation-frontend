<template>
  <div class="w-full flex flex-col m-5 mb-24 items-center mx-auto space-y-10">
    <h1 class="pt-10 text-3xl font-bold text-blue-500">
      Restricciones de justicia
    </h1>
    <span class="w-3/4 text-center">
      El problema tiene como supuesto que
      <b>las tareas se pueden repetir durante los días de semana escogidos</b> y
      que <b>las personas pueden tener más de una tarea al día</b> , pero hay
      algunas preguntas que debes responder para agregarle un poco de justicia a
      la asignación de tareas entre las distintas personas durante un set de
      días 🙌️
    </span>
    <restriction
      v-for="rest in restrictionsList"
      :key="rest.id"
      :id="rest.id"
      :valueName="rest.valueName"
      :defaultValue="rest.defaultValue"
      :headerText="rest.headerText"
      :example="rest.example"
      :tipText="rest.tipText"
      :restrictionsOptions="restrictionsOptions[rest.id]"
      @send-option="saveValue({ valueName: rest.valueName, value: $event })"
    />
    <!--
    <router-link
      class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      :to="{
        path: '/optimize',
        query: {
          names: names,
          tasks: tasks,
          days: days,
        },
      }"
    >
      Continuar
    </router-link>
    -->
    <button
      class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      @click="nextPage()"
    >
      Resolver problema
    </button>
    <div v-if="cantSolve"> 
      El problema es infactible con los valores que acabas de asignar. Prueba con otros valores e intentalo de nuevo 😔️.
    </div>
  </div>
</template>

<script>
import restriction from "../components/restriction.vue";
import axios from "axios";
export default {
  props: {
    names: Array,
    tasks: Array,
    days: Array,
    eqRestrictions: Boolean,
    assignCosts: Boolean,
    costs: Object,
    restrictionsOptions: Object,
  },
  components: { restriction },
  methods: {
    async nextPage() {
      let problemParams = {
        names: this.names,
        tasks: this.tasks,
        days: this.days,
        costs: this.costs,
        min_assign_task: this.selectedOptions["min_assign_task"],
        max_assign_task: this.selectedOptions["max_assign_task"],
        max_total_assign: this.selectedOptions["max_total_assign"],
        min_total_assign: this.selectedOptions["min_total_assign"],
      };

      // Esto debería ser una función. Llamémosla function2()
      const response = await axios.post(
        "https://8sdgtp.deta.dev/resolve/",
        problemParams
      );
      if (response.data.status == "Optimal") {
        // Cambiamos de página:
        this.$router.push({
            name: "Optimizer",
            params: {
              problemSettings: JSON.stringify(response.data),
            },
          });
      } else {
        this.cantSolve = true 
      }
    },
    saveValue(object) {
      this.selectedOptions[object.valueName] = object.value;
    },
  },
  data() {
    return {
      cantSolve: false,
      selectedOptions: {
        min_assign_task: 1,
        max_assign_task: 10000,
        max_total_assign: 10000,
        min_total_assign: 1,
      },
      restrictionsList: [
        {
          id: "1",
          valueName: "min_assign_task",
          defaultValue: 1,
          headerText:
            "Ingresa el número mínimo de asignaciones que debe tener una persona en una tarea X durante la semana.",
          example:
            "El número mínimo de veces que " +
            this.names[0] +
            " debe lavar en la semana es 1.",
          tipText:
            "Ten cuidado con asignar un número muy alto o el problema podria no tener solución 😢️ ",
        },
        {
          id: "2",
          valueName: "max_assign_task",
          defaultValue: 1000,
          headerText:
            "Ingresa el número máximo de asignaciones que puede tener una persona en una tarea durante la semana.",
          example:
            "El número máximo de veces que " +
            this.names[0] +
            " debe lavar en la semana es 5.",
          tipText:
            "Ten cuidado con asignar un número muy bajo o el problema podría no tener solución 😢️",
        },
        {
          id: "3",
          valueName: "max_total_assign",
          defaultValue: 1000,
          headerText:
            "Ingresa el número máximo de asignaciones totales  que puede tener una persona durante una semana.",
          example:
            "El número máximo de asignaciones que " +
            this.names[0] +
            " debe tener durante la semana (sea cual sea la tarea) es 10",
          tipText:
            "Ten cuidado con asignar un número muy bajo o el problema podría no tener solución 😢️",
        },
      ],
    };
  },
};
</script>
<style scoped></style>
