<template>
    <el-card>
        <!-- 左上角添加品牌按钮 -->
        <el-button type="primary" size="default" icon="Plus">添加品牌</el-button>
        <!-- 表格组件 -->
        <el-table style="margin: 10px 0;" border :data="trademarkArr">
            <el-table-column label="序号" width="90px" align="center" type="index"></el-table-column>
            <el-table-column label="品牌名称" align="center">
                <!-- 默认是div，这里用插槽 -->
                <template v-slot="{ row }">
                    <pre>{{ row.tmName }}</pre>
                </template>
            </el-table-column>
            <el-table-column label="品牌LOGO" align="center">
                <template v-slot="{ row }">
                    <div style="display: flex; justify-content: center; align-items: center;">
                        <img :src="row.logoUrl" style="width: 100px; height: 100px; object-fit: contain;" />
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="品牌操作" align="center">
                <template v-slot="{ row }">
                    <el-tooltip content="编辑" placement="top">
                        <el-button type="warning" size="default" icon="Edit"></el-button>
                    </el-tooltip>
                    <el-tooltip content="删除" placement="top">
                        <el-button type="danger" size="default" icon="Delete"></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器组件 -->
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
            :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="total" />
    </el-card>
</template>

<script setup lang="ts" name="tradmark">
import { ref, onMounted } from 'vue'
import { reqHasTrademark } from '@/api/product/trademark/index'
import type { TradeMarkResponseData, Trademark, Records } from '@/api/product/trademark/type'
//当前页码
const currentPage = ref<number>(1)
//每页显示的条数
const pageSize = ref<number>(3)
//品牌总数
const total = ref<number>(0)
//存储已有品牌的数据
const trademarkArr = ref<any>([])

//封装获取品牌列表数据的方法
const getTrademarkList = async () => {
    const result: TradeMarkResponseData = await reqHasTrademark(currentPage.value, pageSize.value)
    if (result.code === 200) {
        total.value = result.data.total
        trademarkArr.value = result.data.records
    }
}
onMounted(() => {
    getTrademarkList()
})
</script>

<style scoped></style>