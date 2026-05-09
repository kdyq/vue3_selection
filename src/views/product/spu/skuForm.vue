<template>
    <el-form label-width="80px">
        <el-form-item label="SKU名称">
            <el-input placeholder="SKU名称" clearable />
        </el-form-item>
        <el-form-item label="价格(元)">
            <el-input placeholder="价格(元)" clearable type="number" />
        </el-form-item>
        <el-form-item label="重量(克)">
            <el-input placeholder="重量(克)" clearable type="number" />
        </el-form-item>
        <el-form-item label="SKU描述">
            <el-input placeholder="SKU描述" clearable type="textarea" />
        </el-form-item>
        <el-form-item label="平台属性">
            <el-form :inline="true" label-width="80px">
                <el-form-item v-for="item in attrArr" :key="item.id" :label="item.attrName" style="margin-top: 5px;">
                    <el-select placeholder="请选择" style="width: 200px">
                        <el-option v-for="i in item.attrValueList" :key="i.id" :value="i.valueName"
                            :label="i.valueName"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

        </el-form-item>
        <el-form-item label="销售属性">
            <el-form :inline="true">
                <el-form-item v-for="item in saleArr" :key="item.id" style="margin-top: 5px;"
                    :label="item.saleAttrName">
                    <el-select placeholder="请选择" style="width: 150px">
                        <el-option v-for="i in item.spuSaleAttrValueList" :key="i.id" :label="i.saleAttrValueName"
                            :value="i.saleAttrValueName"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

        </el-form-item>
        <el-form-item label="图片名称">
            <el-table border :data="imgArr">
                <el-table-column type="selection" width="80px" align="center"></el-table-column>
                <el-table-column label="图片">
                    <template v-slot="{ row }">
                        <img :src="row.imgUrl" alt="" style="height: 100px;width: 100px;">
                    </template>
                </el-table-column>
                <el-table-column label="名称" prop="imgName"></el-table-column>
                <el-table-column label="操作">
                    <template v-slot="{ row }">
                        <el-button type="warning" size="default">设为默认</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="default">保存</el-button>
            <el-button size="default" @click="cancel">取消</el-button>
        </el-form-item>

    </el-form>

</template>

<script setup lang="ts" name="skuForm">
import { ref } from 'vue'
import type { SpuData, SaleAttrResponseData, SpuHasImg, SaleAttr, SpuImg } from '@/api/product/spu/type'
import type { AttrResponseData, Attr } from '@/api/product/attr/type'
import { reqAttr } from '@/api/product/attr'
import { reqSpuImageList, reqSpuHasSaleAttr } from '@/api/product/spu'
const $emit = defineEmits(['changeScene'])
//定义变量存储数据
const attrArr = ref<Attr[]>([])
const saleArr = ref<SaleAttr[]>([])
const imgArr = ref<SpuImg[]>([])
//取消按钮的回调
const cancel = () => {
    $emit('changeScene', { flag: 0, params: 'add' })
}
//对外暴露初始化数据的方法
const initSkuData = async (c1Id: number | string, c2Id: number | string, spu: SpuData) => {
    //获取平台属性
    const attr: AttrResponseData = await reqAttr(c1Id, c2Id, spu.category3Id)
    //获取销售属性
    const sale: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id as number)
    //获取图片
    const img: SpuHasImg = await reqSpuImageList(spu.id as number)
    //存储
    attrArr.value = attr.data
    saleArr.value = sale.data
    imgArr.value = img.data
}
defineExpose({ initSkuData })
</script>

<style lang="scss" scoped></style>