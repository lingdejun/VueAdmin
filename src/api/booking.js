import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/stat/getappointmentstat',
    method: 'post',
    data
  })
}

export function getDetail(data) {
  return request({
    url: '/appointment/getdetail',
    method: 'post',
    data
  })
}

export function getVipDetail(data) {
  return request({
    url: '/appointment/getvipdetail',
    method: 'post',
    data
  })
}
