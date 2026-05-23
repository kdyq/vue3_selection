<template>
    <div>
        <el-card>
            <el-form :inline="true" style="margin-top: 18px;">
                <el-form-item label="用户名:">
                    <el-input placeholder="请输入用户名" v-model="keyword"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="default" :disabled="keyword ? false : true"
                        @click="search">搜索</el-button>
                    <el-button type="default" size="default" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card style="margin-top: 10px;">
            <el-button type="primary" size="default" @click="addUser" v-has="`btn.User.add`">添加</el-button>
            <el-button type="danger" size="default" :disabled="selectedArr.length > 0 ? false : true"
                @click="removeBatchUser" v-has="`btn.User.remove`">批量删除</el-button>
            <!-- table展示用户信息 -->
            <el-table @selection-change="selectChange" style="margin: 10px 0px" border :data="userArr">
                <el-table-column type="selection" align="center"></el-table-column>
                <el-table-column label="#" align="center" type="index"></el-table-column>
                <el-table-column label="ID" align="center" prop="id" width="150px"></el-table-column>
                <el-table-column label="用户名" align="center" show-overflow-tooltip prop="username"></el-table-column>
                <el-table-column label="用户昵称" align="center" show-overflow-tooltip prop="name"></el-table-column>
                <el-table-column label="用户职位" align="center" show-overflow-tooltip prop="roleName"></el-table-column>
                <el-table-column label="创建时间" align="center" show-overflow-tooltip prop="createTime"></el-table-column>
                <el-table-column label="更新时间" align="center" show-overflow-tooltip prop="updateTime"></el-table-column>
                <el-table-column label="操作" width="300px" align="center">
                    <template v-slot="{ row }">
                        <el-button type="primary" size="small" icon="User" @click="assignRole(row)"
                            v-has="`btn.User.assgin`">
                            分配职位
                        </el-button>
                        <el-button type="warning" size="small" icon="Edit" @click="editUser(row)"
                            v-has="`btn.User.update`">
                            编辑
                        </el-button>
                        <el-popconfirm :title="`确定删除这个用户吗？`" width="260px" @confirm="removeUser(row.id)">
                            <template #reference>
                                <el-button type="danger" size="small" icon="Delete" v-has="`btn.User.remove`">删除</el-button>
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
                <h4>{{ userParams.id ? '修改用户信息' : '添加用户' }}</h4>
            </template>
            <template #default>
                <div>
                    <el-form label-width="90px" :model="userParams" :rules="rules" ref="formRef">
                        <el-form-item label="用户名:" style="margin: 15px 0px;" prop="username">
                            <el-input placeholder="请输入用户名" v-model="userParams.username"></el-input>
                        </el-form-item>
                        <el-form-item label="用户昵称:" style="margin: 15px 0px;" prop="name">
                            <el-input placeholder="请输入用户昵称" v-model="userParams.name"></el-input>
                        </el-form-item>
                        <el-form-item label="账号密码:" style="margin: 15px 0px;" prop="password" v-if="!userParams.id">
                            <el-input placeholder="请输入账号密码" v-model="userParams.password"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </template>
            <template #footer>
                <div style="flex: auto;">
                    <el-button type="primary" size="default" @click="save">保存</el-button>
                    <el-button size="default" @click="cancel">取消</el-button>
                </div>
            </template>
        </el-drawer>
        <!-- 分配角色抽屉 -->
        <el-drawer v-model="drawer1">
            <template #header>
                <h4>分配职位</h4>
            </template>
            <template #default>
                <div>
                    <el-form label-width="auto">
                        <el-form-item label="用户名:" style="margin: 10px 0px;">
                            <el-input v-model="userParams.username" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item style="margin: 10px 0px;">
                            <div class="role-box">
                                <span class="role-label">职位列表:</span>
                                <div class="role-content">
                                    <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate"
                                        @change="handleCheckAllChange" class="check-all">
                                        全选
                                    </el-checkbox>

                                    <el-checkbox-group v-model="userRoleIds" @change="handleCheckedCitiesChange"
                                        class="role-grid">
                                        <el-checkbox v-for="i in allRole" :key="i.id" :value="i.id">
                                            {{ i.roleName }}
                                        </el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
            </template>
            <template #footer>
                <div style="flex: auto;">
                    <el-button type="primary" size="default" @click="saveRole">保存</el-button>
                    <el-button size="default" @click="cancelRole">取消</el-button>
                </div>
            </template>
        </el-drawer>
    </div>

