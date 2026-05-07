<template>
    <el-form label-width="100px">
        <el-form-item label="SPU名称">
            <el-input placeholder="请输入SPU名称" style="width: 200px" v-model="SpuParams.spuName"></el-input>
        </el-form-item>
        <el-form-item label="SPU品牌">
            <el-select style="width: 200px" v-model="SpuParams.tmId">
                <el-option v-for="item in allTradeMark" :key="item.id" :value="item.id"
                    :label="item.tmName"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="SPU描述">
            <el-input type="textarea" placeholder="请输入SPU描述" v-model="SpuParams.description"></el-input>
        </el-form-item>
        <el-form-item label="SPU图片">
            <el-upload v-model:file-list="uploadFileList" action="/api/admin/product/fileUpload" :headers="headers"
                list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>
            <el-dialog v-model="dialogVisible">
                <img w-full :src="diglogImageUrl" alt="Preview Image" style="height: 100%; width: 100%;" />
            </el-dialog>
        </el-form-item>
        <el-form-item label="SPU销售属性">
            <el-select style="width: 200px" v-model="saleAttrId_Name"
                :placeholder="unSelectSaleAttr.length ? `还有${unSelectSaleAttr.length}个属性没有选择` : `暂无属性`">
                <el-option v-for="item in unSelectSaleAttr" :key="item.id" :value="`${item.id}:${item.name}`"
                    :label="item.name"></el-option>
            </el-select>
            <el-button @click="addSaleAttr" :disabled="saleAttrId_Name ? false : true" style="margin-left: 10px;"
                type="primary" size="default" icon="Plus">添加属性</el-button>
            <!-- 展示销售属性和属性值 -->
            <el-table border style="margin: 10px 0;" :data="saleAttr">
                <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
                <el-table-column label="销售属性名" width="120px" prop="saleAttrName"></el-table-column>
                <el-table-column label="销售属性值">
                    <template v-slot="{ row, $index }">
                        <el-tag style="margin: 0px 5px;" @close="row.spuSaleAttrValueList.splice(index, 1)"
                            v-for="(item, index) in row.spuSaleAttrValueList" :key="item.id" closable>
                            {{ item.saleAttrValueName }}
                        </el-tag>
                        <el-input v-if="row.flag == true" size="small" placeholder="请输入属性值" clearable
                            v-model="row.saleAttrValue" style="width: 120px;" @blur="toLook(row)" />
                        <el-button v-else @click="toEdit(row)" type="primary" size="small" icon="Plus"
                            title="添加"></el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120px">
                    <template v-slot="{ row, $index }">
                        <el-button type="danger" size="default" icon="Delete" title="删除"
                            @click="saleAttr.splice($index, 1)"></el-button>
                    </template>
                </el-table-column>
            </el-table>

        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="default" @click="save"
                :disabled="saleAttr.length > 0 ? false : true">保存</el-button>
            <el-button size="default" @click="cansel">取消</el-button>

        </el-form-item>

    </el-form>

</template>

