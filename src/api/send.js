import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/submission/getlist',
    method: 'post',
    data
  })
}

export function delSend(data) {
  return request({
    url: '/submission/delete',
    method: 'post',
    data
  })
}

export function getDetail(data) {
  return request({
    url: '/submission/get',
    method: 'post',
    data
  })
}

export function saveSubmission(data) {
  return request({
    url: '/submission/get',
    method: 'post',
    data
  })
}
