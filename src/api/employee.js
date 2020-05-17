import request from '@/utils/request'

export function fetchList(data) {
  // const para = {
  //   parameters: JSON.stringify(data)
  // }
  return request({
    url: '/Emp/GetList',
    method: 'post',
    data
  })
}

export function createEmployee(data) {
  return request({
    url: '/emp/save',
    method: 'post',
    data
  })
}

export function updateEmployee(data) {
  return request({
    url: '/emp/save',
    method: 'post',
    data
  })
}

export function delEmployee(data) {
  return request({
    url: '/emp/delete',
    method: 'post',
    data
  })
}

