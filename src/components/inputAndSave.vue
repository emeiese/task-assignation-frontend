<template>
  <h1 class="text-center pt-10">
    {{ upperString }}
  </h1>
  <div class="relative flex md:w-1/2 flex-wrap items-stretch mb-3 pt-2">
    <input
      :id="id"
      type="text"
      v-model="objects"
      :placeholder="placeholder"
      class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"
    />
    <span
      class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3"
    >
      <i class="fas fa-user"></i>
    </span>
  </div>
  <button
    class="w-40 text-sm transition duration-500 ease-in-out bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
    @click="$emit('save-objects', objects)"
  >
    {{ saveString }}
  </button>
</template>

<script>
export default {
  props: {
    upperString: String,
    placeholder: String,
    saveString: String,
    id: String,
  },
};
</script>
