import { createApp } from 'vue'
import Antd from 'ant-design-vue';

import router from './router';




import axios from 'axios'
window.axios = axios;


import App from './App.vue';





import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap/dist/css/bootstrap-utilities.min.css';
import 'ant-design-vue/dist/antd.css';






const app = createApp(App);

app.use(router)
app.use(Antd)

app.mount('#app');











