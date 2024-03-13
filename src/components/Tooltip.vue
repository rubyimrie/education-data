<!-- Tooltip.vue -->
<template>
    <div v-if="show" class="tooltip" :style="{ top: y + 'px', left: x + 'px' }">
      {{ content }}
    </div>
  </template>
  
  <script>
  export default {
    props: {
      show: Boolean,
      content: String,
      x: Number,
      y: Number
    }
  };
  </script>
  
  <style scoped>
  .tooltip {
    position: absolute;
    z-index: 9999;
    background-color: white;
    border: 1px solid #ccc;
    padding: 5px;
  }
  </style>
  