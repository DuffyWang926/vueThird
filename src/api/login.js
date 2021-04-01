import request from '@/utils/request'
import apiUrl  from './url.js'


export function loginApi(params) {
  const { name, password} = params
  return request({
    url: apiUrl.loginUrl,
    method: 'post',
    data: params,
  })
}

export function menuApi(params) {
  

  return request({
    url: apiUrl.menuUrl,
    method: 'post',
    data: params,
  })
}
