<template>
    <div>
        <!-- 三级分类 -->
        <Category :scene="scene"></Category>
        <el-card style="margin: 10px 0;">
            <div v-show="scene == 0">
                <el-button type="primary" size="default" icon="Plus">添加SPU</el-button>
                <el-table border style="margin: 10px 0;">
                    <el-table-column label="序号" type="index" align="center" width="80px">
                    </el-table-column>
                    <el-table-column label="SPU名称" width="200px">
                    </el-table-column>
                    <el-table-column label="SPU描述">
                    </el-table-column>
                    <el-table-column label="操作" width="200px">
                    </el-table-column>
                </el-table>
            </div>
            <!-- 分页器 -->
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
                :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="total" :pager-count="5" />
        </el-card>

    </div>
</template>

<script setup lang="ts" name="spu">
import { ref } from 'vue';
//定义场景
const scene = ref<number>(0);
//默认页码
const currentPage = ref<number>(1);
//默认每页显示的条数
const pageSize = ref<number>(3);
//总条数
const total = ref<number>(5);
</script>

<style scoped></style>