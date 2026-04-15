import { createApp } from 'vue'
import App from '@/App.vue'
//引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const app = createApp(App)
//加载以及设置中文
app.use(ElementPlus, {
  locale: zhCn,
})
//svg配置
import 'virtual:svg-icons-register'
//引入自定义插件对象：注册全局组件
import globalComponents from '@/components/index'
app.use(globalComponents)
app.mount('#app')
// console.log(import.meta.env);
