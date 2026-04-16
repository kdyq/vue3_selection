// 用户接口相关参数 ts 类型

// 用户登录接口
export interface loginFormData {
  username: string
  password: string
}
interface dataType {
  token?: string,
  message?: string
}
// 定义全部接口返回数据都拥有 ts 类型
export interface ResponseData {
  code: number
  ok: boolean
}

// 登录接口返回数据类型
export interface loginResponseData extends ResponseData {
  data: dataType
}

// 定义用户信息返回数据类型
export interface userInfoResponseData extends ResponseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}
