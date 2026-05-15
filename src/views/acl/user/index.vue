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
        <el-button type="primary" size="default" @click="addUser">添加</el-button>
        <el-button type="danger" size="default">批量删除</el-button>
        <!-- table展示用户信息 -->
        <el-table style="margin: 10px 0px" border :data="userArr">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column label="#" align="center" type="index"></el-table-column>
            <el-table-column label="ID" align="center" prop="id"></el-table-column>
            <el-table-column label="用户名" align="center" show-overflow-tooltip prop="username"></el-table-column>
            <el-table-column label="用户昵称" align="center" show-overflow-tooltip prop="name"></el-table-column>
            <el-table-column label="用户角色" align="center" show-overflow-tooltip prop="roleName"></el-table-column>
            <el-table-column label="创建时间" align="center" show-overflow-tooltip prop="createTime"></el-table-column>
            <el-table-column label="更新时间" align="center" show-overflow-tooltip prop="updateTime"></el-table-column>
            <el-table-column label="操作" width="300px" align="center">
                <template v-slot="{ row }">
                    <el-button type="primary" size="small" icon="User">
                        分配角色
                    </el-button>
                    <el-button type="warning" size="small" icon="Edit" @click="editUser(row)">
                        编辑
                    </el-button>
                    <el-popconfirm :title="`确定删除这个用户吗？`" width="260px">
                        <template #reference>
                            <el-button type="danger" size="small" icon="Delete">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[6, 8, 10]"
            :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="total" :pager-count="5"
            @current-change="getHasUser" @size-change="handler" />
    </el-card>
    <!-- 抽屉结构 -->
    <el-drawer v-model="drawer">
        <template #header>
            <h4>添加用户</h4>
        </template>
        <template #default>
            <div>
                <el-form label-width="80px">
                    <el-form-item label="用户名:" style="margin: 15px 0px;">
                        <el-input placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="用户昵称:" style="margin: 15px 0px;">
                        <el-input placeholder="请输入用户昵称"></el-input>
                    </el-form-item>
                    <el-form-item label="账号密码:" style="margin: 15px 0px;">
                        <el-input placeholder="请输入账号密码"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </template>
        <template #footer>
            <div style="flex: auto;">
                <el-button type="primary" size="default">保存</el-button>
                <el-button size="default">取消</el-button>
            </div>
        </template>
    </el-drawer>

</template>

<script setup lang="ts" name="user">
import { ref, onMounted } from 'vue'
import { reqUserList } from '@/api/acl/user';
import type { UserResponseData, Records, User } from '@/api/acl/user/type';
//默认页码
const currentPage = ref<number>(1);
//默认每页显示的条数
const pageSize = ref<number>(5);
//总条数
const total = ref<number>(0);
//存储全部用户的数组
const userArr = ref<Records>([])
//控制抽屉的显示与隐藏
const drawer = ref<boolean>(false)
//挂载完毕
onMounted(() => {
    getHasUser()
})
//获取已有用户列表数据
const getHasUser = async (page = 1) => {
    currentPage.value = page;
    const result: UserResponseData = await reqUserList(currentPage.value, pageSize.value, '')
    if (result.code === 200) {
        total.value = result.data.total
        userArr.value = result.data.records
    }
}
//每页显示数据发生变化
const handler = () => {
    getHasUser()
}
//添加用户
const addUser = () => {
    drawer.value = true
}
//编辑用户信息
const editUser = (row: User) => {
    drawer.value = true
}

</script>

<style scoped></style>