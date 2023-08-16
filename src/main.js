import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import Components from '@/components'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

// 全局混入
import CheckPermission from '@/mixin/checkPermission'
Vue.mixin(CheckPermission)

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import * as directives from '@/directives'
import * as filters from '@/filters'

import '@/icons' // icon
import '@/permission' // permission control

// 注册自定义指令
Object.keys(directives).forEach((key) => {
  Vue.directive(key, directives[key])
})
// 注册过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)
Vue.use(Components)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
