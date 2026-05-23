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
            <el-button type="primary" size="default" icon="Plus" @click="addRole" v-has="`btn.Role.add`">添加职位</el-button>
            <el-table border style="margin: 10px 0px" :data="allRole">
                <el-table-column type="index" align="center" label="#"></el-table-column>
                <el-table-column align="center" label="id" prop="id"></el-table-column>
                <el-table-column align="center" label="职位名称" show-overflow-tooltip prop="roleName"></el-table-column>
                <el-table-column align="center" label="创建时间" show-overflow-tooltip prop="createTime"></el-table-column>
                <el-table-column align="center" label="更新时间" show-overflow-tooltip prop="updateTime"></el-table-column>
                <el-table-column align="center" label="操作" width="300px">
                    <!-- row：已有的职位对象 -->
                    <template v-slot="{ row }">
                        <el-button type="primary" size="small" icon="User" @click="setPermission(row)" v-has="`btn.Role.assgin`">
                            分配权限
                        </el-button>
                        <el-button type="warning" size="small" icon="Edit" @click="EditRole(row)" v-has="`btn.Role.update`">
                            编辑
                        </el-button>
                        <el-popconfirm title="确定删除这个职位吗" width="260px" @confirm="removeRole(row.id)">
                            <template #reference>
                                <el-button type="danger" size="small" icon="Delete" v-has="`btn.Role.remove`">删除</el-button>
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
        <el-dialog v-model="dialogVisible" :title="RoleParams.id ? '修改职位' : '添加职位'">
            <el-form style="margin-top: 30px;" :model="RoleParams" :rules="rules" ref="roleForm">
                <el-form-item label="职位名称：" prop="roleName">
                    <el-input placeholder="请输入职位名称" v-model="RoleParams.roleName" style="height: 35px; "></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button size="default" @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" size="default" @click="save">保存</el-button>
            </template>
        </el-dialog>
        <!-- 抽屉组件 -->
        <el-drawer v-model="drawer">
            <template #header>
                <h4>分配菜单与按钮权限</h4>
            </template>
            <template #default>
                <!-- 树形控件 -->
                <el-tree :data="menuArr" style="max-width: 600px" show-checkbox node-key="id" :props="defaultProps"
                    :default-expand-all="true" :default-checked-keys="selectedArr" ref="tree"
                    @check="handleTreeCheck" />
            </template>
            <template #footer>
                <div style="flex: auto">
                    <el-button @click="drawer = false">取消</el-button>
                    <el-button type="primary" @click="saveMenu" :disabled="!permissionChanged">保存</el-button>
                </div>
            </template>
        </el-drawer>
    </div>
</template>

