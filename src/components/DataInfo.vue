<template>
  <div>
    <p class="mb-2">Date Published: {{ data.date }}</p>
    <p class="mb-4">Summary: {{ data.content }}</p>
    <p class="mb-4">Format: {{ data.format }}</p>
    <p class="mb-4">Link: <a :href="data.link" target="_blank" class="text-blue-500 hover:underline">{{ data.link }}</a></p>
    <p class="flex items-center mb-2">Publicly Available:
      <span>
        <svg v-if="data.available" class="tick-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path fill="#4CAF50" d="M18.585 3.414a2 2 0 0 0-2.828 0L8 11.172 4.243 7.415a2 2 0 0 0-2.828 2.828l4.949 4.95a2 2 0 0 0 2.828 0L18.585 6.243a2 2 0 0 0 0-2.829z"/>
        </svg>
        <svg v-else class="cross-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path fill="#F44336" d="M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm4.95 12.121l-1.414 1.415L10 11.414l-3.536 3.536-1.414-1.415L8.586 10l-3.535-3.536 1.414-1.415L10 8.586l3.536-3.535 1.414 1.414L11.414 10l3.536 3.536z"/>
        </svg>
      </span>
    </p>
    <!-- Display tags as buttons -->
    <div class="flex flex-wrap">
      <p class="mr-2">Tags: </p>
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

