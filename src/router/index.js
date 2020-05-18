import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  // {
  //   path: '/404',
  //   component: () => import('@/views/error-page/404'),
  //   hidden: true
  // },
  // {
  //   path: '/401',
  //   component: () => import('@/views/error-page/401'),
  //   hidden: true
  // },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/employeemanager',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/employeemanager/index'),
        name: 'EmployeeManager',
        meta: { title: '员工信息管理', icon: 'example' }
      }
    ]
  },
  {
    path: '/role',
    component: Layout,
    children: [
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/role/edit'),
        name: 'RolesEdit',
        meta: { title: '', noCache: true, activeMenu: '/role/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/role/list'),
        name: 'Roles',
        meta: { title: '角色管理', icon: 'list' }
      }
    ]
  },
  {
    path: '/vistorcards',
    component: Layout,
    children: [
      {
        path: 'list',
        component: () => import('@/views/vistorcards/list'),
        name: 'VistorCardsList',
        meta: { title: '访客卡管理', icon: 'list' }
      },
      {
        path: 'records/:id(\\d+)',
        component: () => import('@/views/vistorcards/records'),
        name: 'VistorCardsRecords',
        meta: { title: '使用记录', icon: 'list', noCache: true, activeMenu: '/vistorcards/list' },
        hidden: true
      },
      {
        path: 'create',
        component: () => import('@/views/vistorcards/create'),
        name: 'VistorCardsCreate',
        meta: { title: '添加访客卡', icon: 'list' },
        hidden: true
      }
    ]
  },
  {
    path: '/dic',
    component: Layout,
    children: [
      {
        path: 'list',
        component: () => import('@/views/dictionary/list'),
        name: 'Dictionary',
        meta: { title: '字典项管理', icon: 'list' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/dictionary/edit'),
        name: 'DictionaryEdit',
        meta: { title: '字典项编辑', icon: 'edit' },
        hidden: true
      }
    ]
  },
  {
    path: '/health',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/health/index'),
        name: 'Health',
        meta: { title: '健康收集表', icon: 'edit' }
      }
    ]
  },
  {
    path: '/note',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/note/index'),
        name: 'Note',
        meta: { title: '注意事项编辑', icon: 'edit' }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/black',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Black',
        component: () => import('@/views/black/index'),
        meta: { title: '黑名单管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/booking',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Booking',
        component: () => import('@/views/booking/index'),
        meta: { title: '预约记录统计', icon: 'form' }
      },
      {
        path: 'detail/:id(\\d+)',
        component: () => import('@/views/booking/detail'),
        name: 'BookingDetail',
        meta: { title: '详情', noCache: true, activeMenu: '/booking/index' },
        hidden: true
      }
    ]
  },
  {
    path: '/foreground',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Foreground',
        component: () => import('@/views/foreground/index'),
        meta: { title: '前台登记统计', icon: 'form' }
      }
    ]
  },
  {
    path: '/cardexception',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Cardexception',
        component: () => import('@/views/cardexception/index'),
        meta: { title: '卡片异常处理', icon: 'form' }
      }
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
