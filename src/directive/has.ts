import pinia from '@/store'
import { useUserStore } from '@/store/modules/user'
const userStore = useUserStore(pinia)
//自定义指令
export const isHasButton = (app: any) => {
  //实现按钮权限
  app.directive('has', {
    //使用这个全局自定义指令的DOM或组件挂在完毕会自动执行一次
    mounted(el: any, options: any) {
      // el:当前绑定的DOM元素,options:指令对象
      if (!userStore.buttons.includes(options.value)) {
        el.parentNode.removeChild(el)
      }
    },
  })
}
