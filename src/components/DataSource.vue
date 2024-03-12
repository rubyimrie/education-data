<template>
    <div class="collapsible-box bg-cutty-sark-50" >
      <div class="collapsible-header bg-cutty-sark-700 text-cutty-sark-50" @click="toggleCollapse">
        {{ title }}
      </div>
      <div v-if="!collapsed" class="collapsible-content">
        <div class="button-container">
          <button 
            class="tab-btn  focus:outline-none mr-4"
            :class="{ 'active': showDataInfo }"
            @click="showDataInfo = true"
          >
            The Data
          </button>
          <button 
            class="tab-btn focus:outline-none"
            :class="{ 'active': !showDataInfo }"
            @click="showDataInfo = false"
          >
            Data Quality
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
  border: none;
}

.tab-btn.active {
  font-weight: 500;
}
  </style>
  