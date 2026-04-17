import type { RouteRecordRaw } from 'vue-router'
import type { Ref } from 'vue'
import type { loginFormData } from '@/api/user/type'
export interface UserState {
  token: Ref<string>
  menuRoute: Ref<RouteRecordRaw[]>
  userLogin: (data: loginFormData) => Promise<string>
}
