//注册全局组件插件
import SvgIcon from './SvgIcon/index.vue'
import type { App, Component } from 'vue'
//全局对象
const components: { [name: string]: Component } = { SvgIcon }
export default {
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key])
    })
  },
}
