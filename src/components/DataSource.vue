<template>
    <div class="collapsible-box bg-white" style="width: 75vw;">
      <div class="collapsible-header" @click="toggleCollapse">
        {{ title }}
      </div>
      <div v-if="!collapsed" class="collapsible-content">
        <div class="button-container">
          <button 
            class="tab-btn text-sm  focus:outline-none mr-4"
            :class="{ 'active': showDataInfo }"
            @click="showDataInfo = true"
          >
            Data Info
          </button>
          <button 
            class="tab-btn text-sm focus:outline-none"
            :class="{ 'active': !showDataInfo }"
            @click="showDataInfo = false"
          >
            Data Quality
          </button>
        </div>
        <div class="mt-2">
        <div v-if="showDataInfo">
          <DataInfo :data="data" />
        </div>
        <div v-else>
          <DataQuality :data="data" />
        </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import DataInfo from './DataInfo.vue';
  import DataQuality from './DataQuality.vue';
  import '../index.css'
  
  export default {
    props: {
      title: String,
      data: Object
    },
    components: {
      DataInfo,
      DataQuality
    },
    data() {
      return {
        collapsed: false,
        showDataInfo: true  // Initially show DataInfo
      };
    },
    methods: {
      toggleCollapse() {
        this.collapsed = !this.collapsed;
      }
    }
  };
  </script>
  
  <style scoped>
  .collapsible-box {
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .collapsible-header {
    padding: 10px;
    background-color: #f0f0f0;
    cursor: pointer;
  }
  
  .collapsible-content {
    padding: 10px;
  }
  .button-container {
  display: flex;
  border-bottom: 1px solid #ccc; /* Add light grey underline */
}
  .switch-container {
    display: flex;
    justify-content: center;
  }
  
  .tab-btn {
  padding: 6px 6px;
  border: none;
}

.tab-btn.active {
  font-weight: 500;
}
  </style>
  