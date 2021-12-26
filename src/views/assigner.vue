<template>
  <div class="w-full flex flex-col px-4 md:px-0 md:m-5 items-center mx-auto">
    <info-box
      v-if="showRestrictionInfo"
      infoString="Las restricciones de justicia permiten que las tareas se asignen de manera más justa entre todos
            los participantes a través de los días. Si no seleccionas esta opción, puede que tus asignaciones sean un poco injustas 😮️"
      titleString="Restricciones de Justicia"
      @close="showRestrictionInfo = false"
    />
    <info-box
      v-if="showCostsInfo"
      infoString="Los costos por cada tarea por persona reflejan qué tanto le cuesta a cada persona hacer una tarea.
            Si no seleccionas esta opción, se asignará costo 1 para cada tarea por defecto 👀️"
      titleString="Asignación de Costos"
      @close="showCostsInfo = false"
    />
    <transition name="alert">
      <pop-box
        v-if="showWarning"
        message="Recuerda que debes ingresar una lista de personas, tareas y días."
        :warning="true"
      />
    </transition>
    <div class="w-3/4 md:w-1/2 space-y-4">
      <input-and-save
        v-for="inputItem in inputsList"
        :key="inputItem.id"
        :id="inputItem.id"
        :upperString="inputItem.upperString"
        :placeholder="inputItem.placeholder"
        :saveString="inputItem.saveString"
        @save-objects="save({ type: inputItem.type, list: $event })"
      />
    </div>
    <div
      class="flex flex-col md:flex-row pt-10 pb-10 space-y-5 md:space-y-0 md:space-x-10"
    >
      <div class="text-gray-700 flex flex-row items-center space-x-1">
        <input
          type="checkbox"
          ref="restrictionsSelected"
          @click="uncheckRestrictions()"
        />
        <span class="ml-1"
          >Agregar
          <span class="font-bold">
            restricciones de justicia
          </span>
        </span>
        <img
          src="../assets/icons/information-circle.svg"
          alt="Information sign"
          class="h-4 w-4 cursor-pointer"
          @click="showRestrictionInfo = true"
        />
      </div>
      <div class="text-gray-700 flex flex-row items-center space-x-1">
        <input type="checkbox" ref="costsSelected" @click="uncheckCosts()" />
        <span class="ml-1"
          >Agregar
          <span class="font-bold">
            costos por cada tarea
          </span>
        </span>
        <img
          src="../assets/icons/information-circle.svg"
          alt="Information sign"
          class="h-4 w-4 cursor-pointer"
          @click="showCostsInfo = true"
        />
      </div>
    </div>
    <button
      class="bg-transparent hover:bg-blue-500 transition duration-500 ease-in-ou text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      @click="nextPage()"
    >
      Continuar
    </button>
    <transition name="alert">
      <pop-box
        v-if="infactible"
        message="Tu problema es infactible con los valores que insertaste 😢️, prueba con otros e inténtalo de nuevo."
        :warning="true"
      />
      <pop-box
        v-else-if="continueMessage"
        message="Espera unos segundos mientras te redirijo a la siguiente página..."
        :warning="false"
      />
    </transition>
  </div>
  <TheFooter />
</template>

<script>
import inputAndSave from "../components/inputAndSave.vue";
import TheFooter from "../components/TheFooter.vue";
import popBox from "../components/popBox.vue";
import axios from "axios";
import InfoBox from "../components/infoBox.vue";

export default {
  components: { inputAndSave, TheFooter, popBox, InfoBox },
  data() {
    return {
      showRestrictionInfo: false,
      showCostsInfo: false,
      names: false,
      tasks: false,
      days: false,
      showWarning: false,
      eqRestrictions: false,
      assignCosts: false,
      continueMessage: false,
      infactible: false,
      inputsList: [
        {
          id: "1",
          upperString:
            "Ingrese todas las personas que participan de las tareas, separadas por comas.",
          placeholder: "Ej: Josefa, Tomás, Ignacio, María",
          saveString: "Ingresar personas",
          type: "namesInput",
        },
        {
          id: "2",
          upperString:
            "Ingrese todas las tareas a asignar, separadas por comas.",
          placeholder: "Ej: lavar, cocinar, limpiar",
          saveString: "Ingresar tareas",
          type: "tasksInput",
        },
        {
          id: "3",
          upperString:
            "Ingrese los períodos en los que las tareas se asignan a las personas.",
          placeholder:
            "Ej: Lunes, Martes, Miércoles, Jueves, Viernes, Sábado, Domingo",
          saveString: "Ingresar días",
          type: "daysInput",
        },
      ],
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
    save(object) {
      if (object.type == "namesInput") {
        this.saveNames(object.list);
      }
      if (object.type == "tasksInput") {
        this.saveTasks(object.list);
      }
      if (object.type == "daysInput") {
        this.saveDays(object.list);
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
        this.continueMessage = true;
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
            this.apiLink + "/get_restriction_options",
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
            max_assign_task: false,
            max_total_assign: false,
            min_total_assign: 1,
          };

          // Esto debería ser una función. Llamémosla function2()
          const response = await axios.post(
            this.apiLink + "/resolve/",
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
            this.continueMessage = false;
            this.infactible = true;
            setTimeout(() => (this.infactible = false), 3000);
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
  transition: all 0.4s ease;
}

.alert-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}
.alert-leave-active {
  transition: all 0.4s ease;
}
</style>
