<template>
  <div class="w-full flex flex-col py-10 overflow-y-auto">
    <div
      class="w-5/6 p-10 relative mx-auto bg-blue-100 rounded-md border-4 border-blue-500"
    >
      <div class="align-middle p-10 flex justify-center">
        <img
          class="bg-blue-500 border-8 border-blue-500 w-1/6 rounded-full"
          alt="Pikachu logo"
          src="../assets/whale.png"
        />
      </div>
      <div class="flex flex-col items-center space-y-10">
        <div class="bg-blue-500 rounded-full">
          <h1 class="p-10 font-mono text-5xl text-center text-white tracking-wider">
            Asignador de Tareas 🗒️
          </h1>
        </div>
        <div class="flex flex-col items-center space-y-4"> 
          <span class="text-blue-700 font-bold tracking-wider">¿Qué es esto?</span>
          <div class="w-3/4 text-center">
            En mi familia siempre nos costó mucho organizarnos para hacer las
            tareas de la casa, así que se me ocurrió hacer esta página web para
            poder realizar una asignación automática según la cantidad de
            tareas, los días en los que estas se deben realizar y quienes
            participan de esta asignación de tareas.
          </div>
        </div>
      </div>
      <div class="flex justify-center p-20">
        <div class="flex-col">
          <router-link
            to="/assigner"
            class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          >
            Haz click aquí para empezar 👀️
          </router-link>
        </div>
      </div>
    </div>
    <TheFooter />
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import TheFooter from "../components/TheFooter.vue";

export default {
  name: "App",
  components: {
    TheFooter,
  },
};
</script>

<style scoped></style>
