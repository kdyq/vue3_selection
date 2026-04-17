import { isHidden } from 'element-plus/es/components/focus-trap/index.mjs'
import type { RouteRecordRaw } from 'vue-router'
//对外暴露常量路由
export const constantRoute: RouteRecordRaw[] = [
  {
    //登录
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
      title: '登录',
      hidden: true,
    },
  },
  {
    //首页
    path: '/',
    component: () => import('@/views/layout/index.vue'),
    name: 'layout',
    meta: {
      title: 'layout',
      hidden: true,
    },
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'home',
        meta: {
          title: '首页',
          hidden: false,
        },
      },
      {
        path: '/test',
        component: () => import('@/views/home/index.vue'),
        name: 'test',
        meta: {
          title: '测试',
          hidden: true,
        },
      },
    ],
  },
  {
    //404页
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true,
    },
  },
  {
    //任意
    path: '/:pathMatch(.*)',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: '任意路由',
      hidden: true,
    },
  },
]
