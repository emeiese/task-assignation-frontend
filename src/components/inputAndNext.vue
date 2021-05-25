<template>
  <h1 class="p-3">
    Ingrese todas las personas que participan de las tareas, separadas por
    comas.
  </h1>
  <div class="relative flex w-1/2 flex-wrap items-stretch mb-3">
    <input
      id="namesInput"
      type="text"
      v-model="names"
      placeholder="Ejemplo: Josefa, Tomás, Ignacio, María"
      class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"
    />
    <span
      class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3"
    >
      <i class="fas fa-user"></i>
    </span>
  </div>
  <button
    class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
    @click="saveNames()"
  >
    Guardar
  </button>
</template>

<script>
export default {
  props: {
    upperString: String,
    placeholder: String,
  },
  data() {
    return {
      names: [],
      showShoreInput: false,
    };
  },
  methods: {
    saveNames() {
      const stringNames = document.getElementById("namesInput").value;
      this.names = stringNames.split(",").map((name) => name.trim());
      console.log(this.names);
    },
  },
};
</script>
