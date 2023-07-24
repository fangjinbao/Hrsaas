import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式

const whiteList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
// 调试使用
//   console.log(to)
//   console.log(from)
//   console.log(next)
  NProgress.start() // 开启进度条
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      // if (!store.state.user.userInfo.userId) {
      //   await store.dispatch('user/getUserInfo')
      // }
      if (!store.state.user.userInfo.userId) await store.dispatch('user/getUserInfo')
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
  NProgress.done() // 手动强制关闭一次  为了解决 手动切换地址时  进度条的不关闭的问题
})

router.afterEach(() => {
  NProgress.done() // 关闭进度条
})
