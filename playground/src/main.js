import { createApp } from 'vue'
import { createPinia } from 'pinia'

// 导入Unocss样式
import 'virtual:uno.css'
import '@arco-design/web-vue/dist/arco.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
