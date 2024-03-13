<template>
     <div class="flex">
    <!-- Left Column -->
    <div class="w-1/2">
      <!-- Date Repredenting -->
      <div class="flex relative items-center"> 
        <div @mouseover="showDateInfo = true" @mouseleave="showDateInfo = false">
        <h3 class="mb-2 ml-4 mr-2"><span class="font-semibold">Date Representing (i): </span> </h3>
        <div v-if="showDateInfo" class=" absolute bg-white border border-gray-300 p-2 rounded-lg shadow-md" style="width: 30vw; z-index: 999;">
          {{ dateInfo }}
        </div>
        </div>
        <div class="rounded-md bg-cutty-sark-200 items-center">
        <span class="ml-1 mr-2">{{ data.timeliness }}</span>
        </div>
      </div>
      <!-- Updated -->
      <div class="flex relative ">
        <h3 class="mb-2 ml-4"><span class="font-semibold">Updated:</span> <span :class="{ 'text-red-500': data.updated === 'Never' }">{{ data.updated }}</span></h3>
        <span v-if="data.updated !== 'Never'" class="ml-2">
          <img  width="20" height="20" src="https://img.icons8.com/pastel-glyph/64/loop.png" alt="loop"/>
        </span>
      </div>
      <h3 class=" mb-2 ml-4"><span class="font-semibold">Other Versions: </span>
        <span  v-for="(version, index) in data.versions" :key="index">
          <span >{{ version }} </span>
          <span v-if="index !== data.versions.length - 1">, </span>
        </span>
      </h3>
      <hr>
      <h3 class=" mb-2 ml-4 mt-2"><span class="font-semibold">Data Provider: </span><span class="bg-cutty-sark-600 text-white rounded px-2">{{ data.provider }}</span></h3>
      <!-- Collection Method -->
      <div class="mb-2 ml-4 flex flex-col">
        <span class="font-semibold">Collection Methods:</span>
        <div class="mt-2" v-if="Array.isArray(data.collection)">
          <template v-for="(method, index) in data.collection" :key="index">
            <div class="flex relative mb-2">
              <span class="bg-cutty-sark-200 rounded-md items-center">
                <span v-if="method === 'Head of House Hold Survey'">
                  <img class="m-1" width="20" height="20" src="https://img.icons8.com/ios/50/survey.png" alt="survey"/>
                </span>
                <span v-else-if="method === 'Key Informant Interviews'">
                  <img class="m-1" width="20" height="20" src="https://img.icons8.com/external-xnimrodx-lineal-xnimrodx/64/external-interview-news-xnimrodx-lineal-xnimrodx.png" alt="external-interview-news-xnimrodx-lineal-xnimrodx"/>
                </span>
                <span v-else-if="method === 'Administrative'">
                  <img class="m-1" width="20" height="20" src="https://img.icons8.com/external-others-made-by-made/50/external-administrative-government-others-made-by-made-36.png" alt="external-administrative-government-others-made-by-made-36"/>
                </span>
              </span>
              <!-- Include sample size -->
              <span class="ml-2">{{ method }}</span>
              <span class="ml-2">(Sample Size: {{ data.samplesize[index] }})</span>
            </div>
          </template>
        </div>
        <div v-else>
          <span>{{ data.collection }}</span>
        </div>
      </div>
      <hr>

      <!-- Internal Consistency -->
      <div class="flex items-center mt-2">
        <div @mouseover="showInternalInfo = true" @mouseleave="showInternalInfo = false">
        <h3 class="mb-2 ml-4"><span class="font-semibold">Internally Consistency (i): </span> </h3>
        <div v-if="showInternalInfo" class=" absolute bg-white border border-gray-300 p-2 rounded-lg shadow-md" style="width: 30vw; z-index: 999;">
          {{ internalInfo }}
        </div>
        </div>
      <span>
        <svg v-if="data.internal" class="tick-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path fill="#4CAF50" d="M18.585 3.414a2 2 0 0 0-2.828 0L8 11.172 4.243 7.415a2 2 0 0 0-2.828 2.828l4.949 4.95a2 2 0 0 0 2.828 0L18.585 6.243a2 2 0 0 0 0-2.829z"/>
        </svg>
        <svg v-else class="cross-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path fill="#F44336" d="M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm4.95 12.121l-1.414 1.415L10 11.414l-3.536 3.536-1.414-1.415L8.586 10l-3.535-3.536 1.414-1.415L10 8.586l3.536-3.535 1.414 1.414L11.414 10l3.536 3.536z"/>
        </svg>
      </span>
    </div>
    <div>
    <!-- External Consistency -->
    <div class="flex items-center">
      <div @mouseover="showExternalInfo = true" @mouseleave="showExternalInfo = false">
        <h3 class="mb-2 ml-4"><span class="font-semibold">External Consistency (i): </span> </h3>
        <div v-if="showExternalInfo" class=" absolute bg-white border border-gray-300 p-2 rounded-lg shadow-md" style="width: 30vw; z-index: 999;">
          {{ externalInfo }}
        </div>
        </div>
      <span>
        <svg v-if="data.internal" class="tick-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path fill="#4CAF50" d="M18.585 3.414a2 2 0 0 0-2.828 0L8 11.172 4.243 7.415a2 2 0 0 0-2.828 2.828l4.949 4.95a2 2 0 0 0 2.828 0L18.585 6.243a2 2 0 0 0 0-2.829z"/>
        </svg>
        <svg v-else class="cross-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path fill="#F44336" d="M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm4.95 12.121l-1.414 1.415L10 11.414l-3.536 3.536-1.414-1.415L8.586 10l-3.535-3.536 1.414-1.415L10 8.586l3.536-3.535 1.414 1.414L11.414 10l3.536 3.536z"/>
        </svg>
      </span>
    </div>
    </div>
    <hr>
    <div class="flex items-center relative ml-4 mt-2">
      <div @mouseover="showGeoInfo = true" @mouseleave="showGeoInfo = false">
        <h3 class=" mb-2 font-semibold">Geographical Coverage (i):</h3>
        <div v-if="showGeoInfo" class=" absolute bg-white border border-gray-300 p-2 rounded-lg shadow-md" style="width: 30vw; z-index: 999;">
          {{ geoInfo }}
        </div>
      </div>
    <div class="ml-4 mb-2" @mouseover="showCoverageInfo = true" @mouseleave="showCoverageInfo = false">
      <div class="pie-chart-container text-md">
        <svg viewBox="0 0 100 100" class="pie-chart">
          <!-- Circle representing the pie chart outline -->
          <circle cx="50" cy="50" r="45" fill="transparent" stroke="#ccc" stroke-width="6"></circle>
          <!-- Arc representing the coverage -->
          <path 
            v-if="coverage > 0" 
            :d="piePath" 
            fill="transparent" 
            :stroke="coverageColor"
            stroke-width="6"
            stroke-linecap="round"
          ></path>
          <!-- Text displaying coverage percentage -->
          <text x="50" y="50" text-anchor="middle" dominant-baseline="middle" font-size="23px">
            {{ coverage }}% (i)
          </text>
        </svg>
        <!-- Coverage Info tooltip -->
        <div v-if="showCoverageInfo" class="coverage-info absolute bg-white border border-gray-300 p-2 rounded-lg shadow-md" style="width: 30vw; z-index: 999;">
          {{ data.coverageInfo }}
        </div>
      </div>
    </div>
  </div>

    </div>

     <!-- Separator Line -->
    <div class="w-px bg-gray-200 mx-4"></div>

    <!-- Right Column -->
    <div class="w-1/2">

    <!-- Confidence Levels and Margin of Error -->
    <div class="mt-4 mb-4 ">
      <div @mouseover="showCiInfo = true" @mouseleave="showCiInfo = false">
          <h3 class="mb-2 font-semibold">Confidence Levels and Margin of Error(i):</h3>
          <div v-if="showCiInfo" class="absolute bg-white border border-gray-300 p-2 rounded-lg shadow-md" style="width: 30vw;">
              {{ ciInfo }}
          </div>
      </div>

        <table class="border-collapse border border-gray-400">
            <thead>
                <tr>
                    <th class="border border-gray-400 px-2 py-1 text-sm text-cutty-sark-700 font-semibold">Category</th>
                    <th class="border border-gray-400 px-2 py-1 text-sm text-cutty-sark-700 font-semibold">Confidence Level (%)</th>
                    <th class="border border-gray-400 px-2 py-1 text-sm text-cutty-sark-700 font-semibold">Margin of Error (%)</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(confidenceLevel, key) in data.confidence" :key="'confidence-' + key">
                    <td class="border border-gray-400 px-2 py-1 text-sm">{{ key }}</td>
                    <td class="border border-gray-400 px-2 py-1 text-sm">{{ confidenceLevel }}</td>
                    <td class="border border-gray-400 px-2 py-1 text-sm">{{ data.margin[key] }}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <hr>

    <!-- Disagregation -->
    <div class="mt-4">
    <div @mouseover="showDisInfo = true" @mouseleave="showDisInfo = false">
          <h3 class="mb-2 font-semibold">Disagregation(i):</h3>
          <div v-if="showDisInfo" class="absolute bg-white border border-gray-300 p-2 rounded-lg shadow-md" style="width: 30vw;">
              {{ disInfo }}
          </div>
      </div>
      <table class="border-collapse border border-gray-400">
  <thead>
    <tr>
      <th class="border border-gray-400 px-2 py-1 text-sm text-cutty-sark-700 font-semibold">Categories</th>
      <th class="border border-gray-400 px-2 py-1 text-sm text-cutty-sark-700 font-semibold">Included</th>
      <th class="border border-gray-400 px-2 py-1 text-sm text-cutty-sark-700 font-semibold">Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-gray-400 px-2 py-1 text-sm text-cutty-sark-700">Sex</td>
      <td class="border border-gray-400 px-2 py-1 text-sm text-cutty-sark-700 font-semibold">
        <svg v-if="data.disag.includes('gender')" class="tick-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path fill="#4CAF50" d="M18.585 3.414a2 2 0 0 0-2.828 0L8 11.172 4.243 7.415a2 2 0 0 0-2.828 2.828l4.949 4.95a2 2 0 0 0 2.828 0L18.585 6.243a2 2 0 0 0 0-2.829z"/>
        </svg>
        <!-- If 'regions' is not present in 'disag', display the cross icon -->
        <svg v-else class="cross-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path fill="#F44336" d="M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm4.95 12.121l-1.414 1.415L10 11.414l-3.536 3.536-1.414-1.415L8.586 10l-3.535-3.536 1.414-1.415L10 8.586l3.536-3.535 1.414 1.414L11.414 10l3.536 3.536z"/>
        </svg>
      </td>
      <td class="border border-gray-400 px-2 py-1 text-sm text-cutty-sark-700 font-semibold"></td>
    </tr>
    <tr>
      <td class="border border-gray-400 px-2 py-1 text-sm text-cutty-sark-700">Disability</td>
      <td class="border border-gray-400 px-2 py-1 text-sm text-cutty-sark-700 font-semibold">
        <svg v-if="data.disag.includes('disability')" class="tick-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path fill="#4CAF50" d="M18.585 3.414a2 2 0 0 0-2.828 0L8 11.172 4.243 7.415a2 2 0 0 0-2.828 2.828l4.949 4.95a2 2 0 0 0 2.828 0L18.585 6.243a2 2 0 0 0 0-2.829z"/>
        </svg>
        <!-- If 'regions' is not present in 'disag', display the cross icon -->
        <svg v-else class="cross-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path fill="#F44336" d="M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm4.95 12.121l-1.414 1.415L10 11.414l-3.536 3.536-1.414-1.415L8.586 10l-3.535-3.536 1.414-1.415L10 8.586l3.536-3.535 1.414 1.414L11.414 10l3.536 3.536z"/>
        </svg>
      </td>
      <td class="border border-gray-400 px-2 py-1 text-sm text-cutty-sark-700 font-semibold"></td>
    </tr>
    <tr>
      <td class="border border-gray-400 px-2 py-1 text-sm text-cutty-sark-700">Provinces</td>
      <td class="border border-gray-400 px-2 py-1 text-sm text-cutty-sark-700 font-semibold">
        <svg v-if="data.disag.includes('regions')" class="tick-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path fill="#4CAF50" d="M18.585 3.414a2 2 0 0 0-2.828 0L8 11.172 4.243 7.415a2 2 0 0 0-2.828 2.828l4.949 4.95a2 2 0 0 0 2.828 0L18.585 6.243a2 2 0 0 0 0-2.829z"/>
        </svg>
        <!-- If 'regions' is not present in 'disag', display the cross icon -->
        <svg v-else class="cross-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path fill="#F44336" d="M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm4.95 12.121l-1.414 1.415L10 11.414l-3.536 3.536-1.414-1.415L8.586 10l-3.535-3.536 1.414-1.415L10 8.586l3.536-3.535 1.414 1.414L11.414 10l3.536 3.536z"/>
        </svg>
      </td>
      <td class="border border-gray-400 px-2 py-1 text-sm text-cutty-sark-700 font-semibold"></td>
    </tr>
    <tr>
      <td class="border border-gray-400 px-2 py-1 text-sm text-cutty-sark-700">Regions</td>
      <td class="border border-gray-400 px-2 py-1 text-sm text-cutty-sark-700 font-semibold">
        <svg v-if="data.disag.includes('regions')" class="tick-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path fill="#4CAF50" d="M18.585 3.414a2 2 0 0 0-2.828 0L8 11.172 4.243 7.415a2 2 0 0 0-2.828 2.828l4.949 4.95a2 2 0 0 0 2.828 0L18.585 6.243a2 2 0 0 0 0-2.829z"/>
        </svg>
        <!-- If 'regions' is not present in 'disag', display the cross icon -->
        <svg v-else class="cross-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path fill="#F44336" d="M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm4.95 12.121l-1.414 1.415L10 11.414l-3.536 3.536-1.414-1.415L8.586 10l-3.535-3.536 1.414-1.415L10 8.586l3.536-3.535 1.414 1.414L11.414 10l3.536 3.536z"/>
        </svg>
      </td>
      <td class="border border-gray-400 px-2 py-1 text-sm text-cutty-sark-700 font-semibold"></td>
    </tr>
    <tr>
      <td class="border border-gray-400 px-2 py-1 text-sm text-cutty-sark-700">Population Groups</td>
      <td class="border border-gray-400 px-2 py-1 text-sm text-cutty-sark-700 font-semibold">
        <svg v-if="data.disag.includes('regions')" class="tick-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path fill="#4CAF50" d="M18.585 3.414a2 2 0 0 0-2.828 0L8 11.172 4.243 7.415a2 2 0 0 0-2.828 2.828l4.949 4.95a2 2 0 0 0 2.828 0L18.585 6.243a2 2 0 0 0 0-2.829z"/>
        </svg>
        <!-- If 'regions' is not present in 'disag', display the cross icon -->
        <svg v-else class="cross-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path fill="#F44336" d="M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm4.95 12.121l-1.414 1.415L10 11.414l-3.536 3.536-1.414-1.415L8.586 10l-3.535-3.536 1.414-1.415L10 8.586l3.536-3.535 1.414 1.414L11.414 10l3.536 3.536z"/>
        </svg>
      </td>
      <td class="border border-gray-400 px-2 py-1 text-sm text-cutty-sark-700">
        {{ data.populationGroups.join(', ') }}
      </td>
    </tr>
    <tr>
      <td class="border border-gray-400 px-2 py-1 text-sm text-cutty-sark-700">Urban/Rural</td>
      <td class="border border-gray-400 px-2 py-1 text-sm text-cutty-sark-700 font-semibold">
        <svg v-if="data.disag.includes('regions')" class="tick-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path fill="#4CAF50" d="M18.585 3.414a2 2 0 0 0-2.828 0L8 11.172 4.243 7.415a2 2 0 0 0-2.828 2.828l4.949 4.95a2 2 0 0 0 2.828 0L18.585 6.243a2 2 0 0 0 0-2.829z"/>
        </svg>
        <!-- If 'regions' is not present in 'disag', display the cross icon -->
        <svg v-else class="cross-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path fill="#F44336" d="M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm4.95 12.121l-1.414 1.415L10 11.414l-3.536 3.536-1.414-1.415L8.586 10l-3.535-3.536 1.414-1.415L10 8.586l3.536-3.535 1.414 1.414L11.414 10l3.536 3.536z"/>
        </svg>
      </td>
      <td class="border border-gray-400 px-2 py-1 text-sm text-cutty-sark-700 font-semibold"></td>
    </tr>
  </tbody>
