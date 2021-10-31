<template>
  <div class="w-full flex flex-col px-4 md:px-0 md:m-5 items-center mx-auto">
    <transition name="alert">
      <warning-box v-if="showWarning" />
    </transition>
    <input-and-save
      id="namesInput"
      upperString="Ingrese todas las personas que participan de las tareas, separadas por comas."
      placeholder="Ej: Josefa, Tomás, Ignacio, María"
      saveString="Ingresar personas"
      @save-objects="saveNames($event)"
    >
    </input-and-save>
    <input-and-save
      id="tasksInput"
      upperString="Ingrese todas las tareas a asignar, separadas por comas."
      placeholder="Ej: lavar, cocinar, limpiar"
      saveString="Ingresar tareas"
      @save-objects="saveTasks($event)"
    ></input-and-save>
    <input-and-save
      id="periodsInput"
      upperString="Ingrese los días de la semana en los que las tareas se asignan a las personas"
      placeholder="Ej: Lunes, Martes, Miércoles, Jueves, Viernes, Sábado, Domingo"
      saveString="Ingresar días"
      @save-objects="saveDays($event)"
    ></input-and-save>
    <div
      class="flex flex-col md:flex-row pt-10 md:pt-28 pb-10 space-y-5 md:space-y-0 md:space-x-10"
    >
      <label class="text-gray-700">
        <input
          type="checkbox"
          ref="restrictionsSelected"
          @click="uncheckRestrictions()"
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
        <input type="checkbox" ref="costsSelected" @click="uncheckCosts()" />
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
      class="bg-transparent hover:bg-blue-500 transition duration-500 ease-in-ou text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
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
import warningBox from "../components/warningBox.vue";
import axios from "axios";

export default {
  components: { inputAndSave, TheFooter, Tooltip, warningBox },
  data() {
    return {
      names: false,
      tasks: false,
      days: false,
      showWarning: false,
      eqRestrictions: false,
      assignCosts: false,
    };
  },
  methods: {
    saveNames(objects) {
      if (objects) {
        this.names = objects.split(",").map((name) => name.trim());
      }
    },
    saveTasks(objects) {
      if (objects) {
        this.tasks = objects.split(",").map((task) => task.trim());
      }
    },
    saveDays(objects) {
      if (objects) {
        this.days = objects.split(",").map((day) => day.trim());
      }
    },
    triggerWarning() {
      this.showWarning = true;
      setTimeout(() => (this.showWarning = false), 3000);
    },
    async nextPage() {
      if (!this.names || !this.tasks || !this.days) {
        this.triggerWarning();
      } else {
        if (this.assignCosts) {
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
        } else if (this.eqRestrictions) {
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

          const costs = Object.fromEntries(
            this.names.map((x) => [
              x,
              Object.fromEntries(this.tasks.map((y) => [y, 1])),
            ])
          );

          this.$router.push({
            name: "RestrictionAssigner",
            params: {
              names: this.names,
              tasks: this.tasks,
              days: this.days,
              eqRestrictions: this.eqRestrictions,
              assignCosts: this.assignCosts,
              costs: JSON.stringify(costs),
              restrictionsOptions: JSON.stringify(response.data),
            },
          });
        } else {
          // En este caso, no se requiere asignar costos ni valores de igualdad.
          const costs = Object.fromEntries(
            this.names.map((x) => [
              x,
              Object.fromEntries(this.tasks.map((y) => [y, 1])),
            ])
          );
          let problemParams = {
            names: this.names,
            tasks: this.tasks,
            days: this.days,
            costs: costs,
            min_assign_task: 1,
            max_assign_task: 1000,
            max_total_assign: 1000,
            min_total_assign: 1,
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
            console.log(
              "El problema es infactible con los valores que acabas de asignar. Prueba con otros e intentalo de nuevo :("
            );
          }
        }
      }
    },
    uncheckCosts() {
      this.assignCosts = !this.assignCosts;
    },
    uncheckRestrictions() {
      this.eqRestrictions = !this.eqRestrictions;
    },
  },
};
</script>

<style scoped>
.alert-enter-from {
  opacity: 0;
  transform: translateY(-60px);
}

.alert-enter-active {
  transition: all 0.3s ease;
}

.alert-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}
.alert-leave-active {
  transition: all 0.3s ease;
}
</style>
