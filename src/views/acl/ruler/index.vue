<template>
    <div>
        <el-card>
            <el-form :inline="true" style="margin-top: 18px;">
                <el-form-item label="职位搜索">
                    <el-input placeholder="请输入搜索职位名称" v-model="keyword"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="default" @click="search"
                        :disabled="keyword ? false : true">搜索</el-button>
                    <el-button size="default" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card style="margin: 10px 0px">
            <el-button type="primary" size="default" icon="Plus">添加职位</el-button>
            <el-table border style="margin: 10px 0px" :data="allRole">
                <el-table-column type="index" align="center" label="#"></el-table-column>
                <el-table-column align="center" label="id" prop="id"></el-table-column>
                <el-table-column align="center" label="职位名称" show-overflow-tooltip prop="roleName"></el-table-column>
                <el-table-column align="center" label="创建时间" show-overflow-tooltip prop="createTime"></el-table-column>
                <el-table-column align="center" label="更新时间" show-overflow-tooltip prop="updateTime"></el-table-column>
                <el-table-column align="center" label="操作" width="300px">
                    <!-- row：已有的职位对象 -->
                    <template v-slot="{ row }">
                        <el-button type="primary" size="small" icon="User">
                            分配权限
                        </el-button>
                        <el-button type="warning" size="small" icon="Edit">
                            编辑
                        </el-button>
                        <el-popconfirm title="确定删除这个职位吗" width="260px">
                            <template #reference>
                                <el-button type="danger" size="small" icon="Delete">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 7, 8, 10]"
                :background="true" layout=" prev, pager, next, jumper, ->, sizes, total" :total="total"
                @current-change="getHasRole" @size-change="sizeChange" />
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
import { ref, onMounted } from 'vue'
import { reqAllRoleList } from '@/api/acl/role';
import type { RoleResponseData, Records } from '@/api/acl/role/type';
//默认页码
const currentPage = ref<number>(1);
//默认每页显示的条数
const pageSize = ref<number>(8);
//总条数
const total = ref<number>(0);
//搜索关键字
const keyword = ref('')
//存储所有职位列表
const allRole = ref<Records>([])
onMounted(() => {
    getHasRole()
})
const sizeChange = () => {
    getHasRole()
}
//搜索
const search = () => {
    getHasRole()
    keyword.value = ''
}
//重置
const reset = () => {
    keyword.value = ''
    getHasRole()
}
//获取所有职位列表
const getHasRole = async (page = 1) => {
    currentPage.value = page
    const result: RoleResponseData = await reqAllRoleList(currentPage.value, pageSize.value, keyword.value)
    //存储
    if (result.code === 200) {
        allRole.value = result.data.records
        total.value = result.data.total
    }

}
</script>

<style scoped></style>