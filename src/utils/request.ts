//进行axios二次封装，使用请求拦截器和响应拦截器
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/modules/user'
//创建axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000, //超时时间
})
//请求拦截器
request.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    // 请求头添加token
    if (userStore.token) {
      config.headers.token = userStore.token
    }
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  },
)
//响应拦截器
request.interceptors.response.use(
  (response) => {
    // 成功回调
    /* 判断服务返回的 code
       200 -> 请求成功
       201 -> 请求参数错误
       202 -> 用户名已存在，用于创建用户
       203 -> 用户名不存在，用于登录
       204 -> 用户名或密码错误，用于登录
       205 -> 服务繁忙，服务内部错误
       206 -> 无效的Token
       207 -> 无权访问，需要登录
       208 -> 该节点下有子节点，不可以删除
    */
    const code = response.data.code
    if (code !== 200) {
      // 提示错误信息
      ElMessage({
        type: 'error',
        message: response.data.message,
      })
      // 抛出错误
      return Promise.reject(new Error(response.data.message))
    }

    // 返回数据
    return response.data
  },
  (error) => {
    // 失败回调：处理http网络错误
    // 定义变量存储网络错误信息
    let message = '网络出现问题'
    // http状态码
    const status = error.response?.status
    switch (status) {
      case 401:
        message = 'Token 过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现问题'
        break
    }
    // 提示错误信息
    ElMessage({
      type: 'error',
      message,
    })

    return Promise.reject(error)
  },
)
export default request
