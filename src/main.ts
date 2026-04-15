import { createApp } from 'vue'
import App from './App.vue'
//引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)
//加载以及设置中文 
app.use(ElementPlus, {
  locale: zhCn,
})
app.mount('#app')