<script setup lang="ts" name="spuForm">
import { ref, computed } from 'vue'
import { useUserStore } from '@/store/modules/user'
import type { SpuData, AllTradeMark, SpuHasImg, SaleAttrResponseData, HasSaleAttrResponseData, Trademark, SpuImg, SaleAttr, HasSaleAttr, SaleAttrValue } from '@/api/product/spu/type'
import { reqAllTradeMark, reqAllSaleAttr, reqSpuImageList, reqSpuHasSaleAttr, reqAddOrUpdateSpu } from '@/api/product/spu'
import { ElMessage } from 'element-plus'
import type { UploadUserFile, UploadProps } from 'element-plus'
const userStore = useUserStore()
const headers = { Token: userStore.token }
const $emit = defineEmits(['changeScene'])
//存储已有的SPU数据
const allTradeMark = ref<Trademark[]>([])
// 用于绑定 el-upload 的列表
const uploadFileList = ref<UploadUserFile[]>([])
//存储商品图片
const spuImg = ref<SpuImg[]>([])
//存储某个SPU的销售属性数据
const saleAttr = ref<SaleAttr[]>([])
//存储已有的全部SPU的销售属性
const allSaleAttr = ref<HasSaleAttr[]>([])
//存储已有的SPU对象
const SpuParams = ref<SpuData>({
    category3Id: '',
    spuName: '',
    description: '',
    tmId: '',
    spuSaleAttrList: [],
    spuImageList: []
})
//控制对话框的的显示与隐藏
const dialogVisible = ref(false)
//存储预览图片的地址
const diglogImageUrl = ref('')
//存储未选择的销售属性的id和name
const saleAttrId_Name = ref<string>('')
//点击取消按钮
const cansel = () => {
    $emit('changeScene', 0)
}
//自定义方法，用于获取数据
const initHasSpuData = async (row: SpuData) => {
    if (!row || !row.id) {
        console.warn('initHasSpuData 接收到的 row 为空或缺少 id', row)
        ElMessage.error('数据异常，无法初始化表单')
        return  // 直接终止，不覆盖 SpuParams
    }
    //row为父组件传入的当前SPU数据（不完整）
    SpuParams.value = row
    //获取全部品牌的数据
    const spu_ALL: AllTradeMark = await reqAllTradeMark()
    //获取某个品牌旗下的商品图片
    const spu_img: SpuHasImg = await reqSpuImageList((row.id as number))
    //获取某个SPU下的销售属性数据
    const spu_sale: SaleAttrResponseData = await reqSpuHasSaleAttr((row.id as number))
    //获取已有的全部SPU的销售属性
    const all_sale: HasSaleAttrResponseData = await reqAllSaleAttr()
    // 存储
    allTradeMark.value = spu_ALL.data
    spuImg.value = spu_img.data
    // 转换给 el-upload 使用（确保 name/url 非空）
    uploadFileList.value = spu_img.data.map(item => ({
        name: item.imgName ?? '',   // 或 item.imgName! 如果确定有值
        url: item.imgUrl ?? '',
    }))
    saleAttr.value = spu_sale.data
    allSaleAttr.value = all_sale.data
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
//预览照片
const handlePictureCardPreview = (file: any) => {
    //赋值
    diglogImageUrl.value = file.url
    dialogVisible.value = true
}
//删除图片
const handleRemove = () => {
    ElMessage({
        type: 'success',
        message: '图片已删除',
    })
}
//计算当前SPU还未拥有的销售属性
const unSelectSaleAttr = computed(() => {
    const usSelecyAttr = allSaleAttr.value.filter(item => {
        return saleAttr.value.every(i => {
            return item.name !== i.saleAttrName
        })
    })
    return usSelecyAttr
})
//添加销售属性
const addSaleAttr = () => {
    //提取数据
    const [baseSaleAttrId, saleAttrName] = saleAttrId_Name.value.split(':')
    //准备一个新的销售属性对象
    const newSaleAttr: SaleAttr = {
        baseSaleAttrId: Number(baseSaleAttrId),
        saleAttrName,
        spuSaleAttrValueList: []
    }
    //追加
    saleAttr.value.push(newSaleAttr)
    //清空
    saleAttrId_Name.value = ''
}
//属性值按钮点击事件
const toEdit = (row: SaleAttr) => {
    //点击时进入编辑模式
    row.flag = true
    row.saleAttrValue = ''
}
//表单元素失焦
const toLook = (row: SaleAttr) => {
    //收集新增的属性值
    const { baseSaleAttrId, saleAttrValue } = row
    //整理成需要的形式
    const newSaleAttrValue: SaleAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: (saleAttrValue as string)
    }
    //非法情况判断
    //属性值为空
    if (saleAttrValue!.trim() == '') {
        ElMessage({
            type: 'warning',
            message: '属性值不能为空'
        })
        row.flag = false
        return;
    }

    //属性值重复
    const repeat = row.spuSaleAttrValueList.find(item => {
        return item.saleAttrValueName == saleAttrValue
    })
    if (repeat) {
        ElMessage({
            type: 'warning',
            message: '属性值不能重复'
        })
        row.flag = false
        return;
    }
    //追加
    row.spuSaleAttrValueList.push(newSaleAttrValue)
    //切换为查看模型
    row.flag = false
}
//保存按钮
const save = async () => {
    //整理数据
    //照片
    SpuParams.value.spuImageList = uploadFileList.value.map((item: any) => {
        return {
            imgName: item.name,
            imgUrl: (item.response && item.response.data) || item.url
        }
    })
    //销售属性
    SpuParams.value.spuSaleAttrList = saleAttr.value
    //发请求
    const result = await reqAddOrUpdateSpu(SpuParams.value)
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: SpuParams.value.id ? '修改成功' : '添加成功'
        })
        //返回上一级
        $emit('changeScene', 0)
    } else {
        ElMessage({
            type: 'error',
            message: SpuParams.value.id ? '修改失败' : '添加失败'
        })
    }
}
//添加一个SPU
const initAddSpu = () => {
    console.log(111111);
}
//对外暴露
defineExpose({
    initHasSpuData,
    initAddSpu
})
</script>

<style lang="scss" scoped></style>