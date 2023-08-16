import axios from 'axios'
import store from '@/store'
// import router from '@/router'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth'

// token有效期
const TimeOue = 10000
function checkTimeOue() {
  return Date.now() - getTimeStamp() > TimeOue
}
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  function(config) {
    // console.log(config)
    // 在发送请求之前注入token
    if (store.getters.token) {
      if (checkTimeOue()) {
        // store.dispatch('user/logout')
        // router.push('/login')
        // return Promise.reject(new Error('token超时了'))
      }
      config.headers.Authorization = 'Bearer ' + store.getters.token
    }
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  function(response) {
    // 对响应数据解构
    // console.log(response)
    const { success, message, data } = response.data
    if (success) {
      return data
    } else {
      Message.error(message)
      return Promise.reject(new Error(message))
    }
  },
  function(error) {
    // 校验token有效期
    if (error.response && error.response.data && error.response.data.code === 10002) {
      // store.dispatch('user/logout')
      // router.push('/login')
      // return Promise.reject(new Error('token超时了'))
    } else {
      Message.error(error.message)
      return Promise.reject(error)
    }
  }
)
export default service
