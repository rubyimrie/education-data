<template>
    <div class="collapsible-box bg-cutty-sark-50" >
      <div class="collapsible-header bg-cutty-sark-700 text-cutty-sark-50" @click="toggleCollapse">
        {{ title }}
      </div>
      <div v-if="!collapsed" class="collapsible-content">
        <div class="button-container">
          <button 
            class="tab-btn  focus:outline-none"
            :class="{ 'active': showDataInfo }"
            @click="showDataInfo = true"
          >
          <span class="ml-2 mr-2" :class="{ 'active': showDataInfo }">The Data</span>
          </button>
          <button 
            class="tab-btn focus:outline-none"
            :class="{ 'active': !showDataInfo }"
            @click="showDataInfo = false"
          >
          <span class="ml-2 mr-2 "> Data Quality </span>
          </button>
        </div>
        <div class="mt-2">
        <div v-if="showDataInfo">
          <DataInfo :data="data" :toggleTagFilter="toggleTagFilter" :isTagSelected="isTagSelected" :selectedTags="selectedTags" :clearSelectedTags="clearSelectedTags"/>
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
      data: Object,
    isTagSelected: {
      type: Function,
      required: true
      },
    selectedTags: {
      type: Array,
      required: true
      },
    toggleTagFilter: {
      type: Function,
      required: true
    },
    clearSelectedTags: {
      type: Function,
      required: true
    }
    },
    components: {
      DataInfo,
      DataQuality
    },
    data() {
      return {
        collapsed: false,
        showDataInfo: true , // Initially show DataInfo
        selectedTags:[]
      };
    },
    methods: {
      toggleCollapse() {
        this.collapsed = !this.collapsed;
      },
      filterByTag(tag) {
      this.$emit('tag-filter', tag);
    },
    // handleTagClicked(tag) {
    //   const index = this.selectedTags.indexOf(tag);
    //   if (index === -1) {
    //     this.selectedTags.push(tag); // Add tag if not already selected
    //   } else {
    //     this.selectedTags.splice(index, 1); // Remove tag if already selected
    //   }
    // }
    handleTagClicked(tag) {
      this.$emit('tag-clicked', tag);
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
    cursor: pointer;
    border-radius: 5px;
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

}

.tab-btn.active {
  font-weight: 600;
  border-top-left-radius: 10px; /* Rounded top left corner */
  border-top-right-radius: 10px;
  box-shadow: 10px 0px 4px rgba(0, 0, 0, 0.2); /* Add shadow only at the top */
}
  </style>
  