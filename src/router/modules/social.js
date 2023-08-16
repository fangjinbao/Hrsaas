// 社保管理
import Layout from '@/layout'
export default {
  path: '/social',
  name: 'social_securitys', // 做权限的时候会用到
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/social'),
      meta: {
        title: '社保管理',
        icon: 'table'
      }
    }
  ]
}
