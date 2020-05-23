import request from '@/utils/request'

export function fetchGateArea(data) {
  return request({
    url: '/controldata/getarea',
    method: 'post',
    data
  })
}

export function fetchVistorReason(data) {
  return request({
    url: '/controldata/getreason',
    method: 'post',
    data
  })
}
