// 员工api
import request from '@/utils/request'

// 获取员工简单列表
export function getEmployeeSimple() {
  return request({
    method: 'GET',
    url: '/sys/user/simple'
  })
}
