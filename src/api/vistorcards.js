import request from '@/utils/request'

export function getCards(data) {
  return request({
    url: '/card/getlist',
    method: 'post',
    data
  })
}

export function obsolete(data) {
  return request({
    url: '/card/Obsolete',
    method: 'post',
    data
  })
}

export function reset(data) {
  return request({
    url: '/card/reset',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: '/card/add',
    method: 'post',
    data
  })
}

export function getRecords(data) {
  return request({
    url: '/card/GetHistoryList',
    method: 'post',
    data
  })
}

export function downloadTemplate(data) {
  return request({
    url: '/card/download',
    method: 'post',
    data
  })
}

export function downloadRecord(data) {
  return request({
    url: '/card/ExportHistoryList',
    method: 'post',
    data
  })
}
