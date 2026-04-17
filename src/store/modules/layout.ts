import { defineStore } from 'pinia'
import { ref } from 'vue'
//layout相关组件配置
export const useLayoutStore = defineStore('layout', () => {
  const fold = ref(false)
  return { fold }
})