</template>

<script setup lang="ts" name="user">
import { ref, onMounted, reactive, nextTick } from 'vue'
import { ElMessage } from 'element-plus';
import type { CheckboxValueType } from 'element-plus'
import { reqUserList, reqAddOrUpdateUser, reqAllRole, reqSetUserRole, reqRemoveUser, reqRemoveBatchUser } from '@/api/acl/user';
import type { UserResponseData, Records, User, AllRoleResponseData, AllRole, SetRoleData } from '@/api/acl/user/type';
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
const drawer1 = ref<boolean>(false)
//获取组件实例
const formRef = ref<any>()
//存储全部职位的数据
const allRole = ref<AllRole>([])
//存储当前用户的职位信息
const userRole = ref<AllRole>([])
const userRoleIds = ref<number[]>([])
//复选框全选
const checkAll = ref(false)
//控制全选复选框不确定样式
const isIndeterminate = ref(true)
//选中的用户
const selectedArr = ref<User[]>([])
//收集用户输入的关键字
const keyword = ref('')
//存储新增或修改的用户信息
const userParams = reactive<User>({
    username: '',
    name: '',
    password: '',
})
//挂载完毕
onMounted(() => {
    getHasUser()
})
//获取已有用户列表数据
const getHasUser = async (page = 1) => {
    currentPage.value = page;
    const result: UserResponseData = await reqUserList(currentPage.value, pageSize.value, keyword.value)
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
    Object.assign(userParams, {
        id: 0,
        username: '',
        name: '',
        password: '',
    })
    //清除上一次的错误提示
    nextTick(() => {
        formRef.value.resetFields()
    })
}
//编辑用户信息
const editUser = (row: User) => {
    drawer.value = true
    //收集已有的信息
    Object.assign(userParams, row)
    //清空错误提示
    nextTick(() => {
        formRef.value.clearValidate('username')
        formRef.value.clearValidate('name')
    })
}
//保存按钮
const save = async () => {
    //表单校验通过才发请求
    await formRef.value.validate()
    const result: any = await reqAddOrUpdateUser(userParams)
    if (result.code === 200) {
        getHasUser(userParams.id ? currentPage.value : 1)
        drawer.value = false
        ElMessage.success(userParams.id ? '修改成功' : '添加成功')
        //如果修改当前正在使用的账户,需要重新登陆,延迟1秒
        if (userParams.id) {
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        }
    } else {
        drawer.value = false
        ElMessage.error(userParams.id ? '修改失败,请检查信息' : '添加失败,请检查信息')
    }
}
//取消按钮
const cancel = () => {
    drawer.value = false
}
//表单校验
const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 5, max: 16, message: '用户名长度为 5 到 16 位', trigger: 'blur' },
        {
            pattern: /^\S+$/,
            message: '用户名不能包含空格',
            trigger: 'blur'
        }
    ],
    name: [
        { required: true, message: '请输入姓名', trigger: 'blur' },
        {
            pattern: /^\S{2,16}$/,
            message: '姓名长度为 2 到 16 位，且不能包含空格',
            trigger: 'blur'
        }
    ],

    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 16, message: '密码长度为 6 到 16 位', trigger: 'blur' },
        {
            pattern: /^[A-Za-z0-9@._]+$/,
            message: '密码只能包含字母、数字、@、.和_，且不能包含空格',
            trigger: 'blur'
        }
    ]
}
//分配角色
const assignRole = async (row: User) => {
    // 先重置上一次状态
    checkAll.value = false
    isIndeterminate.value = false
    userRole.value = []
    userRoleIds.value = []
    Object.assign(userParams, row)
    //发请求
    const result: AllRoleResponseData = await reqAllRole(userParams.id as number)
    if (result.code === 200) {
        //存储
        allRole.value = result.data.allRolesList
        userRole.value = result.data.assignRoles
        userRoleIds.value = result.data.assignRoles.map(item => item.id as number)
        //根据当前用户拥有的职位重新计算全选状态
        updateCheckAllStatus()
        drawer1.value = true
    }
}
// 更新全选框状态
const updateCheckAllStatus = () => {
    const checkedCount = userRoleIds.value.length
    const totalCount = allRole.value.length

    checkAll.value = checkedCount > 0 && checkedCount === totalCount
    isIndeterminate.value = checkedCount > 0 && checkedCount < totalCount
}
//全选复选框change事件
const handleCheckAllChange = (val: CheckboxValueType) => {
    if (val) {
        userRoleIds.value = allRole.value
            .map(item => item.id)
            .filter((id): id is number => id !== undefined)
        userRole.value = allRole.value
    } else {
        userRoleIds.value = []
        userRole.value = []
    }

    isIndeterminate.value = false
}
//单选复选框change事件
const handleCheckedCitiesChange = (value: CheckboxValueType[]) => {
    userRoleIds.value = value as number[]

    userRole.value = allRole.value.filter(item => {
        return item.id !== undefined && userRoleIds.value.includes(item.id)
    })
    updateCheckAllStatus()
}
//保存分配职位
const saveRole = async () => {
    // 如果选中了超级管理员，直接拦截，不发请求
    if (userRoleIds.value.includes(1)) {
        ElMessage.error('超级管理员已存在，分配失败，请重新选择')
        return
    }
    //收集数据
    const data: SetRoleData = {
        roleIdList: userRoleIds.value,
        userId: userParams.id as number
    }
    const result: any = await reqSetUserRole(data)
    if (result.code === 200) {
        ElMessage.success('分配职位成功')
        drawer1.value = false
        getHasUser(currentPage.value)
    } else {
        ElMessage.success('分配职位失败')
    }
}
//取消分配职位
const cancelRole = () => {
    drawer1.value = false
}
//删除某个用户
const removeUser = async (userid: number) => {
    if (userid === 1) {
        ElMessage.error('超级管理员不能删除')
        return
    }
    const result: any = await reqRemoveUser(userid)
    if (result.code === 200) {
        ElMessage.success('删除成功')
        getHasUser(userArr.value.length > 1 ? currentPage.value : currentPage.value - 1)
    } else {
        ElMessage.error('删除失败,请检查接口或信息')
    }
}
//复选框勾选
const selectChange = (value: any) => {
    selectedArr.value = value
}
//批量删除
const removeBatchUser = async () => {
    const idList: number[] = selectedArr.value.map(item => item.id as number)
    if (idList.length === 0) {
        ElMessage.error('请选择要删除的用户')
        return
    }
    //不能删除超级管理员
    if (idList.includes(1)) {
        ElMessage.error('超级管理员不能删除')
        return
    }
    const result: any = await reqRemoveBatchUser(idList)
    if (result.code === 200) {
        ElMessage.success('批量删除成功')
        getHasUser(userArr.value.length > selectedArr.value.length ? currentPage.value : currentPage.value - 1)
    } else {
        ElMessage.error('批量删除失败,请检查接口或信息')
    }
}
//搜索
const search = async () => {
    getHasUser()
    keyword.value = ''
}
//重置
const reset = () => {
    keyword.value = ''
    getHasUser()
}
</script>


<style scoped>
.role-box {
    display: flex;
    align-items: flex-start;
}

.role-label {
    width: 80px;
    line-height: 32px;
    flex-shrink: 0;
    color: #606266;
}

.role-content {
    flex: 1;
    min-width: 0;
}

.check-all {
    margin-bottom: 10px;
}

.role-grid {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 12px 24px;
}

:deep(.role-grid .el-checkbox) {
    margin-right: 0;
    width: 130px;
}

:deep(.role-grid .el-checkbox__label) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>