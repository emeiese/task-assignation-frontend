<template>
  <div class="w-full flex flex-col m-5 mb-24 items-center mx-auto space-y-10">
    <h1 class="pt-10 text-3xl font-bold text-blue-500">
      Asignación de tareas por día
    </h1>
    <div
      class="w-1/4 divide-y grid grid-flow-row gap-2 rounded border-1 shadow-md"
    >
      <!-- Por cada task crea una fila -->
      <ul
        v-for="(dailyAssignation, day) in assignation"
        :key="day"
        class="px-3 py-3"
      >
      <h2 class="font-semibold text-lg"> {{ day }}</h2>
        <!-- Por cada día crea una columna -->
        <li
          v-for="(assigned, task) in dailyAssignation"
          :key="task"
          class="py-3 flex flex-col items-center justify-between font-mono text-sm list-disc"
        >
          {{ assigned }} debe {{ task }}
        </li>
      </ul>
    </div>
    <div class="w-3/4 text-center">
      <h1> Parámetros del problema:</h1>
      <h1> Resultados del problema de optimización</h1>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    problemSettings: Object,
  },
  data() {
    return {
      assignation: Object,
    }
  },
  created() {
    const assign = this.problemSettings.assignation;
    const tasks = this.problemSettings.tasks;
    const days = this.problemSettings.days;
    console.log("FLAG1")
    console.log(assign, tasks, days);
    // Object.keys(assign).forEach(task => Object.keys(assign[task]).forEach(day => ));

    this.assignation = Object.fromEntries(
      days.map((day) => [
        day,
        Object.fromEntries(tasks.map((task) => [task, assign[task][day]])),
      ])
    );
    console.log(this.assignation);
    // Object.fromEntries(this.names.map((x) => [x, Object.fromEntries(this.tasks.map((y) => [y, 1])),]));
  },
};
</script>

<style scoped>



</style>