</table>


  </div>
    </div>  
    </div>
  </template>
  
  <script>
  export default {
    props: {
      data: Object
    },
    data() {
      return {
        showCoverageInfo: false,
        showGeoInfo: false,
        showCiInfo: false,
        showDateInfo: false,
        showInternalInfo: false,
        showExternalInfo: false,
        showDisInfo: false,
        geoInfo: 'This is the percentage of provinces that have been included in the study.',
        ciInfo: 'Confidence levels indicate the probability that the true value of a parameter lies within a specified range while the margin of error quantifies the amount of random sampling error present in survey results. This is information has been taken from the Data Provider',
        dateInfo: 'The earliest date and latest date included in the dataset.',
        internalInfo: 'Internal Consistency implies no contradictions or discrepancies within the dataset itself',
        externalInfo: 'External Consistency implies no contradictions or discrepancies with other data sources. For the purpose of this website it has only been compared to other data sources on this website representing the same timeframe.',
        disInfo: 'Disaggregation refers to breaking down data into smaller, more detailed components or categories for analysis.',
      };
    },
    methods:{
    
      
    },

    computed: {
      coverage() {
        return parseInt(this.data.coverage);
      },
      piePath() {
        const radius = 45;
        const x = 50;
        const y = 50;
        const startAngle = -90; // Start angle at 12 o'clock
        const endAngle = (this.coverage / 100) * 360 - 90; // Convert coverage to angle
        const largeArcFlag = this.coverage > 50 ? 1 : 0; // Whether to draw the large arc
  
        // Calculate the end point of the arc
        const endX = x + radius * Math.cos((endAngle * Math.PI) / 180);
        const endY = y + radius * Math.sin((endAngle * Math.PI) / 180);
  
        // Construct the SVG path string for the arc
        const pathData = [
          `M ${x} ${y - radius}`, // Move to top point of circle
          `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc to the end point
        ].join(' ');
  
        return pathData;
      },
      coverageColor() {
        if (this.coverage >= 90) {
          return '#4CAF50';
        } else if (this.coverage >= 60) {
          return 'orange';
        } else {
          return 'red';
        }
      },
      timelinessColor() {
        const currentDate = new Date();
        const timelinessDate = new Date(this.data.timeliness);
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  
        if (timelinessDate > oneYearAgo) {
          return 'text-green-600'; // Within the past year
        } else {
          return 'text-orange-500'; // Not within the past year
        }
      }
    }
  };
  </script>
  
  <style scoped>

    .tick-icon, .cross-icon {
    width: 20px;
    height: 20px;
    margin-left: 5px;
    }
  .pie-chart-container {
    width: 50px;
    height: 50px;
    margin-left: 10px; /* Add space between heading and pie chart */
    position: relative; /* Position for absolute tooltip */
  }
  
  .pie-chart {
    width: 100%;
    height: 100%;
  }
  
  .coverage-text {
    font-weight: bold;
    fill: black;
  }
  
  .coverage-info {
    top: calc(100% + 5px);
    left: 50%;
    transform: translateX(-50%);
    display: none;
  }

  

  :hover .tooltip-info{
    display: block;
  }

  :hover .ci-info{
    display: block;
  }
  
  .pie-chart-container:hover .coverage-info{
    display: block;
  }

  </style>
  