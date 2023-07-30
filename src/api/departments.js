// 组织架构api
import request from '@/utils/request'

// 获取组织架构数据
export function getDepartments() {
  return request({
    method: 'GET',
    url: '/company/department'
  })
}

// 删除部门
export function delDepartment(id) {
  return request({
    method: 'POST',
    url: `/company/department/${id}`
  })
}

// 新增部门
export function addDepartment(data) {
  return request({
    method: 'POST',
    url: '/company/department',
    data
  })
}

// 获取某个部门详情
export function getDepartDetail(id) {
  return request({
    method: 'GET',
    url: `/company/department/${id}`
  })
}

// 编辑部门信息
export function updateDepartments(data) {
  return request({
    method: 'PUT',
    url: `/company/department/${data.id}`,
    data
  })
}
