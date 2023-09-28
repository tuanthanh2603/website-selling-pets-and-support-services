import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap-grid.min.css'
import 'bootstrap/dist/css/bootstrap-utilities.min.css'

import router from './router'

createApp(App).use(router).mount('#app')
