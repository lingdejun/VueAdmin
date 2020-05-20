import request from '@/utils/request'

export function get(data) {
  return request({
    url: '/sysconfig/get',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/sysconfig/update',
    method: 'post',
    data
  })
}
