<template>
    <div>
        <!-- 三级分类组件 -->
        <Category :scene="scene" />
        <el-card style="margin: 10px 0;">
            <div v-show="scene == 0">
                <el-button type="primary" size="default" icon="Plus" :disabled="categoryStore.c3Id ? false : true"
                    @click="addAttr">添加属性</el-button>
                <el-table border style="margin: 10px 0;" :data="attrArr">
                    <el-table-column label="序号" type="index" align="center" width="80px">
                    </el-table-column>
                    <el-table-column label="属性名称" width="120px" prop="attrName">
                    </el-table-column>
                    <el-table-column label="属性值名称">
                        <template v-slot="{ row }">
                            <el-tag style="margin: 5px;" v-for="item in row.attrValueList" :key="item.id">
                                {{ item.valueName }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="160px">
                        <template v-slot="{ row }">
                            <el-tooltip content="编辑" placement="top">
                                <el-button type="warning" size="default" icon="Edit"
                                    @click="changeAttr(row)"></el-button>
                            </el-tooltip>
                            <el-popconfirm :title="`确定删除 ${row.attrName} 吗？`" width="auto"
                                @confirm="deleteAttr(row.id)">
                                <template #reference>
                                    <el-button type="danger" icon="Delete" title="删除"></el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-show="scene == 1">
                <!-- 展示添加属性和修改数据的结构 -->
                <el-form :inline="true">
                    <el-form-item label="属性名称">
                        <el-input placeholder="请输入属性名称" v-model="attrParams.attrName"></el-input>
                    </el-form-item>
                </el-form>
                <el-button :disabled="!attrParams.attrName" type="primary" size="default" icon="Plus"
                    @click="addAttrValue">添加属性</el-button>
                <el-button size="default" @click="cancel">取消</el-button>
                <el-table border stripe style="margin: 10px 0;" :data="attrParams.attrValueList">
                    <el-table-column label="序号" type="index" align="center" width="80px">
                    </el-table-column>
                    <el-table-column label="属性值名称">
                        <template v-slot="{ row, $index }">
                            <el-input v-if="row.flag" @blur="toLook(row, $index)" placeholder="请输入属性值名称"
                                v-model="row.valueName" :ref="(vc: any) => inputArr[$index] = vc"></el-input>
                            <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="属性值操作">
                        <template v-slot="{ row, $index }">
                            <el-button type="danger" size="default" icon="Delete"
                                @click="attrParams.attrValueList.splice($index, 1);"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" size="default" @click="save"
                    :disabled="attrParams.attrValueList.length > 0 && attrParams.attrValueList[0].valueName !== '' ? false : true">保存</el-button>
                <el-button size="default" @click="cancel">取消</el-button>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts" name='attr'>
import { useCategoryStore } from '@/store/modules/catrogry';
import { reqAttr, reqAddOrUpdateAttr, reqRemoveAttr } from '@/api/product/attr';
import { watch, ref, reactive, nextTick, onBeforeUnmount } from 'vue';
import type { AttrResponseData, Attr, AttrValue } from '@/api/product/attr/type';
import { ElMessage } from 'element-plus';
const categoryStore = useCategoryStore();
//存储已有属性值和属性对象
const attrArr = ref<Attr[]>([])
//控制card组件的变化
const scene = ref<number>(0)//0展示table，1展示添加或修改
//收集新增的属性的数据
const attrParams = reactive<Attr>({
    attrName: '',//属性名称
    attrValueList: [],//属性值列表
    categoryId: '',//三级分类id
    categoryLevel: 3//三级分类
})
//存储组件实例el-input
const inputArr = ref<any>([])
//监听三级分类id的变化
watch(() => categoryStore.c3Id, () => {
    //清空属性数据
    attrArr.value = [];
    if (categoryStore.c3Id) {
        getAttr();
    }
})
//获取已有属性数据
const getAttr = async () => {
    const result: AttrResponseData = await reqAttr(categoryStore.c1Id, categoryStore.c2Id, categoryStore.c3Id);
    attrArr.value = result.data;
}
//添加属性按钮
const addAttr = () => {
    //清空数据并收集三级分类id
    Object.assign(attrParams, {
        attrName: '',
        attrValueList: [],
        categoryId: categoryStore.c3Id,
        categoryLevel: 3
    })
    scene.value = 1;
}
//修改属性按钮
const changeAttr = (row: Attr) => {
    scene.value = 1;
    //合并对象:深拷贝
    Object.assign(attrParams, JSON.parse(JSON.stringify(row)));
}
//取消按钮
const cancel = () => {
    scene.value = 0;
}
//添加属性值按钮
const addAttrValue = () => {
    attrParams.attrValueList.push({
        valueName: '',
        flag: true//用于控制每个属性值的编辑模式与查看模式
    })
    //获取最后的组件实例聚焦
    nextTick(() => {
        inputArr.value[attrParams.attrValueList.length - 1].focus();
    })
}
//保存按钮
const save = async () => {
    //发请求
    const result: any = await reqAddOrUpdateAttr(attrParams);
    if (result.code == 200) {
        //切换场景
        scene.value = 0;
        ElMessage({
            type: 'success',
            message: attrParams.id ? '修改成功' : '添加成功'
        })
        getAttr();
    } else {
        ElMessage({
            type: 'error',
            message: attrParams.id ? '修改失败' : '添加失败'
        })
    }
}
//控制属性值的编辑模式与查看模式
const toLook = (row: AttrValue, $index: number) => {
    //属性值为空判断
    if (row.valueName.trim() == '') {
        attrParams.attrValueList.splice($index, 1);//清空
        ElMessage({
            type: 'warning',
            message: '属性值不能为空'
        })
        return;
    }
    //属性值重复判断
    const repeat = attrParams.attrValueList.find((item) => {
        if (item != row) {
            return item.valueName === row.valueName;
        }
    })
    if (repeat) {
        attrParams.attrValueList.splice($index, 1);
        ElMessage({
            type: 'warning',
            message: '属性值不能重复'
        })
        return;
    }
    row.flag = false;
}
const toEdit = (row: AttrValue, $index: number) => {

    row.flag = true;
    //获取更新后的实例
    nextTick(() => {
        inputArr.value[$index].focus();
    })
}
//删除属性
const deleteAttr = async (attrId: number) => {
    const result: any = await reqRemoveAttr(attrId);
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        getAttr();
    } else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        })
    }
}
//组件销毁前清空数据
onBeforeUnmount(() => {
    categoryStore.reset();
})
</script>

<style scoped lang="scss"></style>