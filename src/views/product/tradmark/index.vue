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
                            <el-button type="warning" size="default" icon="Edit" @click="changeTrademark"></el-button>
                        </el-tooltip>
                        <el-tooltip content="删除" placement="top">
                            <el-button type="danger" size="default" icon="Delete"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器组件 -->
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
                :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="total"
                @size-change="changePageSize" @current-change="getTrademarkList" />
        </el-card>
        <!-- 对话框组件，用于添加或修改品牌 -->
        <el-dialog v-model="dialogVisible" title="添加品牌">
            <!-- v-model:用于控制显示还是隐藏 -->
            <!-- form表单 -->
            <el-form style="width: 70%;margin:10px 50px;">
                <el-form-item label="品牌名称" label-width="80px">
                    <el-input placeholder="请输入品牌名称"></el-input>
                </el-form-item>
                <el-form-item label="品牌LOGO" label-width="80px">
                    <el-upload class="avatar-uploader"
                        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :show-file-list="false">
                        <img v-if="false" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <!-- 具名插槽 -->
            <template v-slot:footer>
                <el-button type="primary" @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确定</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts" name="tradmark">
import { ref, onMounted } from 'vue'
import { reqHasTrademark } from '@/api/product/trademark/index'
import type { TradeMarkResponseData, Trademark, Records } from '@/api/product/trademark/type'
import { useUserStore } from '@/store/modules/user'
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
//添加和编辑时显示对话框
const addTrademark = () => {
    dialogVisible.value = true
}
const changeTrademark = () => {
    dialogVisible.value = true
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