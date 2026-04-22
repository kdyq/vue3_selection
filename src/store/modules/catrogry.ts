//商品分类全局组件的小仓库
import { defineStore } from 'pinia'
import type { CategoryResponseData, CategoryObj } from '@/api/product/attr/type'
import { reqC1 } from '@/api/product/attr'
import { ref } from 'vue'
export const useCategoryStore = defineStore('Category', () => {
  //存储一级分类数据
  const c1Arr = ref<CategoryObj[]>([])
  const c1Id = ref<number | string>('')

  const getC1 = async () => {
    const result: CategoryResponseData = await reqC1()
    if (result.code === 200) {
      c1Arr.value = result.data
    }
  }
  return { c1Arr, getC1, c1Id }
})
