// 封装axios实例
import axios from 'axios'
export function request(config) {
  // 1`创建axios实例
  const instance = axios.create({
    // 设置默认的请求地址
    baseURL: 'http://152.136.185.210:7878/api/m5',
    // 设置请求时间 超过时间就提示请求超时错误
    timeout: 5000,
  })
  // 2`拦截器  当需要对网络请求过来的数据进行加工时使用
  // 请求拦截器
  instance.interceptors.request.use((config) => {
    return config
  }),
    (err) => {
      console.log(err)
    }
  // 响应拦截器
  instance.interceptors.response.use(
    (res) => {
      // 返回拦截的结果
      return res.data
    },
    (err) => {
      // console.log(err);
    }
  )
  // 3`发送真正的网络请求
  return instance(config)
}
