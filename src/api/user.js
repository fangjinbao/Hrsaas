import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

// 获取用户基本资料
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'POST'
    // Headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded',
    //   Authorization: token
    // }
  })
}

// 根据id获取用户基本信息（头像等)
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'GET'
  })
}

export function logout() {

}

