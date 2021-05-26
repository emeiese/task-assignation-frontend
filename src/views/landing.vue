<template>
  <div class="w-full flex flex-col pt-10">
    <div
      class="p-10 relative mx-auto bg-blue-100 items-center rounded-md border-4 border-blue-500"
    >
      <div class="align-middle p-10 flex justify-center">
        <img
          class="bg-blue-500 border-8 border-blue-500 w-1/6 rounded-full"
          alt="Pikachu logo"
          src="../assets/pikachu.jpg"
        />
      </div>
      <div class="bg-blue-500 rounded-full">
        <h1 class="p-10 font-mono text-5xl text-center text-white ">
          Bienvenido al asignador de Tareas 🗒️
        </h1>
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
  </div>
  <TheFooter/>
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
