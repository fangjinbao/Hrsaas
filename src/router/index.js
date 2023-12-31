import Vue from 'vue'
import Router from 'vue-router'
import employees from './modules/employees'
import approvals from './modules/approvals'
import attendances from './modules/attendances'
import departments from './modules/departments'
import permission from './modules/permission'
import salarys from './modules/salarys'
import social from './modules/social'
import setting from './modules/setting'

Vue.use(Router)

import Layout from '@/layout'
// 静态路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/import',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/import')
      }
    ]
  }

]
// 动态路由
export const asyncRoutes = [employees, approvals, attendances, departments, permission, salarys, social, setting]

const createRouter = () =>
  new Router({
    mode: 'history', // require service support
    base: 'jd',
    scrollBehavior: () => ({ y: 0 }),
    routes: [...constantRoutes]
  })

const router = createRouter()

// 重置路由
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
