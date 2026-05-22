import { isHidden } from 'element-plus/es/components/focus-trap/index.mjs'
import type { RouteRecordRaw } from 'vue-router'
//对外暴露常量路由
export const constantRoute: RouteRecordRaw[] = [
  //登录
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'Login',
    meta: {
      title: '登录',
      hidden: true,
      icon: 'HomeFilled',
    },
  },
  //首页
  {
    path: '/',
    component: () => import('@/views/layout/index.vue'),
    name: 'Layout',
    redirect: '/home',
    meta: {
      title: '',
      hidden: false,
      icon: 'HomeFilled',
    },
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'Home',
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
    ],
  },
  //数据大屏
  {
    path: '/screen',
    name: 'Screen',
    component: () => import('@/views/screen/index.vue'),
    meta: {
      hidden: false,
      title: '数据大屏',
      icon: 'DataAnalysis',
    },
  },
  //404页
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true,
      icon: 'HomeFilled',
    },
  },
]
// 对外暴露异步路由
export const asyncRoute: RouteRecordRaw[] = [
  //权限管理
  {
    path: '/acl',
    component: () => import('@/views/layout/index.vue'),
    name: 'Acl',
    meta: {
      title: '权限管理',
      hidden: false,
      icon: 'Lock',
    },
    redirect: '/acl/user',
    children: [
      //用户管理
      {
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        name: 'UserAcl',
        meta: {
          title: '用户管理',
          hidden: false,
          icon: 'UserFilled',
        },
      },
      //角色管理
      {
        path: '/acl/ruler',
        component: () => import('@/views/acl/ruler/index.vue'),
        name: 'RulerAcl',
        meta: {
          title: '职位管理',
          hidden: false,
          icon: 'User',
        },
      },
      // 菜单管理
      {
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/index.vue'),
        name: 'PermissionAcl',
        meta: {
          title: '菜单管理',
          hidden: false,
          icon: 'Grid',
        },
      },
    ],
  },
  //商品管理
  {
    path: '/product',
    component: () => import('@/views/layout/index.vue'),
    name: 'Product',
    meta: {
      title: '商品管理',
      icon: 'Goods',
      hidden: false,
    },
    redirect: '/product/trademark',
    children: [
      //品牌管理
      {
        path: '/product/trademark',
        component: () => import('@/views/product/tradmark/index.vue'),
        name: 'Trademark',
        meta: {
          title: '品牌管理',
          icon: 'Shop',
          hidden: false,
        },
      },
      //属性管理
      {
        path: '/product/attr',
        component: () => import('@/views/product/attr/index.vue'),
        name: 'Attr',
        meta: {
          title: '属性管理',
          icon: 'Notebook',
          hidden: false,
        },
      },
      //SPU管理
      {
        path: '/product/spu',
        component: () => import('@/views/product/spu/index.vue'),
        name: 'Spu',
        meta: {
          title: 'SPU管理',
          icon: 'Files',
          hidden: false,
        },
      },
      // SKU管理
      {
        path: '/product/sku',
        component: () => import('@/views/product/sku/index.vue'),
        name: 'Sku',
        meta: {
          title: 'SKU管理',
          icon: 'FolderOpened',
          hidden: false,
        },
      },
    ],
  },
]
//对外暴露任意路由
export const anyRoute: RouteRecordRaw = {
  //任意
  path: '/:pathMatch(.*)',
  redirect: '/404',
  name: 'Any',
  meta: {
    title: '任意路由',
    hidden: true,
    icon: 'HomeFilled',
  },
}
