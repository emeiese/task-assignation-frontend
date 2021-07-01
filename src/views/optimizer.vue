<template>
  <div class="w-full flex flex-col m-5 mb-24 items-center mx-auto space-y-10">
    <h1 class="pt-10 text-3xl font-bold text-blue-500">
      Asignación de tareas por día
    </h1>
    <div
      class="w-1/3 divide-y grid grid-flow-row gap-2 rounded border-2 shadow-lg"
    >
      <!-- Por cada task crea una fila -->
      <ul
        v-for="(dailyAssignation, day) in assignation"
        :key="day"
        class="px-6 py-4"
      >
        <h2 class="font-semibold text-lg text-blue-700 tracking-wide uppercase">{{ day }}</h2>
        <!-- Por cada día crea una columna -->
        <li
          v-for="(assigned, task) in dailyAssignation"
          :key="task"
          class="py-3 flex flex-col items-center justify-between tracking-wide text-lg"
        >
          {{ assigned }} debe {{ task }}
        </li>
      </ul>
    </div>
    <div class="w-1/4 text-center">
      <h1 class="font-semibold">Restricciones de justicia del problema:</h1>
      <ul class="text-left py-5 list-disc">
        <li>
          Cada persona debe realizar al menos
          {{ problemSettings.min_assign_task }}
          <span v-if="problemSettings.min_assign_task > 1">veces</span
          ><span v-else>vez</span> cada tarea en la semana.
        </li>
        <li>
          Cada persona puede realizar a lo más
          {{ problemSettings.max_assign_task }}
          <span v-if="problemSettings.max_assign_task > 1">veces</span
          ><span v-else>vez</span> cada tarea en la semana.
        </li>
        <li>
          Cada persona debe realizar al menos
          {{ problemSettings.min_total_assign }}
          <span v-if="problemSettings.min_total_assign > 1">tareas</span
          ><span v-else>tarea</span> cada semana.
        </li>
        <li>
          Cada persona debe realizar a lo más
          {{ problemSettings.max_total_assign }}
          <span v-if="problemSettings.max_total_assign > 1">tareas</span
          ><span v-else>tarea</span> cada semana.
        </li>
      </ul>
    </div>
    <button
      class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      @click="nextPage()"
    >
      Volver a reasignar restricciones de justicia
    </button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    problemSettings: Object,
  },
  data() {
    return {
      assignation: Object,
    };
  },
  methods: {
    async nextPage() {
      let post = {
        d: this.problemSettings.days.length,
        t: this.problemSettings.tasks.length,
        p: this.problemSettings.names.length,
      };
      const response = await axios.post(
        "https://8sdgtp.deta.dev/get_restriction_options",
        post
      );

      this.$router.push({
        name: "RestrictionAssigner",
        params: {
          names: this.problemSettings.names,
          tasks: this.problemSettings.tasks,
          days: this.problemSettings.days,
          eqRestrictions: true,
          assignCosts: true,
          costs: JSON.stringify(this.problemSettings.costs),
          restrictionsOptions: JSON.stringify(response.data),
        },
      });
    },
  },
  created() {
    const assign = this.problemSettings.assignation;
    const tasks = this.problemSettings.tasks;
    const days = this.problemSettings.days;
    console.log("FLAG1");
    console.log(assign, tasks, days);
    // Object.keys(assign).forEach(task => Object.keys(assign[task]).forEach(day => ));

    this.assignation = Object.fromEntries(
      days.map((day) => [
        day,
        Object.fromEntries(tasks.map((task) => [task, assign[task][day]])),
      ])
    );
    console.log("FLAAAAAG desde optimizer");
    console.log(this.problemSettings);
    // Object.fromEntries(this.names.map((x) => [x, Object.fromEntries(this.tasks.map((y) => [y, 1])),]));
  },
};
</script>

<style scoped></style>
