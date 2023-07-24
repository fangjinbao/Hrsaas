// 考勤路由
import Layout from '@/layout'
export default {
  path: '/attendances',
  name: 'attendances', // 做权限的时候会用到
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/attendances'),
    meta: {
      title: '考勤管理'
    }
  }]
}
