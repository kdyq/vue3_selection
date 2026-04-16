//配置路由
import { createRouter, createWebHistory } from 'vue-router'
import { constantRoute } from './routers'
//创建路由器
const router = createRouter({
  //路由模式
  history: createWebHistory(),
  routes: constantRoute,
  //路由滚动
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
      behavior: 'smooth',
    }
  },
})
export default router
