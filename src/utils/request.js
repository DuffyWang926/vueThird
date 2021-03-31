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
    authKey: localStorage.getItem('authkey'),
    appType: 5,
    version: '1.0.01'
  }
})
let lastUrl = ''
let queryData = ''
service.interceptors.request.use(
  config => {
    const token = store.getters['user/getToken']
    console.log(token)
    if (config.url !== 'login') {
      if (token) {
        // config.headers.Authorization = token
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
    if (Number(res.status) !== 0) {
      ElMessage({
        message: res.data.message || res.message,
        type: 'error',
        duration: 2 * 1000
      })

      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 2 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
