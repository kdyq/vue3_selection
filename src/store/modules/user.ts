//用户相关信息的仓库
import { defineStore } from 'pinia'
import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from '@/api/user/type'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
import { ref } from 'vue'
import { constantRoute } from '@/router/routers'
import type { UserState } from './types/type'
export const useUserStore = defineStore(
  'User',
  (): UserState => {
    const token = ref('')
    const menuRoute = ref(constantRoute) //存储生成菜单
    //登录
    const userLogin = async (data: loginFormData) => {
      const result: loginResponseData = await reqLogin(data)
      // console.log(result);
      if (result.code == 200) {
        token.value = result.data as string
        return 'ok'
      } else {
        throw new Error(result.data)
      }
    }
    const username = ref('')
    const avatar = ref('')
    //获取用户信息
    const userInfo = async () => {
      const result: userInfoResponseData = await reqUserInfo()
      if (result.code == 200) {
        username.value = result.data.name
        avatar.value = result.data.avatar
        return result
      } else {
        return Promise.reject(new Error(result.message))
      }
    }
    //清空登录信息
    const userLogout = async () => {
      const result: any = await reqLogout()
      if (result.code == 200) {
        // 清空所有状态
        token.value = ''
        username.value = ''
        avatar.value = ''
        // 重置菜单
        menuRoute.value = constantRoute
        // 清空本地存储
        localStorage.removeItem('token')
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    }
    return {
      userLogin,
      userInfo,
      userLogout,
      token,
      menuRoute,
      username,
      avatar,
    }
  },
  //持久化存储
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
