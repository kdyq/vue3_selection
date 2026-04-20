import { useUserStore } from '@/store/modules/user'
import setting from './setting'
//路由鉴权
import router from '@/router'
//进度条插件
import nprogress from 'nprogress'
//进度条样式
import 'nprogress/nprogress.css'
nprogress.configure({
  showSpinner: false,
})
import pinia from './store'
import { ElMessage } from 'element-plus'

//全局守卫：任意路由切换都会触发的钩子
//前置守卫
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore(pinia)
  //   console.log(userStore)
  //to :即将要进入的目标路由对象
  //from : 当前导航正要离开的路由对象
  //next:放行函数
  //进度条开始
  nprogress.start()
  //判断用户是否登录
  const token = userStore.token
  const username = userStore.username
  if (token) {
    //登录成功不能访问登录页
    if (to.path === '/login') {
      ElMessage({
        type: 'warning',
        message: '您已登录，请退出登录重试',
      })
      next({ path: '/' })
    } else {
      //有用户信息
      if (username) {
        next()
      } else {
        //获取信息后在放行
        try {
          await userStore.userInfo()
          next()
        } catch (error) {
          //token失效
          ElMessage({
            type: 'warning',
            message: '登录已失效，请重新登录',
          })
          next({ path: '/login' })
        }
      }
    }
  } else {
    //未登录只能访问登录页
    if (to.path === '/login') {
      next()
    } else {
      ElMessage({
        type: 'warning',
        message: '请先登录',
      })
      next({ path: '/login' })
    }
  }
})
//后置守卫
router.afterEach((to, from) => {
  document.title = setting.title + '-' + to.meta.title
  //进度条结束
  nprogress.done()
})
