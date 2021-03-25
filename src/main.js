
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import elementUI from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

import "@/styles/index.scss";

// import "@/assets/css/global.scss"


import components from '@/components'

import './mock/mock'

import eventBus from './utils/eventBus'

// import VueQuillEditor from 'vue-quill-editor'
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'

const app = createApp(App);
app.use(store).use(router).mount('#app');
app.use(components)
app.use(eventBus)
app.use(elementUI)
// app.use(VueQuillEditor)