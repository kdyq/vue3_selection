<template>
    <div>
        <el-card>
            <el-form :inline="true" style="margin-top: 18px;">
                <el-form-item label="职位搜索">
                    <el-input placeholder="请输入搜索职位名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="default">搜索</el-button>
                    <el-button size="default">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card style="margin: 10px 0px">
            <el-button type="primary" size="default" icon="Plus">添加职位</el-button>
            <el-table border style="margin: 10px 0px">
                <el-table-column type="index" align="center" label="#"></el-table-column>
                <el-table-column align="center" label="id"></el-table-column>
                <el-table-column align="center" label="职位名称" show-overflow-tooltip></el-table-column>
                <el-table-column align="center" label="创建时间" show-overflow-tooltip></el-table-column>
                <el-table-column align="center" label="更新时间" show-overflow-tooltip></el-table-column>
                <el-table-column align="center" label="操作" width="300px">
                    <!-- row：已有的职位对象 -->
                    <template v-slot="{ row }">
                        <el-button type="primary" size="small" icon="User">
                            分配权限
                        </el-button>
                        <el-button type="primary" size="small" icon="Edit">
                            编辑
                        </el-button>
                        <el-popconfirm title="确定删除这个职位吗" width="260px">
                            <template #reference>
                                <el-button type="primary" size="small" icon="Delete">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 7, 9, 10]"
                :background="true" layout=" prev, pager, next, jumper, ->, sizes, total" :total="total" />
        </el-card>
        <!-- 添加职位与更新已有职位 -->
        <el-dialog>
            <el-form>
                <el-form-item label="职位名称" prop="roleName">
                    <el-input placeholder="请输入职位名称"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button type="primary" size="default">取消</el-button>
                <el-button type="primary" size="default">保存</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts" name="roler">
import { ref, reactive, watch, onMounted } from 'vue'
//默认页码
const currentPage = ref<number>(1);
//默认每页显示的条数
const pageSize = ref<number>(5);
//总条数
const total = ref<number>(0);
</script>

<style scoped></style>