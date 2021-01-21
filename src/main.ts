import { createApp } from 'vue'
import App from './App.vue'
import { setupAntdv } from './plugins/antdv'
import router from './router'
import store from './store'

import '@/assets/global.less'

const app = createApp(App)
  .use(store)
  .use(router)
setupAntdv(app)
app.mount('#app')
