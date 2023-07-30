import request from '@/utils/request'

// 获取所有角色列表
export function getRoleList(params) {
  return request({
    method: 'GET',
    url: '/sys/role',
    params
  })
}

// 根据id查询企业信息
export function getCompanyInfo(companyId) {
  return request({
    method: 'GET',
    url: `/company/${companyId}`
  })
}

// 删除角色
export function deleteRole(id) {
  return request({
    method: 'delete',
    url: `/sys/role/${id}`
  })
}

// 根据id获取角色详情
export function getRoleDetail(id) {
  return request({
    method: 'GET',
    url: `/sys/role/${id}`
  })
}

// 根据id更新角色
export function updateRole(data) {
  return request({
    method: 'PUT',
    url: `/sys/role/${data.id}`,
    data
  })
}

// 添加角色
export function addRole(data) {
  return request({
    method: 'POST',
    url: '/sys/role',
    data
  })
}
