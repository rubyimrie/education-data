<template>
  <div class="bg-cutty-sark-100 flex flex-col ml-20 mr-20 grid-container  min-w-[1200px]">
    <PageHeading class="sticky top-0 z-10"/>
    <div class="container mx-auto px-4 pt-4 flex-grow  h-auto  min-w-[1100px] "  >
      <div class="gap-8 grid grid-cols-12" >
        <!-- First column -->
        <div class="col-span-3 flex-col pr-4 bg-cutty-sark-200  min-w-[170px]  ml-6 sticky top-0 z-10 flex-grow overflow-y-auto" style="max-height: calc(75vh);">
          <h1 class="text-3xl ml-6 mt-6 text-cutty-sark-700">Filters</h1>
          <!-- FILTERS -->
          <div class="  flex-col h-screen ml-5 mb-5 default text-black">
            <div class="container mx-auto px-4 py-8 flex-grow flex">
              <div class="pr-4">
                <!-- Button -->
                <button @click="resetFilters" class="text-cutty-sark-600 hover:text-cutty-sark-700 underline">Reset Filters</button>
                <!-- Year Filter -->
                <div class="mb-4">
                  <h3 class="text-lg font-semibold mb-2 flex items-center justify-between cursor-pointer" @click="toggleYearFilter">
                    Year
                    <span v-html="isYearFilterCollapsed ? chevronDownIcon : chevronUpIcon"></span>
                  </h3>
                  <div v-show="!isYearFilterCollapsed" class="ml-4">
                    <label v-for="year in availableYears" :key="year" class="flex items-center">
                      <input type="checkbox" v-model="selectedYears" :value="year" class="mr-2">
                      {{ year }}
                    </label>
                  </div>
                </div>
                <!-- Type Filter -->
                <div class="mb-4">
                  <h3 class="text-lg font-semibold mb-2 flex items-center justify-between cursor-pointer" @click="toggleTypeFilter">
                    Type
                    <span v-html="isTypeFilterCollapsed ? chevronDownIcon : chevronUpIcon"></span>
                  </h3>
                  <div v-show="!isTypeFilterCollapsed" class="ml-4">
                    <label v-for="datatype in availableTypes" :key="datatype" class="flex items-center">
                      <input type="checkbox" v-model="selectedTypes" :value="datatype" class="mr-2">
                      {{ datatype }}
                    </label>
                  </div>
                </div>
                <!-- Collection Filter -->
                <div class="mb-4">
                  <h3 class="text-lg font-semibold mb-2 flex items-center justify-between cursor-pointer" @click="toggleCollectionFilter">
                    Collection Method
                    <span v-html="isCollectionFilterCollapsed ? chevronDownIcon : chevronUpIcon"></span>
                  </h3>
                  <div v-show="!isCollectionFilterCollapsed" class="ml-4">
                    <label v-for="collection in availableCollections" :key="collection" class="flex items-center">
                      <input type="checkbox" v-model="selectedCollections" :value="collection" class="mr-2">
                      {{ collection }}
                    </label>
                  </div>
                </div>
                <!-- Availability Filter -->
                <div class="mb-4">
                  <h3 class="text-lg font-semibold mb-2 flex items-center justify-between cursor-pointer" @click="toggleAvailabilityFilter">
                    Publicly Available
                    <span v-html="isAvailabilityFilterCollapsed ? chevronDownIcon : chevronUpIcon"></span>
                  </h3>
                  <div v-show="!isAvailabilityFilterCollapsed" class="ml-4">
                    <label v-for="availability in availableAvailabilities" :key="availability" class="flex items-center">
                      <input type="checkbox" v-model="selectedAvailability" :value="availability" class="mr-2">
                      {{ availability }}
                    </label>
                  </div>
                </div>

                <!-- Provider Filter -->
                <div class="mb-4">
                  <h3 class="text-lg font-semibold mb-2 flex items-center justify-between cursor-pointer" @click="toggleProviderFilter">
                    Data Provider
                    <span v-html="isProviderFilterCollapsed ? chevronDownIcon : chevronUpIcon"></span>
                  </h3>
                  <div v-show="!isProviderFilterCollapsed" class="ml-4">
                    <label v-for="provider in availableProviders" :key="provider" class="flex items-center">
                      <input type="checkbox" v-model="selectedProviders" :value="provider" class="mr-2">
                      {{ provider }}
                    </label>
                  </div>
                </div>

                <!-- Updated Filter -->
                <div class="mb-4">
                  <h3 class="text-lg font-semibold mb-2 flex items-center justify-between cursor-pointer" @click="toggleUpdatedFilter">
                    Updated
                    <span v-html="isUpdatedFilterCollapsed ? chevronDownIcon : chevronUpIcon"></span>
                  </h3>
                  <div v-show="!isUpdatedFilterCollapsed" class="ml-4">
                    <label v-for="updated in availableUpdated" :key="updated" class="flex items-center">
                      <input type="checkbox" v-model="selectedUpdated" :value="updated" class="mr-2">
                      {{ updated }}
                    </label>
                  </div>
                </div>

                <!-- Disaggregated By Filter -->
                <div class="mb-4">
                  <h3 class="text-lg font-semibold mb-2 flex items-center justify-between cursor-pointer" @click="toggleDisagFilter">
                    Disaggregated By
                    <span v-html="isDisagFilterCollapsed ? chevronDownIcon : chevronUpIcon"></span>
                  </h3>
                  <div v-show="!isDisagFilterCollapsed" class="ml-4">
                    <label v-for="dis in availableDisag" :key="dis" class="flex items-center">
                      <input type="checkbox" v-model="selectedDisag" :value="dis" class="mr-2">
                      {{ capitalizeFirstLetter(dis) }}
                    </label>
                  </div>
                </div>

                <!-- Tags -->
                <div class="mb-4">
                  <h3 class="text-lg font-semibold mb-2 flex items-center justify-between cursor-pointer" @click="toggleTagsFilter">
                    Tags
                    <span v-html="isTagsFilterCollapsed ? chevronDownIcon : chevronUpIcon"></span>
                  </h3>
                  <div v-show="!isTagsFilterCollapsed" class="ml-4">
                    <!-- Display tags as buttons for filtering -->
                    <div class="flex flex-wrap">
                      <button v-for="(tag, index) in availableTags" :key="index" 
                              :class="{ 'bg-cutty-sark-600 text-white': isTagSelected(tag) }"
                              @click="toggleTagFilter(tag)"
                              class="mr-2 mb-2 px-3 py-1 bg-cutty-sark-400 hover:bg-cutty-sark-600 text-white text-sm rounded-md">
                        {{ tag }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Second column -->
        <div class="col-span-9 md:min-w-screen-md  min-w-[750px] mr-6">
          <div class="flex justify-between items-center mb-2 sticky top-0 z-10 bg-cutty-sark-100">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search for data source..."
                class="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
              />
              <span v-if="!isMatched && searchQuery !== ''">Not found</span>
              <span v-if="isMatched" class="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg class="h-4 w-f" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path fill="#4CAF50" d="M18.585 3.414a2 2 0 0 0-2.828 0L8 11.172 4.243 7.415a2 2 0 0 0-2.828 2.828l4.949 4.95a2 2 0 0 0 2.828 0L18.585 6.243a2 2 0 0 0 0-2.829z"/>
                </svg>
              </span>
            </div>
            <div class="border border-gray-300 px-3 py-2 rounded-md bg-white flex relative hover:bg-slate-100">
              <router-link to="/education-data/userguide">User Guide</router-link>
              <img width="20" height="20" style="margin-left: 4px;" src="https://img.icons8.com/ios/50/user-manual.png" alt="user-manual"/>
            </div>
            <div class="border border-gray-300 px-3 py-2 rounded-md bg-white flex relative hover:bg-slate-100">
              <router-link to="/education-data/feedback">Feedback</router-link>
              <img width="20" height="20" style="margin-left: 4px;" src="https://img.icons8.com/ios/50/filled-speech-bubble-with-dots--v1.png" alt="filled-speech-bubble-with-dots--v1"/>
            </div>
            <div>
              <select v-model="sortOrder" class="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500">
                <option value="recent">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </div>
          </div>
          <div class="overflow-y-auto" style="max-height: calc(70vh);">
          <div v-for="(source, index) in sortedDataSources" :key="index" ref="dataSourceRefs" class="m-2">
            <div :class="{ 'border-blue-500 border': matchedIndex === index }">
              <DataSource :title="source.title" :data="source.data" :toggleTagFilter="toggleTagFilter" :isTagSelected="isTagSelected" :selectedTags="selectedTags" :clearSelectedTags="clearSelectedTags"/>
            </div>
          </div>
        </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import DataSource from '../components/DataSource.vue'; // Import your DataSource component
import FilterDataSource from '../components/FilterDataSource.vue';
import PageHeading from '../components/PageHeading.vue';

export default {
  components: {
    DataSource,
    FilterDataSource,
    PageHeading
  },
  data() {
    return {
      searchQuery: '',
      sortOrder: 'recent',
      selectedYears: [], // Define selectedYears array
      selectedTypes: [], // Define selectedTypes array
      selectedCollections: [], // Define selectedCollections array
      selectedAvailability: [], // Define selectedAvailability array
      selectedProviders: [], // Define selectedProviders array
      selectedUpdated: [],
      selectedTags: [], 
      selectedDisag: [], 
      matchedIndex: -1, // Define matchedIndex property
      // COLLAPSABLE FILTERS
      isYearFilterCollapsed: false,
      isTypeFilterCollapsed: false,
      isCollectionFilterCollapsed: false,
      isAvailabilityFilterCollapsed: true,
      isProviderFilterCollapsed: true,
      isUpdatedFilterCollapsed: true,
      isDisagFilterCollapsed: true,
      isTagsFilterCollapsed: true,
      // Define other collapsed states for other filter sections
      chevronUpIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"/></svg>',
      chevronDownIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/></svg>',
      dataSources: [
      {
          title: 'Whole of Afghanistan Assessment 2021 (Mock)',
          data: {
            date: '2021-09-20',
            published: '06/02/2022',
            year: '2021',
            content: 'The Annual Whole of Afghanistan Assessment 2021 (WoAA 2021) is a comprehensive survey conducted through in-person interviews with households across Afghanistan. It gathers data on various aspects of household needs, including health, education, nutrition, water, sanitation, hygiene (WASH), food security, as well as vulnerabilities to shocks and protection concerns. ',
            coverage: 98.72,
            coverageInfo: 'No data collected in Kandahar Urban Center due to access constraints',
            timeliness: '30/07/2021 - 04/09/2021',
            format: 'XLSX',
            link: 'https://data.humdata.org/dataset/annual-whole-of-afghanistan-assessment-woaa-2022-household-dataset#',
            updated: 'Yearly',
            collection: ['Head of House Hold Survey','Key Informant Interviews'],
            samplesize:['17,262','10,529'],
            internal: 'TRUE',
            available: 'FALSE',
            datatype: 'National',
            provider: 'REACH Initiative',
            versions:['Whole of Afghanistan Assessment 2022','Whole of Afghanistan Assessment 2023'],
            confidence:{national:90,urban:91,rural:93,refugee:90},
            margin:{national:5,urban:9,rural:9,refugee:7},
            tags:['Displacement','Education','Food','Security','Health','Internally Displaced Persons (IDP)','Livelihoods','Needs Assessment','Population','Refugees'],
            fields:'Household main data, household roster data, children under 2 data, children under 5 data, and disability data',
            disag:['gender','disability','regions','population','Urban/Rural'],
            populationGroups:['Recent IDPs','Recent Returnees','Refugees','Host Community','Non-recently Displaced'],
            educationGroups:[],
            ageGroups:[],
          }
        },
        {
          title: 'UNESCO SDG4  Data Explorer 2021 (Mock)',
          data: {
            date: '2021-09-20',
            published: '25/04/2022',
            year: '2021',
            content: 'The SDG4 Data Explorer is a digital platform providing comprehensive access to data and statistics related to Sustainable Development Goal 4 (SDG4) on quality education, facilitating analysis and monitoring of progress towards achieving educational targets globally.',
            coverage: 95,
            coverageInfo: 'No data collected in Kandahar Urban Center due to access constraints',
            timeliness: '01/01/2021 - 31/12/2021',
            format: 'CSV',
            link: 'http://sdg4-data.uis.unesco.org/',
            updated: 'Yearly',
            collection: ['Administrative'],
            samplesize:['NA'],
            internal: 'TRUE',
            available: 'TRUE',
            datatype: 'Global',
            provider: 'UNESCO',
            versions:['SDG4 2015'],
            confidence:{national:95,urban:90,rural:90,refugee:90},
            margin:{national:5,urban:9,rural:9,refugee:7},
            tags:['Education','Government Expenditure','Out of School Rates','Participation Rate','Educational Attainment Rate','Youth literacy rate','Population','Refugees','Electricity','Sanitation','Drinking Water','Sanitation'],
            fields:'Government expenditure on education as a percentage of GDP (%),Expenditure on education as a percentage of total government expenditure (%), Gross intake ratio to the last grade, Out-of-school rate, Participation rate of youth and adults, Educational attainment rate, adjusted gender parity index (GPIA), Youth literacy rate, Extent to which (i) global citizenship education and (ii) education for sustainable development are mainstreamed in curricula,Proportion of schools with single-sex basic sanitation facilities (%), Proportion of schools with basic handwashing facilities (%), Proportion of  with access to electricity (%),Proportion of schools with access to basic drinking water (%), Volume of official development assistance flows for scholarships by sector and type of study, constant US$, Percentage of qualified teachers',
            disag:['gender','provinces','regions','Urban/Rural','population','education','age'],
            populationGroups:['Richest Quintile','Second Quintile','Middle Quintline','Fourth Quintile','Poorest Quintile'],
            educationGroups:['Primary','Lower Secondary','Upper Secondary'],
            ageGroups:['16-24','25+'],
          }
        },
        {
          title: 'Whole of Afghanistan Assessment 2022',
          data: {
            date: '2022-09-20',
            published: '06/02/2023',
            year: '2022',
            content: 'The Annual Whole of Afghanistan Assessment 2022 (WoAA 2022) is a comprehensive survey conducted through in-person interviews with households across Afghanistan. It gathers data on various aspects of household needs, including health, education, nutrition, water, sanitation, hygiene (WASH), food security, as well as vulnerabilities to shocks and protection concerns. ',
            coverage: 98.72,
            coverageInfo: 'No data collected in Kandahar Urban Center due to access constraints',
            timeliness: '30/07/2022 - 04/09/2022',
            format: 'XLSX',
            link: 'https://data.humdata.org/dataset/annual-whole-of-afghanistan-assessment-woaa-2022-household-dataset#',
            updated: 'Yearly',
            collection: ['Head of House Hold Survey','Key Informant Interviews'],
            samplesize:['17,262','10,529'],
            internal: 'TRUE',
            available: 'FALSE',
            datatype: 'National',
            provider: 'REACH Initiative',
            versions:['Whole of Afghanistan Assessment 2021','Whole of Afghanistan Assessment 2023'],
            confidence:{national:95,urban:90,rural:90,refugee:90},
            margin:{national:5,urban:9,rural:9,refugee:7},
            tags:['Displacement','Education','Food','Security','Health','Internally Displaced Persons (IDP)','Livelihoods','Needs Assessment','Population','Refugees'],
            fields:'Household main data, household roster data, children under 2 data, children under 5 data, and disability data',
            disag:['gender','disability','provinces','regions','population','Urban/Rural','age'],
            populationGroups:['Recent IDPs','Recent Returnees','Refugees','Host Community','Non-recently Displaced'],
            educationGroups:[],
            ageGroups:['Children Under 2','Children Under 5'],
          }
        },
        {
          title: 'Whole of Afghanistan Assessment 2023 (Mock)',
          data: {
            date: '2023-09-20',
            published: '06/02/2024',
            year: '2023',
            content: 'The Annual Whole of Afghanistan Assessment 2023 (WoAA 2023) is a comprehensive survey conducted through in-person interviews with households across Afghanistan. It gathers data on various aspects of household needs, including health, education, nutrition, water, sanitation, hygiene (WASH), food security, as well as vulnerabilities to shocks and protection concerns. ',
            coverage: 98.72,
            coverageInfo: 'No data collected in Kandahar Urban Center due to access constraints',
            timeliness: '30/07/2023 - 04/09/2023',
            format: 'XLSX',
            link: 'https://data.humdata.org/dataset/annual-whole-of-afghanistan-assessment-woaa-2022-household-dataset#',
            updated: 'Yearly',
            collection: ['Head of House Hold Survey','Key Informant Interviews'],
            samplesize:['17,262','10,529'],
            internal: 'TRUE',
            available: 'FALSE',
            datatype: 'National',
            provider: 'REACH Initiative',
            versions:['Whole of Afghanistan Assessment 2021','Whole of Afghanistan Assessment 2023'],
            confidence:{national:95,urban:90,rural:90,refugee:90},
            margin:{national:5,urban:9,rural:9,refugee:7},
            tags:['Displacement','Education','Food','Security','Health','Internally Displaced Persons (IDP)','Livelihoods','Needs Assessment','Population','Refugees'],
            fields:'Household main data, household roster data, children under 2 data, children under 5 data, and disability data',
            disag:['gender','disability','provinces','regions','population','Urban/Rural'],
            populationGroups:['Recent IDPs','Recent Returnees','Refugees','Host Community','Non-recently Displaced'],
            educationGroups:[],
            ageGroups:[],
          }
        },
        {
          title: 'The World Bank Education Statistics 2023 (Mock)',
          data: {
            date: '2021-09-20',
            published: '06/02/2021',
            year: '2021',
            content: 'The World Bank Education Statistics 2023 provides comprehensive data and insights into global education trends, facilitating informed analysis and decision-making in the field of education policy and development.',
            coverage: 70.0,
            coverageInfo: 'No data collected in __  and ___region due to access constraints',
            timeliness: '30/07/2023 - 04/09/2023',
            format: 'CSV',
            link: 'https://databank.worldbank.org/source/education-statistics-%5e-all-indicators',
            updated: 'Yearly',
            collection: ['Administrative'],
            samplesize:['N/A',],
            internal: 'TRUE',
            available: 'TRUE',
            datatype: 'Global',
            provider: 'The World Bank',
            versions:['The World Bank Education Statistics 2022','The World Bank Education Statistics 2024'],
            confidence:{national:95,urban:90,rural:90,refugee:90},
            margin:{national:5,urban:9,rural:9,refugee:7},
            tags:['Attendance','Education','Needs Assessment','Population','Refugees'],
            fields:'Average Executive Function Score, Average Development Score, Average Lengths of Training ',
            disag:['gender',,'provinces','regions','population','Urban/Rural'],
            populationGroups:['Recent IDPs','Recent Returnees','Refugees',],
            educationGroups:[],
            ageGroups:[],
          }
        },
        {
          title: 'Community Based Education (CBE) Education Cluster Data 2022 (Mock)',
          data: {
            date: '2022-12-10',
            published: '10/12/2022',
            year: '2022',
            content: 'The CBE Education Cluster Data 2022 gathers comprehensive information regarding education-related metrics, providing valuable insights for educational planning and development initiatives.',
            coverage: 80.0,
            coverageInfo: 'No data collected in __  and ___region due to access constraints',
            timeliness: '17/01/2022 - 04/09/2022',
            format: 'Power BI',
            link: 'https://app.powerbi.com/view?r=eyJrIjoiNzZlNjMyOWUtOGExMS00NjZkLThjYTgtNjgwM2MzNmQyYmJjIiwidCI6Ijc3NDEwMTk1LTE0ZTEtNGZiOC05MDRiLWFiMTg5MjAyMzY2NyIsImMiOjh9',
            updated: 'Yearly',
            collection: ['Administrative'],
            samplesize:['N/A',],
            internal: 'TRUE',
            available: 'TRUE',
            datatype: 'National',
            provider: 'Unicef & Education Cluster',
            versions:['CBE Education Cluster Data 2023'],
            confidence:{national:95,urban:90,rural:90,refugee:90},
            margin:{national:5,urban:9,rural:9,refugee:7},
            tags:['Enrolement','Education','Needs Assessment','Population','Refugees'],
            fields:'Average Executive Function Score, Average Development Score, Average Lengths of Training ',
            disag:['gender',,'education','regions','population','Urban/Rural'],
            populationGroups:['Recent IDPs','Recent Returnees','Refugees',],
            educationGroups:[],
            ageGroups:[],
          }
        },
        {
          title: 'Income and Expenditure & Labor Force Surveys Report 2020 (Mock)',
          data: {
            date: '2020-12-10',
            published: '10/12/2020',
            year: '2020',
            content: 'The Income and Expenditure & Labor Force Surveys Report 2020 likely provides comprehensive insights into economic activities, household incomes, expenditures, and labor force dynamics for the specified year.',
            coverage: 80.0,
            coverageInfo: 'No data collected in __  and ___region due to access constraints',
            timeliness: '17/01/2022 - 04/09/2022',
            format: 'PDF',
            link: 'https://fscluster.org/sites/default/files/documents/income-and-lobar-force-survey-2020-15.pdf',
            updated: 'Yearly',
            collection: ['Administrative'],
            samplesize:['N/A',],
            internal: 'TRUE',
            available: 'TRUE',
            datatype: 'National',
            provider: 'National Statistics and Information Authority (NSIA)',
            versions:['Income and Expenditure & Labor Force Surveys Report 2021'],
            confidence:{national:95,urban:90,rural:90,refugee:90},
            margin:{national:5,urban:9,rural:9,refugee:7},
            tags:['Attaimnent','Education','Income','Expenditure','Labour', 'Population'],
            fields:'Population and households, LABOR Market, Farming and Livestock, Poverty, Education ',
            disag:['education','regions','population','Urban/Rural'],
            populationGroups:['Recent IDPs','Recent Returnees'],
            educationGroups:[],
            ageGroups:[],
          }
        }, 
        
      ],
      matchedIndex: -1
    };
  },
  methods:{
    updateFilteredData(filteredData) {
      this.filteredDataSources = filteredData;
    },
    resetFilters() {
      this.selectedYears = [];
      this.selectedTypes = [];
      this.selectedCollections = [];
      this.selectedUpdated = [];
      this.selectedProviders = [];
      this.selectedAvailability = [];
      this.selectedTags = []; 
      this.selectedDisag = [];
    },
    clearSelectedTags() {
      this.selectedTags = [];
    },
    toggleTagFilter(tag) {
      if (this.isTagSelected(tag)) {
        this.selectedTags = this.selectedTags.filter(selectedTag => selectedTag !== tag);
      } else {
        this.selectedTags.push(tag);
      }
    },
    capitalizeFirstLetter(text) {
      return text.charAt(0).toUpperCase() + text.slice(1);
    },
    handleTagFilter(tag) {
      // Update filtered data sources based on the selected tag
      this.selectedTags = [tag];
    },
    handleTagClicked(tag) {
      // Update selectedTags array
      // For example:
      this.selectedTags.push(tag);
    },
    // Check if tag is selected
    isTagSelected(tag) {
      return this.selectedTags.includes(tag);
    },
    toggleTypeFilter() {
    this.isTypeFilterCollapsed = !this.isTypeFilterCollapsed;
    },
    toggleCollectionFilter() {
      this.isCollectionFilterCollapsed = !this.isCollectionFilterCollapsed;
    },
  },
  computed: {
    availableYears() {
    const years = new Set();
    this.dataSources.forEach(source => {
      years.add(source.data.year);
    });
    return Array.from(years).sort();
  },
  availableCollections() {
  const collections = new Set();
  this.dataSources.forEach(source => {
    source.data.collection.forEach(collection => {
      collections.add(collection);
    });
  });
  return Array.from(collections).sort();
},
  availableTypes() {
    const types = new Set();
    this.dataSources.forEach(source => {
      types.add(source.data.datatype);
    });
    return Array.from(types);
  },
  availableAvailabilities() {
    const availabilities = new Set();
    this.dataSources.forEach(source => {
      availabilities.add(source.data.available);
    });
    return Array.from(availabilities).sort((a, b) => b.localeCompare(a));
  },
  availableProviders() {
    const providers = new Set();
    this.dataSources.forEach(source => {
      providers.add(source.data.provider);
    });
    return Array.from(providers).sort();
  },
  availableUpdated() {
    const updated = new Set();
    this.dataSources.forEach(source => {
      updated.add(source.data.updated);
    });
    return Array.from(updated);
  },
  availableTags() {
    const tags = new Set();
    this.dataSources.forEach(source => {
      source.data.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  },
  availableDisag() {
      const disag = new Set();
      this.dataSources.forEach(source => {
        source.data.disag.forEach(d => disag.add(d));
      });
      return Array.from(disag).sort();
    },
  matchedDataSourceSearch() {
      if (!this.searchQuery.trim()) return null;
      const query = this.searchQuery.trim().toLowerCase();
      return this.dataSources.find(source => source.title.toLowerCase().includes(query));
    },
  isMatched() {
      return this.matchedIndex !== -1;
    },
  filteredDataSources() {
    let filteredData = [...this.dataSources];
    if (this.selectedYears.length > 0) {
      filteredData = filteredData.filter(source => this.selectedYears.includes(source.data.year));
    }
    if (this.selectedTypes.length > 0) {
      filteredData = filteredData.filter(source => this.selectedTypes.includes(source.data.datatype));
    }
    if (this.selectedCollections.length > 0) {
      filteredData = filteredData.filter(source => {
        return this.selectedCollections.some(collection => source.data.collection.includes(collection));
      });
    }
    if (this.selectedAvailability.length > 0) {
      filteredData = filteredData.filter(source => this.selectedAvailability.includes(source.data.available));
    }
    if (this.selectedProviders.length > 0) {
      filteredData = filteredData.filter(source => this.selectedProviders.includes(source.data.provider));
    }
    if (this.selectedUpdated.length > 0) {
      filteredData = filteredData.filter(source => this.selectedUpdated.includes(source.data.updated));
    }
    if (this.selectedDisag.length > 0) {
      filteredData = filteredData.filter(source => {
        return this.selectedDisag.some(disag => source.data.disag.includes(disag));
      });
    }
     // Filter by selected tags
     if (this.selectedTags.length > 0) {
        filteredData = filteredData.filter(source => {
          return this.selectedTags.every(tag => source.data.tags.includes(tag));
        });
      }
      if (this.searchQuery.trim() !== '') {
        const query = this.searchQuery.trim().toLowerCase();
        filteredData = filteredData.filter(source => source.title.toLowerCase().includes(query));
      }
    return filteredData;
  },
  sortedDataSources() {
    const sorted = [...this.filteredDataSources];
    if (this.sortOrder === 'recent') {
      sorted.sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
    } else if (this.sortOrder === 'oldest') {
      sorted.sort((a, b) => new Date(a.data.date) - new Date(b.data.date));
    }
    return sorted;
  },
  toggleYearFilter() {
      this.isYearFilterCollapsed = !this.isYearFilterCollapsed;
    },
  toggleTypeFilter() {
    this.isTypeFilterCollapsed = !this.isTypeFilterCollapsed;
  },
  toggleCollectionFilter() {
    this.isCollectionFilterCollapsed = !this.isCollectionFilterCollapsed;
  },
  toggleAvailabilityFilter() {
    this.isAvailabilityFilterCollapsed = !this.isAvailabilityFilterCollapsed;
  },
  toggleProviderFilter() {
    this.isProviderFilterCollapsed = !this.isProviderFilterCollapsed;
  },
  toggleUpdatedFilter() {
    this.isUpdatedFilterCollapsed = !this.isUpdatedFilterCollapsed;
  },
  toggleDisagFilter() {
    this.isDisagFilterCollapsed = !this.isDisagFilterCollapsed;
  },
  toggleTagsFilter() {
    this.isTagsFilterCollapsed = !this.isTagsFilterCollapsed;
  },

  },
  watch: {
    matchedDataSourceSearch(newValue, oldValue) {
      if (newValue !== null && newValue !== undefined) {
        const sortedIndex = this.sortedDataSources.findIndex(source => source === newValue);
        const originalIndex = this.dataSources.findIndex(source => source === newValue);
        this.matchedIndex = sortedIndex;
      } else {
        this.matchedIndex = -1;
      }
    },
    selectedYears: {
      handler(newVal) {
        console.log('Selected Years:', newVal);
        // Call a method to update filteredDataSources based on selectedYears
        this.updateFilteredData();
      },
      deep: true
    },
    selectedTypes: {
      handler(newVal) {
        console.log('Selected Types:', newVal);
        // Call a method to update filteredDataSources based on selectedTypes
        this.updateFilteredData();
      },
      deep: true
    },
    selectedCollections: {
      handler(newVal) {
        console.log('Selected Collections:', newVal);
        // Call a method to update filteredDataSources based on selectedCollections
        this.updateFilteredData();
      },
      deep: true
    },
    selectedTags: {
      handler(newVal) {
        // Call any method or perform any action when selectedTags change
        console.log('Selected Tags:', newVal);
        // You might want to update the filtered data sources here
        this.updateFilteredData();
      },
      deep: true // Watch for changes within the array
    },
    matchedIndex(newIndex) {
      if (newIndex !== -1) {

      }
    }
  }
};
</script>

<style>
/* Add your global styles here */
.default
    {color: black;}

.grid-container{
  overflow-x:auto;
}


</style>
