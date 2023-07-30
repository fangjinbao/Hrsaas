// 员工路由
import Layout from '@/layout'
export default {
  path: '/employees',
  name: 'employees', // 做权限的时候会用到
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/employees'),
      meta: {
        title: '员工管理',
        icon: 'people'
      }
    }
  ]
}
