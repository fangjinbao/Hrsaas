import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
const state = {
  token: getToken(), // 用户token
  userInfo: {} // 用户信息
}
const mutations = {
  // 设置token
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  // 删除token
  removeToken() {
    state.token = null
    removeToken()
  },
  // 获取用户基本资料
  serUserInfo(state, result) {
    state.userInfo = result
  },
  // 删除用户信息
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  // 登录
  async login(context, data) {
    const result = await login(data)
    if (result) {
      context.commit('setToken', result)
      setTimeStamp() // 设置当前时间戳
    }
  },
  // 获取用户基本资料
  async getUserInfo(context) {
    const result = await getUserInfo()
    // 根据id获取用户详情
    const baseInfo = await getUserDetailById(result.userId)
    context.commit('serUserInfo', { ...result, ...baseInfo })
    // console.log({ ...result, ...baseInfo })
    // console.log(result)
    // console.log(baseInfo)
    return result // 用于权限处理
  },

  // 登出
  logout(context) {
    context.commit('removeToken')
    context.commit('removeUserInfo')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
