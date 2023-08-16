// 静态路由
import { constantRoutes } from '@/router'
// 动态路由
import { asyncRoutes } from '@/router'
const state = {
  // 静态路由
  routes: constantRoutes
}
const mutations = {
  // 修改routes
  // payload 登录成功后的新路由
  setRoutes(state, newRoutes) {
    // state.routes = [...state.routes, ...newRoutes] 业务错误
    state.routes = [...constantRoutes, ...newRoutes]
  }
}
const actions = {
  filterRoutes(context, menus) {
    const routes = []
    menus.forEach(key => {
      routes.push(...asyncRoutes.filter(item => item.name === key))
    })
    context.commit('setRoutes', routes)
    return routes // return 给addRoutes用的
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
