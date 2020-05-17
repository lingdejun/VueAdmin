import request from '@/utils/request'

export function fetchGateArea(data) {
  // const para = {
  //   parameters: JSON.stringify(data)
  // }
  return request({
    url: '/controldata/getarea',
    method: 'post',
    data
  })
}
