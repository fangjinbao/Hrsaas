// 公司设置
import Layout from '@/layout'
export default {
  path: '/setting',
  name: 'settings', // 做权限的时候会用到
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/setting'),
      meta: {
        title: '公司设置',
        icon: 'setting'
      }
    }
  ]
}
