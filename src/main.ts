import { createApp } from 'vue'
import App from './App.vue'
import { setupAntdv } from './plugins/antdv'
import router from './router'
import store from './store'
import VueMarkdownIt from 'vue3-markdown-it'

import '@/assets/global.less'
import 'highlight.js/styles/monokai.css'

const app = createApp(App)
  .use(store)
  .use(router)
  .use(VueMarkdownIt)
setupAntdv(app)
app.mount('#app')
