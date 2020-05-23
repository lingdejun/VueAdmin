import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/blacklist/getlist',
    method: 'post',
    data
  })
}

export function getDetail(data) {
  return request({
    url: '/blacklist/get',
    method: 'post',
    data
  })
}

export function saveBlack(data) {
  return request({
    url: '/blacklist/save',
    method: 'post',
    data
  })
}

export function delBlack(data) {
  return request({
    url: '/blacklist/delete',
    method: 'post',
    data
  })
}

export function exportBlack(data) {
  return request({
    url: '/blacklist/export',
    method: 'post',
    data
  })
}

export function downloadBlack(data) {
  return request({
    url: '/blacklist/download',
    method: 'post',
    data
  })
}
