<template>
  <div class="default text-black text-sm">
    <p class="mb-2 ml-1"><span class="font-semibold">Date Published:</span> {{ data.published }}</p>
    <p class="mb-4 ml-1"><span class="font-semibold">Summary:</span> {{ data.content }}</p>
    <p class="mb-4 ml-1"><span class="font-semibold">Format Available:</span> <span class="bg-cutty-sark-600 text-white rounded px-2">{{ data.format }}</span></p>
    <p class="mb-4 ml-1"><span class="font-semibold">Link:</span> <a :href="data.link" target="_blank" class="text-blue-500 hover:underline">Click Here</a></p>
    <div @mouseover="showAvailableInfo = true" @mouseleave="showAvailableInfo = false" class="relative">
      <div class="inline-flex flex justify-center items-center relative mb-4 ml-1">
        <h3 class=" font-semibold flex relative">
          <span class="font-semibold inline-flex">Publicly Available: <img width="20" height="20" src="https://img.icons8.com/windows/32/info-squared.png" alt="info-squared"/>: </span>
        </h3>
        <span >
          <svg v-if="data.available==='TRUE'" class="tick-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="#4CAF50" d="M18.585 3.414a2 2 0 0 0-2.828 0L8 11.172 4.243 7.415a2 2 0 0 0-2.828 2.828l4.949 4.95a2 2 0 0 0 2.828 0L18.585 6.243a2 2 0 0 0 0-2.829z"/></svg>
          <svg v-else class="cross-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="#F44336" d="M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm4.95 12.121l-1.414 1.415L10 11.414l-3.536 3.536-1.414-1.415L8.586 10l-3.535-3.536 1.414-1.415L10 8.586l3.536-3.535 1.414 1.414L11.414 10l3.536 3.536z"/></svg>
        </span>
        <span v-if="data.available !== 'TRUE'" class="text-sm ml-2">  This data is available by request only</span>
      </div>
    <div v-if="showAvailableInfo" class="absolute bg-white border border-gray-300 p-2 rounded-lg shadow-md" style="width: 30vw;">
              {{ availableInfo }}
          </div>
    </div>
    <p class="mb-4 ml-1"><span class="font-semibold">Field Names: </span>{{ data.fields }}</p>
    <!-- Display tags as buttons -->
    <div class="flex flex-wrap">
      <p class="mr-2 ml-1"><span class="font-semibold">Tags: </span></p>
      <button v-for="(tag, index) in data.tags" 
        :key="index"
        class="mr-2 mb-2 px-3 py-1 bg-cutty-sark-400 text-white text-sm rounded-md hover:bg-cutty-sark-600"
        @click="handleTagClick(tag)"
        >
        {{ tag }}</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
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
  data() {
      return {
        showAvailableInfo: false,
        availableInfo: 'To find or request the data follow the link above.'
      }},
  methods: {
    // Emit event when a tag is clicked
    handleTagClick(tag) {
      console.log("Clicked tag:", tag);
      console.log("Before clearing selected tags:", this.selectedTags);
      this.clearSelectedTags();
      console.log("After clearing selected tags:", this.selectedTags);
      this.toggleTagFilter(tag);
      console.log("New Tag:", this.selectedTags);
    },
  }
};
</script>

<style scoped>

    .tick-icon, .cross-icon {
    width: 20px;
    height: 20px;
    margin-left: 5px;
    }

    .default
    {color: black;}

</style>