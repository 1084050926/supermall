import { request } from 'network/request'
// 当我们请求多个数据的时候方便处理
export function getHomeMultidata() {
  return request({
    url: '/home/multidata',
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page,
    },
  })
}
