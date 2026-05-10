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
                    <el-button type="primary" size="default" icon="Top" title="上架/下架"></el-button>
                    <el-button type="warning" size="default" icon="Edit" title="编辑"></el-button>
                    <el-button type="info" size="default" icon="View" title="查看"></el-button>
                    <el-button type="danger" size="default" icon="Delete" title="删除"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[6, 8, 10]"
            :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="total" :pager-count="5"
            @current-change="getHasSku" @size-change="changePageSize" />

    </el-card>

</template>

<script setup lang="ts" name="sku">
import { ref, onMounted } from 'vue'
import { reqSkuList } from '@/api/product/sku';
import type { SkuResponseData, SkuData } from '@/api/product/sku/type';
//默认页码
const currentPage = ref<number>(1);
//默认每页显示的条数
const pageSize = ref<number>(6);
//总条数
const total = ref<number>(0);
//存储数据
const skuArr = ref<SkuData[]>([])
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
</script>

<style scoped></style>