<template>
    <div class="collapsible-box bg-cutty-sark-50" >
      <div class="collapsible-header bg-cutty-sark-700 text-cutty-sark-50 flex relative justify-between items-center" @click="toggleCollapse">
        {{ title }}
        <span v-html="collapsed ? chevronDownIcon : chevronUpIcon"></span>
      </div>
      <div v-if="!collapsed" class="collapsible-content">
        <div class="button-container">
          <button 
            class="tab-btn  focus:outline-none "
            :class="{ 'active': showDataInfo }"
            @click="showDataInfo = true"
          >
          <span class="ml-2 mr-2 font-semibold text-black" >The Data</span>
          </button>
          <button 
            class="tab-btn focus:outline-none font-weight-500"
            :class="{ 'active': !showDataInfo }"
            @click="showDataInfo = false"
          >
          <span class="ml-2 mr-2 font-semibold text-black"> Data Quality </span>
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
        selectedTags:[],
        chevronUpIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"/></svg>',
        chevronDownIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/></svg>',

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
    },
    computed:{
        chevronUpIcon() {
        return '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"/></svg>';
      },
      chevronDownIcon() {
        return '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/></svg>';
      },
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
  border-top-left-radius: 10px; /* Rounded top left corner */
  border-top-right-radius: 10px;
  border-top: 1px solid #ccc; /* Light grey border on top */
  border-left: 1px solid #ccc; /* Light grey border on top */
  border-right: 1px solid #ccc; /* Light grey border on top */
}

.tab-btn.active {
  border-top-left-radius: 10px; /* Rounded top left corner */
  border-top-right-radius: 10px;
  /* box-shadow: 10px 0px 4px rgba(0, 0, 0, 0.2);  */
  box-shadow: 3px -4px 4px rgba(0, 0, 0, 0.2); /* Add shadow only at the top */
  border-top: 1px solid #ccc; /* Light grey border on top */
  border-left: 1px solid #ccc; /* Light grey border on top */
  border-right: 1px solid #ccc; /* Light grey border on top */
  border-bottom: 2px solid #656565; 
}
  </style>
  