import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router/index'

import store from '../store/index'

let service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL, // api 的 base_url
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    // "authKey" :store.getters.authkey,
    //authKey: localStorage.getItem('authkey'),
    Authorization: 'Bearer' + localStorage.getItem('access_token'),
    appType: 5,
    version: '1.0.01'
  }
})
let lastUrl = ''
let queryData = ''
service.interceptors.request.use(
  config => {
    const token = store.getters['user/getToken']
    const tokenType = store.getters['user/getTokenType']
    console.log(token)
    //判断token是否过期，如果过期则请求刷新token.判断之前需要判断url
    if (config.url !== 'loginregis/oauth/token') {
      if (token) {
        config.headers.Authorization = tokenType + ' ' + token
      } else {
        router.push({ path: '/login' })
        return config
      }
    }
    console.log(config, 'config')
    let flag = false
    let date = new Date()
    if (lastUrl === config.url && flag) {
      while (new Date() - date < 200) {
        continue
      }
    }
    lastUrl = config.url
    queryData = config.data
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    console.log(res)
    // console.log(res.is_succ)
    if (res.is_succ !== undefined) {
      if (res.is_succ === 1) {
        res.status = 0
      } else {
        res.status = 1
      }
    }
    if (res.is_succ == -2) {
      router.push({ path: '/login' })
      ElMessage.error('登录凭证过期，请重新登录')
      return response.data
    }
    if (Number(res.status) !== 0) {
      ElMessage({
        message: res.message || res.msg,
        type: 'error',
        duration: 2 * 1000
      })

      // return Promise.reject('error')
      return response.data
    } else {
      return response.data
    }
  },
  error => {
    // ElMessage({
    //   message: error.message,
    //   type: 'error',
    //   duration: 2 * 1000
    // })
    console.log(error.message)
    return Promise.reject(error)
  }
)

export default service
