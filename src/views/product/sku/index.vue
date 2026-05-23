<template>
    <el-card>
        <el-table border stripe :data="skuArr">
            <el-table-column label="序号" width="80px" type="index" align="center">
            </el-table-column>
            <el-table-column label="名称" width="180px" show-overflow-tooltip prop="skuName">
            </el-table-column>
            <el-table-column label="描述" width="180px" show-overflow-tooltip prop="skuDesc">
            </el-table-column>
            <el-table-column label="图片" width="180px">
                <template v-slot="{ row }">
                    <img :src="row.skuDefaultImg" alt="" style="width: 100px;height: 100px;">
                </template>
            </el-table-column>
            <el-table-column label="重量(g)" width="180px" prop="weight">
            </el-table-column>
            <el-table-column label="价格(元)" width="180px" prop="price">
            </el-table-column>
            <el-table-column label="操作" width="300px" fixed="right">
                <template v-slot="{ row }">
                    <el-button :type="row.isSale == 1 ? 'info' : 'primary'" size="default"
                        :icon="row.isSale == 1 ? 'Bottom' : 'Top'" :title="row.isSale == 1 ? '下架' : '上架'"
                        @click="changeSale(row)" v-has="`btn.Sku.updown`"></el-button>
                    <el-button type="warning" size="default" icon="Edit" title="更新" @click="updateSku"
                        v-has="`btn.Sku.update`"></el-button>
                    <el-button type="success" size="default" icon="View" title="查看" @click="viewSku(row)"
                        v-has="`btn.Sku.detail`"></el-button>
                    <el-popconfirm :title="`你确定删除 ${row.skuName} 吗`" width="auto" @confirm="deleteSku(row)">
                        <template #reference>
                            <el-button type="danger" size="default" icon="Delete" title="删除"
                                v-has="`btn.Sku.delete`"></el-button>
                        </template>
                    </el-popconfirm>

                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[6, 8, 10]"
            :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="total" :pager-count="5"
            @current-change="getHasSku" @size-change="changePageSize" />
        <!-- 抽屉组件，展示商品详情 -->
        <el-drawer v-model="drawer">
            <template #header>
                <h4>SKU详情</h4>
            </template>
            <template #default>
                <el-row style="margin-top: 10px;">
                    <el-col :span="6">名称</el-col>
                    <el-col :span="18">{{ skuInfo?.skuName }}</el-col>
                </el-row>
                <el-row style="margin-top: 10px;">
                    <el-col :span="6">描述</el-col>
                    <el-col :span="18">{{ skuInfo?.skuDesc }}</el-col>
                </el-row>
                <el-row style="margin-top: 10px;">
                    <el-col :span="6">价格</el-col>
                    <el-col :span="18">{{ skuInfo?.price }}</el-col>
                </el-row>
                <el-row style="margin-top: 10px;">
                    <el-col :span="6">平台属性</el-col>
                    <el-col :span="18">
                        <el-tag type="danger" v-for="item in skuInfo?.skuAttrValueList" :key="item.id"
                            style="margin: 5px;">{{ item.valueName }}</el-tag>
                    </el-col>
                </el-row>
                <el-row style="margin-top: 10px;">
                    <el-col :span="6">销售属性</el-col>
                    <el-col :span="18">
                        <el-tag v-for="item in skuInfo?.skuSaleAttrValueList" :key="item.id" style="margin: 5px;">{{
                            item.saleAttrValueName }}</el-tag>
                    </el-col>
                </el-row>
                <el-row style="margin-top: 10px;">
                    <el-col :span="6">商品图片</el-col>
                    <el-col :span="18">
                        <el-carousel :interval="4000" type="card" height="200px">
                            <el-carousel-item v-for="item in skuInfo?.skuImageList" :key="item.id">
                                <img :src="item.imgUrl" alt="" style="height: 100%; width: 100%;">
                            </el-carousel-item>
                        </el-carousel>
                    </el-col>
                </el-row>
            </template>
        </el-drawer>

    </el-card>

</template>

<script setup lang="ts" name="sku">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus';
import { reqSkuList, reqSaleSku, reqCancelSale, reqSkuInfo, reqRemoveSku } from '@/api/product/sku';
import type { SkuResponseData, SkuData, SkuInfoData } from '@/api/product/sku/type';
import { sk } from 'element-plus/es/locale/index.mjs';
//默认页码
const currentPage = ref<number>(1);
//默认每页显示的条数
const pageSize = ref<number>(6);
//总条数
const total = ref<number>(0);
//存储数据
const skuArr = ref<SkuData[]>([])
//控制抽屉组件的显示与隐藏
const drawer = ref<boolean>(false)
//存储sku详情信息
const skuInfo = ref<SkuData>()
//组件挂载完毕
onMounted(() => {
    getHasSku();
})
const getHasSku = async (page = 1) => {
    currentPage.value = page
    const result: SkuResponseData = await reqSkuList(currentPage.value, pageSize.value)
    if (result.code == 200) {
        total.value = result.data.total
        skuArr.value = result.data.records
    }
}
//改变每页显示的条数
const changePageSize = () => {
    getHasSku();
}
//改变SKU上架与下架
const changeSale = async (row: SkuData) => {
    //isSale=1表示以上架，isSale=0表示已下架
    if (row.isSale == 1) {
        await reqCancelSale(row.id as number)
        ElMessage.success('下架成功')
        //重新获取数据
        getHasSku(currentPage.value)
    } else {
        await reqSaleSku(row.id as number)
        ElMessage.success('上架成功')
        getHasSku(currentPage.value)
    }
}
//更新SKU
const updateSku = () => {
    ElMessage.warning('此功能正在开发中...')
}
//查看商品详情
const viewSku = async (row: SkuData) => {
    drawer.value = true
    //获取SKU详情数据
    const result: SkuInfoData = await reqSkuInfo(row.id as number)
    skuInfo.value = result.data
}
//删除sku
const deleteSku = async (row: SkuData) => {
    const result = await reqRemoveSku(row.id as number)
    if (result.code == 200) {
        ElMessage.success('删除成功')
        getHasSku(skuArr.value.length > 1 ? currentPage.value : currentPage.value - 1)
    }
}
</script>

<style scoped>
.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>