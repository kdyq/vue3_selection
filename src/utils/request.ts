import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/modules/user'
import pinia from '@/store'

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})

request.interceptors.request.use(
  (config) => {
    const userStore = useUserStore(pinia)

    if (userStore.token) {
      config.headers.token = userStore.token
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

request.interceptors.response.use(
  (response) => {
    const code = response.data.code

    if (code !== 200) {
      ElMessage({
        type: 'error',
        message: response.data.message,
      })

      return Promise.reject(new Error(response.data.message))
    }

    return response.data
  },
  (error) => {
    let message = '网络出现问题'
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

    ElMessage({
      type: 'error',
      message,
    })

    return Promise.reject(error)
  },
)

export default request
