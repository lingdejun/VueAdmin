import request from '@/utils/request'

export function getRoles() {
  return request({
    url: '/role/getlist',
    method: 'post'
  })
}

export function createRole(data) {
  return request({
    url: '/role/save',
    method: 'post',
    data
  })
}
export function delRole(data) {
  return request({
    url: '/role/delete',
    method: 'post',
    data
  })
}

export function getRoleEmp(data) {
  return request({
    url: '/role/getemp',
    method: 'post',
    data
  })
}

export function saveEmp(data) {
  return request({
    url: '/role/saveemp',
    method: 'post',
    data
  })
}

export function getRoleMenu(data) {
  return request({
    url: '/role/getmenu',
    method: 'post',
    data
  })
}

