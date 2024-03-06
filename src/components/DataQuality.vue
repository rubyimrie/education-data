<template>
     <div class="flex">
    <!-- Left Column -->
    <div class="w-1/2">
      <div class="flex items-center">
        <h3 class="mb-2 ml-4" @mouseover="showTooltip('Date Representing', 'Meaning of Date Representing')" @mouseleave="hideTooltip()">Date Representing: <span :class="timelinessColor">{{ data.timeliness }}</span></h3>
        <h3 class="mb-2 ml-4" @mouseover="showTooltip('Updated', 'Meaning of Updated')" @mouseleave="hideTooltip()">Updated: <span :class="{ 'text-red-500': data.updated === 'Never' }">{{ data.updated }}</span></h3>
      </div>
      <h3 class="font-semibold text-lg">Data Sources</h3>
      <h3 class="ml-4">Collection Method:</h3>
        <ul style="list-style-type: disc;" class="mb-2">
          <li v-for="(method, index) in data.collection" :key="index" class="ml-12">
            <span>{{ method }}</span>
          </li>
        </ul>
      <h3 class="  mb-2 ml-4">Data Owner: <span >{{  }}</span></h3>
      <h3 class="  mb-2 ml-4">Quality Checks: <span >{{ }}</span></h3>
    </div>

     <!-- Separator Line -->
    <div class="w-px bg-gray-200 mx-4"></div>

    <!-- Right Column -->
    <div class="w-1/2">
    <div class="flex items-center relative ml-4 mb-2" @mouseover="showCoverageInfo = true" @mouseleave="showCoverageInfo = false">
      <h3 class=" mb-2">Coverage:</h3>
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
          <text x="50" y="50" text-anchor="middle" dominant-baseline="middle" class="coverage-text">
            {{ coverage }}%
          </text>
        </svg>
        <!-- Coverage Info tooltip -->
        <div v-if="showCoverageInfo" class="coverage-info absolute bg-white border border-gray-300 p-2 rounded-lg shadow-md" style="width: 30vw;">
          {{ data.coverageInfo }}
        </div>
      </div>
    </div>
    <p class="flex items-center mb-2 ml-4">Internally Consistent: 
      <span>
        <svg v-if="data.internal" class="tick-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path fill="#4CAF50" d="M18.585 3.414a2 2 0 0 0-2.828 0L8 11.172 4.243 7.415a2 2 0 0 0-2.828 2.828l4.949 4.95a2 2 0 0 0 2.828 0L18.585 6.243a2 2 0 0 0 0-2.829z"/>
        </svg>
        <svg v-else class="cross-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path fill="#F44336" d="M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm4.95 12.121l-1.414 1.415L10 11.414l-3.536 3.536-1.414-1.415L8.586 10l-3.535-3.536 1.414-1.415L10 8.586l3.536-3.535 1.414 1.414L11.414 10l3.536 3.536z"/>
        </svg>
      </span>
    </p>
    <p class="flex items-center mb-2 ml-4">Externaly Consistent: 
      <span>
        <svg v-if="data.internal" class="tick-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path fill="#4CAF50" d="M18.585 3.414a2 2 0 0 0-2.828 0L8 11.172 4.243 7.415a2 2 0 0 0-2.828 2.828l4.949 4.95a2 2 0 0 0 2.828 0L18.585 6.243a2 2 0 0 0 0-2.829z"/>
        </svg>
        <svg v-else class="cross-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path fill="#F44336" d="M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm4.95 12.121l-1.414 1.415L10 11.414l-3.536 3.536-1.414-1.415L8.586 10l-3.535-3.536 1.414-1.415L10 8.586l3.536-3.535 1.414 1.414L11.414 10l3.536 3.536z"/>
        </svg>
      </span>
    </p>
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
        tooltip: {
        show: false,
        title: '',
        meaning: '',
        x: 0,
        y: 0
      }
      };
    },
    methods:{
      showTooltip(title, meaning, event) {
      this.tooltip.title = title;
      this.tooltip.meaning = meaning;
      this.tooltip.show = true;
      this.tooltip.x = event.clientX + 10;
      this.tooltip.y = event.clientY + 10;
    },
      hideTooltip() {
        this.tooltip.show = false;
      }
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
    font-size: 14px;
    font-weight: bold;
    fill: black;
  }
  
  .coverage-info {
    top: calc(100% + 5px);
    left: 50%;
    transform: translateX(-50%);
    display: none;
  }
  
  .pie-chart-container:hover .coverage-info {
    display: block;
  }
  </style>
  