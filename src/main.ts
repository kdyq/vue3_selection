import { createApp } from 'vue'
import App from '@/App.vue'
//引入全局样式
import '@/style/index.scss'
//引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
//svg配置
import 'virtual:svg-icons-register'
//引入自定义插件对象：注册全局组件
import globalComponents from '@/components/index'

import router from '@/router'
const app = createApp(App)
//加载以及设置中文
app.use(ElementPlus, {
  locale: zhCn,
})

app.use(globalComponents)
//注册路由
app.use(router)
app.mount('#app')
// console.log(import.meta.env);
