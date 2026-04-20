//用户相关信息的仓库
import { defineStore } from 'pinia'
import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from '@/api/user/type'
import { reqLogin, reqUserInfo } from '@/api/user'
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
        token.value = result.data.token as string
        return 'ok'
      } else {
        throw new Error(result.data.message)
      }
    }
    const username = ref('')
    const avatar = ref('')
    //获取用户信息
    const userInfo = async () => {
      const result: any = await reqUserInfo()
      if (result.code == 200) {
        username.value = result.data.checkUser.username
        avatar.value = result.data.checkUser.avatar
        return result
      } else {
        return Promise.reject('获取用户信息失败')
      }
    }
    //清空登录信息
    const userLogout = () => {
      // 清空所有状态
      token.value = ''
      username.value = ''
      avatar.value = ''
      // 重置菜单
      menuRoute.value = constantRoute
      // 清空本地存储
      localStorage.removeItem('token')
      return 'ok'
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
