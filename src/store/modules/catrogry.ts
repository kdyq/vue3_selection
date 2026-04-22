//商品分类全局组件的小仓库
import { defineStore } from 'pinia'
import type { CategoryResponseData, CategoryObj } from '@/api/product/attr/type'
import { reqC1, reqC2, reqC3 } from '@/api/product/attr'
import { ref } from 'vue'
export const useCategoryStore = defineStore('Category', () => {
  //存储一级分类数据
  const c1Arr = ref<CategoryObj[]>([])
  const c1Id = ref<number | string>('')
  //存储二级分类数据
  const c2Arr = ref<CategoryObj[]>([])
  const c2Id = ref<number | string>('')
  //存储三级分类数据
  const c3Arr = ref<CategoryObj[]>([])
  const c3Id = ref<number | string>('')
  //获取一级分类数据
  const getC1 = async () => {
    const result: CategoryResponseData = await reqC1()
    if (result.code === 200) {
      c1Arr.value = result.data
    }
  }
  //获取二级分类数据
  const getC2 = async () => {
    const result: CategoryResponseData = await reqC2(c1Id.value)
    if (result.code === 200) {
      c2Arr.value = result.data
    }
  }
  //获取三级分类数据
  const getC3 = async () => {
    const result: CategoryResponseData = await reqC3(c2Id.value)
    if (result.code === 200) {
      c3Arr.value = result.data
    }
  }
  return { c1Arr, c1Id, c2Arr, c2Id, c3Arr, c3Id, getC1, getC2, getC3 }
})
