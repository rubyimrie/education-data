import './assets/main.css'

import { createApp } from 'vue'
import App from './pages/App.vue'
import router from '../src/router'

createApp(App).use(router).mount('#app')
