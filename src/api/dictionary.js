import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/dict/getlist',
    method: 'post',
    data
  })
}

export function getItemList(data) {
  return request({
    url: '/dict/getitemlist',
    method: 'post',
    data
  })
}

export function getChildList(data) {
  return request({
    url: '/dict/get',
    method: 'post',
    data
  })
}

export function saveItem(data) {
  return request({
    url: '/dict/save',
    method: 'post',
    data
  })
}

export function delItem(data) {
  return request({
    url: '/dict/delete',
    method: 'post',
    data
  })
}

export function moveItem(data) {
  return request({
    url: '/dict/switchindex',
    method: 'post',
    data
  })
}
