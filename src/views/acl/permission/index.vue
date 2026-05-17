<template>
    <div>
        <el-table style="width: 100%; margin-bottom: 20px" row-key="id" border :data="permissionArr">
            <el-table-column label="名称" prop="name" />
            <el-table-column label="权限值" prop="code" />
            <el-table-column label="修改时间" prop="updateTime" />
            <el-table-column label="操作">
                <template v-slot="{ row }">
                    <el-button type="primary" size="small" icon="User" :disabled="row.level === 4 ? true : false"
                        @click="addPermission">
                        {{ row.level === 3 ? '添加功能' : '添加菜单' }}
                    </el-button>
                    <el-button type="warning" size="small" icon="Edit" :disabled="row.level === 1 ? true : false"
                        @click="editPermission(row)">
                        编辑
                    </el-button>
                    <el-popconfirm title="确定删除这个吗" width="260px">
                        <template #reference>
                            <el-button type="danger" size="small" icon="Delete"
                                :disabled="row.level === 1 ? true : false">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!-- 添加或编辑的dialog组件 -->
        <el-dialog v-model="dialogVisible" title="添加" width="30%">
            <el-form style="margin-top: 30px;" label-width="80px">
                <el-form-item label="名称：">
                    <el-input placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="权限值：">
                    <el-input placeholder="请输入权限值"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button size="default" @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" size="default" @click="save">保存</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts" name="permission">
import { ref, onMounted } from 'vue'
import { reqAllPermisson } from '@/api/acl/menu/index'
import type { PermissionResponsData, PermissionList, Permission } from '@/api/acl/menu/type';
//存储已有的菜单数据
const permissionArr = ref<PermissionList>([])
//控制添加或修改的dialog组件的显示与隐藏
const dialogVisible = ref(false)
onMounted(() => {
    getHasPermission()
})
//获取以后菜单数据
const getHasPermission = async () => {
    const result: PermissionResponsData = await reqAllPermisson()
    if (result.code === 200) {
        permissionArr.value = result.data
    }
}
//添加
const addPermission = () => {
    dialogVisible.value = true
}
//编辑
const editPermission = (row: Permission) => {
    dialogVisible.value = true
}
//保存菜单
const save = () => {
    dialogVisible.value = false
}
</script>

<style scoped></style>