<template>
    <div>
        <el-table style="width: 100%; margin-bottom: 20px" row-key="id" border :data="permissionArr">
            <el-table-column label="名称" prop="name" />
            <el-table-column label="权限值" prop="code" />
            <el-table-column label="修改时间" prop="updateTime" />
            <el-table-column label="操作">
                <template v-slot="{ row }">
                    <el-button type="primary" size="small" icon="User" :disabled="row.level === 4 ? true : false">
                        {{ row.level === 3 ? '添加功能' : '添加菜单' }}
                    </el-button>
                    <el-button type="warning" size="small" icon="Edit" :disabled="row.level === 1 ? true : false">
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
    </div>
</template>

<script setup lang="ts" name="permission">
import { ref, onMounted } from 'vue'
import { reqAllPermisson } from '@/api/acl/menu/index'
import type { PermissionResponsData, PermissionList } from '@/api/acl/menu/type';
//存储已有的菜单数据
const permissionArr = ref<PermissionList>([])
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
</script>

<style scoped></style>