import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/stat/getregisterstat',
    method: 'post',
    data
  })
}

export function exportdata(data) {
  return request({
    url: '/stat/exportregisterstat',
    method: 'post',
    data
  })
}

