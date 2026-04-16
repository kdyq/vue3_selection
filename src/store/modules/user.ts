//用户相关信息的仓库
import { defineStore } from 'pinia'
import type { loginFormData, loginResponseData } from '@/api/user/type'
import { reqLogin } from '@/api/user'
import { ref } from 'vue'
import type { UserState } from './types/type'
export const useUserStore = defineStore(
  'User',
  () => {
    const token = ref<string>('')
    const userLogin = async (data: loginFormData) => {
      const result: loginResponseData = await reqLogin(data)
      // console.log(result);
      if (result.code == 200) {
        token.value = result.data.token as string
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    }
    return { userLogin, token }
    //持久化存储
  },
  {
    persist: {
      key: 'token',
      storage: localStorage,
      paths: ['token'],
      serializer: {
        serialize: (state) => state.token,
        deserialize: (value) => ({ token: value }),
      },
    },
  },
)
