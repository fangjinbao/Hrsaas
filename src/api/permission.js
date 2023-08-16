import request from '@/utils/request'

// 获取权限点列表
export function getPermissionList() {
  return request({
    url: '/sys/permission'
  })
}

// 新增权限
export function addPermission(data) {
  return request({
    url: '/sys/permission',
    method: 'POST',
    data
  })
}

// 更新权限
export function updatePermission(data) {
  return request({
    url: `/sys/permission/${data.id}`,
    method: 'PUT',
    data
  })
}

// 删除权限
export function delPermission(id) {
  return request({
    url: `/sys/permission/${id}`,
    method: 'DELETE'
  })
}

// 查看权限点详情
export function getPermissionDetail(id) {
  return request({
    url: `/sys/permission/${id}`
  })
}
