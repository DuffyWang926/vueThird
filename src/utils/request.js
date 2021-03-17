import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'

let service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL, // api 的 base_url
  timeout: 10000, // 请求超时时间
  headers: {
    "Content-Type": 'application/json',
    'Cache-Control': 'no-cache',
    // "authKey" :store.getters.authkey,
    "authKey": localStorage.getItem('authkey'),
    "appType": 5,
    "version": '1.0.01'
  }
});
let lastUrl = '';
let queryData = '';
service.interceptors.request.use(
  config => {
    console.log(config, 'config')
    let flag = false;
    let date = new Date();
    if (lastUrl === config.url && flag) {
      while (new Date() - date < 200) {
        continue;
      }
    }
    lastUrl = config.url;
    queryData = config.data;
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
);

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    console.log(res)
    if (Number(res.status) !== 0) {
      ElMessage({
        message: res.message,
        type: 'error',
        duration: 2 * 1000
      });

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
