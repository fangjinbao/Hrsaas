// 审批路由
import Layout from '@/layout'
export default {
  path: '/approvals',
  name: 'approvals', // 做权限的时候会用到
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/approvals'),
    meta: {
      title: '审批管理'
    }
  }]
}
