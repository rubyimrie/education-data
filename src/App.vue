<template>
  <div class="bg-gray-100 flex flex-col h-screen">
    <h1 class="text-5xl font-semibold p-4">Education in Afghanistan - The Data</h1>
    <div class="container mx-auto px-4 py-8 flex-grow">
      <div class="flex justify-between items-center mb-4">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search for data source..."
            class="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
          />
          <span v-if="!isMatched && searchQuery !== ''">Not found</span>
          <span v-if="isMatched" class="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4 text-green-500">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.293-8.707a1 1 0 011.414 0L12 10.586l3.293-3.293a1 1 0 111.414 1.414L13.414 12l3.293 3.293a1 1 0 01-1.414 1.414L12 13.414l-3.293 3.293a1 1 0 01-1.414-1.414L10.586 12l-3.293-3.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </span>
        </div>
        <div>
          <select v-model="sortOrder" class="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500">
            <option value="recent">Recent first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>
      </div>
      <div v-for="(source, index) in sortedDataSources" :key="index" ref="dataSourceRefs" class="mb-10">
        <div :class="{ 'border-blue-500 border': matchedIndex === index }">
          <DataSource :title="source.title" :data="source.data" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataSource from './components/DataSource.vue'; // Import your DataSource component

export default {
  components: {
    DataSource
  },
  data() {
    return {
      searchQuery: '',
      sortOrder: 'recent',
      dataSources: [
        {
          title: 'Whole of Afghanistan Assessment 2022',
          data: {
            date: '2022-09-20',
            content: 'The progressive shift in the drivers of humanitarian needs, from conflict and Covid-19 to economic shocks and drought, continues to be observed throughout 2022. Exposure to, as well as impact of these shocks, are felt across all population groups, suggesting similar levels of vulnerability. Yet, key differences observed between rural, urban and refugee populations highlight the need of a targeted response.',
            coverage: 98.72,
            coverageInfo: 'No data collected in Kandahar Urban Center due to access constraints',
            timeliness: '20/09/2022',
            format: 'PDF',
            link: 'https://reliefweb.int/report/afghanistan/whole-afghanistan-assessment-2022-key-findings-presentation-inter-cluster-coordination-team-kabul-20-september-2022',
            updated: 'Yearly',
            collection: ['House Hold Survey', 'Key Informant Interviews'],
            internal: 'TRUE',
            available: 'TRUE',
            type: 'Ad-hoc'
          }
        },
        {
          title: 'Data Source 2',
          data: {
            date: '2024-02-22',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.',
            coverage: 90,
            coverageInfo: 'No data collected in Kandahar Urban Center due to access constraints',
            collection: ['Administrative'],
            timeliness: '95%',
            updated: 'Never',
            type: 'Global'
          }
        },
        {
          title: 'Data Source 2',
          data: {
            date: '2024-02-22',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.',
            coverage: 90,
            coverageInfo: 'No data collected in Kandahar Urban Center due to access constraints',
            timeliness: '95%',
            updated: 'Never',
            type: 'National'
          }
        }
      ],
      matchedIndex: -1
    };
  },
  computed: {
    matchedDataSource() {
      if (!this.searchQuery.trim()) return null;
      const query = this.searchQuery.trim().toLowerCase();
      return this.dataSources.find(source => source.title.toLowerCase().includes(query));
    },
    isMatched() {
      return !!this.matchedDataSource;
    },
    sortedDataSources() {
      const sorted = [...this.dataSources];
      if (this.sortOrder === 'recent') {
        sorted.sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
      } else if (this.sortOrder === 'oldest') {
        sorted.sort((a, b) => new Date(a.data.date) - new Date(b.data.date));
      }
      return sorted;
    }
  },
  watch: {
    matchedDataSource(value) {
      if (value) {
        const index = this.dataSources.findIndex(source => source === value);
        this.matchedIndex = index;
        this.$nextTick(() => {
          this.$refs.dataSourceRefs[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      } else {
        this.matchedIndex = -1;
      }
    }
  }
};
</script>

<style>
/* Add your global styles here */
</style>
