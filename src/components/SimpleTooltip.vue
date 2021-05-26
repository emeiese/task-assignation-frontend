<template>
  <!-- recovered from https://qvault.io/javascript/creating-a-custom-tooltip-component-in-vue/ -->
  <div class="tooltip-box">
    <slot />
    <div
      class="tooltip"
    >
      <span
        class="text text-xs"
      >{{ text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: { 
    text: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.tooltip-box { 
  position: relative;
  display: inline-block;
}

.tooltip-box:hover .tooltip{
  opacity: 1;
}

.tooltip { 
  color: #ffffff;
  text-align: center;
  padding: 10px 10px;
  border-radius: 10px;
  
  width: 300px;
  bottom: 100%;
  left: 50%;
  margin-left: -200px;

  opacity: 0;
  transition: opacity 1s;

  position: absolute;
  z-index: 1;

  background: #4858e4;
}

.text::after {
  content: " ";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #4858e4 transparent transparent transparent;
}
</style>