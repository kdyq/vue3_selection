import { defineStore } from 'pinia'
import { ref } from 'vue'
//layout相关组件配置
export const useLayoutStore = defineStore('layout', () => {
  const fold = ref(false) //控制折叠效果
  const refresh = ref(false) //控制刷新效果
  return { fold, refresh }
})
