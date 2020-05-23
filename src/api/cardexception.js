import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/card/geterrlist',
    method: 'post',
    data
  })
}
