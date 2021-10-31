<template>
  <div
    class="p-5 rounded-md shadow-xl fixed z-10 font-bold"
    :class="warning ? 'bg-red-300' : 'bg-green-300'"
  >
    <span>
      {{ message }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    message: String,
    warning: Boolean,
  },
};
</script>

<style lang="ts"></style>
