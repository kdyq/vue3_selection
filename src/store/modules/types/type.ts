import type { RouteRecordRaw } from 'vue-router'
import type { Ref } from 'vue'
import type { loginFormData, userInfoResponseData } from '@/api/user/type'
export interface UserState {
  token: Ref<string>
  menuRoute: Ref<RouteRecordRaw[]>
  username: Ref<string>
  avatar: Ref<string>
  userLogin: (data: loginFormData) => Promise<string>
  userInfo: () => Promise<userInfoResponseData>
  userLogout: () => void
}