<script setup lang="ts" name="roler">
import { ref, onMounted, reactive, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import { reqAllRoleList, reqAddOrUpdateRole, reqAllMenuList, reqSetPermission, reqRemoveRole } from '@/api/acl/role';
import type { RoleResponseData, Records, RoleData, MenuResponseData, MenuList } from '@/api/acl/role/type';
//默认页码
const currentPage = ref<number>(1);
//默认每页显示的条数
const pageSize = ref<number>(8);
//总条数
const total = ref<number>(0);
//搜索关键字
const keyword = ref('')
//控制对话框的显示与隐藏
const dialogVisible = ref<boolean>(false)
//获取表单组件实例
const roleForm = ref<any>()
//控制抽屉组件的显示与隐藏
const drawer = ref<boolean>(false)
//收集新增岗位的数据
const RoleParams = reactive<RoleData>({
    roleName: '',
})
//存储所有职位列表
const allRole = ref<Records>([])
//存储用户权限
const menuArr = ref<MenuList>([])
//存储已经勾选的权限
const selectedArr = ref<number[]>([])
//树形控件的数据
const defaultProps = {
    children: 'children',
    label: 'name',
}
//组件实例
const tree = ref<any>()
// 是否修改过权限
const permissionChanged = ref<boolean>(false)
// 初始权限id快照
const originPermissionIds = ref<number[]>([])
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
//添加职位
const addRole = () => {
    dialogVisible.value = true
    Object.assign(RoleParams, {
        id: '',
        roleName: '',
    })
    //清空校验
    nextTick(() => {
        roleForm.value.clearValidate('roleName')
    })
}
// 编辑职位
const EditRole = (row: RoleData) => {
    dialogVisible.value = true
    Object.assign(RoleParams, row)
    //清空校验
    nextTick(() => {
        roleForm.value.clearValidate('roleName')
    })
}
//保存职位
const save = async () => {
    await roleForm.value.validate()
    //添加或更新职位
    const result: any = await reqAddOrUpdateRole(RoleParams)
    if (result.code === 200) {
        ElMessage.success(RoleParams.id ? '修改职位成功' : '添加职位成功')
        dialogVisible.value = false
        getHasRole(RoleParams.id ? currentPage.value : 1)
    } else {
        ElMessage.error(RoleParams.id ? '修改职位失败,请检查接口或信息' : '添加职位失败,请检查接口或信息')
        dialogVisible.value = false
    }

}
//添加职位表单校验
const rules = {
    roleName: [
        { required: true, message: '请输入职位名称', trigger: 'blur' },
        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
        {
            pattern: /^\S+$/,
            message: '职位名不能包含空格',
            trigger: 'blur'
        }
    ]
}
//分配权限
const setPermission = async (row: RoleData) => {
    drawer.value = true
    permissionChanged.value = false
    Object.assign(RoleParams, row)
    //获取权限列表
    const result: MenuResponseData = await reqAllMenuList(RoleParams.id as number)
    if (result.code === 200) {
        menuArr.value = result.data
        selectedArr.value = filterSelectedArr(menuArr.value, [])
        nextTick(() => {
            originPermissionIds.value = getCurrentPermissionIds()
            permissionChanged.value = false
        })
    }
}
//过滤出四级id
const filterSelectedArr = (allData: any, initArr: any) => {
    allData.forEach((item: any) => {
        if (item.select && item.level === 4) {
            initArr.push(item.id)
        }
        if (item.children && item.children.length > 0) {
            filterSelectedArr(item.children, initArr)
        }
    })
    return initArr
}
//保存权限
const saveMenu = async () => {
    //职位的id
    const roleId = RoleParams.id as number
    //合并
    const permissionId = getCurrentPermissionIds()
    //发请求
    const result: any = await reqSetPermission(roleId, permissionId)
    if (result.code === 200) {
        drawer.value = false
        permissionChanged.value = false
        ElMessage.success('分配权限成功')
        setTimeout(() => {
            window.location.reload()
        }, 1000)
    }
}
// 工具函数，用来比较两个数组是否一致
const isSameArray = (arr1: number[], arr2: number[]) => {
    const a = [...new Set(arr1)].sort((x, y) => x - y)
    const b = [...new Set(arr2)].sort((x, y) => x - y)
    if (a.length !== b.length) return false
    return a.every((item, index) => item === b[index])
}
//获取当前树选中权限
const getCurrentPermissionIds = () => {
    //选中的权限id
    const checkedKeys = tree.value.getCheckedKeys()
    //半选的权限id
    const halfCheckedKeys = tree.value.getHalfCheckedKeys()
    return checkedKeys.concat(halfCheckedKeys) as number[]
}
//树勾选变化事件
const handleTreeCheck = () => {
    const currentIds = getCurrentPermissionIds()
    permissionChanged.value = !isSameArray(currentIds, originPermissionIds.value)
}
//删除职位
const removeRole = async (roleid: number) => {
    if (roleid === 1) {
        ElMessage.error('超级管理员不能删除')
        return
    }
    const result: any = await reqRemoveRole(roleid)
    if (result.code === 200) {
        ElMessage.success('删除职位成功')
        getHasRole(allRole.value.length > 1 ? currentPage.value : currentPage.value - 1)
    } else {
        ElMessage.error('删除职位失败,请检查接口或信息')
    }
}
</script>

<style scoped></style>