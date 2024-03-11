<template>
     <div class="flex">
    <!-- Left Column -->
    <div class="w-1/2">
      <div>

      </div>
      <h3 class="mb-2 ml-4"><span class="font-semibold">Date Representing:</span> <span :class="timelinessColor">{{ data.timeliness }}</span></h3>
      <h3 class="mb-2 ml-4"><span class="font-semibold">Updated:</span> <span :class="{ 'text-red-500': data.updated === 'Never' }">{{ data.updated }}</span></h3>
      <h3 class=" mb-2 ml-4"><span class="font-semibold">Other Versions: </span>
        <span class="text-cutty-sark-300" v-for="(version, index) in data.versions" :key="index">
          <span class="underline">{{ version }} </span>
          <span v-if="index !== data.versions.length - 1">, </span>
        </span>
      </h3>
      
      <h3 class=" mb-2 ml-4"><span class="font-semibold">Data Provider: </span><span class="bg-cutty-sark-600 text-white rounded px-2">{{ data.provider }}</span></h3>
      <h3 class=" mb-2 ml-4"><span class="font-semibold">Collection Method:</span> <span>{{ data.collection }}</span></h3>

      <p class="flex items-center mb-2 ml-4"><span class="font-semibold">Internally Consistent: </span>
      <span>
        <svg v-if="data.internal" class="tick-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path fill="#4CAF50" d="M18.585 3.414a2 2 0 0 0-2.828 0L8 11.172 4.243 7.415a2 2 0 0 0-2.828 2.828l4.949 4.95a2 2 0 0 0 2.828 0L18.585 6.243a2 2 0 0 0 0-2.829z"/>
        </svg>
        <svg v-else class="cross-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path fill="#F44336" d="M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm4.95 12.121l-1.414 1.415L10 11.414l-3.536 3.536-1.414-1.415L8.586 10l-3.535-3.536 1.414-1.415L10 8.586l3.536-3.535 1.414 1.414L11.414 10l3.536 3.536z"/>
        </svg>
      </span>
    </p>
    <p class="flex items-center mb-2 ml-4"><span class="font-semibold">Externaly Consistent: </span>
      <span>
        <svg v-if="data.internal" class="tick-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path fill="#4CAF50" d="M18.585 3.414a2 2 0 0 0-2.828 0L8 11.172 4.243 7.415a2 2 0 0 0-2.828 2.828l4.949 4.95a2 2 0 0 0 2.828 0L18.585 6.243a2 2 0 0 0 0-2.829z"/>
        </svg>
        <svg v-else class="cross-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path fill="#F44336" d="M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm4.95 12.121l-1.414 1.415L10 11.414l-3.536 3.536-1.414-1.415L8.586 10l-3.535-3.536 1.414-1.415L10 8.586l3.536-3.535 1.414 1.414L11.414 10l3.536 3.536z"/>
        </svg>
      </span>
    </p>
    </div>

     <!-- Separator Line -->
    <div class="w-px bg-gray-200 mx-4"></div>

    <!-- Right Column -->
    <div class="w-1/2">
    <div class="flex items-center relative">
      <div @mouseover="showGeoInfo = true" @mouseleave="showGeoInfo = false">
        <h3 class=" mb-2 font-semibold">Geographical Coverage (i):</h3>
        <div v-if="showGeoInfo" class="geo-info absolute bg-white border border-gray-300 p-2 rounded-lg shadow-md" style="width: 30vw;">
          {{ geoInfo }}
        </div>
      </div>
    <div class="ml-1 mb-2" @mouseover="showCoverageInfo = true" @mouseleave="showCoverageInfo = false">
      <div class="pie-chart-container">
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
          <text x="50" y="50" text-anchor="middle" dominant-baseline="middle" class="text-lg">
            {{ coverage }}%
          </text>
        </svg>
        <!-- Coverage Info tooltip -->
        <div v-if="showCoverageInfo" class="coverage-info absolute bg-white border border-gray-300 p-2 rounded-lg shadow-md" style="width: 30vw;">
          {{ data.coverageInfo }}
        </div>
      </div>
    </div>
  </div>
    <!-- Confidence Levels and Margin of Error -->
    <div class="mt-4">
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
        geoInfo: 'This is the percentage of provinces that have been included in the study.',
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

  .geo-info {
    top: calc(100% + 5px);
    left: 50%;
    transform: translateX(-50%);
    display: none;
  }

  :hover .geo-info{
    display: block;
  }
  
  .pie-chart-container:hover .coverage-info{
    display: block;
  }

  </style>
  