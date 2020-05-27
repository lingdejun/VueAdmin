import request from '@/utils/request'

export function getOpenId(data) {
  return request({
    url: '/user/getopenid',
    method: 'post',
    data
  })
}

export function validateBinding(data) {
  return request({
    url: '/user/validatebinding',
    method: 'post',
    data
  })
}

export function bind(data) {
  return request({
    url: '/user/bind',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
