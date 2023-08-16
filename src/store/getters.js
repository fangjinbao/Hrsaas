const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  token: (state) => state.user.token,
  name: (state) => state.user.userInfo.username,
  staffPhoto: (state) => state.user.userInfo.staffPhoto, // 用户头像
  companyId: (state) => state.user.userInfo.companyId, // 用户所在公司id
  routes: (state) => state.permission.routes // 权限
}
export default getters
