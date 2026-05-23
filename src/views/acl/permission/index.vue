<template>
    <div>
        <el-table style="width: 100%; margin-bottom: 20px" row-key="id" border :data="permissionArr">
            <el-table-column label="名称" prop="name" />
            <el-table-column label="权限值" prop="code" />
            <el-table-column label="修改时间" prop="updateTime" />
            <el-table-column label="操作">
                <template v-slot="{ row }">
                    <el-button type="primary" size="small" icon="User" :disabled="row.level === 4 ? true : false"
                        @click="addPermission(row)" v-has="`btn.Permission.add`">
                        {{ row.level === 3 ? '添加功能' : '添加菜单' }}
                    </el-button>
                    <el-button type="warning" size="small" icon="Edit" :disabled="row.level === 1 ? true : false"
                        @click="editPermission(row)" v-has="`btn.Permission.update`">
                        编辑
                    </el-button>
                    <el-popconfirm :title="`确定删除这个${row.level === 4 ? '功能' : '菜单'} 吗`" width="260px"
                        @confirm="removeMenu(row.id)">
                        <template #reference>
                            <el-button type="danger" size="small" icon="Delete"
                                :disabled="row.level === 1 ? true : false" v-has="`btn.Permission.remove`">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!-- 添加或编辑的dialog组件 -->
        <el-dialog v-model="dialogVisible" :title="menuData.id ? '编辑' : '添加'" width="30%">
            <el-form style="margin-top: 30px;" label-width="80px">
                <el-form-item label="名称：">
                    <el-input placeholder="请输入名称" v-model="menuData.name"></el-input>
                </el-form-item>
                <el-form-item label="权限值：">
                    <el-input placeholder="请输入权限值" v-model="menuData.code"></el-input>
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
import { ref, onMounted, reactive } from 'vue'
import { ElMessage } from 'element-plus';
import { reqAllPermisson, reqAddOrUpdateMenu, reqRemoveMenu } from '@/api/acl/menu/index'
import type { PermissionResponsData, PermissionList, Permission, MenuParams } from '@/api/acl/menu/type';
//存储已有的菜单数据
const permissionArr = ref<PermissionList>([])
//控制添加或修改的dialog组件的显示与隐藏
const dialogVisible = ref(false)
//携带的参数
const menuData = reactive<MenuParams>({
    code: '',
    level: 0,
    name: '',
    pid: 0
})
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
const addPermission = (row: Permission) => {
    //清空数据
    Object.assign(menuData, {
        code: '',
        level: 0,
        name: '',
        pid: 0,
        id: 0
    })
    dialogVisible.value = true
    //收集新增的level值
    menuData.level = row.level + 1
    //收集新增的pid值
    menuData.pid = row.id as number
}
//编辑
const editPermission = (row: Permission) => {
    Object.assign(menuData, {
        code: '',
        level: 0,
        name: '',
        pid: 0,
        id: 0
    })
    Object.assign(menuData, row)
    dialogVisible.value = true
}
//保存菜单
const save = async () => {
    const result: any = await reqAddOrUpdateMenu(menuData)
    if (result.code === 200) {
        ElMessage.success(menuData.id ? '修改成功' : '添加成功')
        getHasPermission()
        dialogVisible.value = false
    } else {
        ElMessage.error(menuData.id ? '修改失败,请检查接口或信息' : '添加失败,请检查接口或信息')
        dialogVisible.value = false
    }

}
//删除
const removeMenu = async (id: number) => {
    const result: any = await reqRemoveMenu(id)
    if (result.code === 200) {
        ElMessage.success('删除成功')
        getHasPermission()
    } else {
        ElMessage.error('删除失败,请检查接口或信息')
    }
}
</script>

<style scoped></style>