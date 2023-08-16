// 权限管理路由
import Layout from '@/layout'
export default {
  path: '/permission',
  name: 'permissions', // 做权限的时候会用到
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/permission'),
      meta: {
        title: '权限管理',
        icon: 'lock'
      }
    }
  ]
}
