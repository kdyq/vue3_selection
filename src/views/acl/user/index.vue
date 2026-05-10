<template>
    <el-card>
        <el-form :inline="true" style="margin-top: 18px;">
            <el-form-item label="用户名:">
                <el-input placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default">搜索</el-button>
                <el-button type="default" size="default">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin-top: 10px;">
        <el-button type="primary" size="default">添加</el-button>
        <el-button type="danger" size="default">批量删除</el-button>
        <!-- table展示用户信息 -->
        <el-table style="margin: 10px 0px" border>
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column label="#" align="center" type="index"></el-table-column>
            <el-table-column label="ID" align="center"></el-table-column>
            <el-table-column label="用户名字" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="用户名称" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="用户角色" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="创建时间" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="更新时间" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="300px" align="center">
                <template v-slot="{ row }">
                    <el-button type="primary" size="small" icon="User">
                        分配角色
                    </el-button>
                    <el-button type="primary" size="small" icon="Edit">
                        编辑
                    </el-button>
                    <el-popconfirm :title="`确定删除？`" width="260px">
                        <template #reference>
                            <el-button type="primary" size="small" icon="Delete">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[6, 8, 10]"
            :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="total" :pager-count="5" />
    </el-card>

</template>

<script setup lang="ts" name="user">
import { ref, onMounted } from 'vue'
//默认页码
const currentPage = ref<number>(1);
//默认每页显示的条数
const pageSize = ref<number>(6);
//总条数
const total = ref<number>(0);

</script>

<style scoped></style>