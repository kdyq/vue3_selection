<template>
    <el-form label-width="80px">
        <el-form-item label="SKU名称">
            <el-input placeholder="SKU名称" clearable v-model="skuParmas.skuName" />
        </el-form-item>
        <el-form-item label="价格(元)">
            <el-input placeholder="价格(元)" clearable type="number" v-model="skuParmas.price" />
        </el-form-item>
        <el-form-item label="重量(克)">
            <el-input placeholder="重量(克)" clearable type="number" v-model="skuParmas.weight" />
        </el-form-item>
        <el-form-item label="SKU描述">
            <el-input placeholder="SKU描述" clearable type="textarea" v-model="skuParmas.skuDesc" />
        </el-form-item>
        <el-form-item label="平台属性">
            <el-form :inline="true" label-width="80px">
                <el-form-item v-for="item in attrArr" :key="item.id" :label="item.attrName" style="margin-top: 5px;">
                    <el-select placeholder="请选择" style="width: 200px" v-model="item.attrIdAndValueId">
                        <el-option v-for="i in item.attrValueList" :key="i.id" :value="`${item.id}:${i.id}`"
                            :label="i.valueName"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

        </el-form-item>
        <el-form-item label="销售属性">
            <el-form :inline="true">
                <el-form-item v-for="item in saleArr" :key="item.id" style="margin-top: 5px;"
                    :label="item.saleAttrName">
                    <el-select placeholder="请选择" style="width: 150px" v-model="item.saleIdAndValueId">
                        <el-option v-for="i in item.spuSaleAttrValueList" :key="i.id" :label="i.saleAttrValueName"
                            :value="`${item.id}:${i.id}`"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

        </el-form-item>
        <el-form-item label="图片名称">
            <el-table border :data="imgArr" ref="table" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="80px" align="center"></el-table-column>
                <el-table-column label="图片">
                    <template v-slot="{ row }">
                        <img :src="row.imgUrl" alt="" style="height: 100px;width: 100px;">
                    </template>
                </el-table-column>
                <el-table-column label="名称" prop="imgName"></el-table-column>
                <el-table-column label="操作">
                    <template v-slot="{ row }">
                        <el-button type="warning" size="default" @click="handle(row)"
                            :disabled="isDefault(row)">设为默认</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="default" @click="save">保存</el-button>
            <el-button size="default" @click="cancel">取消</el-button>
        </el-form-item>

    </el-form>

</template>

<script setup lang="ts" name="skuForm">
import { ref, reactive, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import type { SpuData, SaleAttrResponseData, SpuHasImg, SaleAttr, SpuImg, SkuData } from '@/api/product/spu/type'
import type { AttrResponseData, Attr } from '@/api/product/attr/type'
import { reqAttr } from '@/api/product/attr'
import { reqSpuImageList, reqSpuHasSaleAttr, reqAddSku } from '@/api/product/spu'
const $emit = defineEmits(['changeScene'])
//定义变量存储数据
const attrArr = ref<Attr[]>([])
const saleArr = ref<SaleAttr[]>([])
const imgArr = ref<SpuImg[]>([])
//组件实例
const table = ref<any>()
// 防止点击按钮时 clearSelection 触发 selection-change，把默认图清空
const settingByButton = ref(false)
//手机sku的参数
const skuParmas = reactive<SkuData>({
    category3Id: '',//三级分类ID
    spuId: '',//spu的ID
    tmId: '',//品牌ID
    skuName: '',//sku名称
    price: '',//sku价格
    weight: '',//sku重量
    skuDesc: '',//sku描述
    skuAttrValueList: [],//平台属性
    skuSaleAttrValueList: [],//销售属性
    skuDefaultImg: '' //sku默认图片
})
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
    skuParmas.category3Id = spu.category3Id
    skuParmas.spuId = spu.id as string
    skuParmas.tmId = spu.tmId
}
// 判断当前行是不是默认图
const isDefault = (row: SpuImg) => {
    return skuParmas.skuDefaultImg === row.imgUrl
}
//设置默认图片
const handle = async (row: SpuImg) => {
    settingByButton.value = true
    skuParmas.skuDefaultImg = row.imgUrl as string
    //勾选图片
    //初始化
    table.value?.clearSelection()
    //选中图片
    table.value.toggleRowSelection(row, true)
    await nextTick()
    settingByButton.value = false
}
// 手动取消勾选时，取消默认状态
const handleSelectionChange = (selection: SpuImg[]) => {
    if (settingByButton.value) return

    const currentDefaultStillSelected = selection.some(
        item => item.imgUrl === skuParmas.skuDefaultImg
    )

    // 如果当前默认图被手动取消勾选，则清空默认图
    if (!currentDefaultStillSelected) {
        skuParmas.skuDefaultImg = ''
    }
}
//保存
const save = async () => {
    //整理参数
    //平台属性
    skuParmas.skuAttrValueList = attrArr.value.reduce((prev: any, next: any) => {
        if (next.attrIdAndValueId) {
            const [attrId, valueId] = next.attrIdAndValueId.split(':')
            prev.push({ attrId, valueId })
        }
        return prev
    }, [])
    //销售属性
    skuParmas.skuSaleAttrValueList = saleArr.value.reduce((prev: any, next: any) => {
        if (next.saleIdAndValueId) {
            const [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':')
            prev.push({ saleAttrId, saleAttrValueId })
        }
        return prev
    }, [])
    //发请求
    const result: any = await reqAddSku(skuParmas)
    if (result.code === 200) {
        ElMessage.success('添加SKU成功')
        //切换场景
        $emit('changeScene', { flag: 0, params: 'add' })
    } else {
        ElMessage.error('添加SKU失败,请检查参数是否正确')
    }

}
defineExpose({ initSkuData })
</script>

<style lang="scss" scoped></style>