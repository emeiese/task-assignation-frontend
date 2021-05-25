<template>
  <div class="w-full flex flex-col m-10 items-center mx-auto">
    <input-and-save
      id="namesInput"
      upperString="Ingrese todas las personas que participan de las tareas, separadas por comas."
      placeholder="Ejemplo: Josefa, Tomás, Ignacio, María"
      saveString="Guardar personas"
      @save-objects="saveNames($event)"
    >
    </input-and-save>
    <input-and-save
      id="shoresInput"
      upperString="Ingrese todas las tareas a asignar, separadas por comas."
      placeholder="Ejemplo: lavar, cocinar, limpiar"
      saveString="Guardar tareas"
      @save-objects="saveShores($event)"
    ></input-and-save>
    <input-and-save
      id="periodsInput"
      upperString="Ingrese los días de la semana en los que las tareas se asignan a las personas"
      placeholder="Ejemplo: Lunes, Martes, Miércoles, Jueves, Viernes, Sábado, Domingo"
      saveString="Guardar días"
    ></input-and-save>
    <div class="flex-col absolute bottom-0 items-center">
      <img
        class=""
        alt="Pikachu sprite"
        src="../assets/pikachu_sprite.png"
        title="Holi, soy un pikachu gordito"
      />
      <!-- <h3>
        Made with love by https://github.com/emeiese
      </h3> -->
    </div>
  </div>
</template>

<script>
import inputAndSave from "../components/inputAndSave.vue";
export default {
  components: { inputAndSave },
  data() {
    return {
      names: [],
      shores: [],
      showShoreInput: false,
    };
  },
  methods: {
    saveNames(objects) {
      this.names = objects.split(",").map((name) => name.trim());
      console.log(this.names);
    },
    saveShores(objects) {
      this.shores = objects.split(",").map((shore) => shore.trim());
      console.log(this.shores);
    },
  },
};
</script>

<style scoped></style>
