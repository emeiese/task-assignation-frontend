<template>
  <div class="w-full flex flex-col m-5 items-center mx-auto">
    <input-and-save
      id="namesInput"
      upperString="Ingrese todas las personas que participan de las tareas, separadas por comas."
      placeholder="Ejemplo: Josefa, Tomás, Ignacio, María"
      saveString="Guardar personas"
      @save-objects="saveNames($event)"
    >
    </input-and-save>
    <input-and-save
      id="tasksInput"
      upperString="Ingrese todas las tareas a asignar, separadas por comas."
      placeholder="Ejemplo: lavar, cocinar, limpiar"
      saveString="Guardar tareas"
      @save-objects="saveTasks($event)"
    ></input-and-save>
    <input-and-save
      id="periodsInput"
      upperString="Ingrese los días de la semana en los que las tareas se asignan a las personas"
      placeholder="Ejemplo: Lunes, Martes, Miércoles, Jueves, Viernes, Sábado, Domingo"
      saveString="Guardar días"
      @save-objects="saveDays($event)"
    ></input-and-save>
    <div class="flex flex-row pt-28 pb-10 space-x-10">
      <label class="text-gray-700">
        <input
          type="radio"
          value=""
          ref="restrictionsSelected"
          v-model="eqRestrictions"
        />
        <span class="ml-1"
          >Deseo agregar
          <Tooltip
            text="Las restricciones de justicia permiten que las tareas se asignen de manera más justa entre todos los participantes a través de los días. Si no seleccionas esta opción, puede que tus asignaciones sean un poco injustas 😮️"
          >
            <span class="font-bold cursor-pointer">
              restricciones de justicia
            </span>
          </Tooltip>
        </span>
      </label>
      <label class="text-gray-700">
        <input
          type="radio"
          value=""
          ref="costsSelected"
          v-model="assignCosts"
        />
        <span class="ml-1"
          >Deseo agregar
          <Tooltip
            text="Los costos por cada tarea por persona reflejan qué tanto le cuesta a cada persona hacer una tarea.
            Si no seleccionas esta opción, se asignará costo 1 para cada tarea por defecto 👀️"
          >
            <span class="font-bold cursor-pointer">
              costos por cada tarea
            </span>
          </Tooltip>
          para cada persona</span
        >
      </label>
    </div>
    <button
      class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      @click="nextPage()"
    >
      Continuar
    </button>
  </div>
  <TheFooter />
</template>

<script>
import inputAndSave from "../components/inputAndSave.vue";
import TheFooter from "../components/TheFooter.vue";
import Tooltip from "../components/SimpleTooltip.vue";

export default {
  components: { inputAndSave, TheFooter, Tooltip },
  data() {
    return {
      names: ["Josefa", "Tomás", "Ignacio", "María"],
      tasks: ["lavar", "cocinar", "limpiar"],
      days: [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo",
      ],
      eqRestrictions: false,
      assignCosts: false,
    };
  },
  methods: {
    saveNames(objects) {
      this.names = objects.split(",").map((name) => name.trim());
    },
    saveTasks(objects) {
      this.tasks = objects.split(",").map((task) => task.trim());
    },
    saveDays(objects) {
      this.days = objects.split(",").map((day) => day.trim());
    },
    nextPage() {
      this.$router.push({
        name: "CostAssigner",
        params: {
          names: this.names,
          tasks: this.tasks,
          days: this.days,
          eqRestrictions: this.eqRestrictions,
          assignCosts: this.assignCosts,
        },
      });
    },
  },
};
</script>

<style scoped></style>
