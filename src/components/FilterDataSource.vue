<template>
  <div class="bg-gray-200 flex flex-col h-screen m-5">
    <div class="container mx-auto px-4 py-8 flex-grow flex">
      <div class="pr-4">
        <!-- Year Filter -->
        <div class="mb-4">
          <h3 class="text-lg font-semibold mb-2">Year</h3>
          <label v-for="year in availableYears" :key="year" class="flex items-center">
            <input type="checkbox" v-model="selectedYears" :value="year" class="mr-2">
            {{ year }}
          </label>
        </div>
        <!-- Type Filter -->
        <div class="mb-4">
          <h3 class="text-lg font-semibold mb-2">Type</h3>
          <label v-for="datatype in availableTypes" :key="datatype" class="flex items-center">
            <input type="checkbox" v-model="selectedTypes" :value="datatype" class="mr-2">
            {{ datatype }}
          </label>
        </div>
        <!-- Collection Filter -->
        <div>
          <h3 class="text-lg font-semibold mb-2">Collection</h3>
          <label v-for="collection in availableCollections" :key="collection" class="flex items-center">
            <input type="checkbox" v-model="selectedCollections" :value="collection" class="mr-2">
            {{ collection }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  props: {
    dataSources: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectedYears: [],
      selectedTypes: [],
      selectedCollections: [],
    };
  },
  methods: {
    emitFilteredData() {
      this.$emit('filtered', this.filteredDataSources);
    }
  }
  ,
  computed: {
    filteredDataSources() {
      let filteredSources = [...this.dataSources];

      // Filter by selected years
      if (this.selectedYears.length > 0) {
        filteredSources = filteredSources.filter(source => this.selectedYears.includes(source.data.year));
      }

      // Filter by selected types
      if (this.selectedTypes.length > 0) {
        filteredSources = filteredSources.filter(source => this.selectedTypes.includes(source.data.datatype));
      }

      // Filter by selected collections
      if (this.selectedCollections.length > 0) {
        filteredSources = filteredSources.filter(source => source.data.collection.some(collection => this.selectedCollections.includes(collection)));
      }

      return filteredSources;
    },
    availableYears() {
      return [...new Set(this.dataSources.map(source => source.data.year))];
    },
    availableTypes() {
      // Extract types from data sources and return unique values
      return [...new Set(this.dataSources.map(source => source.data.datatype))];
    },
    availableCollections() {
      // Extract collections from data sources and return unique values
      const collections = this.dataSources.flatMap(source => source.data.collection);
      return [...new Set(collections)];
    }
  },
  watch: {
    selectedYears: {
      handler() {
        this.emitFilteredData();
      },
      deep: true
    },
    selectedTypes: {
      handler() {
        this.emitFilteredData();
      },
      deep: true
    },
    selectedCollections: {
      handler() {
        this.emitFilteredData();
      },
      deep: true
    }
  }
};
</script>

<style>
/* Add your global styles here */
</style>
