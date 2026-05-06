<template>
    <el-form label-width="100px">
        <el-form-item label="SPU名称">
            <el-input placeholder="请输入SPU名称"></el-input>
        </el-form-item>
        <el-form-item label="SPU品牌">
            <el-select style="width: 200px">
                <el-option label="全部" value=""></el-option>
                <el-option label="全部" value=""></el-option>
                <el-option label="全部" value=""></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="SPU描述">
            <el-input type="textarea" placeholder="请输入SPU描述"></el-input>
        </el-form-item>
        <el-form-item label="SPU图片">
            <el-upload action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" list-type="picture-card">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>
            <el-dialog>
                <img w-full alt="Preview Image" />
            </el-dialog>
        </el-form-item>
        <el-form-item label="SPU销售属性">
            <el-select style="width: 200px">
                <el-option label="全部" value=""></el-option>
                <el-option label="全部" value=""></el-option>
                <el-option label="全部" value=""></el-option>
            </el-select>
            <el-button style="margin-left: 10px;" type="primary" size="default" icon="Plus">添加属性值</el-button>
            <!-- 展示销售属性和属性值 -->
            <el-table border style="margin: 10px 0;">
                <el-table-column label="序号" type="index" width="80px" align="center">
                </el-table-column>
                <el-table-column label="销售属性名" width="120px">
                </el-table-column>
                <el-table-column label="销售属性值">
                </el-table-column>
                <el-table-column label="操作" width="120px">
                </el-table-column>
            </el-table>

        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="default">保存</el-button>
            <el-button size="default" @click="cansel">取消</el-button>

        </el-form-item>

    </el-form>

</template>

<script setup lang="ts" name="spuForm">
import { ref } from 'vue'
import { useUserStore } from '@/store/modules/user'
import type { SpuData, AllTradeMark, SpuHasImg, SaleAttrResponseData, HasSaleAttrResponseData, Trademark, SpuImg, SaleAttr, HasSaleAttr } from '@/api/product/spu/type'
import { reqAllTradeMark, reqAllSaleAttr, reqSpuImageList, reqSpuHasSaleAttr } from '@/api/product/spu'
const userStore = useUserStore()
const headers = { Token: userStore.token }
const $emit = defineEmits(['changeScene'])
//存储已有的SPU数据
const allTradeMark = ref<Trademark[]>()
//存储商品图片
const spuImg = ref<SpuImg[]>()
//存储某个SPU的销售属性数据
const saleAttr = ref<SaleAttr[]>()
//存储已有的全部SPU的销售属性
const allSaleAttr = ref<HasSaleAttr[]>()
//点击取消按钮
const cansel = () => {
    $emit('changeScene', 0)
}
//自定义方法，用于获取数据
const initHasSpuData = async (row: SpuData) => {
    //row为父组件传入的当前SPU数据（不完整）
    //获取全部品牌的数据
    const spu_ALL: AllTradeMark = await reqAllTradeMark()
    //获取某个品牌旗下的商品图片
    const spu_img: SpuHasImg = await reqSpuImageList((row.id as number))
    //获取某个SPU下的销售属性数据
    const spu_sale: SaleAttrResponseData = await reqSpuHasSaleAttr((row.id as number))
    //获取已有的全部SPU的销售属性
    const all_sale: HasSaleAttrResponseData = await reqAllSaleAttr()
    // 存储
    allTradeMark.value = spu_ALL.data
    spuImg.value = spu_img.data
    saleAttr.value = spu_sale.data
    allSaleAttr.value = all_sale.data
}
//对外暴露
defineExpose({
    initHasSpuData
})
</script>

<style lang="scss" scoped></style>