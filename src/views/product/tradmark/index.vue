<template>
    <div>
        <el-card>
            <!-- 左上角添加品牌按钮 -->
            <el-button type="primary" size="default" icon="Plus" @click="addTrademark">添加品牌</el-button>
            <!-- 表格组件 -->
            <el-table style="margin: 10px 0;" border :data="trademarkArr">
                <el-table-column label="序号" width="90px" align="center" type="index"></el-table-column>
                <el-table-column label="品牌名称" align="center">
                    <!-- 默认是div，这里用插槽 -->
                    <template v-slot="{ row }">
                        <pre>{{ row.tmName }}</pre>
                    </template>
                </el-table-column>
                <el-table-column label="品牌LOGO" align="center">
                    <template v-slot="{ row }">
                        <div style="display: flex; justify-content: center; align-items: center;">
                            <img :src="row.logoUrl" style="width: 100px; height: 100px; object-fit: contain;" />
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="品牌操作" align="center">
                    <template v-slot="{ row }">
                        <el-tooltip content="编辑" placement="top">
                            <el-button type="warning" size="default" icon="Edit"
                                @click="changeTrademark(row)"></el-button>
                        </el-tooltip>
                        <el-tooltip content="删除" placement="top">
                            <el-button type="danger" size="default" icon="Delete"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器组件 -->
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
                :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="total" :pager-count="5"
                @size-change="changePageSize" @current-change="getTrademarkList" />
        </el-card>
        <!-- 对话框组件，用于添加或修改品牌 -->
        <el-dialog v-model="dialogVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'" :close-on-click-modal="false"
            :close-on-press-escape="false">
            <!-- v-model:用于控制显示还是隐藏 -->
            <!-- form表单 -->
            <el-form style="width: 70%;margin:10px 50px;">
                <el-form-item label="品牌名称" label-width="80px">
                    <el-input placeholder="请输入品牌名称" v-model="trademarkParams.tmName"></el-input>
                </el-form-item>
                <el-form-item label="品牌LOGO" label-width="80px">
                    <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
                        :headers="headers" :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess">
                        <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <UploadFilled />
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <!-- 具名插槽 -->
            <template v-slot:footer>
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="confirm">确定</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts" name="tradmark">
import { ref, onMounted, reactive } from 'vue'
import { reqHasTrademark, reqAddOrUpdateTrademark } from '@/api/product/trademark/index'
import type { TradeMarkResponseData, Trademark, Records } from '@/api/product/trademark/type'
import { useUserStore } from '@/store/modules/user'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
//当前页码
const currentPage = ref<number>(1)
//每页显示的条数
const pageSize = ref<number>(3)
//品牌总数
const total = ref<number>(0)
//存储已有品牌的数据
const trademarkArr = ref<Records>([])
//控制对话框的显示与隐藏
const dialogVisible = ref<boolean>(false)
// 获取用户相关的小仓库：获取仓库内部token，登录成功以后携带给服务器
const userStore = useUserStore()
const headers = { Token: userStore.token }
//定义收集新增品牌数据
const trademarkParams = reactive<Trademark>({
    tmName: '',
    logoUrl: ''
})

//封装获取品牌列表数据的方法
const getTrademarkList = async (page = 1) => {
    currentPage.value = page
    const result: TradeMarkResponseData = await reqHasTrademark(currentPage.value, pageSize.value)
    if (result.code === 200) {
        total.value = result.data.total
        trademarkArr.value = result.data.records
    }
}
onMounted(() => {
    getTrademarkList()
})
//下拉框选择每页显示的条数
const changePageSize = () => {
    getTrademarkList()
}
//添加时显示对话框
const addTrademark = () => {
    dialogVisible.value = true
    // 清空数据
    trademarkParams.tmName = ''
    trademarkParams.logoUrl = ''
    trademarkParams.id = 0
}
//编辑时显示对话框,row为当前品牌数据数据
const changeTrademark = (row: Trademark) => {
    dialogVisible.value = true
    trademarkParams.tmName = row.tmName
    trademarkParams.logoUrl = row.logoUrl
    trademarkParams.id = row.id
}
//确定添加品牌
const confirm = async () => {
    const result = await reqAddOrUpdateTrademark(trademarkParams)
    if (result.code === 200) {
        dialogVisible.value = false
        ElMessage({
            type: 'success',
            message: trademarkParams.id ? '修改成功' : '添加成功'
        })
        getTrademarkList(trademarkParams.id ? currentPage.value : 1)
    } else {
        ElMessage({
            type: 'error',
            message: trademarkParams.id ? '修改失败' : '添加失败'
        })
    }
}
//上传图片前触发的钩子，用于限制文件类型和大小
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    //设定文件类型：jpg|png|jpeg|gif 大小最大为4M
    if (rawFile.type !== 'image/jpg' && rawFile.type
        !== 'image/png' && rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/gif') {
        ElMessage.error('上传的图片类型需为jpg、png、jpeg和gif')
        return false
    } else if (rawFile.size / 1024 / 1024 > 4) {
        ElMessage.error('文件大小不能超过4M')
        return false
    }
    return true
}
//图片上传成功后触发的钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,//服务器返回的数据
    uploadFile
) => {
    trademarkParams.logoUrl = response.data
}
</script>

<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>