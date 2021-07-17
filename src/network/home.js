import { request } from 'network/request'
// 当我们请求多个数据的时候方便处理
export function getHomeMultidata() {
  return request({
    url: '/home/multidata',
  })
}
