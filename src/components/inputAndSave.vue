<template>
  <!-- TODO: Modificar esto para que tenga un formato parecido al de las restricciones
            es decir, que tenga numero y esté enmarcado en una caja.-->
  <div
    class="w-full m-2 p-2 border rounded-lg shadow-md flex flex-col items-center text-center"
  >
    <div class="flex flex-col items-center">
      <h1 class="text-center pt-5">
        {{ upperString }}
      </h1>
      <div class="relative flex items-center md:w-1/2 flex-wrap items-stretch mb-3 pt-2">
        <input
          :id="id"
          type="text"
          v-model="objects"
          :placeholder="placeholder"
          class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-5"
        />
        <span
          class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3"
        >
          <i class="fas fa-user"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    upperString: String,
    placeholder: String,
    saveString: String,
    id: String,
  },
  emits: ["save-objects"],
  data() {
    return {
      objects: "",
    };
  },
  watch: {
    objects: function(newValue) {
      this.$emit("save-objects", newValue);
    },
  },
};
</script>

<style scoped>
.circle-number {
  @apply mt-4 flex-shrink-0 w-8 h-8 font-bold text-lg text-white rounded-full bg-blue-500 flex items-center justify-center;
}
</style>
