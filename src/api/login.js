import request from '@/utils/request'
import apiUrl from './url.js'

export function loginApi(params) {
  // const { name, password } = params
  return request({
    url: apiUrl.loginUrl,
    method: 'get',
    params: params
  })
}

export function menuApi(params) {
  return request({
    url: apiUrl.menuUrl,
    method: 'get',
    data: params
  })
}
