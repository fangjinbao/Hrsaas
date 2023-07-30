// 工资路由
import Layout from '@/layout'
export default {
  path: '/salarys',
  name: 'salarys', // 做权限的时候会用到
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/salarys'),
      meta: {
        title: '工资管理',
        icon: 'money'
      }
    }
  ]
}
