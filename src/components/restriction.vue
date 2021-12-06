<template>
  <div
    class="border rounded-lg shadow-md p-8 flex flex-col space-y-3 w-3/4 items-center text-center text-xl"
  >
    <div class="flex flex-row items-center">
      <div class="flex flex-row items-center space-x-3">
        <div class="flex flex-row items-center">
          <span class="circle-number">{{ id }}</span>
          <span class="pl-2 pt-1 font-medium">
            {{ headerText }}
          </span>
        </div>
      </div>
    </div>
    <span
      ><b>Ejemplo: </b> <i>{{ example }}</i></span
    >
    <span class="text-xs text-gray-400">[<b>Tip:</b> {{ tipText }} ]</span>
    <select
      class="bg-white flex w-12 h-8 border-4 font-bold text-blue-500 rounded-md focus:ring"
      @click="$emit('send-option', selectedValue)"
      v-model="selectedValue"
    >
      >
      <option
        class="text-blue-300"
        v-for="option in restrictionsOptions"
        :key="option.value"
        v-bind:value="option.value"
        >{{ option.value }}</option
      >
    </select>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    valueName: String,
    defaultValue: [Number, Boolean],
    headerText: String,
    example: String,
    tipText: String,
    restrictionsOptions: Array,
  },
  data() {
    return {
      selectedvalue: this.defaultValue,
      tasksRepetition: false,
    };
  },
};
</script>
<style scoped>
.circle-number {
  @apply mt-1 flex-shrink-0 w-8 h-8 font-bold text-lg text-white rounded-full bg-blue-500 flex items-center justify-center;
}
</style>
