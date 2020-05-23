import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/train/getlist',
    method: 'post',
    data
  })
}

export function stateChange(data) {
  return request({
    url: '/train/stateswitch',
    method: 'post',
    data
  })
}

export function paperSavequestions(data) {
  return request({
    url: '/train/save',
    method: 'post',
    data
  })
}

export function getTrainInfo(data) {
  return request({
    url: '/train/get',
    method: 'post',
    data
  })
}

export function delTrain(data) {
  return request({
    url: '/train/delete',
    method: 'post',
    data
  })
}

