// 组织架构路由
import Layout from '@/layout'
export default {
  path: '/departments',
  name: 'departments', // 做权限的时候会用到
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/departments'),
    meta: {
      title: '组织架构'
    }
  }]
}
