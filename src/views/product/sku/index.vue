<template>
    <el-card>
        <el-table border stripe>
            <el-table-column label="序号" width="80px" type="index" align="center">
            </el-table-column>
            <el-table-column label="名称" width="180px" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="描述" width="180px" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="图片" width="180px">
            </el-table-column>
            <el-table-column label="重量(g)" width="180px">
            </el-table-column>
            <el-table-column label="价格(元)" width="180px">
            </el-table-column>
            <el-table-column label="操作" width="300px" fixed="right">
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 7, 9]"
            :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="total" :pager-count="5" />

    </el-card>

</template>

<script setup lang="ts" name="sku">
import { ref } from 'vue'
//默认页码
const currentPage = ref<number>(1);
//默认每页显示的条数
const pageSize = ref<number>(3);
//总条数
const total = ref<number>(0);

</script>

<style scoped></style>